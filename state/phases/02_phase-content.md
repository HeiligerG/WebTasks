# Phase 2: Content-Architektur & JSON-Datenmodell — Detaillierte Task-Planung

> **Dokumentenzweck:** Dieses Dokument enthält die vollständige Aufschlüsselung aller Tasks für Phase 2. Jeder Task ist eigenständig abgrenzbar, priorisiert und mit konkreten Akzeptanzkriterien versehen.  
> **Phase-DoD:** Ein striktes, validierbares Datenmodell für Bundles und Tasks existiert. TypeScript-Typen und Laufzeit-Validierung stammen aus einer einzigen Quelle der Wahrheit (Zod). Ein erstes Canary-Bundle wird erfolgreich geladen, validiert und im Frontend als typisiertes Objekt konsumiert.

---

## Grundsatzentscheidung: Zod als Validierungs-Framework

Die Wahl des Validators ist strategisch kritisch für die gesamte Content-Pipeline. Zwei Optionen stehen im Raum: **Ajv** (klassischer JSON-Schema-Validator) und **Zod** (schema-deklarative TypeScript-Bibliothek).

**Entscheidung für Zod:**

1. **Single Source of Truth:** Mit Zod wird das Schema direkt in TypeScript-Code definiert. Durch `z.infer<typeof Schema>` leiten sich die TypeScript-Interfaces vollautomatisch ab. Bei Ajv müssten JSON-Schema und TypeScript-Typen separat gepflegt werden, was bei Erweiterungen zu Inkonsistenzen führt.
2. **Entwicklererfahrung:** Zod liefert deutlich bessere, strukturierte Fehlermeldungen (`zodError.issues`), die ideal für die spätere Anzeige von Content-Fehlern in der Konsole oder UI sind.
3. **Ökosystem-Konsistenz:** Zod ist das aktuell dominierende Schema-Validation-Tool im React/TypeScript-Ökosystem und harmoniert perfekt mit modernen Data-Fetching-Patterns.
4. **Flexibilität:** Sollte zu einem späteren Zeitpunkt dennoch ein klassisches JSON-Schema benötigt werden (z. B. für externe Editoren), kann dies via `zod-to-json-schema` automatisch exportiert werden.

---

## Task-Übersicht

| ID   | Task-Name                                                | Priorität | Geschätzter Aufwand |
| :--- | :------------------------------------------------------- | :-------- | :------------------ |
| 2.1  | Domain-Modell und Content-Hierarchie definieren          | Kritisch  | Klein               |
| 2.2  | Zod installieren und Basis-Schemata anlegen              | Kritisch  | Klein               |
| 2.3  | Schema für `ValidationTest` (HTML/CSS/JS) implementieren | Hoch      | Mittel              |
| 2.4  | Schemata für `Task` und `Bundle` implementieren          | Kritisch  | Mittel              |
| 2.5  | TypeScript-Typen aus Zod ableiten und exportieren        | Kritisch  | Klein               |
| 2.6  | Content-Loader-Service implementieren                    | Hoch      | Mittel              |
| 2.7  | Content-Ordnerstruktur in `public/bundles/` etablieren   | Mittel    | Klein               |
| 2.8  | Canary-Bundle "HTML/CSS Grundlagen" als JSON erstellen   | Hoch      | Mittel              |
| 2.9  | Integrationstest: Laden & Validieren des Canary-Bundles  | Kritisch  | Klein               |
| 2.10 | Dokumentation aktualisieren (`current-state.md`)         | Mittel    | Klein               |

---

## Task 2.1: Domain-Modell und Content-Hierarchie definieren

**Beschreibung:**
Bevor Code geschrieben wird, muss die semantische Struktur der Lerninhalte feststehen. Diese Task dokumentiert das vereinbarte Domain-Modell, das die Grundlage für alle nachfolgenden Schemata und Typen bildet.

**Aktionen:**

1. Festlegung der Hierarchie: Ein **Bundle** enthält Metadaten und eine Liste von **Tasks**.
2. Festlegung der `Task`-Eigenschaften:
   - `id`: Global eindeutiger String (z. B. `html-basics-01`).
   - `title`: Anzeigename der Aufgabe.
   - `instruction`: Markdown-String mit didaktischen Erklärungen.
   - `initialCode`: Objekt mit `html`, `css`, `js` (jeweils optional/leer).
   - `enabledEditors`: Array, das festlegt, welche Editoren sichtbar sind (`'html' | 'css' | 'js'`).
   - `validationTests`: Array von Test-Regeln.
