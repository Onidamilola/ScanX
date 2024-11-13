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
      " https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbxOzzSPi-pM5k_5cZJ8YAgBZigaAkt2eJJaZYnAaCkncUgTqKXLcqgvuC6btbUzHisNRw/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        if (data.result === "success") {
          // Define agency-specific URLs
          const agencyLinks = {
            agency1: "https://dummy-link-1.com",
            agency2: "https://dummy-link-2.com",
            agency3: "https://dummy-link-3.com",
            agency4: "https://dummy-link-4.com",
          };

          // Redirect based on selected agency
          const redirectUrl = agencyLinks[agency];
          if (redirectUrl) {
            window.location.href = redirectUrl;
          } else {
            document.getElementById("status").innerText =
              "Error: Invalid agency selected.";
          }
        } else {
          document.getElementById("status").innerText =
            "Failed to log in. Try again.";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("status").innerText =
          "Error occurred. Please try again.";
      });
  });
