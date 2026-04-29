# Phase 10C: Curriculum Scale – Bundle 1 (HTML & CSS Grundlagen)

**Ziel:** Bundle 1 von 3 auf 20 Tasks erweitern. Die neuen Tasks 04–20 bauen auf den ersten 3 Tasks auf und führen den Lernenden systematisch von einfachen HTML-Tags über Strukturierung bis zu fortgeschrittenem CSS (Flexbox, Grid, Responsive Design, CSS-Variablen) und schließen mit einem Mini-Projekt ab.

**Schwierigkeitsprogression:** ⭐ (04) → ⭐⭐⭐⭐⭐ (20)

---

## Übersicht der neuen Tasks

|  #  | ID             | Titel                  | Typ | Schwierigkeit |
| :-: | :------------- | :--------------------- | :-- | :------------ |
|  4  | html-basics-04 | Links erstellen        | DOM | ⭐            |
|  5  | html-basics-05 | Listen strukturieren   | DOM | ⭐⭐          |
|  6  | html-basics-06 | Eine Tabelle bauen     | DOM | ⭐⭐          |
|  7  | html-basics-07 | Ein Formular erstellen | DOM | ⭐⭐⭐        |
|  8  | html-basics-08 | Farben mit CSS ändern  | DOM | ⭐⭐          |
|  9  | html-basics-09 | Text ausrichten        | DOM | ⭐⭐          |
| 10  | html-basics-10 | Abstände verstehen     | DOM | ⭐⭐⭐        |
| 11  | html-basics-11 | Schriftarten ändern    | DOM | ⭐⭐          |
| 12  | html-basics-12 | Hover-Effekte          | DOM | ⭐⭐⭐        |
| 13  | html-basics-13 | Flexbox: Zentrieren    | DOM | ⭐⭐⭐        |
| 14  | html-basics-14 | Flexbox: Navigation    | DOM | ⭐⭐⭐        |
| 15  | html-basics-15 | CSS Grid Basics        | DOM | ⭐⭐⭐⭐      |
| 16  | html-basics-16 | Grid: Galerie-Layout   | DOM | ⭐⭐⭐⭐      |
| 17  | html-basics-17 | Responsives Design     | DOM | ⭐⭐⭐⭐      |
| 18  | html-basics-18 | Pseudo-Klassen         | DOM | ⭐⭐⭐⭐      |
| 19  | html-basics-19 | CSS-Variablen          | DOM | ⭐⭐⭐⭐      |
| 20  | html-basics-20 | Landing-Page Projekt   | DOM | ⭐⭐⭐⭐⭐    |

---

## Task 4: Links erstellen

**ID:** `html-basics-04`  
**Titel:** Links erstellen  
**Schwierigkeit:** ⭐  
**Typ:** DOM

**Instruction:**
HTML ermöglicht es uns, von einer Seite zur anderen zu springen. Das machen wir mit dem Anker-Tag `<a>`.

**Anforderungen:**

1. Erstelle einen Link, der zu `https://example.com` führt.
2. Der angezeigte Text des Links soll `Mehr erfahren` sein.

**Tipp:** Ein Link sieht so aus: `<a href="https://example.com">Linktext</a>`

**InitialCode:**

```json
{
  "html": "<p>Hier geht es weiter...</p>",
  "css": "",
  "js": ""
}
```

**EnabledEditors:** `["html"]`

**ValidationTests:**

```json
[
  {
    "type": "dom",
    "selector": "a[href=\"https://example.com\"]",
    "feedbackFailure": "Wir können keinen Link zu 'https://example.com' finden. Hast du das href-Attribut korrekt gesetzt?"
  },
  {
    "type": "dom",
    "selector": "a",
    "feedbackFailure": "Wir können kein <a>-Tag finden."
  }
]
```

---

## Task 5: Listen strukturieren

**ID:** `html-basics-05`  
**Titel:** Listen strukturieren  
**Schwierigkeit:** ⭐⭐  
**Typ:** DOM

