//node src/main.js input/models hello hi

//for run node "mainFilename" "inputDirectory" "populateContent" "populateContent" "..."

var fs = require('fs');
var debug = false;
var getHeader = function(){
    return fs.readFileSync("./input/demoFiles/createFunction.js","Utf-8")
};
var getFooter = function(){
     return fs.readFileSync("./input/demoFiles/footer.js","Utf-8");
}

var appendPopulateData = function(dataToPopulate){
    var populateString ="";
    (debug)&&console.log("dataToPopulate==>"+dataToPopulate);
    if(dataToPopulate.length > 0){
        (debug)&&console.log(dataToPopulate);
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
    // var inputModelDirectory = userInput[2];
    (debug)&&console.log(userInput);
    var populateArray = (process.argv).slice(3);
    // outputControllerDirectory = userInput[2];
    // files = fs.readdirSync(inputModelDirectory);
    // files.forEach(function(fileName){
        fileName = (process.argv[2]).split(".")[0];
        var capitalFileName = capitalizeFirstLetter(fileName);
        data = getHeader();
        (debug)&&console.log("=======Header is===========>"+getHeader());
        (debug)&&console.log(populateArray);
        if(populateArray && populateArray.length>0)
        data += appendPopulateData(populateArray);
        data += getFooter();
        data = data.replace(/subject/g,fileName);
        data = data.replace(/Subject/g,capitalFileName);
        fs.writeFileSync("./outPut/controller/"+capitalFileName+"Controller.js", data);
        console.log("created Successfully");
    // });
}
curdCreator();
