const fs = require("fs");
const settings = require("../settings.js");
const Discord = require("discord.js");
const jsl = require("svjsl");

module.exports.help = "Reconfigure the bot to your server's needs";
module.exports.isAdminCommand = true;
module.exports.run = (client, message, args) => {
    if(message.member.permissions.has("KICK_MEMBERS")) {
        message.reply("Work in Progress!");
    }
    else {
        message.reply("you don't have enough permissions to do that!");
    }
}