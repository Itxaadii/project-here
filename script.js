const form = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const errorMessage = document.getElementById('error-message');
const userDetails = document.getElementById('user-details');
const avatar = document.getElementById('avatar');
const nameEl = document.getElementById('name');
const loginEl = document.getElementById('login');
const bioEl = document.getElementById('bio');
const followersEl = document.getElementById('followers');
const followingEl = document.getElementById('following');
const publicReposEl = document.getElementById('public_repos');
const profileLink = document.getElementById('profile-link');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (!username) return;

    errorMessage.textContent = '';
    userDetails.style.display = 'none';

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            if (response.status === 404) {
                errorMessage.textContent = 'User not found.';
            } else {
                errorMessage.textContent = 'Failed to fetch user details.';
            }
            return;
        }
        const data = await response.json();

        avatar.src = data.avatar_url || '';
        nameEl.textContent = data.name || 'No name provided';
        loginEl.textContent = `@${data.login}`;
        bioEl.textContent = data.bio || '';
        followersEl.textContent = data.followers;
        followingEl.textContent = data.following;
        publicReposEl.textContent = data.public_repos;
        profileLink.href = data.html_url;

        userDetails.style.display = 'block';
    } catch (error) {
        errorMessage.textContent = 'Error fetching user details.';
    }
});