// This is a mock video system. In a real application, this would be handled by a server.

const videos = [];

function addVideo(title, url, category, tags) {
    const videoId = extractVideoId(url);
    if (!videoId) {
        return { success: false, message: 'Invalid YouTube URL' };
    }
    videos.push({ id: videoId, title: title, url: url, category: category, tags: tags, savedBy: [] });
    return { success: true };
}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function renderVideos(videosToRender = videos) {
    const videoGrid = document.querySelector('.video-grid');
    videoGrid.innerHTML = '';
    videosToRender.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video-item');
        videoElement.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank">
                <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="Video thumbnail">
            </a>
            <div class="video-info">
                <h4>${video.title}</h4>
                <p class="video-category">${video.category}</p>
                <div class="video-tags">
                    ${video.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
            <button class="favorite-video-button" data-video-id="${video.id}">&#x2764;</button>
        `;
        videoGrid.appendChild(videoElement);
    });

    document.querySelectorAll('.favorite-video-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const videoId = e.target.dataset.videoId;
            const loggedInUser = getLoggedInUser();
            if (loggedInUser) {
                const user = users.find(u => u.username === loggedInUser);
                if (user && !user.savedVideos.includes(videoId)) {
                    user.savedVideos.push(videoId);
                    alert('Video favorited!');
                } else {
                    alert('You have already favorited this video.');
                }
            } else {
                alert('You must be logged in to favorite videos.');
            }
        });
    });
}
