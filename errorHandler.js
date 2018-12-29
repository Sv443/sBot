const fs = require("fs");

module.exports = err => {
    console.log("\x1b[31m\x1b[1mError: " + err);

    fs.appendFileSync("./data/fatalError.txt", new Date() + ":     " + err + "\n\n\n");
}