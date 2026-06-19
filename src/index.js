require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.once('ready', () => {
    console.log(`${client.user.tag} online`);
});

client.on('interactionCreate', async interaction => {

    if (
        interaction.isChatInputCommand() &&
        interaction.commandName === 'panel' &&
        interaction.options.getSubcommand() === 'create'
    ) {

        const {
            ModalBuilder,
            TextInputBuilder,
            TextInputStyle,
            ActionRowBuilder
        } = require('discord.js');

        const modal = new ModalBuilder()
            .setCustomId('panel_create')
            .setTitle('Vytvořit panel');

        const title = new TextInputBuilder()
            .setCustomId('title')
            .setLabel('Název embedu')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const description = new TextInputBuilder()
            .setCustomId('description')
            .setLabel('Popis embedu')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const button = new TextInputBuilder()
            .setCustomId('button')
            .setLabel('Text buttonu')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const type = new TextInputBuilder()
            .setCustomId('type')
            .setLabel('Typ (ticket nebo form)')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        modal.addComponents(
            new ActionRowBuilder().addComponents(title),
            new ActionRowBuilder().addComponents(description),
            new ActionRowBuilder().addComponents(button),
            new ActionRowBuilder().addComponents(type)
        );

        return interaction.showModal(modal);
    }

    if (interaction.isModalSubmit()) {

        if (interaction.customId === 'panel_create') {

            const title =
                interaction.fields.getTextInputValue('title');

            const description =
                interaction.fields.getTextInputValue('description');

            const button =
                interaction.fields.getTextInputValue('button');

            const type =
                interaction.fields.getTextInputValue('type');

            await interaction.reply({
                content:
`Panel vytvořen

Název: ${title}
Popis: ${description}
Button: ${button}
Typ: ${type}`,
                ephemeral: true
            });
        }
    }
});

client.login(process.env.TOKEN);
