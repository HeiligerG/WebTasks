# Phase 11: Instruction Quality – Bundle 2 (JavaScript Grundlagen)

**Ziel:** Alle 20 Tasks in `public/bundles/bundle-02-javascript-basics.json` erhalten vollständige, klare und lernförderliche Instruktionen.

## Problemstellung

Die automatisch generierten Tasks enthalten nur den einleitenden Fließtext als `instruction`, jedoch keine `Anforderungen`-Listen und keine `Tipp`-Hinweise. Das führt dazu, dass Schüler nicht genau wissen, was konkret erwartet wird.

## Qualitätskriterien für überarbeitete Instructions

Jede `instruction` sollte folgende Elemente enthalten:
1. **Einleitung:** 1-2 Sätze zum didaktischen Kontext (Warum lerne ich das?)
2. **Anforderungen:** Nummerierte Liste mit exakten Schritten (Was muss ich tun?)
3. **Tipp (optional):** Ein konkreter Hinweis oder Code-Schnipsel, der bei Hängern hilft

## Zu überarbeitende Tasks

- **Tasks 01–04:** Ursprüngliche Tasks – auf Konsistenz prüfen.
- **Tasks 05–20:** Neue Tasks – `instruction` muss um `Anforderungen` und `Tipp` ergänzt werden.

---

## js-basics-05: Vergleichsoperatoren

**Neue Instruction:**

```markdown
Programme müssen oft Werte miteinander vergleichen. In JavaScript gibt es dafür Operatoren wie `>`, `<`, `===` und `!==`.

**Anforderungen:**
1. Gib das Ergebnis von `10 > 5` mit `console.log()` aus.
2. Gib das Ergebnis von `7 === "7"` mit `console.log()` aus.

**Tipp:**
`===` prüft auf Gleichheit UND denselben Typ. `"7"` ist ein String, `7` ist eine Zahl.
```

---

## js-basics-06: Logische Operatoren

**Neue Instruction:**

```markdown
Manchmal müssen mehrere Bedingungen gleichzeitig erfüllt sein. Dafür nutzen wir `&&` (UND) und `||` (ODER).

**Anforderungen:**
Schreibe eine Funktion `hatZugang(alt, eingeloggt)`, die `true` zurückgibt, wenn `alt >= 18` **UND** `eingeloggt === true` ist. Ansonsten soll sie `false` zurückgeben.
```

---

## js-basics-07: switch-Statement

**Neue Instruction:**

```markdown
Wenn du viele Bedingungen für denselben Wert prüfen musst, ist `switch` übersichtlicher als viele `if-else`.

**Anforderungen:**
Schreibe eine Funktion `wochentag(num)`, die für:
- `1` → `"Montag"`
- `2` → `"Dienstag"`
- `3` → `"Mittwoch"`
- `7` → `"Sonntag"`
zurückgibt. Für unbekannte Zahlen gib `"Unbekannt"` zurück.
```

---

## js-basics-08: for-Schleife

**Neue Instruction:**

```markdown
Schleifen wiederholen Code so lange, wie eine Bedingung erfüllt ist. `for` ist die häufigste Schleife, wenn du eine bestimmte Anzahl Durchläufe kennst.

**Anforderungen:**
Gib die Zahlen von 1 bis 5 (jede in einer neuen Zeile) mit einer `for`-Schleife und `console.log()` aus.

**Tipp:**
`for (let i = 1; i <= 5; i++) { ... }`
```

---

## js-basics-09: while-Schleife

**Neue Instruction:**

```markdown
Eine `while`-Schleife läuft so lange, wie eine Bedingung wahr ist.

**Anforderungen:**
Schreibe eine `while`-Schleife, die von 3 bis 1 herunterzählt und folgendes in der Konsole ausgibt:
```
Noch 3...
Noch 2...
Noch 1...
```
```

---

## js-basics-10: Arrays: Element finden

**Neue Instruction:**

```markdown
Arrays sind Listen von Werten. Mit einer Schleife kannst du durch ein Array gehen und bestimmte Elemente finden.

**Anforderungen:**
Schreibe eine Funktion `findeGroesste(zahlen)`, die ein Array von Zahlen erhält und die größte Zahl zurückgibt.

**Beispiel:** `findeGroesste([3, 8, 2, 10, 5])` soll `10` zurückgeben.
```

---

## js-basics-11: Array-Methoden (map)

**Neue Instruction:**

