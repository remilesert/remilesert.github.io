var fadeTime = 300;

$(document).ready(function () 
{
    $("#linkedin-link").on('click', function (){window.open("https://www.linkedin.com/in/remi-lesert/");});
    $("#mail-link").on('click', function (){window.open("mailto:remi.lesert@gmail.com");});

    $(".realization").on('mouseenter', ShowOnHover);
    $(".realization").on('mouseleave', HideOnHover);
    $(".realization").on('click', GotoLink);


    $(".darkened-pointer").fadeOut(0);
});

function GotoLink() {

    var index = $(this).attr('id');

    switch (index) {
        default:
        case "first":
            window.location = "../pages/realization.html?page=WebRender"
            break;
        case "second":
            window.location = "../pages/JoesStory.html"
            break;
        case "third":
            window.location = "../pages/SecretProject.html"
            break;
    }
}

function ShowOnHover() {
    $(this).children('.darkened-pointer').fadeIn(fadeTime);
}

function HideOnHover() {
    $(this).children('.darkened-pointer').fadeOut(fadeTime);
}