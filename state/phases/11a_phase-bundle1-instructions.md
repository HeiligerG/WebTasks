# Phase 11: Instruction Quality – Bundle 1 (HTML & CSS Grundlagen)

**Ziel:** Alle 20 Tasks in `public/bundles/bundle-01-html-basics.json` erhalten vollständige, klare und lernförderliche Instruktionen.

## Problemstellung

Die automatisch generierten Tasks enthalten nur den einleitenden Fließtext als `instruction`, jedoch keine `Anforderungen`-Listen und keine `Tipp`-Hinweise. Das führt dazu, dass Schüler nicht genau wissen, was konkret erwartet wird.

## Qualitätskriterien für überarbeitete Instructions

Jede `instruction` sollte folgende Elemente enthalten:
1. **Einleitung:** 1-2 Sätze zum didaktischen Kontext (Warum lerne ich das?)
2. **Anforderungen:** Nummerierte Liste mit exakten Schritten (Was muss ich tun?)
3. **Tipp (optional):** Ein konkreter Hinweis oder Code-Schnipsel, der bei Hängern hilft

## Zu überarbeitende Tasks

- **Tasks 01–03:** Ursprüngliche Tasks – auf Konsistenz prüfen (Anforderungen-/Tipp-Format an neue Tasks anpassen, falls nötig).
- **Tasks 04–20:** Neue Tasks – `instruction` muss um `Anforderungen` und `Tipp` ergänzt werden.

---

## html-basics-04: Links erstellen

**Neue Instruction:**

```markdown
HTML ermöglicht es uns, von einer Seite zur anderen zu springen. Das machen wir mit dem Anker-Tag `<a>`.

**Anforderungen:**
1. Erstelle einen Link, der zu `https://example.com` führt.
2. Der angezeigte Text des Links soll `Mehr erfahren` sein.

**Tipp:**
Ein Link sieht so aus: `<a href="https://example.com">Linktext</a>`
```

---

## html-basics-05: Listen strukturieren

**Neue Instruction:**

```markdown
Listen sind überall im Web: Menüs, To-Do-Listen, Inhaltsverzeichnisse. HTML bietet `<ul>` für ungeordnete und `<ol>` für geordnete Listen.

**Anforderungen:**
1. Erstelle eine **ungeordnete Liste** (`<ul>`).
2. Füge mindestens **drei** Listeneinträge (`<li>`) mit deinen Hobbys hinzu.

**Tipp:**
Vergiss nicht, jeden Eintrag in ein `<li>`-Tag zu packen.
```

---

## html-basics-06: Eine Tabelle bauen

**Neue Instruction:**

```markdown
Tabellen helfen, Daten übersichtlich darzustellen – zum Beispiel Noten oder Preislisten.

**Anforderungen:**
1. Erstelle eine Tabelle mit einer Kopfzeile (`<thead>`) und einem Körper (`<tbody>`).
2. Die Kopfzeile soll die Spalten `Name` und `Alter` enthalten (verwende `<th>`).
3. Der Körper soll mindestens **zwei Datenzeilen** enthalten (verwende `<td>`).

**Tipp:**
Eine Tabelle beginnt immer mit `<table>`.
```

---

## html-basics-07: Ein Formular erstellen

**Neue Instruction:**

```markdown
Formulare sind das Herzstück jeder interaktiven Webseite. Sie ermöglichen es Nutzern, Daten einzugeben.

**Anforderungen:**
1. Erstelle ein `<form>`-Element.
2. Füge ein Text-Eingabefeld (`<input type="text">`) mit dem Namen `username` hinzu.
3. Füge einen Absende-Button (`<button type="submit">`) mit dem Text `Absenden` hinzu.

**Tipp:**
Das `type="text"`-Attribut sorgt dafür, dass das Feld als Textfeld gerendert wird.
```

---

## html-basics-08: Farben mit CSS ändern

**Neue Instruction:**

```markdown
CSS macht das Web bunt. Mit der `color`-Eigenschaft änderst du die Textfarbe.

**Anforderungen:**
1. Im HTML befindet sich bereits ein Paragraph mit dem Text `Ich bin bunt`.
2. Ändere im CSS-Tab die Textfarbe dieses Paragraphs zu `red`.

**Tipp:**
Ein Paragraph-Selektor sieht so aus: `p { color: red; }`
```

---

## html-basics-09: Text ausrichten

**Neue Instruction:**

```markdown
Mit CSS kannst du nicht nur Farben, sondern auch die Ausrichtung von Text steuern.

**Anforderungen:**
1. Im HTML ist bereits eine `<h2>`-Überschrift mit dem Text `Willkommen`.
2. Zentriere diese Überschrift mit `text-align: center`.
```

---

## html-basics-10: Abstände verstehen

**Neue Instruction:**

```markdown
Das CSS-Box-Modell ist eines der wichtigsten Konzepte im Webdesign. `padding` ist der Innenabstand, `margin` der Außenabstand.

**Anforderungen:**
1. Im HTML ist bereits ein `<div>` mit der Klasse `box`.
2. Gib dem `.box` im CSS einen Innenabstand (`padding`) von `20px`.
3. Gib dem `.box` im CSS einen Außenabstand (`margin`) von `10px`.
```

---

## html-basics-11: Schriftarten ändern

**Neue Instruction:**

```markdown
Die richtige Schriftart verleiht einer Webseite Charakter.

