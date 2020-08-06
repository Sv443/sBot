const Discord = require("discord.js");
const jsl = require("svjsl");

const settings = require("../settings.js");



module.exports.help = "sENdS a MessAGe lIKe tHIs";
module.exports.args = ["?Username", "Message"];
module.exports.category = "Fun";
module.exports.run = (client, message, args) => {
    var mention = "";
    if(message.mentions.members.first() != null) {
        mention = message.mentions.members.first() + " ";
        args = args.replace(/<@[0-9]*>/gm, "");
    }
    if(args.length < 2) return message.reply("please enter a valid message.\nExample: `" + settings.command_prefix + "mock @User stop bullying me guys!`");

    var mockEmoji = client.guilds.get(settings.serverSpecifics.supportServer.id).emojis.find(em => em.name == "mocking");
    var splitMsg = args.toLowerCase().split("");
    for(let i = 0; i < splitMsg.length; i++) {
        if(jsl.randRange(0, 1) == 1) splitMsg[i] = splitMsg[i].toUpperCase();
    }
    var doneMsg = splitMsg.join("");
    return message.delete().then(m => message.channel.send(`${mention}${mockEmoji} ${doneMsg}`));
}