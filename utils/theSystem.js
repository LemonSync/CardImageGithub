const { drawCenteredText, drawTextBlock, wrapText, leftWrapText, rightWrapText, drawHexagonLancip, drawHexagonTumpul } = require("./allFunction");

//============================================================

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
            
    leftWrapText(ctx, `Some error, Please visit the repo github.com/LemonSync/repositori and give issue, Lemon gonna fix it` + `\n\n-Lemon`, 180, 18, "bold 20px Arial", "#005709ff", 330, 25);
    rightWrapText(ctx, `The Error:  ` + err.message + `\n\n-Lemon`, 180, width - 18, "bold 20px Arial", "#00e016ff", 330, 25);
            
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
            
    leftWrapText(ctx, text, 180, 18, "bold 20px Arial", "#005709ff", 330, 25);
    rightWrapText(ctx, `-Lemon`, 180, width - 18, "bold 20px Arial", "#00e016ff", 330, 25);
            
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

    const template = await Canvas.loadImage("../media/image/template1.jpg");
    ctx.drawImage(template, 0, 0, width, height);

    const AVATAR = { size: 362, x: -31, y: 124 };
    ctx.save();
    ctx.beginPath();
    ctx.arc(AVATAR.x + AVATAR.size / 2, AVATAR.y + AVATAR.size / 2, AVATAR.size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
    ctx.restore();

    leftWrapText(ctx, name, 160, 380, "bold 40px Arial", "#ffff", 330, 40);
    leftWrapText(ctx, login, 180, 380, "20px Arial", "#ffff", 330, 40);
    leftWrapText(ctx, desc, 220, 380, "24px Arial", "#ffff", 330, 25);

    leftWrapText(ctx, `@` + twitter, 615, 550, "19px Arial", "#ffff", 180, 25);
    leftWrapText(ctx, `@` + facebook, 660, 550, "19px Arial", "#ffff", 180, 25);
    leftWrapText(ctx, no, 705, 550, "19px Arial", "#ffff", 180, 25);

    leftWrapText(ctx, `⭐ : `, 625, 70, "19px Arial", "#ff9500ff", 180, 25);
    leftWrapText(ctx, `📦 : `, 655, 70, "19px Arial", "#ff9500ff", 180, 25);
    leftWrapText(ctx, `🏠 : `, 685, 70, "19px Arial", "#ff9500ff", 180, 25);
    leftWrapText(ctx, `👥 : `, 715, 70, "19px Arial", "#ff9500ff", 180, 25);

    leftWrapText(ctx, star + ` ${star <= 1 ? "Star" : "Stars"}`, 625, 120, "19px Arial", "#ffff", 180, 25);
    leftWrapText(ctx, repo + ` ${repo <= 1 ? "Repo" : "Repos"}`, 655, 120, "19px Arial", "#ffff", 180, 25);
    leftWrapText(ctx, locate, 685, 120, "19px Arial", "#ffff", 180, 25);
    leftWrapText(ctx, follower + ` ${follower <= 1 ? "Follower" : "Followers"}`, 715, 120, "19px Arial", "#ffff", 180, 25);

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

        const template = await Canvas.loadImage("../media/image/template2.jpg");
        ctx.drawImage(template, 0, 0, width, height);

        const AVATAR = { size: 560, x: 411, y: -66 };

        ctx.save();
        ctx.beginPath();
        ctx.arc(AVATAR.x + AVATAR.size / 2, AVATAR.y + AVATAR.size / 2, AVATAR.size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
        ctx.restore();

        leftWrapText(ctx, name, 100, 30, "bold 40px Arial", "#ffff", 330, 40);
        leftWrapText(ctx, login, 123, 30, "20px Arial", "#ffff", 330, 40);
        leftWrapText(ctx, desc, 160, 30, "24px Arial", "#ffff", 330, 25);

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

        const template = await Canvas.loadImage("../media/image/template3.jpg");
        ctx.drawImage(template, 0, 0, width, height);

        const AVATAR = { size: 300, x: 304, y: 202 };

        ctx.save();
drawHexagonTumpul(ctx, AVATAR.x, AVATAR.y, AVATAR.size);
ctx.drawImage(avatarImg, AVATAR.x, AVATAR.y, AVATAR.size, AVATAR.size);
ctx.restore();


        if (name.length >= 17) {
            drawCenteredText(ctx, name, 560, "bold 30px Arial", "#ffd391ff", 910);
        } else {
        drawCenteredText(ctx, name, 565, "bold 40px Arial", "#ffd391ff", 910);
        }

        const output = canvas.toBuffer("image/png");
        res.setHeader("Content-Type", "image/png");
        res.send(output);

        } catch (err) {
            
        errorMessage(res, Canvas, err);

        }
}


module.exports = { typeOneFunction, typeTwoFunction, typeThreeFunction, SpecialErrorMessage }

