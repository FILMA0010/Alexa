const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ComponentType } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'help',
  description: 'View all the commands available to the bot!',
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle(`Commands of ${client.user.username}`)
      .setColor('#2F3136')
      .setDescription('<:guide:1188899214881722398> **Please Select a category to view all its commands**\nLinks:')
      .addFields({ name: `Website`, value: `[Click](https://nebulos.pro/alexa)`, inline: false })
      .addFields({ name: `Discord`, value: `[Click](https://discord.gg/zbpJyKJ76t)`, inline: false })
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username} | ` + config.copyright,
        iconURL: interaction.user.displayAvatarURL()
      });

    const giveaway = new EmbedBuilder()
      .setTitle("Categories » Giveaway")
      .setColor('#2F3136')
      .setDescription("```yaml\nHere are the giveaway commands:```")
      .addFields(
        { name: 'Create / Start'  , value: `Start a giveaway in your guild!\n > **Types: **<:prefix:1188901392778280981> | <:message:1188899827690524795>`, inline: true },
        { name: 'Drop' , value: `Start a drop giveaway!\n > **Types: **<:prefix:1188901392778280981> | <:message:1188899827690524795>`, inline: true },
        { name: 'Edit' , value: `Edit an already running giveaway!\n > **Types: **<:prefix:1188901392778280981> | <:message:1188899827690524795>`, inline: true },
        { name: 'End' , value: `End an already running giveaway!\n > **Types: **<:prefix:1188901392778280981> | <:message:1188899827690524795>`, inline: true },
        { name: 'List' , value: `List all the giveaways running within this guild!\n > **Types: **<:prefix:1188901392778280981> | <:message:1188899827690524795>`, inline: true },
        { name: 'Pause' , value: `Pause an already running giveaway!\n > **Type: **<:prefix:1188901392778280981>`, inline: true },
        { name: 'Reroll' , value: `Reroll an ended giveaway!\n > **Types: **<:prefix:1188901392778280981> | <:message:1188899827690524795>`, inline: true },
        { name: 'Resume' , value: `Resume a paused giveaway!\n > **Type: **<:prefix:1188901392778280981>`, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username} | ` + config.copyright,
        iconURL: interaction.user.displayAvatarURL()
      });

    const general = new EmbedBuilder()
      .setTitle("Categories » General")
      .setColor('#2F3136')
      .setDescription("```yaml\nHere are the general bot commands:```")
      .addFields(
        { name: 'Help'  , value: `Shows all available commands to this bot!\n > **Types: **<:prefix:1188901392778280981> | <:message:1188899827690524795>`, inline: true },
        { name: 'Invite' , value: `Get the bot's invite link!\n > **Types: **<:prefix:1188901392778280981> | <:message:1188899827690524795>`, inline: true },
        { name: 'Ping' , value: `Check the bot's websocket latency!\n > **Types: **<:prefix:1188901392778280981> | <:message:1188899827690524795>`, inline: true },
        { name: 'Stats' , value: `Get the bot's stats!\n > **Type: **<:prefix:1188901392778280981>`, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.username} | ` + config.copyright,
        iconURL: interaction.user.displayAvatarURL()
      });

    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
          .setCustomId("help-menu")
          .setPlaceholder("Please Select a Category")
          .setDisabled(state)
          .addOptions([{
            label: `Giveaways`,
            value: `giveaway`,
            description: `View all the giveaway based commands!`,
            emoji: `🎉`
          },
          {
            label: `General`,
            value: `general`,
            description: `View all the general bot commands!`,
            emoji: `⚙`
          }
          ])
      ),
    ];

    const initialMessage = await interaction.reply({ embeds: [embed], components: components(false) });

    const filter = (interaction) => interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector(
      {
        filter,
        componentType: ComponentType.SelectMenu,
        idle: 300000,
        dispose: true,
      });

    collector.on('collect', (interaction) => {
      if (interaction.values[0] === "giveaway") {
        interaction.update({ embeds: [giveaway], components: components(false) }).catch((e) => { });
      } else if (interaction.values[0] === "general") {
        interaction.update({ embeds: [general], components: components(false) }).catch((e) => { });
      }
    });
    collector.on('end', (collected, reason) => {
      if (reason == "time") {
        initialMessage.edit({
          content: "Collector Destroyed, Try Again!",
          components: [],
        });
      }
    })
  }
}
