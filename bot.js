const Discord = require("discord.js");
const fs = require("fs");
const jsl = require("svjsl");
const settings = require("./settings.js");
const fatalError = require("./errorHandler.js");
require('dotenv').config();

const client = new Discord.Client();
const joinProcedure = require("./joinProcedure.js");

console.log("\n\x1b[32m\x1b[1mInitializing " + settings.bot_name + " v" + settings.version + "...\x1b[0m\n\n\n");


process.stdout.write("Loading commands: ");

var availableCommands = [];
fs.readdirSync("./commands/").forEach(file => { // get all available commands
    availableCommands.push(file.replace(".js", ""));

    let isAdminCommand = require("./commands/" + file).isAdminCommand != (null || undefined);
    let isDevCommand = require("./commands/" + file).isDevCommand != (null || undefined)

    if(!isAdminCommand && !isDevCommand) process.stdout.write(`\x1b[34m\x1b[1m${file.replace(".js", "")}\x1b[0m `);
    else if(!isAdminCommand && isDevCommand) process.stdout.write(`\x1b[31m\x1b[1m${file.replace(".js", "")}\x1b[0m `);
    else process.stdout.write(`\x1b[33m\x1b[1m${file.replace(".js", "")}\x1b[0m `);
});
process.stdout.write("\n");
console.log("\nPermissions: \x1b[34m\x1b[1mNormal User \x1b[31mDeveloper \x1b[33mAdmin\n");


client.on("ready", () => {
    client.user.setAvatar(settings.avatar_url).catch(err => {});
    console.log("\n\x1b[32m\x1b[1mInitialization complete, waiting for commands in \x1b[33m" + client.channels.size + "\x1b[32m channels on \x1b[33m" + client.guilds.size + "\x1b[32m servers for a total of \x1b[33m" + client.users.size + "\x1b[32m users.\x1b[0m\n");
    setRedeployedStatus();
    setInterval(setDefaultActivity, 60 * 60 * 60 * 1000);

    client.on("message", message => {
        let msgc = message.content;
        //if(message.author.bot) return;
        try {
            if(msgc.substring(0, msgc.length - (msgc.length - 1)) == settings.command_prefix) {
                let command = "";
                try {command = msgc.split(" ")[0].substring(1);}
                catch(err) {command = msgc.substring(1);}
                if(jsl.isEmpty(command)) return;
                command = command.toLowerCase();
                msgc = msgc.split(" ");
                msgc.shift();
                let args = msgc.join(" ");


                if(availableCommands.includes(command)) {
                    try {
                        process.stdout.write(".");
                        require(`./commands/${command}.js`).run(client, message, args);
                    }
                    catch(err) {
                        console.log("\x1b[31m\x1b[1mERROR IN COMMAND HANDLER " + err + "\x1b[0m");
                        fatalError("Command Handler: " + err + " - message: " + message.content);
                    }
                }
                else {
                    // invalid command
                }
            }
        }
        catch(err) {
            console.log("\x1b[31m\x1b[1mGot error: " + err + "\x1b[0m");
            message.reply("\x1b[31m\x1b[1mCouldn't process your request.\nGot error: " + err + "\x1b[0m");
        }
    });

    client.on("guildCreate", guild => {
        joinProcedure(client, guild);
    });
});

client.login(process.env.BOT_TOKEN);

function setRedeployedStatus() {
    client.user.setActivity(`I just redeployed!`, { type: 'PLAYING' });
    setTimeout(()=>{
        setDefaultActivity();
    }, settings.redeployed_status_timeout);
}

function setDefaultActivity() {
    client.user.setActivity(settings.default_activity.message.replace("%GUILDS_SIZE%", client.guilds.size).replace("%COMMAND_PREFIX%", settings.command_prefix), { type: settings.default_activity.type });
}

process.on("SIGINT", softSD);
process.on("SIGTERM", softSD);
process.on("SIGKILL", softSD);

function softSD() {
    client.user.setStatus("dnd").then(r => {
        client.user.setActivity(`rebooting...`, { type: 'PLAYING' }).then(r => {
            process.exit(0);
        });
    });
}