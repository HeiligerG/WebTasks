# Phase 10C: Curriculum Scale – Bundle 3 (Interaktive Web-Applikationen)

**Ziel:** Bundle 3 von 3 auf 20 Tasks erweitern. Die neuen Tasks 04–20 führen den Lernenden von einfacher DOM-Manipulation über dynamische Elemente, Formulare, lokale Speicherung, Fetch-API bis hin zu komplexen Mini-Apps wie Countdown, Quiz und Portfolio.

**Schwierigkeitsprogression:** ⭐ (04) → ⭐⭐⭐⭐⭐ (20)

---

## Übersicht der neuen Tasks

| # | ID | Titel | Typ | Schwierigkeit |
|:-:|:---|:---|:---|:---|
| 4 | interactive-04 | Elemente ein-/ausblenden | DOM | ⭐ |
| 5 | interactive-05 | Dynamisch Elemente erstellen | DOM | ⭐⭐ |
| 6 | interactive-06 | Zähler-App | DOM+Console | ⭐⭐⭐ |
| 7 | interactive-07 | To-Do Liste (Hinzufügen) | DOM | ⭐⭐⭐ |
| 8 | interactive-08 | To-Do Liste (Löschen) | DOM | ⭐⭐⭐ |
| 9 | interactive-09 | Eingabe validieren | Function+DOM | ⭐⭐⭐ |
| 10 | interactive-10 | Lokaler Speicher | DOM | ⭐⭐⭐⭐ |
| 11 | interactive-11 | Dark Mode Toggle | DOM | ⭐⭐⭐ |
| 12 | interactive-12 | Modales Dialogfenster | DOM | ⭐⭐⭐⭐ |
| 13 | interactive-13 | BMI-Rechner | Function+DOM | ⭐⭐⭐⭐ |
| 14 | interactive-14 | Passwort-Generator | Function+DOM | ⭐⭐⭐⭐ |
| 15 | interactive-15 | Fetch API Basics | Console | ⭐⭐⭐⭐ |
| 16 | interactive-16 | JSON-Daten anzeigen | DOM | ⭐⭐⭐⭐ |
| 17 | interactive-17 | Wetter-App (Mock) | DOM+fetch | ⭐⭐⭐⭐⭐ |
| 18 | interactive-18 | Countdown-Timer | DOM+setInterval | ⭐⭐⭐⭐⭐ |
| 19 | interactive-19 | Quiz-App | DOM+Function | ⭐⭐⭐⭐⭐ |
| 20 | interactive-20 | Portfolio-Seite | DOM | ⭐⭐⭐⭐⭐ |

---

## Task 4: Elemente ein-/ausblenden

**ID:** `interactive-04`  
**Titel:** Elemente ein-/ausblenden  
**Schwierigkeit:** ⭐  
**Typ:** DOM

**Instruction:**
Mit JavaScript kannst du Elemente sichtbar und unsichtbar machen, ohne sie aus dem HTML zu entfernen.

**Anforderungen:**
1. Im HTML ist ein Paragraph mit der ID `text` und ein Button mit der ID `toggle`.
2. Beim Klick auf den Button soll der Paragraph ein- und ausgeblendet werden (`classList.toggle('hidden')`).
3. Im CSS-Tab ist bereits eine Klasse `.hidden { display: none; }` definiert.

**InitialCode:**
```json
{
  "html": "<p id=\"text\">Hallo Welt!</p>\n<button id=\"toggle\">Ein-/Ausblenden</button>",
  "css": ".hidden { display: none; }",
  "js": "// Füge den Event-Listener hier ein\n"
}
```

**EnabledEditors:** `["html", "css", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#text",
    "feedbackFailure": "Das Element mit der ID 'text' fehlt."
  },
  {
    "type": "dom",
    "selector": "#toggle",
    "feedbackFailure": "Der Button mit der ID 'toggle' fehlt."
  }
]
```

---

## Task 5: Dynamisch Elemente erstellen

**ID:** `interactive-05`  
**Titel:** Dynamisch Elemente erstellen  
**Schwierigkeit:** ⭐⭐  
**Typ:** DOM

