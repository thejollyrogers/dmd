var EventEmitter = require("events").EventEmitter;
var a = require("array-tools");
var f = require("function-tools");
var util = require("util");

var $ = document.querySelector.bind(document);

module.exports = Editor;

function Editor(el, options){
    var self = this;
    this.workspace = options.workspace;
    this.el = el;
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
Editor.prototype.save = function(){
    localStorage.file = JSON.stringify(this.file);
};
