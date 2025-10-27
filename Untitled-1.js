const express = require("express");
const cors = require("cors");
const Canvas = require("canvas");
const { drawCenteredText, drawTextBlock, wrapText, leftWrapText, rightWrapText } = require("./utils/allFunction");

const app = express();
app.use(cors());

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

const stats = [
              { icon: "⭐", label: "Star:  10 Stars", y: 240 },
              { icon: "🔀", label: "PRs:   10 Pulls", y: 270 },
              { icon: "📦", label: "Repo:  5 Repos", y: 300 },
              { icon: "🐞", label: "Issues: 5 Issues", y: 330 },
              { icon: "🏠", label: "Region: Indonesian", y: 360 },
              { icon: "👥", label: "Followers: 45 Followers", y: 390 }
            ];

app.get("/", (req, res) => {
  res.send("Server Express berjalan 🚀");
});

app.get("/api/github-card", async (req, res) => {
  const { username, desc = "Orang yang pengen jadi programmer tapi enggan ngoding", type, color } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  const width = 700;
  const height = 400;

  try {
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    const typeNum = parseInt(type);
    if (isNaN(typeNum)) {
      return res.status(400).json({ error: "Invalid type format" });
    }

    const avatarImg = images.avatar || (await Canvas.loadImage("./profile.jpg"));
    const lineImg = images.line || (await Canvas.loadImage("./line.png"));
    const hLineImg = images.hLine || (await Canvas.loadImage("./Horizontal_Line.png"));

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

        drawCenteredText(ctx, "Lemon", 225, "bold 32px Arial", textColor, 337);
        drawCenteredText(ctx, "@LemonSync", 250, "24px Arial", textColor, 337);

        const descriptionText = desc && desc !== "No description provided" ? desc : "Orang yang pengen jadi programmer tapi enggan ngoding";
        wrapText(ctx, descriptionText, 295, 169, "20px Arial", textColor, 275, 20);

        const statX = 440;
        const iconX = 395;
        const statColor = "#fff5eaff";
        const iconColor = "#00e016ff";
        const font = "bold 26px Arial";

        const stats = [
          { icon: "📦", label: "Repo:  5 Repos", y: 80 },
          { icon: "⭐", label: "Star:  10 Stars", y: 130 },
          { icon: "🔀", label: "PRs:   10 Pulls", y: 180 },
          { icon: "🐞", label: "Issues: 5 Issues", y: 230 },
          { icon: "👥", label: "Followers: 45", y: 280 },
          { icon: "🏠", label: "Region: Indonesian", y: 330 }
        ];

        for (const s of stats) {
          drawTextBlock(ctx, s.icon, iconX, s.y, font, iconColor);
          drawTextBlock(ctx, s.label, statX, s.y, font, statColor);
        }

        break;
      }

      case 2: {
        switch (color) {
          case "green": {
            const textColor = "#fff5eaff";
            ctx.fillStyle = "#00710bff";
            ctx.fillRect(0, 0, width, height);

            ctx.drawImage(avatarImg, 0, -500, width, width);
            ctx.fillStyle = "#00b71237";
            ctx.fillRect(0, -200, width, height);
            drawTextBlock(ctx, `_____________`, 0, 180, "bold 100px Arial", "#00ff1aaa");
            drawTextBlock(ctx, `_____________`, 0, 184, "bold 100px Arial", "#00be1aaa");
            drawTextBlock(ctx, `_____________`, 0, 188, "bold 100px Arial", "#00981aaa");
            drawTextBlock(ctx, `_____________`, 0, 194, "bold 100px Arial", "#00710aaa");

            const AVATAR = { size: 170, x: width / 2 - 90, y: height / 2 - 110 };
            ctx.save();
            ctx.beginPath();
            ctx.arc(AVATAR.x + AVATAR.size / 2, AVATAR.y + AVATAR.size / 2, AVATAR.size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
            ctx.restore();

            // Tulisan kiri
            leftWrapText(ctx, "Lemon", 240, 20, "bold 32px Arial", textColor, 300, 30);
            leftWrapText(ctx, "@LemonSync", 270, 20, "22px Arial", textColor, 300, 30);

            const descriptionText = desc && desc !== "No description provided" ? desc : "Orang yang pengen jadi programmer tapi enggan ngoding";
            leftWrapText(ctx, descriptionText, 300, 20, "19px Arial", textColor, 300, 30);

            const statX = 650;
            const iconX = 685;
            const statColor = "#fff5eaff";
            const iconColor = "#00e016ff";
            const font = "bold 20px Arial";

            const stats = [
              { icon: "⭐", label: "Star:  10 Stars", y: 240 },
              { icon: "🔀", label: "PRs:   10 Pulls", y: 270 },
              { icon: "📦", label: "Repo:  5 Repos", y: 300 },
              { icon: "🐞", label: "Issues: 5 Issues", y: 330 },
              { icon: "🏠", label: "Region: Indonesian", y: 360 },
              { icon: "👥", label: "Followers: 45 Followers", y: 390 }
            ];

            for (const s of stats) {
              rightWrapText(ctx, s.icon, s.y, iconX, font, iconColor, 300, 30);
              rightWrapText(ctx, s.label, s.y, statX, font, statColor, 300, 30);
            }
            break;
          }

          // === DARK BLUE THEME ===
          case "darkblue": {
            const textColor = "#e8f1ff";
            ctx.fillStyle = "#001d3d";
            ctx.fillRect(0, 0, width, height);

            ctx.drawImage(avatarImg, 0, -500, width, width);
            ctx.fillStyle = "#00356666";
            ctx.fillRect(0, -200, width, height);
            drawTextBlock(ctx, `_____________`, 0, 180, "bold 100px Arial", "#0077b6aa");
            drawTextBlock(ctx, `_____________`, 0, 184, "bold 100px Arial", "#0096c7aa");
            drawTextBlock(ctx, `_____________`, 0, 188, "bold 100px Arial", "#00b4d8aa");
            drawTextBlock(ctx, `_____________`, 0, 194, "bold 100px Arial", "#48cae4aa");

            const AVATAR = { size: 170, x: width / 2 - 90, y: height / 2 - 110 };
            ctx.save();
            ctx.beginPath();
            ctx.arc(AVATAR.x + AVATAR.size / 2, AVATAR.y + AVATAR.size / 2, AVATAR.size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
            ctx.restore();

            leftWrapText(ctx, "Lemon", 240, 20, "bold 32px Arial", textColor, 300, 30);
            leftWrapText(ctx, "@LemonSync", 270, 20, "22px Arial", textColor, 300, 30);
            leftWrapText(ctx, desc, 300, 20, "19px Arial", textColor, 300, 30);

            const statX = 650;
            const iconX = 685;
            const statColor = "#e8f1ff";
            const iconColor = "#00b4d8ff";
            const font = "bold 20px Arial";

            for (const s of stats) {
              rightWrapText(ctx, s.icon, s.y, iconX, font, iconColor, 300, 30);
              rightWrapText(ctx, s.label, s.y, statX, font, statColor, 300, 30);
            }
            break;
          }

          // === DARK RED THEME ===
          case "darkred": {
            const textColor = "#fff0f0";
            ctx.fillStyle = "#3a0000";
            ctx.fillRect(0, 0, width, height);

            ctx.drawImage(avatarImg, 0, -500, width, width);
            ctx.fillStyle = "#60000044";
            ctx.fillRect(0, -200, width, height);
            drawTextBlock(ctx, `_____________`, 0, 180, "bold 100px Arial", "#ff4d4daa");
            drawTextBlock(ctx, `_____________`, 0, 184, "bold 100px Arial", "#ff1e1eaa");
            drawTextBlock(ctx, `_____________`, 0, 188, "bold 100px Arial", "#b30000aa");
            drawTextBlock(ctx, `_____________`, 0, 194, "bold 100px Arial", "#660000aa");

            const AVATAR = { size: 170, x: width / 2 - 90, y: height / 2 - 110 };
            ctx.save();
            ctx.beginPath();
            ctx.arc(AVATAR.x + AVATAR.size / 2, AVATAR.y + AVATAR.size / 2, AVATAR.size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
            ctx.restore();

            leftWrapText(ctx, "Lemon", 240, 20, "bold 32px Arial", textColor, 300, 30);
            leftWrapText(ctx, "@LemonSync", 270, 20, "22px Arial", textColor, 300, 30);
            leftWrapText(ctx, desc, 300, 20, "19px Arial", textColor, 300, 30);

            const statX = 650;
            const iconX = 685;
            const statColor = "#fff0f0";
            const iconColor = "#ff4d4d";
            const font = "bold 20px Arial";

            for (const s of stats) {
              rightWrapText(ctx, s.icon, s.y, iconX, font, iconColor, 300, 30);
              rightWrapText(ctx, s.label, s.y, statX, font, statColor, 300, 30);
            }
            break;
          }

          // === DARK PURPLE THEME ===
          case "darkpurple": {
            const textColor = "#f4e8ff";
            ctx.fillStyle = "#240046";
            ctx.fillRect(0, 0, width, height);

            ctx.drawImage(avatarImg, 0, -500, width, width);
            ctx.fillStyle = "#5a189a44";
            ctx.fillRect(0, -200, width, height);
            drawTextBlock(ctx, `_____________`, 0, 180, "bold 100px Arial", "#9d4edd99");
            drawTextBlock(ctx, `_____________`, 0, 184, "bold 100px Arial", "#7b2cbf99");
            drawTextBlock(ctx, `_____________`, 0, 188, "bold 100px Arial", "#5a189a99");
            drawTextBlock(ctx, `_____________`, 0, 194, "bold 100px Arial", "#3c096c99");

            const AVATAR = { size: 170, x: width / 2 - 90, y: height / 2 - 110 };
            ctx.save();
            ctx.beginPath();
            ctx.arc(AVATAR.x + AVATAR.size / 2, AVATAR.y + AVATAR.size / 2, AVATAR.size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
            ctx.restore();

            leftWrapText(ctx, "Lemon", 240, 20, "bold 32px Arial", textColor, 300, 30);
            leftWrapText(ctx, "@LemonSync", 270, 20, "22px Arial", textColor, 300, 30);
            leftWrapText(ctx, desc, 300, 20, "19px Arial", textColor, 300, 30);

            const statX = 650;
            const iconX = 685;
            const statColor = "#f4e8ff";
            const iconColor = "#9d4edd";
            const font = "bold 20px Arial";

            for (const s of stats) {
              rightWrapText(ctx, s.icon, s.y, iconX, font, iconColor, 300, 30);
              rightWrapText(ctx, s.label, s.y, statX, font, statColor, 300, 30);
            }
            break;
          }

          // === LIGHT THEME ===
          case "light": {
            const textColor = "#1a1a1a";
            ctx.fillStyle = "#f4f4f4";
            ctx.fillRect(0, 0, width, height);

            ctx.drawImage(avatarImg, 0, -500, width, width);
            ctx.fillStyle = "#ffffffbb";
            ctx.fillRect(0, -200, width, height);
            drawTextBlock(ctx, `_____________`, 0, 180, "bold 100px Arial", "#cccccc55");
            drawTextBlock(ctx, `_____________`, 0, 184, "bold 100px Arial", "#bbbbbb55");
            drawTextBlock(ctx, `_____________`, 0, 188, "bold 100px Arial", "#aaaaaa55");
            drawTextBlock(ctx, `_____________`, 0, 194, "bold 100px Arial", "#99999955");

            const AVATAR = { size: 170, x: width / 2 - 90, y: height / 2 - 110 };
            ctx.save();
            ctx.beginPath();
            ctx.arc(AVATAR.x + AVATAR.size / 2, AVATAR.y + AVATAR.size / 2, AVATAR.size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
            ctx.restore();

            leftWrapText(ctx, "Lemon", 240, 20, "bold 32px Arial", textColor, 300, 30);
            leftWrapText(ctx, "@LemonSync", 270, 20, "22px Arial", textColor, 300, 30);
            leftWrapText(ctx, desc, 300, 20, "19px Arial", textColor, 300, 30);

            const statX = 650;
            const iconX = 685;
            const statColor = "#1a1a1a";
            const iconColor = "#007bff";
            const font = "bold 20px Arial";

            for (const s of stats) {
              rightWrapText(ctx, s.icon, s.y, iconX, font, iconColor, 300, 30);
              rightWrapText(ctx, s.label, s.y, statX, font, statColor, 300, 30);
            }
            break;
          }
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
    const width = 700;
    const height = 400;
    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#004c08ff";
    ctx.fillRect(0, 0, width, height);
    wrapText(ctx, `Error, Please call the developer for repair this`, 130, 360, "bold 40px Arial", "#ffffff", 500, 50
    );
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
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