**Instruction:**
JavaScript kann nicht nur bestehende Elemente verändern, sondern auch komplett neue in die Seite einfügen.

**Anforderungen:**
1. Im HTML ist eine leere `<ul id="liste">` und ein Button mit der ID `hinzufuegen`.
2. Beim Klick auf den Button soll ein neues `<li>` mit dem Text `Neues Element` zur Liste hinzugefügt werden.

**Tipp:** Verwende `document.createElement('li')` und `appendChild()`.

**InitialCode:**
```json
{
  "html": "<ul id=\"liste\"></ul>\n<button id=\"hinzufuegen\">Element hinzufügen</button>",
  "css": "",
  "js": "// Erstelle das Element und füge es der Liste hinzu\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#liste",
    "feedbackFailure": "Die Liste mit der ID 'liste' fehlt."
  },
  {
    "type": "dom",
    "selector": "#hinzufuegen",
    "feedbackFailure": "Der Button mit der ID 'hinzufuegen' fehlt."
  }
]
```

---

## Task 6: Zähler-App

**ID:** `interactive-06`  
**Titel:** Zähler-App  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** DOM+Console

**Instruction:**
Baue eine kleine App, die einen Zähler hoch- und runterzählt.

**Anforderungen:**
1. Im HTML ist ein `<span id="counter">0</span>` und zwei Buttons mit den IDs `plus` und `minus`.
2. Klick auf `plus` erhöht den Zähler um 1.
3. Klick auf `minus` verringert den Zähler um 1.

**InitialCode:**
```json
{
  "html": "<span id=\"counter\">0</span>\n<button id=\"plus\">+</button>\n<button id=\"minus\">-</button>",
  "css": "",
  "js": "// Implementiere die Zähler-Logik\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#counter",
    "feedbackFailure": "Der Zähler-Span mit der ID 'counter' fehlt."
  },
  {
    "type": "dom",
    "selector": "#plus",
    "feedbackFailure": "Der Plus-Button fehlt."
  },
  {
    "type": "dom",
    "selector": "#minus",
    "feedbackFailure": "Der Minus-Button fehlt."
  }
]
```

---

## Task 7: To-Do Liste (Hinzufügen)

**ID:** `interactive-07`  
**Titel:** To-Do Liste (Hinzufügen)  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** DOM

**Instruction:**
To-Do-Listen sind der Klassiker unter den Übungsprojekten. In diesem Task lernst du, wie man Nutzereingaben in die Liste überführt.

**Anforderungen:**
1. Im HTML gibt es ein `<input type="text" id="todo-input">`, einen Button `<button id="todo-add">Hinzufügen</button>` und eine leere `<ul id="todo-list">`.
2. Beim Klick auf den Button soll der Text aus dem Input-Feld als neues `<li>` in die Liste eingefügt werden.

**InitialCode:**
```json
{
  "html": "<input type=\"text\" id=\"todo-input\" placeholder=\"Neue Aufgabe\">\n<button id=\"todo-add\">Hinzufügen</button>\n<ul id=\"todo-list\"></ul>",
  "css": "",
  "js": "// Füge To-Dos zur Liste hinzu\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#todo-input",
    "feedbackFailure": "Das Input-Feld fehlt."
  },
  {
    "type": "dom",
    "selector": "#todo-add",
    "feedbackFailure": "Der Hinzufügen-Button fehlt."
  },
  {
    "type": "dom",
    "selector": "#todo-list",
    "feedbackFailure": "Die To-Do-Liste fehlt."
  }
]
```

---

## Task 8: To-Do Liste (Löschen)

**ID:** `interactive-08`  
**Titel:** To-Do Liste (Löschen)  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Eine To-Do-Liste ist nur halb so nützlich, wenn man Einträge nicht wieder löschen kann.

**Anforderungen:**
1. Im HTML ist bereits eine Liste mit zwei To-Dos. Jedes `<li>` enthält einen Löschen-Button mit der Klasse `delete-btn`.
2. Füge Event-Listener zu allen Löschen-Buttons hinzu, sodass beim Klick das jeweilige `<li>` aus der Liste entfernt wird.

