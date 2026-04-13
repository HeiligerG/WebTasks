# Phase 7: Gamification & Motivationsdesign — Detaillierte Task-Planung

> **Dokumentenzweck:** Dieses Dokument enthält die vollständige Aufschlüsselung aller Tasks für Phase 7. Jeder Task ist eigenständig abgrenzbar, priorisiert und mit konkreten Akzeptanzkriterien versehen.  
> **Phase-DoD:** Die Plattform belohnt erfolgreiche Aufgabenabschlüsse mit visuellen Mikro-Interaktionen (Konfetti), vergibt digitale Badges für Bundle-Abschlüsse und bietet eine Zertifikats-Ansicht als Abschluss des Schnuppertages.

---

## Grundsatzentscheidung: canvas-confetti für Mikro-Interaktionen

Für die visuelle Belohnung beim Bestehen einer Aufgabe wird die Bibliothek `canvas-confetti` verwendet.

**Begründung:**

- `canvas-confetti` ist die am weitesten verbreitete, leichtgewichtige und performante Partikel-Animation für den Browser.
- Sie benötigt kein React-Wrapper-Paket (kann direkt als Funktionsaufruf verwendet werden), was Bundle-Overhead minimiert.
- Die API ist extrem simpel (`confetti({ origin: { y: 0.7 } })`) und erlaubt trotzdem Anpassungen wie Farben, Partikelanzahl und Schwerkraft.

---

## Task-Übersicht

| ID  | Task-Name                                                    | Priorität | Geschätzter Aufwand |
| :-- | :----------------------------------------------------------- | :-------- | :------------------ |
| 7.1 | `canvas-confetti` installieren und Basis-Trigger testen      | Kritisch  | Klein               |
| 7.2 | Konfetti-Animation bei erfolgreicher Validierung integrieren | Kritisch  | Klein               |
| 7.3 | Badge-System im Zustand-Store modellieren                    | Hoch      | Klein               |
| 7.4 | `BadgeDisplay`-Komponente erstellen                          | Hoch      | Klein               |
| 7.5 | Bundle-Abschluss-Badges automatisch vergeben                 | Hoch      | Mittel              |
| 7.6 | Zertifikats-/Abschlussseite erstellen                        | Mittel    | Mittel              |
| 7.7 | Zertifikats-Druck- oder Export-Funktion vorbereiten          | Mittel    | Klein               |
| 7.8 | Smoke-Tests und Build-Validierung                            | Kritisch  | Klein               |
| 7.9 | Dokumentation aktualisieren (`current-state.md`)             | Mittel    | Klein               |

---

## Task 7.1: `canvas-confetti` installieren und Basis-Trigger testen

**Beschreibung:**
Die technische Grundlage für die Konfetti-Animation wird gelegt.

**Aktionen:**

1. `npm install canvas-confetti` ausführen.
2. Optional: `@types/canvas-confetti` als Dev-Dependency installieren (für TypeScript-Typen).
3. Eine kurze Utility-Funktion `src/lib/confetti.ts` anlegen:
   ```ts
   import confetti from 'canvas-confetti';
   export function triggerConfetti() {
     confetti({
       particleCount: 100,
       spread: 70,
       origin: { y: 0.6 },
     });
   }
   ```
4. Einen schnellen Test durchführen (z. B. temporär einen Button in `HomePage` mit `onClick={triggerConfetti}`).

**Akzeptanzkriterien:**

- [ ] `canvas-confetti` ist in `package.json` gelistet.
- [ ] `triggerConfetti` existiert und ist exportiert.
- [ ] Ein Test-Klick löst visuell sichtbares Konfetti im Browser aus.

---

## Task 7.2: Konfetti-Animation bei erfolgreicher Validierung integrieren

**Beschreibung:**
Die Belohnung soll direkt beim Klick auf "Code prüfen" erscheinen, sobald alle Tests bestanden sind.

**Aktionen:**

1. In `src/components/InstructionPanel.tsx` (oder `TaskPage.tsx`) den `validationResult`-Flow erweitern.
2. Ein `useEffect` in `InstructionPanel` hinzufügen, das auf Änderungen von `validationResult` lauscht.
3. Wenn `validationResult.success` von `false/null` auf `true` wechselt, `triggerConfetti()` aufrufen.
4. Sicherstellen, dass das Konfetti nicht mehrfach hintereinander abgefeuert wird (z. B. durch einen lokalen Ref-Guard oder indem nur auf echte Übergänge reagiert wird).

**Akzeptanzkriterien:**

