const settings = require("../settings.js");
const Discord = require("discord.js");


module.exports.isDevCommand = true;
module.exports.run = (client, message, args) => {
    try {
        var allowToUse = false;
        for(let i = 0; i < settings.dev_ids.length; i++) if(message.author.id == settings.dev_ids[i]) allowToUse = true;

        if(allowToUse) {
            console.log("\n\n\x1b[31m\x1b[1mReceived stop command from " + message.author.tag + "\x1b[0m");

            var embed = new Discord.MessageEmbed()
                .setTitle("I was just shut down by " + message.author.username + "#" + message.author.discriminator)
                .setFooter("Timestamp (UTC): " + new Date().toUTCString())
                .setColor(settings.embed.color);

            client.guilds.cache.get(settings.serverSpecifics.supportServer.id).channels.cache.get(settings.serverSpecifics.supportServer.logChannel).send(embed).then(m => {
                message.react("👍").then(m => {
                    process.exit(0);
                });
            });
        }
        else return message.reply("this command can only be used by the developer.");
    }
    catch(err) {
        console.log("\n\n\x1b[31m\x1b[1mError while shutting down: " + err + "\nShutting down forcefully\x1b[0m");
        process.exit(0);
    }
}