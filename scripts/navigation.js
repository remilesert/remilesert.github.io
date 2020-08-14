var fadeTime = 300;

$(document).ready(function () 
{
    $("#linkedin-link").on('click', function (){window.open("https://www.linkedin.com/in/remi-lesert/");});
    $("#mail-link").on('click', function (){window.open("mailto:remi.lesert@gmail.com");});

    $(".realization").on('mouseenter', ShowOnHover);
    $(".realization").on('mouseleave', HideOnHover);
    $(".darkened-pointer").fadeOut(0);
});

function ShowOnHover() {
    $(this).children('.darkened-pointer').fadeIn(fadeTime);
}
function HideOnHover() {
    $(this).children('.darkened-pointer').fadeOut(fadeTime);
}