- [ ] Beim erfolgreichen Bestehen einer Aufgabe erscheint eine Konfetti-Animation.
- [ ] Bei Fehlschlag oder erneutem Prüfen einer bereits bestandenen Aufgabe wird kein neues Konfetti ausgelöst (oder nur bei erstmaligem Bestehen).
- [ ] Die Animation blockiert weder die UI noch die weitere Interaktion.

---

## Task 7.3: Badge-System im Zustand-Store modellieren

**Beschreibung:**
Digitale Abzeichen (Badges) sind die zentrale extrinsische Belohnung für Bundle-Abschlüsse.

**Aktionen:**

1. `src/stores/appStore.ts` erweitern:
   - Neuer State-Slice: `unlockedBadges: string[]` (Array von `badgeName`-Strings).
   - Neue Action: `unlockBadge: (badgeName: string) => void`.
2. Die `persist`-Konfiguration anpassen, sodass `unlockedBadges` ebenfalls in `localStorage` gespeichert wird.
3. `unlockBadge` soll verhindern, dass ein Badge mehrfach hinzugefügt wird (`includes`-Check).

**Akzeptanzkriterien:**

- [ ] `unlockedBadges` und `unlockBadge` sind im Store verfügbar und werden persistiert.
- [ ] Ein Badge kann nicht zweimal in das Array gelangen.
- [ ] Der `localStorage`-Eintrag enthält nach dem Unlock den Badge-Namen.

---

## Task 7.4: `BadgeDisplay`-Komponente erstellen

**Beschreibung:**
Die erhaltenen Badges müssen dem Schüler irgendwo sichtbar gemacht werden.

**Aktionen:**

1. Datei `src/components/BadgeDisplay.tsx` anlegen.
2. Props: `badges: string[]`.
3. Visuelle Gestaltung:
   - Einzelne Badges als runde oder abgerundete Chips/Kacheln darstellen.
   - Farbe: z. B. gelber Hintergrund mit Stern-Icon oder Medaillon-Icon.
   - Falls `badges.length === 0`: Ein freundlicher Hinweis wie "Schließe dein erstes Bundle ab, um Abzeichen zu sammeln!".
4. Integration:
   - In `HomePage` unterhalb der Bundle-Kacheln einbinden.
   - Optional: In `TaskPage` im Header oder in der Instruktionsleiste anzeigen (für Phase 7 reicht die HomePage-Anzeige).

**Akzeptanzkriterien:**

- [ ] `BadgeDisplay.tsx` existiert und rendert alle übergebenen Badges.
- [ ] Auf der Startseite sind die bereits freigeschalteten Badges sichtbar.
- [ ] Leerer Zustand zeigt eine motivierende Nachricht an.

---

## Task 7.5: Bundle-Abschluss-Badges automatisch vergeben

**Beschreibung:**
Wenn alle Tasks eines Bundles als `completed` markiert sind, soll der Schüler automatisch das entsprechende Badge erhalten.

**Aktionen:**

1. In `TaskPage.tsx` (oder einem neuen `useEffect` in der Validierungs-Logik) prüfen, ob nach dem Bestehen der aktuellen Aufgabe das gesamte Bundle nun abgeschlossen ist.
2. Prüfung: `const allCompleted = bundle.tasks.every((t) => completedTasks.includes(t.id));`
3. Falls `allCompleted` zutrifft: `unlockBadge(bundle.badgeName)` aufrufen.
4. Optional: Eine stärkere/differenzierte Konfetti-Animation für den Bundle-Abschluss (z. B. mehr Partikel, längere Dauer) auslösen.

**Akzeptanzkriterien:**

- [ ] Nach Abschluss der letzten Aufgabe eines Bundles wird `bundle.badgeName` zu `unlockedBadges` hinzugefügt.
- [ ] Das Badge erscheint sofort in der `BadgeDisplay`-Komponente auf der Startseite.
- [ ] Ein Bundle-Abschluss löst eine besonders ausgeprägte Konfetti-Animation aus (optional, aber empfohlen).

---

## Task 7.6: Zertifikats-/Abschlussseite erstellen

**Beschreibung:**
Am Ende des Schnuppertages soll der Schüler ein visuelles "Zertifikat" oder eine Abschlussseite sehen, das seine Leistungen zusammenfasst.

**Aktionen:**

1. Neue Route `/certificate` in `App.tsx` hinzufügen.
2. Neue Komponente `src/components/CertificatePage.tsx` erstellen.
3. Inhalt der Seite:
   - Gratulationstext (z. B. "Herzlichen Glückwunsch zum Abschluss deines Schnuppertages!").
   - Liste der abgeschlossenen Bundles und deren Badges.
   - Anzahl der gelösten Aufgaben.
   - Ein großes, freundliches Layout (z. B. zentriert, mit einem Rahmen, der wie ein Zertifikat aussieht).
