const express = require("express");
const cors = require("cors");
const Canvas = require("canvas");
const path = require("path");
const app = express();

app.use(cors());

const { getGithubData } = require("../utils/githubData")
const { generateErrorSVG, generateSVG } = require("../utils/theSystem")
const { wrapSVGText } = require("../utils/allFunction");

// =========================================

app.get("/", (req, res) => {
  res.send("🚀 Server berhasil dijalankan");
});

app.get("/api/github-card", async (req, res) => {
  const { username, desc = "Orang yang pengen jadi programmer tapi enggan ngoding", type, no, facebook, twitter } = req.query;

  if (!username) {
    return SpecialErrorMessage(res, Canvas, `Please enter the username`);
  }



  const github = await getGithubData(username);
  const descriptionText =
      desc && desc !== "No description provided"
        ? desc
        : github.desc || "Pengguna ini belum menulis bio.";
  github.desc = descriptionText;

  
  const typeNum = parseInt(type);
  if (isNaN(typeNum)) {
    return SpecialErrorMessage(res, Canvas, `Invalid type format, Only 1 - 6 available`);
  }

  if (typeNum === 1) {
    if (!no || !facebook || !twitter) {
    return SpecialErrorMessage(res, Canvas, `Please enter the Call number, Facebook Account, and Twitter Account`);
  }
    
    return typeOneFunction(res, Canvas, github.avatar_url, github.name, github.login, github.desc, twitter, facebook, no, github.totalStars, github.totalRepos, github.locate, github.follower);
  }

  if (typeNum === 2) {
    return typeTwoFunction(res, Canvas, github.avatar_url, github.name, github.login, github.desc);
  }

  if (typeNum === 3) {
    return typeThreeFunction(res, Canvas, github.avatar_url, github.name);
  }

  return SpecialErrorMessage(res, Canvas, `Type 1-3 only`);
});

app.get("/api/svg-card/", async (req, res) => {

  let { name, desc, age, study, religion, job, number, email, hobby } = req.query;

  if (!name || !age || !study || !religion || !job || !number || !email || !hobby) {
  const errorSvg = generateErrorSVG(
    "Error, Please fill in Username, Age, Study, Religion, Job, Number, Email, and Hobby.\n",
    "The form cannot be processed before the username is filled in.",
    "Example: /api/svg-card?name=YourName&age=YourAge&study=YourStudy&religion=YourReligion&job=YourJob&number=YourNumber&email=YourEmail&hobby=YourHobby\nParameters: name, desc(not mandatory) age, study, religion, job, number, email, hobby",
    1150,
    160
  );

  res.setHeader("Content-Type", "image/svg+xml");
  return res.send(errorSvg);
}  

  const github = await getGithubData(name)

/*  const github = {};
  github.name = "Lemon";
  github.bio = "About You And Me";
  github.totalStars = 116;
  github.totalRepos = 16;
  github.totalIssues = 18;
  github.location = "Indonesia";
  github.totalPullRequests = 17;
  github.followers = 47;
*/

  if (!desc) {
    desc = github.bio || "No description provided.";
  }

  name = github.name.toUpperCase();
  desc = `❝ ${desc} ❞`;
  desc = wrapSVGText(desc, 50, 17);

  const svg = await generateSVG(
    name,
    desc,
    age,
    study,
    religion,
    job,
    number,
    email,
    hobby,
    github.totalStars,
    github.totalRepos,
    github.totalIssues,
    github.location,
    github.totalPullRequests,
    github.followers
  )

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
});

module.exports = app;


































