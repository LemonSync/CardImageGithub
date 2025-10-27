// server.js
const express = require("express");
const cors = require("cors");
const Canvas = require("canvas");
const {
  drawCenteredText,
  drawTextBlock,
  wrapText,
  leftWrapText,
  rightWrapText,
} = require("./utils/allFunction");

const app = express();
app.use(cors());

// ✅ Preload images once for performance
const images = {};
(async () => {
  try {
    images.avatar = await Canvas.loadImage("./profile.jpg");
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
  const { username, desc = "No description provided", type, color } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const width = 700;
  const height = 400;
  const textColor = color || "#fff5eaff";

  try {
    // Setup canvas
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Validasi type
    const typeNum = parseInt(type);
    if (isNaN(typeNum)) {
      return res.status(400).json({ error: "Invalid type format" });
    }

    // Default fallback images
    const avatarImg =
      images.avatar || (await Canvas.loadImage("./profile.jpg"));
    const lineImg = images.line || (await Canvas.loadImage("./line.png"));
    const hLineImg =
      images.hLine || (await Canvas.loadImage("./Horizontal_Line.png"));

    // --- TEMPLATE PILIHAN ---
    switch (typeNum) {
      case 1: {
        // Background dua sisi
        ctx.fillStyle = "#00710bff";
        ctx.fillRect(0, 0, 351, height);
        ctx.fillStyle = "#004c08ff";
        ctx.fillRect(351, 0, 349, height);

        // Gambar garis dekoratif
        ctx.drawImage(lineImg, 0, -600, 700, 2000);

        // Avatar
        const AVATAR = { size: 160, x: 85, y: 35 };
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          AVATAR.x + AVATAR.size / 2,
          AVATAR.y + AVATAR.size / 2,
          AVATAR.size / 2,
          0,
          Math.PI * 2
        );
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
        ctx.restore();

        // Nama dan username
        drawCenteredText(ctx, "Lemon", 225, "bold 32px Arial", textColor, 337);
        drawCenteredText(ctx, "@LemonSync", 250, "24px Arial", textColor, 337);

        // Deskripsi
        const descriptionText =
          desc && desc !== "No description provided"
            ? desc
            : "Orang yang pengen jadi programmer tapi enggan ngoding";
        wrapText(
          ctx,
          descriptionText,
          295,
          169,
          "20px Arial",
          textColor,
          275,
          20
        );

        // Statistik (kiri & ikon)
        const statX = 440;
        const iconX = 395;
        const statColor = "#b56900ff";
        const iconColor = "#00e016ff";
        const font = "bold 26px Arial";

        const stats = [
          { icon: "📦", label: "Repo:  5 Repos", y: 80 },
          { icon: "⭐", label: "Star:  10 Stars", y: 130 },
          { icon: "🔀", label: "PRs:   10 Pulls", y: 180 },
          { icon: "🐞", label: "Issues: 5 Issues", y: 230 },
          { icon: "👥", label: "Followers: 45", y: 280 },
        ];

        for (const s of stats) {
          drawTextBlock(ctx, s.icon, iconX, s.y, font, iconColor);
          drawTextBlock(ctx, s.label, statX, s.y, font, statColor);
        }

        break;
      }

      case 2: {
        // Background
        ctx.fillStyle = "#00710bff";
        ctx.fillRect(0, 0, width, height);

        // Profil background (blurred / full)
        ctx.drawImage(avatarImg, 0, -500, width, width);

        // Garis horizontal
        ctx.drawImage(hLineImg, 0, -20, 700, 400);

        // Avatar
        const AVATAR = { size: 170, x: width / 2 - 90, y: height / 2 - 110 };
        ctx.save();
        ctx.beginPath();
        ctx.arc(
          AVATAR.x + AVATAR.size / 2,
          AVATAR.y + AVATAR.size / 2,
          AVATAR.size / 2,
          0,
          Math.PI * 2
        );
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
        ctx.restore();

        // Tulisan kiri
        leftWrapText(
          ctx,
          "Lemon",
          240,
          20,
          "bold 32px Arial",
          textColor,
          300,
          30
        );
        leftWrapText(
          ctx,
          "@LemonSync",
          280,
          20,
          "24px Arial",
          textColor,
          300,
          30
        );

        const descriptionText =
          desc && desc !== "No description provided"
            ? desc
            : "Orang yang pengen jadi programmer tapi enggan ngoding";
        leftWrapText(
          ctx,
          descriptionText,
          320,
          20,
          "20px Arial",
          textColor,
          300,
          30
        );

        // Tulisan kanan (quote lucu)
        rightWrapText(
          ctx,
          "Gw itu sebenarnya adalah hengker yang menyembunyikan identitas gw, ang ang ang ang ...",
          238,
          690,
          "bold 20px Arial",
          "#fff",
          300,
          30
        );
        break;
      }

      default:
        return res.status(400).json({ error: "Invalid type value" });
    }

    // Header dan kirim hasil
    res.set("Content-Type", "image/png");
    res.set("Cache-Control", "public, max-age=3600");
    res.send(canvas.toBuffer("image/png"));
  } catch (err) {
    // ⚠️ JANGAN DIUBAH: Error handling kamu yang keren tetap dipertahankan
    console.error(err);
    const width = 700;
    const height = 400;
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#004c08ff";
    ctx.fillRect(0, 0, width, height);
    wrapText(
      ctx,
      `Error, Please call the developer for repair this`,
      130,
      360,
      "bold 40px Arial",
      "#ffffff",
      500,
      50
    );
    wrapText(
      ctx,
      `Error Message: `,
      220,
      230,
      "bold 20px Arial",
      "#ffffffff",
      500,
      50
    );
    leftWrapText(
      ctx,
      err.message,
      220,
      320,
      "bold 20px Arial",
      "#fc0707ff",
      300,
      20
    );
    drawTextBlock(ctx, `LemonSync`, 10, height - 50, "19px Arial", "#ffffff");
    drawTextBlock(
      ctx,
      `+62 217-217-5234`,
      10,
      height - 30,
      "19px Arial",
      "#ffffff"
    );
    drawTextBlock(
      ctx,
      `grouplemon0@gmail.com`,
      10,
      height - 10,
      "19px Arial",
      "#ffffff"
    );

    res.set("Content-Type", "image/png");
    res.send(canvas.toBuffer("image/png"));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
