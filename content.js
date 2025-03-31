chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startDownload") {

        console.log("Download starting...")

        const videos = Array.from(document.getElementsByTagName("video"));
        const urls = videos.map(v => v.getAttribute("src")).filter(Boolean);

        window.alert(`Start Downloading ${videos.length} videos from ${window.location.hostname}.`)

        urls.forEach(async (url, index) => {
            try {

                const videoName = `video${index + 1}.mp4`
                console.log(`Start analysing ${videoName}...`)

                const response = await fetch(url);
                const blob = await response.blob();

                console.log(`Finished analysing ${videoName}, start downloading...`)

                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");

                a.href = blobUrl;
                a.download = videoName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(blobUrl);
            } catch (error) {
                console.error("Download failed:", error);
            }
        });
    }
});
