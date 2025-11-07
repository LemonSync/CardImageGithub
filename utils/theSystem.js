const { wrapSVGText, capitalize } = require("./allFunction");

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
        <circle class="circle" cx="20" cy="9" r="22"></circle>
        <text class="excl" x="15" y="16" font-size="26">!</text>
      </g>

      <g transform="translate(80,${height / 2 - 6})">
        <text class="msg" x="0" y="-25">${svgMultiline(message)}</text>
        <text class="sub" x="0" y="-5">${svgMultiline(subtitle)}</text>
        <text class="sub" x="0" y="20">${svgMultiline(desc)}</text>
      </g>
    </g>

  </svg>`;
}





/**
 * Generate SVG Card
 * @param {string} image - The Avatar Image in Base64
 * @param {string} name - The Github account name
 * @param {string} desc - The Description or Bio
 * @param {number} age - The Age.
 * @param {string} study - The Study.
 * @param {number} religion - The religion.
 * @param {string} job - The Job
 * @param {number} number - The phone number
 * @param {string} email - The email
 * @param {string} hobby - The Hobby
 * @param {number} totalStars - Github Star
 * @param {number} totalRepos - Github Repositories
 * @param {number} totalIssues - Github Issue
 * @param {string} location - The Adress
 * @param {number} totalPullRequests - Github Pull Request
 * @param {number} followers - Github Follower
 * @returns {string} - SVG dalam bentuk string
 */

function generateSVG(
  image = "",
  name = "Not Found",
  desc = wrapSVGText("None", 50, 17),
  age,
  study = "-",
  religion = "Private",
  job = "-",
  number = "Private",
  email = "Private",
  hobby = "-",
  totalStars = 0,
  totalRepos = 0,
  totalIssues = 0,
  location = "Unknow",
  totalPullRequests = 0,
  followers = 0
) {

  const uid = Date.now().toString(36);
  const titleId = `title-${uid}`;
  const descId = `desc-${uid}`;

  age = (typeof age === "number") ? age : "Private";
  number = (typeof number === "number") ? `+${number}` : "Private";

  const svg = `
<svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
  <title id="${titleId}">${escapeXML("Lemon Card - SVG Card")}</title>
  <desc id="${descId}">${escapeXML("LemonSync")}</desc>
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


      .del-mainAbout { animation-delay: 14.55s; }
      .del-name { animation-delay: 14.65s; }
      .del-age { animation-delay: 14.75s; }
      .del-study { animation-delay: 14.85s; }
      .del-religion { animation-delay: 14.95s; }
      .del-moreInfo { animation-delay: 15.05s; }
      .del-job { animation-delay: 15.15s; }
      .del-number { animation-delay: 15.25s; }
      .del-email { animation-delay: 15.35s; }
      .del-hobby { animation-delay: 15.45s; }

      .del-star { animation-delay: 15.6s; }
      .del-repo { animation-delay: 15.7s; }
      .del-issue { animation-delay: 15.8s; }
      .del-loc { animation-delay: 15.9s; }
      .del-pull { animation-delay: 16s; }
      .del-follow { animation-delay: 16.1s; }

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


  <g transform="translate(135,56)" class="fade-up del-1">
  <clipPath id="avclip">
    <circle cx="300" cy="100" r="60"/>
  </clipPath>

  <image
    href="data:image/png;base64,${image}"
    x="240"
    y="40"
    width="120"
    height="120"
    clip-path="url(#avatarClip)"
    preserveAspectRatio="xMidYMid slice"
    class="fade-up del-1"
  />

  <circle cx="300" cy="100" r="60" class="glow"
          fill="none" stroke="#00000040" stroke-width="2"/>
  </g>
  
  <circle cx="300" cy="100" r="90"
          fill="white"
          class="glow fade-up del-1"/>

  <text x="300" y="200" font-size="24"
        text-anchor="middle"
        font-family="Ubuntu, sans-serif"
        fill="#FFFF"
        class="fade-up del-2"
        letter-spacing="5"
        font-weight="600">${name}</text>

  <text x="300" y="240"
        text-anchor="middle"
        font-family="Ubuntu, sans-serif"
        fill="#FFFF"
        class="fade-up del-3"
        font-size="14">${desc}</text>

  <text x="25" y="340"
        text-anchor="start"
        font-family="Ubuntu, sans-serif"
        fill="#9b9b9bff"
        class="fade-up del-mainAbout"
        font-weight="bold"
        font-size="16">Main About</text>

  <text x="40" y="370"
        text-anchor="start"
        font-family="Ubuntu, sans-serif"
        fill="#ffffffff"
        class="fade-up del-name"
        font-size="14">Name: ${capitalize(name)}</text>

  <text x="40" y="395"
        text-anchor="start"
        font-family="Ubuntu, sans-serif"
        fill="#ffffffff"
        class="fade-up del-age"
        font-size="14">Age: ${age}</text>

  <text x="40" y="420"
        text-anchor="start"
        font-family="Ubuntu, sans-serif"
        fill="#ffffffff"
        class="fade-up del-study"
        font-size="14">Study: ${study}</text>

  <text x="40" y="445"
        text-anchor="start"
        font-family="Ubuntu, sans-serif"
        fill="#ffffffff"
        class="fade-up del-religion"
        font-size="14">Religion: ${religion}</text>

  <text x="315" y="340"
        text-anchor="start"
        font-family="Ubuntu, sans-serif"
        fill="#9b9b9bff"
        class="fade-up del-moreInfo"
        font-weight="bold"
        font-size="16">More Info</text>

  <text x="340" y="370"
        text-anchor="start"
        font-family="Ubuntu, sans-serif"
        fill="#ffffffff"
        class="fade-up del-job"
        font-size="14">Job: ${job}</text>

  <text x="340" y="395"
        text-anchor="start"
        font-family="Ubuntu, sans-serif"
        fill="#ffffffff"
        class="fade-up del-number"
        font-size="14">Number: ${number}</text>

  <text x="340" y="420"
        text-anchor="start"
        font-family="Ubuntu, sans-serif"
        fill="#ffffffff"
        class="fade-up del-email"
        font-size="14">Gmail: ${email}</text>

  <text x="340" y="445"
        text-anchor="start"
        font-family="Ubuntu, sans-serif"
        fill="#ffffffff"
        class="fade-up del-hobby"
        font-size="14">Hobby: ${hobby}</text>

  <text x="30" y="570"
        font-size="15px"
        fill="#FFFF"
        font-family="Ubuntu, sans-serif"
        class="fade-up del-star">
    ⭐: ${totalStars} ${totalStars <= 1 ? "Star" : "Stars"}
  </text>

  <text x="30" y="590"
        font-size="15px"
        fill="#FFFF"
        font-family="Ubuntu, sans-serif"
        class="fade-up del-repo">
    📦: ${totalRepos} ${totalRepos <= 1 ? "Repo" : "Repos"}
  </text>

  <text x="250" y="570"
        font-size="15px"
        fill="#FFFF"
        font-family="Ubuntu, sans-serif"
        class="fade-up del-issue">
    🗣 : ${totalIssues} ${totalIssues <= 1 ? "Issue" : "Issues"}
  </text>

  <text x="250" y="590"
        font-size="15px"
        fill="#FFFF"
        font-family="Ubuntu, sans-serif"
        class="fade-up del-loc">
    🏠: ${location}
  </text>

  <text x="470" y="570"
        font-size="15px"
        fill="#FFFF"
        font-family="Ubuntu, sans-serif"
        class="fade-up del-pull">
    🔀: ${totalPullRequests} ${totalPullRequests <= 1 ? "Pull" : "Pulls"}
  </text>