4. Navigation:
   - Link zurück zur Startseite.
   - Optional: Ein Button "Zertifikat drucken" (siehe Task 7.7).
5. Die Seite soll erreichbar sein, sobald mindestens ein Bundle abgeschlossen wurde. Alternativ kann sie immer erreichbar sein und einfach den aktuellen Stand anzeigen.

**Akzeptanzkriterien:**

- [ ] Die Route `/certificate` existiert und zeigt die `CertificatePage` an.
- [ ] Die Seite zeigt abgeschlossene Bundles, Badges und die Anzahl gelöster Aufgaben an.
- [ ] Das Layout ist visuell ansprechend und auf den Schnuppertag-Fokus ausgerichtet.

---

## Task 7.7: Zertifikats-Druck- oder Export-Funktion vorbereiten

**Beschreibung:**
Ein physisches Mitbringsel erhöht den Erinnerungswert und die Motivation.

**Aktionen:**

1. In `CertificatePage` einen Button "Zertifikat drucken" hinzufügen.
2. Der Button ruft `window.print()` auf.
3. Ein `@media print`-Stylesheet in `src/index.css` oder inline in `CertificatePage` hinzufügen:
   - Header, Navigations-Buttons und Hintergrundfarben ausblenden.
   - Nur den Zertifikats-Rahmen und den Text sichtbar lassen.
   - Seitenränder optimieren.
4. Optional: Eine "Als Bild speichern"-Funktion ist für Phase 7 nicht zwingend erforderlich, aber erwähnenswert für spätere Erweiterungen.

**Akzeptanzkriterien:**

- [ ] Der "Drucken"-Button löst den Browser-Druckdialog aus.
- [ ] Im Druck-Layout sind nur die relevanten Zertifikats-Inhalte sichtbar.
- [ ] Keine UI-Elemente (Header, Buttons) erscheinen auf dem Ausdruck.

---

## Task 7.8: Smoke-Tests und Build-Validierung

**Beschreibung:**
Die Gamification-Features werden End-to-End getestet.

**Aktionen:**

1. `npm run lint`, `npm run format`, `npm run build` ausführen.
2. Dev-Server starten und folgende Szenarien testen:
   - **A:** Eine Aufgabe lösen → Konfetti erscheint.
   - **B:** Letzte Aufgabe eines Bundles lösen → Badge "UI-Designer Level 1" erscheint auf der Startseite.
   - **C:** `/certificate` aufrufen → Seite zeigt Badge und abgeschlossene Aufgaben.
   - **D:** "Drucken"-Button klicken → Druckvorschau ist sauber.
3. Alle Tests manuell verifizieren.

**Akzeptanzkriterien:**

- [ ] `npm run lint`, `npm run format` und `npm run build` sind fehlerfrei.
- [ ] Szenarien A bis D verhalten sich wie erwartet.
- [ ] Keine Laufzeitfehler in der Browser-Konsole.

---

## Task 7.9: Dokumentation aktualisieren

**Beschreibung:**
`state/current-state.md` muss den Abschluss von Phase 7 dokumentieren und den Übergang zu Phase 8 vorbereiten.

**Aktionen:**

1. In `state/current-state.md`:
   - Phase 7 auf ✅ setzen.
   - Phase 8 auf 🔄 setzen.
   - Abgeschlossene Meilensteine um "Phase 7 Implementierung" ergänzen.

**Akzeptanzkriterien:**

- [ ] `state/current-state.md` reflektiert korrekt, dass Phase 7 abgeschlossen ist.
- [ ] Phase 8 ist als neue aktive Phase markiert.

---

## Phase-7 Definition of Done (Zusammenfassung)

Die Phase 7 gilt als **vollständig abgeschlossen**, wenn folgende Bedingungen erfüllt sind:

1. ✅ `canvas-confetti` ist installiert und löst bei erfolgreicher Aufgabenvalidierung eine Animation aus.
2. ✅ Der Zustand-Store enthält `unlockedBadges` und speichert diese in `localStorage`.
3. ✅ Eine `BadgeDisplay`-Komponente zeigt alle freigeschalteten Badges an.
4. ✅ Beim Abschluss aller Tasks eines Bundles wird das entsprechende Badge automatisch vergeben.
5. ✅ Eine `/certificate`-Seite fasst die Leistungen des Schülers zusammen.
6. ✅ Die Zertifikatsseite ist druckoptimiert (`window.print()` + `@media print`).
7. ✅ `npm run lint`, `npm run format` und `npm run build` laufen fehlerfrei durch.
8. ✅ `state/current-state.md` dokumentiert den Abschluss von Phase 7.
