
$(".home-navbar-button").on("click", function() {
  $(".content").hide();
  $(".alert").hide();
  $("#home-content").show();
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $(".nav-link").removeClass("active");
});

$("#register-navbar-button").on("click", function() {
  $(".content").hide();
  $(".alert").hide();
  $("#register-content").show();
  $(".nav-link").removeClass("active");
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $("#register-navbar-button").addClass("active");
});

$("#login-navbar-button").on("click", function() {
  if(Cookies.get("user-id") != null) {
    return
  }
  $(".content").hide();
  $(".alert").hide();
  $("#login-content").show();
  $(".nav-link").removeClass("active");
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $("#login-navbar-button").addClass("active");
});

$("#recipes-navbar-button").on("click", function() {
  $(".content").hide();
  $(".alert").hide();
  $("#recipes-content").show();
  $(".nav-link").removeClass("active");
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $("#recipes-navbar-button").addClass("active");
});

$("#brewlog-navbar-button").on("click", function() {
  $(".content").hide();
  $(".alert").hide();
  $("#brewlog-content").show();
  $(".nav-link").removeClass("active");
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $("#brewlog-navbar-button").addClass("active");
});

$("#search-fermentable-navbar-button").on("click", function() {
  $(".content").hide();
  $(".alert").hide();
  $("input[type=text]").val("");
  $("input[type=number]").val("");
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $("#search-fermentables-content").show();
});

$("#addfermentable-navbar-button").on("click", function() {
  $(".content").hide();
  $(".alert").hide();
  $("#modify-fermentable-button").hide();
  $("#add-fermentable-button").html("Add fermentable");
  $("input[type=text]").val("");
  $("input[type=number]").val("");
  var selected = $("#fermentable-type").children("option:selected").val();
  $(".malt-option").hide();
  $(".sugar-option").hide();
  $(".fruit-option").hide();
  $(".extraxt-option").hide();
  $(".other-option").hide();
  if(selected == "Malt") {
    $(".malt-option").show();
  } else if(selected == "Sugar") {
    $(".sugar-option").show();
  } else if(selected == "Fruit") {
    $(".fruit-option").show();
  } else if(selected == "Extract") {
    $(".extract-option").show();
  } else if(selected == "Other") {
    $(".other-option").show();
  }
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $("#add-fermentable-content").show();
});

$("#modify-fermentable-button").on("click", function() {
  $("#add-fermentable-request").val("modify-fermentable");
  var data = $("#add-fermentable-form").serialize() + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data,
    async : false
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#add-fermentable-content").hide();
      $("#modify-fermentable-success").show();
      $("#search-fermentables-content").show();
    } else {
    }
  });
});

function modifyFermantable(item) {
  item = JSON.parse(unescape(item));
  $("#addfermentable-navbar-button").click();
  $("#fermentable-id").val(item.id);
  $("#fermentable-name").val(item.name);
  $("#fermentable-supplier").val(item.supplier);
  $("#fermentable-origin").val(item.origin);
  $("#fermentable-type").val(item.type);
  $("#fermentable-color").val(item.color);
  $("#fermentable-specific-gravity").val(item.specific_gravity);
  $("#fermentable-coarse-fine-diff").val(item.coarse_fine_diff);
  $("#fermentable-moisture").val(item.moisture);
  $("#fermentable-diastatic-power").val(item.diastatic_power);
  $("#fermentable-protein").val(item.protein);
  $("#fermentable-max-in-batch").val(item.max_in_batch);
  $("#fermentable-recommended_mash").val(item.recommended_mash);
  $("#fermentable-note").val(item.note);
  $("#modify-fermentable-button").show();
  $("#add-fermentable-button").html("Add as a new fermentable");
}

$("#modify-hop-button").on("click", function() {
  $("#add-hop-request").val("modify-hop");
  var data = $("#add-hop-form").serialize() + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data,
    async : false
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#add-hop-content").hide();
      $("#modify-hop-success").show();
      $("#search-hops-content").show();
    } else {
    }
  });
});

