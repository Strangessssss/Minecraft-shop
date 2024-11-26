let tabs = $(".tab.pixel-corners");

tabs.on("mouseover", function () {
    if ($(this).parent(".category.pixel-corners").css("zIndex") === "1"){
        return;
    }
    $(this).css("background-color", "#BDC6FF");
});

tabs.on("mouseout", function () {
    $(this).css("background-color", "#bebebe");
});

tabs.on("mousedown", function () {
    if ($(this).parent(".category.pixel-corners").css("zIndex") === "1"){
        return;
    }
    resetAllTabs();
    $(this).css("background-color", "#bebebe");
    $(this).parent(".category.pixel-corners").css("border-width", "4px");
    $(this).parent(".category.pixel-corners").css("z-index", "1");

});

tabs.on("mouseup", function () {
    $(this).parent(".category.pixel-corners").css("border-width", "5px");
});


function resetAllTabs(){
    $(".category.pixel-corners").css("z-index", "0");
}




