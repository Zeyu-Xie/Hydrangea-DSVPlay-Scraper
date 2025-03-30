document.getElementById("start-download").addEventListener("click", () => {
  window.alert("Clicked")
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "startDownload" }, (response) => {
      console.log("Finished")
    });
  });
});
