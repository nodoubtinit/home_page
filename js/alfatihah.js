$(".sign").on("click", function() {
    $(".container").slideToggle();
})
$(".tafsir").on("click", function() {
    $(".after-tafsir").toggle("slide")
})

$(".back").on("click", function() {
    $(".after-tafsir").toggle("slide")

})

$(".left").on("click", function() {
    $(".left-dropdown").slideToggle()

})

$(".copy").on("click", function() {
    $(".pop-up").fadeIn();
});
$(".close,.pop-up").on("click", function(e) {
    e.preventDefault();
    $(".pop-up").fadeOut();
});

$(".pop-up .inner").on("click", function(e) {
    e.stopPropagation();
});
$(".share").on("click", function() {
    $(".after-share").slideToggle();
});

$("body").on("click", function() {

    $(".topOfThePageContainer").slideToggle();
});

$("big-cont").on("click", function() {

})