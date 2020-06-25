var quickData;

var beer_color = {
  1 : "#FFE699",
  2 : "#FFD878",
  3 : "#FFCA5A",
  4 : "#FFBF42",
  5 : "#FBB123",
  6 : "#F8A600",
  7 : "#F39C00",
  8 : "#EA8F00",
  9 : "#E58500",
  10 : "#DE7C00",
  11 : "#D77200",
  12 : "#CF6900",
  13 : "#CB6200",
  14 : "#C35900",
  15 : "#BB5100",
  16 : "#B54C00",
  17 : "#B04500",
  18 : "#A63E00",
  19 : "#A13700",
  20 : "#9B3200",
  21 : "#952D00",
  22 : "#8E2900",
  23 : "#882300",
  24 : "#821E00",
  25 : "#7B1A00",
  26 : "#771900",
  27 : "#701400",
  28 : "#6A0E00",
  29 : "#660D00",
  30 : "#5E0B00",
  31 : "#5A0A02",
  32 : "#600903",
  33 : "#520907",
  34 : "#4C0505",
  35 : "#470606",
  36 : "#440607",
  37 : "#3F0708",
  38 : "#3B0607",
  39 : "#3A070B",
  40 : "#36080A"
}

function CalculateOG() {
  // Original Gravity = (((S.G. * 1000 - 1000) * Malt in Lbs / Mash Efficiency)... / Wort after boil in gallons + 1000) - 1000
  var gp = 0;
  $("#recipe-fermentables-list").find(".recipe-fermentable-specific-gravity").each(function() {
    var tbody = $(this).parent().parent().parent().parent();
    var amount = $(tbody).find("#recipe-fermentable-lb").val();
    var gravity = $(this).val();
    gp += (gravity * 1000 - 1000) * amount * ($("#recipe-info-efficiency").val() / 100);
  });
  console.log(gp);
  var og = (gp / $("#recipe-info-batch-size-gallon").val() + 1000) / 1000;
  console.log(og);
  $("#original-gravity").html(og.toFixed(4));
  CalculateEBC();
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
  $("#recipe-yeasts-list").find(".recipe-yeast-attenuation").each(function() {
    $(this).change();
  });
}

function CalculateFG(input) {
  if($("#original-gravity").html() == "") {
    return;
  }
  var gravity_points = (parseFloat($("#original-gravity").html()) - 1) * 1000;
  var attenuation = $(input).val() / 100;
  var final_gravity = 1 + ((gravity_points * (1 - attenuation)) / 1000);
  $("#final-gravity").html(final_gravity.toFixed(4));
  CalculateABV();
}

function CalculateABV() {
  var original_gravity = parseFloat($("#original-gravity").html());
  var final_gravity = parseFloat($("#final-gravity").html())
  var abv = (original_gravity - final_gravity) * 131.25;
  $("#alcohol").html((abv).toFixed(2));
  CalculateCalories();
}

function CalculateCalories() {
  var abv = parseFloat($("#alcohol").html());
  var calories = (abv * 2.5) * 10;
  $("#calories").html((calories).toFixed(2));
}

function CalculateEBC() {
  var addition = 0;
  $("#recipe-fermentables-list").find(".recipe-fermentable-color").each(function() {
    var kgofmalt = $(this).parent().parent().parent().parent().find("#recipe-fermentable-kg").val();
    addition += $(this).val() * kgofmalt;
  });
  var total_ebc = 2.939 * (4.23 * (addition) /  $("#recipe-info-batch-size").val()) * 0.6859;
  var total_srm = (total_ebc / 1.97).toFixed(0);
  $("#color-ebc").html(total_ebc.toFixed(0));
  $("#color-srm").html(total_srm);
  $("#color-square").css("color", beer_color[total_srm]);
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
  $("#recipe-yeasts-list").find(".recipe-yeast-attenuation").each(function() {
    $(this).change();
  });
}

function removeFermentableRow(btn) {
  console.log("Remove row");
  $(btn).parents("tr").remove();
  CalculateOG();
  CalculateIBU();
}

function removeHopRow(btn) {
  $(btn).parents("tr").remove();
  CalculateIBU();
}

function removeMiscRow(btn) {
  $(btn).parents("tr").remove();
  CalculateIBU();
}

function removeYeastRow(btn) {
  $(btn).parents("tr").remove();
  CalculateIBU();
}

function updateWeightByPercent(input) {
  console.log("Update weight by percent");
  var bill = $("#fermentables-malt-amount").val();
  var percentage = $(input).val();
  var amount = bill * (percentage / 100);
  console.log("amount: " + amount);
  $(input).parent().parent().parent().parent().find("#recipe-fermentable-kg").val((amount).toFixed(2));
  $(input).parent().parent().parent().parent().find("#recipe-fermentable-lb").val((amount * 2.20462262).toFixed(2));
  CalculateOG();
  CalculateIBU();
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
}

function updateWeightByKg(input) {
  var percentage = ($(input).val() / $("#fermentables-malt-amount").val() * 100).toFixed(2);
  var lbs = ($(input).val() * 2.20462262).toFixed(2);
  $(input).parent().parent().parent().parent().find("#recipe-fermentable-percentage").val(percentage);
  $(input).parent().parent().parent().parent().find("#recipe-fermentable-lb").val(lbs);
  CalculateOG();
  CalculateIBU();
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
}

function updateWeightByLbs(input) {
  var kg = $(input).val() / 2.20462262;
  var percentage = (kg / $("#fermentables-malt-amount").val() * 100).toFixed(2);
  kg = kg.toFixed(2);
  $(input).parent().parent().parent().parent().find("#recipe-fermentable-percentage").val(percentage);
  $(input).parent().parent().parent().parent().find("#recipe-fermentable-kg").val(kg);
  CalculateOG();
  CalculateIBU();
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
}

function updateWeightByG(input, alpha) {
  var g = $(input).val();
  var oz = (g * 0.0352739619).toFixed(2);
  $(input).parent().parent().parent().parent().find("#recipe-hop-oz").val(oz);
  if(typeof(alpha) == "string" && alpha.search("-") == -1) {
    var r = alpha.split("-");
    alpha = parseFloat(r[0]);
  }
  if(alpha > 1) {
    alpha = alpha / 100;
  }
  var aau = (oz * alpha * 100).toFixed(2);
  $(input).parent().parent().parent().parent().find("#recipe-hop-aau").val(aau);
  CalculateIBU();
}

function updateWeightByOz(input, alpha) {
  var oz = $(input).val();
  var g = (oz / 0.0352739619).toFixed(2);
  $(input).parent().parent().parent().parent().find("#recipe-hop-g").val(g);
  if(typeof(alpha) == "string" && alpha.search("-") == -1) {
    var r = alpha.split("-");
    alpha = parseFloat(r[0]);
  }
  if(alpha > 1) {
    alpha = alpha / 100;
  }
  var aau = (oz * alpha * 100).toFixed(2);
  $(input).parent().parent().parent().parent().find("#recipe-hop-aau").val(aau);
  CalculateIBU();
}

