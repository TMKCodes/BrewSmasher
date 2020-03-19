

$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  get_tip_jar_monthly_balance();
  if(window.innerWidth >= 768) {
    $(".tablet-wider").css("width", "435px");
    $(".centered-content").css("width", "640px");
  }
  if(window.innerWidth >= 1024) {
    $(".centered-content").css("width", "768px");
  }
  if(Cookies.get("session-hash") != undefined) {
    $("#login-navbar").hide();
    $("#logged-navbar").show();
  }
});
