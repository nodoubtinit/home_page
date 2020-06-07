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

    $(".left-2,.istarad").toggleClass("changed_position")


})
$(".left-2").on("click", function() {
    $(".left2-dropdown").slideToggle()

    $(".istarad").toggleClass("changed_position2")


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

$(".main-body").on("click", function(e) {
    e.stopPropagation();
    $(".topOfThePageContainer").slideToggle();
});