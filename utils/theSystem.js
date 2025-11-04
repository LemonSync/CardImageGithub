const { drawCenteredText, drawTextBlock, wrapText, leftWrapText, rightWrapText, drawHexagonLancip, drawHexagonTumpul } = require("./allFunction");
const Canvas = require("canvas");
const path = require("path");

//============================================================

Canvas.registerFont(path.join(__dirname, "..", "fonts", "Arimo-Regular.ttf"), {
  family: "Arimo"
});


function errorMessage(
    res,
    Canvas,
    err
) {

    const width = 700;
    const height = 400;
    const canvas = Canvas.createCanvas(700, 400);
    const ctx = canvas.getContext("2d");
            
    ctx.fillStyle = "#00870dff";
    ctx.fillRect(0, 0, width / 2, height);
    ctx.fillStyle = "#005709ff";
    ctx.fillRect(width / 2, 0, width, height);
            
    leftWrapText(ctx, `Some error, Please visit the repo github.com/LemonSync/repositori and give issue, Lemon gonna fix it` + `\n\n-Lemon`, 180, 18, "bold 20px Arimo", "#005709ff", 330, 25);
    rightWrapText(ctx, `The Error:  ` + err.message + `\n\n- Lemon`, 180, width - 18, "bold 20px Arimo", "#00e016ff", 330, 25);
            
    const output = canvas.toBuffer("image/png");
    res.setHeader("Content-Type", "image/png");
    res.send(output);

}

//=============================================================

function SpecialErrorMessage(
    res,
    Canvas,
    text = String
) {

    const width = 700;
    const height = 400;
    const canvas = Canvas.createCanvas(700, 400);
    const ctx = canvas.getContext("2d");
            
    ctx.fillStyle = "#00870dff";
    ctx.fillRect(0, 0, width / 2, height);
    ctx.fillStyle = "#005709ff";
    ctx.fillRect(width / 2, 0, width, height);
            
    leftWrapText(ctx, text, 180, 18, "bold 20px Arimo", "#005709ff", 330, 25);
    rightWrapText(ctx, `-Lemon`, 180, width - 18, "bold 20px Arimo", "#00e016ff", 330, 25);
            
    const output = canvas.toBuffer("image/png");
    res.setHeader("Content-Type", "image/png");
    return res.send(output);

}

//==============================================================

