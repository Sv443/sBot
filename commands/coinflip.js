const jsl = require("svjsl");
const settings = require("../settings.js");


module.exports.help = "Flips a coin";
module.exports.category = "Fun";
module.exports.args = ["Number of Flips"];
module.exports.run = (client, message, args) => {
    try {
        args = parseInt(args);
        var flipTms = args;

        if(flipTms <= 1 || flipTms > settings.command_settings.coinflip.max) return message.reply("please enter a number between 2 and " + settings.command_settings.coinflip.max + " (example: `" + settings.command_prefix + "coinflip 5`)");

        if(isNaN(flipTms) || jsl.isEmpty(flipTms)) return flipCoin(message);
        else {
            flipMultipleCoins(flipTms, message);
        }
    }
    catch(err) {
        message.reply("couldn't flip a coin.\nGot Error: " + err);
    }
}

function flipCoin(message) {
    var ht = jsl.randRange(1, 2);
    if(ht == 1) ht = "Heads";
    else ht = "Tails";

    message.reply("flipping a coin...");
    setTimeout(()=>{
        message.channel.send("It landed on **" + ht + "**");
    }, jsl.randRange(1000, 2100));
}

function flipMultipleCoins(nbr, message) {
    var flips = "";
    for(let i = 0; i < nbr; i++) {
        var ht = jsl.randRange(1, 2);
        flips += ((ht == 1 ? "Heads" : "Tails") + (i != (nbr - 1) ? ", " : ""));
    }

    message.reply("flipping " + nbr + " coins...");
    setTimeout(()=>{
        message.channel.send("The results are:\n**" + flips + "**");
    }, jsl.randRange(1000, 2100));
}