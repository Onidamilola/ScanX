// script.js

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    const fullname = document.getElementById("fullname").value;
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const region = document.getElementById("region").value;
    const outletName = document.getElementById("outletName").value;
    const outletLocation = document.getElementById("outletLocation").value;
    const agency = document.getElementById("agency").value;

    // Display message while processing
    document.getElementById("status").innerText = "Logging in...";

    // Prepare data to send to Google Sheets
    fetch(
      "https://script.google.com/macros/s/AKfycbzddkZMM6Y799J_JTbrABQMO2Zk5Q82xXPFWiezZzFqFHiuygD8-G3l_j1MiLYDZkxmAw/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          fullname,
          address,
          phoneNumber,
          region,
          outletName,
          outletLocation,
          agency,
        }),
      }
    )
      .then(() => {
        // Define agency-specific URLs
        const agencyLinks = {
          Elev8: "https://app-sorteos.com/wheel/LPPM37",
          ideashouse: "https://app-sorteos.com/wheel/MZZJWZ",
          fk: "https://app-sorteos.com/wheel/KWWNKG",
          Gdm: "https://app-sorteos.com/en/apps/wheel-decide?hash=1NNVQV",
        };

        // Redirect based on selected agency
        const redirectUrl = agencyLinks[agency];
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          document.getElementById("status").innerText =
            "Error: Invalid agency selected.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("status").innerText =
          "Error occurred. Please try again.";
      });
  });
