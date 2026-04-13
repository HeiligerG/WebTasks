# Phase 11: Instruction Quality Improvement

## Übersicht

**Ziel:** Alle 60 Tasks in den 3 Bundles erhalten konsistente, lernförderliche und vollständige Instruktionen. Die automatisch generierten Tasks aus Phase 10C enthalten derzeit nur einen einleitenden Fließtext, aber keine konkreten Anforderungen und keine Tipps.

**Schwierigkeit:** Die fehlenden Details führen dazu, dass Schüler nicht exakt wissen, was von ihnen erwartet wird – besonders bei den neu hinzugefügten Tasks.

---

## Problemstellung

Während der Implementierung von Phase 10C wurden die Task-Instruktionen aus den Markdown-Planungsdateien extrahiert. Dabei wurde leider nur der Einleitungstext in das JSON-Feld `instruction` übernommen. Die Abschnitte **Anforderungen** und **Tipp** gingen verloren.

**Konkretes Beispiel (Task `html-basics-04`):**

**Aktuell im JSON:**
```json
"instruction": "HTML ermöglicht es uns, von einer Seite zur anderen zu springen. Das machen wir mit dem Anker-Tag `<a>`."
```

**Geplante, vollständige Instruction:**
```markdown
HTML ermöglicht es uns, von einer Seite zur anderen zu springen. Das machen wir mit dem Anker-Tag `<a>`.

**Anforderungen:**
1. Erstelle einen Link, der zu `https://example.com` führt.
2. Der angezeigte Text des Links soll `Mehr erfahren` sein.

**Tipp:**
Ein Link sieht so aus: `<a href="https://example.com">Linktext</a>`
```

---

## Sub-Phasen

| Sub-Phase | Bundle | Scope | Detaillierter Plan |
|:---|:---|:---|:---|
| **11a** | Bundle 1 | 20 HTML/CSS Tasks | `state/phases/11a_phase-bundle1-instructions.md` |
| **11b** | Bundle 2 | 20 JavaScript Tasks | `state/phases/11b_phase-bundle2-instructions.md` |
| **11c** | Bundle 3 | 20 Interactive Web Tasks | `state/phases/11c_phase-bundle3-instructions.md` |

---

## Qualitätskriterien für jede Instruction

Jede überarbeitete `instruction` muss folgende Struktur haben:

1. **Einleitung** (1–2 Sätze)
   - Warum ist dieses Konzept wichtig?
   - Welches HTML/CSS/JS-Feature wird eingeführt?

2. **Anforderungen** (nummerierte Liste)
   - Exakte, konkrete Schritte
   - Klar formulierte Erwartungen
   - Bezug auf IDs, Klassen oder Variablennamen

3. **Tipp** (1 kurzer Absatz oder Code-Schnipsel)
   - Hilft bei typischen Hängern
   - Zeigt die Syntax oder ein ähnliches Beispiel
   - Soll nicht die komplette Lösung verraten

---

## Implementierungs-Workflow

1. **Branch pro Sub-Phase:**
   - `feat/phase-11a-bundle1-instructions`
   - `feat/phase-11b-bundle2-instructions`
   - `feat/phase-11c-bundle3-instructions`

2. **Vorgehen pro Bundle:**
   - Öffne die jeweilige JSON-Datei
   - Für jede Task die `instruction` durch die vollständige Version aus dem Planungsdokument ersetzen
   - `npm run build` ausführen
   - Einen repräsentativen Task in der Live-Preview prüfen

3. **QA:**
   - JSON-Syntax validieren
   - Alle Callout-Trigger (`**Tipp:**`, `**Anforderungen:**`, `**Wichtig:**`) korrekt geschrieben?
   - Keine doppelten Zeilenumbrüche am Anfang/Ende der Instructions

4. **Commit, Merge (`--no-ff`), Branch löschen**

---

## Risiken

| Risiko | Mitigation |
|:---|:---|
| JSON-Syntaxfehler durch lange Multi-Line-Strings | Nach jeder Sub-Phase `jq empty bundle.json` ausführen. |
| Markdown-Callouts werden nicht erkannt | Auf korrekte Syntax achten: `**Tipp:**` (kein Leerzeichen vor dem Doppelpunkt). |
| Plan und JSON werden inkonsistent | Die Planungsdokumente dienen als Single Source of Truth. |
