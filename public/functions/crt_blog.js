
$(".add-box-button").hover(function() {
    const box = ".add-box-button";
    $(`${box} h1`).addClass("h1-how");
    $(`${box} svg`).addClass("svg-how");
    $(`${box} svg path`).addClass("path-how");
});

$(".add-box-button").mouseleave(function() {
    const box = ".add-box-button";
    $(`${box} h1`).removeClass("h1-how");
    $(`${box} svg`).removeClass("svg-how");
    $(`${box} svg path`).removeClass("path-how");
});