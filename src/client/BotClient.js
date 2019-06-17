const { Client } = require("discord.js");
const { EventManager } = require("./EventManager.js");

class BotClient
{
    constructor(token, options)
    {
        this.token = escape(token);
        this.options = options
    }

    run()
    {
        if (this.client)
        {
            this.client.destroy();
        }

        this.client = new Client(
            this.options ? this.options : {}
        );

        const eventManager = new EventManager(this.client);
        eventManager.loadEvents();

        this.client.login(this.token);
    }
}

exports.BotClient = BotClient;
