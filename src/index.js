const { BotClient } = require("./client/BotClient.js");

const client = new BotClient(process.env.BOT_TOKEN, {
    disableEveryone: true
});
client.run();