function CalculateIBUForHop(input) {
  var usage = $(input).parent().parent().parent().parent().find("#recipe-hop-usage").val();
  if(usage == "Boil" || usage == "Aroma") {
    $(input).parent().parent().parent().parent().find("#recipe-hop-time").prop("disabled", false);
  } else if(usage == "Dry hop") {
    $(input).parent().parent().parent().parent().find("#recipe-hop-time").val("0");
    $(input).parent().parent().parent().parent().find("#recipe-hop-time").prop("disabled", true);
  } else if(usage == "Mash") {
    $(input).parent().parent().parent().parent().find("#recipe-hop-time").val("0");
    $(input).parent().parent().parent().parent().find("#recipe-hop-time").prop("disabled", true);
  } else if(usage == "First Wort") {
    $(input).parent().parent().parent().parent().find("#recipe-hop-time").val("60");
    $(input).parent().parent().parent().parent().find("#recipe-hop-time").prop("disabled", true);
  }
  var wgrams = $(input).parent().parent().parent().parent().find("#recipe-hop-g").val();
  var hop_time = $(input).parent().parent().parent().parent().find("#recipe-hop-time").val();
  var aau = $(input).parent().parent().parent().parent().find("#recipe-hop-aau").val();
  var alpha = $(input).parent().parent().parent().parent().find("#recipe-hop-aau").data("alpha");
  var boil_size = $("#recipe-info-boil-size").val();
  var gravity = $("#original-gravity").html();
  if(wgrams == "") {
    return;
  }
  if(aau == "") {
    return;
  }
  if(alpha == "") {
    return;
  }
  if(gravity == "") {
    return;
  }
  if(boil_size == "") {
    return;
  }
  if(typeof(alpha) == "string" && alpha.search("-")) {
    var r = alpha.split("-");
    alpha = parseFloat(r[1]);
  }
  if(alpha > 1) {
    alpha = alpha / 100;
  }
  var fg = (1.65 * Math.pow(0.000125, (gravity - 1)));
  var ft = ((1 - Math.exp(-0.04 * hop_time)) / 4.15);
  var utilization = (fg * ft).toFixed(3);
  var ibu = 0;
  if(gravity > 1.05) {
    var correction_gravity = 1 + ((gravity - 1.05) / 2);
    ibu = ((wgrams * utilization * alpha * 1000) / (boil_size * correction_gravity)).toFixed(2);
  } else {
    ibu = ((wgrams * utilization * alpha * 1000) / (boil_size)).toFixed(2);
  }
  $(input).parent().parent().parent().parent().find("#recipe-hop-ibu").val(ibu);
  $("#recipe-yeasts-list").find(".recipe-yeast-attenuation").each(function() {
    $(this).change();
  });
}

function CalculateIBU() {
  var ibu = 0;
  $("#recipe-hops-list").find(".recipe-hop-ibu").each(function() {
    CalculateIBUForHop(this);
    ibu = ibu + parseFloat($(this).val());
  });
  $("#ibu-og").html((ibu).toFixed(2));
  CalculateTinseth();
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
  $("#recipe-yeasts-list").find(".recipe-yeast-attenuation").each(function() {
    $(this).change();
  });
}

function CalculateTinseth() {
  var tinseth = 0;
  $("#recipe-hops-list").find(".recipe-hop-aau").each(function() {
    tinseth = tinseth + parseFloat($(this).val());
  });
  $("#bitterness").html((tinseth).toFixed(2));
}

