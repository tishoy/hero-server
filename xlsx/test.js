xlsxj = require("./xlsx-to-json");

var config = ["armor", "copy", "magic", "material", "monster", "npc", "overlap", "skill", "terrain", "weapon"]

config.map((config) => {
    xlsxj({
        input: config + ".xlsx",
        output: "../bin/config/json/" + config + ".json"
    }, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
})

