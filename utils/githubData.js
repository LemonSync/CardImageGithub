const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));


async function getGithubData(username) {
  if (!username) throw new Error("Username is required");

  const token = process.env.GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};

  const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
  const user = await userRes.json();

  if (user.message === "Not Found") {
    throw new Error("User not found");
  }

  const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
  const reposJson = await repoRes.json();
  const repos = Array.isArray(reposJson) ? reposJson : [];

  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
  const totalRepos = repos.length;

  let totalPullRequests = 0;
  let totalIssues = 0;
  try {
    const prQuery = encodeURIComponent(`author:${username} type:pr`);
    const issueQuery = encodeURIComponent(`author:${username} type:issue`);

    const [prRes, issueRes] = await Promise.all([
      fetch(`https://api.github.com/search/issues?q=${prQuery}`, { headers }),
      fetch(`https://api.github.com/search/issues?q=${issueQuery}`, { headers }),
    ]);

    const prData = await prRes.json();
    const issueData = await issueRes.json();

    if (prData && typeof prData.total_count === "number") {
      totalPullRequests = prData.total_count;
    }
    if (issueData && typeof issueData.total_count === "number") {
      totalIssues = issueData.total_count;
    }
  } catch (err) {
    // Jika error (mis. rate limit), kita tetap kembalikan nilai default 0
    // dan tidak menggagalkan keseluruhan permintaan.
    // console.warn(`Could not fetch PR/issue counts: ${err.message}`);
  }

  return {
    name: user.name || "No Name",
    login: user.login,
    desc: user.bio || "No Bio",
    locate: user.location || "No Location",
    follower: user.followers || 0,
    avatar_url: user.avatar_url,
    totalStars,
    totalRepos,
    totalPullRequests,
    totalIssues,
  };
}

module.exports = { getGithubData };

