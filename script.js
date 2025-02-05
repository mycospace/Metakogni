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
    <button onclick="showArchive('gedankenText')">📂 Archiv anzeigen</button>
    <p id="feedback"></p>
  `,
  
  perspektivwechsel: `
    <h2>🔄 Perspektivwechsel</h2>
    <p>Warum glaubst du das?</p>
    <textarea id="perspektive1" placeholder="Deine Gedanken..."></textarea>
    <button onclick="saveText('perspektive1')">💾 Speichern</button>
    <button onclick="showArchive('perspektive1')">📂 Archiv anzeigen</button>
  `,

  miniExperimente: `
    <h2>🧪 Mini-Experimente</h2>
    <p>Formuliere eine Hypothese:</p>
    <textarea id="hypothese" placeholder="Deine Hypothese..."></textarea>
    <button onclick="saveText('hypothese')">💾 Speichern</button>
    <button onclick="showArchive('hypothese')">📂 Archiv anzeigen</button>
    <p>Teste es im Alltag und schreibe deine Erkenntnisse auf:</p>
    <textarea id="experiment" placeholder="Deine Ergebnisse..."></textarea>
    <button onclick="saveText('experiment')">💾 Speichern</button>
    <button onclick="showArchive('experiment')">📂 Archiv anzeigen</button>
  `,

  achtsamkeit: `
    <h2>🧘‍♂️ Achtsamkeitstraining</h2>
    <p>Schließe die Augen, beobachte deinen Atem und notiere Gedanken:</p>
    <textarea id="achtsamkeit" placeholder="Notiere hier..."></textarea>
    <button onclick="saveText('achtsamkeit')">💾 Speichern</button>
    <button onclick="showArchive('achtsamkeit')">📂 Archiv anzeigen</button>
  `,

  selbstreflexion: `
    <h2>🤔 Selbstreflexion</h2>
    <p>Was ist dein Glaubenssatz?</p>
    <textarea id="glaubenssatz" placeholder="Dein Glaubenssatz..."></textarea>
    <button onclick="saveText('glaubenssatz')">💾 Speichern</button>
    <button onclick="showArchive('glaubenssatz')">📂 Archiv anzeigen</button>
  `,

  alltag: `
    <h2>🌍 Denken im Alltag</h2>
    <p>Welche Situation hat dich heute besonders beschäftigt?</p>
    <textarea id="alltag" placeholder="Erzähle mehr..."></textarea>
    <button onclick="saveText('alltag')">💾 Speichern</button>
    <button onclick="showArchive('alltag')">📂 Archiv anzeigen</button>
  `
};

// Lädt die gewünschte Übung in den "exercise-container" und füllt Textareas mit bereits gespeicherten Inhalten.
function loadExercise(exercise) {
  const container = document.getElementById("exercise-container");
  container.innerHTML = exercises[exercise] || "<p>Übung nicht gefunden.</p>";
  
  // Kurz warten, bis die Elemente gerendert sind, und dann gespeicherte Inhalte einfügen.
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

// Speichert den Inhalt des Textfeldes, aktualisiert das Archiv (mit Datum) und zeigt Feedback an.
function saveText(id) {
  const element = document.getElementById(id);
  if (!element) return;
  const value = element.value;
  if (value) {
    // Speichere den aktuellen Inhalt (als schnellen Ladevorgang)
    localStorage.setItem(id, value);
    
    // Archiv: Hole bestehende Einträge (als JSON-Array) oder lege ein neues Array an.
    let archive = localStorage.getItem("archive_" + id);
    let archiveArray = [];
    if (archive) {
      try {
        archiveArray = JSON.parse(archive);
      } catch (e) {
        archiveArray = [];
      }
    }
    // Neuer Archiv-Eintrag mit aktuellem Datum und Zeit
    const entry = {
      date: new Date().toISOString(),
      text: value
    };
    archiveArray.push(entry);
    localStorage.setItem("archive_" + id, JSON.stringify(archiveArray));
    
    // Visuelles Feedback
    const feedback = document.createElement("p");
    feedback.innerText = "✅ Gespeichert!";
    feedback.classList.add("feedback");
    document.getElementById("exercise-container").appendChild(feedback);
    setTimeout(() => {
      feedback.remove();
    }, 2000);
  }
}

// Zeigt ein Modal an, in dem alle archivierten Einträge (mit Datum) für das Textfeld mit der angegebenen ID gelistet werden.
function showArchive(id) {
  let archive = localStorage.getItem("archive_" + id);
  if (!archive) {
    alert("Keine archivierten Einträge gefunden.");
    return;
  }
  let archiveArray;
  try {
    archiveArray = JSON.parse(archive);
  } catch (e) {
    alert("Fehler beim Laden des Archivs.");
    return;
  }
  if (archiveArray.length === 0) {
    alert("Keine archivierten Einträge gefunden.");
    return;
  }
  
  // Erstelle ein Modal-Overlay
  let overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  
  let modal = document.createElement("div");
  modal.className = "modal";
  
  let title = document.createElement("h2");
  title.innerText = "Archiv für " + id;
  modal.appendChild(title);
  
  // Erstelle eine Liste der archivierten Einträge.
  let list = document.createElement("ul");
  archiveArray.forEach(entry => {
    let li = document.createElement("li");
    let date = new Date(entry.date);
    li.innerHTML = `<strong>${date.toLocaleString()}</strong>: ${entry.text}`;
    list.appendChild(li);
  });
  modal.appendChild(list);
  
  // Schließen-Button
  let closeBtn = document.createElement("button");
  closeBtn.innerText = "Schließen";
  closeBtn.onclick = function() {
    overlay.remove();
  };
  modal.appendChild(closeBtn);
  
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}