3. Festlegung der `Bundle`-Eigenschaften:
   - `id`: Eindeutiger String (z. B. `bundle-1-html`).
   - `title`: Anzeigename des Bundles.
   - `description`: Kurzbeschreibung für die Startseite.
   - `badgeName`: Name des Badges bei Bundle-Abschluss.
   - `tasks`: Array von `Task`-Objekten.
4. Festlegung der `ValidationTest`-Struktur (drei Varianten):
   - **DOM-Test:** Für HTML/CSS. Prüft Element-Existenz und/oder berechnete Styles.
   - **Console-Test:** Für einfache JS-Aufgaben. Prüft `console.log`-Output.
   - **Function-Test:** Für komplexere JS-Logik. Ruft eine Schüler-Funktion auf und prüft Rückgabewerte.
5. Dokumentation dieser Struktur als Kommentar-Block im geplanten Schema-File.

**Akzeptanzkriterien:**

- [ ] Eine schriftliche Spezifikation der Domain-Objekte (`Bundle`, `Task`, `ValidationTest`) existiert im Planungsdokument oder als Code-Kommentar.
- [ ] Alle im `Konzept.md` geforderten Eigenschaften (`id`, `instruction`, `initialCode`, `validationTests` etc.) sind berücksichtigt.
- [ ] Die drei Test-Typen (DOM, Console, Function) sind klar voneinander abgegrenzt.

---

## Task 2.2: Zod installieren und Basis-Schemata anlegen

**Beschreibung:**
Die technische Grundlage für die Laufzeit-Validierung wird durch die Installation von Zod und die Anlage der zentralen Schema-Dateien geschaffen.

**Aktionen:**

1. `npm install zod` ausführen.
2. Eine neue Datei `src/types/content.ts` anlegen (später werden hier Schemata und Typen kombiniert).
3. Einen ersten "Hello Zod"-Test in einer separaten Datei (oder kurzzeitig in `src/lib/`) anlegen, um die Installation zu verifizieren (z. B. simples String-Schema parsen).

**Akzeptanzkriterien:**

- [ ] `zod` ist in `package.json` unter `dependencies` gelistet.
- [ ] `src/types/content.ts` existiert.
- [ ] Ein einfacher `z.string().parse()`-Aufruf kompiliert und führt ohne Fehler aus.

---

## Task 2.3: Schema für `ValidationTest` implementieren

**Beschreibung:**
Die Validierungsregeln sind das komplexeste und sensibelste Element des Datenmodells. Sie müssen polymorph sein (unterschiedliche Test-Typen mit unterschiedlichen Konfigurationen), aber dennoch streng typisiert.

**Aktionen:**

1. In `src/types/content.ts` ein discriminated-union Schema für `ValidationTest` definieren:
   - Gemeinsame Basis: `type` (Literal), `feedbackSuccess` (string, optional), `feedbackFailure` (string).
   - `DomTest`: `type: 'dom'`, `selector` (string), `property` (optional string, z. B. `backgroundColor`), `expectedValue` (optional string).
   - `ConsoleTest`: `type: 'console'`, `expectedOutput` (string oder string-Array).
   - `FunctionTest`: `type: 'function'`, `functionName` (string), `args` (Array von any), `expectedResult` (any).
2. Sicherstellen, dass Zod's `z.discriminatedUnion` (oder in Zod v3 `z.union` mit `.pipe`) korrekt eingesetzt wird.
3. Mindestens ein ungültiges Test-Objekt definieren und sicherstellen, dass Zod es korrekt ablehnt.

**Akzeptanzkriterien:**

- [ ] `ValidationTestSchema` existiert und unterscheidet korrekt zwischen `dom`, `console` und `function`.
- [ ] Jedes Test-Schema enthält `feedbackFailure` als Pflichtfeld.
- [ ] Ein falscher `type`-Wert führt zu einem Zod-Parser-Fehler.
- [ ] TypeScript-Typ `ValidationTest` ist via `z.infer<typeof ValidationTestSchema>` abgeleitet und exportiert.