function modifyHop(item) {
  item = JSON.parse(unescape(item));
  $("#addhops-navbar-button").click();
  $("#hop-id").val(item.id);
  $("#hop-name").val(item.name);
  $("#hop-origin").val(item.origin);
  $("#hop-alpha").val(item.alpha);
  $("#hop-beta").val(item.beta);
  $("#hop-use").val(item.used);
  $("#hop-type").val(item.type);
  $("#hop-form").val(item.form);
  $("#hop-hsi").val(item.hsi);
  $("#hop-substitues").val(item.substitues);
  $("#hop-humulene").val(item.humulene);
  $("#hop-caryophyllene").val(item.caryophyllene);
  $("#hop-cohumulone").val(item.cohumulone);
  $("#hop-myrcene").val(item.myrcene);
  $("#hop-note").val(item.note);
  $("#modify-hop-button").show();
  $("#add-hop-button").html("Add as a new hop");
}


$("#modify-yeast-button").on("click", function() {
  $("#add-yeast-request").val("modify-yeast");
  var data = $("#add-yeast-form").serialize() + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data,
    async : false
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#add-yeast-content").hide();
      $("#modify-yeast-success").show();
      $("#search-yeasts-content").show();
    } else {
    }
  });
});

function modifyYeast(item) {
  item = JSON.parse(unescape(item));
  $("#addyeast-navbar-button").click();
  $("#yeast-id").val(item.id);
  $("#yeast-name").val(item.name);
  $("#yeast-type").val(item.type);
  $("#yeast-form").val(item.form);
  $("#yeast-laboratory").val(item.laboratory);
  $("#yeast-product-id").val(item.pid);
  $("#yeast-min-temperature").val(item.min_temperature);
  $("#yeast-max-temperature").val(item.max_temperature);
  $("#yeast-flocculation").val(item.flocculation);
  $("#yeast-attenuation").val(item.attenuation);
  $("#yeast-max-reuse").val(item.max_reuse);
  $("#yeast-note").val(item.note);
  $("#modify-yeast-button").show();
  $("#add-yeast-button").html("Add as a new yeast");
}

$("#modify-misc-button").on("click", function() {
  $("#add-misc-request").val("modify-misc");
  var data = $("#add-misc-form").serialize() + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data,
    async : false
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#add-misc-content").hide();
      $("#modify-misc-success").show();
      $("#search-miscs-content").show();
    } else {
    }
  });
});

function modifyMisc(item) {
  item = JSON.parse(unescape(item));
  $("#addmisc-navbar-button").click();
  $("#misc-id").val(item.id);
  $("#misc-name").val(item.name);
  $("#misc-type").val(item.type);
  $("#misc-used").val(item.used);
  $("#misc-time").val(item.utime);
  $("#misc-used-note").val(item.used_note);
  $("#misc-note").val(item.note);
  $("#modify-misc-button").show();
  $("#add-misc-button").html("Add as a new misc");
}

$("#addhops-navbar-button").on("click", function() {
  $(".content").hide();
  $(".alert").hide();
  $("#modify-hop-button").hide();
  $("#add-hop-button").html("Add hop");
  $("input[type=text]").val("");
  $("input[type=number]").val("");
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $("#add-hop-content").show();
});

$("#search-hops-navbar-button").on("click", function() {
  $(".content").hide();
  $(".alert").hide();
  $("input[type=text]").val("");
  $("input[type=number]").val("");
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $("#search-hops-content").show();
});

$("#addyeast-navbar-button").on("click", function() {
  $(".content").hide();
  $(".alert").hide();
  $("#modify-yeast-button").hide();
  $("#add-yeast-button").html("Add yeast");
  $("input[type=text]").val("");
  $("input[type=number]").val("");
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $("#add-yeast-content").show();
});

