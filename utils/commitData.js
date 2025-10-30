// utils/commitData.js
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function getTotalCommits(username) {
  try {
    // 1️⃣ Ambil daftar repo publik
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await repoRes.json();

    if (!Array.isArray(repos)) throw new Error("Gagal mengambil repositori");

    let totalCommits = 0;

    // 2️⃣ Loop setiap repo, ambil data kontributor
    for (const repo of repos.slice(0, 30)) { // batasi 30 repo pertama
      const statsUrl = `https://api.github.com/repos/${username}/${repo.name}/stats/contributors`;
      const statsRes = await fetch(statsUrl);
      const stats = await statsRes.json();

      // Kadang API GitHub butuh waktu untuk generate stats (hasilnya null)
      if (!Array.isArray(stats)) continue;

      const userStats = stats.find(c => c.author && c.author.login.toLowerCase() === username.toLowerCase());
      if (userStats) {
        totalCommits += userStats.total;
      }

      // Delay kecil agar tidak rate-limited
      await new Promise(r => setTimeout(r, 300));
    }

    return totalCommits;
  } catch (err) {
    console.error("❌ Gagal mengambil commit:", err.message);
    return 0;
  }
}

module.exports = { getTotalCommits };
