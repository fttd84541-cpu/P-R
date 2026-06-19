require('dotenv').config();

const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
    new SlashCommandBuilder()
        .setName('panel')
        .setDescription('Správa panelů')
        .addSubcommand(sub =>
            sub
                .setName('create')
                .setDescription('Vytvoří nový panel')
        )
        .addSubcommand(sub =>
            sub
                .setName('send')
                .setDescription('Odešle panel')
        )
        .addSubcommand(sub =>
            sub
                .setName('edit')
                .setDescription('Upraví panel')
        )
        .addSubcommand(sub =>
            sub
                .setName('delete')
                .setDescription('Smaže panel')
        )
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registruji příkazy...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );

        console.log('Příkazy zaregistrovány.');
    } catch (error) {
        console.error(error);
    }
})();
