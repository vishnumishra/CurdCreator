var fs = require('fs');

var getHeader = function(){
    return fs.readFileSync("./input/demoFiles/createFunction.js","Utf-8")
};
var getFooter = function(){
     return fs.readFileSync("./input/demoFiles/footer.js","Utf-8");
}

var appendPopulateData = function(dataToPopulate){
    var populateString ="";
    console.log("dataToPopulate==>"+dataToPopulate);
    if(dataToPopulate.length > 0){
        console.log(dataToPopulate);
        dataToPopulate.forEach(function(data){
            populateString +="           .populate('"+data+"')\r\n"
        });
    }
    return populateString;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

curdCreator = function(){
    var userInput = process.argv;
    var inputModelDirectory = userInput[2];
    console.log(userInput);
    var populateArray = userInput.slice(3);
    outputControllerDirectory = userInput[3];
    files = fs.readdirSync(inputModelDirectory);
    files.forEach(function(fileName){
        var capitalFileName = capitalizeFirstLetter(fileName).split(".")[0];
        fileName = fileName.split(".")[0];
        data = getHeader();
        console.log(populateArray);
        if(populateArray && populateArray.length>0)
        data += appendPopulateData(populateArray);
        data += getFooter();
        data = data.replace(/subject/g,fileName);
        data = data.replace(/Subject/g,capitalFileName);
        fs.writeFileSync("./outPut/controller/"+capitalFileName+".js", data);
        console.log("write Successfully");
    });
}
curdCreator();