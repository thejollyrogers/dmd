var dmd = require("dmd");
var fs = require("fs");
var f = require("function-tools");
var partials = require("./partials.json");
var marked = require("marked");
var Editor = require("./components/editor/editor");

var $ = document.querySelector.bind(document);
var $markdown = $("#markdown");
var $html = $("#html");

var editor = new Editor($("#template"), {
    workspace: Object.keys(partials).map(function(key){
        return {
            name: key,
            content: partials[key],
            default: key === "authors"
        };
    })
});

editor.on("input", refreshMarkdown);
refreshMarkdown();

function refreshMarkdown(){
    $markdown.textContent = "";
    var template = editor.value;
    var md = "";
    
    var mdStream = dmd({ partials: partials, template: template });
    mdStream.on("error", function(err){
        // console.log("SHIT FAILED");
    });
    mdStream.on("readable", function(){
        var chunk = this.read();
        if (chunk) md += chunk.toString();
    });
    mdStream.on("end", function(){
        $markdown.textContent += md;
        $html.innerHTML = marked(md);
    })

    var data = fs.readFileSync("../test/fixture/class.json", "utf8");
    mdStream.end(data);
}
