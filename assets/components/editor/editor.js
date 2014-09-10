var EventEmitter = require("events").EventEmitter;
var a = require("array-tools");
var f = require("function-tools");
var util = require("util");

var $ = document.querySelector.bind(document);

module.exports = Editor;

function Editor(selector, options){
    if (!(this instanceof Editor)) return new Editor(selector, options);
    
    var self = this;
    this.el = $(selector);
    Object.defineProperty(this, "value", { enumerable: true, get: function(){
        return el.value;
    }});

    this.el.addEventListener("input", f.throttle(function(){
        self.file.content = self.el.value;
        self.save();
        self.emit("input", self.file);
    }, { restPeriod: 500 }));
};
util.inherits(Editor, EventEmitter);

Editor.prototype.open = function(file){
    if (file){
        this.file = file;
        this.el.value = this.file.content;
        this.emit("opened", this.file);
    }
    return this;
};
Editor.prototype.save = function(){
    this.file.save();
    return this;
};
Editor.prototype.close = function(){
    this.file = null;
    this.el.value = "";
    return this;
};
