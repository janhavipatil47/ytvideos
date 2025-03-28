const API_KEY = "AIzaSyApj0F6j_m5UKtDpT21cEnCaGTDWXBhEMU"; // Replace with your API Key

async function fetchVideos(category) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${category}&maxResults=10&type=video&key=${API_KEY}`);
    const data = await response.json();

    let videoContainer = document.getElementById("videoContainer");
    videoContainer.innerHTML = ""; // Clear previous results

    data.items.forEach(video => {
        let videoElement = document.createElement("div");
        videoElement.classList.add("video");
        videoElement.innerHTML = `
            <iframe width="300" height="200" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allowfullscreen></iframe>
            <p>${video.snippet.title}</p>
        `;
        videoContainer.appendChild(videoElement);
    });
}

// Search Functionality
function searchVideos() {
    let query = document.getElementById("searchBar").value;
    fetchVideos(query);
}
