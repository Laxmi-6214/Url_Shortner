window.onload = function () {

    applySavedTheme();

    loadDashboard();
};

function applySavedTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if(savedTheme === "panda") {

        setPandaTheme();
    }

    else if(savedTheme === "fox") {

        setFoxTheme();
    }

    else if(savedTheme === "lavender") {

        setLavenderTheme();
    }

    else {

        setDefaultTheme();
    }
}

/* =========================
   SHORTEN URL
========================= */

async function shortenUrl() {

    const originalUrl =
        document.getElementById("urlInput").value;

    if(originalUrl.trim() === "") {

        document.getElementById("result").innerHTML =
        "Please enter a valid URL ⚠";

        return;
    }

    const response = await fetch(
        "http://localhost:8080/shorten",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                originalUrl: originalUrl
            })
        }
    );

    const data = await response.json();

    document.getElementById("result").innerHTML =

    `
    <a class="short-link"
       href="href="http://localhost:8080/${data.shortCode}"
       target="_blank">

href="http://localhost:8080/${data.shortCode}

    </a>
    `;

    loadDashboard();
}

/* =========================
   DASHBOARD
========================= */

async function loadDashboard() {

    const response =
        await fetch("http://localhost:8080/all");

    const data = await response.json();

    let totalClicks = 0;

    data.forEach(url => {

        totalClicks += url.clicks;
    });

    document.getElementById("content-area").innerHTML =

    `
    <div class="cards">

        <div class="card">
            <h3>Total URLs</h3>
            <p>${data.length}</p>
        </div>

        <div class="card">
            <h3>Total Clicks</h3>
            <p>${totalClicks}</p>
        </div>

        <div class="card">
            <h3>Active Users</h3>
            <p>${data.length}</p>
        </div>

    </div>

    <div class="url-box">

        <input type="text"
               id="urlInput"
               placeholder="Enter URL here">

        <button onclick="shortenUrl()">
            Shorten URL
        </button>

    </div>

    <div id="result"></div>
    `;
}

/* =========================
   LOAD URLS
========================= */

async function loadUrls() {

    const response =
        await fetch("http://localhost:8080/all");

    const data = await response.json();

    let rows = "";

    data.forEach(url => {

        rows +=
        `
        <tr>

            <td>${url.id}</td>

            <td>${url.originalUrl}</td>

            <td>

                <a href="http://localhost:8080/${url.shortCode}"
                   target="_blank">

                   ${url.shortCode}

                </a>

            </td>

            <td>

                <button class="delete-btn"
                        onclick="deleteUrl(${url.id})">

                    Delete

                </button>

            </td>

        </tr>
        `;
    });

    document.getElementById("content-area").innerHTML =

    `
    <div class="table-section">

        <h2>All URLs</h2>

        <table>

            <tr>

                <th>ID</th>

                <th>Original URL</th>

                <th>Short URL</th>

                <th>Action</th>

            </tr>

            ${rows}

        </table>

    </div>
    `;
}

/* =========================
   ANALYTICS
========================= */

async function loadAnalytics() {

    const response =
        await fetch("http://localhost:8080/all");

    const data = await response.json();

    let rows = "";

    data.forEach(url => {

        rows +=
        `
        <tr>

            <td>${url.shortCode}</td>

            <td>${url.clicks}</td>

        </tr>
        `;
    });

    document.getElementById("content-area").innerHTML =

    `
    <div class="table-section">

        <h2>Analytics</h2>

        <table>

            <tr>

                <th>Short Code</th>

                <th>Total Clicks</th>

            </tr>

            ${rows}

        </table>

    </div>
    `;
}

/* =========================
   DELETE URL
========================= */

async function deleteUrl(id) {

    await fetch(
        `http://localhost:8080/delete/${id}`,
        {
            method: "DELETE"
        }
    );

    loadUrls();
}



/* =========================
   SETTINGS
========================= */

function loadSettings() {

    document.getElementById("content-area").innerHTML =

    `
    <div class="table-section">

        <h2>Choose Theme</h2>

        <div class="theme-container">

            <button onclick="setDefaultTheme()">
                ✨ Default
            </button>

            <button onclick="setPandaTheme()">
                🐼 Panda Theme
            </button>

            <button onclick="setFoxTheme()">
                🦊 Fox Theme
            </button>

            <button onclick="setLavenderTheme()">
                💜 Lavender Theme
            </button>

        </div>

    </div>
    `;
}

/* =========================
   THEMES
========================= */

function clearThemeBackground() {

    document.getElementById(
        "theme-background"
    ).innerHTML = "";
}

/* =========================
   DEFAULT THEME
========================= */

function setDefaultTheme() {
	
	localStorage.setItem("theme","default");

    clearThemeBackground();

    document.body.style.background =
        "#f4f7fc";

    document.querySelector(".main").style.background =
        "#f4f7fc";

    document.querySelector(".sidebar").style.background =
        "#6c63ff";

    document.querySelector(".logo").innerHTML =
        "URLLY";
}

/* =========================
   PANDA THEME
========================= */

function clearThemeBackground() {

    document.getElementById(
        "theme-background"
    ).innerHTML = "";
}

/* =========================
   DEFAULT
========================= */

function setDefaultTheme() {

    localStorage.setItem(
        "theme",
        "default"
    );

    clearThemeBackground();

    document.body.style.background =
        "#f4f7fc";

    document.querySelector(".main").style.background =
        "#f4f7fc";

    document.querySelector(".sidebar").style.background =
        "#6c63ff";

    document.querySelector(".logo").innerHTML =
        "URLLY";
}

