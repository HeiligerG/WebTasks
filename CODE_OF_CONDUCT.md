# Verhaltenskodex für Mitwirkende

Willkommen bei **WebTasks**! Dieses Projekt wurde für Lernende entwickelt, die interaktiv HTML, CSS und JavaScript entdecken möchten. Wenn du einen Beitrag leisten möchtest – sei es durch Bugfixes, neue Aufgaben oder Verbesserungen am UI – bitten wir dich, die folgenden Regeln und Abläufe zu beachten. Sie sorgen dafür, dass das Projekt übersichtlich, nachvollziehbar und für alle zugänglich bleibt.

---

## 1. Respektvoller Umgang

- **Sei freundlich und geduldig.** Viele Mitwirkende sind am Anfang ihrer Lernreise. Konstruktives Feedback ist willkommen, herablassende Kommentare sind es nicht.
- **Hilf anderen.** Wenn du eine Frage beantworten oder ein Problem erklären kannst, tu es gerne.
- **Akzeptiere unterschiedliche Erfahrungsstufen.** Es gibt keine "dummen" Fragen oder Beiträge.

---

## 2. Git-Workflow (verpflichtend)

Unser Projekt lebt von einem **sauberen, nachvollziehbaren Git-Verlauf**. Jede Änderung muss daher diesem Workflow folgen:

### 2.1 Nie direkt auf `master` committen

Der Branch `master` ist unser produktionsreifer Hauptbranch. **Es ist strikt verboten**, direkt auf `master` zu committen oder zu pushen.

### 2.2 Feature-Branches verwenden

Für jede Änderung – egal ob ein Bugfix, ein neues Feature oder eine Dokumentationsanpassung – erstellst du einen eigenen Branch:

```bash
# Naming-Konventionen
feat/kurze-beschreibung      # Neue Features
fix/kurze-beschreibung       # Bugfixes
docs/kurze-beschreibung      # Dokumentation
refactor/kurze-beschreibung  # Code-Refactorings
```

**Beispiel:**

```bash
git checkout -b fix/dark-mode-list-color
```

### 2.3 Commits sinnvoll gestalten

- Schreibe aussagekräftige Commit-Nachrichten.
- Ein Commit sollte eine in sich geschlossene Einheit sein.
- Vermeide riesige Commits, die mehrere unterschiedliche Themen mischen.

**Gutes Beispiel:**

```
fix(ui): ensure list items are readable in dark mode
```

### 2.4 Merge mit `--no-ff`

Wenn dein Feature-Branch fertig ist und getestet wurde, wird er über einen **non-fast-forward Merge** in `master` integriert:

```bash
git checkout master
git merge --no-ff dein-branch-name -m "Merge branch 'dein-branch-name' into master"
```

Dadurch bleibt der Verlauf des Branches im Git-Graph sichtbar, was die Nachvollziehbarkeit erheblich verbessert.

### 2.5 Branch nach dem Merge löschen

Sobald ein Branch erfolgreich gemerged wurde, wird er gelöscht:

```bash
git branch -d dein-branch-name
```

### 2.6 Kurz zusammengefasst

1. `git checkout -b <branch-name>`
2. Änderungen vornehmen und testen (`npm run build`)
3. `git add <dateien>`
4. `git commit -m "aussagekräftige nachricht"`
5. `git checkout master`
6. `git merge --no-ff <branch-name>`
7. `git branch -d <branch-name>`

---

## 3. Qualitätsanspruch

- **Teste vor dem Commit.** Führe `npm run build` aus und stelle sicher, dass das Projekt fehlerfrei kompiliert.
- **Sei präzise.** Lieber eine kleine, saubere Änderung als ein großer, halbfertiger Patch.
- **Halte dich an bestehende Patterns.** Wenn du Code hinzufügst, orientiere dich am bestehenden Stil (Tailwind-Klassen, React-Komponentenstruktur, etc.).

---

## 4. Reagieren auf Änderungswünsche

- Wenn ein Maintainer Feedback oder Änderungswünsche äußert, nimm sie konstruktiv auf.
- Pushe Korrekturen auf denselben Branch (sofern dieser noch nicht gelöscht wurde) oder erstelle bei größeren Änderungen einen neuen, sauberen Branch.
- Frage nach, wenn etwas unklar ist.

---

## 5. Inhaltliche Beiträge (Aufgaben & Curriculum)

- Neue Aufgaben sollten pädagogisch sinnvoll sein und aufeinander aufbauen.
- Jede Aufgabe benötigt eine klare `instruction` mit:
  1. Kurzer Einleitung
  2. Präzisen `Anforderungen:`
  3. Optional einem `Tipp:`
- Validierungsregeln müssen fair formuliert sein und dem Lernenden bei Fehlern weiterhelfen.

---

## 6. Lizenz

Durch deinen Beitrag stimmst du zu, dass er unter der Lizenz des Projekts veröffentlicht wird.

---

Vielen Dank, dass du WebTasks besser machst!
