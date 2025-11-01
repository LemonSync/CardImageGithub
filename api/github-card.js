const express = require("express");
const cors = require("cors");
const Canvas = require("canvas");
const path = require("path");
const app = express();

app.use(cors());

const { typeOneFunction, typeTwoFunction, typeThreeFunction, SpecialErrorMessage, generateErrorSVG } = require("../utils/theSystem");
const { wrapSVGText } = require("./utils/allFunction");
const { getGithubData } = require("../utils/githubData");

// =========================================

Canvas.registerFont(path.join(__dirname, "..", "fonts", "Arimo-Regular.ttf"), {
  family: "Arimo"
});


//==========================================

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
  let { name, desc } = req.query;

  if (!name) {
  const errorSvg = generateErrorSVG(
    "Error, Harap isi Username",
    "Form tidak dapat diproses sebelum username diisi."
  );

  res.setHeader("Content-Type", "image/svg+xml");
  return res.send(errorSvg);
}


  if (!desc) {
    desc = "Saya adalah seseorang yang misterius dan kejam, yang akan segera memakan kamu diam diam, berwaspadalah akan kedatanganku .....";
  }

  name = name.toUpperCase();
  desc = wrapSVGText(desc, 50, 17);

  const data = await fetch(`https://api.github.com/users/${name}`)
    .then(r => r.json());

  const avatarBuffer = await fetch(data.avatar_url)
    .then(r => r.arrayBuffer())
    .then(buf => Buffer.from(buf));

  const avatarBase64 = avatarBuffer.toString("base64");

  const svg = `
  <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="600" fill="#216038" rx="10" />

    <defs>
      <clipPath id="avatarClip">
        <circle cx="200" cy="100" r="60" />
      </clipPath>

      <style>
        .glow {
          animation: glowAnim 2.5s infinite ease-in-out;
        }
        @keyframes glowAnim {
          0% { stroke: #22ff88; stroke-width: 1; }
          50% { stroke: #00ffaa; stroke-width: 4; }
          100% { stroke: #22ff88; stroke-width: 1; }
        }
      </style>
    </defs>

    <image
      href="data:image/png;base64,${avatarBase64}"
      x="140"
      y="40"
      width="120"
      height="120"
      clip-path="url(#avatarClip)"
      preserveAspectRatio="xMidYMid slice"
    />

    <circle cx="200" cy="100" r="60"
            fill="none"
            class="glow"
            stroke-linecap="round" />

    <text x="200" y="200"
          font-size="24"
          fill="#ffffff"
          text-anchor="middle"
          font-family="Comic Sans MS, sans-serif"
          text-transform="uppercase"
          letter-spacing="3">
      ${name}
    </text>

    <text x="200" y="230"
          fill="#e5e7eb"
          text-anchor="middle"
          font-family="Inter, sans-serif"
          font-size="14">
      ${desc}
    </text>

    <rect x="-400" y="580" width="400" height="6" fill="#00ff88">
      <animate attributeName="x"
               from="-400"
               to="400"
               dur="2.8s"
               repeatCount="indefinite" />
    </rect>
  </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
});

module.exports = app;
