```markdown
Moderne JavaScript-Entwickler nutzen Array-Methoden wie `map`, `filter` und `find`, statt manuell Schleifen zu schreiben.

**Anforderungen:**
Schreibe eine Funktion `verdopple(zahlen)`, die jedes Element eines Zahlen-Arrays verdoppelt und das neue Array zurückgibt. Verwende dafür `.map()`.

**Beispiel:** `verdopple([1, 2, 3])` → `[2, 4, 6]`
```

---

## js-basics-12: Objekte erstellen

**Neue Instruction:**

```markdown
Objekte speichern zusammengehörige Daten in Schlüssel-Wert-Paaren.

**Anforderungen:**
1. Erstelle ein Objekt `buch` mit den Eigenschaften `titel` (Wert: `"Harry Potter"`) und `autor` (Wert: `"J.K. Rowling"`).
2. Gib den Titel mit `console.log(buch.titel)` aus.
```

---

## js-basics-13: Objekteigenschaften lesen

**Neue Instruction:**

```markdown
Funktionen können Objekte als Parameter erhalten und deren Eigenschaften auslesen.

**Anforderungen:**
Schreibe eine Funktion `gibAutor(buch)`, die ein Objekt mit der Eigenschaft `autor` erhält und diesen Autor als String zurückgibt.
```

---

## js-basics-14: Eigene Funktionen

**Neue Instruction:**

```markdown
Funktionen sind die Bausteine eines Programms. Sie kapseln Code, den man mehrfach verwenden kann.

**Anforderungen:**
Schreibe eine Funktion `begruesse(name)`, die einen Namen erhält und `"Hallo [Name]!"` zurückgibt.

**Beispiel:** `begruesse("Max")` → `"Hallo Max!"`
```

---

## js-basics-15: Parameter und Rückgabe

**Neue Instruction:**

```markdown
Funktionen können mehrere Parameter entgegennehmen und mit `return` ein Ergebnis liefern.

**Anforderungen:**
Schreibe eine Funktion `berechneFlaeche(breite, hoehe)`, die die Fläche eines Rechtecks berechnet und zurückgibt.
```

---

## js-basics-16: DOM-Element finden

**Neue Instruction:**

```markdown
JavaScript kann HTML-Elemente auf der Seite finden und verändern. Das nennt man DOM-Manipulation.

**Anforderungen:**
1. Im HTML ist ein `<div>` mit der ID `box` vorhanden.
2. Wähle dieses Element im JavaScript mit `document.getElementById('box')` aus.
3. Ändere die Hintergrundfarbe des Elements auf `red`.
```

---

## js-basics-17: Auf Klicks reagieren

**Neue Instruction:**

```markdown
Event-Listener machen Webseiten interaktiv. Sie "hören" auf Aktionen des Nutzers.

**Anforderungen:**
1. Im HTML ist ein `<button>` mit der ID `mein-button`.
2. Füge im JavaScript einen `click`-Event-Listener zu diesem Button hinzu.
3. Beim Klick soll ein `<p>`-Element mit der ID `ausgabe` den Text `Geklickt!` erhalten.
```

---

## js-basics-18: Eingabewerte lesen

**Neue Instruction:**

```markdown
Formulare sind nutzlos, wenn wir ihre Werte nicht auslesen können.

**Anforderungen:**
1. Im HTML gibt es ein `<input type="text" id="name">` und ein `<p id="gruss">`.
2. Füge einen Button mit der ID `gruessen` hinzu.
3. Beim Klick auf den Button soll der Wert aus dem Input-Feld gelesen und in das Paragraph-Element geschrieben werden: `Hallo [Name]!`
```

---

## js-basics-19: Zufallszahlen

**Neue Instruction:**

```markdown
Zufallszahlen sind spannend für Spiele und Simulationen.

**Anforderungen:**
Schreibe eine Funktion `wuerfle()`, die eine ganze Zahl zwischen 1 und 6 (inklusive) zurückgibt.

**Tipp:**
`Math.random()` gibt eine Zahl zwischen 0 und 1 zurück. `Math.floor()` rundet ab.
```

---

## js-basics-20: Taschenrechner-Projekt

**Neue Instruction:**

```markdown
Das Finale von Bundle 2! Du baust eine Funktion, die wie ein simpler Taschenrechner funktioniert.

**Anforderungen:**
Schreibe eine Funktion `rechne(a, b, operator)`, die zwei Zahlen und einen Operator (`+`, `-`, `*`, `/`) erhält und das Ergebnis zurückgibt.

**Beispiele:**
- `rechne(5, 3, "+")` → `8`
- `rechne(10, 2, "/")` → `5`
```
