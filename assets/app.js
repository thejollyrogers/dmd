var dmd = require("dmd");
var fs = require("fs");
var f = require("function-tools");
var partials = require("./partials.json");
var marked = require("marked");

var $ = document.querySelector.bind(document);
var $template = $("#template");
var $markdown = $("#markdown");
var $html = $("#html");

var data = fs.readFileSync("../test/fixture/globals.json", "utf8");
$template.value = localStorage.main || "{{>main}}";
getMarkdown();

var throttled = f.throttle(getMarkdown, { restPeriod: 500 });
$template.addEventListener("input", throttled);

function getMarkdown(){
    $markdown.textContent = "";
    var template = $template.value;
    var md = "";
    
    var mdStream = dmd({ partials: partials, template: template });
    mdStream.on("error", function(err){
        console.log("SHIT FAILED");
    });
    mdStream.on("readable", function(){
        var chunk = this.read();
        if (chunk) md += chunk.toString();
    });
    mdStream.on("end", function(){
        localStorage.main = $template.value;
        $markdown.textContent += md;
        $html.innerHTML = marked(md);
    })
    mdStream.end(data);
}