<text x="470" y="590"
        font-size="15px"
        fill="#FFFF"
        font-family="Ubuntu, sans-serif"
        class="fade-up del-follow">
    👥: ${followers} ${followers <= 1 ? "Follower" : "Followers"}
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

  return svg;
}

function generateSVG2(
  image = "",
  name = "Not Found",
  desc = wrapSVGText("None", 50, 17)
) {

  const uid = Date.now().toString(36);
  const titleId = `title-${uid}`;
  const descId = `desc-${uid}`;

  const svg = `
  <svg width="500" height="200" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"/>
      <feOffset in="blur" dx="0" dy="0" result="offsetBlur"/>
      <feMerge>
        <feMergeNode in="offsetBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <style>
      @keyframes slideIn {
        0% { transform: translateX(-100px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
      }

      @keyframes glowAnimation {
        0%, 100% { filter: drop-shadow(0 0 5px #00ff00); }
        50% { filter: drop-shadow(0 0 20px #00ff00); }
      }

      .animated-img {
        animation: slideIn 1.5s ease-out forwards;
      }

      .animated-frame {
        animation: slideIn 1.5s ease-out forwards, glowAnimation 2s infinite;
      }

      .profile-text {
        font-family: Arial, sans-serif;
        font-size: 14px;
        font-weight: bold;
        fill: #ffffff;
        text-anchor: middle;
        opacity: 0;
        animation: slideIn 1.5s ease-out forwards;
      }
    </style>
  </defs>

  <rect x="0" y="0" width="50%" height="100%" fill="#00a458ff" />
  <rect x="50%" y="0" width="50%" height="100%" fill="#216038" />
  <rect x="49%" y="0" width="2%" height="100%" fill="black" opacity="0.3" filter="url(#shadow)" />

  <circle cx="125" cy="70" r="40" fill="url(#imgPattern)" class="animated-img" />
  <!-- Bingkai bulat -->
  <circle cx="125" cy="70" r="42" fill="none" stroke="#00ff00" stroke-width="4" class="animated-frame" />

  <text x="125" y="135" class="profile-text">${name.toUpperCase()}</text>

  <defs>
    <pattern id="imgPattern" patternUnits="userSpaceOnUse" width="80" height="80">
      <image href="https://via.placeholder.com/80" x="0" y="0" width="80" height="80" />
    </pattern>
  </defs>
</svg>

  `;

  return svg;
}

module.exports = { generateErrorSVG, generateSVG, generateSVG2 }
