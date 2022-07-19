function getRecipes() {
    //search-your-recipes-type-checkbox=All%20Grain%20Beer&search-your-recipes-input=&request=search-your-recipes&uid=1
    var data = "search-your-recipes-type-checkbox=" + $("#brew-recipe-type").val() + "&search-your-recipes-input=&request=search-your-recipes&uid=" + Cookies.get("user-id");
    console.log(data);
    var request = $.ajax({
        url : "server.php",
        type : "POST",
        data : data,
        async : false
    });
    request.done(function(response, textStatus, jqXHR) {
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
        if(response.success == "true") {
            var html = "";
            response.recipes.forEach(function(item, index) {
                html += "<option value=\"" + escape(JSON.stringify(item)) + "\">" + item.name + "</option>"
            });
            $("#brew-recipe").html(html);
            if(html == "") {
                $("#select-brew-task").hide();
                $("#brew-task-strike-water-amount").hide();
            } else {
                $("#select-brew-task").show();
            }
        }
    });
}


$("#brew-recipe-type").on("change", function() {
    getRecipes();
});

$("#startbrew-navbar-button").on("click", function() {
    $(".content").hide();
    $(".alert").hide();
    $("#startbrew-content").show();
    $(".nav-link").removeClass("active");
    $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
    $("#startbrew-navbar-button").addClass("active");
    getRecipes();
});

$("#brew-recipe").on("change", function() {
    var selected = $(this).children("option:selected").val();
    if(selected != "") {
        $("#select-brew-task").show();
    }
});

$("#brew-task").on("change", function() {
    var selected = $(this).children("option:selected").val();
    console.log(selected);
    $(".brew-task-subquestion").hide();
    if(selected == "strike-water-heat") {
        $("#brew-task-strike-water-amount").show();
        $("#brew-task-strike-water-temp").show();
    } else if(selected == "add-malt") { 
        var recipe = JSON.parse(unescape($("#brew-recipe").val()));
        for(const fermentable in recipe.fermentables) {
            var data = "request=get-fermentable&search-fermentables-id=" + recipe.fermentables[fermentable].fip + "&uid=" + Cookies.get("user-id");
            var request = $.ajax({
                url : "server.php",
                type : "POST",
                data : data,
                async : false
            });
            console.log(request);
            request.done(function(response, textStatus, jqXHR) {
                console.log(response);
                console.log(textStatus);
                console.log(jqXHR);
                console.log("fuck you!");
                if(response.success == "true") {
                    $("#select-malt").append("<option value=\"" + response.fermentables[0].supplier + " " + response.fermentables[0].name + "\">" + response.fermentables[0].supplier + " " + response.fermentables[0].name + "</option>");
                }
            });
        }
        $("#brew-task-select-malt").show();
        $("#brew-task-select-malt-amount").show();
    } else if(selected == "start-mashing") {
        $("#brew-task-mashing-type").show();
        $("#mashing-type").trigger("change");
    } else if(selected == "start-lautering") {
        $("#brew-task-lautering-type").show();
        $("#lautering-type").trigger("change");
    } else if(selected == "start-boiling") {
        $("#brew-task-boiling-length").show();
        $("#brew-task-boiling-watts").show();
    }
});

$("#mashing-type").on("change", function() {
    var selected = $(this).children("option:selected").val();
    $(".brew-task-subquestion").hide();
    if(selected == "single-step-infusion") {
        $("#brew-task-single-step-infusion-temp").show();
        $("#brew-task-single-step-infusion-length").show();
        $("#brew-task-single-step-infusion-watts").show();
    }
});

$("#lautering-type").on("change", function() {
    var selected = $(this).children("option:selected").val();
    if(selected == "sparge") {
        $("#brew-task-sparge-water-amount").show();
    } else if(selected != "sparge") {
        $("#brew-task-sparge-water-amount").hide();
    }
});

var brewlog = [];

