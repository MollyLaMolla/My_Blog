

$(".log-input").on("focus", function() {
    $(".login-container").addClass("login-focus");
});

$(".log-input").on("blur", function() {
    $(".login-container").removeClass("login-focus");
});