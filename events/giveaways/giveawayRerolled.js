const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new Discord.EmbedBuilder()
          .setTitle(`🎁 We Have A New Winner`)
          .setColor("#2F3136")
          .setDescription(`Hello ${member.user}!\n The host rerolled the Giveaway and you have won **${giveaway.prize}!**\nDirect Message the host to claim your prize! **[Go to Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**`)
          .setTimestamp()
          .setFooter({
            text: `${member.user.username}`, 
            iconURL: member.user.displayAvatarURL()
          })
        ]
      }).catch(e => {})
    });
  }
}
