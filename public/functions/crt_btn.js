var hoverTimeout = {};
var outTimeout = {};
var cardData = {};
const mediaQueryMin600 = window.matchMedia("(min-width: 601px)");
const mediaQueryMax1440 = window.matchMedia("(max-width: 1440px)");

$(".add-card").hover(function() {
    $(".add-simbol").addClass("add-simbol-hover");
    $(".add-circle").addClass("add-simbol-hover");
});

$(".add-card").mouseleave(function() {
    $(".add-simbol").removeClass("add-simbol-hover");
    $(".add-circle").removeClass("add-simbol-hover");
});

$(".heder-menu svg").on("click", function() {
    $(".heder-menu").toggleClass("active-menu");
    $(".header-menu-links-container").toggleClass("n");
    $(".menu-link").removeClass("n");
});

$(".header-wrapper").mouseleave(function() {
    $(".heder-menu").removeClass("active-menu");
    $(".header-menu-links-container").addClass("n");
    $(".menu-link").addClass("n");
});

mediaQueryMin600.addEventListener("change", function(e) {
    if (e.matches) {
        $(".heder-menu").removeClass("active-menu");
        $(".header-menu-links-container").addClass("n");
        $(".menu-link").addClass("n");
    } 
});

function handleHoverEvents(e) {
    if (e.matches) {
        $(".card").off("mouseenter mouseleave");
        $(".edit-form").off("mouseenter mouseleave");
        $(".delete-form").off("mouseenter mouseleave");
        $(".card-settings").off("mouseleave");
        $(".card-edit-mobile-btn").removeClass("no-display");
        $(".card-edit-mobile-btn").on("click", function() {
            var cardSettings = $(this).parent().find(".card-settings");
            var btn = $(this);
            var card = $(this).parent();
            if(!cardSettings.hasClass("no-display")) {
                cardSettings.addClass("no-display");
                card.removeClass("card-hovered");
                btn.removeClass("card-edit-mobile-clicked");
            }
            else {
                $(".card-settings").addClass("no-display");
                $(".card").removeClass("card-hovered");
                $(".card-edit-mobile-btn").removeClass("card-edit-mobile-clicked");
                $(".card-edit-mobile-btn").removeClass("card-hovered");
                card.addClass("card-hovered");
                btn.addClass("card-edit-mobile-clicked");
                cardSettings.removeClass("no-display");
            }
        });
    }   

    else {
        $(".card-edit-mobile-btn").off("click");
        $(".card-edit-mobile-btn").addClass("no-display");
        $(".card-edit-mobile-btn").removeClass("card-edit-mobile-clicked");
        $(".card-settings").addClass("no-display");
        $(".card").removeClass("card-hovered");
        $(".card").removeClass("card-edit-mobile-clicked");

        $(".card").on("mouseenter", function () {
            var cardId = $(this).attr("id");
            clearTimeout(hoverTimeout[cardId]);
            clearTimeout(outTimeout[cardId]);
            var cardSettings = $(this).find(".card-settings");
            hoverTimeout[cardId] = setTimeout(() => {
                $(this).addClass("card-hovered");
                cardSettings.removeClass("no-display");
            }, 200);
        });

        $(".card").on("mouseleave", function () {
            var cardId = $(this).attr("id");
            clearTimeout(hoverTimeout[cardId]);
            var cardSettings = $(this).find(".card-settings");
            outTimeout[cardId] = setTimeout(() => {
                $(this).removeClass("card-hovered");
                cardSettings.addClass("no-display");
            }, 200);
        });

        $(".edit-form").on("mouseenter",function() {
            removeBtn = $(this).parent().parent().find(".delete-form");
            $(this).addClass("edit-button-big");
            $(this).removeClass("edit-button-small");
            removeBtn.addClass("delete-button-small");
            removeBtn.removeClass("delete-button-big");
        });
        
        $(".edit-form").on("mouseleave",function() {
            removeBtn = $(this).parent().parent().find(".delete-form");
            $(this).removeClass("edit-button-big");
            $(this).addClass("edit-button-small");
            removeBtn.removeClass("delete-button-small");
            removeBtn.addClass("delete-button-big");
        });
        
        $(".delete-form").on("mouseenter",function() {
            editBtn = $(this).parent().parent().find(".edit-form");
            $(this).addClass("delete-button-big");
            $(this).removeClass("delete-button-small");
            editBtn.addClass("edit-button-small");
            editBtn.removeClass("edit-button-big");
        });
        
        $(".delete-form").on("mouseleave",function() {
            editBtn = $(this).parent().parent().find(".edit-form");
            $(this).removeClass("delete-button-big");
            $(this).addClass("delete-button-small");
            editBtn.removeClass("edit-button-small");
            editBtn.addClass("edit-button-big");
        });

        $(".card-settings").on("mouseleave",function() {
            editBtn = $(this).parent().parent().find(".edit-form");
            removeBtn = $(this).parent().parent().find(".delete-form");
            editBtn.removeClass("edit-button-big");
            editBtn.removeClass("edit-button-small");
            removeBtn.removeClass("delete-button-big");
            removeBtn.removeClass("delete-button-small");
        });
    }
}


mediaQueryMax1440.addEventListener("change", handleHoverEvents);
handleHoverEvents(mediaQueryMax1440);