function addToRecipe(type, item) {
  console.log(item);
  if(typeof(item) == "string") {
    item = JSON.parse(unescape(item));
  }
  if(type == "fermentables") {
    type = "fermentable";
  }
  var html = "";
  if(typeof(item) != "object") {
    return;
  }
  if(type == "fermentable") {
    html = "<tr>";
      html += "<td>";
        html += "<table>";
          html += "<tr>";
            html += "<td colspan=\"2\">" + item.supplier + " " + item.name + " (" + item.origin + ")</td>";
            html += "<td><button type=\"button\" class=\"btn btn-primary\" style=\"float: right;\" onclick=\"removeFermentableRow(this)\">Remove</button>";
          html += "</tr>";
          html += "<tr>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-fermentable-specific-gravity\">Gravity (S.G.)</label>";
                html += "<input type=\"number\" class=\"form-control recipe-fermentable-specific-gravity\" id=\"recipe-fermentable-specific-gravity\" name=\"recipe-fermentable-specific-gravity\" disabled=\"disabled\"";
                  html += "data-toggle=\"tooltip\" value=\"" + item.specific_gravity + "\" data-placement=\"bottom\" title=\"Specific gravity of the fermentable. Used for Original Gravity calculations.\"/>";
              html += "</div>";
            html += "</td>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-fermentable-color\">Color (EBC)</label>";
                html += "<input type=\"text\" class=\"form-control recipe-fermentable-color\" id=\"recipe-fermentable-color\" name=\"recipe-fermentable-color\" disabled=\"disabled\"";
                  html += "data-toggle=\"tooltip\" value=\"" + item.color + "\" data-placement=\"bottom\" title=\"Color of the fermentable. Used for color calculations.\"/>";
              html += "</div>";
            html += "</td>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-fermentable-after-boil\">After boil</label>";
                html += "<input type=\"text\" class=\"form-control recipe-fermentable-after-boil\" id=\"recipe-fermentable-after-boil\" name=\"recipe-fermentable-after-boil\" disabled=\"disabled\"";
                  html += "data-toggle=\"tooltip\" value=\"" + item.after_boil + "\" data-placement=\"bottom\" title=\"Should the fermentable be added after boil?\"/>";
              html += "</div>";
            html += "</td>";
          html += "</tr>";
          html += "<tr>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-fermentable-percentage\">Fermentable (%)</label>";
                html += "<input type=\"number\" class=\"form-control recipe-fermentable-percentage\" id=\"recipe-fermentable-percentage\" name=\"recipe-fermentable-percentage\" min=\"0\" max=\"100\" value=\"100\" ";
                  html += "data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Percentage of fermentable in the fermentable bill.\" onchange=\"updateWeightByPercent(this)\" onclick=\"this.select()\"/>";
              html += "</div>";
            html += "</td>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-fermentable-kg\">Kg</label>";
                html += "<input type=\"number\" class=\"form-control recipe-fermentable-kg\" id=\"recipe-fermentable-kg\" name=\"recipe-fermentable-kg\" value=\"" + $("#fermentables-malt-amount").val() + "\" ";
                  html += "data-toggle=\"tooltip\" data-placement=\"bottom\" data-id=\"" + item.id + "\" title=\"Amount of fermentable in kilogram in the fermentable bill.\" onchange=\"updateWeightByKg(this)\" onclick=\"this.select()\" />";
              html += "</div>";
            html += "</td>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-fermentable-lb\">Lbs</label>";
                html += "<input type=\"number\" class=\"form-control\" id=\"recipe-fermentable-lb\" name=\"recipe-fermentable-lb\" value=\"" + ($("#fermentables-malt-amount").val() * 2.20462262).toFixed(2) + "\" ";
                  html += "data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Amount of fermentable in pounds in the fermentable bill.\" onchange=\"updateWeightByLbs(this)\" onclick=\"this.select()\"/>";
              html += "</div>";
            html += "</td>";
          html += "</tr>";
        html += "</table>";
      html += "</td>";
    html += "</tr>";
    if($("#recipe-fermentables-list tr").length == 0) {
      $("#recipe-fermentables-list").html(html);
    } else {
      $("#recipe-fermentables-list > tr:last").after(html);
    }
  } else if(type == "hops"){
    html = "<tr>";
      html += "<td>";
        html += "<table>";
          html += "<tr>";
            html += "<td colspan=\"3\">" + item.name + " (" + item.origin + ")</td>";
            html += "<td><button type=\"button\" class=\"btn btn-primary\" style=\"float: right;\" onclick=\"removeHopRow(this)\">Remove</button>";
          html += "</tr>";
          html += "<tr>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-hop-g\">Gram</label>";
                html += "<input type=\"number\" class=\"form-control recipe-hop-g\" id=\"recipe-hop-g\" name=\"recipe-hop-g\" value=\"0\" data-id=\"" + item.id + "\"";
                  html += "data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Amount of hop in grams in the hop bill.\" onchange=\"updateWeightByG(this, '" + item.alpha + "')\" onclick=\"this.select()\" />";
              html += "</div>";
            html += "</td>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-hop-oz\">Oz</label>";
                html += "<input type=\"number\" class=\"form-control recipe-hop-oz\" id=\"recipe-hop-oz\" name=\"recipe-hop-oz\" value=\"0\" ";
                  html += "data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Amount of hop in oz in the hop bill.\" onchange=\"updateWeightByOz(this, '" + item.alpha + "')\" onclick=\"this.select()\"/>";
              html += "</div>";
            html += "</td>";
            html += "<td colspan=\"2\">";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-hop-aau\">AAU</label>";
                html += "<input type=\"number\" class=\"form-control recipe-hop-aau\" disabled=\"disabled\" id=\"recipe-hop-aau\" name=\"recipe-hop-aau\" value=\"0\" data-alpha=\"" + item.alpha + "\"";
                  html += "data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Alpha Acid Units\" onclick=\"this.select()\" />";
              html += "</div>";
            html += "</td>";
          html += "</tr>";
          html += "<tr>";
          html += "<td>";
            html += "<div class=\"form-group\">";
              html += "<label for=\"recipe-hop-type\">Type</label>";
              html += "<select class=\"form-control recipe-hop-type\" name=\"recipe-hop-type\" id=\"recipe-hop-type\">";
                html += "<option>Pellet</option>";
                html += "<option>Plug</option>";
                html += "<option>Leaf</option>";
              html += "</select>";
            html += "</div>";
          html += "</td>";
          html += "<td>";
            html += "<div class=\"form-group\">";
              html += "<label for=\"recipe-hop-usage\">Usage</label>";
              html += "<select class=\"form-control recipe-hop-usage\" name=\"recipe-hop-usage\" id=\"recipe-hop-usage\" onchange=\"CalculateIBUForHop(this)\">";
                html += "<option>Boil</option>";
                html += "<option>Dry hop</option>";
                html += "<option>Mash</option>";
                html += "<option>First Wort</option>";
                html += "<option>Aroma</option>";
              html += "</select>";
            html += "</div>";
          html += "</td>";
          html += "<td>";
            html += "<div class=\"form-group\">";
              html += "<label for=\"recipe-hop-time\">Time</label>";
              html += "<select class=\"form-control recipe-hop-time\" name=\"recipe-hop-time\" disabled=\"disabled\" id=\"recipe-hop-time\" onchange=\"CalculateIBUForHop(this)\">";
              for(var x = 0; x < 180; x++) {
                if(x == 60) {
                  html += "<option selected=\"selected\">" + x + "</option>";
                } else {
                  html += "<option>" + x + "</option>";
                }
              }
              html += "</select>";
            html += "</div>";
          html += "</td>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-hop-ibu\">IBU</label>";
                html += "<input type=\"number\" class=\"form-control recipe-hop-ibu\" id=\"recipe-hop-ibu\" disabled=\"disabled\" name=\"recipe-hop-ibu\" value=\"0\" ";
                  html += "data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Calculated IBU for the hop.\" />";
              html += "</div>";
            html += "</td>";
          html += "</tr>";
        html += "</table>";
      html += "</td>";
    html += "</tr>";
    if($("#recipe-hops-list tr").length == 0) {
      $("#recipe-hops-list").html(html);
    } else {
      $("#recipe-hops-list > tr:last").after(html);
    }
  } else if(type == "miscs") {
    html = "<tr>";
      html += "<td>";
        html += "<table>";
          html += "<tr>";
            html += "<td colspan=\"3\">" + item.name + "</td>";
            html += "<td><button type=\"button\" class=\"btn btn-primary\" style=\"float: right;\" onclick=\"removeMiscRow(this)\">Remove</button>";
          html += "</tr>";
          html += "<tr>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-misc-amount\">Amount</label>";
                html += "<input type=\"number\" class=\"form-control recipe-misc-amount\" id=\"recipe-misc-amount\" name=\"recipe-misc-amount\" value=\"0\" ";
                  html += "data-toggle=\"tooltip\" data-placement=\"bottom\" data-id=\"" + item.id + "\" title=\"Amount of misc.\" onchange=\"\" onclick=\"this.select()\" />";
              html += "</div>";
            html += "</td>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-misc-unit\">Unit</label>";
                html += "<select class=\"form-control recipe-misc-unit\" name=\"recipe-misc-unit\" id=\"recipe-misc-unit\" onchange=\"\">";
                  html += "<option>Each</option>";
                  html += "<option>Kg</option>";
                  html += "<option>Gram</option>";
                  html += "<option>Liter</option>";
                  html += "<option>Lb</option>";
                  html += "<option>Pz</option>";
                  html += "<option>Floz</option>";
                  html += "<option>Gal</option>";
                  html += "<option>Pt</option>";
                  html += "<option>Qt</option>";
                  html += "<option>Tbsp</option>";
                  html += "<option>Tsp</option>";
                html += "</select>";
              html += "</div>";
            html += "</td>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-misc-time\">Time</label>";
                html += "<input type=\"number\" class=\"form-control recipe-misc-time\" id=\"recipe-misc-time\" name=\"recipe-misc-time\" value=\"" + item.utime + "\" ";
                  html += "data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Time to use misc.\" onchange=\"\" onclick=\"this.select()\" />";
              html += "</div>";
            html += "</td>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-misc-usage\">Usage</label>";
                html += "<select class=\"form-control recipe-misc-usage\" name=\"recipe-misc-usage\" id=\"recipe-misc-usage\" onchange=\"\">";
                  html += "<option>Mash</option>";
                  html += "<option>Boil</option>";
                  html += "<option>Flameout</option>";
                  html += "<option>Primary</option>";
                  html += "<option>Secondary</option>";
                  html += "<option>Bottling</option>";
                html += "</select>";
              html += "</div>";
            html += "</td>";
          html += "</tr>";
        html += "</table>";
      html += "</td>";
    html += "</tr>";
    if($("#recipe-miscs-list tr").length == 0) {
      $("#recipe-miscs-list").html(html);
    } else {
      $("#recipe-miscs-list > tr:last").after(html);
    }
  } else if(type == "yeasts") {
    html = "<tr>";
      html += "<td>";
        html += "<table>";
          html += "<tr>";
            html += "<td colspan=\"3\">" + item.name + "</td>";
            html += "<td><button type=\"button\" class=\"btn btn-primary\" style=\"float: right;\" onclick=\"removeYeastRow(this)\">Remove</button>";
          html += "</tr>";
          html += "<tr>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-yeast-min-temperature\">Min temp</label>";
                html += "<input type=\"number\" class=\"form-control recipe-yeast-min-temperature\" disabled=\"disabled\" id=\"recipe-yeast-min-temperature\" name=\"recipe-yeast-min-temperature\" value=\"" + item.min_temperature + "\" ";
                  html += "data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Minimum temperature for fermentation.\" onchange=\"\" onclick=\"this.select()\" />";
              html += "</div>";
            html += "</td>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-yeast-max-temperature\">Max temp</label>";
                html += "<input type=\"number\" class=\"form-control recipe-yeast-max-temperature\" disabled=\"disabled\" id=\"recipe-yeast-max-temperature\" name=\"recipe-yeast-max-temperature\" value=\"" + item.max_temperature + "\" ";
                  html += "data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Maximum temperature for fermentation.\" onchange=\"\" onclick=\"this.select()\" />";
              html += "</div>";
            html += "</td>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-yeast-flocculation\">Flocculation</label>";
                html += "<input type=\"text\" class=\"form-control recipe-yeast-flocculation\" id=\"recipe-yeast-flocculation\" disabled=\"disabled\" name=\"recipe-yeast-flocculation\" value=\"" + item.flocculation + "\" ";
                  html += "data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Flocculation of yeast.\" onchange=\"\" onclick=\"this.select()\" />";
              html += "</div>";
            html += "</td>";
            html += "<td>";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-yeast-attenuation\">Attenuation</label>";
                html += "<select class=\"form-control recipe-yeast-attenuation\" name=\"recipe-yeast-attenuation\" disabled=\"disabled\" id=\"recipe-yeast-attenuation\" onchange=\"CalculateFG(this)\">";
                  for(var x = 0; x <= 100; x++) {
                    if(x == item.attenuation) {
                      html += "<option selected=\"selected\">" + x + "</option>";
                    } else {
                      html += "<option>" + x + "</option>";
                    }
                  }
                html += "</select>";
              html += "</div>";
            html += "</td>";
          html += "</tr>";
          html += "<tr>";
            html += "<td colspan=\"2\">";
              html += "<div class=\"form-group\">";
                html += "<label for=\"recipe-yeast-amount\">Amount</label>";
                html += "<input type=\"number\" class=\"form-control recipe-yeast-amount\" id=\"recipe-yeast-amount\" name=\"recipe-yeast-amount\" data-id=\"" + item.id + "\"";
                  html += "data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Amount of yeast to use for the brew.\" onchange=\"\" onclick=\"this.select()\" />";
              html += "</div>";
            html += "</td>";
            html += "<td>";
            html += "<div class=\"form-group\">";
              html += "<label for=\"recipe-yeast-amount-type\">Amount type</label>";
              html += "<select class=\"form-control recipe-yeast-amount-type\" name=\"recipe-yeast-amount-type\" id=\"recipe-yeast-amount-type\" onchange=\"CalculateFG(this)\">";
                html += "<option>Grams</option>";
                html += "<option>Liters</option>";
                html += "<option>Oz</option>";
                html += "<option>Floz</option>";
                html += "<option>Gallons</option>";
              html += "</select>";
            html += "</div>";
            html += "</td>";
            html += "<td>";
              html += "<label for=\"recipe-yeast-starter-required\">Starter</label>";
              html += "<select class=\"form-control recipe-yeast-starter-required\" name=\"recipe-yeast-starter-required\" id=\"recipe-yeast-starter-required\" onchange=\"CalculateFG(this)\">";
                html += "<option>Yes</option>";
                html += "<option>No</option>";
              html += "</select>";
            html += "</td>";
          html += "</tr>";
        html += "</table>";
      html += "</td>";
    html += "</tr>";
    if($("#recipe-yeasts-list tr").length == 0) {
      $("#recipe-yeasts-list").html(html);
    } else {
      $("#recipe-yeasts-list > tr:last").after(html);
    }
    $("#recipe-yeasts-list").find(".recipe-yeast-attenuation").each(function() {
      CalculateFG(this);
    });
  }
  CalculateOG();
}
$("#recipe-scale-range").on("input", function() {
  $("#scale-amount").html($("#recipe-scale-range").val());
});

