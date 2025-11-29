const express = require("express");
const cors = require("cors");
const Canvas = require("canvas");
const path = require("path");
const app = express();

app.use(cors());

const { getGithubData } = require("../utils/githubData")
const { generateErrorSVG, generateSVGOne, generateSVGTwo } = require("../utils/theSystem")
const { wrapSVGText, wrapSVGTextCenter } = require("../utils/allFunction");

// =========================================

app.get("/", (req, res) => {
  res.send("🚀 Server berhasil dijalankan");
});

app.get("/api/svg-card/", async (req, res) => {

  let { type, name, desc, age, study, religion, job, number, email, hobby } = req.query;

  const typeNum = parseInt(type, 10);
  if (isNaN(typeNum)) {
    const errorSvg = generateErrorSVG(
      "Error, Type must be a number.\n",
      "The form cannot be processed before the type is filled in.",
      "Example: /api/svg-card?type=2&more_parameters_here\nParameters: type (1, 2, or 3)",
      1150,
      160
    );
  }

  if (!type || !name) {
    const errorSvg = generateErrorSVG(
      "Error, Please fill in Type, and Username.\n",
      "The form cannot be processed before the username is filled in.",
      "Example: /api/svg-card?type=2&name=YourName&age=YourAge&study=YourStudy&religion=YourReligion&job=YourJob&number=YourNumber&email=YourEmail&hobby=YourHobby\nParameters: name, desc(not mandatory) age(not mandatory), study(not mandatory), religion(not mandatory), job(not mandatory), number(not mandatory), email(not mandatory), hobby(not mandatory)",
      1250,
      160
    );

    res.setHeader("Content-Type", "image/svg+xml");
    return res.send(errorSvg);
  }

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

  const github = await getGithubData(name).catch(async (err) => {
    const errorSvg = generateErrorSVG(
      "Error, User not found.\n",
      "The form cannot be processed before the username is filled in.",
      "-",
      1150,
      160
    )

    res.setHeader("Content-Type", "image/svg+xml");
    return res.send(errorSvg);
  });

  if (!desc) {
    desc = github.bio || "No description provided.";
  }

  // ==========================================

  const avatarBuffer = await fetch(github.avatar_url)
    .then(r => r.arrayBuffer())
    .then(buf => Buffer.from(buf));
  const avatarBase64 = avatarBuffer.toString("base64");

  name = github.name.toUpperCase();

  // ==========================================

  if (typeNum == 1) {

  desc = `❝ ${desc} ❞`;
  desc = wrapSVGText(desc, 50, 17);

  const svg = await generateSVGOne(
    avatarBase64,
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

  } else if (typeNum == 2) {

    desc = wrapSVGTextCenter(desc, 600, 75, 40, 18);
    const svg2 = await generateSVGTwo(
      avatarBase64,
      name,
      desc
    )

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg2);
  } else {

    const errorSvg = generateErrorSVG(
      "Error, Type must be 1 or 2.\n",
      "The form cannot be processed before the type is filled in correctly.",
      "Example: /api/svg-card?type=2&more_parameters_here\nParameters: type (1 or 2)",
      1150,
      160
    );

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(errorSvg);
  }
});

module.exports = app;










































