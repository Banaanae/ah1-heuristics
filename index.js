const fs = require('fs');
const pass = []
const fail = []


function checkRegExp(filePath) {
    const checkFile = fs.readFileSync(filePath, 'utf8');

    // Files that are MATCHED by this regex will NOT be highlighted
    if (checkFile != checkFile.replace(/^\* DATE:\d+\/\d+\/\d+      TIME:\d+:\d+:\d+      RUN:.*/)) {
        fail.push(filePath)
        return
    }
    pass.push(filePath)
}

const folderPath = 'ah1';
const dirArray = fs.readdirSync(folderPath, { recursive: true });
const filesArrayNoPath = dirArray.filter(value => value.includes("\\"));
const filesArray = filesArrayNoPath.map(value => "ah1\\" + value);

filesArray.forEach(checkRegExp)

var pCounter = 0
var fCounter = 0
var pTotal = 0
var fTotal = 0

filesArray.forEach(file => {
    if (file.indexOf("no match") != -1) {
        fTotal++
    } else {
        pTotal++
    }
})

pass.forEach(function (filePath) {
    if (filePath.indexOf("no match") == -1) {
        pCounter++
    }
})

fail.forEach(function (filePath) {  
    if (filePath.indexOf("no match") != -1) {
        fCounter++
    }
})

console.log("Highlighted Scripts: " + pCounter + " / " + pTotal + "\nAH1 not highlighted: " + fCounter + " / " + fTotal)