const express = require("express");
const cors = require("cors");
const Canvas = require("canvas");

const { typeOneFunction, typeTwoFunction, typeThreeFunction, SpecialErrorMessage } = require("./utils/theSystem");

const { drawCenteredText, drawTextBlock, wrapText, leftWrapText, rightWrapText } = require("./utils/allFunction");

const app = express();
app.use(cors());

// ============================

const github = {};
github.profile = "./profile.jpg";
github.name = `Lemon`;
github.login = `@LemonSync`;
github.desc = `Saya adalah seseorang yang misterius dan kejam, yang akan segera memakan kamu diam diam, berwaspadalah akan kedatanganku .....`;
github.twitter = `LemonSync`;
github.facebook = `Lemon`;
github.no = `+62 217 217 234`;
github.email = `grouplemon0@gmail.com`
github.repo = 16;
github.star = 111;
github.locate = `Indonesian`;
github.follower = 46; 

//=============================

app.get("/", (req, res) => {
    res.send("🚀 Server berhasil dijalankan")
})

app.get("/api/github-card/", async (req, res) => {
    const { username, desc = "Orang yang pengen jadi programmer tapi enggan ngoding", type } = req.query;

    if (!username) {

        SpecialErrorMessage(
        res,
        Canvas,
        `Please enter the username`
      )
      
    }

    const typeNum = parseInt(type);
    if (isNaN(typeNum)) {

      SpecialErrorMessage(
        res,
        Canvas,
        `Invalid type format, Only 1 - 6 available`
      )

    }

    if (typeNum == 1) {

        typeOneFunction(
            res,
            Canvas,
            github.profile,
            github.name,
            github.login,
            github.desc,
            github.twitter,
            github.facebook,
            github.no,
            github.star,
            github.repo,
            github.locate,
            github.follower
        )

    } else if (typeNum == 2) {

        typeTwoFunction(
            res,
            Canvas,
            github.profile,
            github.name,
            github.login,
            github.desc
        )

    } else if (typeNum == 3) {

        typeThreeFunction(
            res,
            Canvas,
            github.profile,
            github.name
        )

    }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
