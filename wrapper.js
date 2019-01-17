require("node-wrap")("./bot.js", {
    restartOnCrash: true,
    crashTimeout: 2000,
    restartTimeout: 0,
    console: true,
    logFile: "./data/wrapper.log",
    logConsoleOutput: null,
    logTimestamp: true,
    restartCodes: []
});