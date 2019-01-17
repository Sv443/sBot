const Discord = require("discord.js");
const fs = require("fs");
const jsl = require("svjsl");
const settings = require("./settings.js");
const fatalError = require("./errorHandler.js");
const botFarmProcedure = require("./botFarmProcedure.js");
require('dotenv').config();

const client = new Discord.Client();
const joinProcedure = require("./joinProcedure.js");

console.log("\n\x1b[32m\x1b[1mInitializing " + settings.bot_name + " v" + settings.version + "...\x1b[0m\n\n\n");


const serverSpecifics = [
    require("./serverSpecifics/supportServer.js")
]




process.stdout.write("Loading commands: ");

var availableCommands = [], totalCmds = 0;
fs.readdirSync("./commands/").forEach(file => { // get all available commands
    availableCommands.push(file.replace(".js", ""));

    let isAdminCommand = require("./commands/" + file).isAdminCommand != (null || undefined);
    let isDevCommand = require("./commands/" + file).isDevCommand != (null || undefined)

    if(!isAdminCommand && !isDevCommand) process.stdout.write(`\x1b[34m\x1b[1m${file.replace(".js", "")}\x1b[0m `);
    else if(!isAdminCommand && isDevCommand) process.stdout.write(`\x1b[31m\x1b[1m${file.replace(".js", "")}\x1b[0m `);
    else process.stdout.write(`\x1b[33m\x1b[1m${file.replace(".js", "")}\x1b[0m `);

    totalCmds++;
});
process.stdout.write("\n");
console.log("Total: \x1b[33m\x1b[1m" + totalCmds + "\x1b[0m");
console.log("Permissions: \x1b[34m\x1b[1mNormal User \x1b[31mDeveloper \x1b[33mAdmin\n\x1b[0m");


client.on("ready", () => {
    serverSpecifics.forEach(sp => { // run server specifics
        sp(client);
    });


    client.user.setAvatar(settings.avatar_url).catch(err => {});
    console.log("\n\x1b[32m\x1b[1mInitialization complete, waiting for commands in \x1b[33m" + client.channels.size + "\x1b[32m channels on \x1b[33m" + client.guilds.size + "\x1b[32m servers for a total of \x1b[33m" + client.users.size + "\x1b[32m users.\x1b[0m\n");
    setRedeployedStatus();

    client.on("message", message => {
        let msgc = message.content;
        if(message.author.bot) return;
        try {
            if(msgc.substring(0, msgc.length - (msgc.length - settings.command_prefix.length)) == settings.command_prefix) {
                let command = "";
                try {command = msgc.split(" ")[0].substring(settings.command_prefix.length);}
                catch(err) {command = msgc.substring(settings.command_prefix.length);}
                if(jsl.isEmpty(command)) return;
                command = command.toLowerCase();
                msgc = msgc.split(" ");
                msgc.shift();
                let args = msgc.join(" ");


                if(availableCommands.includes(command)) { // if command is recognized
                    try {
                        process.stdout.write(".");
                        try {
                            // valid command
                            require(`./commands/${command}.js`).run(client, message, args);
                        }
                        catch(err) {
                            console.log("\x1b[31m\x1b[1mError while running command \"" + command + "\": " + err + "\x1b[0m");
                        }
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
        let oMb = guild.members.size;
        let membersNoBots = guild.members.filter(member => !member.user.bot).size;
        let botMembers = oMb - membersNoBots;

        if(botMembers > membersNoBots) botFarmProcedure(client, guild);

        // run join procedure on guild join to initially configure the bot
        joinProcedure(client, guild);
    });
});

function setRedeployedStatus() {
    client.user.setActivity(`I just restarted!`, { type: 'PLAYING' });
    client.user.setStatus("idle");
    setTimeout(()=>{
        setDefaultActivity();
        client.user.setStatus("online")
        setInterval(()=>{setDefaultActivity();}, 20000);
    }, settings.redeployed_status_timeout);
}

function setDefaultActivity() {
    client.user.setActivity(settings.default_activity.message.replace("%GUILDS_SIZE%", client.guilds.size).replace("%COMMAND_PREFIX%", settings.command_prefix), { type: settings.default_activity.type });
}

jsl.softShutdown(()=>{
    client.user.setStatus("dnd").then(r => {
        client.user.setActivity(`rebooting...`, { type: 'PLAYING' }).then(r => {
            setTimeout(()=>{
                process.exit(0);
            }, 1000);
        });
    });
});





client.login(process.env.BOT_TOKEN);