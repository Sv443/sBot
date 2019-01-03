const settings = require("../settings.js");
const Discord = require("discord.js");


module.exports.isDevCommand = true;
module.exports.run = (client, message, args) => {
    try {
        console.log("\n\n\x1b[31m\x1b[1mReceived stop command from " + message.author.username + "#" + message.author.discriminator + "\x1b[0m");

        var embed = new Discord.RichEmbed()
            .setTitle("I was just shut down by " + message.author.username + "#" + message.author.discriminator)
            .setFooter("Timestamp (UTC): " + new Date().toUTCString())
            .setColor(settings.embed.color);

        client.guilds.get("524655091538460672").channels.get("524657306487619604").send(embed).then(m => {
            process.exit(0);
        });
    }
    catch(err) {
        console.log("\n\n\x1b[31m\x1b[1mError while shutting down: " + err + "\nShutting down forcefully\x1b[0m");
        process.exit(1);
    }
}