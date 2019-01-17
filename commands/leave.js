const Discord = require("discord.js");
const settings = require("../settings.js");

const jsl = require("svjsl");


module.exports.isDevCommand = true;
module.exports.run = (client, message, args) => {
    try {
        var allowToUse = false;
        for(let i = 0; i < settings.dev_ids.length; i++) if(message.author.id == settings.dev_ids[i]) allowToUse = true;

        if(allowToUse) {
            if(jsl.isEmpty(args)) args = "none provided";
            message.channel.send("I left the server. Reason: `" + args + "`\nBye!");
            message.guild.leave().then(m => {
                message.delete();
                console.log("Forced leave on " + message.guild.name);
                client.guilds.get(settings.serverSpecifics.supportServer.id).channels.get(settings.serverSpecifics.supportServer.logChannel).send("Forced leave on " + message.guild.name + " - Reason: `" + args + "`");
            });
        }
        else {
            message.reply("this command can only be used by the developer.");
        }
    }
    catch(err) {
        message.reply("got an error while viewing all data.\nError: " + err);
    }
}