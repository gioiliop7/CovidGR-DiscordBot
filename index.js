require("dotenv").config(); //initialize dotenv
const axios = require("axios"); //add this line at the top
const Discord = require("discord.js"); //import discord.js
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("ready", () => {
  client.user.setActivity("Covid-19 Cases", { type: "WATCHING" });
});

url_cases = "https://covid-19-greece.herokuapp.com/all";
url_deaths = "https://covid-19-greece.herokuapp.com/deaths";
url_vaccinations = "https://covid-19-greece.herokuapp.com/total-vaccinations";
url_risklevels = "https://covid-19-greece.herokuapp.com/risk-levels";
url_entatiki = "https://covid-19-greece.herokuapp.com/intensive-care";
url_tests = "https://covid-19-greece.herokuapp.com/total-tests";
url_male = "https://covid-19-greece.herokuapp.com/male-cases-history";
url_female = "https://covid-19-greece.herokuapp.com/female-cases-history";

const cases = async () => {
  try {
    const result = await axios.get(url_cases);
    let the_cases = result.data.cases;
    let length_of_cases = the_cases.length;
    let today = length_of_cases - 1;
    let todays_cases = the_cases[today];
    let confirmed = todays_cases["confirmed"];
    let last_update = todays_cases["date"];
    const d = new Date(last_update);
    const ye = new Intl.DateTimeFormat("el", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("el", { month: "short" }).format(d);
    const da = new Intl.DateTimeFormat("el", { day: "2-digit" }).format(d);
    last_update = `${da}-${mo}-${ye}`;
    let the_result = {};
    the_result.last_update = last_update;
    the_result.confirmed = confirmed;
    return JSON.stringify(the_result);
  } catch (err) {
    console.log(err);
  }
};

const deaths_call = async () => {
  try {
    const result = await axios.get(url_deaths);
    let the_cases = result.data.cases;
    let length_of_cases = the_cases.length;
    let today = length_of_cases - 1;
    let todays_cases = the_cases[today];
    let deaths = todays_cases["deaths"];
    let last_update = todays_cases["date"];
    const d = new Date(last_update);
    const ye = new Intl.DateTimeFormat("el", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("el", { month: "short" }).format(d);
    const da = new Intl.DateTimeFormat("el", { day: "2-digit" }).format(d);
    last_update = `${da}-${mo}-${ye}`;
    let the_result = {};
    the_result.last_update = last_update;
    the_result.deaths = deaths;
    return JSON.stringify(the_result);
  } catch (err) {
    console.log(err);
  }
};

client.on("message", async (msg) => {
  switch (msg.content) {
    case "!covidhelp":
      msg.reply("You are plebas!");
      break;
    case "!validate":
      msg.channel.send("Δώσε την ημερομηνία που εμβολιάστηκες");
      const collector = new Discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id || m.author.id === guest.id, {
        time: 1000,
        max: 1,
        maxMatches: 100
        
      });

      collector.on('collect', m => {

        var today = new Date();
        var myDate = m.content;
        myDate = myDate.split("-");
        var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
        var newDate = newDate.getTime(); // Give that from user
        fourteen_days = today.setDate(today.getDate() - 14);

        if (newDate <= fourteen_days && m.author.id === m.author.id) {
          m.channel.send("Έχεις έγκυρο πιστοποιητικό");
          m.react("✅");
          collector.stop();
        } else if (newDate > fourteen_days) {
          m.channel.send("Δεν έχεις έγκυρο πιστοποιητικό");
          m.react("❌");
          collector.stop();
        }
      });
      break;
    case "!emvolio":
      msg.reply(
        "Δες περισσότερες πληροφορίες για το εμβόλιο στο https://emvolio.gov.gr/"
      );
      break;
    case "!certficate":
      msg.reply(
        "Βγάλε το Ευρωπαϊκό ψηφιακό COVID-19 πιστοποιητικό στο https://www.gov.gr/ipiresies/ugeia-kai-pronoia/koronoios-covid-19/greencertificate"
      );
      break;
    case "!about":
      msg.reply("Created with 😊 by gioiliop7 ");
      break;
    case "!cases":
      const todays_cases = await cases();
      const resultjson = await JSON.parse(todays_cases);
      let update_in = resultjson.last_update;
      let cases_num = resultjson.confirmed;
      const embed = new Discord.MessageEmbed()
        .setColor("#faed93")
        .setTitle("Συνολικά κρούσματα: " + cases_num)
        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )
        .setFooter("Τελευταία ενημέρωση δεδομένων - " + update_in);
      msg.channel.send({ embeds: [embed] });
      break;
    case "!deaths":
      const todays_deaths = await deaths_call();
      const deathsresultjson = await JSON.parse(todays_deaths);
      let deaths_update_in = deathsresultjson.last_update;
      let deaths_num = deathsresultjson.deaths;
      const deaths_embed = new Discord.MessageEmbed()
        .setColor("#ce3423")
        .setTitle("Συνολικοί θανάτοι: " + deaths_num)
        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )
        .setFooter("Τελευταία ενημέρωση δεδομένων - " + deaths_update_in);
      msg.channel.send({ embeds: [deaths_embed] });
      break;
  }
});

// client.on("messageCreate", async (message) => {
//   if (message.content == "!validation") {
//     const botMessage = await message.channel.send(
//       "Δώσε την ημερομηνία που εμβολιάστηκες"
//     );
//     MessageCollector.question({
//       botMessage,
//       user: message.author.id,
//       onMessage: async (botMessage, message) => {
//         the_message = message.content;
//         var today = new Date();
//         var myDate = message.content;
//         myDate = myDate.split("-");
//         var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
//         var newDate = newDate.getTime(); // Give that from user
//         fourteen_days = today.setDate(today.getDate() - 14);
//         if (newDate <= fourteen_days) {
//           await message.channel.send("Έχεις έγκυρο πιστοποιητικό, ξαναπληκτρολόγησε ημερομηνία").react("✅");
//           client.destroy();
//         } else {
//           await message.channel.send("Δεν έχεις έγκυρο πιστοποιητικό, ξαναπληκτρολόγησε ημερομηνία").react("❌");
//           client.destroy();
//         }
//       },
//     });
//   }
// });
//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
