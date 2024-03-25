var onLoadNavbar = [];
var nullFunc = function(){};

$(document).ready(function () 
{    
    LoadURL("/pages/navbar.html" + version, false, onLoadNavbar);
    LoadURL("/pages/footer.html" + version, true, nullFunc);
    LoadJS('/scripts/iosBehavior.js', null, document.body);
});

function LoadURL(url, bottom = false, onload) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (text) {
            if (bottom)
                $(".page").append(text);
            else
                $(".page").prepend(text);

                if(onload.length > 0)
                {
                    for (var i = 0; i < onload.length; i++) {
                        onload[i]();
                    }
                }
                else
                {
                    onload();
                }
        }
    });
}

// Chargement dynamique de script https://stackoverflow.com/a/31374433
function LoadJS(url, implementationCode, location){
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to 
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    if(implementationCode)
    {
        scriptTag.onload = implementationCode;
        scriptTag.onreadystatechange = implementationCode;
    }

    location.appendChild(scriptTag);
};