"use strict";

exports.get = get;

function get(namespace){
    var output = {};
    var prefix = namespace + ".";

    Object.keys(localStorage).forEach(function(key){
        if (key.indexOf(prefix) === 0){
            output[key.replace(prefix, "")] = localStorage[key];
        }
    });
    return output;
};


// module.exports = Store;

// function Store(){
//     if(!(this instanceof Store)) return new Store();
// }
// Store.prototype.get = function(namespace){
//     var output = {};
//     var prefix = namespace + ".";
//
//     Object.keys(localStorage).forEach(function(key){
//         if (key.indexOf(prefix) === 0){
//             output[key.replace(prefix, "")] = localStorage[key];
//         }
//     });
//     return output;
// };