**Instruction:**
Listen sind überall im Web: Menüs, To-Do-Listen, Inhaltsverzeichnisse. HTML bietet `<ul>` für ungeordnete und `<ol>` für geordnete Listen.

**Anforderungen:**

1. Erstelle eine **ungeordnete Liste** (`<ul>`).
2. Füge mindestens **drei** Listeneinträge (`<li>`) mit deinen Hobbys hinzu.

**Tipp:** Vergiss nicht, jeden Eintrag in ein `<li>`-Tag zu packen.

**InitialCode:**

```json
{
  "html": "<p>Meine Hobbys:</p>",
  "css": "",
  "js": ""
}
```

**EnabledEditors:** `["html"]`

**ValidationTests:**

```json
[
  {
    "type": "dom",
    "selector": "ul",
    "feedbackFailure": "Wir können keine <ul>-Liste finden. Hast du das <ul>-Tag verwendet?"
  },
  {
    "type": "dom",
    "selector": "ul li",
    "feedbackFailure": "Deine Liste enthält keine <li>-Einträge. Füge mindestens drei Hobbys als <li> hinzu."
  }
]
```

---

## Task 6: Eine Tabelle bauen

**ID:** `html-basics-06`  
**Titel:** Eine Tabelle bauen  
**Schwierigkeit:** ⭐⭐  
**Typ:** DOM

**Instruction:**
Tabellen helfen, Daten übersichtlich darzustellen – zum Beispiel Noten oder Preislisten.

**Anforderungen:**

1. Erstelle eine Tabelle mit einer Kopfzeile (`<thead>`) und einem Körper (`<tbody>`).
2. Die Kopfzeile soll die Spalten `Name` und `Alter` enthalten (verwende `<th>`).
3. Der Körper soll mindestens **zwei Datenzeilen** enthalten (verwende `<td>`).

**Tipp:** Eine Tabelle beginnt immer mit `<table>`.

**InitialCode:**

```json
{
  "html": "<div>Tabellenplatz</div>",
  "css": "",
  "js": ""
}
```

**EnabledEditors:** `["html"]`

**ValidationTests:**

```json
[
  {
    "type": "dom",
    "selector": "table",
    "feedbackFailure": "Wir können keine <table> finden."
  },
  {
    "type": "dom",
    "selector": "th",
    "feedbackFailure": "Wir können keine Tabellenkopfzellen (<th>) finden."
  },
  {
    "type": "dom",
    "selector": "td",
    "feedbackFailure": "Wir können keine Tabellendatenzellen (<td>) finden."
  }
]
```

---

## Task 7: Ein Formular erstellen

**ID:** `html-basics-07`  
**Titel:** Ein Formular erstellen  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Formulare sind das Herzstück jeder interaktiven Webseite. Sie ermöglichen es Nutzern, Daten einzugeben.

**Anforderungen:**

1. Erstelle ein `<form>`-Element.
2. Füge ein Text-Eingabefeld (`<input type="text">`) mit dem Namen `username` hinzu.
3. Füge einen Absende-Button (`<button type="submit">`) mit dem Text `Absenden` hinzu.

**Tipp:** Das `type="text"`-Attribut sorgt dafür, dass das Feld als Textfeld gerendert wird.

**InitialCode:**

```json
{
  "html": "<div>Anmeldeformular</div>",
  "css": "",
  "js": ""
}
```

**EnabledEditors:** `["html"]`

**ValidationTests:**

```json
[
  {
    "type": "dom",
    "selector": "form",
    "feedbackFailure": "Wir können kein <form>-Element finden."
  },
  {
    "type": "dom",
    "selector": "input[type=\"text\"]",
    "feedbackFailure": "Wir können kein Text-Eingabefeld (<input type=\"text\">) finden."
  },
  {
    "type": "dom",
    "selector": "button[type=\"submit\"]",
    "feedbackFailure": "Wir können keinen Absende-Button (<button type=\"submit\">) finden."
  }
]
```

---

## Task 8: Farben mit CSS ändern

