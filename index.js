const userInput = document.getElementById("userID");
const btn = document.getElementById("btn");
const profile = document.getElementById("userProfile");

/* 🔍 Button click */
btn.addEventListener("click", () => {
    const username = userInput.value.trim();

    if (username === "") {
        alert("Please enter GitHub username 🌿");
        return;
    }

    profile.innerHTML = `<div class="loader"></div>`;
    fetchUser(username);
});

/* ⌨️ Enter key support */
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
});

/* 🌐 Fetch GitHub User */
async function fetchUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        displayUser(data);
    } catch (error) {
        profile.innerHTML = `<h2>Network Error 🌧️</h2>`;
    }
}

/* 🔢 Number animation */
function animateCount(element, target) {
    let count = 0;
    const speed = 20;

    const interval = setInterval(() => {
        if (count >= target) {
            element.innerText = target;
            clearInterval(interval);
        } else {
            count++;
            element.innerText = count;
        }
    }, speed);
}

/* 🎴 Display User */
function displayUser(user) {
    if (!user.avatar_url) {
        profile.innerHTML = `<h2>User Not Found 🍂</h2>`;
        return;
    }

    profile.innerHTML = `
        <div class="userInfo">
            <img src="${user.avatar_url}" class="userImg" alt="Profile Image">

            <p class="userName">${user.name || "No Name Available"}</p>
            <p class="userBio">${user.bio || ""}</p>

            <div class="stats">
                <div class="stat">
                    <p id="followers">0</p>
                    <span>Followers</span>
                </div>
                <div class="stat">
                    <p id="following">0</p>
                    <span>Following</span>
                </div>
                <div class="stat">
                    <p id="repos">0</p>
                    <span>Repos</span>
                </div>
            </div>

            <a href="${user.html_url}" target="_blank" class="visit">
                Visit GitHub
            </a>
        </div>
    `;

    /* ✨ Animate numbers */
    animateCount(document.getElementById("followers"), user.followers);
    animateCount(document.getElementById("following"), user.following);
    animateCount(document.getElementById("repos"), user.public_repos);
}