**Tipp:** Du kannst `event.target` oder `this` verwenden, um den geklickten Button zu finden, und dann mit `.parentElement.remove()` das `<li>` löschen.

**InitialCode:**
```json
{
  "html": "<ul id=\"todo-list\">\n  <li>Einkaufen <button class=\"delete-btn\">Löschen</button></li>\n  <li>Sport <button class=\"delete-btn\">Löschen</button></li>\n</ul>",
  "css": "",
  "js": "// Füge die Löschen-Funktionalität hinzu\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#todo-list",
    "feedbackFailure": "Die To-Do-Liste fehlt."
  },
  {
    "type": "dom",
    "selector": ".delete-btn",
    "feedbackFailure": "Die Löschen-Buttons mit der Klasse 'delete-btn' fehlen."
  }
]
```

---

## Task 9: Eingabe validieren

**ID:** `interactive-09`  
**Titel:** Eingabe validieren  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** Function+DOM

**Instruction:**
Nicht alle Nutzereingaben sind korrekt. Deshalb müssen wir sie prüfen, bevor wir sie verarbeiten.

**Anforderungen:**
1. Im HTML gibt es ein `<input type="text" id="email">` und einen Button mit der ID `pruefen`.
2. Beim Klick soll geprüft werden, ob die Eingabe ein `@`-Zeichen enthält.
3. Wenn ja, zeige in einem `<p id="nachricht">` `Gültige E-Mail` an.
4. Wenn nein, zeige `Ungültige E-Mail` an.

**InitialCode:**
```json
{
  "html": "<input type=\"text\" id=\"email\" placeholder=\"E-Mail\">\n<button id=\"pruefen\">Prüfen</button>\n<p id=\"nachricht\"></p>",
  "css": "",
  "js": "// Validiere die Eingabe\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#email",
    "feedbackFailure": "Das E-Mail-Input-Feld fehlt."
  },
  {
    "type": "dom",
    "selector": "#pruefen",
    "feedbackFailure": "Der Prüfen-Button fehlt."
  },
  {
    "type": "dom",
    "selector": "#nachricht",
    "feedbackFailure": "Das Nachrichten-Paragraph fehlt."
  }
]
```

---

## Task 10: Lokaler Speicher

**ID:** `interactive-10`  
**Titel:** Lokaler Speicher  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Mit `localStorage` kannst du Daten im Browser des Nutzers speichern – auch wenn er die Seite neu lädt.

**Anforderungen:**
1. Im HTML gibt es ein Input-Feld `username` und einen Button `speichern`.
2. Beim Klick auf `speichern` soll der Wert aus dem Input-Feld in `localStorage` unter dem Schlüssel `webtasks-user` gespeichert werden.
3. Beim Laden der Seite (direkt im JS-Code) soll der gespeicherte Wert ausgelesen und in das Input-Feld eingesetzt werden.

**Wichtig:** Die Validation-Engine kann `localStorage` nicht direkt prüfen. Wir validieren das Vorhandensein der Elemente und das korrekte JavaScript.

**InitialCode:**
```json
{
  "html": "<input type=\"text\" id=\"username\" placeholder=\"Dein Name\">\n<button id=\"speichern\">Speichern</button>",
  "css": "",
  "js": "// Speichere und lade den Nutzernamen\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#username",
    "feedbackFailure": "Das Input-Feld mit der ID 'username' fehlt."
  },
  {
    "type": "dom",
    "selector": "#speichern",
    "feedbackFailure": "Der Speichern-Button fehlt."
  }
]
```

---

## Task 11: Dark Mode Toggle

**ID:** `interactive-11`  
**Titel:** Dark Mode Toggle  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Du hast bereits die Plattform gesehen – jetzt baust du deinen eigenen Dark Mode Toggle!

**Anforderungen:**
1. Im HTML ist ein `<body>` (implizit vorhanden) und ein Button mit der ID `theme-toggle`.
2. Beim Klick auf den Button soll die Klasse `dark` auf dem `<body>` hinzugefügt oder entfernt werden (`classList.toggle`).
3. Im CSS ist bereits `.dark { background-color: #111; color: #fff; }` definiert.

