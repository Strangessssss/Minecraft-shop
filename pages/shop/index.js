const sizeOfShelfElemDesktop = 160;
const sizeOfShelfElemMobile = 90;
let shelf = $("#shelf");

$(function () {
    fillShelf(shelf.width(), shelf.height());
});

let tabs = $(".tab.pixel-corners");
let login = $("#login .tab.pixel-corners");

tabs.on("mouseover", function () {
    if ($(this).parent(".category.pixel-corners").hasClass("active")){
        return;
    }
    $(this).css("background-color", "#BDC6FF");
});

tabs.on("mouseout", function () {
    $(this).css("background-color", "#bebebe");
});

tabs.not("#login .tab.pixel-corners").on("mousedown", function () {
    if ($(this).parent(".category.pixel-corners").hasClass("active")){
        return;
    }
    $(this).addClass("active");
});

tabs.not("#login .tab.pixel-corners").on("mouseup", function () {
    tabs.removeClass("active");
    tabs.parent().removeClass("active");
    $(this).addClass("active");
    $(this).parent().addClass("active");
});

login.on("mousedown", function () {
    $(this).addClass("active");
});

login.on("mouseup", function () {
    $(this).removeClass("active");
});

$(window).on("resize", function () {
    fillShelf(shelf.width(), shelf.height());
})

function fillShelf(width, height) {
    shelf.empty();

    let sizeOfShelfElem = sizeOfShelfElemDesktop;
    if($(window).width() < 768){
        sizeOfShelfElem = sizeOfShelfElemMobile;
    }
    let columnCount = Math.floor((width / sizeOfShelfElem));
    let rowCount = Math.floor((height / sizeOfShelfElem));
    let numberOfDivs = Math.floor((columnCount * rowCount) / columnCount) * columnCount;
    for (let i = 0; i < numberOfDivs; i++) {
        shelf.prepend('<div class="cell"></div>');
    }
    shelf.css("grid-template-column", `repeat(${columnCount}, 1fr)`)
    shelf.css("grid-template-rows", `repeat(${rowCount}, 1fr)`)
}