$("#recipe-scale").on("submit", function(evt) {
  evt.preventDefault();
  var percent = $("#recipe-scale-range").val() / 100;
  $("#recipe-info-batch-size").val(($("#recipe-info-batch-size").val() * percent).toFixed(2));
  $("#recipe-info-batch-size").change();
  $("#recipe-info-boil-size").val(($("#recipe-info-boil-size").val() * percent).toFixed(2));
  $("#recipe-info-boil-size").change();
  $("#fermentables-malt-amount").val(($("#fermentables-malt-amount").val() * percent).toFixed(2));
  $("#fermentables-malt-amount").change();
  $("#recipe-fermentables-list").find(".recipe-fermentable-percentage").each(function() {
    $(this).val(($(this).val() * percent).toFixed(2));
    $(this).change();
  });
  $("#recipe-hops-list").find(".recipe-hop-g").each(function() {
    $(this).val(($(this).val() * percent).toFixed(2));
    $(this).change();
  });
  CalculateOG();
  $("#recipe-yeasts-list").find(".recipe-yeast-attenuation").each(function() {
    CalculateFG(this);
  });
  CalculateIBU();
  CalculateABV();
  CalculateCalories();
  CalculateEBC();
  CalculateTinseth();
});

$("#recipe-info-type").on("change", function() {
  $("#add-recipe-failed-no-type").hide();
});

$("#recipe-info-name").on("change", function() {
  $("#add-recipe-failed-name").hide();
});

$("#save-recipe-button").on("click", function() {
  var recipe_type = $("#recipe-info-type").val();
  if(recipe_type == "Type of recipe") {
    $("#add-recipe-failed-no-type").show();
    return;
  }
  var recipe_name = $("#recipe-info-name").val();
  var batch_size = $("#recipe-info-batch-size").val();
  var boil_size = $("#recipe-info-boil-size").val();
  var boil_time = $("#recipe-info-boil-time").val();
  var efficiency = $("#recipe-info-efficiency").val();
  var note = $("#recipe-info-note").val();
  var share = $("#recipe-share").val();

  var fermentables_total_amount = $("#fermentables-malt-amount").val();
  var fermentables = [];
  $("#recipe-fermentables-list").find(".recipe-fermentable-kg").each(function() {
    var fermentable = { "id" : $(this).data("id"), "amount" : $(this).val() }
    fermentables.push(fermentable);
  });
  console.log(fermentables);
  var hops = [];
  $("#recipe-hops-list").find(".recipe-hop-g").each(function() {
    var hop = { "id" : $(this).data("id"), "amount" : $(this).val(),
                "time" : $(this).parent().parent().parent().parent().find(".recipe-hop-time").val(),
                "usage" : $(this).parent().parent().parent().parent().find(".recipe-hop-usage").val(),
                "type" : $(this).parent().parent().parent().parent().find(".recipe-hop-type").val() }
    hops.push(hop);
  });
  console.log(hops);
  var miscs = [];
  $("#recipe-miscs-list").find(".recipe-misc-amount").each(function() {
    var hop = { "id" : $(this).data("id"), "amount" : $(this).val(),
                "time" : $(this).parent().parent().parent().parent().find(".recipe-misc-time").val(),
                "usage" : $(this).parent().parent().parent().parent().find(".recipe-misc-usage").val(),
                "unit" : $(this).parent().parent().parent().parent().find(".recipe-misc-unit").val() }
    miscs.push(hop);
  });
  console.log(miscs);
  var yeasts = [];
  $("#recipe-yeasts-list").find(".recipe-yeast-amount").each(function() {
    var hop = { "id" : $(this).data("id"), "amount" : $(this).val(),
                "amount-type" : $(this).parent().parent().parent().parent().find(".recipe-yeast-amount-type").val(),
                "starter-required" : $(this).parent().parent().parent().parent().find(".recipe-yeast-starter-required").val() }
    yeasts.push(hop);
  });
  console.log(yeasts);

  var packet = {
    "uid" : Cookies.get("user-id"),
    "type" : recipe_type,
    "name" : recipe_name,
    "batch_size" : batch_size,
    "boil_size" : boil_size,
    "boil_time" : boil_time,
    "efficiency" : efficiency,
    "note" : note,
    "fermentable_amount" : fermentables_total_amount,
    "fermentables" : fermentables,
    "hops" : hops,
    "miscs" : miscs,
    "yeasts" : yeasts,
    "share" : share
  }
  var stringified = JSON.stringify(packet);
  var encoded = encodeURIComponent(stringified);
  console.log("request packet:" + encoded);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : "request=save-recipe&packet=" + encoded
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log("response: ");
    console.log(response);
    if(response.success == "true") {
      $(".content").hide();
      $("#browse-your-recipes").show();
      $("#search-your-recipes-form").submit();
      $("#add-recipe-success").show();
    } else {
      if(response.reason == "Too similar name to another existing recipe wich has same used") {
        $("#add-recipe-failed-name").show();
      }
    }
  });
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

