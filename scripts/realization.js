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
    $("#navbar-placeholder").load("/pages/navbar.html");
    $("#footer-placeholder").load("/pages/footer.html");

    var pageName = getUrlParameter("page");
    

    fetch("/pages/realizationData/" + pageName + ".json").then((response) => {
        response.json().then((data) => { 

            document.title = Mustache.render(document.title, data)

            document.body.innerHTML = Mustache.render(document.body.innerHTML, data);
            
        });
    })
})