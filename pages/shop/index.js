const sizeOfShelfElemDesktop = 160;
const sizeOfShelfElemMobile = 90;
let shelf = $("#shelf");

let currentCategory = "food";


const linkStart = "https://static.wikia.nocookie.net/minecraft/images"

$(function () {
    fillShelf();
});

let tabs = $(".inner-category");
let additional = $("header div");

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
    currentCategory = $(this).attr("category");

    $(this).addClass("active");
});

tabs.on("mouseup", function () {
    tabs.removeClass("active");
    tabs.parent().removeClass("active");
    $(this).addClass("active");
    $(this).parent().addClass("active");
});

additional.on("mousedown", function () {
    $(this).addClass("active");
});

additional.on("mouseup", function () {
    $(this).removeClass("active");
});

$(window).on("resize", function () {
    fillShelf(shelf.width(), shelf.height());
})

function fillShelf() {
    shelf.empty();

    let numberOfDivs = getCapabilityOfShelf();

    for (let i = 0; i < numberOfDivs; i++) {
        shelf.prepend('<div class="cell"></div>');
    }

    getItemsByPage(1, numberOfDivs).then(
        data => {
            fillShelfWithItems(data, numberOfDivs);
        }
    )

}

function fillShelfWithItems(data, numberOfDivs) {
    let pagNumbers = $("#pagination-numbers");
    pagNumbers = pagNumbers.empty();
    let pagesCount = Math.ceil(data.allDataCount / numberOfDivs);

    let cells = $("#shelf > div");
    cells.css("background-image", "");  // Reset background image
    cells.removeAttr("name");

    if (Array.isArray(data.array)) {
        for (let i = 0; i < data.array.length; i++) {
            cells.eq(i).css("background-image", `url(${linkStart + data.array[i]["image_path"]})`);
            cells.attr("name", data.array[i]["name"]);
        }
    }

    if (pagesCount === 1) {
        return;
    }
    for (let i = 1; i <= pagesCount ; i++) {
        pagNumbers.append(`<button class=\"page minecraft-btn\">${i}</button>`)
    }

    $("#pagination-numbers button").on("click", function () {
        let pageNumber = parseInt($(this).text());
        fillShelfWithItemsByPage(pageNumber, numberOfDivs);
    });
}


function fillShelfWithItemsByPage(pageNumber, numberOfDivs) {
    getItemsByPage(pageNumber, numberOfDivs).then(
        data => {
            fillShelfWithItems(data, numberOfDivs);
        }
    )
}

function getItemsByPage(pageNumber, numberOfDivs) {
    let from = (pageNumber * numberOfDivs) - numberOfDivs;
    let to = from + numberOfDivs;

    return fetch(`../../items/${currentCategory}.json`)
        .then(response => response.json())
        .then(data => {
            const slicedData = data.slice(from, to);
            console.log(slicedData);
            return {array: slicedData, allDataCount: data.length};
        })
        .catch(error => {
            console.error('Error loading the JSON file:', error);
            return {};
        });
}

function getCapabilityOfShelf() {
    let sizeOfShelfElem = sizeOfShelfElemDesktop;
    if($(window).width() < 768){
        sizeOfShelfElem = sizeOfShelfElemMobile;
    }
    let columnCount = Math.floor((shelf.width() / sizeOfShelfElem));
    let rowCount = Math.floor((shelf.height() / sizeOfShelfElem));
    return Math.floor((columnCount * rowCount) / columnCount) * columnCount;
}







