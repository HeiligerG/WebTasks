# Phase 10C: Curriculum Scale – Bundle 2 (JavaScript Grundlagen)

**Ziel:** Bundle 2 von 4 auf 20 Tasks erweitern. Die neuen Tasks 05–20 führen den Lernenden von Vergleichsoperatoren über Schleifen, Arrays und Objekte bis hin zu DOM-Selektion und Event-Handling. Der Abschluss ist ein Taschenrechner-Projekt.

**Schwierigkeitsprogression:** ⭐ (05) → ⭐⭐⭐⭐⭐ (20)

---

## Übersicht der neuen Tasks

|  #  | ID           | Titel                     | Typ          | Schwierigkeit |
| :-: | :----------- | :------------------------ | :----------- | :------------ |
|  5  | js-basics-05 | Vergleichsoperatoren      | Console      | ⭐            |
|  6  | js-basics-06 | Logische Operatoren       | Function     | ⭐⭐          |
|  7  | js-basics-07 | switch-Statement          | Function     | ⭐⭐⭐        |
|  8  | js-basics-08 | for-Schleife              | Console      | ⭐⭐⭐        |
|  9  | js-basics-09 | while-Schleife            | Console      | ⭐⭐⭐        |
| 10  | js-basics-10 | Arrays: Element finden    | Function     | ⭐⭐⭐        |
| 11  | js-basics-11 | Array-Methoden (map)      | Function     | ⭐⭐⭐⭐      |
| 12  | js-basics-12 | Objekte erstellen         | Console      | ⭐⭐⭐        |
| 13  | js-basics-13 | Objekteigenschaften lesen | Function     | ⭐⭐⭐        |
| 14  | js-basics-14 | Eigene Funktionen         | Function     | ⭐⭐⭐        |
| 15  | js-basics-15 | Parameter und Rückgabe    | Function     | ⭐⭐⭐⭐      |
| 16  | js-basics-16 | DOM-Element finden        | DOM          | ⭐⭐⭐        |
| 17  | js-basics-17 | Auf Klicks reagieren      | DOM          | ⭐⭐⭐⭐      |
| 18  | js-basics-18 | Eingabewerte lesen        | Function+DOM | ⭐⭐⭐⭐      |
| 19  | js-basics-19 | Zufallszahlen             | Function     | ⭐⭐⭐⭐      |
| 20  | js-basics-20 | Taschenrechner-Projekt    | Function     | ⭐⭐⭐⭐⭐    |

---

## Task 5: Vergleichsoperatoren

**ID:** `js-basics-05`  
**Titel:** Vergleichsoperatoren  
**Schwierigkeit:** ⭐  
**Typ:** Console

**Instruction:**
Programme müssen oft Werte miteinander vergleichen. In JavaScript gibt es dafür Operatoren wie `>`, `<`, `===` und `!==`.

**Anforderungen:**

1. Gib das Ergebnis von `10 > 5` mit `console.log()` aus.
2. Gib das Ergebnis von `7 === "7"` mit `console.log()` aus.

**Tipp:** `===` prüft auf Gleichheit UND denselben Typ. `"7"` ist ein String, `7` ist eine Zahl.

**InitialCode:**

