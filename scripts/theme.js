// On place le script juste après la déclaration pour charger le theme sans avoir de flash de couleur
var darkTheme = "dark-theme";
var lightTheme = "light-theme";
var themeStorageKey = "theme";

var prefersDarkScheme;
var currentTheme;

// On regarde si le theme de l'utilisateur est sombre
prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// On récupère le theme sauvegardé
currentTheme = ReadCookie(themeStorageKey);

// On active le theme si il existe
if (currentTheme == darkTheme) {
    document.body.classList.toggle(darkTheme);
}
else if (currentTheme == lightTheme) {
    document.body.classList.toggle(lightTheme);
}
else
{
    // si il n'y a pas de theme sauvegardé, on active le theme qui correspond au système de l'utilisateur
    document.body.classList.toggle(prefersDarkScheme.matches ? darkTheme : lightTheme);
}

// On attend que la page soit chargée
document.addEventListener("DOMContentLoaded", function(event) {

    // Lorsque la barre de navigation est chargée
    onLoadNavbar.push(function () {

        // On abonne notre fonction au bouton correspondant (sur la barre de navigation)
        $("#color-toggle").on('click', function () {
            // On inverse le theme
            document.body.classList.toggle(lightTheme);
            document.body.classList.toggle(darkTheme);

            // On enregistre le nouveau theme dans un cookie
            WriteCookie(themeStorageKey, document.body.classList.contains(darkTheme) ? darkTheme : lightTheme);
        });
    });
});

function WriteCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + '; expires=2147483647; remilesert.github.io';
    // Version for localhost
    // document.cookie = cname + "=" + cvalue + '; expires=2147483647; 127.0.0.1';
}

function ReadCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}