$("#search-yeast-navbar-button").on("click", function() {
  $(".content").hide();
  $(".alert").hide();
  $("input[type=text]").val("");
  $("input[type=number]").val("");
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $("#search-yeasts-content").show();
});

$("#addmisc-navbar-button").on("click", function() {
  $(".content").hide();
  $(".alert").hide();
  $("#modify-misc-button").hide();
  $("#add-misc-button").html("Add misc");
  $("input[type=text]").val("");
  $("input[type=number]").val("");
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $("#add-misc-content").show();
});

$("#search-misc-navbar-button").on("click", function() {
  $(".content").hide();
  $(".alert").hide();
  $("input[type=text]").val("");
  $("input[type=number]").val("");
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $("#search-miscs-content").show();
});

function deleteFermentable(id) {
  var data = "request=delete-fermentable&id=" + id + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#search-fermentables-form").submit();
    } else {
    }
  });
}

function deleteHop(id) {
  var data = "request=delete-hop&id=" + id + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#search-hops-form").submit();
    } else {
    }
  });
}

function deleteMisc(id) {
  var data = "request=delete-misc&id=" + id + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#search-miscs-form").submit();
    } else {
    }
  });
}

function deleteYeast(id) {
  var data = "request=delete-yeast&id=" + id + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#search-yeasts-form").submit();
    } else {
    }
  });
}

function ShowFermentableData(item, index) {
  item = JSON.parse(unescape(item));
  console.log(item);
  console.log(index);
  $(".fermentable-info-row").remove();
  var html = "<tr class=\"fermentable-info-row\">";
    html += "<td colspan=\"10\">";
      html += "<table class=\"table\" id=\"fermentable-data-table\">";
        html += "<thead><th scope=\"col\">Identifier</th><th scope=\"col\">Value</th></thead>";
        html += "<tbody>";
        console.log(item.color);
          if(item.color != "") {
            html += "<tr><td>Color:</td><td>" + item.color + " EBC</td></tr>";
          }
          if(item.specific_gravity != "") {
          html += "<tr><td>Specific gravity:</td><td>" + item.specific_gravity + "</td></tr>";
          }
          if(item.yield != "") {
            html += "<tr><td>Yield:</td><td>" + item.yield + "</td></tr>";
          }
          if(item.after_boil != "") {
          html += "<tr><td>Usable after boil:</td><td>" + item.after_boil + "</td></tr>";
          }
          if(item.coarse_fine_diff != "") {
            html += "<tr><td>Coarse fine difference:</td><td>" + item.coarse_fine_diff + "</td></tr>";
          }
          if(item.moisture != "") {
            html += "<tr><td>Moisture percentage:</td><td>" + item.moisture + "</td></tr>";
          }
          if(item.diastatic_power != "") {
            html += "<tr><td>Diastatic power:</td><td>" + item.diastatic_power + " Lintner</td></tr>";
          }
          if(item.max_in_batch != "") {
            html += "<tr><td>Max percentage in batch:</td><td>" + item.max_in_batch + "</td></tr>";
          }
          if(item.recommended_mash != "") {
            html += "<tr><td>Should be smashed:</td><td>" + item.recommended_mash + "</td></tr>";
          }
          if(item.note != "") {
            html += "<tr><td colspan=\"2\">Note:</td></tr>";
            html += "<tr><td colspan=\"2\">" + item.note + "</td></tr>";
          }
          html += "<tr><td colspan=\"2\">";
            html += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"modifyFermantable('" + escape(JSON.stringify(item)) + "')\">Modify</button>";
            html += "<button type=\"button\" class=\"btn btn-warning\" onclick=\"alert('Not yet implemented')\">Report</button>";
            if(item.sender == Cookies.get("user-id")) {
              html += "<button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteFermentable(" + item.id + ")\">Delete</button>";
            }
          html += "</td></tr>";
        html += "</tbody>";
      html += "</table>";
    html += "</td>";
  html += "</tr>";
  $("#" + index + "-row").after(html);
}

