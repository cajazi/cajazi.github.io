export type GitHubRepo = {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
};

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub repos");
  }

  const data = await res.json();

  return data.map((repo: any) => ({
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
  }));
}
