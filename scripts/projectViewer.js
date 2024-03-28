var articleFile;
var xmlDoc;
var projectListLoaded = [];

$('document').ready(function () {

    ConfigureRenderer();

    LoadProject();
});

function ConfigureRenderer() {
    marked.setOptions({
        highlight: function (code, lang, _callback) {
            if (hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value
            } else {
                return hljs.highlightAuto(code).value
            }
        },
    })

    DOMPurify.addHook('uponSanitizeElement', (node, data) => {
        if (data.tagName === 'iframe') {
            const src = node.getAttribute('src') || ''
            if (!src.startsWith('https://www.youtube.com/embed/')) {
                return node.parentNode?.removeChild(node)
            }
        }
    })
}

function LoadProject() {
    const urlParams = new URLSearchParams(window.location.search);
    var urlProjectName = urlParams.get('name');
    if (!urlProjectName) {
        LoadAndGetFileObject("NotFound", SetContentToProjectViewer);
    }
    else {
        LoadAndGetFileObject(urlProjectName, SetContentToProjectViewer);
    }
}

function OpenProject(event, fileName) {
    var link = '/project.html?name=' + fileName;
    switch (event.button) {
        case 0:
            window.open(link, '_self');
            break;
        case 1:
            window.open(link);
            break;
        default:
            break;
    }
}

function SetContentToProjectViewer(file) {
    articleFile = file;

    document.getElementById("project-title").innerHTML = file.Title;
    document.getElementById("project-pitch").innerHTML = file.Pitch;
    document.getElementById("project-banner").src = file.Banner;
    document.getElementById("project-tags").innerHTML = file.Tags;
    document.getElementById("project-date").innerHTML = file.Date;

    document.getElementById('project-content').innerHTML = DOMPurify.sanitize(
        marked(file.Content),
        {
            ADD_TAGS: ["iframe"], ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"]
        });

    document.getElementById('project-image-list-container').innerHTML = GenerateGallery(file.gallery);

    OnProjectViewerLoaded();
}

function GenerateGallery(rowArray) {
    var innerHTML = '';
    for (let i = 0; i < rowArray.length; i++) {

        innerHTML += "<div class='row'>"

        for (let j = 0; j < rowArray[i].length; j++) {
            innerHTML += "<div class='col disable-col-mobile p-2 scale-on-hover'>\r\n<a href='javascript:;' class='pop'>\r\n<img class='img_lowres' src='"
            innerHTML += rowArray[i][j] + "' id='low_gallery_" + i + '_' + j + "'>\r\n";
            innerHTML += "<img id='high_gallery_" + i + '_' + j + "' class='img_highres'>\r\n</a>\r\n</div>";
        }

        innerHTML += "</div>"

    }

    return innerHTML;
}


//Fonction qui charge les images HD des img de classe "img_lowres"
function HandleLowResImg() {

    //Quand l'image lowres est chargée
    $(".img_lowres").one("load", function () {
        //On récupère son id
        var id = $(this).attr("id");
        //On déduit l'id de la version HD
        var target = "#high_" + id.substring(4);

        //On met la source de l'image HD pour commencer à la charger
        $(target).attr("src", $(this).attr("src").toString().replace("_low", ""))
    }).each(function () {
        if (this.complete) {
            $(this).trigger('load');
        }
    });

    $(".img_highres").off().on('load', function () {
        var id = $(this).attr("id");
        $(this).css("display", "inline");
        var target = "#low_" + id.substring(5);
        $(target).css("display", "none");
    });
}

function OnProjectViewerLoaded() {
    HandleLowResImg();

    $('.pop').on('click', function () {

        OpenCarouselOnImage($(this).find('img.img_lowres').attr('src'));

        $('#imagemodal').modal('show');
    });
}


//On rempli le carousel
function OpenCarouselOnImage(path) {

    //On affiche une preview en attendant que les fichiers soient chargés
    var carouselContent = "";    
    //On crée la div pour contenir l'image, avec le "active" si c'est le premier fichier
    carouselContent += "<div class='carousel-item active'>";
    //On crée l'image de basse définition, avec la classe LD
    carouselContent += "<img class='w-100' src='" + path + "' >";
    //On referme la div
    carouselContent += "</div>";

    //On inclue les HTML calculés dans les div associés 
    $(".carousel-inner").html(carouselContent);
    $(".carousel-indicators").html("");

    //On récupère la liste des fichiers du dossier parent
    FillCarousel(articleFile.gallery.reduce(function(prev, next) { return prev.concat(next);}));

}


function FillCarousel(files) {
    
    //On crée les deux string qui vont contenir l'HTML pour les indicateurs et les images
    var carouselContent = "";
    var indicatorContent = "";

    
    var baseUrlPattern = "";
    
    //Regex pour supprimer l'url de base (http://terref.io/ par exemple)
    //Si l'adresse des fichiers commence par un "/"
    if(files[0].charAt(0) == "/")
        baseUrlPattern = /^https?:\/\/[a-z\:0-9.]+/;
    else
        baseUrlPattern = /^https?:\/\/[a-z\:0-9.]+\/?/;        

    var currentPreviewID = files.indexOf($(".carousel-inner").find("img").prop("src").replace(baseUrlPattern, ""));

    //Pour chaque fichier trouvé dans le dossier
    for (let index = 0; index < files.length; index++) {
        //On crée la div pour contenir l'image, avec le "active" si c'est le premier fichier
        carouselContent += "<div class='carousel-item " + (index == currentPreviewID ? "active" : "") + "'>";
        //On crée l'image de basse définition, avec la classe LD
        carouselContent += "<img class='img_lowres w-100' id='low_" + index + "' src='" + files[index] + "' >";
        //On crée l'image de haute définition, avec la classe HD
        carouselContent += "<img class='img_highres w-100' id='high_" + index + "'>";
        //On referme la div
        carouselContent += "</div>";

        //On crée l'indicateur de position, avec le "active" si c'est le premier fichier
        indicatorContent += "<button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='" + index + "' class='" + (index == currentPreviewID ? "active" : "") + "'></button>";
        
    }
    // console.log(indicatorContent);
    //On inclue les HTML calculés dans les div associés 
    $(".carousel-inner").html(carouselContent);
    $(".carousel-indicators").html(indicatorContent);

    if(files.length <= 1)
    {
        $(".carousel-control-prev").hide();
        $(".carousel-control-next").hide();
        $(".carousel-indicators").hide();
    }
    else
    {
        $(".carousel-control-prev").show();
        $(".carousel-control-next").show();
        $(".carousel-indicators").show();
    }

    
    //On abonne des fonctions quand les images lowDef sont chargées, pour charger les images HD
    HandleLowResImg();
}