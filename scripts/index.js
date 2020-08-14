var fadeTime = 300;
var frontPageJson;

$(document).ready(function () 
{
    $("#navbar-placeholder").load("/pages/navbar.html");
    $("#footer-placeholder").load("/pages/footer.html");

    $("#linkedin-link").on('click', function (){window.open("https://www.linkedin.com/in/remi-lesert/");});
    $("#mail-link").on('click', function (){window.open("mailto:remi.lesert@gmail.com");});

    $(".realization").on('mouseenter', ShowOnHover);
    $(".realization").on('mouseleave', HideOnHover);
    $(".realization").on('click', GotoLink);

    fetch("/pages/realizationData/frontPage.json").then((response) => {
        response.json().then((data) => { 
            frontPageJson = data;

            $(".realization").each(function() {
                $(this).html(Mustache.render($(this).html(), frontPageJson));
            });
        })
    });

    

    $(".darkened-pointer").fadeOut(0);
});

function GotoLink() {

    var index = $(this).attr('id');

    switch (index) {
        default:
        case "first":
            window.location = frontPageJson["first"]["pageName"];
            break;
        case "second":
            window.location = "/pages/JoesStory.html";
            break;
        case "third":
            window.location = "/pages/SecretProject.html";
            break;
    }
}

function ShowOnHover() {
    $(this).children('.darkened-pointer').fadeIn(fadeTime);
}

function HideOnHover() {
    $(this).children('.darkened-pointer').fadeOut(fadeTime);
}