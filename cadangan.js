// server.js
const express = require("express");
const cors = require("cors");
const Canvas = require("canvas");
const { getGithubData } = require("./utils/githubData");

const app = express();
app.use(cors());

app.get("/api/github-card", async (req, res) => {
  const { username, desc = "No description provided" } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // Ambil data GitHub dari file utils
    const github = await getGithubData(username);

    // Buat canvas
    const width = 700;
    const height = 400;
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, width, height);

    // Avatar (bulat) - coba pakai avatar dari GitHub, fallback ke file lokal jika gagal
    let avatar;
    try {
      avatar = await Canvas.loadImage(github.avatar_url);
    } catch (e) {
      avatar = await Canvas.loadImage("./profile.jpg");
    }

    const image = await Canvas.loadImage("./line.png");
    ctx.drawImage(image, 0, -100, 700, 500);
    const avatarSize = 160;
    const avatarX = 85;
    const avatarY = 35;
    ctx.save();
    ctx.beginPath();
    ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
    ctx.restore();

  // Nama (rata tengah)
  drawCenteredText(ctx, github.name, 225, "bold 32px Arial", "#ffffff", 337);

  // Username (rata tengah)
  drawCenteredText(ctx, `@` + github.login, 250, "24px Arial", "#9da5b4", 337);

  const descriptionText = desc && desc !== `No description provided` ? desc : `I I I` || `No description provided`;
  wrapText(ctx, descriptionText, 295, 169, "20px Arial", "#c9d1d9", 275, 20);

  // Statistik (posisi biasa, kiri)
  drawTextBlock(ctx, `📦 Repo:  ${github.totalRepos} ${github.totalRepos <= 1 ? "Repo" : "Repos"}`, 410, 80, "bold 26px Arial", "#58a6ff");
  drawTextBlock(ctx, `⭐ Star:  ${github.totalStars} ${github.totalStars <= 1 ? "Star" : "Stars"}`, 410, 130, "bold 26px Arial", "#58a6ff");
  drawTextBlock(ctx, `🔀 PRs:   ${github.totalPullRequests} ${github.totalPullRequests <= 1 ? "Pull" : "Pulls"}`, 410, 180, "bold 26px Arial", "#58a6ff");
  drawTextBlock(ctx, `🐞 Issues: ${github.totalIssues} ${github.totalIssues <= 1 ? "Issue" : "Issues"}`, 410, 230, "bold 26px Arial", "#58a6ff");


    // Kirim hasil gambar
    res.set("Content-Type", "image/png");
    res.send(canvas.toBuffer("image/png"));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));


/* 
  Fungsi untuk menggambar teks rata tengah
  ctx     → context canvas
  text    → isi teks
  y       → posisi vertikal teks (tengah berdasarkan tinggi huruf)
  font    → gaya font (misal: "bold 32px Arial")
  color   → warna teks (misal: "#ffffff")
  width   → lebar total canvas
*/
function drawCenteredText(ctx, text, y, font, color, width) {
  ctx.font = font;
  ctx.fillStyle = color;
  const textWidth = ctx.measureText(text).width;
  const x = (width - textWidth) / 2;
  ctx.fillText(text, x, y);
}

/*
  Fungsi untuk menggambar teks biasa di posisi tertentu
  ctx     → context canvas
  text    → isi teks
  x, y    → posisi teks
  font    → gaya font
  color   → warna teks
*/
function drawTextBlock(ctx, text, x, y, font, color) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function wrapText(ctx, text, startY, centerX, font, color, maxWidth, lineHeight) {
  ctx.font = font;
  ctx.fillStyle = color;
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (let word of words) {
    const testLine = line + (line ? " " : "") + word;
    if (ctx.measureText(testLine).width <= maxWidth) {
      line = testLine;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);

  const limitedLines = lines.slice(0, 5);
  for (let i = 0; i < limitedLines.length; i++) {
    const lineWidth = ctx.measureText(limitedLines[i]).width;
    const x = centerX - lineWidth / 2;
    const y = startY + i * lineHeight;
    ctx.fillText(limitedLines[i], x, y);
  }
}