
const menuOpen = document.getElementById("nav-menu-lines");
const menuClose = document.getElementById("nav-menu-close");
const navLink = document.getElementById("nav-menu");
const menuBk = document.querySelector(".nav-bk");

menuOpen.addEventListener("click", () => {
    navLink.classList.add("active");
    menuBk.classList.add("active");
    menuClose.classList.add("active");
    menuOpen.classList.remove("active");
});
menuClose.addEventListener("click", () => {
    navLink.classList.remove("active");
    menuBk.classList.remove("active");
    menuOpen.classList.add("active");
    menuClose.classList.remove("active");
});
