module.exports = File;

function File(options){
    this.name = options.name;
    this.content = options.content;
    this.type = options.type;
    this.dirty = false;
}
File.prototype.save = function(){
    localStorage[this.type + "." + this.name] = this.content;
};