**InitialCode:**
```json
{
  "html": "<button id=\"theme-toggle\">Dark Mode umschalten</button>\n<p>Hallo Welt</p>",
  "css": ".dark {\n  background-color: #111;\n  color: #fff;\n}",
  "js": "// Füge den Toggle hier ein\n"
}
```

**EnabledEditors:** `["html", "css", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#theme-toggle",
    "feedbackFailure": "Der Dark-Mode-Button fehlt."
  }
]
```

---

## Task 12: Modales Dialogfenster

**ID:** `interactive-12`  
**Titel:** Modales Dialogfenster  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Modale Dialoge werden überall im Web verwendet – für Cookie-Hinweise, Bestätigungen oder Anmeldungen.

**Anforderungen:**
1. Im HTML ist ein Button `open-modal`, ein Container `.modal` mit einem Text und einem Button `close-modal`.
2. Beim Klick auf `open-modal` soll die Modal sichtbar werden (`display: block`).
3. Beim Klick auf `close-modal` soll sie wieder verschwinden (`display: none`).
4. Das Modal ist initial mit `style="display: none;"` versteckt.

**InitialCode:**
```json
{
  "html": "<button id=\"open-modal\">Modal öffnen</button>\n<div class=\"modal\" style=\"display:none;\">\n  <p>Hallo aus dem Modal!</p>\n  <button id=\"close-modal\">Schließen</button>\n</div>",
  "css": ".modal {\n  border: 1px solid #000;\n  padding: 20px;\n  margin-top: 10px;\n}",
  "js": "// Steuere die Sichtbarkeit des Modals\n"
}
```

**EnabledEditors:** `["html", "css", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#open-modal",
    "feedbackFailure": "Der Öffnen-Button fehlt."
  },
  {
    "type": "dom",
    "selector": ".modal",
    "feedbackFailure": "Das Modal-Element fehlt."
  },
  {
    "type": "dom",
    "selector": "#close-modal",
    "feedbackFailure": "Der Schließen-Button fehlt."
  }
]
```

---

## Task 13: BMI-Rechner

**ID:** `interactive-13`  
**Titel:** BMI-Rechner  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** Function+DOM

**Instruction:**
Baue eine kleine Gesundheits-App: einen BMI-Rechner.

**Anforderungen:**
1. Im HTML gibt es zwei Input-Felder (`gewicht` in kg, `groesse` in m) und einen Button `bmi-berechnen`.
2. Beim Klick soll der BMI berechnet (`gewicht / (groesse * groesse)`) und in ein `<p id="bmi-ergebnis">` geschrieben werden.

**InitialCode:**
```json
{
  "html": "<input type=\"number\" id=\"gewicht\" placeholder=\"Gewicht in kg\">\n<input type=\"number\" id=\"groesse\" placeholder=\"Größe in m (z.B. 1.75)\">\n<button id=\"bmi-berechnen\">BMI berechnen</button>\n<p id=\"bmi-ergebnis\"></p>",
  "css": "",
  "js": "// Berechne den BMI\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#gewicht",
    "feedbackFailure": "Das Gewicht-Input fehlt."
  },
  {
    "type": "dom",
    "selector": "#groesse",
    "feedbackFailure": "Das Größe-Input fehlt."
  },
  {
    "type": "dom",
    "selector": "#bmi-berechnen",
    "feedbackFailure": "Der Berechnen-Button fehlt."
  },
  {
    "type": "dom",
    "selector": "#bmi-ergebnis",
    "feedbackFailure": "Das Ergebnis-Paragraph fehlt."
  }
]
```

---

## Task 14: Passwort-Generator

**ID:** `interactive-14`  
**Titel:** Passwort-Generator  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** Function+DOM

**Instruction:**
Baue einen Generator, der zufällige Passwörter erstellt.

**Anforderungen:**
1. Im HTML ist ein Button `generate-password` und ein `<p id="password">`.
2. Beim Klick soll ein zufälliges Passwort aus 8 Buchstaben/Zahlen generiert und im Paragraph angezeigt werden.

