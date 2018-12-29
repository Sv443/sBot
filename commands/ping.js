const jsl = require("svjsl");

module.exports.help = "Responds with \"pong\", if no URL is provided or else pings the specified URL";
module.exports.args = ["URL"];
module.exports.run = (client, message, args) => {
    args = args.toLowerCase();
    try {
        if(jsl.isEmpty(args)) {
            message.reply("pong!");
            return;
        }
        else if(args.includes("://") && args.includes("http") && args.includes(".") && args.includes("/")) {
            args = args.toString();
            jsl.ping(args, 6000).then(res=>{
                message.reply("pinged `" + args + "` and got status " + res.statusCode + " - " + res.statusMessage);
                return;
            }).catch(err=>{
                message.reply(args + " couldn't be pinged!\nError: " + err);
                return;
            });
        }
        else {
            message.reply("invalid URL, please enter it in this format: `http(s)://www.example.org/`");
            return;
        }
    }
    catch(err) {
        message.reply("invalid URL, please enter it in this format: `http(s)://www.example.org/`");
    }
}