const { readdirSync } = require("fs");

class EventManager
{
    constructor(client)
    {
        this.client = client;
    }

    async loadEvents()
    {
        const files = await readdirSync(`${__dirname}/../events/`);

        for (let eventFile of files)
        {
            if (eventFile.endsWith(".js"))
            {
                const eventName = eventFile.split(".")[0];
                const event = require(`../events/${eventFile}`);

                this.client.on(eventName, (...args) => event.fire(this.client, ...args));
            }
        }
    }
}

exports.EventManager = EventManager;
