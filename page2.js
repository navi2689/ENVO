document.getElementById("ani").addEventListener("click", function() {
  this.classList.add("active");
  this.style.transform = "scale(0.5)";
    this.style.transition = "transform 0.5s ease-in-out";

    setTimeout(() => {
        this.style.transform = "scale(1)";
    }, 100);
  setTimeout (() => {
    document.querySelector(".card1").classList.add("show");
    document.querySelector(".card2").classList.add("show");
    document.querySelector(".card3").classList.add("show");
    document.querySelector(".card4").classList.add("show");
    document.querySelector(".text").classList.add("show");
  });
});

function openPage(url) {
  window.location.href = url;
}