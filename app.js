// Utility function to hash input using SHA-256
async function hashInput(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function renderPage() {
  const app = document.getElementById("app");
  const route = window.location.hash.substring(1) || "home";

  if (
    route === "protected" &&
    sessionStorage.getItem("accessGranted") !== "true"
  ) {
    window.location.hash = "home";
    return;
  }

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

    const hash1 = await hashInput(answer1);
    const hash2 = await hashInput(answer2);

    const correctHash1 =
      "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"; 
    const correctHash2 =
      "5c2c7671b9f6c4242ba2d4c141c81293c3a2b2be5871181bbe30f0eb7ebedcef"; 

    if (hash1 === correctHash1 && hash2 === correctHash2) {
      sessionStorage.setItem("accessGranted", "true");
      window.location.hash = "protected";
    } else {
      alert("Access Denied! Incorrect Answers.");
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
                        <input type="password" id="answer1" placeholder="First answer" class="input-field"/>
                    </div>

                    <div class="question-block">
                        <h4 class="question-title">Question 2:</h4>
                        <p>
                            You have been selected as a Cyber Security Intern at RAW, the
                            intelligence agency of the Government of India. During a recent
                            surveillance operation, RAW intercepted network traffic linked to
                            a suspected terrorist group.
                        </p>
                        <p>
                            These terrorists were using a communication channel over Whatsapp
                            for all their work. Since Whatsapp employs end-to-end encryption,
                            we are unable to figure out the messages.
                        </p>
                        <p>
                            Luckily, one of our agent was able to capture some keys. The
                            Director at RAW wants the interns to work around and find the
                            messages. Get to work and help RAW secure the nation
                        </p>
                        <div class="encrypted-message">
                            <h4 className="encrypted-title">🔐 Encrypted Message:</h4>
                            <p className="code-block">ho5EGS/lcZVbi356eTdU25IyDHDMExHCY7bToLn/X/SYkK8e5Kd8Tad1oIviy1PP474jVc1KEOKLvjdO9druis982OsiBgn1C4R0pZLf62WeD5cKabuK7A==</p>
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
                        <input type="password" id="answer2" placeholder="Second answer" class="input-field"/>
                    </div>

                    <button type="submit" class="submit-button">Submit</button>
                </form>
            </div>
        </div>
    `,

  protected: `
        <div class="protected-message">
            ✅ Access Granted! Welcome to the Secure Page! <br/>
            <pre class="code-block">iLink_Digital {C0ngr4tul4t!0n5_y0u_4r3_n0w_1_st3p_cl0s3r_t0_h4ck_th3_w0rld}</pre>
        </div>
    `,
};

// Listen to hash changes to switch pages
window.addEventListener("hashchange", renderPage);
window.addEventListener("load", renderPage);
