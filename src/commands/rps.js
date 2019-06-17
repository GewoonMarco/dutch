exports.run = (client, message, args) => {
    let object = args[0];

    if (object && typeof(object) == "string")
    {
        object = object.toLowerCase();

        const objects = {
            // The value of the keys, are the objects they beat.

            "steen": "schaar",
            "papier": "steen",
            "schaar": "papier"
        };

        for (let index = 0; index < Object.keys(objects).length; index++)
        {
            const possibleObjectBeats = Object.values(objects)[index];
            const possibleObject = Object.keys(objects)[index];

            if (object == possibleObject)
            {
                const ourObjectIndex = Math.round(Math.random()) * (Object.keys(objects).length - 1);
                const ourObject = Object.keys(objects)[ourObjectIndex];

                message.reply(`U hebt **${object}** gekozen. En ik kies... **${ourObject}**!\nIk ga even de resultaten berekenen...`);

                if (objects[object] == ourObject)
                {
                    return message.channel.send(`Oké, ${message.member.displayName}, u heeft gewonnen... Laten we het nog eens een keertje spelen?`);
                }
                else if (objects[ourObject] == object)
                {
                    return message.channel.send(`Haha, ik heb van u gewonnen, ${message.member.displayName}! Laten we het nog eens een keertje spelen? Misschien wint u deze keer wel. :wink: `);
                }
                else
                {
                    return message.channel.send(`Jammer, ${message.member.displayName}, het is gelijk spel. Laten we het nog eens spelen, misschien komt er dan wel een winnaar uit?`);
                }
            }
        }

        return message.reply(`Dat is geen geldige object. Kies alstublieft uit een van de volgende objecten: ${Object.keys(objects).join(", ")}!`);
    }
    else
    {
        return message.reply("U hebt mij geen geldige informatie gegeven. Zo kunnen we toch geen potje steen, papier, schaar spelen?");
    }
}

exports.info = {
    "permission_level": 1
}