async function typeOneFunction(
    res,
    Canvas,
    profile = path,
    name = String,
    login = String,
    desc = String,
    twitter = String,
    facebook = String,
    no = String,
    star = Number,
    repo = Number,
    locate = String,
    follower = Number
) {
        try {
            
    const width = 736;
    const height = 736;
    const avatarImg = await Canvas.loadImage(profile);

    const canvas = Canvas.createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    const template = await Canvas.loadImage(
  path.join(__dirname, "..", "media", "image", "template1.jpg")
);
    ctx.drawImage(template, 0, 0, width, height);

    const AVATAR = { size: 362, x: -31, y: 124 };
    ctx.save();
    ctx.beginPath();
    ctx.arc(AVATAR.x + AVATAR.size / 2, AVATAR.y + AVATAR.size / 2, AVATAR.size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
    ctx.restore();

    leftWrapText(ctx, name, 160, 380, "bold 40px Arimo", "#ffff", 330, 40);
    leftWrapText(ctx, login, 180, 380, "20px Arimo", "#ffff", 330, 40);
    leftWrapText(ctx, desc, 220, 380, "24px Arimo", "#ffff", 330, 25);

    leftWrapText(ctx, `@` + twitter, 615, 550, "19px Arimo", "#ffff", 180, 25);
    leftWrapText(ctx, `@` + facebook, 660, 550, "19px Arimo", "#ffff", 180, 25);
    leftWrapText(ctx, no, 705, 550, "19px Arimo", "#ffff", 180, 25);

    leftWrapText(ctx, `⭐ : `, 625, 70, "19px Arimo", "#ff9500ff", 180, 25);
    leftWrapText(ctx, `📦 : `, 655, 70, "19px Arimo", "#ff9500ff", 180, 25);
    leftWrapText(ctx, `🏠 : `, 685, 70, "19px Arimo", "#ff9500ff", 180, 25);
    leftWrapText(ctx, `👥 : `, 715, 70, "19px Arimo", "#ff9500ff", 180, 25);

    leftWrapText(ctx, star + ` ${star <= 1 ? "Star" : "Stars"}`, 625, 120, "19px Arimo", "#ffff", 180, 25);
    leftWrapText(ctx, repo + ` ${repo <= 1 ? "Repo" : "Repos"}`, 655, 120, "19px Arimo", "#ffff", 180, 25);
    leftWrapText(ctx, locate, 685, 120, "19px Arimo", "#ffff", 180, 25);
    leftWrapText(ctx, follower + ` ${follower <= 1 ? "Follower" : "Followers"}`, 715, 120, "19px Arimo", "#ffff", 180, 25);

    const output = canvas.toBuffer("image/png");
        res.setHeader("Content-Type", "image/png");
        res.send(output);

    } catch (err) {
    
            errorMessage(res, Canvas, err);
    
    }
}

//=======================================================================

async function typeTwoFunction(
    res,
    Canvas,
    profile = path,
    name = String,
    login = String,
    desc = String
) {
        try {

        const width = 736;
        const height = 420;
        const avatarImg = await Canvas.loadImage(profile);

        const canvas = Canvas.createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        const template = await Canvas.loadImage(
  path.join(__dirname, "..", "media", "image", "template2.jpg")
);

        ctx.drawImage(template, 0, 0, width, height);

        const AVATAR = { size: 560, x: 411, y: -66 };

        ctx.save();
        ctx.beginPath();
        ctx.arc(AVATAR.x + AVATAR.size / 2, AVATAR.y + AVATAR.size / 2, AVATAR.size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
        ctx.restore();

        leftWrapText(ctx, name, 100, 30, "bold 40px Arimo", "#ffff", 330, 40);
        leftWrapText(ctx, `@` + login, 123, 30, "20px Arimo", "#ffff", 330, 40);
        leftWrapText(ctx, desc, 160, 30, "24px Arimo", "#ffff", 330, 25);

        const output = canvas.toBuffer("image/png");
        res.setHeader("Content-Type", "image/png");
        res.send(output);

        } catch (err) {
            
        errorMessage(res, Canvas, err);

        }
}

async function typeThreeFunction(
    res,
    Canvas,
    profile = path,
    name = String,
    login = String,
    desc = String
) {
        try {

        const width = 736;
        const height = 736;
        const avatarImg = await Canvas.loadImage(profile);

        const canvas = Canvas.createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        const template = await Canvas.loadImage(
  path.join(__dirname, "..", "media", "image", "template3.jpg")
);

        ctx.drawImage(template, 0, 0, width, height);

        const AVATAR = { size: 300, x: 304, y: 202 };

        ctx.save();
drawHexagonTumpul(ctx, AVATAR.x, AVATAR.y, AVATAR.size);
ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
ctx.restore();


        if (name.length >= 17) {
            drawCenteredText(ctx, name, 560, "bold 30px Arimo", "#ffd391ff", 910);
        } else {
        drawCenteredText(ctx, name, 565, "bold 40px Arimo", "#ffd391ff", 910);
        }

        const output = canvas.toBuffer("image/png");
        res.setHeader("Content-Type", "image/png");
        res.send(output);

        } catch (err) {
            
        errorMessage(res, Canvas, err);

        }
}


function escapeXML(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function svgMultiline(text, lineHeight = 18) {
  return escapeXML(text)
    .split('\n')
    .map((line, i) => `<tspan x="0" dy="${i === 0 ? 0 : lineHeight}">${line}</tspan>`)
    .join('');
}


//=======================================================================

/**
 * Generate SVG Error Card
 * @param {string} message - Pesan utama (ex: "Error, Harap isi Username")
 * @param {string} subtitle - Pesan tambahan (ex: "Form tidak dapat diproses sebelum username diisi")
 * @param {number} width - Lebar SVG (default 640)
 * @param {number} height - Tinggi SVG (default 120)
 * @returns {string} - SVG dalam bentuk string
 */

function generateErrorSVG(
  message = "Terjadi Kesalahan",
  subtitle = "Silahkan coba lagi.",
  desc = "Jika masalah berlanjut, lapor ke repo.",
  width = 950,
  height = 120
) {
  const uid = Date.now().toString(36);
  const titleId = `title-${uid}`;
  const descId = `desc-${uid}`;

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"
       viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="${titleId} ${descId}">
    <title id="${titleId}">${escapeXML(message)}</title>
    <desc id="${descId}">${escapeXML(subtitle)}</desc>

    <style>
      .bg { fill: #2b2b2b; }
      .card { rx: 10; ry: 10; fill: #fff; filter: drop-shadow(0 6px 16px rgba(0,0,0,0.25)); }
      .circle { fill: #ff4d4f; }
      .excl { fill: white; font-weight: 700; font-family: Arial, Helvetica, sans-serif; }
      .msg { font-family: "Inter", Arial, Helvetica, sans-serif; font-size: 20px; fill: #1f1f1f; font-weight: 600; }
      .sub { font-size: 14px; fill: #666666; font-weight: 400; }
      .pulse { transform-origin: center; animation: pulse 1.2s infinite; }
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.06); opacity: 0.92; }
        100% { transform: scale(1); opacity: 1; }
      }
      .msg, .sub { font-synthesis: none; -webkit-font-smoothing: antialiased; }
    </style>

    <rect width="100%" height="100%" class="bg"/>

    <g transform="translate(16,14)">
      <rect width="${width - 32}" height="${height - 28}" class="card"></rect>

      <g class="pulse" transform="translate(26,${height / 2})">
        <circle class="circle" cx="0" cy="0" r="22"></circle>
        <text class="excl" x="-7" y="8" font-size="26">!</text>
      </g>

      <g transform="translate(80,${height / 2 - 6})">
        <text class="msg" x="0" y="-25">${svgMultiline(message)}</text>
        <text class="sub" x="0" y="-5">${svgMultiline(subtitle)}</text>
        <text class="sub" x="0" y="20">${svgMultiline(desc)}</text>
      </g>
    </g>

  </svg>`;
}




module.exports = { typeOneFunction, typeTwoFunction, typeThreeFunction, SpecialErrorMessage, generateErrorSVG }
