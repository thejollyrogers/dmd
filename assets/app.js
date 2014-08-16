var dmd = require("dmd");
var fs = require("fs");
var f = require("function-tools");
var partials = require("./partials.json");
var marked = require("marked");
var Editor = require("./components/editor/editor");
var a = require("array-tools");

var $ = document.querySelector.bind(document);
var $markdown = $("#markdown");
var $html = $("#html");

var workspace = Object.keys(partials).map(function(key){
    return {
        name: key,
        content: partials[key]
    };
});
workspace.push({
    name: "_template",
    content: "{{>main}}",
    default: true
});
var editor = new Editor($("#template"), { workspace: workspace });

editor.on("input", function(data){
    partials[data.name] = data.content;
    refreshMarkdown();
});
refreshMarkdown();

function refreshMarkdown(){
    var template = a.findWhere(editor.workspace, { name: "_template"}).content;
    var md = "";

    var data = fs.readFileSync("../test/fixture/globals.json", "utf8");
    
    dmd({ partials: partials, template: template })
        .on("error", function(err){
            // console.log("SHIT FAILED");
        })
        .on("readable", function(){
            var chunk = this.read();
            if (chunk) md += chunk.toString();
        })
        .on("end", function(){
            $markdown.textContent = md;
            $html.innerHTML = marked(md);
        })
        .end(data);
}
