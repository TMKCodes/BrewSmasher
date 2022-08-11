$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  if(window.innerWidth >= 1024) {
    $(".centered-content").css("width", "768px");
  }
  if(window.innerWidth >= 768) {
    $(".tablet-wider").css("width", "435px");
    $(".centered-content").css("width", "640px");
  }
  if(window.innerWidth <= 425 && window.innerWidth > 375) {
    $(".centered-content").css("padding-left", "1px");
    $(".centered-content").css("padding-right", "1px");
    $(".centered-content").css("width", "361px");
  } else if(window.innerWidth <= 375 && window.innerWidth > 320) {
    $(".centered-content").css("padding-left", "1px");
    $(".centered-content").css("padding-right", "1px");
    $(".centered-content").css("width", "321px");
  }else if(window.innerWidth <= 320) {
    $(".centered-content").css("padding-left", "1px");
    $(".centered-content").css("padding-right", "1px");
    $(".centered-content").css("width", "266px");
  }
  if(Cookies.get("session-hash") != undefined) {
    $("#login-navbar").hide();
    $("#logged-navbar").show();
  }
  $(this).find("input:disabled").each(function() {
    $(this).css("background-color", "gray");
  });
  $(".img-thumbnail").on("click", function() {
    var src = $(this).attr("src");
    $("#img-popover #picture").attr("src", src);
    $("#img-popover").show();
  });
  $("#img-popover-close").on("click", function() {
    $("#img-popover").hide();
  });
  $("#login-navbar-button").click();
});
