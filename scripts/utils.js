var version = "?V1.0.0"

function LoadAndGetFileObject(fileName, callback) {
    LoadFileText(fileName, (text) => {
        callback(GetFileObject(fileName, text));
    });
}

function LoadFileText(fileName, callback) {
    var link = '/projects/' + fileName + '.html';
    fetch(link)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response;
        })
        .then(response => {
            response.text().then(text => callback(text));
        })
        .catch(error => {
            if (error.message === "404")
                LoadAndGetFileObject("NotFound", SetContentToProjectViewer);
            else {
                document.getElementById('project-content').innerHTML = error;
                console.error('There was an error!', error);
            }
        });
}

function GetFileObject(fileName, text) {
    var lineArray = text.split('\n');

    var file = {};
    var index = 1;
    file.FileName = fileName;
    file.Title = lineArray[index++].replace('Title : ', '');
    file.Tags = lineArray[index++].replace('Category : ', '').replace('\r', '').split(',');
    file.Banner = lineArray[index++].replace('Banner : ', '');
    file.Date = lineArray[index++].replace('Date : ', '');
    file.Pitch = lineArray[index++].replace('Pitch : ', '');

    // Read rows for the gallery
    file.gallery = [];
    var rowIndex = 0;
    var colIndex = 0;
    var currentRow = [];
    for (let i = index + 1; i < lineArray.length; i++) 
    {
        if(lineArray[i].includes('---'))
        {
            index = i;
            break;
        }
        else if(lineArray[i].includes('<row>'))
        {
            rowIndex = 0;
            colIndex = 0;
        }
        else if(lineArray[i].includes('</row>'))
        {
            file.gallery.push(currentRow);
            currentRow = [];
        } 
        else
        {
            currentRow.push(lineArray[i].replace('\r', ''));
        }
    }
    

    lineArray.splice(0, index + 2).join('\n');
    file.Content = lineArray.join('\n');

    return file;
}