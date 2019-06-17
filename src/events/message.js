const { readdirSync } = require("fs");

exports.fire = (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type != "text")
    {
        return message.channel.send("You can only run commands in a text channel.");
    }

    if (message.content.startsWith(escape(process.env.BOT_PREFIX)))
    {
        // TODO: Add a way to lock commands to a specific group of people.

        // Calculate the permission level.
        // 2 = Bot Owner
        // 1 = Role
        // 0 = None
        let permissionLevel = 0;

        if (message.member)
        {
            if (message.member.roles.find(role => role.name == "Test"))
                permissionLevel = 1;

            switch (message.author.id)
            {
                case "276978099621724160":  // Marco
                    permissionLevel = 2;

                    break;

                case "208666671194439681": // Valatos
                    permissionLevel = 2;

                    break;
            }
        }

        // Get the command.
        const command = message.content.split(" ")[0]                       // Get the first word of the sentence.
                                       .split(process.env.BOT_PREFIX)[1]    // Remove the prefix.
                                       .toLowerCase();                      // Make it lowercase.

        const commands = readdirSync(`${__dirname}/../commands/`);

        for (let commandFile of commands)
        {
            if (commandFile.endsWith(".js"))
            {
                const commandName = commandFile.split(".")[0];

                if (command == commandName)
                {
                    const command = require(`../commands/${commandFile}`);

                    if (permissionLevel >= command.info["permission_level"])
                    {
                        // Getting the arguments.
                        let args = [];

                        const words = message.content.split(" ");

                        for (let index = 1; index < words.length; index++) // This starts at 1 to skip the command itself.
                            args.push(words[index]);

                        // Execute the actual command.
                        command.run(client, message, args);

                        return;
                    }
                    else
                    {
                        return message.reply("You lack the required permissions to start run a command.");
                    }
                }
            }
        }

        message.reply("That command doesn't seem to exist! Please, try again.");
    }
}