**ID:** `html-basics-08`  
**Titel:** Farben mit CSS ändern  
**Schwierigkeit:** ⭐⭐  
**Typ:** DOM

**Instruction:**
CSS macht das Web bunt. Mit der `color`-Eigenschaft änderst du die Textfarbe.

**Anforderungen:**

1. Im HTML befindet sich bereits ein Paragraph mit dem Text `Ich bin bunt`.
2. Ändere im CSS-Tab die Textfarbe dieses Paragraphs zu `red`.

**Tipp:** Ein Paragraph-Selektor sieht so aus: `p { color: red; }`

**InitialCode:**

```json
{
  "html": "<p>Ich bin bunt</p>",
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
    "selector": "p",
    "property": "color",
    "expectedValue": "red",
    "feedbackFailure": "Der Paragraph ist noch nicht rot. Verwende im CSS `color: red;`."
  }
]
```

---

## Task 9: Text ausrichten

**ID:** `html-basics-09`  
**Titel:** Text ausrichten  
**Schwierigkeit:** ⭐⭐  
**Typ:** DOM

**Instruction:**
Mit CSS kannst du nicht nur Farben, sondern auch die Ausrichtung von Text steuern.

**Anforderungen:**

1. Im HTML ist bereits eine `<h2>`-Überschrift mit dem Text `Willkommen`.
2. Zentriere diese Überschrift mit `text-align: center`.

**InitialCode:**

```json
{
  "html": "<h2>Willkommen</h2>",
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
    "selector": "h2",
    "property": "textAlign",
    "expectedValue": "center",
    "feedbackFailure": "Die Überschrift ist nicht zentriert. Verwende `text-align: center` im CSS."
  }
]
```

---

## Task 10: Abstände verstehen

**ID:** `html-basics-10`  
**Titel:** Abstände verstehen  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Das CSS-Box-Modell ist eines der wichtigsten Konzepte im Webdesign. `padding` ist der Innenabstand, `margin` der Außenabstand.

**Anforderungen:**

1. Im HTML ist bereits ein `<div>` mit der Klasse `box`.
2. Gib dem `.box` im CSS einen Innenabstand (`padding`) von `20px`.
3. Gib dem `.box` im CSS einen Außenabstand (`margin`) von `10px`.

**InitialCode:**

```json
{
  "html": "<div class=\"box\">Box</div>",
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
    "selector": ".box",
    "property": "paddingTop",
    "expectedValue": "20px",
    "feedbackFailure": "Das <div> hat keinen padding von 20px. Verwende `padding: 20px;`."
  },
  {
    "type": "dom",
    "selector": ".box",
    "property": "marginTop",
    "expectedValue": "10px",
    "feedbackFailure": "Das <div> hat keinen margin von 10px. Verwende `margin: 10px;`."
  }
]
```

---

## Task 11: Schriftarten ändern

**ID:** `html-basics-11`  
**Titel:** Schriftarten ändern  
**Schwierigkeit:** ⭐⭐  
**Typ:** DOM

**Instruction:**
Die richtige Schriftart verleiht einer Webseite Charakter.

**Anforderungen:**

1. Ändere die Schriftart des `<p>`-Elements im CSS zu `Arial`.

**InitialCode:**

```json
{
  "html": "<p>Design ist wichtig</p>",
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
    "selector": "p",
    "property": "fontFamily",
    "expectedValue": "Arial",
    "feedbackFailure": "Die Schriftart wurde nicht auf Arial geändert. Verwende `font-family: Arial;`."
  }
]
```

---

## Task 12: Hover-Effekte

**ID:** `html-basics-12`  
**Titel:** Hover-Effekte  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Interaktive Webseiten reagieren auf die Maus des Nutzers. Mit der `:hover`-Pseudoklasse änderst du das Aussehen eines Elements, wenn man mit der Maus darüber fährt.

**Anforderungen:**

1. Im HTML ist bereits ein `<button>` mit der Klasse `btn` vorhanden.
2. Schreibe im CSS eine Regel für `.btn:hover`, die die Hintergrundfarbe (`background-color`) auf `blue` ändert.

