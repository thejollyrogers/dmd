var EventEmitter = require("events").EventEmitter;
var a = require("array-tools");
var f = require("function-tools");
var util = require("util");

var $ = document.querySelector.bind(document);

module.exports = Editor;

function Editor(el, options){
    var self = this;
    var defaultFile = a.findWhere(options.workspace, { default: true })
    el.value = localStorage.editor || defaultFile.content;
    this.file =  defaultFile || {
        name: "empty",
        content: "clive"
    };
    
    Object.defineProperty(this, "value", { enumerable: true, get: function(){
        return el.value;
    }});
    
    var throttled = f.throttle(function(){
        localStorage.editor = el.value;
        self.emit("input", self.file);
    }, { restPeriod: 500 });
    el.addEventListener("input", throttled);
};
util.inherits(Editor, EventEmitter);
