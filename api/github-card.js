const express = require("express");
const cors = require("cors");
const Canvas = require("canvas");
const path = require("path");
const app = express();

app.use(cors());

const { typeOneFunction, typeTwoFunction, typeThreeFunction, SpecialErrorMessage, generateErrorSVG } = require("../utils/theSystem");
const { wrapSVGText } = require("../utils/allFunction");
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

  const github = await getGithubData(name);


  if (!desc) {
    desc = "Saya adalah seseorang yang misterius dan kejam, yang akan segera memakan kamu diam diam, berwaspadalah akan kedatanganku .....";
  }

  name = name.toUpperCase();
  desc = wrapSVGText(desc, 50, 17);


  name = github.name;

  const avatarBuffer = await fetch(github.avatar_url)
    .then(r => r.arrayBuffer())
    .then(buf => Buffer.from(buf));

  const avatarBase64 = avatarBuffer.toString("base64");

  const svg = `
<svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="600" fill="#216038" />

  <defs>
    <clipPath id="avatarClip">
      <circle cx="300" cy="100" r="60" />
    </clipPath>

    <style>
      .fade-up {
        transform-box: fill-box;
        transform-origin: center;
        opacity: 0;
        animation: fadeUp 0.6s forwards ease-out;
      }

      .fade-in { opacity: 0; animation: fadeIn 1s forwards; }

      .del-box1 { animation-delay: 0.5s; }
      .del-box2 { animation-delay: 1s; }
      .del-box3 { animation-delay: 1.5s; }
      .del-box4 { animation-delay: 2s; }
      .del-box5 { animation-delay: 2.5s; }
      .del-box6 { animation-delay: 3s; }
      .del-box7 { animation-delay: 3.5s; }
      .del-box8 { animation-delay: 4s; }
      .del-box9 { animation-delay: 4.5s; }
      .del-box10 { animation-delay: 5s; }

      .del-line1 { animation-delay: 5.5s; }
      .del-line2 { animation-delay: 6s; }
      .del-lineBox1 { animation-delay: 6.5s; }

      .del-line3 { animation-delay: 7s; }
      .del-line4 { animation-delay: 7.5s; }
      .del-lineBox2 { animation-delay: 8s; }

      .del-line5 { animation-delay: 8.5s; }
      .del-line6 { animation-delay: 9s; }
      .del-lineBox3 { animation-delay: 9.5s; }

      .del-line7 { animation-delay: 10s; }
      .del-line8 { animation-delay: 10.5s; }
      .del-lineBox4 { animation-delay: 11s; }

      .del-line9 { animation-delay: 11.5s; }
      .del-line10 { animation-delay: 12s; }
      .del-lineBox5 { animation-delay: 12.5s; }

      .del-1 { animation-delay: 13s; }
      .del-2 { animation-delay: 13.5s; }
      .del-3 { animation-delay: 14s; }


      .del-star { animation-delay: 14.55s; }
      .del-repo { animation-delay: 14.65s; }
      .del-issue { animation-delay: 14.75s; }
      .del-loc { animation-delay: 14.85s; }
      .del-pull { animation-delay: 14.95s; }
      .del-follow { animation-delay: 15.05s; }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes fadeUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

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

  <polygon points="10,10 100,10 100,100 10,100" fill="#004726ff" class="fade-in del-box1"/>
  <polygon points="20,20 90,20 90,90 20,90" fill="#007840ff" class="fade-in del-box2"/>
  <polygon points="30,30 80,30 80,80 30,80" fill="#00a458ff" class="fade-in del-box3"/>
  <polygon points="40,40 70,40 70,70 40,70" fill="#00d170ff" class="fade-in del-box4"/>
  <polygon points="50,50 60,50 60,60 50,60" fill="#00ff88ff" class="fade-in del-box5"/>

  <polygon points="500,10 590,10 590,100 500,100" fill="#004726ff" class="fade-in del-box6"/>
  <polygon points="510,20 580,20 580,90 510,90" fill="#007840ff" class="fade-in del-box7"/>
  <polygon points="520,30 570,30 570,80 520,80" fill="#00a458ff" class="fade-in del-box8"/>
  <polygon points="530,40 560,40 560,70 530,70" fill="#00d170ff" class="fade-in del-box9"/>
  <polygon points="540,50 550,50 550,60 540,60" fill="#00ff88ff" class="fade-in del-box10"/>

  <line x1="100" y1="10" x2="500" y2="10" stroke="#004726ff" stroke-width="1" class="fade-in del-line1"/>
  <line x1="100" y1="100" x2="500" y2="100" stroke="#004726ff" stroke-width="1" class="fade-in del-line2"/>
  <polygon points="98,10 501,10 501,100 98,100" fill="#004726ff" class="fade-in del-lineBox1"/>

  <line x1="90" y1="20" x2="510" y2="20" stroke="#007840ff" stroke-width="1" class="fade-in del-line3"/>
  <line x1="90" y1="90" x2="510" y2="90" stroke="#007840ff" stroke-width="1" class="fade-in del-line4"/>
  <polygon points="88,20 511,20 511,90 88,90" fill="#007840ff" class="fade-in del-lineBox2"/>

  <line x1="80" y1="30" x2="520" y2="30" stroke="#00a458ff" stroke-width="1" class="fade-in del-line5"/>
  <line x1="80" y1="80" x2="520" y2="80" stroke="#00a458ff" stroke-width="1" class="fade-in del-line6"/>
  <polygon points="78,30 521,30 521,80 78,80" fill="#00a458ff" class="fade-in del-lineBox3"/>

  <line x1="70" y1="40" x2="530" y2="40" stroke="#00d170ff" stroke-width="1" class="fade-in del-line7"/>
  <line x1="70" y1="70" x2="530" y2="70" stroke="#00d170ff" stroke-width="1" class="fade-in del-line8"/>
  <polygon points="68,40 531,40 531,70 68,70" fill="#00d170ff" class="fade-in del-lineBox4"/>

  <line x1="60" y1="50" x2="540" y2="50" stroke="#00ff88ff" stroke-width="1" class="fade-in del-line9"/>
  <line x1="60" y1="60" x2="540" y2="60" stroke="#00ff88ff" stroke-width="1" class="fade-in del-line10"/>
  <polygon points="48,60 551,60 551,50 48,50" fill="#00ff88ff" class="fade-in del-lineBox5"/>


  <image
    href="data:image/png;base64,${avatarBase64}"
    x="240"
    y="40"
    width="120"
    height="120"
    clip-path="url(#avatarClip)"
    preserveAspectRatio="xMidYMid slice"
    class="fade-up del-1"
  />

  <circle cx="300" cy="100" r="60"
          fill="none"
          class="glow fade-up del-1"
          stroke-linecap="round" />

  <text x="300" y="200" font-size="24"
        text-anchor="middle"
        font-family="Ubuntu, sans-serif"
        fill="#FFFF"
        class="fade-up del-2"
        letter-spacing="5"
        font-weight="600">${name.toUpperCase()}</text>

  <text x="300" y="240"
        text-anchor="middle"
        font-family="Ubuntu, sans-serif"
        fill="#FFFF"
        class="fade-up del-3"
        font-size="14">${desc}</text>

  <text x="30" y="570"
        font-size="15px"
        fill="#FFFF"
        font-family="Ubuntu, sans-serif"
        class="fade-up del-star">
    ⭐: ${github.totalStars} ${github.totalStars <= 1 ? "Star" : "Stars"}
  </text>

  <text x="30" y="590"
        font-size="15px"
        fill="#FFFF"
        font-family="Ubuntu, sans-serif"
        class="fade-up del-repo">
    📦: ${github.totalRepos} ${github.totalRepos <= 1 ? "Repo" : "Repos"}
  </text>

  <text x="250" y="570"
        font-size="15px"
        fill="#FFFF"
        font-family="Ubuntu, sans-serif"
        class="fade-up del-issue">
    🗣 : ${github.totalIssues} ${github.totalIssues <= 1 ? "Issue" : "Issues"}
  </text>

  <text x="250" y="590"
        font-size="15px"
        fill="#FFFF"
        font-family="Ubuntu, sans-serif"
        class="fade-up del-loc">
    🏠: ${github.location}
  </text>

  <text x="470" y="570"
        font-size="15px"
        fill="#FFFF"
        font-family="Ubuntu, sans-serif"
        class="fade-up del-pull">
    🔀: ${github.totalPullRequests} ${github.totalPullRequests <= 1 ? "Pull" : "Pulls"}
  </text>

<text x="470" y="590"
        font-size="15px"
        fill="#FFFF"
        font-family="Ubuntu, sans-serif"
        class="fade-up del-follow">
    👥: ${github.followers} ${github.followers <= 1 ? "Follower" : "Followers"}
  </text>

  <rect x="-500" y="597" width="400" height="6" fill="#00ff88">
    <animate attributeName="x"
        from="-600"
        to="600"
        dur="1.5s"
        repeatCount="indefinite" />
  </rect>
</svg>
`;

  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svg);
});

module.exports = app;






