---

## Task 2.4: Schemata für `Task` und `Bundle` implementieren

**Beschreibung:**
Die obersten Aggregate im Content-Modell werden als Zod-Objekte modelliert. Diese Schemata verknüpfen alle vorher definierten Teil-Schemata.

**Aktionen:**

1. `TaskSchema` in `src/types/content.ts` definieren:
   - `id`: `z.string().min(1)`
   - `title`: `z.string().min(1)`
   - `instruction`: `z.string()`
   - `initialCode`: `z.object({ html: z.string(), css: z.string(), js: z.string() })`
   - `enabledEditors`: `z.array(z.enum(['html', 'css', 'js']))`
   - `validationTests`: `z.array(ValidationTestSchema).min(1)` (jede Task braucht mindestens einen Test)
2. `BundleSchema` definieren:
   - `id`: `z.string().min(1)`
   - `title`: `z.string().min(1)`
   - `description`: `z.string()`
   - `badgeName`: `z.string()`
   - `tasks`: `z.array(TaskSchema).min(1)`
3. Ein `BundleListSchema` definieren (`z.array(BundleSchema)`), um später mehrere Bundle-Dateien zu validieren.

**Akzeptanzkriterien:**

- [ ] `TaskSchema` und `BundleSchema` sind vollständig definiert und exportiert.
- [ ] `enabledEditors` akzeptiert nur die drei gültigen Werte.
- [ ] Ein Bundle ohne Tasks wird von Zod als invalid zurückgewiesen.
- [ ] Ein Task ohne `validationTests` wird von Zod als invalid zurückgewiesen.

---

## Task 2.5: TypeScript-Typen aus Zod ableiten und exportieren

**Beschreibung:**
Die zentrale Stärke von Zod ist die automatische Typableitung. Diese Task sichert, dass der Rest der Applikation niemals gegen veraltete oder manuell gepflegte Interfaces arbeitet.

**Aktionen:**

1. Aus `src/types/content.ts` folgende Typen ableiten und exportieren:
   - `export type Bundle = z.infer<typeof BundleSchema>;`
   - `export type Task = z.infer<typeof TaskSchema>;`
   - `export type ValidationTest = z.infer<typeof ValidationTestSchema>;`
   - `export type DomTest = Extract<ValidationTest, { type: 'dom' }>;` (analog für Console und Function)
2. Kurze Verifikation in einer anderen Datei (z. B. `src/stores/appStore.ts` oder `src/lib/contentLoader.ts`): Ein Objekt vom Typ `Bundle` muss vom TypeScript-Compiler akzeptiert werden.

**Akzeptanzkriterien:**

- [ ] Alle vier Typen sind aus den Zod-Schemata abgeleitet und aus `src/types/content.ts` exportiert.
- [ ] Ein Import von `Bundle` oder `Task` in einer anderen Datei funktioniert ohne TypeScript-Fehler.
- [ ] Änderungen am Zod-Schema spiegeln sich sofort in den abgeleiteten TypeScript-Typen wider.

---

## Task 2.6: Content-Loader-Service implementieren

**Beschreibung:**
Der Loader ist die Brücke zwischen statischen JSON-Dateien im `public/`-Ordner und der reaktiven Applikation. Er muss JSON-Dateien fetchen, parsen und mit Zod validieren.

**Aktionen:**

1. Datei `src/lib/contentLoader.ts` anlegen.
2. Eine Funktion `loadBundle(url: string): Promise<Bundle>` implementieren:
   - `fetch(url)`
   - `response.json()`
   - `BundleSchema.parseAsync(data)`
3. Eine Funktion `loadAllBundles(manifest: string[]): Promise<Bundle[]>` implementieren:
   - Nimmt ein Array von URLs/Pfaden entgegen.
   - Lädt alle Bundles parallel via `Promise.all`.
   - Wirft einen aggregierten Fehler, wenn einzelne Bundles invalid sind, loggt aber zumindest die konkreten Zod-Fehler in die Konsole.
4. Sinnvolles Error-Handling: Bei einem Zod-Fehler soll eine verständliche Fehlermeldung (Bundle-URL + Liste der `issue.message`s) in `console.error` ausgegeben werden.

