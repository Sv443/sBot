const Discord = require("discord.js");
const jsl = require("svjsl");
const fs = require("fs");

const settings = require("../settings.js");



module.exports.help = "Play a small game directly in the chat";
module.exports.category = "Fun";
module.exports.run = (client, message, args) => {
    return message.reply("I'm sorry, but I can't play games just yet.");
    if(jsl.isEmpty(args) || args.toLowerCase() == "help") return help(client, message, args);
    else parseGame(client, message, args);
};

function help(client, message, args) {
    var allgames = [];
    var files = fs.readdirSync(settings.command_settings.games.dir);

    for(let i = 0; i < files.length; i++) {
        allgames[i] = "`" + files[i].replace(/(\.\w*)/gm, "") + "` - " + require("." + settings.command_settings.games.dir + "/" + files[i]).data.shortdesc;
    }

    let embed = new Discord.MessageEmbed()
        .setColor(settings.embed.color)
        .setFooter(settings.embed.footer)
        .setDescription(`Type \`${settings.command_prefix}game [Name]\` to play a game.`)
        .addField("All Games: ", `${allgames.join("\n")}`);
    message.channel.send(embed);
}

function parseGame(client, message, args) {
    var files = fs.readdirSync(settings.command_settings.games.dir);
    var selectedGame = args.toLowerCase() + ".js";
    var yes = false;
    
    for(let i = 0; i < files.length; i++) {
        if(files[i].toLowerCase() == selectedGame) {
            yes = true;
            
            let embed = new Discord.MessageEmbed()
                .setTitle(files[i].replace(/(\.\w*)/gm, ""))
                .setDescription(require("." + settings.command_settings.games.dir + "/" + files[i]).data.description + "\n\n\nClick the white checkmark reaction within " + (settings.command_settings.games.confirmationTimeout / 1000) + " seconds to play the game or don't click it to cancel.")
                .setColor(settings.embed.color);

            try {
                message.channel.send(embed).then(m=>{
                    m.react("✅").then(s => {
                        var filter = (reaction, user) => {
                            return ['✅'].includes(reaction.emoji.name) && user.id === message.author.id;
                        };
                        m.awaitReactions(filter, { max: 1, time: settings.command_settings.games.confirmationTimeout, errors: ['time'] }).then(r => {
                            if(r.first().emoji.name == "✅") m.delete().then(m=>{
                                setTimeout(()=>{
                                    require("." + settings.command_settings.games.dir + "/" + files[i]).play(client, message, args);
                                }, 500);
                            });
                            else message.channel.send("fucc");
                        }).catch(err => notAccept(m, files[i].replace(/(\.\w*)/gm, "")));
                    }).catch(err => notAccept(m, files[i].replace(/(\.\w*)/gm, "")));
                }).catch(err => notAccept(m, files[i].replace(/(\.\w*)/gm, "")));
            }
            catch(err) {
                notAccept(m, files[i].replace(/(\.\w*)/gm, ""));
            }
        }
    }
    if(!yes) message.reply("I don't have that game on my hard drive!\nPlease use `" + settings.command_prefix + "game help` to view all available games.");
}

function notAccept(m, gamename) {
    let embed = new Discord.MessageEmbed()
        .setTitle(gamename)
        .setDescription("Cancelled.")
        .setColor(settings.embed.color);
        
    m.edit(embed).then(ms => {
        setTimeout(()=>{
            ms.delete();
        }, 5000);
    });
}