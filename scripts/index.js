var fadeTime = 300;
var frontPageJson;

$(document).ready(function () 
{
    $("#navbar-placeholder").load("/pages/navbar.html");
    $("#footer-placeholder").load("/pages/footer.html");

    $("#linkedin-link").on('click', function (){window.open("https://www.linkedin.com/in/remi-lesert/");});
    $("#mail-link").on('click', function (){window.open("mailto:remi.lesert@gmail.com");});

    $(".realization").on('click', GotoLink);

    fetch("/pages/realizationData/frontPage.json").then((response) => {
        response.json().then((data) => { 
            frontPageJson = data;

            $(".realization").each(function() {
                $(this).html(Mustache.render($(this).html(), frontPageJson));
            });
        })
    });
});