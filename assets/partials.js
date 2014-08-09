var fileSet = require("file-set");
var path = require("path");
var fs = require("fs");

var partialFiles = fileSet(path.resolve(__dirname, "../partials/**/*.hbs")).files;

var data = {};

partialFiles.forEach(function(file){
    data[path.basename(file, ".hbs")] = fs.readFileSync(file, "utf8");
});

console.log(JSON.stringify(data));
