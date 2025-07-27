// This is a mock video system. In a real application, this would be handled by a server.

const videos = [];

function addVideo(url) {
    const videoId = extractVideoId(url);
    if (!videoId) {
        return { success: false, message: 'Invalid YouTube URL' };
    }
    videos.push({ id: videoId, url: url, savedBy: [] });
    return { success: true };
}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function renderVideos() {
    const videoGrid = document.querySelector('.video-grid');
    videoGrid.innerHTML = '';
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video-item');
        videoElement.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank">
                <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="Video thumbnail">
            </a>
            <button class="save-video-button" data-video-id="${video.id}">Save</button>
        `;
        videoGrid.appendChild(videoElement);
    });

    document.querySelectorAll('.save-video-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const videoId = e.target.dataset.videoId;
            const loggedInUser = getLoggedInUser();
            if (loggedInUser) {
                const user = users.find(u => u.username === loggedInUser);
                if (user && !user.savedVideos.includes(videoId)) {
                    user.savedVideos.push(videoId);
                    alert('Video saved!');
                } else {
                    alert('You have already saved this video.');
                }
            } else {
                alert('You must be logged in to save videos.');
            }
        });
    });
}