$("#browse-your-recipes-navbar-button").on("click", function() {
  $(".content").hide();
  $(".alert").hide();
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $("#browse-your-recipes").show();
});

function clear_recipe() {
  $("#modify-recipe-button").hide();
  $("#add-recipe-failed-no-type").hide();
  $("#add-recipe-failed-name").hide();
  $("#recipe-info-type").val("Type of recipe");
  $("#recipe-info-name").val("");
  $("#recipe-info-batch-size").val("21");
  $("#recipe-info-boil-size").val("25");
  $("#recipe-info-boil-time").val("60");
  $("#recipe-info-note").val("");
  $("#fermentables-malt-amount").val("");
  $("#recipe-share").val("Private");
  $("#recipe-fermentables-list").html("");
  $("#recipe-hops-list").html("");
  $("#recipe-miscs-list").html("");
  $("#recipe-yeasts-list").html("");
}


function delete_recipe(item) {
  item = JSON.parse(unescape(item));
  var data = "request=delete-recipe&id=" + item.id + "&uid=" + Cookies.get("user-id");
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
      $("#remove-recipe-error").hide();
      $("#search-your-recipes-form").submit();
      $("#remove-recipe-success").show();
    } else {
      $("#search-your-recipes-form").submit();
      $("#remove-recipe-success").hide();
      $("#remove-recipe-error").show();
    }
  });
}

function open_recipe(item) {
  citem = item;
  item = JSON.parse(unescape(item));
  $("#remove-recipe-success").hide();
  $("#remove-recipe-error").hide();
  $("#add-new-recipe-navbar-button").click();
  $("#recipe-info-type").val(item.type);
  $("#recipe-info-name").val(item.name);
  $("#recipe-info-batch-size").val(item.batch_size);
  $("#recipe-info-batch-size").change();
  $("#recipe-info-boil-size").val(item.boil_size);
  $("#recipe-info-boil-size").change();
  $("#recipe-info-boil-time").val(item.boil_time);
  $("#recipe-info-note").val(item.note);
  $("#fermentables-malt-amount").val(item.fermentables_amount);
  $("#recipe-share").val(item.share);
  for(var x = 0; x < item.fermentables.length; x++) {
    for(var i = 0; i < quickData.fermentables.malt.length; i++) {
      if(quickData.fermentables.malt[i].id == item.fermentables[x].fip) {
        addToRecipe("fermentable", quickData.fermentables.malt[i]);
      }
    }
    for(var i = 0; i < quickData.fermentables.sugar.length; i++) {
      if(quickData.fermentables.sugar[i].id == item.fermentables[x].fip) {
        addToRecipe("fermentable", quickData.fermentables.sugar[i]);
      }
    }
    for(var i = 0; i < quickData.fermentables.fruit.length; i++) {
      if(quickData.fermentables.fruit[i].id == item.fermentables[x].fip) {
        addToRecipe("fermentable", quickData.fermentables.fruit[i]);
      }
    }
    for(var i = 0; i < quickData.fermentables.extract.length; i++) {
      if(quickData.fermentables.extract[i].id == item.fermentables[x].fip) {
        addToRecipe("fermentable", quickData.fermentables.extract[i]);
      }
    }
    for(var i = 0; i < quickData.fermentables.other.length; i++) {
      if(quickData.fermentables.other[i].id == item.fermentables[x].fip) {
        addToRecipe("fermentable", quickData.fermentables.other[i]);
      }
    }
    $(".recipe-fermentable-kg:last").val(item.fermentables[x].amount);
  }
  for(var x = 0; x < item.hops.length; x++) {
    for(var i = 0; i < quickData.hops.bittering.length; i++) {
      if(quickData.hops.bittering[i].id == item.hops[x].hip) {
        addToRecipe("hops", quickData.hops.bittering[i]);
      }
    }
    for(var i = 0; i < quickData.hops.aroma.length; i++) {
      if(quickData.hops.aroma[i].id == item.hops[x].hip) {
        addToRecipe("hops", quickData.hops.aroma[i]);
      }
    }
    for(var i = 0; i < quickData.hops.both.length; i++) {
      if(quickData.hops.both[i].id == item.hops[x].hip) {
        addToRecipe("hops", quickData.hops.both[i]);
      }
    }
    $(".recipe-hop-g:last").val(item.hops[x].amount);
    $(".recipe-hop-g:last").change();
    $(".recipe-hop-type:last").val(item.hops[x].type);
    $(".recipe-hop-usage:last").val(item.hops[x].usage);
    $(".recipe-hop-time:last").val(item.hops[x].ctime);
  }
  for(var x = 0; x < item.miscs.length; x++) {
    for(var i = 0; i < quickData.miscs.spice.length; i++) {
      if(quickData.miscs.spice[i].id == item.miscs[x].mip) {
        addToRecipe("miscs", quickData.miscs.spice[i]);
      }
    }
    for(var i = 0; i < quickData.miscs.fining.length; i++) {
      if(quickData.miscs.fining[i].id == item.miscs[x].mip) {
        addToRecipe("miscs", quickData.miscs.fining[i]);
      }
    }
    for(var i = 0; i < quickData.miscs.water_agent.length; i++) {
      if(quickData.miscs.water_agent[i].id == item.miscs[x].mip) {
        addToRecipe("miscs", quickData.miscs.water_agent[i]);
      }
    }
    for(var i = 0; i < quickData.miscs.herb.length; i++) {
      if(quickData.miscs.herb[i].id == item.miscs[x].mip) {
        addToRecipe("miscs", quickData.miscs.herb[i]);
      }
    }
    for(var i = 0; i < quickData.miscs.flavor.length; i++) {
      if(quickData.miscs.flavor[i].id == item.miscs[x].mip) {
        addToRecipe("miscs", quickData.miscs.flavor[i]);
      }
    }
    for(var i = 0; i < quickData.miscs.other.length; i++) {
      if(quickData.miscs.other[i].id == item.miscs[x].mip) {
        addToRecipe("miscs", quickData.miscs.other[i]);
      }
    }
    $(".recipe-misc-amount:last").val(item.misc[x].amount);
    $(".recipe-misc-unit:last").val(item.misc[x].unit);
    $(".recipe-misc-usage:last").val(item.misc[x].usage);
    $(".recipe-misc-time:last").val(item.misc[x].ctime);
  }
  for(var x = 0; x < item.yeasts.length; x++) {
    for(var i = 0; i < quickData.yeasts.ale.length; i++) {
      if(quickData.yeasts.ale[i].id == item.yeasts[x].yip) {
        addToRecipe("yeasts", quickData.yeasts.ale[i]);
      }
    }
    for(var i = 0; i < quickData.yeasts.lager.length; i++) {
      if(quickData.yeasts.lager[i].id == item.yeasts[x].yip) {
        addToRecipe("yeasts", quickData.yeasts.lager[i]);
      }
    }
    for(var i = 0; i < quickData.yeasts.wheat.length; i++) {
      if(quickData.yeasts.wheat[i].id == item.yeasts[x].yip) {
        addToRecipe("yeasts", quickData.yeasts.wheat[i]);
      }
    }
    for(var i = 0; i < quickData.yeasts.wine.length; i++) {
      if(quickData.yeasts.wine[i].id == item.yeasts[x].yip) {
        addToRecipe("yeasts", quickData.yeasts.wine[i]);
      }
    }
    for(var i = 0; i < quickData.yeasts.champagne.length; i++) {
      if(quickData.yeasts.champagne[i].id == item.yeasts[x].yip) {
        addToRecipe("yeasts", quickData.yeasts.champagne[i]);
      }
    }
    for(var i = 0; i < quickData.yeasts.other.length; i++) {
      if(quickData.yeasts.other[i].id == item.yeasts[x].yip) {
        addToRecipe("yeasts", quickData.yeasts.other[i]);
      }
    }
    $(".recipe-yeast-amount:last").val(item.yeasts[x].amount);
    $(".recipe-yeast-amount-type:last").val(item.yeasts[x].amount_type);
    $(".recipe-yeast-starter-required:last").val(item.yeasts[x].starter_required);
  }
  $("#modify-recipe-button").show();
  $("#modify-recipe-button").on("click", function() {
    delete_recipe(citem);
    $("#save-recipe-button").click();
  });
  $("#save-recipe-button").html("Save as new recipe");
  $(".recipe-fermentable-kg").change();
  CalculateOG();
  $("#recipe-yeasts-list").find(".recipe-yeast-attenuation").each(function() {
    CalculateFG(this);
  });
  CalculateIBU();
  CalculateABV();
  CalculateCalories();
  CalculateEBC();
  CalculateTinseth();
}

