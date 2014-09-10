"use strict";
var dmd = require("dmd");
var fs = require("fs");
var f = require("function-tools");
var a = require("array-tools");
var marked = require("marked");
var Editor = require("./components/editor/editor");
var Files = require("./model/files");
var File = require("./model/file");
var select = require("./components/select/select");
var partials = require("./partials.json");
var templates = require("./templates.json");
var store = require("./model/store");

var $ = document.querySelector.bind(document);
var $markdown = $("#markdown");
var $html = $("#html");

var partialFiles = new Files({ type: "partial" });
partialFiles.load(partials);
partialFiles.load(store.get("partial"));
window.p = partialFiles;

var templateFiles = new Files({ type: "template" });
templateFiles.load(templates);
templateFiles.load(store.get("template"));
window.t = templateFiles;

var editor = Editor("#template")
    .open(templateFiles.get("default"))
    .on("input", function(file){
        refreshMarkdown();
    });

select("[data-select=partials]", partialFiles.files.map(function(file){
    return {
        value: file.name,
        text: file.name,
        selected: false
    }
})).on("change", function(newValue){
    editor.open(partialFiles.get(newValue));
    refreshMarkdown();
});

var templateSelect = select("[data-select=templates]", templateFiles.files.map(function(file){
    return {
        value: file.name,
        text: file.name,
        selected: false
    }
})).on("change", function(newValue){
    editor.open(templateFiles.get(newValue));
    refreshMarkdown();
});

refreshMarkdown();

function refreshMarkdown(){
    var template = templateFiles.get(templateSelect.selected.value).content;
    var md = "";

    var data = fs.readFileSync("../test/fixture/globals.json", "utf8");

    dmd({ partials: partialFiles.toObject(), template: template })
        .on("error", console.log)
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
