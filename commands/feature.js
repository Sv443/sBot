const fs = require("fs");
const settings = require("../settings.js");
const jsl = require("svjsl");


module.exports.help = "Sends a feature request to the developer";
module.exports.args = ["Feature(s)"];
module.exports.run = (client, message, args) => {
    args = args.toLowerCase();
    if(jsl.isEmpty(args)) return message.reply("please enter your feature request like this: `" + settings.command_prefix + "feature Please add XY`");
    
    try {
        fs.appendFileSync("./data/featureRequests.txt", "\"" + message.author.username + "#" + message.author.discriminator + "\" on \"" + message.guild.name + "\":   " + args + "\n\n");
        message.reply("your feature request was successfully received. Thank you very much for improving the bot :smile:");
    }
    catch(err) {
        message.reply("couldn't process the feature request.\nGot Error: " + err);
    }
}