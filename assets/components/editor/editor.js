var EventEmitter = require("events").EventEmitter;
var a = require("array-tools");
var f = require("function-tools");
var util = require("util");

var $ = document.querySelector.bind(document);

module.exports = Editor;

function Editor(selector, options){
    var self = this;
    this.workspace = options.workspace;
    this.el = $(selector);
    Object.defineProperty(this, "value", { enumerable: true, get: function(){
        return el.value;
    }});

    var defaultFile = a.findWhere(this.workspace, { default: true });
    var saved = localStorage.file ? JSON.parse(localStorage.file) : null;
    this.setFile(saved || defaultFile);

    el.addEventListener("input", f.throttle(function(){
        self.file.content = el.value;
        self.save();
        self.emit("input", self.file);
    }, { restPeriod: 500 }));

    var select = $(".files");
    this.workspace.forEach(function(file){
        var option = document.createElement("option");
        option.value = file.name;
        option.textContent = file.name;
        option.selected = file.name === self.file.name;
        select.appendChild(option);
    });
    select.addEventListener("change", function(){
        self.setFile(a.findWhere(self.workspace, { name: this.value }));
    });
};
util.inherits(Editor, EventEmitter);

Editor.prototype.setFile = function(file){
    this.file = file;
    this.el.value = this.file.content;
    this.save();
    this.emit("input", this.file);
};
Editor.prototype.open = function(file){
    this.file = file;
    this.el.value = this.file.content;
    this.emit("opened", this.file);
};
Editor.prototype.save = function(){
    file.save();
};
Editor.prototype.close = function(){
    this.file = null;
    this.el.value = "";
};
