const express = require("express");
const cors = require("cors");
const Canvas = require("canvas");
const app = express();

app.use(cors());

const { typeOneFunction, typeTwoFunction, typeThreeFunction, SpecialErrorMessage } = require("../utils/theSystem");
const { drawCenteredText, drawTextBlock, wrapText, leftWrapText, rightWrapText } = require("../utils/allFunction");
const { getGithubData } = require("../utils/githubData");

// ============================

const github = {
  profile: "./profile.jpg",
  name: "Lemon",
  login: "@LemonSync",
  desc: "Saya adalah seseorang yang misterius...",
  twitter: "LemonSync",
  facebook: "Lemon",
  no: "+62 217 217 234",
  email: "grouplemon0@gmail.com",
  repo: 16,
  star: 111,
  locate: "Indonesian",
  follower: 46
};

// ============================

app.get("/", (req, res) => {
  res.send("🚀 Server berhasil dijalankan");
});

app.get("/api/github-card", async (req, res) => {
  const { username, desc = "Orang yang pengen jadi programmer tapi enggan ngoding", type } = req.query;

  if (!username) {
    return SpecialErrorMessage(res, Canvas, `Please enter the username`);
  }

  const github = await getGithubData(username);
  const typeNum = parseInt(type);
  if (isNaN(typeNum)) {
    return SpecialErrorMessage(res, Canvas, `Invalid type format, Only 1 - 6 available`);
  }

  if (typeNum === 1) {
    return typeOneFunction(res, Canvas, github.profile, github.name, github.login, github.desc, github.twitter, github.facebook, github.no, github.star, github.repo, github.locate, github.follower);
  }

  if (typeNum === 2) {
    return typeTwoFunction(res, Canvas, github.profile, github.name, github.login, github.desc);
  }

  if (typeNum === 3) {
    return typeThreeFunction(res, Canvas, github.profile, github.name);
  }

  return SpecialErrorMessage(res, Canvas, `Type 1-3 only`);
});

module.exports = app;