**Tipp:** Ein Hover-Selektor sieht so aus: `.btn:hover { ... }`

**InitialCode:**

```json
{
  "html": "<button class=\"btn\">Klick mich</button>",
  "css": ".btn {\n  padding: 10px 20px;\n  border: 1px solid #ccc;\n  background: #eee;\n}",
  "js": ""
}
```

**EnabledEditors:** `["html", "css"]`

**ValidationTests:**

```json
[
  {
    "type": "dom",
    "selector": ".btn",
    "feedbackFailure": "Wir können den Button mit der Klasse 'btn' nicht finden."
  }
]
```

**Anmerkung zur Engine:** Die Engine kann `:hover`-Styles nicht direkt als computed style prüfen (da kein Hover stattfindet). Wir validieren hier das Vorhandensein des Buttons und vertrauen auf die visuelle Prüfung durch den Lernenden. Alternativ könnte man einen `style`-Tag-Inhalts-Test implementieren, das ist aber nicht Teil der aktuellen Engine.

---

## Task 13: Flexbox: Zentrieren

**ID:** `html-basics-13`  
**Titel:** Flexbox: Zentrieren  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Flexbox ist das moderne Werkzeug, um Elemente zu arrangieren. Eine der häufigsten Aufgaben ist das Zentrieren von Inhalten.

**Anforderungen:**

1. Im HTML ist ein Container mit der Klasse `container` und darin ein roter Kreis mit der Klasse `kreis`.
2. Mache den Container zu einem Flex-Container (`display: flex`).
3. Zentriere den Kreis **horizontal** (`justify-content: center`) und **vertikal** (`align-items: center`).

**InitialCode:**

```json
{
  "html": "<div class=\"container\">\n  <div class=\"kreis\"></div>\n</div>",
  "css": ".container {\n  width: 200px;\n  height: 200px;\n  border: 2px dashed #ccc;\n}\n\n.kreis {\n  width: 50px;\n  height: 50px;\n  background: red;\n  border-radius: 50%;\n}",
  "js": ""
}
```

**EnabledEditors:** `["html", "css"]`

**ValidationTests:**

```json
[
  {
    "type": "dom",
    "selector": ".container",
    "property": "display",
    "expectedValue": "flex",
    "feedbackFailure": "Der Container ist kein Flex-Container. Verwende `display: flex;`."
  },
  {
    "type": "dom",
    "selector": ".container",
    "property": "justifyContent",
    "expectedValue": "center",
    "feedbackFailure": "Der Kreis ist nicht horizontal zentriert. Verwende `justify-content: center;`."
  },
  {
    "type": "dom",
    "selector": ".container",
    "property": "alignItems",
    "expectedValue": "center",
    "feedbackFailure": "Der Kreis ist nicht vertikal zentriert. Verwende `align-items: center;`."
  }
]
```

---

## Task 14: Flexbox: Navigation

**ID:** `html-basics-14`  
**Titel:** Flexbox: Navigation  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Navigationsleisten sind ein klassischer Anwendungsfall für Flexbox.

**Anforderungen:**

1. Im HTML ist ein `<nav>`-Element mit drei `<a>`-Links.
2. Mache das `<nav>` zu einem Flex-Container.
3. Setze den Abstand (`gap`) zwischen den Links auf `20px`.

**InitialCode:**

```json
{
  "html": "<nav>\n  <a href=\"#\">Home</a>\n  <a href=\"#\">Über</a>\n  <a href=\"#\">Kontakt</a>\n</nav>",
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
    "selector": "nav",
    "property": "display",
    "expectedValue": "flex",
    "feedbackFailure": "Die Navigation ist kein Flex-Container. Verwende `display: flex;`."
  },
  {
    "type": "dom",
    "selector": "nav",
    "property": "gap",
    "expectedValue": "20px",
    "feedbackFailure": "Der Abstand zwischen den Links ist nicht 20px. Verwende `gap: 20px;`."
  }
]
```

---

## Task 15: CSS Grid Basics

