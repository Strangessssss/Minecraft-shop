let titles = $("#titles");
$(function() {
    fetch("titles")
        .then((response) => response.text())
        .then((text) => {
            titles.html(text);
        });

    titles.animate({
        top: "-110rem"
    }, 60000, "linear", () => {
        $("#skip").text("exit");
    });
});




