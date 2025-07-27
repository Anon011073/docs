document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser) {
        window.location.href = '/login.html';
        return;
    }

    const user = users.find(u => u.username === loggedInUser);
    if (user) {
        document.getElementById('username-heading').textContent = `${user.username}'s Profile`;
        const savedVideosGrid = document.getElementById('saved-videos-grid');
        savedVideosGrid.innerHTML = '';
        user.savedVideos.forEach(videoId => {
            const video = videos.find(v => v.id === videoId);
            if (video) {
                const videoElement = document.createElement('div');
                videoElement.classList.add('video-item');
                videoElement.innerHTML = `
                    <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank">
                        <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="Video thumbnail">
                    </a>
                `;
                savedVideosGrid.appendChild(videoElement);
            }
        });
    }

    const userActions = document.querySelector('.user-actions');
    userActions.innerHTML = `
        <a href="/profile">${loggedInUser}</a>
        <a href="#" id="logout">Logout</a>
    `;
    document.getElementById('logout').addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        window.location.href = '/';
    });
});