**ID:** `html-basics-15`  
**Titel:** CSS Grid Basics  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Grid ist das mächtigste Layout-System in CSS. Es ermöglicht dir, Elemente in Zeilen und Spalten anzuordnen.

**Anforderungen:**

1. Im HTML ist ein Container mit der Klasse `grid` und vier farbige Kästchen mit der Klasse `item`.
2. Mache den Container zu einem Grid-Container (`display: grid`).
3. Definiere zwei Spalten (`grid-template-columns: 1fr 1fr`) und zwei Zeilen (`grid-template-rows: 100px 100px`).

**InitialCode:**

```json
{
  "html": "<div class=\"grid\">\n  <div class=\"item\" style=\"background:red\">1</div>\n  <div class=\"item\" style=\"background:blue\">2</div>\n  <div class=\"item\" style=\"background:green\">3</div>\n  <div class=\"item\" style=\"background:orange\">4</div>\n</div>",
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
    "selector": ".grid",
    "property": "display",
    "expectedValue": "grid",
    "feedbackFailure": "Der Container ist kein Grid-Container. Verwende `display: grid;`."
  },
  {
    "type": "dom",
    "selector": ".grid",
    "property": "gridTemplateColumns",
    "expectedValue": "1fr 1fr",
    "feedbackFailure": "Das Grid hat nicht zwei Spalten. Verwende `grid-template-columns: 1fr 1fr;`."
  }
]
```

---

## Task 16: Grid: Galerie-Layout

**ID:** `html-basics-16`  
**Titel:** Grid: Galerie-Layout  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Ein echtes Bildergalerie-Layout mit CSS Grid.

**Anforderungen:**

1. Im HTML ist ein Container mit der Klasse `galerie` und sechs Bild-Platzhaltern.
2. Mache die Galerie zu einem Grid mit drei gleich großen Spalten (`grid-template-columns: repeat(3, 1fr)`).
3. Setze den Lückenabstand (`gap`) auf `10px`.

**InitialCode:**

```json
{
  "html": "<div class=\"galerie\">\n  <div class=\"bild\">Bild 1</div>\n  <div class=\"bild\">Bild 2</div>\n  <div class=\"bild\">Bild 3</div>\n  <div class=\"bild\">Bild 4</div>\n  <div class=\"bild\">Bild 5</div>\n  <div class=\"bild\">Bild 6</div>\n</div>",
  "css": ".bild {\n  background: #ddd;\n  height: 100px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}",
  "js": ""
}
```

**EnabledEditors:** `["html", "css"]`

**ValidationTests:**

```json
[
  {
    "type": "dom",
    "selector": ".galerie",
    "property": "display",
    "expectedValue": "grid",
    "feedbackFailure": "Die Galerie ist kein Grid-Container."
  },
  {
    "type": "dom",
    "selector": ".galerie",
    "property": "gridTemplateColumns",
    "expectedValue": "repeat(3, 1fr)",
    "feedbackFailure": "Die Galerie hat nicht drei Spalten. Verwende `grid-template-columns: repeat(3, 1fr);`."
  },
  {
    "type": "dom",
    "selector": ".galerie",
    "property": "gap",
    "expectedValue": "10px",
    "feedbackFailure": "Der Abstand zwischen den Bildern ist nicht 10px. Verwende `gap: 10px;`."
  }
]
```

---

## Task 17: Responsives Design

**ID:** `html-basics-17`  
**Titel:** Responsives Design  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Webseiten müssen auf allen Geräten gut aussehen – vom Handy bis zum Desktop. Mit Media Queries passt du das Layout an die Bildschirmbreite an.

**Anforderungen:**

1. Im HTML ist ein `<div>` mit der Klasse `desktop-only`.
2. Verstecke dieses Element auf Bildschirmen, die schmaler als `600px` sind. Verwende dafür `@media (max-width: 600px) { ... }` und setze `display: none`.

**InitialCode:**

