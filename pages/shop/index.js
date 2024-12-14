const sizeOfShelfElemDesktop = 160;
const sizeOfShelfElemMobile = 90;
let shelf = $("#shelf");

let tabs = $(".inner-category");
let additional = $("header div");

let currentCategory = "food";
let currentPage = 1;

$(async function () {
    tabs.parent().eq(0).addClass("active");
    tabs.eq(0).addClass("active");
    setShelves();
    await fillThePage(currentPage, currentCategory);
});

tabs.on("mouseover", function () {
    if ($(this).parent(".category.pixel-corners").hasClass("active")){
        return;
    }
    $(this).css("background-color", "#BDC6FF");
});

tabs.on("mouseout", function () {
    $(this).css("background-color", "#bebebe");
});

tabs.on("mousedown", async function () {
    if ($(this).parent(".category.pixel-corners").hasClass("active")) {
        return;
    }
    currentCategory = $(this).attr("category");
    currentPage = 1;
    console.log(currentCategory);
    setShelves();
    await fillThePage();

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

$(window).on("resize", async function () {
    setShelves(shelf.width(), shelf.height());
    await fillThePage(currentPage, currentCategory);

})

// Sets the shelves
function setShelves() {
    shelf.empty();
    let numberOfDivs = getCapabilityOfShelf();

    for (let i = 0; i < numberOfDivs; i++) {
        shelf.append('<div class="cell"></div>');
    }
}

// Fills the pagination
function fillPagination(data, numberOfDivs) {
    let pagNumbers = $("#pagination-numbers");
    pagNumbers = pagNumbers.empty();
    let pagesCount = Math.ceil(data.count / numberOfDivs);
    if (pagesCount === 1) {
        return;
    }

    for (let i = 1; i <= pagesCount ; i++) {
        pagNumbers.append(`<button class=\"page minecraft-btn\">${i}</button>`)
    }

    $("#pagination-numbers button").on("click", async function () {

        currentPage = parseInt($(this).text());
        await fillThePage();
    });
}

// Gets the count of elements that shelf can contain
function getCapabilityOfShelf() {
    let sizeOfShelfElem = sizeOfShelfElemDesktop;
    let columnCount = Math.floor((shelf.width() / sizeOfShelfElem));
    let rowCount = Math.floor((shelf.height() / sizeOfShelfElem));
    return columnCount * rowCount;
}

// Gets the number of elements in whole category and returns only requested (from, to)
async function getPC(category, from, to) {
    if (category === "all") {
        let allCategories = [
            await fetch(`../../items/food.json`),
            await fetch(`../../items/tools.json`),
            await fetch(`../../items/armor.json`),
            await fetch(`../../items/weapon.json`),
        ];

        let allElems = [];
        for (const categoryPromise of allCategories) {
            const response = await categoryPromise;
            const data = await response.json();
            allElems = allElems.concat(data);
        }

        console.log(allElems);
        return { elems: allElems.slice(from, to), count: allElems.length };
    }
    const response = await fetch(`../../items/${category}.json`);
    const data = await response.json();
    return {elems: data.slice(from, to), count: data.length};
}

/// Fills teh shelves
async function fillThePage() {

    let capability = getCapabilityOfShelf();

    let from = (capability * (currentPage - 1))
    console.log(from)
    let to = from + capability;
    console.log(to)

    let data = await getPC(currentCategory, from, to);

    let cells = $("#shelf > div");
    cells.css("background-image", "");  // Reset background image
    cells.removeAttr("name");

    if (Array.isArray(data.elems)) {
        cells.empty();
        for (let i = 0; i < data.elems.length; i++) {
            cells.eq(i).css("background-image", `url(${data.elems[i]["image_path"]})`);
            console.log(data.elems[i]);
            cells.eq(i).append(`
                                <div class=\"info\">
                                    <img class="tablet" src="../../images/tablet.jpg" alt="">
                                    <div class="buy-price info-line">buy price: ${data.elems[i]["buy_price"]}<img class="emoji" src="../../images/emerald.webp " alt=""></div>
                                    <div class="sell-price info-line">sell price: ${data.elems[i]["sell_price"]}<img class="emoji" src="../../images/emerald.webp " alt=""></div>
                                    
                                </div>
                                <div class="itemName">
                                    ${data.elems[i]["name"]}
                                </div>
                                `);
            cells.attr("name", data.elems[i]["name"]);
        }
    }

    fillPagination(data, capability, currentCategory);
}
