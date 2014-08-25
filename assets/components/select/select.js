var EventEmitter = require("events").EventEmitter;
var util = require("util");

module.exports = Select;

var $ = document.querySelector.bind(document);

function Select(selector, items){
    if (!(this instanceof Select)) return new Select(selector, items);
    var self = this;

    this.el = $(selector);
    this.el.addEventListener("change", function(){
        self.emit("change", this.value);
    });
    this.load(items);
}
util.inherits(Select, EventEmitter);

Select.prototype.load = function(items){
    var self = this;
    items.forEach(function(item){
        var opt = document.createElement("option");
        opt.value = item.value;
        opt.textContent = item.text;
        opt.selected = item.selected;
        self.el.appendChild(opt);
    });
};
