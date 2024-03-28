var fadeTime = 300;
var realizationsXML;

// Events
var projectListLoaded = [];

$(document).ready(function () 
{
    projectTemplate = document.getElementById("project-template").innerHTML;

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xmlDoc = this.responseXML;

            GenerateRealizationList();

            if (window.location.hash != null && window.location.hash != "") {
                $(window.location.hash)[0].scrollIntoView({behavior: 'smooth'});
            }
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
                return bProjectDates[1].slice(-4) - aProjectDates[1].slice(-4);
            }
            else
            {
                return bProjectDates[1].slice(0,2) - aProjectDates[1].slice(0,2);
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
        

        html = html.replace("{{SETID}}", index == 0 ? "terref" : index == 10 ? "mycyberroyame" : "");
        
        if(index == projectMaxIndex - 1)
        {
            html = html.replace("border-bottom", "");
        }

        // Ajoute l'élément sans recharger la div parent, cela évite de relancer les animations
        document.getElementById("realization-list").insertAdjacentHTML('beforeend', html);
    }
}

function OpenProject(event, fileName) {
    var link = 'pages/realization.html?name=' + fileName;
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