$("#submit-action").on("click", function(evt) {
    evt.preventDefault();
    var selected = $("#brew-task").children("option:selected").val();
    const date = new Date();
    var html = "";
    if(selected == "start") {
        $("#brew-recipe-type").prop("disabled", true);
        $("#brew-recipe").prop("disabled", true);
        brewlog.push({ date: date.toLocaleString(), action: "Started brewing" });
        html += "<tr><td>" + date.toLocaleString() + "</td><td>Started brewing</td><td></td></tr>"; 
    } else if(selected == "stop") {
        $("#brew-recipe-type").prop("disabled", false);
        $("#brew-recipe").prop("disabled", false);
        brewlog.push({ date: date.toLocaleString(), action: "Stopped brewing" });
        html += "<tr><td>" + date.toLocaleString() + "</td><td>Stopped brewing</td><td></td></tr>"; 
    } else if(selected == "cleaning") {
        brewlog.push({ date: date.toLocaleString(), action: "Started cleaning the equipment" });
        html += "<tr><td>" + date.toLocaleString() + "</td><td>Started cleaning the equipment</td><td></td></tr>"; 
    } else if(selected == "strike-water-heat") {
        brewlog.push({ date: date.toLocaleString(), action: "Started heating the strike water", values: $("#strike-water-amount").val() + " liters, " + $("#strike-water-temp").val() + " Celsius" });
        html += "<tr><td>" + date.toLocaleString() + "</td><td>Started heating the strike water</td><td>" + $("#strike-water-amount").val() + " liters, " + $("#strike-water-temp").val() + " Celsius</td></tr>"; 
    } else if(selected == "add-malt") { 
        brewlog.push({ date: date.toLocaleString(), action: "Add malt to mash tun", values: $("#select-malt").val() + " " + $("#select-malt-amount").val() + " kg" });
        html += "<tr><td>" + date.toLocaleString() + "</td><td>Add malt to mash tun</td><td>" + $("#select-malt").val() + " " + $("#select-malt-amount").val() + " kg</td></tr>"; 
    } else if(selected == "start-mashing") {
        if($("#mashing-type").val() == "single-step-infusion") {
            brewlog.push({ date: date.toLocaleString(), action: "Started single step infusion mashing", values: $("#single-step-infusion-temp").val() + " celsius, " + $("#single-step-infusion-length").val() + " min, " + $("#single-step-infusion-watts").val() + " watts" });
            html += "<tr><td>" + date.toLocaleString() + "</td><td>Started single step infusion mashing</td><td>" + $("#single-step-infusion-temp").val() + " celsius, " + $("#single-step-infusion-length").val() + " min, " + $("#single-step-infusion-watts").val() + " watts</td></tr>";
        }
    } else if(selected == "start-lautering") {
        if($("#lautering-type").val() == "sparge") {
            brewlog.push({ date: date.toLocaleString(), action: "Started lautering", values: "Sparge " + $("#sparge-water-amount").val() + " liters" });
            html += "<tr><td>" + date.toLocaleString() + "</td><td>Started lautering</td><td>Sparge " + $("#sparge-water-amount").val() + " liters</td></tr>";
        } else if($("#lautering-type").val() == "fly-sparge") {
            brewlog.push({ date: date.toLocaleString(), action: "Started lautering", values: "Fly-sparge" });
            html += "<tr><td>" + date.toLocaleString() + "</td><td>Started lautering</td><td>Fly-sparge</td></tr>";
        } else if($("#lautering-type").val() == "no-sparge") {
            brewlog.push({ date: date.toLocaleString(), action: "Started lautering", values: "No-sparge" });
            html += "<tr><td>" + date.toLocaleString() + "</td><td>Started lautering</td><td>No-sparge</td></tr>";
        } else if($("#lautering-type").val() == "batch-sparge") {
            brewlog.push({ date: date.toLocaleString(), action: "Started lautering", values: "Batch-sparge" });
            html += "<tr><td>" + date.toLocaleString() + "</td><td>Started lautering</td><td>Batch-sparge</td></tr>";
        }
    } else if(selected == "start-boiling") {
        brewlog.push({ date: date.toLocaleString(), action: "Started boiling", values: $("#boiling-length").val() + " mins, " + $("#boiling-watts").val() + " watts" });
        html += "<tr><td>" + date.toLocaleString() + "</td><td>Started boiling</td><td>" + $("#boiling-length").val() + " mins, " + $("#boiling-watts").val() + " watts</td></tr>";
    }
    $("#brewing-tasks").append(html);
});

$("#save-action").on("click", function(evt) {
    evt.preventDefault();
});