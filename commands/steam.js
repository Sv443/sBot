const Discord = require("discord.js");
const jsl = require("svjsl");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();

const settings = require("../settings.js");


const steamKey = process.env.STEAM_KEY;
const idURL = "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/";
const profileURL = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/";
const ownedgamesURL = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/";
const recentlyplayedURL = "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/";
const bansURL = "http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/";
const countrycodeURL = "https://restcountries.eu/rest/v2/alpha/";
var ccx = true;


module.exports.help = "Responds with some info on the specified user's steam account";
module.exports.category = "Fun";
module.exports.args = ["Username"];
module.exports.run = (client, message, args) => { // https://developer.valvesoftware.com/wiki/Steam_Web_API
    if(jsl.isEmpty(args)) return message.reply("please enter a Steam username. Example: `" + settings.command_prefix + "steam Sv443`");

    var loadingembed = new Discord.RichEmbed()
		.setFooter("Fetching steam profile...", settings.loadingURL)
        .setColor(settings.embed.color);
        
    message.channel.send(loadingembed).then(loadingembed => {
        var idxhr = new XMLHttpRequest();
        idxhr.open("GET", idURL + "?key=" + steamKey.toString() + "&vanityurl=" + args.toString(), true);
        idxhr.onreadystatechange = () => {
            if(idxhr.readyState == 4 && idxhr.status == 200) {
                var userid = JSON.parse(idxhr.responseText).response.steamid;
                if(JSON.parse(idxhr.responseText).response.success == 42) return loadingembed.edit(new Discord.RichEmbed().setDescription("Couldn't find Steam user **" + args + "**.\nMaybe their profile is private or you misspelt it.").setColor(settings.embed.color));

                var prxhr = new XMLHttpRequest();
                prxhr.open("GET", profileURL + "?key=" + steamKey.toString() + "&steamids=" + userid, true);
                prxhr.onreadystatechange = () => {
                    if(prxhr.readyState == 4 && prxhr.status == 200) {
                        var res1 = JSON.parse(prxhr.responseText).response.players[0];
                        
                        var ogxhr = new XMLHttpRequest();
                        ogxhr.open("GET", ownedgamesURL + "?key=" + steamKey.toString() + "&steamid=" + userid, true);
                        ogxhr.onreadystatechange = () => {
                            if(ogxhr.readyState == 4 && ogxhr.status == 200) {
                                var ownedgames = JSON.parse(ogxhr.responseText).response.game_count;

                                var rpxhr = new XMLHttpRequest();
                                rpxhr.open("GET", recentlyplayedURL + "?key=" + steamKey.toString() + "&steamid=" + userid, true);
                                rpxhr.onreadystatechange = () => {
                                    if(rpxhr.readyState == 4 && rpxhr.status == 200) {
                                        var recentlyplayedg = JSON.parse(rpxhr.responseText).response.games;

                                        var recentlyplayedgames = [];
                                        try {
                                            for(let i = 0; i < recentlyplayedg.length; i++) {
                                                recentlyplayedgames[i] = recentlyplayedg[i].name;
                                            }
                                            recentlyplayedgames = recentlyplayedgames.join(", ");
                                        }
                                        catch(err) {
                                            recentlyplayedgames = ["(private)"];
                                        }

                                        var baxhr = new XMLHttpRequest();
                                        baxhr.open("GET", bansURL + "?key=" + steamKey.toString() + "&steamids=" + userid);
                                        baxhr.onreadystatechange = () => {
                                            if(baxhr.readyState == 4 && baxhr.status == 200) {
                                                var totalbans = "VAC: " + JSON.parse(baxhr.responseText).players[0].NumberOfVACBans + "  |  Game: " + JSON.parse(baxhr.responseText).players[0].NumberOfGameBans;
                                                
                                                if(res1.loccountrycode == undefined) ccx = false;

                                                var ccxhr = new XMLHttpRequest();
                                                var curl;
                                                if(ccx) curl = countrycodeURL + res1.loccountrycode.toLowerCase();
                                                else curl = countrycodeURL + "us";
                                                ccxhr.open("GET", curl, true);
                                                ccxhr.onreadystatechange = () => {
                                                    if(ccxhr.readyState == 4 && ccxhr.status == 200) {
                                                        var country;
                                                        if(ccx) country = JSON.parse(ccxhr.responseText).name + ", " + JSON.parse(ccxhr.responseText).region;
                                                        else country = "(private)";

                                                        let nembed = new Discord.RichEmbed()
                                                            .setTitle("Showing info about Steam user **" + res1.personaname + "**:")
                                                            .setThumbnail(res1.avatarmedium)
                                                            .addField("Username:", res1.personaname, true)
                                                            .addField("Real Name:", res1.realname == undefined ? "(private)" : res1.realname, true)
                                                            .addField("Owned Games:", ownedgames == undefined ? "(private)" : ownedgames, true)
                                                            .addField("Country:", country == undefined ? "(private)" : country, true)
                                                            .addField("SteamID:", res1.steamid, true)
                                                            .addField("Bans:", totalbans, true)
                                                            .addBlankField()
                                                            .addField("Recently Played Games:", recentlyplayedgames, false)
                                                            .addBlankField()
                                                            .addField("Profile URL:", res1.profileurl, false)
                                                            .addBlankField()
                                                            .setFooter(settings.embed.footer)
                                                            .setColor(settings.embed.color);

                                                        loadingembed.edit(nembed);
                                                    }
                                                    else if(ccxhr.readyState == 4) return respError(ccxhr.statusText, ccxhr.status);
                                                }
                                                ccxhr.send();
                                            }
                                            else if(baxhr.readyState == 4) return respError(baxhr.statusText, baxhr.status);
                                        }
                                        baxhr.send();
                                    }
                                    else if(rpxhr.readyState == 4) return respError(rpxhr.statusText, rpxhr.status);
                                }
                                rpxhr.send();
                            }
                            else if(ogxhr.readyState == 4) return respError(ogxhr.statusText, ogxhr.status);
                        }
                        ogxhr.send();
                    }
                    else if(prxhr.readyState == 4) return respError(prxhr.statusText, prxhr.status);
                }
                prxhr.send();
            }
            else if(idxhr.readyState == 4) return respError(idxhr.statusText, idxhr.status);
        }
        idxhr.send();
    });

    function respError(err, status) {
        let nembed = new Discord.RichEmbed().setDescription("📡 Couldn't reach the Steam API! (Status " + status + ")\nGot error: " + err).setColor(settings.embed.color);
        return loadingembed.edit(nembed);
    }

    // get ID: https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=KEY&vanityurl=USERNAME
    // get profile info: https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=KEY&steamids=ID
}