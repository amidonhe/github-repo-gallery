const overview = document.querySelector(".overview");
const username = "amidonhe";
const repoList = document.querySelector(".repo-list");
const repoClass = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

//API access for Github profile data
const gitUser = async function () {
    const fetchUser = await fetch(`https://api.github.com/users/${username}`);
    const userData = await fetchUser.json();
    displayUserInfo(userData);
};

gitUser();

//Where profile information appears
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = 
    `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(div);
    gitRepos();
};

//API access for Github repos
const gitRepos = async function () {
  const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const reposData = await fetchRepos.json();
  displayRepos(reposData);
};

//Where list of repos appears
const displayRepos = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

//Click function for repo list details
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
  const repoName = e.target.innerText;
  gitRepoInfo(repoName); 
}
});

//API access for Github repo details
const gitRepoInfo = async function (repoName) {
  const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchRepoInfo.json();
  console.log(repoInfo);
  //Fetch languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  const languages = [];
    for (const language in languageData) {
      languages.push(language);
    }
  displayRepoInfo(repoInfo, languages);
};

//Display Github repo details including language
const displayRepoInfo = function (repoInfo, languages) {
  viewReposButton.classList.remove("hide");
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repoClass.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
  repoData.append(div);
};

//Back to repo gallery button
viewReposButton.addEventListener("click", function () {
  repoClass.classList.remove("hide");
  repoData.classList.add("hide");
  viewReposButton.classList.add("hide");
});

//Dynamic search
filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowerCaseSearch = searchText.toLowerCase();
  for (const repo of repos) {
    const lowerCaseRepo = repo.innerText.toLowerCase();
    if (lowerCaseRepo.includes(lowerCaseSearch)) {
      repo.classList.remove("hide");
    } else { 
      repo.classList.add("hide");
    }
  }
});