**Akzeptanzkriterien:**

- [ ] `loadBundle` existiert und gibt bei gültigem JSON ein typisiertes `Bundle`-Objekt zurück.
- [ ] `loadAllBundles` existiert und lädt mehrere Bundles parallel.
- [ ] Bei invalidem JSON wird ein aussagekräftiger Fehler geworfen (inkl. Bundle-Name und Zod-Details).
- [ ] Der Service ist vollständig typisiert.

---

## Task 2.7: Content-Ordnerstruktur in `public/bundles/` etablieren

**Beschreibung:**
Die physische Speicherung der Lerninhalte muss übersichtlich und skalierbar sein.

**Aktionen:**

1. Im `public/bundles/`-Verzeichnis Unterordner oder eine klare Dateinamenskonvention etablieren.
   - Vorschlag: Ein JSON pro Bundle, direkt im `public/bundles/`-Ordner.
   - Beispiel: `public/bundles/bundle-01-html-basics.json`
2. Eine `manifest.json` (oder ähnliches Register) in `public/bundles/` anlegen, das eine Liste aller verfügbaren Bundle-Dateien enthält. Dies ermöglicht dem Frontend, dynamisch zu erfahren, welche Bundles existieren, ohne den Code zu ändern.
   - Beispiel: `{ "bundles": ["/bundles/bundle-01-html-basics.json"] }`
3. Alternativ (einfacher): Die Liste der Bundles wird initial hartcodiert in einem Config-Objekt gehalten, das später leicht erweitert werden kann. Für Phase 2 ist die einfache Variante ausreichend; die Manifest-Idee kann als `optional` markiert werden.

**Akzeptanzkriterien:**

- [ ] `public/bundles/` enthält mindestens eine `.json`-Datei (das Canary-Bundle).
- [ ] Die Dateistruktur ist dokumentiert (z. B. in `AGENTS.md` oder als Kommentar im Loader).
- [ ] (Optional) Eine `manifest.json` existiert und listet die verfügbaren Bundles auf.

---

## Task 2.8: Canary-Bundle "HTML/CSS Grundlagen" als JSON erstellen

**Beschreibung:**
Ein erstes, vollständiges Bundle dient als Referenz und erlaubt es, den gesamten Loader- und Validierungs-Flow End-to-End zu testen. Es muss nicht die finale didaktische Perfektion haben, aber alle strukturellen Eigenschaften abbilden.

**Aktionen:**

1. Datei `public/bundles/bundle-01-html-basics.json` anlegen.
2. Das Bundle mit realistischen, aber vereinfachten Inhalten befüllen:
   - **Bundle-Metadaten:** `id: "bundle-01-html-basics"`, `title: "HTML & CSS Grundlagen"`, `description: "..."`, `badgeName: "UI-Designer Level 1"`
   - **Task 1:** "Dein erstes HTML-Element"
     - `instruction`: Kurze Markdown-Erklärung zu `<h1>`.
     - `initialCode`: `{ "html": "<p>Hallo Welt</p>", "css": "", "js": "" }`
     - `enabledEditors`: `["html"]`
     - `validationTests`: Ein DOM-Test, der prüft, ob ein `<h1>` im DOM existiert.
   - **Task 2:** "Bilder einbinden"
     - `instruction`: Erklärung zu `<img>`.
     - `initialCode`: `{ "html": "<div>Bild kommt hier hin</div>", ... }`
     - `enabledEditors`: `["html"]`
     - `validationTests`: DOM-Test auf `<img>`-Tag.
   - **Task 3 (Master-Task-Vorläufer):** "Deine Profilkarte"
     - `instruction`: Kombination aus HTML und CSS.
     - `initialCode`: HTML-Grundgerüst + leeres CSS.
     - `enabledEditors`: `["html", "css"]`
     - `validationTests`: Mehrere DOM-Tests (z. B. `.profile-card` existiert, Bild hat `border-radius`).
3. Sicherstellen, dass das JSON syntaktisch korrekt ist (z. B. via `cat | python3 -m json.tool` oder VS Code).

**Akzeptanzkriterien:**

