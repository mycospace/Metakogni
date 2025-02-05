const exercises = {
  home: `
    <h1>Willkommen beim MetaCognition Trainer</h1>
    <p>Erkenne und hinterfrage deine Denkmuster mit interaktiven Übungen.</p>
  `,
  
  innereDialoge: `
    <h2>📝 Innere Dialoge sichtbar machen</h2>
    <p>Schreibe für 5-10 Minuten deine Gedanken auf:</p>
    <textarea id="gedankenText" placeholder="Deine Gedanken..."></textarea>
    <button onclick="saveText('gedankenText')">💾 Speichern</button>
    <p id="feedback"></p>
  `,
  
  perspektivwechsel: `
    <h2>🔄 Perspektivwechsel</h2>
    <p>Warum glaubst du das?</p>
    <textarea id="perspektive1" placeholder="Deine Gedanken..."></textarea>
    <button onclick="saveText('perspektive1')">💾 Speichern</button>
  `,

  miniExperimente: `
    <h2>🧪 Mini-Experimente</h2>
    <p>Formuliere eine Hypothese:</p>
    <textarea id="hypothese" placeholder="Deine Hypothese..."></textarea>
    <p>Teste es im Alltag und schreibe deine Erkenntnisse auf:</p>
    <textarea id="experiment" placeholder="Deine Ergebnisse..."></textarea>
    <button onclick="saveText('hypothese'); saveText('experiment')">💾 Speichern</button>
  `,

  achtsamkeit: `
    <h2>🧘‍♂️ Achtsamkeitstraining</h2>
    <p>Schließe die Augen, beobachte deinen Atem und notiere Gedanken:</p>
    <textarea id="achtsamkeit" placeholder="Notiere hier..."></textarea>
    <button onclick="saveText('achtsamkeit')">💾 Speichern</button>
  `,

  selbstreflexion: `
    <h2>🤔 Selbstreflexion</h2>
    <p>Was ist dein Glaubenssatz?</p>
    <textarea id="glaubenssatz" placeholder="Dein Glaubenssatz..."></textarea>
    <button onclick="saveText('glaubenssatz')">💾 Speichern</button>
  `,

  alltag: `
    <h2>🌍 Denken im Alltag</h2>
    <p>Welche Situation hat dich heute besonders beschäftigt?</p>
    <textarea id="alltag" placeholder="Erzähle mehr..."></textarea>
    <button onclick="saveText('alltag')">💾 Speichern</button>
  `
};

// Funktion zum Laden der Übungen und automatisches Einfügen gespeicherter Inhalte
function loadExercise(exercise) {
  const container = document.getElementById("exercise-container");
  container.innerHTML = exercises[exercise] || "<p>Übung nicht gefunden.</p>";
  
  // Kurz warten, bis die Elemente gerendert sind, und dann gespeicherte Inhalte einfügen
  setTimeout(() => {
    const textareas = container.getElementsByTagName("textarea");
    Array.from(textareas).forEach(textarea => {
      const savedValue = localStorage.getItem(textarea.id);
      if (savedValue) {
        textarea.value = savedValue;
      }
    });
  }, 50);
}

// Speicherfunktion mit visuellem Feedback
function saveText(id) {
  const element = document.getElementById(id);
  if (!element) return;
  const value = element.value;
  if (value) {
    localStorage.setItem(id, value);

    // Feedback erstellen
    const feedback = document.createElement("p");
    feedback.innerText = "✅ Gespeichert!";
    feedback.classList.add("feedback");
    document.getElementById("exercise-container").appendChild(feedback);

    // Entferne das Feedback nach 2 Sekunden (CSS-Animation übernimmt den FadeOut)
    setTimeout(() => {
      feedback.remove();
    }, 2000);
  }
}
