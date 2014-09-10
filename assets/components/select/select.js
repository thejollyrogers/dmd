var EventEmitter = require("events").EventEmitter;
var util = require("util");
var a = require("array-tools");

module.exports = Select;

var $ = document.querySelector.bind(document);

function Select(selector, items){
    if (!(this instanceof Select)) return new Select(selector, items);
    var self = this;

    this.el = $(selector);
    this.items = items;
    this.selected = self.items[0];
    this.el.addEventListener("change", function(){
        self.selected = a.findWhere(self.items, { value: this.value });
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
