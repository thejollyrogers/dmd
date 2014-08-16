module.exports = File;

function File(name, content, options){
    this.name = name;
    this.content = content;
    this.dirty = false;
}
File.prototype.save = function(){
    localStorage[this.name] = this.content;
};
