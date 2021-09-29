require("dotenv").config(); //initialize dotenv
const axios = require("axios"); //add this line at the top
const Discord = require("discord.js"); //import discord.js

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
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
      msg.reply("You are plebas!");
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

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