$("#search-fermentables-form").on("submit", function(evt) {
  evt.preventDefault();
  var data = $(this).serialize() + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true" && response.fermentables.length > 0) {
      var html;
      response.fermentables.forEach(function(item, index) {
        html += "<tr id=\"" + index + "-row\" onclick=\"ShowFermentableData('" + escape(JSON.stringify(item)) + "', " + index + ")\">";
        html += "<td>" + (index + 1) + "</td>";
        html += "<td>" + item.supplier + "</td>";
        html += "<td>" + item.name + "</td>";
        html += "<td>" + item.origin + "</td>";
        html += "</tr>";
      });
      $("#search-yeasts-table-body").html("");
      $("#search-hops-table-body").html("");
      $("#search-miscs-table-body").html("");
      $("#search-fermentables-table-body").html(html);
      $("#add-fermentable-success").hide();
      $("#search-fermentables-table").show();
    } else {
      $("#search-fermentables-table-body").html("");
      $("#add-fermentable-success").hide();
      $("#search-fermentables-table").show();
    }
  });
});

function ShowHopData(item, index) {
  item = JSON.parse(unescape(item));
  console.log(item);
  console.log(index);
  $(".hop-info-row").remove();
  var html = "<tr class=\"hop-info-row\">";
    html += "<td colspan=\"10\">";
      html += "<table class=\"table\" id=\"hop-data-table\">";
        html += "<thead><th scope=\"col\">Identifier</th><th scope=\"col\">Value</th></thead>";
        html += "<tbody>";
        console.log(item.color);
          if(item.alpha != "") {
            html += "<tr><td>Alpha:</td><td>" + item.alpha + "</td></tr>";
          }
          if(item.beta != "") {
            html += "<tr><td>Beta:</td><td>" + item.beta + "</td></tr>";
          }
          if(item.used != "") {
            html += "<tr><td>Use:</td><td>" + item.used + "</td></tr>";
          }
          if(item.form != "") {
            html += "<tr><td>Form:</td><td>" + item.form + "</td></tr>";
          }
          if(item.hsi != "") {
            html += "<tr><td>HSI:</td><td>" + item.hsi + "</td></tr>";
          }
          if(item.substitutes != "") {
            html += "<tr><td>Substitutes:</td><td>" + item.substitutes + "</td></tr>";
          }
          if(item.humulene != "") {
            html += "<tr><td>Humulene:</td><td>" + item.humulene + "</td></tr>";
          }
          if(item.caryophyllene != "") {
            html += "<tr><td>Caryophyllene:</td><td>" + item.caryophyllene + "</td></tr>";
          }
          if(item.cohumulone != "") {
            html += "<tr><td>Cohumulone:</td><td>" + item.cohumulone + "</td></tr>";
          }
          if(item.myrcene != "") {
            html += "<tr><td>Myrcene:</td><td>" + item.myrcene + "</td></tr>";
          }
          if(item.note != "") {
            html += "<tr><td colspan=\"2\">Note:</td></tr>";
            html += "<tr><td colspan=\"2\">" + item.note + "</td></tr>";
          }
          html += "<tr><td colspan=\"2\">";
            html += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"modifyHop('" + escape(JSON.stringify(item)) + "')\">Modify</button>";
            html += "<button type=\"button\" class=\"btn btn-warning\" onclick=\"alert('Not yet implemented')\">Report</button>";
            if(item.sender == Cookies.get("user-id")) {
              html += "<button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteHop(" + item.id + ")\">Delete</button>";
            }
          html += "</td></tr>";
        html += "</tbody>";
      html += "</table>";
    html += "</td>";
  html += "</tr>";
  $("#" + index + "-row").after(html);
}

