//--- This script link the navbar buttons with their corresponding html pages
var version = "?V1.0.0"
var navScript = document.currentScript;

onLoadNavbar.push(function () {
    $("." + navScript.dataset.activePage).addClass("active");
    
    // C/C de ce lien : https://stackoverflow.com/questions/7717527/smooth-scrolling-when-clicking-an-anchor-link
    SetSmoothScrollOnLocalLinks();
});

function SetSmoothScrollOnLocalLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}