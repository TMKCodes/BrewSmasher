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
    console.log("This fucker called?");
    var selected = $(this).children("option:selected").val();
    $(".brew-task-subquestion").hide()
    if(selected == "start") {
        
    } else if(selected == "strike-water-heat") {
        $("#brew-task-strike-water-amount").show();
    } else if(selected == "start-mashing") {

    }
});

$("#submit-action").on("click", function(evt) {
    evt.preventDefault();
    var selected = $("#brew-task").children("option:selected").val();
    if(selected == "start") {
        $("#brew-recipe-type").prop("disabled", true);
        $("#brew-recipe").prop("disabled", true);
    } else if(selected == "stop") {
        $("#brew-recipe-type").prop("disabled", false);
        $("#brew-recipe").prop("disabled", false);
    }
});