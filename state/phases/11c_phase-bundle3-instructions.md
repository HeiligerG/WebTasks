# Phase 11: Instruction Quality – Bundle 3 (Interaktive Web-Applikationen)

**Ziel:** Alle 20 Tasks in `public/bundles/bundle-03-interactive-web.json` erhalten vollständige, klare und lernförderliche Instruktionen.

## Problemstellung

Die automatisch generierten Tasks enthalten nur den einleitenden Fließtext als `instruction`, jedoch keine `Anforderungen`-Listen und keine `Tipp`-Hinweise. Das führt dazu, dass Schüler nicht genau wissen, was konkret erwartet wird.

## Qualitätskriterien für überarbeitete Instructions

Jede `instruction` sollte folgende Elemente enthalten:

1. **Einleitung:** 1-2 Sätze zum didaktischen Kontext (Warum lerne ich das?)
2. **Anforderungen:** Nummerierte Liste mit exakten Schritten (Was muss ich tun?)
3. **Tipp (optional):** Ein konkreter Hinweis oder Code-Schnipsel, der bei Hängern hilft

## Zu überarbeitende Tasks

- **Tasks 01–03:** Ursprüngliche Tasks – auf Konsistenz prüfen.
- **Tasks 04–20:** Neue Tasks – `instruction` muss um `Anforderungen` und `Tipp` ergänzt werden.

---

## interactive-04: Elemente ein-/ausblenden

**Neue Instruction:**

```markdown
Mit JavaScript kannst du Elemente sichtbar und unsichtbar machen, ohne sie aus dem HTML zu entfernen.

**Anforderungen:**

1. Im HTML ist ein Paragraph mit der ID `text` und ein Button mit der ID `toggle`.
2. Beim Klick auf den Button soll der Paragraph ein- und ausgeblendet werden (`classList.toggle('hidden')`).
3. Im CSS-Tab ist bereits eine Klasse `.hidden { display: none; }` definiert.
```

---

## interactive-05: Dynamisch Elemente erstellen

**Neue Instruction:**

```markdown
JavaScript kann nicht nur bestehende Elemente verändern, sondern auch komplett neue in die Seite einfügen.

**Anforderungen:**

1. Im HTML ist eine leere `<ul id="liste">` und ein Button mit der ID `hinzufuegen`.
2. Beim Klick auf den Button soll ein neues `<li>` mit dem Text `Neues Element` zur Liste hinzugefügt werden.

**Tipp:**
Verwende `document.createElement('li')` und `appendChild()`.
```

---

## interactive-06: Zähler-App

**Neue Instruction:**

```markdown
Baue eine kleine App, die einen Zähler hoch- und runterzählt.

**Anforderungen:**

1. Im HTML ist ein `<span id="counter">0</span>` und zwei Buttons mit den IDs `plus` und `minus`.
2. Klick auf `plus` erhöht den Zähler um 1.
3. Klick auf `minus` verringert den Zähler um 1.
```

---

## interactive-07: To-Do Liste (Hinzufügen)

**Neue Instruction:**

```markdown
To-Do-Listen sind der Klassiker unter den Übungsprojekten. In diesem Task lernst du, wie man Nutzereingaben in die Liste überführt.

**Anforderungen:**

1. Im HTML gibt es ein `<input type="text" id="todo-input">`, einen Button `<button id="todo-add">Hinzufügen</button>` und eine leere `<ul id="todo-list">`.
2. Beim Klick auf den Button soll der Text aus dem Input-Feld als neues `<li>` in die Liste eingefügt werden.
```

---

## interactive-08: To-Do Liste (Löschen)

**Neue Instruction:**

```markdown
Eine To-Do-Liste ist nur halb so nützlich, wenn man Einträge nicht wieder löschen kann.

**Anforderungen:**

1. Im HTML ist bereits eine Liste mit zwei To-Dos. Jedes `<li>` enthält einen Löschen-Button mit der Klasse `delete-btn`.
2. Füge Event-Listener zu allen Löschen-Buttons hinzu, sodass beim Klick das jeweilige `<li>` aus der Liste entfernt wird.

**Tipp:**
Du kannst `event.target` oder `this` verwenden, um den geklickten Button zu finden, und dann mit `.parentElement.remove()` das `<li>` löschen.
```

---

## interactive-09: Eingabe validieren

**Neue Instruction:**

```markdown
Nicht alle Nutzereingaben sind korrekt. Deshalb müssen wir sie prüfen, bevor wir sie verarbeiten.

**Anforderungen:**

1. Im HTML gibt es ein `<input type="text" id="email">` und einen Button mit der ID `pruefen`.
2. Beim Klick soll geprüft werden, ob die Eingabe ein `@`-Zeichen enthält.
3. Wenn ja, zeige in einem `<p id="nachricht">` `Gültige E-Mail` an.
4. Wenn nein, zeige `Ungültige E-Mail` an.
```

---

## interactive-10: Lokaler Speicher

**Neue Instruction:**

```markdown
Mit `localStorage` kannst du Daten im Browser des Nutzers speichern – auch wenn er die Seite neu lädt.

**Anforderungen:**

1. Im HTML gibt es ein Input-Feld `username` und einen Button `speichern`.
2. Beim Klick auf `speichern` soll der Wert aus dem Input-Feld in `localStorage` unter dem Schlüssel `webtasks-user` gespeichert werden.
3. Beim Laden der Seite (direkt im JS-Code) soll der gespeicherte Wert ausgelesen und in das Input-Feld eingesetzt werden.

**Wichtig:**
Die Validation-Engine kann `localStorage` nicht direkt prüfen. Wir validieren das Vorhandensein der Elemente und das korrekte JavaScript.
```

---

## interactive-11: Dark Mode Toggle

