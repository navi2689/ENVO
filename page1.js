document.addEventListener("DOMContentLoaded", function() {
    const dropdownBtn = document.querySelector(".dropbtn");
    const dropdownContent = document.querySelector(".dropdown-content");
    const challengesCard = document.querySelector(".card4");
    const modal = document.getElementById("challengesModal");
    const body = document.querySelector(".page2");


    dropdownBtn.addEventListener("click", function(event) {
        event.stopPropagation(); 
        dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    });
    document.addEventListener("click", function(event) {
        if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.display = "none";
        }
    });
});