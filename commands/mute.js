const settings = require("../settings.js");
const jsl = require("svjsl");

module.exports.isAdminCommand = true;
module.exports.help = "prevents the specified user from sending any messages";
module.exports.args = ["User"];
module.exports.run = (client, message, args) => {
    var mentions, muteUser;
    try {
        mentions = message.mentions.members.array();
        muteUser = mentions[0];
    }
    catch(err) {

    }

    try {
        if(jsl.isEmpty(mentions)) muteUser = client.users.find("username", args.split(" ")[0]);
    }
    catch(err) {
        if(jsl.isEmpty(mentions)) muteUser = client.users.find("username", args);
    }

    if(message.member.permissions.has("MUTE_MEMBERS")) {
        message.reply("muted user **" + muteUser.username + "#" + muteUser.discriminator + "** for **" + muteMinutes + "** minutes.");
    }
    else {
        message.reply("you don't have enough permissions to do that!");
    }
}