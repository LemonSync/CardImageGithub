const express = require("express");
const cors = require("cors");
const Canvas = require("canvas");
const { getGithubData } = require("./utils/githubData");
const { drawCenteredText, drawTextBlock, wrapText, leftWrapText, rightWrapText } = require("./utils/allFunction");

const app = express();
app.use(cors());

const images = {};
(async () => {
  try {
    images.line = await Canvas.loadImage("./line.png");
    images.hLine = await Canvas.loadImage("./Horizontal_Line.png");
  } catch (err) {
    console.error("⚠️ Error preloading images:", err.message);
  }
})();

app.get("/", (req, res) => {
  res.send("Server Express berjalan 🚀");
});

app.get("/api/github-card", async (req, res) => {
  const { username, desc, type, color } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const width = 700;
  const height = 400;

  try {
    const github = await getGithubData(username);

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    const typeNum = parseInt(type);
    if (isNaN(typeNum)) {
      return res.status(400).json({ error: "Invalid type format" });
    }

    const avatarImg = await Canvas.loadImage(github.avatar_url);
    const lineImg = images.line || (await Canvas.loadImage("./line.png"));
    const hLineImg = images.hLine || (await Canvas.loadImage("./Horizontal_Line.png"));

    const descriptionText =
      desc && desc !== "No description provided"
        ? desc
        : github.bio || "Pengguna ini belum menulis bio.";

    const stats = [
      { icon: "📦", label: `Repo: ${github.totalRepos} ${github.totalRepos <= 1 ? "Repo" : "Repos"}`, y: 80 },
      { icon: "⭐", label: `Star: ${github.totalStars} ${github.totalStars <= 1 ? "Star" : "Stars"}`, y: 130 },
      { icon: "🔀", label: `PRs: ${github.totalPullRequests} ${github.totalPullRequests <= 1 ? "Pull" : "Pulls"}`, y: 180 },
      { icon: "🐞", label: `Issues: ${github.totalIssues} ${github.totalIssues <= 1 ? "Issue" : "Issues"}`, y: 230 },
      { icon: "👥", label: `Followers: ${github.followers || 0}`, y: 280 },
      { icon: "🏠", label: `Region: ${github.location || "Unknown"}`, y: 330 },
    ];

    switch (typeNum) {
      case 1: {
        const textColor = "#fff5eaff";
        ctx.fillStyle = "#00710bff";
        ctx.fillRect(0, 0, 351, height);
        ctx.fillStyle = "#004c08ff";
        ctx.fillRect(351, 0, 349, height);
        ctx.drawImage(lineImg, 0, -600, 700, 2000);

        const AVATAR = { size: 160, x: 85, y: 35 };
        ctx.save();
        ctx.beginPath();
        ctx.arc(AVATAR.x + AVATAR.size / 2, AVATAR.y + AVATAR.size / 2, AVATAR.size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
        ctx.restore();

        drawCenteredText(ctx, github.name || github.login, 225, "bold 32px Arial", textColor, 337);
        drawCenteredText(ctx, `@${github.login}`, 250, "24px Arial", textColor, 337);

        wrapText(ctx, descriptionText, 295, 169, "20px Arial", textColor, 275, 20);

        const statX = 440;
        const iconX = 395;
        const statColor = "#fff5eaff";
        const iconColor = "#00e016ff";
        const font = "bold 26px Arial";

        for (const s of stats) {
          drawTextBlock(ctx, s.icon, iconX, s.y, font, iconColor);
          drawTextBlock(ctx, s.label, statX, s.y, font, statColor);
        }
        break;
      }

      case 2: {
        const stats = [
      { icon: "📦", label: `Repo: ${github.totalRepos} ${github.totalRepos <= 1 ? "Repo" : "Repos"}`, y: 240 },
      { icon: "⭐", label: `Star: ${github.totalStars} ${github.totalStars <= 1 ? "Star" : "Stars"}`, y: 270 },
      { icon: "🔀", label: `PRs: ${github.totalPullRequests} ${github.totalPullRequests <= 1 ? "Pull" : "Pulls"}`, y: 300 },
      { icon: "🐞", label: `Issues: ${github.totalIssues} ${github.totalIssues <= 1 ? "Issue" : "Issues"}`, y: 330 },
      { icon: "👥", label: `Followers: ${github.followers || 0}`, y: 360 },
      { icon: "🏠", label: `Region: ${github.location || "Unknown"}`, y: 390 }
    ];
        const themes = {
          green: {
            bg1: "#00710bff",
            overlay: "#00b71237",
            iconColor: "#00e016ff",
            textColor: "#fff5eaff",
          },
          darkblue: {
            bg1: "#001d3d",
            overlay: "#00356666",
            iconColor: "#00b4d8ff",
            textColor: "#e8f1ff",
          },
          darkred: {
            bg1: "#3a0000",
            overlay: "#60000044",
            iconColor: "#ff4d4d",
            textColor: "#fff0f0",
          },
          darkpurple: {
            bg1: "#240046",
            overlay: "#5a189a44",
            iconColor: "#9d4edd",
            textColor: "#f4e8ff",
          },
          light: {
            bg1: "#f4f4f4",
            overlay: "#ffffffbb",
            iconColor: "#007bff",
            textColor: "#1a1a1a",
          },
        };

        const theme = themes[color] || themes.green;

        ctx.fillStyle = theme.bg1;
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(avatarImg, 0, -500, width, width);
        ctx.fillStyle = theme.overlay;
        ctx.fillRect(0, -200, width, height);

        const AVATAR = { size: 170, x: width / 2 - 90, y: height / 2 - 110 };
        ctx.save();
        ctx.beginPath();
        ctx.arc(AVATAR.x + AVATAR.size / 2, AVATAR.y + AVATAR.size / 2, AVATAR.size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
        ctx.restore();

        leftWrapText(ctx, github.name || github.login, 240, 20, "bold 32px Arial", theme.textColor, 300, 30);
        leftWrapText(ctx, `@${github.login}`, 270, 20, "22px Arial", theme.textColor, 300, 30);
        leftWrapText(ctx, descriptionText, 300, 20, "19px Arial", theme.textColor, 300, 30);

        const statX = 650;
        const iconX = 685;
        const font = "bold 20px Arial";

        for (const s of stats) {
          rightWrapText(ctx, s.icon, s.y, iconX, font, theme.iconColor, 300, 30);
          rightWrapText(ctx, s.label, s.y, statX, font, theme.textColor, 300, 30);
        }

        break;
      }

      default:
        return res.status(400).json({ error: "Invalid type value" });
    }

    res.set("Content-Type", "image/png");
    res.set("Cache-Control", "public, max-age=3600");
    res.send(canvas.toBuffer("image/png"));
  } catch (err) {
    console.error(err);

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#004c08ff";
    ctx.fillRect(0, 0, width, height);
    wrapText(ctx, `Error, Please call the developer for repair this`, 130, 360, "bold 40px Arial", "#ffffff", 500, 50);
    wrapText(ctx, `Error Message: `, 220, 230, "bold 20px Arial", "#ffffffff", 500, 50);
    leftWrapText(ctx, err.message, 220, 320, "bold 20px Arial", "#fc0707ff", 300, 20);
    drawTextBlock(ctx, `LemonSync`, 10, height - 50, "19px Arial", "#ffffff");
    drawTextBlock(ctx, `+62 217-217-5234`, 10, height - 30, "19px Arial", "#ffffff");
    drawTextBlock(ctx, `grouplemon0@gmail.com`, 10, height - 10, "19px Arial", "#ffffff");

    res.set("Content-Type", "image/png");
    res.send(canvas.toBuffer("image/png"));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
