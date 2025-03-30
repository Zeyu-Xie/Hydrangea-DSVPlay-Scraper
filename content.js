chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startDownload") {
        const videos = Array.from(document.getElementsByTagName("video"));
        const urls = videos.map(v => v.getAttribute("src")).filter(Boolean);

        urls.forEach(async (url, index) => {
            try {
                const response = await fetch(url);
                const blob = await response.blob();

                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = `video${index + 1}.mp4`;
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
