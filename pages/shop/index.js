$(function () {
    const numberOfDivs = 18; // Number of <div> elements you want
    const $container = $('#shelf'); // Target the container element

    for (let i = 0; i < numberOfDivs; i++) {
        $container.prepend('<div class="cell"></div>'); // Append each <div>
    }
});

let tabs = $(".tab.pixel-corners");

tabs.on("mouseover", function () {
    if ($(this).parent(".category.pixel-corners").hasClass("active")){
        return;
    }
    $(this).css("background-color", "#BDC6FF");
});

tabs.on("mouseout", function () {
    $(this).css("background-color", "#bebebe");
});

tabs.on("mousedown", function () {
    if ($(this).parent(".category.pixel-corners").hasClass("active")){
        return;
    }
    $(this).addClass("active");
    $(this).parent().addClass("active");
});

tabs.on("mouseup", function () {
});