$("#search-hops-form").on("submit", function(evt) {
  evt.preventDefault();
  var data = $(this).serialize() + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true" && response.hops.length > 0) {
      var html;
      console.log(response);
      if($("#search-hops-sort-checkbox").val() == "Alpha High") {
        response.hops.sort(function(a, b) {
          console.log(parseFloat(a.alpha) + "<" + parseFloat(b.alpha))
          if (parseFloat(a.alpha) > parseFloat(b.alpha)) {
            return -1;
          }
          if (parseFloat(a.alpha) < parseFloat(b.alpha)) {
            return 1;
          }
          return 0;
        });
      } else if($("#search-hops-sort-checkbox").val() == "Alpha High") {
        response.hops.sort(function(a, b) {
          if (parseFloat(a.alpha) < parseFloat(b.alpha)) {
            return -1;
          }
          if (parseFloat(a.alpha) > parseFloat(b.alpha)) {
            return 1;
          }
          return 0;
        });
      } else if($("#search-hops-sort-checkbox").val() == "Beta Low") {
        response.hops.sort(function(a, b) {
          if (parseFloat(a.beta) > parseFloat(b.beta)) {
            return -1;
          }
          if (parseFloat(a.beta) < parseFloat(b.beta)) {
            return 1;
          }
          return 0;
        });
      } else if($("#search-hops-sort-checkbox").val() == "Beta High") {
        response.hops.sort(function(a, b) {
          if (parseFloat(a.beta) < parseFloat(b.beta)) {
            return -1;
          }
          if (parseFloat(a.beta) > parseFloat(b.beta)) {
            return 1;
          }
          return 0;
        });
      } else if($("#search-hops-sort-checkbox").val() == "Humulene Low") {
        response.hops.sort(function(a, b) {
          if (parseFloat(a.humulene) > parseFloat(b.humulene)) {
            return -1;
          }
          if (parseFloat(a.humulene) < parseFloat(b.humulene)) {
            return 1;
          }
          return 0;
        });
      } else if($("#search-hops-sort-checkbox").val() == "Humulene High") {
        response.hops.sort(function(a, b) {
          if (parseFloat(a.humulene) < parseFloat(b.humulene)) {
            return -1;
          }
          if (parseFloat(a.humulene) > parseFloat(b.humulene)) {
            return 1;
          }
          return 0;
        });
      } else if($("#search-hops-sort-checkbox").val() == "Caryophyllene Low") {
        response.hops.sort(function(a, b) {
          if (parseFloat(a.caryophyllene) > parseFloat(b.caryophyllene)) {
            return -1;
          }
          if (parseFloat(a.caryophyllene) < parseFloat(b.caryophyllene)) {
            return 1;
          }
          return 0;
        });
      } else if($("#search-hops-sort-checkbox").val() == "Caryophyllene High") {
        response.hops.sort(function(a, b) {
          if (parseFloat(a.caryophyllene) < parseFloat(b.caryophyllene)) {
            return -1;
          }
          if (parseFloat(a.caryophyllene) > parseFloat(b.caryophyllene)) {
            return 1;
          }
          return 0;
        });
      } else if($("#search-hops-sort-checkbox").val() == "Cohumulone Low") {
        response.hops.sort(function(a, b) {
          if (parseFloat(a.cohumulone) > parseFloat(b.cohumulone)) {
            return -1;
          }
          if (parseFloat(a.cohumulone) < parseFloat(b.cohumulone)) {
            return 1;
          }
          return 0;
        });
      } else if($("#search-hops-sort-checkbox").val() == "Cohumulone High") {
        response.hops.sort(function(a, b) {
          if (parseFloat(a.cohumulone) < parseFloat(b.cohumulone)) {
            return -1;
          }
          if (parseFloat(a.cohumulone) > parseFloat(b.cohumulone)) {
            return 1;
          }
          return 0;
        });
      } else if($("#search-hops-sort-checkbox").val() == "Myrcene Low") {
        response.hops.sort(function(a, b) {
          if (parseFloat(a.myrcene) > parseFloat(b.myrcene)) {
            return -1;
          }
          if (parseFloat(a.myrcene) < parseFloat(b.myrcene)) {
            return 1;
          }
          return 0;
        });
      } else if($("#search-hops-sort-checkbox").val() == "Myrcene High") {
        response.hops.sort(function(a, b) {
          if (parseFloat(a.myrcene) < parseFloat(b.myrcene)) {
            return -1;
          }
          if (parseFloat(a.myrcene) > parseFloat(b.myrcene)) {
            return 1;
          }
          return 0;
        });
      }
      response.hops.forEach(function(item, index) {
        html += "<tr id=\"" + index + "-row\" onclick=\"ShowHopData('" + escape(JSON.stringify(item)) + "', " + index + ")\">";
        html += "<td>" + (index + 1) + "</td>";
        html += "<td>" + item.name + "</td>";
        html += "<td>" + item.origin + "</td>";
        html += "</tr>";
      });
      $("#search-fermentables-table-body").html("");
      $("#search-miscs-table-body").html("");
      $("#search-yeasts-table-body").html("");
      $("#search-hops-table-body").html(html);
      $("#add-hops-success").hide();
      $("#search-hops-table").show();
    } else {
      $("#search-hops-table-body").html("");
      $("#add-hops-success").hide();
      $("#search-hops-table").show();
    }
  });
});

