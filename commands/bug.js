const fs = require("fs");
const jsl = require("svjsl");
const settings = require("../settings.js");


module.exports.help = "Sends a bug report to the developer";
module.exports.args = ["Bug(s)"];
module.exports.run = (client, message, args) => {
    args = args.toLowerCase();

    if(jsl.isEmpty(args)) return message.reply("please enter your bug report like this: `" + settings.command_prefix + "bug XY is broken`");
    
    try {
        fs.appendFileSync("./data/bugReport.txt", "\"" + message.author.username + "#" + message.author.discriminator + "\" on \"" + message.guild.name + "\":   " + args + "\n\n");
        message.reply("your bug report was successfully received. Thank you very much for improving the bot :smile:");
    }
    catch(err) {
        message.reply("couldn't process the bug report.\nGot Error: " + err);
    }
}