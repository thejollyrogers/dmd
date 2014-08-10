var Editor = require("./editor");

var editor = new Editor(document.querySelector("#editor"), {
    workspace: [
        { name: "main", content: "{{>main}}" },
        { name: "clive", content: "straight hatred", default: true }
    ]
});

editor.on("input", function(data){
    console.log(data);
});