function ShowYeastData(item, index) {
  item = JSON.parse(unescape(item));
  console.log(item);
  console.log(index);
  $(".yeast-info-row").remove();
  var html = "<tr class=\"yeast-info-row\">";
    html += "<td colspan=\"10\">";
      html += "<table class=\"table\" id=\"yeast-data-table\">";
        html += "<thead><th scope=\"col\">Identifier</th><th scope=\"col\">Value</th></thead>";
        html += "<tbody>";
          if(item.laboratory != "") {
            html += "<tr><td>Laboratory:</td><td>" + item.laboratory + " </td></tr>";
          }
          if(item.pid != "") {
            html += "<tr><td>Product ID:</td><td>" + item.pid + " </td></tr>";
          }
          if(item.min_temperature != "") {
            html += "<tr><td>Min Temperature:</td><td>" + item.min_temperature + " </td></tr>";
          }
          if(item.max_temperature != "") {
            html += "<tr><td>Max Temperature:</td><td>" + item.max_temperature + " </td></tr>";
          }
          if(item.flocculation != "") {
            html += "<tr><td>Flocculation:</td><td>" + item.flocculation + " </td></tr>";
          }
          if(item.attenuation != "") {
            html += "<tr><td>Attenuation:</td><td>" + item.attenuation + " </td></tr>";
          }
          if(item.max_reuse != "") {
            html += "<tr><td>Maximum reuse:</td><td>" + item.max_reuse + " </td></tr>";
          }
          if(item.note != "") {
            html += "<tr><td colspan=\"2\">Note:</td></tr>";
            html += "<tr><td colspan=\"2\">" + item.note + "</td></tr>";
          }
          html += "<tr><td colspan=\"2\">";
            html += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"modifyYeast('" + escape(JSON.stringify(item)) + "')\">Modify</button>";
            html += "<button type=\"button\" class=\"btn btn-warning\" onclick=\"alert('Not yet implemented')\">Report</button>";
            if(item.sender == Cookies.get("user-id")) {
              html += "<button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteYeast(" + item.id + ")\">Delete</button>";
            }
          html += "</td></tr>";
        html += "</tbody>";
      html += "</table>";
    html += "</td>";
  html += "</tr>";
  $("#" + index + "-row").after(html);
}