/* =========================
   PANDA THEME
========================= */

function setPandaTheme() {

    localStorage.setItem(
        "theme",
        "panda"
    );

    clearThemeBackground();

    document.body.style.background =
        "#ffeef5";

    document.querySelector(".main").style.background =
        "transparent";

    document.querySelector(".sidebar").style.background =
        "#ff8fab";

    document.querySelector(".logo").innerHTML =
        "🐼 Panda URLLY";

    const bg =
        document.getElementById(
            "theme-background"
        );

    const pandas =
    [
        "🐼",
        "💤",
        "🤍",
        "🖤",
        "☁️",
        "⭐"
    ];

    for(let i = 0; i < 70; i++) {

        const item =
            document.createElement("div");

        item.className =
            "theme-item";

        item.innerHTML =
            pandas[
                Math.floor(
                    Math.random() * pandas.length
                )
            ];

        item.style.left =
            Math.random() * 100 + "%";

        item.style.fontSize =
            (Math.random() * 50 + 30) + "px";

        item.style.animationDuration =
            (Math.random() * 20 + 15) + "s";

        item.style.animationDelay =
            (Math.random() * 20) + "s";

        bg.appendChild(item);
    }
}
/* =========================
   FOX THEME
========================= */

function setFoxTheme() {

    localStorage.setItem(
        "theme",
        "fox"
    );

    clearThemeBackground();

    document.body.style.background =
        "#ffeef5";

    document.querySelector(".main").style.background =
        "transparent";

    document.querySelector(".sidebar").style.background =
        "#ff8fab";

    document.querySelector(".logo").innerHTML =
        "🦊 Fox URLLY";

    const bg =
        document.getElementById(
            "theme-background"
        );

		const foxes =
		[
		    "🦊",
		    "🍂",
		    "🌼",
		    "✨",
		    "☁️",
		    "🌙"
		];

    for(let i = 0; i < 70; i++) {

        const item =
            document.createElement("div");

        item.className =
            "theme-item";

        item.innerHTML =
            foxes[
                Math.floor(
                    Math.random() * foxes.length
                )
            ];

        item.style.left =
            Math.random() * 100 + "%";

        item.style.fontSize =
            (Math.random() * 50 + 30) + "px";

        item.style.animationDuration =
            (Math.random() * 20 + 15) + "s";

        item.style.animationDelay =
            (Math.random() * 20) + "s";

        bg.appendChild(item);
    }
}

/* =========================
   LAVENDER THEME
========================= */

function setLavenderTheme() {

    localStorage.setItem(
        "theme",
        "lavender"
    );

    clearThemeBackground();

    document.body.style.background =
        "#ffeef5";

    document.querySelector(".main").style.background =
        "transparent";

    document.querySelector(".sidebar").style.background =
        "#ff8fab";

    document.querySelector(".logo").innerHTML =
        "🪻 Lavender URLLY";

    const bg =
        document.getElementById(
            "theme-background"
        );

		const flowers =
		[
		    "💜",
		    "🪻",
		    "🌸",
		    "🌷",
		    "✨",
		    "☁️"
		];

    for(let i = 0; i < 70; i++) {

        const item =
            document.createElement("div");

        item.className =
            "theme-item";

        item.innerHTML =
            flowers[
                Math.floor(
                    Math.random() * flowers.length
                )
            ];

        item.style.left =
            Math.random() * 100 + "%";

        item.style.fontSize =
            (Math.random() * 50 + 30) + "px";

        item.style.animationDuration =
            (Math.random() * 20 + 15) + "s";

        item.style.animationDelay =
            (Math.random() * 20) + "s";

        bg.appendChild(item);
    }
}

let signupMode = false;

function openAuthModal() {

    document.getElementById(
        "authModal"
    ).style.display = "flex";
}

function closeAuthModal() {
	  document.getElementById(
	        "authModal"
	    ).style.display = "none";
	}

	function showSignup() {

	    signupMode = true;

	    document.getElementById(
	        "formTitle"
	    ).innerHTML = "Signup";

	    document.querySelector(
	        ".auth-box button"
	    ).innerHTML = "Signup";
		  document.querySelector(
		        ".auth-box button"
		    ).setAttribute(
		        "onclick",
		        "signupUser()"
		    );
		}

		function signupUser() {

		    const username =
		        document.getElementById(
		            "username"
		        ).value;

		    const password =				document.getElementById(
				           "password"
				       ).value;

				   if(username === "" || password === "") {

				       return;
				   }

				   localStorage.setItem(
				       "urllyUser",
				       JSON.stringify({
				           username,
				           password
				       })
				   );
				   
				   alert("Signup Successful");

				       closeAuthModal();
				   }

				   function loginUser() {

				       const username =
				           document.getElementById(
				               "username"
				           ).value;

				       const password =
				           document.getElementById(
				               "password"
				           ).value;

				       const savedUser = JSON.parse(
						localStorage.getItem(
						           "urllyUser"
						       )
						   );

						   if(
						       savedUser &&
						       savedUser.username === username &&
						       savedUser.password === password
						   ) {

						       alert("Login Successful");

						       closeAuthModal();
						   }

						   else {
							  alert("Invalid Credentials");
							    }
							}