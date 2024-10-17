let controller;
let url = "./video.mp4";

const downloadBtn = document.querySelector(".download");
const abortBtn = document.querySelector(".abort");

downloadBtn.addEventListener("click", fetchVideo);

abortBtn.addEventListener("click", () => {
  if (controller) {
    controller.abort();
    console.log("Download aborted");
  }
});

// Helper function to introduce a delay (in milliseconds)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchVideo() {
  controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await fetch(url, { signal });

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const contentLength = +response.headers.get("Content-Length");

    let receivedLength = 0;
    let chunks = [];

    while (true) {
      // Read the next chunk of data from the stream
      const { done, value } = await reader.read();

      // If the stream is done, exit the loop
      if (done) {
        console.log("Download complete");
        break;
      }

      chunks.push(value);
      receivedLength += value.length;

      console.log(`Received ${receivedLength} of ${contentLength}`);

      // Introduce a delay between chunks
      await delay(4000); // 4000 ms delay between reading chunks
    }

    // Further processing of the response (e.g., concatenating the chunks)
    const blob = new Blob(chunks);
    url = URL.createObjectURL(blob);
    console.log("Video blob URL:", url);

    // Here, you could set the blob URL as the source of a video element, etc.
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("Fetch aborted");
    } else {
      console.error(`Download error: ${err.message}`);
    }
  }
}