$("#add-yeast-form").on("submit", function(evt) {
  evt.preventDefault();
  if($("#yeast-origin").val() == '') {
    return;
  }
  if($("#yeast-name").val() == '') {
    return;
  }
  var data = $(this).serialize() + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#add-yeast-content").hide();
      $("#add-yeast-success").show();
      $("#search-yeasts-content").show();
    } else {
    }
  });
});

$("#search-yeasts-form").on("submit", function(evt) {
  evt.preventDefault();
  var data = $(this).serialize() + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true" && response.yeasts.length > 0) {
      var html;
      response.yeasts.forEach(function(item, index) {
        html += "<tr id=\"" + index + "-row\" onclick=\"ShowYeastData('" + escape(JSON.stringify(item)) + "', " + index + ")\">";
        html += "<td>" + (index + 1) + "</td>";
        html += "<td>" + item.name + "</td>";
        html += "<td>" + item.form + "</td>";
        html += "</tr>";
      });
      $("#search-fermentables-table-body").html("");
      $("#search-hops-table-body").html("");
      $("#search-miscs-table-body").html("");
      $("#search-yeasts-table-body").html(html);
      $("#add-yeasts-success").hide();
      $("#search-yeasts-table").show();
    } else {
      $("#search-yeasts-table-body").html("");
      $("#add-yeasts-success").hide();
      $("#search-yeasts-table").show();
    }
  });
});

function ShowMiscData(item, index) {
  item = JSON.parse(unescape(item));
  $(".misc-info-row").remove();
  var html = "<tr class=\"misc-info-row\">";
    html += "<td colspan=\"10\">";
      html += "<table class=\"table\" id=\"misc-data-table\">";
        html += "<thead><th scope=\"col\">Identifier</th><th scope=\"col\">Value</th></thead>";
        html += "<tbody>";
          if(item.used != "") {
            html += "<tr><td>Use:</td><td>" + item.used + " </td></tr>";
          }
          if(item.utime != "") {
            html += "<tr><td>Time:</td><td>" + item.utime + " </td></tr>";
          }
          if(item.used_note != "") {
            html += "<tr><td colspan=\"2\">Use description:</td></tr>";
            html += "<tr><td colspan=\"2\">" + item.used_note + "</td></tr>";
          }
          if(item.note != "") {
            html += "<tr><td colspan=\"2\">Note:</td></tr>";
            html += "<tr><td colspan=\"2\">" + item.note + "</td></tr>";
          }
          html += "<tr><td colspan=\"2\">";
            html += "<button type=\"button\" class=\"btn btn-primary\" onclick=\"modifyMisc('" + escape(JSON.stringify(item)) + "')\">Modify</button>";
            html += "<button type=\"button\" class=\"btn btn-warning\" onclick=\"alert('Not yet implemented')\">Report</button>";
            if(item.sender == Cookies.get("user-id")) {
              html += "<button type=\"button\" class=\"btn btn-danger\" onclick=\"deleteMisc(" + item.id + ")\">Delete</button>";
            }
          html += "</td></tr>";
        html += "</tbody>";
      html += "</table>";
    html += "</td>";
  html += "</tr>";
  $("#" + index + "-row").after(html);
}

$("#add-misc-form").on("submit", function(evt) {
  evt.preventDefault();
  console.log("This fucker called?");
  if($("#misc-type").val() == '') {
    return;
  }
  console.log("This fucker called?");
  if($("#misc-name").val() == '') {
    return;
  }
  console.log("This fucker called?");
  var data = $(this).serialize() + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#add-misc-content").hide();
      $("#add-misc-success").show();
      $("#search-miscs-content").show();
    } else {
    }
  });
});

