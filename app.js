var dmd = require("dmd");
var fs = require("fs");
var $ = document.querySelector.bind(document);

var data = fs.readFileSync("../test/fixture/class.json", "utf8");

$("#template").textContent = data;

dmd().end(data).on("readable", function(){
    var chunk = this.read();
    if (chunk) $("#markdown").textContent += chunk.toString();
});
