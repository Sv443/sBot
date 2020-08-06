const settings = require("../settings.js");


module.exports = client => {
    process.stdout.write("\x1b[0m");
    return;

    client.on("guildMemberAdd", member => {
        if(member.guild.id == settings.serverSpecifics.briljaCraft.guildID)
            member.addRole(member.guild.roles.find(role => role.name == settings.serverSpecifics.briljaCraft.newUserRoleName));
    });

    setInterval(() => {
        try {
            let consoleChannel = client.guilds.find(guild => guild.id == "573179771102560276").channels.find(channel => channel.id == "573952398830075924");
            let ingameChatChannel = client.guilds.find(guild => guild.id == "573179771102560276").channels.find(channel => channel.id == "573952341208858640");
    
            consoleChannel.send("say !!!").then(() => {
                consoleChannel.send("say The server will restart in one minute!").then(() => {
                    consoleChannel.send("say !!!");
                });
            });
    
            setTimeout(() => {
                consoleChannel.send("say Restart in 10 seconds!");
                setTimeout(() => {
                    consoleChannel.send("say Restart in 5 seconds!");
    
                    setTimeout(() => {
                        consoleChannel.send("kickall Restarting server...").then(() => {
                            consoleChannel.send("stop").then(() => {
                                ingameChatChannel.send("The server is now being restarted!");
                            });
                        });
                    }, 5000);
                }, 5000);
            }, 50 * 1000);
        }
        catch(err) {
            consoleChannel.send("kickall Restarting server...").then(() => {
                consoleChannel.send("stop");
            });
        }
    }, 24 * 60 * 60 * 1000);
}