$("#search-miscs-form").on("submit", function(evt) {
  evt.preventDefault();
  var data = $(this).serialize() + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true" && response.miscs.length > 0) {
      var html;
      response.miscs.forEach(function(item, index) {
        html += "<tr id=\"" + index + "-row\" onclick=\"ShowMiscData('" + escape(JSON.stringify(item)) + "', " + index + ")\">";
        html += "<td>" + (index + 1) + "</td>";
        html += "<td>" + item.name + "</td>";
        html += "</tr>";
      });
      $("#search-fermentables-table-body").html("");
      $("#search-hops-table-body").html("");
      $("#search-yeasts-table-body").html("");
      $("#search-miscs-table-body").html(html);
      $("#add-misc-success").hide();
      $("#search-miscs-table").show();
    } else {
      $("#search-miscs-table-body").html("");
      $("#add-misc-success").hide();
      $("#search-miscs-table").show();
    }
  });
});

$("#fermentable-type").on("change", function() {
  console.log("this fucker called?");
  var selected = $(this).children("option:selected").val();
  $(".malt-option").hide();
  $(".sugar-option").hide();
  $(".fruit-option").hide();
  $(".extraxt-option").hide();
  $(".other-option").hide();
  if(selected == "Malt") {
    $(".malt-option").show();
  } else if(selected == "Sugar") {
    $(".sugar-option").show();
  } else if(selected == "Fruit") {
    $(".fruit-option").show();
  } else if(selected == "Extract") {
    $(".extract-option").show();
  } else if(selected == "Other") {
    $(".other-option").show();
  }
});

$("#add-fermentable-form").on("submit", function(evt) {
  $("#add-fermentable-request").val("add-fermentable");
  evt.preventDefault();
  if($("#fermentable-origin").val() == '') {
    return;
  }
  if($("#fermentable-supplier").val() == '') {
    return;
  }
  if($("#fermentable-name").val() == '') {
    return;
  }
  if($("#fermentable"))
  var data = $(this).serialize() + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#add-fermentable-content").hide();
      $("#add-fermentable-success").show();
      $("#search-fermentables-content").show();
    } else {
    }
  });
});

$("#add-hop-form").on("submit", function(evt) {
  evt.preventDefault();
  if($("#hop-name").val() == '') {
    return;
  }
  if($("#hop-origin").val() == '') {
    return;
  }
  var data = $(this).serialize() + "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#add-hop-content").hide();
      $("#add-hop-success").show();
      $("#search-hops-content").show();
    } else {
    }
  });
});

$("#logout-navbar-button").on("click",function() {
  console.log("Is this fucker called?");
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : "request=close-session&session=" + Cookies.get("session-hash")
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $(".content").hide();
      $("#logged-navbar").hide();
      $("#login-navbar").show();
      $("#home-content").show();
      Cookies.remove("session-hash");
      Cookies.remove("user-id");
    }
  });
});

$("#login-form").on("submit", function(evt) {
  evt.preventDefault();
  if($('#Lemail').val() == ''){
    $("#empty-email-error").show();
    return;
  }
  if($("#password").val() == '') {
    $("#empty-password-error").show();
    return;
  }
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : $(this).serialize()
  }).always(function(jqXHR, textStatus, errorThrown) {
    console.log(errorThrown);
    console.log(textStatus);
  }).done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#login-content").hide();
      $("#login-navbar").hide();
      $("#logged-navbar").show();
      Cookies.set("session-hash", response.hash);
      Cookies.set("user-id", response.uid);
    } else {
      $("#failed-to-login-error").show();
    }
  });
});

$("#register-form").on("submit", function(evt) {
  evt.preventDefault();
  if($('#email').val() == ''){
    $("#empty-email-error").show();
    return;
  }
  if($("#passwordA").val() == '') {
    $("#empty-passwordA-error").show();
    return;
  }
  if($("#passwordB").val() == '') {
    $("#empty-passwordB-error").show();
    return;
  }
  if($("#passwordA").val() != $("#passwordB").val()) {
    $("#password-mismatch-error").show();
    return;
  }
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : $(this).serialize()
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      $("#register-content").hide();
      $("#home-content").show();
      $("#register-success").show();
    } else {
      $("#failed-to-register-error").show();
    }
  });
});