$("#search-your-recipes-form").on("submit", function(evt) {
  evt.preventDefault();
  var data = $(this).serialize() + "&uid=" + Cookies.get("user-id");
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
      var html;
      response.recipes.forEach(function(item, index) {
        html += "<tr id=\"" + index + "-row\">";
        html += "<td>" + (index + 1) + "</td>";
        html += "<td>" + item.name + "</td>";
        html += "<td><button type=\"button\" class=\"btn btn-primary mb-2\" onclick=\"open_recipe('" + escape(JSON.stringify(item)) + "')\">Open</button></td>";
        html += "<td><button type=\"button\" class=\"btn btn-warning mb-2\" onclick=\"delete_recipe('" + escape(JSON.stringify(item)) + "')\">Delete</button></td>";
        html += "</tr>";
      });
      $("#search-your-recipes-table-body").html(html);
      $(".alert").hide();
      $("#search-your-recipes-table").show();
    } else {
      $("#search-your-recipes-table-body").html("");
      $(".alert").hide();
      $("#search-your-recipes-table").show();
    }
  });
});

$("#add-new-recipe-navbar-button").on("click", function() {
  clear_recipe();
  $(".recipe-block").css("background-color", $(".jumbotron").css("background-color"));
  $(".content").hide();
  $(".alert").hide();
  $("#add-recipe").show();
  if(window.innerWidth >= 768) {
    $(".centered-content").css("width", "640px");
  }
  if(window.innerWidth >= 1024) {
    $(".centered-content").css("width", "768px");
  }
  if(window.innerWidth <= 425 && window.innerWidth > 375) {
    $(".centered-content").css("padding-left", "1px");
    $(".centered-content").css("padding-right", "1px");
    $(".centered-content").css("width", "421px");
  } else if(window.innerWidth <= 375 && window.innerWidth > 320) {
    $(".centered-content").css("padding-left", "1px");
    $(".centered-content").css("padding-right", "1px");
    $(".centered-content").css("width", "371px");
  }else if(window.innerWidth <= 320) {
    $(".centered-content").css("padding-left", "1px");
    $(".centered-content").css("padding-right", "1px");
    $(".centered-content").css("width", "316px");
  }
  $("#search-ingredients-request").val("search-fermentables");
  $("#scale-amount").html($("#recipe-scale-range").val());
  $("#efficiency").html($("#recipe-info-efficiency").val() + " %");
  $("#original-gravity").html("");
  $("#final-gravity").html("");
  $("#color-ebc").html("");
  $("#color-srm").html("");
  $("#color-square").html("");
  $("#bitterness").html("");
  $("#alcohol").html("");
  $("#ibu-og").html("");
  $("#calories").html("");
  $("#recipe-info-batch-size-gallon").val(($("#recipe-info-batch-size").val() / 3.78541178).toFixed(2));
  var batch_liter = $("#recipe-info-batch-size").val();
  var batch_gallon = $("#recipe-info-batch-size-gallon").val();
  $("#batch-size").html(batch_liter + " L / " + batch_gallon + " Gal");
  $("#recipe-info-boil-size-gallon").val(($("#recipe-info-boil-size").val() / 3.78541178).toFixed(2));
  var boil_liter = $("#recipe-info-boil-size").val();
  var boil_gallon = $("#recipe-info-boil-size-gallon").val();
  $("#boil-size").html(boil_liter + " L / " + boil_gallon + " Gal");
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : "request=get-every-ingredient",
    async : false
  });
  request.done(function(response, textStatus, jqXHR) {
    if(response.success == "true") {
      console.log(response);
      quickData = response;
      var flist = "";
      for(x = 0; x < response.fermentables.malt.length; x++) {
        var id = response.fermentables.malt[x].id;
        var name = response.fermentables.malt[x].supplier + " " + response.fermentables.malt[x].name + " (" + response.fermentables.malt[x].origin + ")";
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.fermentables.sugar.length; x++) {
        var id = response.fermentables.sugar[x].id;
        var name = response.fermentables.sugar[x].supplier + " " + response.fermentables.sugar[x].name + " (" + response.fermentables.sugar[x].origin + ")";
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.fermentables.fruit.length; x++) {
        var id = response.fermentables.fruit[x].id;
        var name = response.fermentables.fruit[x].supplier + " " + response.fermentables.fruit[x].name + " (" + response.fermentables.fruit[x].origin + ")";
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.fermentables.extract.length; x++) {
        var id = response.fermentables.extract[x].id;
        var name = response.fermentables.extract[x].supplier + " " + response.fermentables.extract[x].name + " (" + response.fermentables.extract[x].origin + ")";
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.fermentables.other.length; x++) {
        var id = response.fermentables.other[x].id;
        var name = response.fermentables.other[x].supplier + " " + response.fermentables.other[x].name + " (" + response.fermentables.other[x].origin + ")";
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      $("#fermentables-list").html(flist);
      flist = "";
      for(x = 0; x < response.hops.bittering.length; x++) {
        var id = response.hops.bittering[x].id;
        var name = response.hops.bittering[x].name + " (" + response.hops.bittering[x].origin + ")";
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.hops.aroma.length; x++) {
        var id = response.hops.aroma[x].id;
        var name = response.hops.aroma[x].name + " (" + response.hops.aroma[x].origin + ")";
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.hops.both.length; x++) {
        var id = response.hops.both[x].id;
        var name =response.hops.both[x].name + " (" + response.hops.both[x].origin + ")";
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      $("#hops-list").html(flist);
      console.log(response.miscs.spice);
      flist = "";
      for(x = 0; x < response.miscs.spice.length; x++) {
        var id = response.miscs.spice[x].id;
        var name = response.miscs.spice[x].name;
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.miscs.fining.length; x++) {
        var id = response.miscs.fining[x].id;
        var name = response.miscs.fining[x].name;
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.miscs.water_agent.length; x++) {
        var id = response.miscs.water_agent[x].id;
        var name = response.miscs.water_agent[x].name;
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.miscs.herb.length; x++) {
        var id = response.miscs.herb[x].id;
        var name = response.miscs.herb[x].name;
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.miscs.flavor.length; x++) {
        var id = response.miscs.flavor[x].id;
        var name = response.miscs.flavor[x].name;
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.miscs.other.length; x++) {
        var id = response.miscs.other[x].id;
        var name = response.miscs.other[x].name;
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      $("#miscs-list").html(flist);
      flist = "";
      for(x = 0; x < response.yeasts.ale.length; x++) {
        var id = response.yeasts.ale[x].id;
        var name = response.yeasts.ale[x].name;
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.yeasts.lager.length; x++) {
        var id = response.yeasts.lager[x].id;
        var name = response.yeasts.lager[x].name;
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.yeasts.wheat.length; x++) {
        var id = response.yeasts.wheat[x].id;
        var name = response.yeasts.wheat[x].name;
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.yeasts.wine.length; x++) {
        var id = response.yeasts.wine[x].id;
        var name = response.yeasts.wine[x].name;
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.yeasts.champagne.length; x++) {
        var id = response.yeasts.champagne[x].id;
        var name = response.yeasts.champagne[x].name;
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      for(x = 0; x < response.yeasts.other.length; x++) {
        var id = response.yeasts.other[x].id;
        var name = response.yeasts.other[x].name;
        flist += "<option data-fid=\"" + id + "\" value=\"" + name + "\"></option>";
      }
      $("#yeasts-list").html(flist);
    } else {
    }
  });
});

$("#recipe-info-batch-size-gallon").on("change", function() {
  var gallons = $("#recipe-info-batch-size-gallon").val();
  var liters = (gallons * 3.78541178).toFixed(2);
  $("#recipe-info-batch-size").val(liters);
  $("#batch-size").html(liters + " L / " + gallons + " Gal");
  CalculateOG();
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
});

$("#recipe-info-boil-size-gallon").on("change", function() {
  var gallons = $("#recipe-info-boil-size-gallon").val();
  var liters = (gallons * 3.78541178).toFixed(2);
  $("#recipe-info-boil-size").val(liters);
  $("#boil-size").html(liters + " L / " + gallons + " Gal");
  CalculateOG();
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
});

$("#recipe-info-batch-size").on("change", function() {
  var liters = $("#recipe-info-batch-size").val();
  var gallons = (liters / 3.78541178).toFixed(2);
  $("#recipe-info-batch-size-gallon").val(gallons);
  $("#batch-size").html(liters + " L / " + gallons + " Gal");
  CalculateOG();
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
});

$("#recipe-info-boil-size").on("change", function() {
  var liters = $("#recipe-info-boil-size").val();
  var gallons = (liters / 3.78541178).toFixed(2);
  $("#recipe-info-boil-size-gallon").val(gallons);
  $("#boil-size").html(liters + " L / " + gallons + " Gal");
  CalculateOG();
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
});

$("#recipe-info-efficiency").on("change", function() {
  $("#efficiency").html($("#recipe-info-efficiency").val() + " %");
  CalculateOG();
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
});

$("#fermentables-malt-amount").on("change", function() {
  $("#fermentables-malt-amount-lb").val(($("#fermentables-malt-amount").val() * 2.20462262).toFixed(2));
  var top = $("#fermentables-malt-amount").parent().parent().parent().parent().parent().parent();
  $(top).find(".recipe-fermentable-percentage").each(function() {
    updateWeightByPercent(this);
  });
});

$("#fermentables-malt-amount-lb").on("change", function() {
  $("#fermentables-malt-amount").val(($("#fermentables-malt-amount-lb").val() / 2.20462262).toFixed(2));
  var top = $("#fermentables-malt-amount").parent().parent().parent().parent().parent().parent();
  $(top).find(".recipe-fermentable-percentage").each(function() {
    updateWeightByPercent(this);
  });
});

$("#fermentables-list-input").on("mouseenter", function() {
  $(this).val("");
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
});

$("#fermentables-list-input").on("input", function() {
  var fid = $('#fermentables-list [value="' + $(this).val() + '"]').data('fid');
  var fermentable;
  console.log(quickData);
  for(var i = 0; i < quickData.fermentables.malt.length; i++) {
    if(quickData.fermentables.malt[i].id == fid) {
      type = "fermentable";
      fermentable = quickData.fermentables.malt[i];
    }
  }
  for(var i = 0; i < quickData.fermentables.sugar.length; i++) {
    if(quickData.fermentables.sugar[i].id == fid) {
      fermentable = quickData.fermentables.sugar[i];
    }
  }
  for(var i = 0; i < quickData.fermentables.fruit.length; i++) {
    if(quickData.fermentables.fruit[i].id == fid) {
      fermentable = quickData.fermentables.fruit[i];
    }
  }
  for(var i = 0; i < quickData.fermentables.extract.length; i++) {
    if(quickData.fermentables.extract[i].id == fid) {
      fermentable = quickData.fermentables.extract[i];
    }
  }
  for(var i = 0; i < quickData.fermentables.other.length; i++) {
    if(quickData.fermentables.other[i].id == fid) {
      fermentable = quickData.fermentables.other[i];
    }
  }
  addToRecipe("fermentable", fermentable);
});

$("#hops-list-input").on("mouseenter", function() {
  $(this).val("");
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
});

$("#hops-list-input").on("input", function() {
  var fid = $('#hops-list [value="' + $(this).val() + '"]').data('fid');
  var hops;
  console.log(quickData);
  for(var i = 0; i < quickData.hops.bittering.length; i++) {
    if(quickData.hops.bittering[i].id == fid) {
      hops = quickData.hops.bittering[i];
    }
  }
  for(var i = 0; i < quickData.hops.aroma.length; i++) {
    if(quickData.hops.aroma[i].id == fid) {
      hops = quickData.hops.aroma[i];
    }
  }
  for(var i = 0; i < quickData.hops.both.length; i++) {
    if(quickData.hops.both[i].id == fid) {
      hops = quickData.hops.both[i];
    }
  }
  addToRecipe("hops", hops);
});

$("#miscs-list-input").on("mouseenter", function() {
  $(this).val("");
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
});

$("#miscs-list-input").on("input", function() {
  var fid = $('#miscs-list [value="' + $(this).val() + '"]').data('fid');
  var miscs;
  console.log(quickData);
  for(var i = 0; i < quickData.miscs.spice.length; i++) {
    if(quickData.miscs.spice[i].id == fid) {
      miscs = quickData.miscs.spice[i];
    }
  }
  for(var i = 0; i < quickData.miscs.fining.length; i++) {
    if(quickData.miscs.fining[i].id == fid) {
      miscs = quickData.miscs.fining[i];
    }
  }
  for(var i = 0; i < quickData.miscs.water_agent.length; i++) {
    if(quickData.miscs.water_agent[i].id == fid) {
      miscs = quickData.miscs.water_agent[i];
    }
  }
  for(var i = 0; i < quickData.miscs.herb.length; i++) {
    if(quickData.miscs.herb[i].id == fid) {
      miscs = quickData.miscs.herb[i];
    }
  }
  for(var i = 0; i < quickData.miscs.flavor.length; i++) {
    if(quickData.miscs.flavor[i].id == fid) {
      miscs = quickData.miscs.flavor[i];
    }
  }
  for(var i = 0; i < quickData.miscs.other.length; i++) {
    if(quickData.miscs.other[i].id == fid) {
      miscs = quickData.miscs.other[i];
    }
  }
  addToRecipe("miscs", miscs);
});

$("#yeasts-list-input").on("mouseenter", function() {
  $(this).val("");
  $("#recipe-hops-list").find(".recipe-hop-time").each(function() {
    $(this).change();
  });
});

$("#yeasts-list-input").on("input", function() {
  var fid = $('#yeasts-list [value="' + $(this).val() + '"]').data('fid');
  var yeasts;
  console.log(quickData);
  for(var i = 0; i < quickData.yeasts.ale.length; i++) {
    if(quickData.yeasts.ale[i].id == fid) {
      yeasts = quickData.yeasts.ale[i];
    }
  }
  for(var i = 0; i < quickData.yeasts.lager.length; i++) {
    if(quickData.yeasts.lager[i].id == fid) {
      yeasts = quickData.yeasts.lager[i];
    }
  }
  for(var i = 0; i < quickData.yeasts.wheat.length; i++) {
    if(quickData.yeasts.wheat[i].id == fid) {
      yeasts = quickData.yeasts.wheat[i];
    }
  }
  for(var i = 0; i < quickData.yeasts.wine.length; i++) {
    if(quickData.yeasts.wine[i].id == fid) {
      yeasts = quickData.yeasts.wine[i];
    }
  }
  for(var i = 0; i < quickData.yeasts.champagne.length; i++) {
    if(quickData.yeasts.champagne[i].id == fid) {
      yeasts = quickData.yeasts.champagne[i];
    }
  }
  for(var i = 0; i < quickData.yeasts.other.length; i++) {
    if(quickData.yeasts.other[i].id == fid) {
      yeasts = quickData.yeasts.other[i];
    }
  }
  addToRecipe("yeasts", yeasts);
});

$("#search-ingredients-what").on("change", function() {
  if($("#search-ingredients-what").val() == "Fermentables") {
    $("#search-ingredients-request").val("search-fermentables");
    var html = "<option>Malt</option>";
    html += "<option>Sugar</option>";
    html += "<option>Fruit</option>";
    html += "<option>Extract</option>";
    html += "<option>Other</option>";
    $("#search-ingredients-type").html(html);
  } else if($("#search-ingredients-what").val() == "Hops") {
    $("#search-ingredients-request").val("search-hops");
    var html = "<option>Bittering</option>";
    html += "<option>Aroma</option>";
    html += "<option>Both</option>";
    $("#search-ingredients-type").html(html);
  } else if($("#search-ingredients-what").val() == "Yeasts") {
    $("#search-ingredients-request").val("search-yeasts");
    var html = "<option>Ale</option>";
    html += "<option>Lager</option>";
    html += "<option>Wheat</option>";
    html += "<option>Wine</option>";
    html += "<option>Champagne</option>";
    html += "<option>Other</option>";
    $("#search-ingredients-type").html(html);
  } else if($("#search-ingredients-what").val() == "Miscallenous") {
    $("#search-ingredients-request").val("search-misc");
    var html = "<option>Spice</option>";
    html += "<option>Fining</option>";
    html += "<option>Water Agent</option>";
    html += "<option>Herb</option>";
    html += "<option>Flavor</option>";
    html += "<option>Other</option>";
    $("#search-ingredients-type").html(html);
  }
});

$("#search-ingredients-form").on("submit", function(evt) {
  evt.preventDefault();
  if($("#search-ingredients-request").val() == "search-ingredients") {
    return;
  }
  var data = "";
  if($("#search-ingredients-what").val() == "Fermentables") {
    data += "request=search-fermentables&search-fermentables-type-checkbox=" + $("#search-ingredients-type").val();
    data += "&search-fermentables-search-input" + $("#search-ingredients-search").val();
  } else if($("#search-ingredients-what").val() == "Hops") {
    data += "request=search-hops&search-hops-type-checkbox=" + $("#search-ingredients-type").val();
    data += "&search-hops-search-input" + $("#search-ingredients-search").val();
  } else if($("#search-ingredients-what").val() == "Yeasts") {
    data += "request=search-yeasts&search-yeasts-type-checkbox=" + $("#search-ingredients-type").val();
    data += "&search-yeasts-search-input" + $("#search-ingredients-search").val();
  } else if($("#search-ingredients-what").val() == "Miscallenous") {
    data += "request=search-miscs&search-miscs-type-checkbox=" + $("#search-ingredients-type").val();
    data += "&search-miscs-search-input" + $("#search-ingredients-search").val();
  }
  data += "&uid=" + Cookies.get("user-id");
  console.log(data);
  var request = $.ajax({
    url : "server.php",
    type : "POST",
    data : data
  });
  request.done(function(response, textStatus, jqXHR) {
    console.log(response);
    if(response.success == "true") {
      var html;
      if($("#search-ingredients-what").val() == "Fermentables") {
        response.fermentables.forEach(function(item, index) {
          html += "<tr id=\"bigbad-" + index + "-row\" onclick=\"ShowIngredientData('fermentables', '" + escape(JSON.stringify(item)) + "', " + index + ")\">";
          html += "<td>" + item.supplier + " " + item.name + " (" + item.origin + ")</td>";
          html += "</tr>";
        });
      } else if($("#search-ingredients-what").val() == "Hops") {
        response.hops.forEach(function(item, index) {
          html += "<tr id=\"bigbad-" + index + "-row\" onclick=\"ShowIngredientData('hops', '" + escape(JSON.stringify(item)) + "', " + index + ")\">";
          html += "<td>" + item.name + " (" + item.origin + ")</td>";
          html += "</tr>";
        });
      } else if($("#search-ingredients-what").val() == "Yeasts") {
        response.yeasts.forEach(function(item, index) {
          html += "<tr id=\"bigbad-" + index + "-row\" onclick=\"ShowIngredientData('yeasts', '" + escape(JSON.stringify(item)) + "', " + index + ")\">";
          html += "<td>" + item.name + " (" + item.laboratory + ")</td>";
          html += "</tr>";
        });
      } else if($("#search-ingredients-what").val() == "Miscallenous") {
        response.miscs.forEach(function(item, index) {
          html += "<tr id=\"bigbad-" + index + "-row\" onclick=\"ShowIngredientData('miscallenous', '" + escape(JSON.stringify(item)) + "', " + index + ")\">";
          html += "<td>" + item.name + "</td>";
          html += "</tr>";
        });
      }
      $("#search-ingredients-body").html(html);
      $("#search-ingredients-table").show();
      CalculateOG();
    } else {
      $("#search-ingredients-body").html("");
      $("#search-ingredients-table").show();
    }
  });
});

function ShowIngredientData(type, item, index) {
  item = JSON.parse(unescape(item));
  console.log(item);
  console.log(index);
  $(".fermentable-info-row").remove();
  var html = "<tr class=\"fermentable-info-row\">";
    html += "<td colspan=\"10\">";
      html += "<table class=\"table\" id=\"fermentable-data-table\">";
        html += "<thead><th scope=\"col\">Identifier</th><th scope=\"col\">Value</th></thead>";
        html += "<tbody>";
          if(type == "fermentables") {
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
          } else if(type == "hops") {
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
          } else if(type == "yeasts") {
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
          } else if(type == "miscallenous") {
            if(item.used != "") {
              html += "<tr><td>Use:</td><td>" + item.used + " </td></tr>";
            }
            if(item.utime != "") {
              html += "<tr><td>Time:</td><td>" + item.utime + " </td></tr>";
            }
            if(item.use_note != "") {
              html += "<tr><td colspan=\"2\">Use description:</td></tr>";
              html += "<tr><td colspan=\"2\">" + item.use_note + "</td></tr>";
            }
            if(item.note != "") {
              html += "<tr><td colspan=\"2\">Note:</td></tr>";
              html += "<tr><td colspan=\"2\">" + item.note + "</td></tr>";
            }
          }
          html += "<tr><td colspan=\"2\">";
            html += "<button type=\"button\" class=\"btn btn-success\" onclick=\"addToRecipe('" + type + "', '" + escape(JSON.stringify(item)) + "')\">Add to Recipe</button>";
          html += "</td></tr>";
        html += "</tbody>";
      html += "</table>";
    html += "</td>";
  html += "</tr>";
  $("#bigbad-" + index + "-row").after(html);
  CalculateOG();
}
