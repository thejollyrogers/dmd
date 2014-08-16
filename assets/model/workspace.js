var a = require("array-tools");
var File = require("./file");

module.exports = Workspace;

function Workspace(partials){
    this.load(partials);
}
Workspace.prototype.load = function(data){
    if (data){
        this.files = Object.keys(data).map(function(key){
            return new File(key, data[key]);
        });
    }
};
Workspace.prototype.add = function(file){
    this.files.push(file);
};
Workspace.prototype.get = function(name){
    a.findWhere(this.files, { name: name });
};
