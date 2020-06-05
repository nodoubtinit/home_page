$(".sign").on("click", function() {
    $(".container").slideToggle();
})
$(".tafsir").on("click", function() {
    $(".after-tafsir").animate({
        width: "toggle"
    })
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
$("body").on("click",function(e){
    e.stopPropagation();
    $(".topOfThePageContainer").slideToggle();
});

$(".tafsir").on("click", function() {
    $(".after-tafsir").toggle("slide")
} , 1000 , function(){
    $(".ayah").animate({
        position : "absolute", 
        top : "100px"
    });
});






$(".back").on("click", function() {
    $(".after-tafsir").toggle("slide")

})