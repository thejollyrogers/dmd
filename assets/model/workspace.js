module.exports = Workspace;

function Workspace(partials){
    this.load(partials);
    this._files.push({
        name: "_template",
        content: "{{>main}}",
        default: true
    });
}
Workspace.prototype.load = function(partials){
    this._files = Object.keys(partials).map(function(key){
        return {
            name: key,
            content: partials[key]
        };
    });
};
