const jsl = require("svjsl");
const settings = require("../settings.js");


module.exports.help = "Rolls a dice with the specified number of eyes";
module.exports.args = ["Number of eyes"];
module.exports.run = (client, message, args) => {
    try {
        args = parseInt(args);
        if(args < 3 || args > settings.command_settings.dice.max || isNaN(args)) return message.reply("please enter a number between 3 and " + settings.command_settings.dice.max + ". Example: `" + settings.command_prefix + "dice 6` to roll a normal D6 dice.");
        let finalnbr = jsl.randRange(1, args);

        message.reply("Rolling a D" + args + " dice...");

        var dcm = message.channel.send(jsl.randRange(1, args)).then(dcm => {
            setTimeout(()=>{
                dcm.edit(jsl.randRange(1, args)).then(dcm => {
                    setTimeout(()=>{
                        dcm.edit(jsl.randRange(1, args)).then(dcm => {
                            setTimeout(()=>{
                                dcm.edit(jsl.randRange(1, args)).then(dcm => {
                                    setTimeout(()=>{
                                        dcm.edit(jsl.randRange(1, args)).then(dcm => {
                                            setTimeout(()=>{
                                                dcm.edit("It landed on a " + finalnbr);
                                            }, 1000);
                                        });
                                    }, jsl.randRange(600, 800));
                                });
                            }, jsl.randRange(400, 600));
                        });
                    }, jsl.randRange(200, 400));
                });
            }, jsl.randRange(100, 200));
        });
    }
    catch(err) {
        message.reply("couldn't roll a dice.\nGot Error: " + err);
    }
}