- [ ] `bundle-01-html-basics.json` existiert und ist syntaktisch valides JSON.
- [ ] Das Bundle enthält mindestens 3 Tasks mit unterschiedlichen Konfigurationen.
- [ ] Mindestens ein Task nutzt `enabledEditors: ["html", "css"]`.
- [ ] Mindestens ein Task enthält mehrere `validationTests`.
- [ ] Alle `feedbackFailure`-Strings sind menschenlesbar und didaktisch hilfreich formuliert.

---

## Task 2.9: Integrationstest — Laden & Validieren des Canary-Bundles

**Beschreibung:**
Diese Task verifiziert, dass Loader, Zod-Schema und Canary-Bundle zusammenspielen. Der Test findet vorläufig in einer temporären Komponente oder direkt in `App.tsx` statt.

**Aktionen:**

1. In `App.tsx` (oder einer temporären Test-Komponente) den `loadBundle`-Service aufrufen:
   - `loadBundle('/bundles/bundle-01-html-basics.json')`
2. Das geladene Bundle in einem `useEffect`-Hook laden und im `console.log` ausgeben.
3. Bei Erfolg: Die `title`-Eigenschaft des Bundles und die Anzahl der Tasks in der UI anzeigen (z. B. "Bundle 'HTML & CSS Grundlagen' geladen. 3 Tasks gefunden.").
4. Bei Fehler (z. B. wenn das JSON manuell korrumpiert wird): Eine rote Fehlermeldung in der UI anzeigen.
5. Nach erfolgreichem Test: Die Test-UI wieder entfernen oder minimieren, sodass `App.tsx` wieder auf das Routing fokussiert ist.

**Akzeptanzkriterien:**

- [ ] Der Dev-Server lädt `bundle-01-html-basics.json` ohne Zod-Fehler.
- [ ] Die Konsole zeigt das geparste Bundle-Objekt.
- [ ] Wenn das JSON absichtlich invalidiert wird (z. B. fehlendes `title`), erscheint eine verständliche Fehlermeldung in der Browser-Konsole.
- [ ] `npm run build` bleibt nach dem Test-Code fehlerfrei.

---

## Task 2.10: Dokumentation aktualisieren

**Beschreibung:**
`state/current-state.md` muss den Abschluss von Phase 2 dokumentieren und den Übergang zu Phase 3 vorbereiten.

**Aktionen:**

1. In `state/current-state.md`:
   - Phase 2 auf ✅ setzen.
   - Phase 3 auf 🔄 setzen.
   - Abgeschlossene Meilensteine um "Phase 2 Implementierung" ergänzen.
   - Offene Entscheidungen aktualisieren: JSON-Validator (Zod) als entschieden markieren.
2. Optional: In `AGENTS.md` einen kurzen Hinweis ergänzen, wo die Content-Dateien liegen und wie sie validiert werden.

**Akzeptanzkriterien:**

- [ ] `state/current-state.md` reflektiert korrekt, dass Phase 2 abgeschlossen ist.
- [ ] Phase 3 ist als neue aktive Phase markiert.

---

## Phase-2 Definition of Done (Zusammenfassung)

Die Phase 2 gilt als **vollständig abgeschlossen**, wenn folgende Bedingungen erfüllt sind:

1. ✅ Zod ist installiert und als zentrales Validierungs-Framework etabliert.
2. ✅ `BundleSchema`, `TaskSchema` und `ValidationTestSchema` sind in `src/types/content.ts` implementiert und exportiert.
3. ✅ Alle TypeScript-Typen (`Bundle`, `Task`, `ValidationTest`) werden automatisch aus den Zod-Schemata abgeleitet (`z.infer`).
4. ✅ `src/lib/contentLoader.ts` kann JSON-Dateien laden und mit Zod validieren.
5. ✅ `public/bundles/bundle-01-html-basics.json` existiert als syntaktisch korrektes, valides Canary-Bundle.
6. ✅ Die Applikation lädt das Canary-Bundle im Browser erfolgreich und zeigt dessen Metadaten an (oder loggt sie).
7. ✅ `npm run lint`, `npm run format` und `npm run build` laufen fehlerfrei durch.
8. ✅ `state/current-state.md` dokumentiert den Abschluss von Phase 2.
