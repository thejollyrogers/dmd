var a = require("array-tools");
var File = require("./file");

module.exports = Files;

function Files(options){
    this.files = [];
    this.type = options.type;
}
Files.prototype.load = function(data){
    var self = this;
    if (data){
        Object.keys(data).forEach(function(key){
            self.update(new File({ name: key, content: data[key], type: self.type }))
        });
    }
};
Files.prototype.add = function(file){
    this.files.push(file);
    return this;
};
Files.prototype.update = function(file){
    var existingFile = a.findWhere(this.files, { name: file.name });
    if (existingFile){
        existingFile.content = file.content;
        existingFile.dirty = true;
    } else {
        this.add(file);
    }
    return this;
};
Files.prototype.get = function(name){
    return a.findWhere(this.files, { name: name });
};
Files.prototype.toObject = function(){
    var output = {};
    this.files.forEach(function(file){
        output[file.name] = file.content;
    });
    return output;
};
