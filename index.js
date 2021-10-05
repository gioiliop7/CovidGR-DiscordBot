require("dotenv").config(); //initialize dotenv
const axios = require("axios"); //add this line at the top
const Discord = require("discord.js"); //import discord.js
const { parse } = require("path/posix");
const { CLIENT_RENEG_WINDOW } = require("tls");
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILDS],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("!covidhelp", { type: "LISTENING" });
});

function date_format(date) {
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat("el", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("el", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("el", { day: "2-digit" }).format(d);
  date = `${da}-${mo}-${ye}`;
  return date;
}

url_cases = "https://covid-19-greece.herokuapp.com/all"; // Done
url_deaths = "https://covid-19-greece.herokuapp.com/deaths"; // Done
url_vaccinations = "https://covid-19-greece.herokuapp.com/total-vaccinations"; // Done
url_risklevels = "https://covid-19-greece.herokuapp.com/risk-levels"; // Done
url_entatiki = "https://covid-19-greece.herokuapp.com/intensive-care"; // Done
url_tests = "https://covid-19-greece.herokuapp.com/total-tests"; // Done
url_male = "https://covid-19-greece.herokuapp.com/male-cases-history";
url_female = "https://covid-19-greece.herokuapp.com/female-cases-history";
url_age = "https://covid-19-greece.herokuapp.com/age-distribution"; // Done

const cases = async () => {
  try {
    const result = await axios.get(url_cases);
    let the_cases = result.data.cases;
    let length_of_cases = the_cases.length;
    let today = length_of_cases - 1;
    let todays_cases = the_cases[today];
    let confirmed = todays_cases["confirmed"];
    let last_update = todays_cases["date"];
    last_update = date_format(last_update);
    let the_result = {};
    the_result.last_update = last_update;
    the_result.confirmed = confirmed;
    return JSON.stringify(the_result);
  } catch (err) {
    console.log(err);
  }
};

const vaccs_call = async () => {
  try {
    const result = await axios.get(url_vaccinations);
    let the_vaccinations = result.data;
    let total = the_vaccinations["total-vaccinations"];
    let total_vaccinations = total.totalvaccinations;
    let last_update = total.updated;
    last_update = date_format(last_update);
    let the_result = {};
    the_result.last_update = last_update;
    the_result.vaccinations = total_vaccinations;
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
    last_update = date_format(last_update);
    let the_result = {};
    the_result.last_update = last_update;
    the_result.deaths = deaths;
    return JSON.stringify(the_result);
  } catch (err) {
    console.log(err);
  }
};

const ic_call = async () => {
  try {
    const result = await axios.get(url_entatiki);
    let the_cases = result.data.cases;
    let length_of_cases = the_cases.length;
    let today = length_of_cases - 1;
    let todays_cases = the_cases[today];
    let ic = todays_cases["intensive_care"];
    let last_update = todays_cases["date"];
    last_update = date_format(last_update);
    let the_result = {};
    the_result.last_update = last_update;
    the_result.ic = ic;
    return JSON.stringify(the_result);
  } catch (err) {
    console.log(err);
  }
};

const tests_call = async () => {
  try {
    const result = await axios.get(url_tests);
    let the_cases = result.data.total_tests;
    let length_of_cases = the_cases.length;
    let today = length_of_cases - 1;
    let todays_cases = the_cases[today];
    let last_update = todays_cases["date"];
    let rapids = todays_cases["rapid-tests"];
    let the_tests = todays_cases["tests"];
    let total_tests = rapids + the_tests;
    last_update = date_format(last_update);
    let the_result = {};
    the_result.last_update = last_update;
    the_result.rapids = rapids;
    the_result.the_tests = the_tests;
    the_result.total_tests = total_tests;
    return JSON.stringify(the_result);
  } catch (err) {
    console.log(err);
  }
};

const age_call = async () => {
  try {
    const result = await axios.get(url_age);
    let the_cases = result.data.age_distribution;
    let last_update = the_cases.updated;
    last_update = date_format(last_update);
    let average = the_cases.age_average;
    let average_death = the_cases.average_death_age;
    let total_age_groups = the_cases.total_age_groups;
    let the_result = {};
    the_result.last_update = last_update;
    the_result.average = average;
    the_result.average_death = average_death;
    the_result.total_age_groups = total_age_groups;
    return JSON.stringify(the_result);
  } catch (err) {
    console.log(err);
  }
};

const levels = async () => {
  try {
    const result = await axios.get(url_risklevels);
    let the_cases = result.data.risk_levels;
    let last_update = the_cases.last_updated;
    last_update = date_format(last_update);
    let regions = the_cases.region;
    let attica = regions.Attica;
    let centralgreece = regions.Central_Greece;
    let centralmac = regions.Central_Macedonia;
    let crete = regions.Crete;
    let eastern = regions.Eastern_Macedonia_and_Thrace;
    let epirus = regions.Epirus;
    let aegean = regions.North_Aegean;
    let peloponissos = regions.Peloponnese;
    let s_aegean = regions.South_Aegean;
    let thessaly = regions.Thessaly;
    let western_greece = regions.Western_Greece;
    let western_macedonia = regions.Western_Macedonia;
    let the_result = {};
    the_result.last_update = last_update;
    the_result.attica = attica;
    the_result.centralgreece = centralgreece;
    the_result.centralmac = centralmac;
    the_result.crete = crete;
    the_result.eastern = eastern;
    the_result.epirus = epirus;
    the_result.aegean = aegean;
    the_result.peloponissos = peloponissos;
    the_result.s_aegean = s_aegean;
    the_result.thessaly = thessaly;
    the_result.western_greece = western_greece;
    the_result.western_macedonia = western_macedonia;
    return JSON.stringify(the_result);
  } catch (err) {
    console.log(err);
  }
};

function risk_level_switch(risk_level) {
  switch (risk_level) {
    case "A":
      risk_level = "Επίπεδο 1";
      break;
    case "B":
      risk_level = "Επίπεδο 2";
      break;
    case "C":
      risk_level = "Επίπεδο 3";
      break;
    case "D":
      risk_level = "Επίπεδο 4";
      break;
  }
  return risk_level;
}

client.on("message", async (msg) => {
  switch (msg.content) {
    case "!covidhelp":
      const help_embed = new Discord.MessageEmbed()
        .setColor("#2f3136")
        .setTitle("CovidGR-Bot Commands")
        .addFields(
          { name: "Bot Commands", value: "!covidhelp" },
          {
            name: "Έλεγχος εγκυρότητας πιστοποιητικού εμβολιασμού",
            value: "!validate",
          },
          { name: "Ραντεβού εμβολιασμού", value: "!emvolio" },
          { name: "Περισσότερα για μένα", value: "!about" },
          { name: "Κρούσματα", value: "!cases" },
          { name: "Θανάτοι", value: "!deaths" },
          { name: "Διασωληνομένοι", value: "!ic" },
          { name: "Εμβολιασμοί", value: "!vaccs" },
          { name: "Tests", value: "!tests" },
          { name: "Ηλικιακά δεδομένα", value: "!age" },
          {
            name: "Δείκτης θετικότητας ελέγχων ανά περιφέρεια",
            value: "!risklevels",
          }
        )
        .setFooter("Για οποιαδήποτε απορια στείλε στον gioiliop7#9306");
      msg.channel.send({ embeds: [help_embed] });
      break;
    case "!validate":
      msg.channel.send(
        "Δώσε την ημερομηνία που ολοκλήρωσες τον εμβολιασμό σου στη μορφή 'ΗΗ-ΜΜ-ΕΕΕΕ' ή στη μορφή 'ΗΗ/ΜΜ/ΕΕΕΕ'"
      );
      const collector = new Discord.MessageCollector(
        msg.channel,
        (m) => m.author.id === msg.author.id || m.author.id === guest.id,
        {
          time: 1000,
          max: 1,
          maxMatches: 100,
        }
      );

      collector.on("collect", (m) => {
        var today = new Date();
        var myDate = m.content;
        if (myDate.includes(".")) {
          m.channel.send(
            "Δεν έδωσες έγκυρη μορφή ημερομηνίας,παρακαλώ ξαναπροσπάθησε με το command !validate"
          );
          collector.stop();
          return;
        }
        if (myDate.includes("/")) {
          myDate = myDate.split("/");
        } else {
          myDate = myDate.split("-");
        }
        day_given = myDate[0];
        month_given = myDate[1];
        year_given = myDate[2];
        day_parsed = parseInt(day_given);
        month_parsed = parseInt(month_given);
        year_parsed = parseInt(year_given);
        if (
          (day_given > 31 && m.author.id === m.author.id) ||
          (month_given > 12 && m.author.id === m.author.id)
        ) {
          m.channel.send(
            "Δεν έδωσες έγκυρη ημερομηνία,παρακαλώ ξαναπροσπάθησε με το command !validate"
          );
          collector.stop();
          return;
        }
        if (
          year_given <= 2020 &&
          month_given < 12 &&
          m.author.id === m.author.id
        ) {
          m.channel.send(
            "Δεν είχαν ξεκινήσει οι εμβολιασμοί την δωθέσα ημερομηνία,παρακαλώ ξαναπροσπάθησε με το command !validate"
          );
          collector.stop();
          return;
        }
        var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0]);
        var newDate = newDate.getTime(); // Give that from user
        var today_date = new Date();
        var dd = String(today_date.getDate()).padStart(2, "0");
        var mm = String(today_date.getMonth() + 1).padStart(2, "0");
        var yyyy = today_date.getFullYear();
        today_date = dd + "-" + mm + "-" + yyyy;
        today_date = today_date.split("-");
        today_date = new Date(today_date[2], today_date[1] - 1, today_date[0]);
        today_date = today_date.getTime();

        if (today_date < newDate) {
          m.channel.send(
            "Έδωσες μεταγενέστερη ημερομηνία,παρακαλώ ξαναπροσπάθησε με το command !validate"
          );
          collector.stop();
          return;
        }

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
      msg.reply(
        "Created with 😊 by gioiliop7. Βρές το source code του bot στο https://github.com/gioiliop7/CovidGR-DiscordBot"
      );
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
    case "!ic":
      const todays_ic = await ic_call();
      const icresultjson = await JSON.parse(todays_ic);
      console.log(icresultjson);
      let ic_update_in = icresultjson.last_update;
      let ic_num = icresultjson.ic;
      const ic_embed = new Discord.MessageEmbed()
        .setColor("#ffc522")
        .setTitle("Διασωληνομένοι: " + ic_num)
        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )
        .setFooter("Τελευταία ενημέρωση δεδομένων - " + ic_update_in);
      msg.channel.send({ embeds: [ic_embed] });
      break;
    case "!vaccs":
      const todays_vaccs = await vaccs_call();
      const vaccsresultjson = await JSON.parse(todays_vaccs);
      console.log(vaccsresultjson);
      let vaccs_update_in = vaccsresultjson.last_update;
      let vaccs_num = vaccsresultjson.vaccinations;
      const vaccs_embed = new Discord.MessageEmbed()
        .setColor("#84c77a")
        .setTitle("Συνολικοί εμβολιασμοί: " + vaccs_num)
        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )
        .setFooter("Τελευταία ενημέρωση δεδομένων - " + vaccs_update_in);
      msg.channel.send({ embeds: [vaccs_embed] });
      break;
    case "!tests":
      const todays_tests = await tests_call();
      const testsresultjson = await JSON.parse(todays_tests);
      let tests_update_in = testsresultjson.last_update;
      let rapids_num = testsresultjson.rapids;
      let moriaka = testsresultjson.the_tests;
      let total_tests = testsresultjson.total_tests;
      const tests_embed = new Discord.MessageEmbed()
        .setColor("#00aeef")
        .setTitle("Συνολικά tests: " + total_tests)
        .addFields(
          { name: "Μοριακά:", value: "" + moriaka, inline: true },
          { name: "Rapid:", value: "" + rapids_num, inline: true }
        )
        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )
        .setFooter("Τελευταία ενημέρωση δεδομένων - " + tests_update_in);
      msg.channel.send({ embeds: [tests_embed] });
      break;
    case "!age":
      const todays_age_ds = await age_call();
      const ageresultjson = await JSON.parse(todays_age_ds);
      let age_update_in = ageresultjson.last_update;
      let age_average = ageresultjson.average;
      let age_average_death = ageresultjson.average_death;
      let age_groups = ageresultjson.total_age_groups;
      let age_groups_cases = age_groups.cases;
      let age_groups_critical = age_groups.critical;
      let age_groups_deaths = age_groups.deaths;
      let cases0 = age_groups_cases["0-17"];
      let critical0 = age_groups_critical["0-17"];
      let deaths0 = age_groups_deaths["0-17"];
      let cases18 = age_groups_cases["18-39"];
      let critical18 = age_groups_critical["18-39"];
      let deaths18 = age_groups_deaths["18-39"];
      let cases40 = age_groups_cases["40-64"];
      let critical40 = age_groups_critical["40-64"];
      let deaths40 = age_groups_deaths["40-64"];
      let cases65 = age_groups_cases["65+"];
      let critical65 = age_groups_critical["65+"];
      let deaths65 = age_groups_deaths["65+"];
      const total_age_embed = new Discord.MessageEmbed()
        .setColor("#cacaca")
        .setTitle("Ηλικιακά δεδομένα")
        .addFields(
          { name: "Mέσος όρος ηλικίας", value: "" + age_average, inline: true },
          {
            name: "Μέσος όρος ηλικίας θανάτου",
            value: "" + age_average_death,
            inline: true,
          }
        )
        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )
        .setFooter("Τελευταία ενημέρωση δεδομένων - " + age_update_in);

      const zero_embed = new Discord.MessageEmbed()
        .setColor("#06306a")
        .setTitle("Ηλικιακά δεδομένα 0-17")
        .addFields(
          { name: "Κρούσματα", value: "" + cases0, inline: true },
          {
            name: "Σε κρίσιμη κατάσταση",
            value: "" + critical0,
            inline: true,
          },
          {
            name: "Θάνατοι",
            value: "" + deaths0,
            inline: true,
          }
        )
        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )
        .setFooter("Τελευταία ενημέρωση δεδομένων - " + age_update_in);

      const eighteen_embed = new Discord.MessageEmbed()
        .setColor("#9c2424")
        .setTitle("Ηλικιακά δεδομένα 18-39")
        .addFields(
          { name: "Κρούσματα", value: "" + cases18, inline: true },
          {
            name: "Σε κρίσιμη κατάσταση",
            value: "" + critical18,
            inline: true,
          },
          {
            name: "Θάνατοι",
            value: "" + deaths18,
            inline: true,
          }
        )
        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )
        .setFooter("Τελευταία ενημέρωση δεδομένων - " + age_update_in);

      const fourty_embed = new Discord.MessageEmbed()
        .setColor("#edd5ca")
        .setTitle("Ηλικιακά δεδομένα 40-64")
        .addFields(
          { name: "Κρούσματα", value: "" + cases40, inline: true },
          {
            name: "Σε κρίσιμη κατάσταση",
            value: "" + critical40,
            inline: true,
          },
          {
            name: "Θάνατοι",
            value: "" + deaths40,
            inline: true,
          }
        )
        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )
        .setFooter("Τελευταία ενημέρωση δεδομένων - " + age_update_in);

      const sixtyfive_embed = new Discord.MessageEmbed()
        .setColor("#8e8e8f")
        .setTitle("Ηλικιακά δεδομένα 65+")
        .addFields(
          { name: "Κρούσματα", value: "" + cases65, inline: true },
          {
            name: "Σε κρίσιμη κατάσταση",
            value: "" + critical65,
            inline: true,
          },
          {
            name: "Θάνατοι",
            value: "" + deaths65,
            inline: true,
          }
        )
        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )
        .setFooter("Τελευταία ενημέρωση δεδομένων - " + age_update_in);

      msg.channel.send({
        embeds: [
          total_age_embed,
          zero_embed,
          eighteen_embed,
          fourty_embed,
          sixtyfive_embed,
        ],
      });
      break;
    case "!risklevels":
      const todays_risks = await levels();
      const risksresultjson = await JSON.parse(todays_risks);
      let risks_update_in = risksresultjson.last_update;
      let attica_data = risksresultjson.attica;
      let centralgreece_data = risksresultjson.centralgreece;
      let centralmac_data = risksresultjson.centralmac;
      let crete_data = risksresultjson.crete;
      let eastern_data = risksresultjson.eastern;
      let epirus_data = risksresultjson.epirus;
      let aegean_data = risksresultjson.aegean;
      let pelo_data = risksresultjson.peloponissos;
      let s_aegean_data = risksresultjson.s_aegean;
      let thessaly_data = risksresultjson.thessaly;
      let western_greece_data = risksresultjson.western_greece;
      let western_macedonia_data = risksresultjson.western_macedonia;

      let centralmac_items = [];
      centralmac_data.forEach((element) => {
        let ru_cm = element["regional_unit"];
        let risk_level_cm = element["risk_level"];
        switch (ru_cm) {
          case "Chalkidiki":
            ru_cm = "Χαλκιδική";
            break;
          case "Imathia":
            ru_cm = "Ιμαθία";
            break;
          case "Kilkis":
            ru_cm = "Κιλκίς";
            break;
          case "Pella":
            ru_cm = "Πέλλα";
            break;
          case "Pieria":
            ru_cm = "Πιερία";
            break;
          case "Serres":
            ru_cm = "Σέρρες";
            break;
          case "Thessaloniki":
            ru_cm = "Θεσσαλονίκη";
            break;
        }
        risk_level_cm = risk_level_switch(risk_level_cm);
        centralmac_items.push({ ru_cm, risk_level_cm });
      });

      let centralgreece_items = [];
      centralgreece_data.forEach((element) => {
        let ru_cg = element["regional_unit"];
        let risk_level_cg = element["risk_level"];
        switch (ru_cg) {
          case "Boeotia":
            ru_cg = "Βοιωτία";
            break;
          case "Euboea":
            ru_cg = "Εύβοια";
            break;
          case "Evrytania":
            ru_cg = "Ευρτανία";
            break;
          case "Phocis":
            ru_cg = "Φωκίδα";
            break;
          case "Phthiotis":
            ru_cg = "Φθιώτιδα";
            break;
        }
        risk_level_cg = risk_level_switch(risk_level_cg);
        centralgreece_items.push({ ru_cg, risk_level_cg });
      });

      let attica_items = [];
      attica_data.forEach((element) => {
        let ru_attica = element["regional_unit"];
        let risk_level_attica = element["risk_level"];
        switch (ru_attica) {
          case "Central_Athens":
            ru_attica = "Κεντρική Αθήνα";
            break;
          case "East_Attica":
            ru_attica = "Ανατολική αττική";
            break;
          case "Islands":
            ru_attica = "Νησιά Αττικής";
            break;
          case "North_Athens":
            ru_attica = "Βόρεια Αθήνα";
            break;
          case "Piraeus":
            ru_attica = "Πειραιάς";
            break;
          case "South_Athens":
            ru_attica = "Νότια Αθήνα";
            break;
          case "West_Athens":
            ru_attica = "Δυτική Αθήνα";
            break;
          case "West_Attica":
            ru_attica = "Δυτική Αττική";
            break;
        }
        risk_level_attica = risk_level_switch(risk_level_attica);
        attica_items.push({ ru_attica, risk_level_attica });
      });

      let crete_items = [];
      crete_data.forEach((element) => {
        let ru_crete = element["regional_unit"];
        let risk_level_crete = element["risk_level"];
        switch (ru_crete) {
          case "Chania":
            ru_crete = "Χανιά";
            break;
          case "Rethymno":
            ru_crete = "Ρέθυμνο";
            break;
          case "Heraklion":
            ru_crete = "Ηράκλειο";
            break;
          case "Lasithi":
            ru_crete = "Λασίθι";
            break;
        }
        risk_level_crete = risk_level_switch(risk_level_crete);
        crete_items.push({ ru_crete, risk_level_crete });
      });

      let eastern_items = [];
      eastern_data.forEach((element) => {
        let ru_eastern = element["regional_unit"];
        let risk_level_eastern = element["risk_level"];
        switch (ru_eastern) {
          case "Drama":
            ru_eastern = "Δράμα";
            break;
          case "Evros":
            ru_eastern = "Έβρος";
            break;
          case "Kavala":
            ru_eastern = "Καβάλα";
            break;
          case "Rhodope":
            ru_eastern = "Ροδόπη";
            break;
          case "Thasos":
            ru_eastern = "Θάσος";
            break;
          case "Xanthi":
            ru_eastern = "Ξάνθη";
            break;
        }
        risk_level_eastern = risk_level_switch(risk_level_eastern);
        eastern_items.push({ ru_eastern, risk_level_eastern });
      });

      let epirus_items = [];
      epirus_data.forEach((element) => {
        let ru_epirus = element["regional_unit"];
        let risk_level_epirus = element["risk_level"];
        switch (ru_epirus) {
          case "Arta":
            ru_epirus = "Άρτα";
            break;
          case "Ioannina":
            ru_epirus = "Ιωάννινα";
            break;
          case "Preveza":
            ru_epirus = "Πρέβεζα";
            break;
          case "Thesprotia":
            ru_epirus = "Θεσπρωτία";
            break;
        }
        risk_level_epirus = risk_level_switch(risk_level_epirus);
        epirus_items.push({ ru_epirus, risk_level_epirus });
      });

      let aegean_items = [];
      aegean_data.forEach((element) => {
        let ru_aegean = element["regional_unit"];
        let risk_level_aegean = element["risk_level"];
        switch (ru_aegean) {
          case "Chios":
            ru_aegean = "Χίος";
            break;
          case "Ikaria":
            ru_aegean = "Ικαρία";
            break;
          case "Lemnos":
            ru_aegean = "Λήμνος";
            break;
          case "Lesbos":
            ru_aegean = "Λέσβος";
            break;
          case "Samos":
            ru_aegean = "Σάμος";
            break;
        }
        risk_level_aegean = risk_level_switch(risk_level_aegean);
        aegean_items.push({ ru_aegean, risk_level_aegean });
      });

      let pelo_items = [];
      pelo_data.forEach((element) => {
        let ru_pelo = element["regional_unit"];
        let risk_level_pelo = element["risk_level"];
        switch (ru_pelo) {
          case "Arcadia":
            ru_pelo = "Αρκαδία";
            break;
          case "Argolis":
            ru_pelo = "Αργολίδα";
            break;
          case "Corinthia":
            ru_pelo = "Κορινθία";
            break;
          case "Laconia":
            ru_pelo = "Λακωνία";
            break;
          case "Messenia":
            ru_pelo = "Μεσσηνία";
            break;
        }
        risk_level_pelo = risk_level_switch(risk_level_pelo);
        pelo_items.push({ ru_pelo, risk_level_pelo });
      });

      let s_aegean_items = [];
      s_aegean_data.forEach((element) => {
        let ru_s_aegean = element["regional_unit"];
        let risk_level_s_aegean = element["risk_level"];
        switch (ru_s_aegean) {
          case "Andros":
            ru_s_aegean = "Άνδρος";
            break;
          case "Kalymnos":
            ru_s_aegean = "Κάλυμνος";
            break;
          case "Karpathos":
            ru_s_aegean = "Κάρπαθος";
            break;
          case "Kea-Kythnos":
            ru_s_aegean = "Κέα - Κύθνος";
            break;
          case "Kos":
            ru_s_aegean = "Κως";
            break;
          case "Milos":
            ru_s_aegean = "Μήλος";
            break;
          case "Mykonos":
            ru_s_aegean = "Μύκονος";
            break;
          case "Naxos":
            ru_s_aegean = "Νάξος";
            break;
          case "Paros":
            ru_s_aegean = "Πάρος";
            break;
          case "Rhodes":
            ru_s_aegean = "Ρόδος";
            break;
          case "Syros":
            ru_s_aegean = "Σύρος";
            break;
          case "Thira":
            ru_s_aegean = "Θήρα";
            break;
          case "Tinos":
            ru_s_aegean = "Τήνος";
            break;
        }
        risk_level_s_aegean = risk_level_switch(risk_level_s_aegean);
        s_aegean_items.push({ ru_s_aegean, risk_level_s_aegean });
      });

      let thessaly_items = [];
      thessaly_data.forEach((element) => {
        let ru_thessaly = element["regional_unit"];
        let risk_level_thessaly = element["risk_level"];
        switch (ru_thessaly) {
          case "Karditsa":
            ru_thessaly = "Καρδίτσα";
            break;
          case "Larissa":
            ru_thessaly = "Λάρισα";
            break;
          case "Magnesia":
            ru_thessaly = "Μαγνησία";
            break;
          case "Sporades":
            ru_thessaly = "Σποράδες";
            break;
          case "Trikala":
            ru_thessaly = "Τρίκαλα";
            break;
        }
        risk_level_thessaly = risk_level_switch(risk_level_thessaly);
        thessaly_items.push({ ru_thessaly, risk_level_thessaly });
      });

      let western_greece_items = [];
      western_greece_data.forEach((element) => {
        let ru_western_greece = element["regional_unit"];
        let risk_level_western_greece = element["risk_level"];
        switch (ru_western_greece) {
          case "Aetolia-Acarnania":
            ru_western_greece = "Αιτωλοακαρνανία";
            break;
          case "Achaea":
            ru_western_greece = "Αχαΐα";
            break;
          case "Elis":
            ru_western_greece = "Ηλεία";
            break;
        }
        risk_level_western_greece = risk_level_switch(
          risk_level_western_greece
        );
        western_greece_items.push({
          ru_western_greece,
          risk_level_western_greece,
        });
      });

      let western_macedonia_items = [];
      western_macedonia_data.forEach((element) => {
        let ru_western_macedonia = element["regional_unit"];
        let risk_level_western_macedonia = element["risk_level"];
        switch (ru_western_macedonia) {
          case "Florina":
            ru_western_macedonia = "Φλώρινα";
            break;
          case "Grevena":
            ru_western_macedonia = "Γρεβενά";
            break;
          case "Kastoria":
            ru_western_macedonia = "Καστοριά";
            break;
          case "Kozani":
            ru_western_macedonia = "Κοζάνη";
            break;
        }
        risk_level_western_macedonia = risk_level_switch(
          risk_level_western_macedonia
        );
        western_macedonia_items.push({
          ru_western_macedonia,
          risk_level_western_macedonia,
        });
      });

      const risks_embed_attica = new Discord.MessageEmbed()
        .setColor("#de5a4a")
        .setTitle("Δείκτης θετικότητας ελέγχων - Αττική")

        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )

        .setFooter("Τελευταία ενημέρωση δεδομένων - " + risks_update_in);

      attica_items.forEach((e) => {
        ru_attica = e.ru_attica;
        risk_level_attica = e.risk_level_attica;
        risks_embed_attica.addField(
          "" + ru_attica,
          "" + risk_level_attica,
          true
        );
      });

      const risks_embed_cm = new Discord.MessageEmbed()
        .setColor("#de5a4a")
        .setTitle("Δείκτης θετικότητας ελέγχων - Κεντρική Μακεδόνία")

        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )

        .setFooter("Τελευταία ενημέρωση δεδομένων - " + risks_update_in);

      centralmac_items.forEach((e) => {
        ru_cm = e.ru_cm;
        risk_level_cm = e.risk_level_cm;
        risks_embed_cm.addField("" + ru_cm, "" + risk_level_cm, true);
      });

      const risks_embed_cg = new Discord.MessageEmbed()
        .setColor("#de5a4a")
        .setTitle("Δείκτης θετικότητας ελέγχων - Κεντρική Ελλάδα")

        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )

        .setFooter("Τελευταία ενημέρωση δεδομένων - " + risks_update_in);

      centralgreece_items.forEach((e) => {
        ru_cg = e.ru_cg;
        risk_level_cg = e.risk_level_cg;
        risks_embed_cg.addField("" + ru_cg, "" + risk_level_cg, true);
      });

      const risks_embed_crete = new Discord.MessageEmbed()
        .setColor("#de5a4a")
        .setTitle("Δείκτης θετικότητας ελέγχων - Κρήτη")

        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )

        .setFooter("Τελευταία ενημέρωση δεδομένων - " + risks_update_in);

      crete_items.forEach((e) => {
        ru_crete = e.ru_crete;
        risk_level_crete = e.risk_level_crete;
        risks_embed_crete.addField("" + ru_crete, "" + risk_level_crete, true);
      });

      const risks_embed_eastern = new Discord.MessageEmbed()
        .setColor("#de5a4a")
        .setTitle("Δείκτης θετικότητας ελέγχων - Ανατολική Μακεδονία και Θράκη")

        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )

        .setFooter("Τελευταία ενημέρωση δεδομένων - " + risks_update_in);

      eastern_items.forEach((e) => {
        ru_eastern = e.ru_eastern;
        risk_level_eastern = e.risk_level_eastern;
        risks_embed_eastern.addField(
          "" + ru_eastern,
          "" + risk_level_eastern,
          true
        );
      });

      const risks_embed_epirus = new Discord.MessageEmbed()
        .setColor("#de5a4a")
        .setTitle("Δείκτης θετικότητας ελέγχων - Ήπειρος")

        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )

        .setFooter("Τελευταία ενημέρωση δεδομένων - " + risks_update_in);

      epirus_items.forEach((e) => {
        ru_epirus = e.ru_epirus;
        risk_level_epirus = e.risk_level_epirus;
        risks_embed_epirus.addField(
          "" + ru_epirus,
          "" + risk_level_epirus,
          true
        );
      });

      const risks_embed_aegean = new Discord.MessageEmbed()
        .setColor("#de5a4a")
        .setTitle("Δείκτης θετικότητας ελέγχων - Ανατολικό Αιγαίο")

        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )

        .setFooter("Τελευταία ενημέρωση δεδομένων - " + risks_update_in);

      aegean_items.forEach((e) => {
        ru_aegean = e.ru_aegean;
        risk_level_aegean = e.risk_level_aegean;
        risks_embed_aegean.addField(
          "" + ru_aegean,
          "" + risk_level_aegean,
          true
        );
      });

      const risks_embed_pelo = new Discord.MessageEmbed()
        .setColor("#de5a4a")
        .setTitle("Δείκτης θετικότητας ελέγχων - Πελοπόννησος")

        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )

        .setFooter("Τελευταία ενημέρωση δεδομένων - " + risks_update_in);

      pelo_items.forEach((e) => {
        ru_pelo = e.ru_pelo;
        risk_level_pelo = e.risk_level_pelo;
        risks_embed_pelo.addField("" + ru_pelo, "" + risk_level_pelo, true);
      });

      const risks_embed_s_aegean = new Discord.MessageEmbed()
        .setColor("#de5a4a")
        .setTitle("Δείκτης θετικότητας ελέγχων - Νότιο Αιγαίο")

        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )

        .setFooter("Τελευταία ενημέρωση δεδομένων - " + risks_update_in);

      s_aegean_items.forEach((e) => {
        ru_s_aegean = e.ru_s_aegean;
        risk_level_s_aegean = e.risk_level_s_aegean;
        risks_embed_s_aegean.addField(
          "" + ru_s_aegean,
          "" + risk_level_s_aegean,
          true
        );
      });

      const risks_embed_thessaly = new Discord.MessageEmbed()
        .setColor("#de5a4a")
        .setTitle("Δείκτης θετικότητας ελέγχων - Θεσσαλία")

        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )

        .setFooter("Τελευταία ενημέρωση δεδομένων - " + risks_update_in);

      thessaly_items.forEach((e) => {
        ru_thessaly = e.ru_thessaly;
        risk_level_thessaly = e.risk_level_thessaly;
        risks_embed_thessaly.addField(
          "" + ru_thessaly,
          "" + risk_level_thessaly,
          true
        );
      });

      const risks_embed_western_greece = new Discord.MessageEmbed()
        .setColor("#de5a4a")
        .setTitle("Δείκτης θετικότητας ελέγχων - Δυτική Ελλάδα")

        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )

        .setFooter("Τελευταία ενημέρωση δεδομένων - " + risks_update_in);

      western_greece_items.forEach((e) => {
        ru_western_greece = e.ru_western_greece;
        risk_level_western_greece = e.risk_level_western_greece;
        risks_embed_western_greece.addField(
          "" + ru_western_greece,
          "" + risk_level_western_greece,
          true
        );
      });

      const risks_embed_western_macedonia = new Discord.MessageEmbed()
        .setColor("#de5a4a")
        .setTitle("Δείκτης θετικότητας ελέγχων - Δυτική Μακεδονία")

        .setAuthor(
          "Επίσημα δεδομένα κυβέρνησης covid",
          "https://upload.wikimedia.org/wikipedia/commons/8/82/SARS-CoV-2_without_background.png",
          "https://covid19.gov.gr/"
        )

        .setFooter("Τελευταία ενημέρωση δεδομένων - " + risks_update_in);

      western_macedonia_items.forEach((e) => {
        ru_western_macedonia = e.ru_western_macedonia;
        risk_level_western_macedonia = e.risk_level_western_macedonia;
        risks_embed_western_macedonia.addField(
          "" + ru_western_macedonia,
          "" + risk_level_western_macedonia,
          true
        );
      });

      msg.channel.send(
        "Επίπεδο 3 – Πορτοκαλί: Σε αυτό το επίπεδο ετοιμότητας προβλέπονται τα πιο κάτω μέτρα:Επικοινωνία και αναλυτική ενημέρωση των τοπικών αρχών για τα ιδιαίτερα επιδημιολογικά χαρακτηριστικά της περιοχής, Ενεργοποίηση ειδικού κλιμακίου ΕΟΔΥ/Πολιτικής Προστασίας προκειμένου να:• αυξηθούν oι δειγματοληπτικοί έλεγχοι για SARS-CoV-2 • πραγματοποιηθεί εντατική και επιτόπια ιχνηλάτιση • πραγματοποιηθεί κατά προτεραιότητα αυξημένος αριθμός εμβολιασμών"
      );

      msg.channel.send(
        "Επίπεδο 4 – Κόκκινο Σε αυτό το επίπεδο ετοιμότητας προβλέπονται τα πιο κάτω μέτρα:Απαγόρευση κυκλοφορίας από 01:00 το βράδυ έως 06:00 το πρωί, με εξαίρεση λόγους εργασίας και σοβαρούς λόγους υγείας.Απαγόρευση μουσικής καθ’ όλο το εικοσιτετράωρο σε καταστήματα υγειονομικού ενδιαφέροντος και ψυχαγωγίας."
      );

      msg.channel.send({
        embeds: [
          risks_embed_attica,
          risks_embed_cg,
          risks_embed_cm,
          risks_embed_crete,
          risks_embed_eastern,
          risks_embed_epirus,
          risks_embed_aegean,
          risks_embed_pelo,
          risks_embed_s_aegean,
          risks_embed_thessaly,
        ],
      });

      msg.channel.send({
        embeds: [risks_embed_western_greece, risks_embed_western_macedonia],
      });
      break;
  }
});

const bot_commands = [
  "!covidhelp",
  "!validate",
  "!emvolio",
  "!about",
  "!cases",
  "!deaths",
  "!ic",
  "!vaccs",
  "!tests",
  "!age",
  "!risklevels",
];

function validate_message() {
  client.on("message", (message) => {
    if (message.content.startsWith("!")) {
      if (message.author.bot) return;
      if (bot_commands.includes(message.content)) return;
      if (message.content.includes("-")) return;
      message.channel.send(
        "Το συγκεκριμένο command δεν είναι διαθέσιμο. Δείτε τα διαθέσιμα command πληκτρολογώντας !covidhelp"
      );
    }
  });
}

validate_message();

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token
