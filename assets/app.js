var dmd = require("dmd");
var fs = require("fs");
var $ = document.querySelector.bind(document);

var data = fs.readFileSync("../test/fixture/globals.json", "utf8");
var partials = require("./partials.json");

$("#template").textContent = data;

var mdStream = dmd({ partials: partials });
mdStream.on("readable", function(){
    var chunk = this.read();
    if (chunk) {
        console.log(chunk.length);
        $("#markdown").textContent += chunk.toString();
    }
});
mdStream.end(data);
