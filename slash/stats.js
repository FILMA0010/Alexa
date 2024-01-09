const { EmbedBuilder } = require('discord.js');
const filePath = 'storage/count.json';
const fs = require('fs');
const data = fs.readFileSync(filePath, 'utf8');
const jsonData = JSON.parse(data);

module.exports = {
    name: 'stats',
    description: 'Check the Giveaway stats!',
    run: async (client, interaction) => {

      let serverCount = client.guilds.cache.size;
      let memberCount = client.users.cache.size;
      let sembed = new EmbedBuilder()
      .setColor('#2F3136')	
		  .setTitle('Giveaway Stats')
          .addFields([
                    { name: '**Latency**', value: `\`${Date.now() - interaction.createdTimestamp}ms\``, inline: true },
                    { name: '**Total Giveaways**', value: `\`${jsonData.total}\``, inline: true },
                    { name: '**Normal Giveaway**', value: `\`${jsonData.normal}\``, inline: true },
                    { name: '**Drop Giveaways**', value: `\`${jsonData.drops}\``, inline: true }
                    ])
        .setTimestamp()
                  .setFooter({
                     text: `${interaction.user.username}`,
                     iconURL: interaction.user.displayAvatarURL()
                  })
        interaction.reply({
          embeds: [sembed]
        });
    },
};
