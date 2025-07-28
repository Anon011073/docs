// This is a mock video system. In a real application, this would be handled by a server.

let videos = JSON.parse(localStorage.getItem('videos')) || [];

function saveVideos() {
    localStorage.setItem('videos', JSON.stringify(videos));
}

function addVideo(title, url, description, category, tags) {
    const videoId = extractVideoId(url);
    if (!videoId) {
        return { success: false, message: 'Invalid YouTube URL' };
    }
    videos.push({ id: videoId, title: title, url: url, description: description, category: category, tags: tags, savedBy: [] });
    saveVideos();
    return { success: true };
}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function renderVideos(videosToRender = videos) {
    const videoGrid = document.getElementById('video-grid');
    videoGrid.innerHTML = '';
    videosToRender.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-20');
        videoElement.innerHTML = `
            <div>
                <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank">
                    <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" class="img-fluid rounded-top" alt="Video thumbnail">
                </a>
                <div class="card-body">
                    <h4 class="card-title">${video.title}</h4>
                    <p class="text-muted">${video.category}</p>
                    <div class="video-tags">
                        ${video.tags.map(tag => `<span class="badge badge-primary">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger favorite-video-button" data-video-id="${video.id}"><i class="fas fa-heart"></i></button>
                </div>
            </div>
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
