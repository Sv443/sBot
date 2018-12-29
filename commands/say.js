const settings = require("../settings.js");
const jsl = require("svjsl");

module.exports.isAdminCommand = true;
module.exports.help = "sends a message as " + settings.bot_name;
module.exports.args = ["Message"];
module.exports.run = (client, message, args) => {
    var sayInChannel, sendMsg;

    if(jsl.isEmpty(args)) return message.delete();
    if(args.split(" ")[0].split("")[0] == "<" && args.split(" ")[0].split("")[1] == "#") {
        sayInChannel = args.split(" ")[0];
        sayInChannel = sayInChannel.substring(2, sayInChannel.length - 1);
        sendMsg = args.split(" ");
        sendMsg.shift();
        sendMsg = sendMsg.join(" ");
    }

    if(message.member.permissions.has("KICK_MEMBERS")) {
        if(jsl.isEmpty(sayInChannel)) {
            message.channel.send(args).then(m=>{
                message.delete();
            });
        }
        else {
            try {
                message.guild.channels.get(sayInChannel).send(sendMsg);
            }
            catch(err) {
                message.channel.send(args);
            }
        }
    }
    else {
        message.reply("you don't have enough permissions to do that!");
    }
}