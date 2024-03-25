var fadeTime = 300;
var frontPageJson;

$(document).ready(function () 
{
    $("#linkedin-link").on('click', function (){window.open("https://www.linkedin.com/in/remi-lesert/");});
    $("#mail-link").on('click', function (){window.open("mailto:remi.lesert@gmail.com");});

/*
    fetch("/pages/realizationData/frontPage.json").then((response) => {
        response.json().then((data) => { 
            frontPageJson = data;

            $(".realization").each(function() {
                $(this).html(Mustache.render($(this).html(), frontPageJson));
            });
        })
    });*/
});