const Discord = require("discord.js");
const jsl = require("svjsl");
const settings = require("../settings.js");



const data = {
    description: "The Bot chooses a random number between 1 and 10000.\nYou have to guess that number and the only hint you get is if your number is higher or lower than the bot's number.",
    shortdesc: "Classical Higher Lower game",
    maxTime: (5 * 60 * 1000),
    higherMsgs: [],
    lowerMsgs: [],
    correctMsgs: []
}
module.exports.data = data;

module.exports.play = (client, message, args) => {
    return message.reply("This game is currently in development. Please try again in a few days.");
    var gameRunning;
    var player, messageChannel = message.channel.id, messageGuild = message.guild.id;

    if(!gameRunning) {
        gameRunning = true;

        var finalNumber = jsl.randRange(1, 10000);

        message.reply("you started the game HigherLower!\nYou have " + (data.maxTime / 1000 / 60) + " minutes time to complete it.\n\nTo start off, type a random number!" + "\n\nDEV: finalNumber: " + finalNumber);

        var to = setTimeout(()=>{
            message.reply((data.maxTime / 1000 / 60) + " minutes are over now. You've lost the game!");
            gameRunning = false;
        }, data.maxTime);

        client.on("message", msg => {
            console.log(msg.content);
            message.reply(gameRunning + " - " + msg.channel.id + "/" + messageChannel + " - " + message.author.bot + " - " + msg.guild.id + "/" + messageGuild);
            if(gameRunning && msg.channel.id == messageChannel && !message.author.bot && msg.guild.id == messageGuild) {
                message.channel.send("succ");
            }
        });
    }
    else {
        message.reply("a game is currently running!\nPlease wait until that person beats the game or AFKs for too long.");
    }
}