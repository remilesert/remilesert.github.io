console.log("----- Start -----");

// Filestream
const fs = require('fs');

var projectsPath = 'projects/';
var listPath = projectsPath + 'list.xml'

var projectCount;
var projectReadCount;

var listContent = "";

StoreProjectDataThenWriteToList(projectsPath);

function StoreProjectDataThenWriteToList(dirName) {
    fs.readdir(dirName, function (err, fileNames) {
        if (err)
            throw err;

        // Compute projectCount because there's also xml files in the folder
        projectCount = 0;
        projectReadCount = 0;
        // Sort by name and reverse the array so that last project written is the first in the list
        fileNames.sort().reverse();
        fileNames.forEach(function (fileName) {
            if (IsFileValidProject(fileName))
                return;

            projectCount++;
        });

        console.log("Reading " + projectCount + " projects");

        // Read every md files
        fileNames.forEach(function (fileName) {
            if (IsFileValidProject(fileName))
                return;

            fs.readFile(dirName + fileName, 'utf-8', function (err, content) {
                if (err)
                    throw err;

                StoreProjectData(fileName, content);
            });
        });

    });
}

function IsFileValidProject(fileName)
{
    return fileName == "NotFound.md" || fileName == "Example.md" || !fileName.endsWith('.md');
}

function WriteDataToFile(path, data) {
    console.log("Writing data to " + path);

    data = SurroundWithTag(data, "list", true, false);

    fs.writeFile(path, data, 'utf-8', (err) => {
        if (err) {
            throw err;
        }
        console.log("Write to list file !");
    });
}

function StoreProjectData(fileName, content) {
    // Increment the read count, if it match with the total we are done
    projectReadCount++;
    var isLastFile = projectCount == projectReadCount;

    //Format the info and store it
    listContent += GetFileContentXML(fileName, content, isLastFile);

    console.log("Progress : " + projectReadCount + "/" + projectCount);
    if (isLastFile)
        WriteDataToFile(listPath, listContent);
}

function GetFileContentXML(fileName, fileContent, isLastFile) {
    var file = GetFileObject(fileName, fileContent);
    var newLine = "\n";
    var xmlContent = SurroundWithTag(file.FileName, "filename", false, true, 2) + newLine;
    xmlContent += SurroundWithTag(file.Title, "title", false, true, 2) + newLine;
    xmlContent += SurroundWithTag(file.Category, "category", false, true, 2) + newLine;
    xmlContent += SurroundWithTag(file.Banner, "image", false, true, 2) + newLine;
    xmlContent += SurroundWithTag(file.Date, "date", false, true, 2) + newLine;
    xmlContent += SurroundWithTag(file.Pitch, "preview", false, true, 2) + newLine;
    xmlContent += SurroundWithTag(file.Gallery, "gallery", true, false, 2);

    xmlContent = SurroundWithTag(xmlContent, "project", true, false, 1);
    if (!isLastFile)
        xmlContent += newLine;

    return xmlContent;
}

function SurroundWithTag(text, tagLabel, useNewLine, cleanTextnewLine, tabCount = 0) {
    var tabStart = AddTab('', tabCount);
    var tabEnd = "";

    var newLine = "";
    if (useNewLine) {
        newLine = '\n';
        tabEnd = tabStart;
    }

    if (cleanTextnewLine)
        text = text.replace('\n', '').replace('\r', '');
    var result = tabStart + "<" + tagLabel + ">" + newLine + text + newLine + tabEnd + "</" + tagLabel + ">";

    return result;
}

function AddTab(text, tabCount)
{
    var tabStart = "";
    for (let i = 0; i < tabCount; i++) {
        tabStart += "\t";
    }
    return tabStart + text;
}

function GetFileObject(fileName, text) {
    var lineArray = text.split('\n');

    var file = {};
    var index = 1;
    file.FileName = fileName.replace('.md', '');
    file.Title = lineArray[index++].replace('Title : ', '');
    file.Category = lineArray[index++].replace('Category : ', '').replace('\r', '');
    file.Banner = lineArray[index++].replace('Banner : ', '');
    file.Date = lineArray[index++].replace('Date : ', '');
    file.Pitch = lineArray[index++].replace('Pitch : ', '');

    // Gallery
    var gallery = '';
    while(lineArray[++index].includes("---") == false)
    {   
        var tabCount = lineArray[index].includes("row") ? 3 : 4;
        var newLine = lineArray[index + 1].includes("---") ? '' : '\n';
        gallery += AddTab(lineArray[index] + newLine, tabCount);
    }
    file.Gallery = gallery;

    lineArray.splice(0, index + 2).join('\n');
    file.Content = lineArray.join('\n');

    return file;
}