function renderPage() {
  const app = document.getElementById("app");
  const route = window.location.hash.substring(1) || "home";

  app.innerHTML = routes[route] || routes["home"];

  if (route === "home") {
    setupForm();
  }
}

function setupForm() {
  const form = document.getElementById("challenge-form");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const answer1 = document.getElementById("answer1").value;
    const answer2 = document.getElementById("answer2").value;

    try {
      const response = await fetch("https://f876f85a-ab4f-47d5-bb20-a50c6184d051-00-vhbbq7h01n78.sisko.replit.dev:8080/verify", {
        // Replace with your actual Replit URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer1, answer2 }),
      });

      const result = await response.json();

      if (result.success) {
        document.getElementById("app").innerHTML = `
          <div class="protected-message">
            ✅ Access Granted! Welcome to the Secure Page! <br/>
            <pre class="code-block">${result.flag}</pre>
          </div>
        `;
      } else {
        alert("Access Denied! Incorrect Answers.");
      }
    } catch (error) {
      alert("Error connecting to server!");
    }
  });
}

const routes = {
  home: `
        <div class="main-container">
            <div class="question-container">
                <h1 class="title">🔓 Answer the Questions</h1>
                <p class="description">Solve the following challenges:</p>

                <form id="challenge-form" class="form-container">
                    
                    <div class="question-block">
                        <h4 class="question-title">Question 1:</h4>
                        <p>Uh-oh! 😱 It seems like I’ve accidentally exposed my SAM file.
                            That makes it pretty easy for you to break into my system, right?
                            Well, go ahead—analyze it and uncover my password... if you can!
                        </p>
                        <div class="encrypted-message">
                            <p>Administrator:500:aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c:::</p>
                            <p>Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::</p>
                            <p>DefaultAccount:503:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::</p>
                            <p>WDAGUtilityAccount:504:aad3b435b51404eeaad3b435b51404ee:a5b13b3e4632e2708acafaab9c73ee2c:::</p>
                            <p>ankush:1001:aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c:::</p>
                        </div>
                        <input type="password" id="answer1" placeholder="Cracked password" class="input-field"/>
                    </div>

                    <div class="question-block">
                        <h4 class="question-title">Question 2:</h4>
                        <p>
                            It was a huge mistake by me for giving out my SAM file content. I have compromised my privacy and everything else.
                        </p>
                        <p>
                            My WhatsApp chats with a closed one are being leaked but thanks to Meta for deploying end-to-end encryption. They are not easily accessible. 
                        </p>
                        <p>
                            I believe you are a good one and won't leak my chats after decrypting it 🥺. Thank you for understanding.... 
                        </p>
                        <div class="encrypted-message">
                            <h4 className="encrypted-title">🔐 Encrypted Message:</h4>
                            <p className="code-block">nNtCESriMJQC2F1hVjURiZY3Hzn/WgSXaeLIvfLtHuzd0r8Q7qYyxFKw6Mn83gHopvYpWM1IDPyS/zcb6dXjh89716JjDhntDuOA9LetYy6FRmXfJP+2PxqT7UYjeBDMEpUT</p>
                        </div>
                        <div class="encrypted-message">
                            <h4 className="encrypted-title">🔑 KEYS</h4>
                            <pre className="code-block">A7F3D9B26C8E41G5H2J0KLMNQPZXYTUV</pre>
                            <pre className="code-block">X5ZP3Q1J9G7H2V8LMBK0N6C4YADTFUWE</pre>
                            <pre className="code-block">NQPZXYTUVKLMJH2G5B9C8E41A7F3D06W</pre>
                            <pre className="code-block">M5KJQ1ZP9X3G7H2V8LNB0C4YADTFUWE6</pre>
                            <pre className="code-block">C8E41A7F3D9B26G5H2J0KLMNQPZXYTUV</pre>
                            <pre className="code-block">B9G7H2V8LMPKJQ1ZXC4YADTFUWE605N3</pre>
                            <pre className="code-block">Q1J9G7H2V8LMBK0N6C4YADTFUWE5ZP3X</pre>
                            <pre className="code-block">KLMNQPZXYTUVG5B9C8E41A7F3D06J2H2</pre>
                            <pre className="code-block">X3G7H2V8LMBK0N6C4YADTFUWE5ZP1J9Q</pre>
                            <pre className="code-block">A7F3D9B26C8E41G5H2J0KLMNQPZXYTUV</pre>
                        </div>
                        <input type="password" id="answer2" placeholder="Decrypted chat" class="input-field"/>
                    </div>

                    <button type="submit" class="submit-button">Submit</button>
                </form>
            </div>
        </div>
    `,
};

// Listen to hash changes to switch pages
window.addEventListener("hashchange", renderPage);
window.addEventListener("load", renderPage);
