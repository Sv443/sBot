const Discord = require("discord.js");
const http = require("http");
const fs = require("fs");
const jsl = require("svjsl");

const settings = require("../settings.js");


module.exports = (client) => {
    process.stdout.write("\x1b[0m");

    var httpserver = http.createServer((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Access-Control-Allow-Headers', '*');

        if(req.method == "POST") {
            var body = '';
            req.on('data', data => {
                body += data;
                res.writeHead(200, {"Content-Type": "text/plain; utf-8"});
                res.end();

                var GHevent = req.headers["x-github-event"];
                fs.writeFileSync(settings.serverSpecifics.supportServer.logFile, "URL: " + req.url + "\nMETHOD: " + req.method + "\n\n\nH: " + JSON.stringify(req.headers, null, 4) + "\n\n\nQC: " + JSON.stringify(JSON.parse(body), null, 4));

                if(GHevent == "release") {
                    process.stdout.write(":");

                    var gembed = new Discord.MessageEmbed()
                        .setTitle("A new version of " + settings.bot_name + " (" + JSON.parse(body).release.tag_name + ") was just released!")
                        .setURL(JSON.parse(body).release.html_url)
                        .setAuthor(JSON.parse(body).release.author.login, JSON.parse(body).release.author.avatar_url, JSON.parse(body).release.author.html_url)
                        .setColor(settings.embed.color);
                }
                else if(GHevent == "issues") {
                    var d = JSON.parse(body);
                    if(d.action == "closed") {
                        var gembed = new Discord.MessageEmbed()
                            .setTitle("The issue **\"" + d.issue.title + "\"** was just closed!")
                            .setAuthor(d.sender.login, d.sender.avatar_url, d.sender.html_url)
                            .addField("URL:", d.issue.html_url, false)
                            .setColor(settings.embed.color);
                    }
                    else if(d.action == "opened") {
                        var bod = d.issue.body;
                        var gembed = new Discord.MessageEmbed()
                            .setTitle("An issue was just opened!")
                            .setAuthor(d.sender.login, d.sender.avatar_url, d.sender.html_url)
                            .setColor(settings.embed.color)
                            .addField("Title:", d.issue.title, false);
                            if(!jsl.isEmpty(bod)) gembed.addField("Issue Description:", bod, false);
                            gembed.addField("URL:", d.issue.html_url, false);
                    }
                }
                else return;
                if(!jsl.isEmpty(gembed)) client.guilds.cache.get("524655091538460672").channels.cache.get("529820652249808907").send(gembed);
            });
        }
        else {
            res.writeHead(405, {"Content-Type": "text/plain; utf-8"});
            res.end("Wrong method, use POST instead");
        }
    });
    

    try {
        httpserver.listen(settings.serverSpecifics.supportServer.httpPort, null, function(error){
            if(!!error){
                console.log("\n\x1b[31m\x1b[1mError while initializing GitHub listener on 0.0.0.0:" + settings.serverSpecifics.supportServer.httpPort + " - " + error + "\x1b[0m");
                return process.exit(1);
            }
            else {
                console.log("\x1b[32m\x1b[1mGitHub listener successfully started on 0.0.0.0:" + settings.serverSpecifics.supportServer.httpPort + "\x1b[0m\n");
                return true;
            }
        });
    }
    catch(err) {
        console.log("\n\x1b[31m\x1b[1mError while initializing GitHub listener on 0.0.0.0:" + settings.serverSpecifics.supportServer.httpPort + " - " + err + "\x1b[0m");
        process.exit(1);
    }
}