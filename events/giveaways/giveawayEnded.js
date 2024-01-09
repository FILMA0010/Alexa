const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new Discord.EmbedBuilder()
          .setTitle(`🎁 Giveaway Time!`)
          .setColor("#2F3136")
          .setDescription(`Hello ${member.user}!\n You have won **${giveaway.prize}**! \n Direct Message the host to claim your prize!! \n **[Go To Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**`)
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