**InitialCode:**
```json
{
  "html": "<button id=\"generate-password\">Passwort generieren</button>\n<p id=\"password\"></p>",
  "css": "",
  "js": "// Generiere ein zufälliges Passwort\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#generate-password",
    "feedbackFailure": "Der Generieren-Button fehlt."
  },
  {
    "type": "dom",
    "selector": "#password",
    "feedbackFailure": "Das Passwort-Paragraph fehlt."
  }
]
```

---

## Task 15: Fetch API Basics

**ID:** `interactive-15`  
**Titel:** Fetch API Basics  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** Console

**Instruction:**
Moderne Web-Apps laden Daten von Servern. Das geht mit der `fetch`-API.

**Anforderungen:**
1. Mache einen `fetch`-Aufruf zu `https://jsonplaceholder.typicode.com/todos/1`.
2. Wandle die Antwort in JSON um.
3. Gib den `title` des To-Dos mit `console.log()` aus.

**Tipp:** `fetch(url).then(res => res.json()).then(data => console.log(data.title))`

**InitialCode:**
```json
{
  "html": "",
  "css": "",
  "js": "// Lade das To-Do und gib den Titel aus\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**
```json
[
  {
    "type": "console",
    "expectedOutput": "delectus aut autem",
    "feedbackFailure": "Die Konsole zeigt nicht den Titel 'delectus aut autem' an. Hast du fetch, .json() und data.title verwendet?"
  }
]
```

---

## Task 16: JSON-Daten anzeigen

**ID:** `interactive-16`  
**Titel:** JSON-Daten anzeigen  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Daten allein in der Konsole sind langweilig. Zeige sie auf der Webseite an!

**Anforderungen:**
1. Im HTML sind zwei `<p>`-Elemente mit den IDs `user-name` und `user-email`.
2. Im JavaScript ist ein Objekt `user = { name: "Max Mustermann", email: "max@example.com" }` vorgegeben.
3. Zeige `name` und `email` aus dem Objekt in den jeweiligen Paragraphs an.

**InitialCode:**
```json
{
  "html": "<p id=\"user-name\"></p>\n<p id=\"user-email\"></p>",
  "css": "",
  "js": "const user = {\n  name: 'Max Mustermann',\n  email: 'max@example.com'\n};\n\n// Zeige die Daten an\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#user-name",
    "feedbackFailure": "Das Paragraph für den Namen fehlt."
  },
  {
    "type": "dom",
    "selector": "#user-email",
    "feedbackFailure": "Das Paragraph für die E-Mail fehlt."
  }
]
```

---

## Task 17: Wetter-App (Mock)

**ID:** `interactive-17`  
**Titel:** Wetter-App (Mock)  
**Schwierigkeit:** ⭐⭐⭐⭐⭐  
**Typ:** DOM+fetch

**Instruction:**
Baue eine simple Wetter-App, die Daten von einer simulierten API lädt.

**Anforderungen:**
1. Im HTML ist ein Button `wetter-laden` und ein `<div id="wetter">`.
2. Beim Klick soll folgendes simuliertes Objekt angezeigt werden:
   ```js
   const wetterDaten = { stadt: "Berlin", temperatur: 22, einheit: "°C" };
   ```
3. Zeige im Div an: `Berlin: 22°C`

**Tipp:** Da wir keinen echten API-Key haben, simulieren wir den Fetch mit einem Promise-Timeout oder verwenden direkt das Objekt.

**InitialCode:**
```json
{
  "html": "<button id=\"wetter-laden\">Wetter laden</button>\n<div id=\"wetter\"></div>",
  "css": "",
  "js": "// Lade und zeige die Wetterdaten an\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#wetter-laden",
    "feedbackFailure": "Der Wetter-laden-Button fehlt."
  },
  {
    "type": "dom",
    "selector": "#wetter",
    "feedbackFailure": "Das Wetter-Div fehlt."
  }
]
```

---

## Task 18: Countdown-Timer

**ID:** `interactive-18`  
**Titel:** Countdown-Timer  
**Schwierigkeit:** ⭐⭐⭐⭐⭐  
**Typ:** DOM+setInterval

**Instruction:**
Ein Countdown-Timer ist eine großartige Übung für `setInterval` und DOM-Updates.

**Anforderungen:**
1. Im HTML ist ein `<div id="timer">10</div>` und ein Button `start-timer`.
2. Beim Klick soll der Countdown von 10 Sekunden herunterzählen und im Div aktualisiert werden.
3. Bei 0 soll `"Fertig!"` angezeigt werden und der Timer gestoppt werden.

**InitialCode:**
```json
{
  "html": "<div id=\"timer\">10</div>\n<button id=\"start-timer\">Start</button>",
  "css": "",
  "js": "// Implementiere den Countdown\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#timer",
    "feedbackFailure": "Das Timer-Div fehlt."
  },
  {
    "type": "dom",
    "selector": "#start-timer",
    "feedbackFailure": "Der Start-Button fehlt."
  }
]
```

---

## Task 19: Quiz-App

**ID:** `interactive-19`  
**Titel:** Quiz-App  
**Schwierigkeit:** ⭐⭐⭐⭐⭐  
**Typ:** DOM+Function

**Instruction:**
Baue ein interaktives Quiz mit einer Frage und mehreren Antwortmöglichkeiten.

**Anforderungen:**
1. Im HTML ist eine Frage `<p id="frage">Was ist die Hauptstadt von Frankreich?</p>`, drei Buttons mit den IDs `antwort-a`, `antwort-b`, `antwort-c` und ein Ergebnis-Paragraph `ergebnis`.
2. Die richtige Antwort ist Button `antwort-b` (Text: "Paris").
3. Beim Klick auf eine Antwort soll geprüft werden, ob sie richtig ist, und im Ergebnis-Paragraph `Richtig!` oder `Falsch!` angezeigt werden.

**InitialCode:**
```json
{
  "html": "<p id=\"frage\">Was ist die Hauptstadt von Frankreich?</p>\n<button id=\"antwort-a\">Berlin</button>\n<button id=\"antwort-b\">Paris</button>\n<button id=\"antwort-c\">Madrid</button>\n<p id=\"ergebnis\"></p>",
  "css": "",
  "js": "// Implementiere das Quiz\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "#frage",
    "feedbackFailure": "Die Frage fehlt."
  },
  {
    "type": "dom",
    "selector": "#antwort-a",
    "feedbackFailure": "Antwort-Button A fehlt."
  },
  {
    "type": "dom",
    "selector": "#antwort-b",
    "feedbackFailure": "Antwort-Button B fehlt."
  },
  {
    "type": "dom",
    "selector": "#ergebnis",
    "feedbackFailure": "Das Ergebnis-Paragraph fehlt."
  }
]
```

---

## Task 20: Portfolio-Seite

**ID:** `interactive-20`  
**Titel:** Portfolio-Seite  
**Schwierigkeit:** ⭐⭐⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Das Abschlussprojekt von Bundle 3! Du baust eine kleine Portfolio-Seite, die zeigt, was du alles gelernt hast.

**Anforderungen:**
1. Erstelle einen `<header>` mit deinem Namen in einer `<h1>`.
2. Erstelle einen Bereich `<section class="about">` mit einem Paragraph über dich.
3. Erstelle einen Bereich `<section class="projects">` mit mindestens zwei Projekt-Karten (z. B. `<div class="project">`).
4. Erstelle ein `<footer>` mit einem Kontakt-Link (`<a href="mailto:...">`).

**InitialCode:**
```json
{
  "html": "",
  "css": "",
  "js": ""
}
```

**EnabledEditors:** `["html", "css"]`

**ValidationTests:**
```json
[
  {
    "type": "dom",
    "selector": "header h1",
    "feedbackFailure": "Der Header mit deinem Namen fehlt."
  },
  {
    "type": "dom",
    "selector": ".about p",
    "feedbackFailure": "Der About-Bereich mit einem Paragraph fehlt."
  },
  {
    "type": "dom",
    "selector": ".projects .project",
    "feedbackFailure": "Der Projects-Bereich braucht mindestens zwei Projekt-Karten mit der Klasse 'project'."
  },
  {
    "type": "dom",
    "selector": "footer a[href^=\"mailto:\"]",
    "feedbackFailure": "Der Footer braucht einen mailto:-Link."
  }
]
```