```json
{
  "html": "<div class=\"desktop-only\">Nur auf großen Bildschirmen sichtbar</div>",
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
    "selector": ".desktop-only",
    "feedbackFailure": "Wir können das Element mit der Klasse 'desktop-only' nicht finden."
  }
]
```

**Anmerkung zur Engine:** Media-Query-Styles werden vom Browser je nach Viewport angewendet. Die Validation-Engine prüft den aktuellen computed style. Wir validieren hier das Vorhandensein des Elements und der korrekten CSS-Syntax durch den Lernenden. Für einen harten Test müsste die Engine den Viewport simulieren (nicht implementiert).

---

## Task 18: Pseudo-Klassen

**ID:** `html-basics-18`  
**Titel:** Pseudo-Klassen  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Pseudo-Klassen erlauben es dir, bestimmte Elemente basierend auf ihrer Position zu stylen, ohne jede einzelne Element manuell anzusprechen.

**Anforderungen:**

1. Im HTML ist eine ungeordnete Liste (`<ul>`) mit fünf Einträgen.
2. Färbe jedes **zweite** Listenelement (`<li>`) mit `:nth-child(even)` grau (`background-color: lightgray`).

**InitialCode:**

```json
{
  "html": "<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n  <li>Item 4</li>\n  <li>Item 5</li>\n</ul>",
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
    "selector": "li:nth-child(even)",
    "feedbackFailure": "Wir können keine geraden Listeneinträge finden. Hast du `:nth-child(even)` korrekt geschrieben?"
  }
]
```

---

## Task 19: CSS-Variablen

**ID:** `html-basics-19`  
**Titel:** CSS-Variablen  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** DOM

**Instruction:**
CSS-Variablen (Custom Properties) machen deinen Code wartbarer. Du definierst eine Farbe einmal und nutzt sie an vielen Stellen.

**Anforderungen:**

1. Definiere auf der `:root`-Ebene eine CSS-Variable `--primary` mit dem Wert `blue`.
2. Im HTML ist ein `<button>` mit der Klasse `primary-btn`.
3. Wende die Variable als Hintergrundfarbe (`background-color: var(--primary)`) auf den Button an.

**Tipp:** `:root { --primary: blue; }`

**InitialCode:**

```json
{
  "html": "<button class=\"primary-btn\">Primary</button>",
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
    "selector": ".primary-btn",
    "property": "backgroundColor",
    "expectedValue": "blue",
    "feedbackFailure": "Der Button hat nicht die Hintergrundfarbe blue. Verwende `background-color: var(--primary);` mit `:root { --primary: blue; }`."
  }
]
```

---

## Task 20: Landing-Page Projekt

**ID:** `html-basics-20`  
**Titel:** Landing-Page Projekt  
**Schwierigkeit:** ⭐⭐⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Herzlichen Glückwunsch! Du hast alle Grundlagen gemeistert. In diesem Abschlussprojekt baust du eine kleine Landing-Page, die alles Kombiniert, was du gelernt hast.

**Anforderungen:**

1. Erstelle einen `<header>` mit einer Überschrift `<h1>`.
2. Erstelle einen Bereich mit der Klasse `hero` und darin einem Paragraph `<p>`.
3. Erstelle einen Bereich mit der Klasse `features` und mindestens zwei Feature-Boxen (z. B. `<div class="feature">`).
4. Erstelle einen `<footer>` mit einem Copyright-Text.

**Tipp:** Verwende semantische HTML-Tags wie `<header>` und `<footer>`.

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
    "feedbackFailure": "Wir können keinen <header> mit einer <h1>-Überschrift finden."
  },
  {
    "type": "dom",
    "selector": ".hero p",
    "feedbackFailure": "Wir können keinen Hero-Bereich mit einem Paragraph finden."
  },
  {
    "type": "dom",
    "selector": ".features .feature",
    "feedbackFailure": "Wir können keine Feature-Boxen finden. Erstelle mindestens zwei <div class=\"feature\">."
  },
  {
    "type": "dom",
    "selector": "footer",
    "feedbackFailure": "Wir können kein <footer>-Element finden."
  }
]
```