**Anforderungen:**
1. Ändere die Schriftart des `<p>`-Elements im CSS zu `Arial`.
```

---

## html-basics-12: Hover-Effekte

**Neue Instruction:**

```markdown
Interaktive Webseiten reagieren auf die Maus des Nutzers. Mit der `:hover`-Pseudoklasse änderst du das Aussehen eines Elements, wenn man mit der Maus darüber fährt.

**Anforderungen:**
1. Im HTML ist bereits ein `<button>` mit der Klasse `btn` vorhanden.
2. Schreibe im CSS eine Regel für `.btn:hover`, die die Hintergrundfarbe (`background-color`) auf `blue` ändert.

**Tipp:**
Ein Hover-Selektor sieht so aus: `.btn:hover { ... }`
```

---

## html-basics-13: Flexbox: Zentrieren

**Neue Instruction:**

```markdown
Flexbox ist das moderne Werkzeug, um Elemente zu arrangieren. Eine der häufigsten Aufgaben ist das Zentrieren von Inhalten.

**Anforderungen:**
1. Im HTML ist ein Container mit der Klasse `container` und darin ein roter Kreis mit der Klasse `kreis`.
2. Mache den Container zu einem Flex-Container (`display: flex`).
3. Zentriere den Kreis **horizontal** (`justify-content: center`) und **vertikal** (`align-items: center`).
```

---

## html-basics-14: Flexbox: Navigation

**Neue Instruction:**

```markdown
Navigationsleisten sind ein klassischer Anwendungsfall für Flexbox.

**Anforderungen:**
1. Im HTML ist ein `<nav>`-Element mit drei `<a>`-Links.
2. Mache das `<nav>` zu einem Flex-Container.
3. Setze den Abstand (`gap`) zwischen den Links auf `20px`.
```

---

## html-basics-15: CSS Grid Basics

**Neue Instruction:**

```markdown
Grid ist das mächtigste Layout-System in CSS. Es ermöglicht dir, Elemente in Zeilen und Spalten anzuordnen.

**Anforderungen:**
1. Im HTML ist ein Container mit der Klasse `grid` und vier farbige Kästchen mit der Klasse `item`.
2. Mache den Container zu einem Grid-Container (`display: grid`).
3. Definiere zwei Spalten (`grid-template-columns: 1fr 1fr`) und zwei Zeilen (`grid-template-rows: 100px 100px`).
```

---

## html-basics-16: Grid: Galerie-Layout

**Neue Instruction:**

```markdown
Ein echtes Bildergalerie-Layout mit CSS Grid.

**Anforderungen:**
1. Im HTML ist ein Container mit der Klasse `galerie` und sechs Bild-Platzhaltern.
2. Mache die Galerie zu einem Grid mit drei gleich großen Spalten (`grid-template-columns: repeat(3, 1fr)`).
3. Setze den Lückenabstand (`gap`) auf `10px`.
```

---

## html-basics-17: Responsives Design

**Neue Instruction:**

```markdown
Webseiten müssen auf allen Geräten gut aussehen – vom Handy bis zum Desktop. Mit Media Queries passt du das Layout an die Bildschirmbreite an.

**Anforderungen:**
1. Im HTML ist ein `<div>` mit der Klasse `desktop-only`.
2. Verstecke dieses Element auf Bildschirmen, die schmaler als `600px` sind. Verwende dafür `@media (max-width: 600px) { ... }` und setze `display: none`.
```

---

## html-basics-18: Pseudo-Klassen

**Neue Instruction:**

```markdown
Pseudo-Klassen erlauben es dir, bestimmte Elemente basierend auf ihrer Position zu stylen, ohne jede einzelne Element manuell anzusprechen.

**Anforderungen:**
1. Im HTML ist eine ungeordnete Liste (`<ul>`) mit fünf Einträgen.
2. Färbe jedes **zweite** Listenelement (`<li>`) mit `:nth-child(even)` grau (`background-color: lightgray`).
```

---

## html-basics-19: CSS-Variablen

**Neue Instruction:**

```markdown
CSS-Variablen (Custom Properties) machen deinen Code wartbarer. Du definierst eine Farbe einmal und nutzt sie an vielen Stellen.

**Anforderungen:**
1. Definiere auf der `:root`-Ebene eine CSS-Variable `--primary` mit dem Wert `blue`.
2. Im HTML ist ein `<button>` mit der Klasse `primary-btn`.
3. Wende die Variable als Hintergrundfarbe (`background-color: var(--primary)`) auf den Button an.

**Tipp:**
`:root { --primary: blue; }`
```

---

## html-basics-20: Landing-Page Projekt

**Neue Instruction:**

```markdown
Herzlichen Glückwunsch! Du hast alle Grundlagen gemeistert. In diesem Abschlussprojekt baust du eine kleine Landing-Page, die alles Kombiniert, was du gelernt hast.

**Anforderungen:**
1. Erstelle einen `<header>` mit einer Überschrift `<h1>`.
2. Erstelle einen Bereich mit der Klasse `hero` und darin einem Paragraph `<p>`.
3. Erstelle einen Bereich mit der Klasse `features` und mindestens zwei Feature-Boxen (z. B. `<div class="feature">`).
4. Erstelle einen `<footer>` mit einem Copyright-Text.

**Tipp:**
Verwende semantische HTML-Tags wie `<header>` und `<footer>`.
```
