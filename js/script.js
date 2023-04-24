const overview = document.querySelector(".overview");
const username = "amidonhe";

//API access for Github profile data
const getUser = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayUserInfo(data);
};

getUser();

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
};