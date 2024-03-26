var fadeTime = 300;
var realizationsXML;

// Events
var projectListLoaded = [];

$(document).ready(function () 
{
    $("#linkedin-link").on('click', function (){window.open("https://www.linkedin.com/in/remi-lesert/");});
    $("#mail-link").on('click', function (){window.open("mailto:remi.lesert@gmail.com");});

    projectTemplate = document.getElementById("project-template").innerHTML;

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;

            GenerateRealizationList();

            // if (projectListLoaded.length > 0) {
            //     for (var i = 0; i < projectListLoaded.length; i++) {
            //         projectListLoaded[i]();
            //     }
            // }
            // else {
            //     projectListLoaded();
            // }
        }
    };
    xhttp.open("GET", "/projects/list.xml", true);
    xhttp.send();
});

function GenerateRealizationList() {
    document.getElementById("realization-list").innerHTML = "";
    var projectList = Array.from(xmlDoc.getElementsByTagName("project"));
    projectList.sort(
        (a, b) =>
        {
            var aProjectDates = a.getElementsByTagName("date")[0].childNodes[0].nodeValue.split(" - ");
            var bProjectDates = b.getElementsByTagName("date")[0].childNodes[0].nodeValue.split(" - ");
            
            
            if(aProjectDates[1].slice(-4) != bProjectDates[1].slice(-4))
            {
                return aProjectDates[1].slice(-4) < bProjectDates[1].slice(-4);
            }
            else
            {
                return aProjectDates[1].slice(0,2) < bProjectDates[1].slice(0,2);
            }
           
        }
    )
    MainListHTML(projectList.length, projectList);
}

function MainListHTML(projectMaxIndex, projectList) {
    for (let index = 0; index < projectMaxIndex; index++) {

        var html = projectTemplate;

        html = html.replace("{{PROJECTIMAGE}}", projectList[index].getElementsByTagName("image")[0].childNodes[0].nodeValue);
        html = html.replace("{{PROJECTFILENAME}}", projectList[index].getElementsByTagName("filename")[0].childNodes[0].nodeValue);
        html = html.replace("{{PROJECTTITLE}}", projectList[index].getElementsByTagName("title")[0].childNodes[0].nodeValue);
        html = html.replace("{{PROJECTCATEGORY}}", projectList[index].getElementsByTagName("category")[0].childNodes[0].nodeValue);
        html = html.replace("{{PROJECTDATE}}", projectList[index].getElementsByTagName("date")[0].childNodes[0].nodeValue);
        html = html.replace("{{PROJECTDESCRIPTION}}", projectList[index].getElementsByTagName("preview")[0].childNodes[0].nodeValue);
        
        // html = html.replace("{{BACKGROUNDCOLOR}}", index % 2 == 0 ? "c-bg-primary" : "c-bg-secondary");

        // Ajoute l'élément sans recharger la div parent, cela évite de relancer les animations
        document.getElementById("realization-list").insertAdjacentHTML('beforeend', html);
    }
}