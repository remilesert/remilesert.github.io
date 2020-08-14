function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};


$(document).ready(function () 
{
    var pageName = getUrlParameter("page");
    

    fetch("/pages/realizationData/" + pageName + ".json").then((response) => {
        response.json().then((data) => { 
            $(document).attr('title', Mustache.render($(document).attr('title'), data));
            console.log(data);
        });
    })
})