```json
{
  "html": "",
  "css": "",
  "js": "// Gib die Ergebnisse der Vergleiche hier aus\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**

```json
[
  {
    "type": "console",
    "expectedOutput": "true",
    "feedbackFailure": "Die Konsole zeigt nicht 'true' an. Hast du `console.log(10 > 5)` geschrieben?"
  },
  {
    "type": "console",
    "expectedOutput": "false",
    "feedbackFailure": "Die Konsole zeigt nicht 'false' an. Denke daran: `7 === \"7\"` ist false, weil die Typen unterschiedlich sind."
  }
]
```

---

## Task 6: Logische Operatoren

**ID:** `js-basics-06`  
**Titel:** Logische Operatoren  
**Schwierigkeit:** ⭐⭐  
**Typ:** Function

**Instruction:**
Manchmal müssen mehrere Bedingungen gleichzeitig erfüllt sein. Dafür nutzen wir `&&` (UND) und `||` (ODER).

**Anforderungen:**
Schreibe eine Funktion `hatZugang(alt, eingeloggt)`, die `true` zurückgibt, wenn `alt >= 18` **UND** `eingeloggt === true` ist. Ansonsten soll sie `false` zurückgeben.

**InitialCode:**

```json
{
  "html": "",
  "css": "",
  "js": "function hatZugang(alt, eingeloggt) {\n  // Schreibe deine Bedingung hier\n}\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**

```json
[
  {
    "type": "function",
    "functionName": "hatZugang",
    "args": [20, true],
    "expectedResult": true,
    "feedbackFailure": "Für (20, true) sollte true zurückgegeben werden. Beide Bedingungen müssen mit && verknüpft sein."
  },
  {
    "type": "function",
    "functionName": "hatZugang",
    "args": [16, true],
    "expectedResult": false,
    "feedbackFailure": "Für (16, true) sollte false zurückgegeben werden, da das Alter unter 18 ist."
  },
  {
    "type": "function",
    "functionName": "hatZugang",
    "args": [25, false],
    "expectedResult": false,
    "feedbackFailure": "Für (25, false) sollte false zurückgegeben werden, da der Nutzer nicht eingeloggt ist."
  }
]
```

---

## Task 7: switch-Statement

**ID:** `js-basics-07`  
**Titel:** switch-Statement  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** Function

**Instruction:**
Wenn du viele Bedingungen für denselben Wert prüfen musst, ist `switch` übersichtlicher als viele `if-else`.

**Anforderungen:**
Schreibe eine Funktion `wochentag(num)`, die für:

- `1` → `"Montag"`
- `2` → `"Dienstag"`
- `3` → `"Mittwoch"`
- `7` → `"Sonntag"`
  zurückgibt. Für unbekannte Zahlen gib `"Unbekannt"` zurück.

**InitialCode:**

```json
{
  "html": "",
  "css": "",
  "js": "function wochentag(num) {\n  // Verwende ein switch-Statement\n}\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**

```json
[
  {
    "type": "function",
    "functionName": "wochentag",
    "args": [1],
    "expectedResult": "Montag",
    "feedbackFailure": "Für 1 sollte 'Montag' zurückgegeben werden."
  },
  {
    "type": "function",
    "functionName": "wochentag",
    "args": [7],
    "expectedResult": "Sonntag",
    "feedbackFailure": "Für 7 sollte 'Sonntag' zurückgegeben werden."
  },
  {
    "type": "function",
    "functionName": "wochentag",
    "args": [99],
    "expectedResult": "Unbekannt",
    "feedbackFailure": "Für unbekannte Zahlen sollte 'Unbekannt' zurückgegeben werden (default-Case)."
  }
]
```

---

## Task 8: for-Schleife

**ID:** `js-basics-08`  
**Titel:** for-Schleife  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** Console

**Instruction:**
Schleifen wiederholen Code so lange, wie eine Bedingung erfüllt ist. `for` ist die häufigste Schleife, wenn du eine bestimmte Anzahl Durchläufe kennst.

**Anforderungen:**
Gib die Zahlen von 1 bis 5 (jede in einer neuen Zeile) mit einer `for`-Schleife und `console.log()` aus.

**Tipp:** `for (let i = 1; i <= 5; i++) { ... }`

**InitialCode:**

```json
{
  "html": "",
  "css": "",
  "js": "// Schreibe deine for-Schleife hier\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**

```json
[
  {
    "type": "console",
    "expectedOutput": "1",
    "feedbackFailure": "Die Konsole zeigt nicht die Zahlen 1 bis 5 an. Hast du eine for-Schleife verwendet?"
  },
  {
    "type": "console",
    "expectedOutput": "5",
    "feedbackFailure": "Die Schleife scheint nicht bis 5 zu laufen. Prüfe deine Bedingung (i <= 5)."
  }
]
```

---

## Task 9: while-Schleife

**ID:** `js-basics-09`  
**Titel:** while-Schleife  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** Console

**Instruction:**
Eine `while`-Schleife läuft so lange, wie eine Bedingung wahr ist.

**Anforderungen:**
Schreibe eine `while`-Schleife, die von 3 bis 1 herunterzählt und folgendes in der Konsole ausgibt:

```
Noch 3...
Noch 2...
Noch 1...
```

**InitialCode:**

```json
{
  "html": "",
  "css": "",
  "js": "// Schreibe deine while-Schleife hier\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**

```json
[
  {
    "type": "console",
    "expectedOutput": "Noch 3...",
    "feedbackFailure": "Die Ausgabe 'Noch 3...' fehlt."
  },
  {
    "type": "console",
    "expectedOutput": "Noch 1...",
    "feedbackFailure": "Die Ausgabe 'Noch 1...' fehlt oder die Schleife endet zu früh."
  }
]
```

---

## Task 10: Arrays: Element finden

**ID:** `js-basics-10`  
**Titel:** Arrays: Element finden  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** Function

**Instruction:**
Arrays sind Listen von Werten. Mit einer Schleife kannst du durch ein Array gehen und bestimmte Elemente finden.

**Anforderungen:**
Schreibe eine Funktion `findeGroesste(zahlen)`, die ein Array von Zahlen erhält und die größte Zahl zurückgibt.

**Beispiel:** `findeGroesste([3, 8, 2, 10, 5])` soll `10` zurückgeben.

**InitialCode:**

```json
{
  "html": "",
  "css": "",
  "js": "function findeGroesste(zahlen) {\n  // Schreibe deine Lösung hier\n}\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**

```json
[
  {
    "type": "function",
    "functionName": "findeGroesste",
    "args": [[3, 8, 2, 10, 5]],
    "expectedResult": 10,
    "feedbackFailure": "Die Funktion sollte 10 zurückgeben. Gehe das Array durch und merke dir die bisher größte Zahl."
  },
  {
    "type": "function",
    "functionName": "findeGroesste",
    "args": [[-5, -1, -10]],
    "expectedResult": -1,
    "feedbackFailure": "Die Funktion sollte -1 zurückgeben. Denke daran: negative Zahlen können auch die größten sein."
  }
]
```

---

## Task 11: Array-Methoden (map)

**ID:** `js-basics-11`  
**Titel:** Array-Methoden (map)  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** Function

**Instruction:**
Moderne JavaScript-Entwickler nutzen Array-Methoden wie `map`, `filter` und `find`, statt manuell Schleifen zu schreiben.

**Anforderungen:**
Schreibe eine Funktion `verdopple(zahlen)`, die jedes Element eines Zahlen-Arrays verdoppelt und das neue Array zurückgibt. Verwende dafür `.map()`.

**Beispiel:** `verdopple([1, 2, 3])` → `[2, 4, 6]`

**InitialCode:**

```json
{
  "html": "",
  "css": "",
  "js": "function verdopple(zahlen) {\n  // Verwende .map()\n}\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**

```json
[
  {
    "type": "function",
    "functionName": "verdopple",
    "args": [[1, 2, 3]],
    "expectedResult": [2, 4, 6],
    "feedbackFailure": "Die Funktion sollte [2, 4, 6] zurückgeben. Verwende `return zahlen.map(zahl => zahl * 2);`."
  }
]
```

---

## Task 12: Objekte erstellen

**ID:** `js-basics-12`  
**Titel:** Objekte erstellen  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** Console

**Instruction:**
Objekte speichern zusammengehörige Daten in Schlüssel-Wert-Paaren.

**Anforderungen:**

1. Erstelle ein Objekt `buch` mit den Eigenschaften `titel` (Wert: `"Harry Potter"`) und `autor` (Wert: `"J.K. Rowling"`).
2. Gib den Titel mit `console.log(buch.titel)` aus.

**InitialCode:**

```json
{
  "html": "",
  "css": "",
  "js": "// Erstelle das Objekt und gib den Titel aus\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**

```json
[
  {
    "type": "console",
    "expectedOutput": "Harry Potter",
    "feedbackFailure": "Die Konsole zeigt nicht 'Harry Potter' an. Hast du das Objekt korrekt erstellt und `buch.titel` ausgegeben?"
  }
]
```

---

## Task 13: Objekteigenschaften lesen

**ID:** `js-basics-13`  
**Titel:** Objekteigenschaften lesen  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** Function

**Instruction:**
Funktionen können Objekte als Parameter erhalten und deren Eigenschaften auslesen.

**Anforderungen:**
Schreibe eine Funktion `gibAutor(buch)`, die ein Objekt mit der Eigenschaft `autor` erhält und diesen Autor als String zurückgibt.

**InitialCode:**

```json
{
  "html": "",
  "css": "",
  "js": "function gibAutor(buch) {\n  // Gib den Autor zurück\n}\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**

```json
[
  {
    "type": "function",
    "functionName": "gibAutor",
    "args": [{ "titel": "1984", "autor": "George Orwell" }],
    "expectedResult": "George Orwell",
    "feedbackFailure": "Die Funktion sollte 'George Orwell' zurückgeben. Greife mit `buch.autor` auf die Eigenschaft zu."
  }
]
```

---

## Task 14: Eigene Funktionen

**ID:** `js-basics-14`  
**Titel:** Eigene Funktionen  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** Function

**Instruction:**
Funktionen sind die Bausteine eines Programms. Sie kapseln Code, den man mehrfach verwenden kann.

**Anforderungen:**
Schreibe eine Funktion `begruesse(name)`, die einen Namen erhält und `"Hallo [Name]!"` zurückgibt.

**Beispiel:** `begruesse("Max")` → `"Hallo Max!"`

**InitialCode:**

```json
{
  "html": "",
  "css": "",
  "js": "function begruesse(name) {\n  // Gib die Begrüßung zurück\n}\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**

```json
[
  {
    "type": "function",
    "functionName": "begruesse",
    "args": ["Max"],
    "expectedResult": "Hallo Max!",
    "feedbackFailure": "Die Funktion sollte 'Hallo Max!' zurückgeben. Verwende String-Verkettung oder Template-Literale."
  }
]
```

---

## Task 15: Parameter und Rückgabe

**ID:** `js-basics-15`  
**Titel:** Parameter und Rückgabe  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** Function

**Instruction:**
Funktionen können mehrere Parameter entgegennehmen und mit `return` ein Ergebnis liefern.

**Anforderungen:**
Schreibe eine Funktion `berechneFlaeche(breite, hoehe)`, die die Fläche eines Rechtecks berechnet und zurückgibt.

**InitialCode:**

```json
{
  "html": "",
  "css": "",
  "js": "function berechneFlaeche(breite, hoehe) {\n  // Berechne die Fläche\n}\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**

```json
[
  {
    "type": "function",
    "functionName": "berechneFlaeche",
    "args": [5, 3],
    "expectedResult": 15,
    "feedbackFailure": "Die Fläche von 5 x 3 sollte 15 sein."
  },
  {
    "type": "function",
    "functionName": "berechneFlaeche",
    "args": [10, 10],
    "expectedResult": 100,
    "feedbackFailure": "Die Fläche von 10 x 10 sollte 100 sein."
  }
]
```

---

## Task 16: DOM-Element finden

**ID:** `js-basics-16`  
**Titel:** DOM-Element finden  
**Schwierigkeit:** ⭐⭐⭐  
**Typ:** DOM

**Instruction:**
JavaScript kann HTML-Elemente auf der Seite finden und verändern. Das nennt man DOM-Manipulation.

**Anforderungen:**

1. Im HTML ist ein `<div>` mit der ID `box` vorhanden.
2. Wähle dieses Element im JavaScript mit `document.getElementById('box')` aus.
3. Ändere die Hintergrundfarbe des Elements auf `red`.

**InitialCode:**

```json
{
  "html": "<div id=\"box\" style=\"width:100px;height:100px;background:#eee\">Box</div>",
  "css": "",
  "js": "// Wähle das Element und ändere die Farbe\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**

```json
[
  {
    "type": "dom",
    "selector": "#box",
    "property": "backgroundColor",
    "expectedValue": "red",
    "feedbackFailure": "Die Box ist nicht rot. Hast du das Element mit document.getElementById ausgewählt und style.backgroundColor auf 'red' gesetzt?"
  }
]
```

---

## Task 17: Auf Klicks reagieren

**ID:** `js-basics-17`  
**Titel:** Auf Klicks reagieren  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** DOM

**Instruction:**
Event-Listener machen Webseiten interaktiv. Sie "hören" auf Aktionen des Nutzers.

**Anforderungen:**

1. Im HTML ist ein `<button>` mit der ID `mein-button`.
2. Füge im JavaScript einen `click`-Event-Listener zu diesem Button hinzu.
3. Beim Klick soll ein `<p>`-Element mit der ID `ausgabe` den Text `Geklickt!` erhalten.

**InitialCode:**

```json
{
  "html": "<button id=\"mein-button\">Klick mich</button>\n<p id=\"ausgabe\">Noch nicht geklickt</p>",
  "css": "",
  "js": "// Füge den Event-Listener hier ein\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**

```json
[
  {
    "type": "dom",
    "selector": "#mein-button",
    "feedbackFailure": "Der Button mit der ID 'mein-button' fehlt."
  },
  {
    "type": "dom",
    "selector": "#ausgabe",
    "feedbackFailure": "Das Paragraph-Element mit der ID 'ausgabe' fehlt."
  }
]
```

---

## Task 18: Eingabewerte lesen

**ID:** `js-basics-18`  
**Titel:** Eingabewerte lesen  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** Function+DOM

**Instruction:**
Formulare sind nutzlos, wenn wir ihre Werte nicht auslesen können.

**Anforderungen:**

1. Im HTML gibt es ein `<input type="text" id="name">` und ein `<p id="gruss">`.
2. Füge einen Button mit der ID `gruessen` hinzu.
3. Beim Klick auf den Button soll der Wert aus dem Input-Feld gelesen und in das Paragraph-Element geschrieben werden: `Hallo [Name]!`

**InitialCode:**

```json
{
  "html": "<input type=\"text\" id=\"name\" placeholder=\"Dein Name\">\n<button id=\"gruessen\">Grüßen</button>\n<p id=\"gruss\"></p>",
  "css": "",
  "js": "// Lies den Wert aus und zeige den Gruß an\n"
}
```

**EnabledEditors:** `["html", "js"]`

**ValidationTests:**

```json
[
  {
    "type": "dom",
    "selector": "#name",
    "feedbackFailure": "Das Input-Feld mit der ID 'name' fehlt."
  },
  {
    "type": "dom",
    "selector": "#gruessen",
    "feedbackFailure": "Der Button mit der ID 'gruessen' fehlt."
  },
  {
    "type": "dom",
    "selector": "#gruss",
    "feedbackFailure": "Das Paragraph-Element mit der ID 'gruss' fehlt."
  }
]
```

---

## Task 19: Zufallszahlen

**ID:** `js-basics-19`  
**Titel:** Zufallszahlen  
**Schwierigkeit:** ⭐⭐⭐⭐  
**Typ:** Function

**Instruction:**
Zufallszahlen sind spannend für Spiele und Simulationen.

**Anforderungen:**
Schreibe eine Funktion `wuerfle()`, die eine ganze Zahl zwischen 1 und 6 (inklusive) zurückgibt.

**Tipp:** `Math.random()` gibt eine Zahl zwischen 0 und 1 zurück. `Math.floor()` rundet ab.

**InitialCode:**

```json
{
  "html": "",
  "css": "",
  "js": "function wuerfle() {\n  // Gib eine Zahl zwischen 1 und 6 zurück\n}\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**

```json
[
  {
    "type": "function",
    "functionName": "wuerfle",
    "args": [],
    "expectedResult": null,
    "feedbackFailure": "Dieser Test ist ein Smoke-Test. Die Engine prüft hier nur, ob die Funktion existiert und einen numerischen Wert zurückgibt (1-6)."
  }
]
```

**Anmerkung:** Da Zufall nicht deterministisch ist, kann die Engine nur prüfen, ob die Funktion existiert und einen Wert im Bereich 1-6 zurückgibt. Dies erfordert möglicherweise eine Erweiterung der Engine für Range-Prüfungen.

---

## Task 20: Taschenrechner-Projekt

**ID:** `js-basics-20`  
**Titel:** Taschenrechner-Projekt  
**Schwierigkeit:** ⭐⭐⭐⭐⭐  
**Typ:** Function

**Instruction:**
Das Finale von Bundle 2! Du baust eine Funktion, die wie ein simpler Taschenrechner funktioniert.

**Anforderungen:**
Schreibe eine Funktion `rechne(a, b, operator)`, die zwei Zahlen und einen Operator (`+`, `-`, `*`, `/`) erhält und das Ergebnis zurückgibt.

**Beispiele:**

- `rechne(5, 3, "+")` → `8`
- `rechne(10, 2, "/")` → `5`

**InitialCode:**

```json
{
  "html": "",
  "css": "",
  "js": "function rechne(a, b, operator) {\n  // Implementiere die Rechenoperation\n}\n"
}
```

**EnabledEditors:** `["js"]`

**ValidationTests:**

```json
[
  {
    "type": "function",
    "functionName": "rechne",
    "args": [5, 3, "+"],
    "expectedResult": 8,
    "feedbackFailure": "5 + 3 sollte 8 ergeben."
  },
  {
    "type": "function",
    "functionName": "rechne",
    "args": [10, 4, "-"],
    "expectedResult": 6,
    "feedbackFailure": "10 - 4 sollte 6 ergeben."
  },
  {
    "type": "function",
    "functionName": "rechne",
    "args": [4, 5, "*"],
    "expectedResult": 20,
    "feedbackFailure": "4 * 5 sollte 20 ergeben."
  },
  {
    "type": "function",
    "functionName": "rechne",
    "args": [8, 2, "/"],
    "expectedResult": 4,
    "feedbackFailure": "8 / 2 sollte 4 ergeben."
  }
]
```
