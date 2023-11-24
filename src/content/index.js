let url = "";

(function () {
  console.log("content");
  const allLinks = document.querySelectorAll("a");

  allLinks.forEach((link) => {
    link.addEventListener("mouseover", (e) => {
      e.preventDefault();
      console.log(link.href);
      url = link.href;
    });

    link.style.position = "relative";
    // link.style.color   = "red";
    link.classList.add("s-link");

    const popover = document.createElement("div");
    popover.classList.add("s-popover");
    // popover.dataset.url = link.href;
    popover.setAttribute("id", link.href);
    popover.innerHTML = `
            <div class="s-container">
                <div class="right">
                    <div class="circle">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m13.06 8.11l1.415 1.415a7 7 0 0 1 0 9.9l-.354.353a7 7 0 1 1-9.9-9.9l1.415 1.415a5 5 0 0 0 7.07 7.07l.354-.353a5 5 0 0 0 0-7.07l-1.414-1.415L13.06 8.11Zm6.718 6.011l-1.414-1.414a5 5 0 0 0-7.071-7.071l-.354.353a5 5 0 0 0 0 7.071l1.414 1.415l-1.414 1.414l-1.414-1.414a7 7 0 0 1 0-9.9l.353-.353a7 7 0 0 1 9.9 9.9Z"/></svg>
                    </div>
                </div>
            </div>
        `;
    link.appendChild(popover);
  });
})();

const allPopover = document.querySelectorAll(".s-popover .s-container");

allPopover.forEach((popover) => {
  popover.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(url);
    const shortLink = await convertToShortLink(url);
    alert(JSON.parse(shortLink).shortUrl);
    console.log("clicked");
    continueToUrl(shortLink);
  });
});

const continueToUrl = (url) => {
  // window.open(url, "_blank");
};

async function convertToShortLink(link) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ originalUrl: link }),
  };

  try {
    const response = await fetch("http://localhost:8080/", requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
