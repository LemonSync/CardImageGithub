const express = require("express");
const cors = require("cors");
const Canvas = require("canvas");
const app = express();

app.use(cors());

const { typeOneFunction, typeTwoFunction, typeThreeFunction, SpecialErrorMessage } = require("../utils/theSystem");
const { drawCenteredText, drawTextBlock, wrapText, leftWrapText, rightWrapText } = require("../utils/allFunction");
const { getGithubData } = require("../utils/githubData");

// =========================================

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
    return typeOneFunction(res, Canvas, github.avatar_url, github.name, github.login, github.desc, github.twitter, github.facebook, github.no, github.totalStars, github.totalRepos, github.locate, github.follower);
  }

  if (typeNum === 2) {
    return typeTwoFunction(res, Canvas, github.avatar_url, github.name, github.login, github.desc);
  }

  if (typeNum === 3) {
    return typeThreeFunction(res, Canvas, github.avatar_url, github.name);
  }

  return SpecialErrorMessage(res, Canvas, `Type 1-3 only`);
});

module.exports = app;

