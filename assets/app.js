var dmd = require("dmd");
var fs = require("fs");
var f = require("function-tools");
var a = require("array-tools");
var marked = require("marked");
var Editor = require("./components/editor/editor");
var Workspace = require("./model/workspace");
var File = require("./model/file");
var select = require("./components/select/select");
var partials = require("./partials.json");
var templates = require("./templates.json");

var $ = document.querySelector.bind(document);
var $markdown = $("#markdown");
var $html = $("#html");

var partialWorkspace = new Workspace(partials);
var templateWorkspace = new Workspace(templates);

var editor = Editor("#template")
    .open(templateWorkspace.get("default"))
    .on("input", function(data){
        // partials[data.name] = data.content;
        // refreshMarkdown();
    });

select("[data-select=partials]", partialWorkspace.files.map(function(file){
    return {
        value: file.name,
        text: file.name,
        selected: false
    }
})).on("change", function(newValue){
    editor.open(partialWorkspace.get(newValue));
});

select("[data-select=templates]", templateWorkspace.files.map(function(file){
    return {
        value: file.name,
        text: file.name,
        selected: false
    }
})).on("change", function(newValue){
    editor.open(templateWorkspace.get(newValue));
});

// refreshMarkdown();

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