**Neue Instruction:**

```markdown
Du hast bereits die Plattform gesehen – jetzt baust du deinen eigenen Dark Mode Toggle!

**Anforderungen:**

1. Im HTML ist ein `<body>` (implizit vorhanden) und ein Button mit der ID `theme-toggle`.
2. Beim Klick auf den Button soll die Klasse `dark` auf dem `<body>` hinzugefügt oder entfernt werden (`classList.toggle`).
3. Im CSS ist bereits `.dark { background-color: #111; color: #fff; }` definiert.
```

---

## interactive-12: Modales Dialogfenster

**Neue Instruction:**

```markdown
Modale Dialoge werden überall im Web verwendet – für Cookie-Hinweise, Bestätigungen oder Anmeldungen.

**Anforderungen:**

1. Im HTML ist ein Button `open-modal`, ein Container `.modal` mit einem Text und einem Button `close-modal`.
2. Beim Klick auf `open-modal` soll die Modal sichtbar werden (`display: block`).
3. Beim Klick auf `close-modal` soll sie wieder verschwinden (`display: none`).
4. Das Modal ist initial mit `style="display: none;"` versteckt.
```

---

## interactive-13: BMI-Rechner

**Neue Instruction:**

```markdown
Baue eine kleine Gesundheits-App: einen BMI-Rechner.

**Anforderungen:**

1. Im HTML gibt es zwei Input-Felder (`gewicht` in kg, `groesse` in m) und einen Button `bmi-berechnen`.
2. Beim Klick soll der BMI berechnet (`gewicht / (groesse * groesse)`) und in ein `<p id="bmi-ergebnis">` geschrieben werden.
```

---

## interactive-14: Passwort-Generator

**Neue Instruction:**

```markdown
Baue einen Generator, der zufällige Passwörter erstellt.

**Anforderungen:**

1. Im HTML ist ein Button `generate-password` und ein `<p id="password">`.
2. Beim Klick soll ein zufälliges Passwort aus 8 Buchstaben/Zahlen generiert und im Paragraph angezeigt werden.
```

---

## interactive-15: Fetch API Basics

**Neue Instruction:**

```markdown
Moderne Web-Apps laden Daten von Servern. Das geht mit der `fetch`-API.

**Anforderungen:**

1. Mache einen `fetch`-Aufruf zu `https://jsonplaceholder.typicode.com/todos/1`.
2. Wandle die Antwort in JSON um.
3. Gib den `title` des To-Dos mit `console.log()` aus.

**Tipp:**
`fetch(url).then(res => res.json()).then(data => console.log(data.title))`
```

---

## interactive-16: JSON-Daten anzeigen

**Neue Instruction:**

```markdown
Daten allein in der Konsole sind langweilig. Zeige sie auf der Webseite an!

**Anforderungen:**

1. Im HTML sind zwei `<p>`-Elemente mit den IDs `user-name` und `user-email`.
2. Im JavaScript ist ein Objekt `user = { name: "Max Mustermann", email: "max@example.com" }` vorgegeben.
3. Zeige `name` und `email` aus dem Objekt in den jeweiligen Paragraphs an.
```

---

## interactive-17: Wetter-App (Mock)

**Neue Instruction:**

````markdown
Baue eine simple Wetter-App, die Daten von einer simulierten API lädt.

**Anforderungen:**

1. Im HTML ist ein Button `wetter-laden` und ein `<div id="wetter">`.
2. Beim Klick soll folgendes simuliertes Objekt angezeigt werden:
   ```js
   const wetterDaten = { stadt: 'Berlin', temperatur: 22, einheit: '°C' };
   ```
````

3. Zeige im Div an: `Berlin: 22°C`

**Tipp:**
Da wir keinen echten API-Key haben, simulieren wir den Fetch mit einem Promise-Timeout oder verwenden direkt das Objekt.

````

---

## interactive-18: Countdown-Timer

**Neue Instruction:**

```markdown
Ein Countdown-Timer ist eine großartige Übung für `setInterval` und DOM-Updates.

**Anforderungen:**
1. Im HTML ist ein `<div id="timer">10</div>` und ein Button `start-timer`.
2. Beim Klick soll der Countdown von 10 Sekunden herunterzählen und im Div aktualisiert werden.
3. Bei 0 soll `"Fertig!"` angezeigt werden und der Timer gestoppt werden.
````

---

## interactive-19: Quiz-App

**Neue Instruction:**

```markdown
Baue ein interaktives Quiz mit einer Frage und mehreren Antwortmöglichkeiten.

**Anforderungen:**

1. Im HTML ist eine Frage `<p id="frage">Was ist die Hauptstadt von Frankreich?</p>`, drei Buttons mit den IDs `antwort-a`, `antwort-b`, `antwort-c` und ein Ergebnis-Paragraph `ergebnis`.
2. Die richtige Antwort ist Button `antwort-b` (Text: "Paris").
3. Beim Klick auf eine Antwort soll geprüft werden, ob sie richtig ist, und im Ergebnis-Paragraph `Richtig!` oder `Falsch!` angezeigt werden.
```

---

## interactive-20: Portfolio-Seite

**Neue Instruction:**

```markdown
Das Abschlussprojekt von Bundle 3! Du baust eine kleine Portfolio-Seite, die zeigt, was du alles gelernt hast.

**Anforderungen:**

1. Erstelle einen `<header>` mit deinem Namen in einer `<h1>`.
2. Erstelle einen Bereich `<section class="about">` mit einem Paragraph über dich.
3. Erstelle einen Bereich `<section class="projects">` mit mindestens zwei Projekt-Karten (z. B. `<div class="project">`).
4. Erstelle ein `<footer>` mit einem Kontakt-Link (`<a href="mailto:...">`).
```
