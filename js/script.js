 $(".pro-span").on("click", function() {
     location.href = "./profile-page.html";
 })

 $(".humborger-btn").on("click", function() {
     $(".dropdown").slideToggle(800);
     $(".rounded-hr").toggleClass("rounded-after")
 })