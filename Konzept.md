# Konzept und Architektur einer modularen E-Learning-Plattform für Programmier-Schnupperlehren

## 1\. Einleitung und didaktische Fundierung der Programmierausbildung für Jugendliche

Die Konzeption und Entwicklung einer interaktiven, webbasierten Lernplattform für angehende Applikationsentwickler an Schnuppertagen erfordert ein tiefgreifendes Verständnis sowohl der technologischen Infrastruktur als auch der kognitiven Voraussetzungen der Zielgruppe. Ein Schnuppertag in der Informatik dient primär dazu, Jugendlichen - in der Regel im Alter von 12 bis 15 Jahren - einen realistischen, aber didaktisch reduzierten Einblick in die professionelle Softwareentwicklung zu geben.<sup>1</sup> In diesem Alter sind die Aufmerksamkeitsspannen oft kurz, und die Toleranz für initiale technische Frustrationen ist extrem gering. Die Herausforderung besteht folglich darin, komplexe technologische Konzepte in greifbare, motivierende und visuell ansprechende Module zu übersetzen. Dies muss geschehen, ohne die Lernenden durch administrative oder infrastrukturelle Hürden wie die Installation lokaler Entwicklungsumgebungen (beispielsweise Visual Studio Code), das Einrichten von Node.js-Servern oder das Konfigurieren von Build-Pipelines zu überfordern.<sup>4</sup>

Die Analyse der didaktischen Anforderungen zeigt eindeutig, dass ein rein browserbasierter Ansatz die höchste Erfolgsquote aufweist.<sup>6</sup> Bei diesem Ansatz finden Instruktion, Code-Eingabe, Ausführung und automatisiertes Feedback in einer einzigen, kohärenten Benutzeroberfläche statt. Die Plattform muss dabei von Beginn an hochgradig modular aufgebaut sein, um verschiedene Schwierigkeitsgrade und Abstraktionsebenen präzise abbilden zu können.<sup>8</sup> Dies beginnt bei der Vermittlung von deklarativen Auszeichnungssprachen wie HTML und CSS, schreitet fort zu imperativer, zustandsbasierter Logik mit JavaScript und kulminiert schließlich in kombinierten, funktionalen Projekten, in denen alle drei Kerntechnologien des Webs miteinander orchestriert werden müssen.<sup>9</sup>

Das zugrundeliegende Architekturkonzept muss zwei essenzielle Paradigmen aus der Perspektive des Software-Engineerings kompromisslos erfüllen. Erstens muss das System eine absolut sichere und isolierte Ausführung von nutzergeneriertem Code gewährleisten. Dieses sogenannte Sandboxing ist unabdingbar, um Browser-Abstürze durch Endlosschleifen oder Sicherheitslücken durch Cross-Site-Scripting-Vulnerabilitäten (XSS) auf der Host-Plattform präventiv zu verhindern.<sup>6</sup> Zweitens muss die Plattform hochgradig erweiterbar konzipiert sein. Da der Lehrplan für Schnuppertage dynamisch ist und sich an unterschiedliche Vorkenntnisse der Kandidaten anpassen muss, müssen Lehrpersonen oder Betreuer in der Lage sein, neue Aufgaben oder ganze Aufgaben-Bundles nahtlos hinzuzufügen.<sup>12</sup> Dies muss möglich sein, ohne den eigentlichen Quellcode der React-Applikation zu modifizieren oder einen neuen Build-Prozess anzustoßen. Dies erfordert eine strikte informationstechnologische Trennung von Applikationslogik und Lerninhalten, was idealerweise durch die Implementierung von standardisierten JSON-Strukturen realisiert wird.<sup>8</sup>

Dieser Bericht analysiert die technologischen, didaktischen und strukturellen Best Practices zur vollumfänglichen Realisierung dieser Plattform. Er bewertet Frontend-Frameworks, Code-Editor-Bibliotheken, Mechanismen zur isolierten Code-Ausführung im Browser, sowie fortschrittliche clientseitige Validierungsstrategien für automatisiertes Feedback. Das übergeordnete Ziel ist es, ein erschöpfendes, robustes und zukunftssicheres Architekturkonzept zu liefern, das speziell auf die Bedürfnisse von Schnupperlernenden zugeschnitten ist und die Anforderungen an Modularität, Erweiterbarkeit und Didaktik lückenlos erfüllt.

## 2\. Architektur der Benutzeroberfläche und Navigationsstruktur

Die Benutzeroberfläche (UI) und das Nutzererlebnis (UX) müssen den Prinzipien von Einfachheit, Konsistenz, Barrierefreiheit und intuitiver Navigation folgen.<sup>14</sup> Für Schnupperlernende, die mit der visuellen und funktionalen Komplexität von professionellen Integrated Development Environments (IDEs) nicht vertraut sind, stellt ein überladenes Interface ein massives kognitives Hindernis dar. Die Struktur der gesamten Website muss daher einer klaren, linearen und geführten Logik folgen, die den Nutzer sanft in die Materie einführt.

### 2.1. Die Startseite als didaktischer Einstiegspunkt

Die Startseite (Startpage) fungiert als das primäre Portal und der didaktische Einstiegspunkt der gesamten Plattform. Sie darf keinesfalls mit langen Textblöcken oder komplexen Konfigurationsmenüs überladen sein. Stattdessen muss sie visuell stark geführte Call-to-Action-Elemente (CTAs) aufweisen, die den Nutzer sofort abholen und motivieren.<sup>15</sup> Die Architektur der Startseite sollte in mehrere logische Sektionen unterteilt sein, um den Informationsfluss zu steuern.

Den Auftakt bildet die Hero-Sektion, die eine motivierende, altersgerechte Begrüßung visualisiert. Hier sollte der Fokus auf dem Endresultat der Programmierung liegen - dem Erschaffen von digitalen Produkten. Direkt im Anschluss folgt das Herzstück der Startseite: Die Modul-Selektion. Die geforderten Aufgaben-Bundles müssen als interaktive, großflächige visuelle Kacheln (Cards) dargestellt werden. Diese Darstellung erfüllt den Zweck, die Modularität des Schnuppertages physisch greifbar zu machen. Die Kacheln sollten zudem einen visuellen Statusindikator besitzen. Dieser Indikator signalisiert, ob ein Bundle noch gesperrt, gerade in Bearbeitung oder bereits erfolgreich abgeschlossen ist.<sup>8</sup>

Eine lineare Progression ist für Anfänger oft empfehlenswert, um Überforderung zu vermeiden. Das bedeutet, dass die Kacheln in einer didaktisch sinnvollen Reihenfolge angeordnet sind. Der Nutzer startet zwingend mit den visuellen und statischen Grundlagen, bevor er sich der abstrakteren Logik widmet. Durch den Einsatz einer Web Storage API, wie dem localStorage des Browsers, kann die Applikation den Fortschritt des Nutzers persistent speichern.<sup>16</sup> Lädt der Schnupperlernende die Seite neu oder schließt den Tab versehentlich, bleibt der Status der Kacheln und der bisher geschriebene Code erhalten, was Frustrationserlebnisse effektiv minimiert.<sup>17</sup>

### 2.2. Integration von Gamification und Motivationsdesign

Lernplattformen für diese spezifische Altersgruppe profitieren enorm von der Integration subtiler Gamification-Elemente, da diese sowohl intrinsische als auch extrinsische Motivationsfaktoren der Jugendlichen ansprechen. Die Implementierung von Spielelementen in nicht-spielerische Lernumgebungen steigert nachweislich die Verweildauer und die Abschlussraten von Bildungsmodulen.<sup>18</sup>

Für eine Plattform, die auf den komprimierten Zeitraum eines einzigen Schnuppertages ausgelegt ist, eignen sich insbesondere kurzfristige, unmittelbare Belohnungssysteme.<sup>20</sup> Die Architektur sollte zwingend sogenannte Mikro-Interaktionen vorsehen. Sobald eine Programmieraufgabe erfolgreich validiert wurde, sollte die Benutzeroberfläche visuelles Feedback generieren. Dies kann durch die Einbindung von Bibliotheken wie canvas-confetti geschehen, welche eine partikelbasierte Konfetti-Animation über den Bildschirm legen und so einen psychologischen Dopamin-Ausstoß simulieren.<sup>18</sup>

Darüber hinaus ist die Implementierung von Fortschrittsbalken (Progress Bars) innerhalb der einzelnen Bundles essenziell. Eine permanente visuelle Repräsentation des Fortschritts nutzt den psychologischen Zeigarnik-Effekt aus - das intrinsische menschliche Bedürfnis, begonnene und unvollständige Aufgaben zu beenden.<sup>18</sup> Als finale Belohnungsstufe sollte das System digitale Badges (Abzeichen) vergeben.<sup>21</sup> Nach dem erfolgreichen Abschluss des ersten Bundles (HTML/CSS) erhält der Lernende beispielsweise das visuelle Abzeichen "UI-Designer Level 1". Diese Badges generieren ein Gefühl der Kompetenz und können am Ende des Schnuppertages als Zertifikat exportiert oder ausgedruckt werden, was den Jugendlichen einen physischen Beweis ihrer Leistung mit nach Hause gibt.<sup>21</sup>

## 3\. Konzeption und Layout des webbasierten Code-Editors

Die Kernkomponente der Applikation, in der die Lernenden den Großteil ihrer Zeit verbringen werden, ist die Editor-Ansicht. Die empirische Evidenz aus erfolgreichen, global agierenden Programmier-Lernplattformen (wie beispielsweise CodePen, JSFiddle oder freeCodeCamp) demonstriert eindeutig, dass ein sogenanntes Split-Pane-Layout (geteilte Bildschirme) die kognitive Zuordnung zwischen der geschriebenen Code-Syntax und dem daraus resultierenden visuellen Resultat maximiert.<sup>6</sup> Ein optimales Layout für Desktop-Bildschirme, welche an Schnuppertagen in Firmen oder Schulen primär genutzt werden, teilt den Bildschirmbereich in drei dedizierte, vertikale Spalten auf.

| **Sektion**         | **Anteil** | **Funktion und Inhalt**                                                                                                                                                                                                                                                                        |
| ------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Linke Spalte**    | 30%        | **Kontext & Instruktion:** Diese Spalte enthält den Titel der Aufgabe, eine detaillierte Problembeschreibung, gerenderten Markdown-Text für Erklärungen, didaktische Hinweise und den primären Interaktions-Button zur Aufgabenprüfung.<sup>23</sup> Hier findet die Wissensvermittlung statt. |
| ---                 | ---        | ---                                                                                                                                                                                                                                                                                            |
| **Mittlere Spalte** | 40%        | **Eingabe (Editor):** Der eigentliche Code-Editor. Je nach Aufgabe werden hier HTML, CSS und JavaScript in separaten Tabs oder als gestapelte Editoren (Stack) präsentiert. Er bietet Syntax-Highlighting und Zeilennummerierung.<sup>16</sup>                                                 |
| ---                 | ---        | ---                                                                                                                                                                                                                                                                                            |
| **Rechte Spalte**   | 30%        | **Ausgabe & Feedback:** Der obere Bereich beinhaltet ein Live-Iframe, das den generierten Code in Echtzeit rendert. Der untere Bereich simuliert eine Entwicklerkonsole, die console.log-Ausgaben sowie strukturierte Fehlermeldungen der Validierungslogik anzeigt.<sup>24</sup>              |
| ---                 | ---        | ---                                                                                                                                                                                                                                                                                            |

Diese triadische Anordnung stellt sicher, dass der Nutzer den Kontext (die Aufgabenstellung), die Aktion (den Schreibprozess des Codes) und die Reaktion (die visuelle Vorschau) simultan überblicken kann. Es entfällt die Notwendigkeit, zwischen verschiedenen Browser-Tabs oder Fenstern wechseln zu müssen, was den mentalen Kontextwechsel (Context Switching) eliminiert und die Konzentration aufrechterhält. Die linke Spalte muss zudem in der Lage sein, formatierten Text aus einer JSON-Datei zu parsen und als Markdown zu rendern. Dies ermöglicht es den Lehrpersonen, Code-Snippets, Fettungen für wichtige Schlüsselwörter und strukturierte Listen in den Aufgabenbeschreibungen zu verwenden.<sup>23</sup>

Obwohl die primäre Nutzung voraussichtlich an Desktop-Rechnern mit großen Monitoren stattfindet, erfordert modernes UI/UX-Design eine strikte mobile Responsiveness.<sup>15</sup> Das Layout muss über CSS-Media-Queries so konzipiert sein, dass es bei kleineren Viewports von einer horizontalen Drei-Spalten-Ansicht in eine vertikale Stapel-Ansicht (Stacking) wechselt, bei der die Sektionen untereinander angeordnet oder durch Tab-Navigationen erreichbar gemacht werden. Zudem müssen bei der Farbgestaltung zwingend Mindestkontraste gemäß den aktuellen WCAG-Standards (Web Content Accessibility Guidelines) eingehalten werden. Die Typografie, insbesondere die Verwendung von klar lesbaren Monospace-Schriften für die Code-Darstellung, muss präzise gewählt und skaliert sein, um Ermüdungserscheinungen der Augen vorzubeugen.<sup>15</sup>

## 4\. Technologische Evaluation des Editor-Kernsystems

Das technologische Herzstück der Applikation ist der in die Webseite eingebettete Texteditor. Dieser muss weitaus mehr leisten als ein standardisiertes HTML-&lt;textarea&gt;-Element. Er muss in Echtzeit Syntax-Highlighting bieten, Klammern automatisch schließen, Einrückungen verwalten und Zeilennummern anzeigen. Für die Implementierung eines solchen webbasierten Code-Editors stehen primär drei große Open-Source-Bibliotheken zur Verfügung: Der Monaco Editor, der Ace Editor und CodeMirror. Eine tiefgehende Analyse dieser Bibliotheken ist zwingend erforderlich, um Performance-Engpässe zu vermeiden.

Erkenntnisse aus detaillierten Engineering-Analysen, wie beispielsweise jener des Entwicklerteams von Miro bei der Integration von Code-Blöcken in ihre Canvas-Architektur, verdeutlichen die fundamentalen architektonischen Unterschiede zwischen diesen Lösungen.<sup>26</sup>

Der Monaco Editor bildet die technologische Basis von Microsofts populärem Visual Studio Code. Dementsprechend bietet er die fortschrittlichste Autovervollständigung, TypeScript-Integration und ein professionelles Tippgefühl. Der gravierende architektonische Nachteil für webbasierte, leichtgewichtige Plattformen ist jedoch seine immense Bundle-Größe von über 2 Megabyte im minifizierten und komprimierten Zustand.<sup>26</sup> Für eine Single Page Application (SPA), die von Anfängern für simple HTML/CSS-Aufgaben genutzt wird, ist Monaco drastisch überdimensioniert. Zudem ist die Integration von Monaco in reaktive Layouts notorisch komplex, und die Unterstützung für mobile Endgeräte ist quasi nicht existent.<sup>27</sup>

Der Ace Editor ist ein robuster Klassiker der Webentwicklung. Mit einer extrem schlanken Basis von circa 98 KB ist er sehr leichtgewichtig und verarbeitet CSS-Transformationen sowie Skalierungen hervorragend.<sup>26</sup> Allerdings ist die Kernarchitektur von Ace in die Jahre gekommen. Die nahtlose Integration in moderne deklarative Frameworks wie React erfordert oft die Nutzung veralteter Wrapper-Bibliotheken, was die langfristige Wartbarkeit der Plattform erschwert.

CodeMirror, insbesondere in der komplett neu in TypeScript geschriebenen Version 6, stellt den aktuellen Sweetspot der Web-Editor-Technologie dar. Die Version 6 ist im Gegensatz zu ihrem Vorgänger extrem modular aufgebaut und strikt funktional konzipiert. Mit einer Bundle-Größe von circa 124 KB bietet CodeMirror 6 eine exzellente Balance aus minimaler Ladezeit und maximaler Funktionalität.<sup>26</sup> Im direkten Gegensatz zu Monaco funktioniert CodeMirror 6 hervorragend auf mobilen Endgeräten und fügt sich nahtlos in native App-Strukturen ein.<sup>27</sup>

| **Feature / Editor**     | **Monaco Editor** | **Ace Editor** | **CodeMirror 6**                     |
| ------------------------ | ----------------- | -------------- | ------------------------------------ |
| **Bundle-Größe**         | \> 2.000 KB       | ~98 KB         | ~124 KB                              |
| ---                      | ---               | ---            | ---                                  |
| **Mobile Unterstützung** | Sehr schlecht     | Mittelmäßig    | Exzellent <sup>27</sup>              |
| ---                      | ---               | ---            | ---                                  |
| **React-Integration**    | Komplex           | Mittelmäßig    | Sehr gut (via Wrapper) <sup>31</sup> |
| ---                      | ---               | ---            | ---                                  |
| **Modularität**          | Gering (Monolith) | Mittelmäßig    | Extrem hoch <sup>29</sup>            |
| ---                      | ---               | ---            | ---                                  |

Basierend auf diesen Architekturanforderungen ist CodeMirror 6 die definitive und am besten geeignete Wahl für diese Plattform.<sup>27</sup> Die Integration in eine moderne Frontend-Umgebung erfolgt idealerweise über dedizierte React-Pakete wie @uiw/react-codemirror, welche eine deklarative API bereitstellen. Die Modularität von CodeMirror 6 erlaubt es, die Ladezeit der Applikation weiter zu optimieren, indem exakt nur jene Spracherweiterungen geladen werden, die für das jeweilige Bundle benötigt werden (nämlich @codemirror/lang-html, @codemirror/lang-css und @codemirror/lang-javascript). Um kognitive Überlastung aufseiten der Schnupperlernenden zu vermeiden, muss der Editor für Anfänger vorkonfiguriert werden. Features wie Line-Wrapping (automatischer Zeilenumbruch zur Vermeidung von horizontalem Scrollen), das automatische Schließen von Klammern (Auto-Closing Brackets) und ein klares, visuell ansprechendes Theme (wie One Dark oder Dracula) müssen programmatisch als Standard-Extensions beim Instanziieren des Editors aktiviert werden.<sup>29</sup>

## 5\. Framework-Evaluation: SPA-Architektur mit React und Vite

Für die Entwicklung einer hochgradig interaktiven, vollständig clientseitigen Webapplikation im Jahr 2024/2025 dominiert das React-Ökosystem. Innerhalb dieses Ökosystems stehen Architekten vor der Entscheidung zwischen zwei divergenten Build- und Rendering-Paradigmen: Vite als rasant schnelles Build-Tool für Single Page Applications (SPAs) und Next.js als vollumfängliches Full-Stack-Framework.<sup>34</sup>

Eine tiefgehende Analyse der spezifischen Use-Cases der hier geforderten Lernplattform führt zu einer klaren strategischen Entscheidung. Die Plattform ist ein webbasierter Editor, dessen gesamte Funktionalität - das Kompilieren, das Rendern des Iframes, die Code-Validierung - rein im Browser des Nutzers stattfindet. Es gibt keine Notwendigkeit für Suchmaschinenoptimierung (SEO), da die Aufgabeninhalte oft hinter Logins oder auf internen Firmen-URLs betrieben werden. Ebenso wenig muss initial eine riesige Datenbank abgefragt werden, um HTML-Seiten auf dem Server vorzurendern.<sup>36</sup>

Next.js optimiert primär das Nutzererlebnis bei inhaltsgetriebenen Seiten durch Server-Side Rendering (SSR) und Static Site Generation (SSG). Es verlagert Rechenlast auf den Server, was bei einer Editor-Plattform keinen Sinn ergibt, da der geschriebene Code in Echtzeit im Browser evaluiert werden muss.<sup>34</sup> Das Server-Rendering von Next.js erhöht zudem die Komplexität beim Einbinden von Bibliotheken, die direkten Zugriff auf das window-Objekt des Browsers benötigen (wie es bei vielen Editor-Instanzen der Fall ist).<sup>35</sup>

Vite hingegen fokussiert sich kompromisslos auf die Optimierung der Entwicklungsgeschwindigkeit und die Erstellung von SPAs. Vite nutzt native ES-Module und das in Go geschriebene Tool Esbuild, um den Development-Server in unter zwei Sekunden zu starten und Hot Module Replacement (HMR) in Millisekunden durchzuführen.<sup>34</sup>

| **Architektur-Metrik**          | **React kompiliert mit Vite**                                     | **React angetrieben durch Next.js**                                        |
| ------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Primäres Rendering**          | Client-Side Rendering (CSR)                                       | Server-Side Rendering (SSR) & CSR                                          |
| ---                             | ---                                                               | ---                                                                        |
| **Entwickler-Feedback**         | Extrem schnell (HMR in Millisekunden)                             | Mittel bis Hoch (abhängig von Turbopack)                                   |
| ---                             | ---                                                               | ---                                                                        |
| **Initiales JavaScript-Bundle** | Sehr klein (~42 KB Baseline)                                      | Größer (~92 KB Baseline durch Server-Logik)                                |
| ---                             | ---                                                               | ---                                                                        |
| **Eignung für Code-Editoren**   | **Optimal.** Volle Kontrolle über das window-Objekt.<sup>35</sup> | Suboptimal. SSR verursacht Overhead und Hydration-Mismatches.<sup>36</sup> |
| ---                             | ---                                                               | ---                                                                        |

Die strategische Schlussfolgerung ist unmissverständlich: Für eine interaktive Lernplattform, die als Lehrmittel für Schnuppertage dient und deren Interaktivität primär im Browser abläuft, ist React in Kombination mit Vite die weitaus effizientere, performantere und leichter zu wartende Wahl.<sup>38</sup> Die Zustandsverwaltung der Plattform (das Tracking, welche Aufgaben gelöst wurden, und die Speicherung des aktuellen Codes) kann vollständig über robuste Client-Libraries wie Zustand oder das Redux Toolkit erfolgen. Der Status wird hierbei als serialisierter JSON-String im localStorage persistiert.<sup>16</sup> Sollte die Institution zu einem späteren Zeitpunkt entscheiden, dass zentralisierte Benutzerprofile und analytische Auswertungen der Schülerleistungen notwendig sind, lässt sich eine persistente Datenbankanbindung (beispielsweise via Supabase oder Firebase als Backend-as-a-Service) nahtlos in die bestehende SPA-Architektur über REST- oder GraphQL-APIs nachrüsten.<sup>34</sup>

## 6\. Isolierte Code-Ausführung und Sicherheitsarchitektur

Das Ermöglichen der Ausführung von beliebigem, nutzergeneriertem JavaScript-Code in einem Webbrowser birgt naturgemäß erhebliche Sicherheits- und Stabilitätsrisiken. Wird dieser Code direkt im Ausführungskontext der Hauptapplikation (dem React-DOM) evaluiert, könnte unabsichtlich oder böswillig manipulierter Code die Lernplattform zerstören, sensible Daten aus dem localStorage der Host-Domain exfiltrieren oder den gesamten Browser-Tab durch Endlosschleifen zum Absturz bringen. Die professionelle und technologisch saubere Lösung für dieses Problem ist das strenge Sandboxing des Ausführungskontextes.

### 6.1. Architektur des Iframe-Sandboxings mit Srcdoc

Die in der Industrie etablierte Methode zur Erstellung sicherer "Code Playgrounds" ist die Nutzung eines dedizierten &lt;iframe&gt;-Elements.<sup>6</sup> Anstatt dieses Iframe jedoch auf eine externe URL verweisen zu lassen, was Netzwerk-Overhead und Latenz erzeugen würde, wird die HTML5-Eigenschaft srcdoc verwendet. Dieses spezifische Attribut erlaubt es, einen kompletten, auf der Client-Seite generierten HTML-String direkt in das Iframe zu injizieren und vom Browser nativ rendern zu lassen.<sup>6</sup>

Der technische Lifecycle der Code-Ausführung verläuft wie folgt:

- Der Nutzer tippt in die CodeMirror-Instanzen. Ein Debounce-Mechanismus (z. B. 500 Millisekunden Verzögerung nach dem letzten Tastendruck) verhindert, dass bei jedem einzelnen Tastenanschlag ein kompletter Rerender-Zyklus ausgelöst wird.
- Die React-Applikation sammelt den aktuellen State aus den drei Editoren (HTML, CSS, JS).
- Ein Parser-Skript kombiniert diese Fragmente zu einem syntaktisch korrekten, kohärenten HTML-Dokument. Der CSS-Code wird in einen &lt;style&gt;-Block im &lt;head&gt; verpackt, der HTML-Code in den &lt;body&gt;, und der JavaScript-Code in ein &lt;script&gt;-Tag direkt vor dem schließenden Body-Tag.
- Dieser finale String wird als Wert in das srcdoc-Attribut des Iframes übergeben.<sup>6</sup>

Gleichzeitig muss zwingend das Attribut sandbox="allow-scripts" auf das Iframe angewendet werden.<sup>6</sup> Dieses Attribut ist der Schlüssel zur Sicherheit: Es erlaubt dem Iframe zwar, den injizierten JavaScript-Code auszuführen, isoliert diesen Code jedoch in einem einzigartigen, kryptografischen Null-Origin-Kontext. Das bedeutet, dass der Code im Iframe den Richtlinien der Same-Origin-Policy unterliegt und keinerlei Zugriff auf das window.parent-Objekt (die Hauptapplikation), deren Cookies oder Storage-Systeme hat. Dies garantiert absolute Isolation und Sicherheit.<sup>11</sup>

### 6.2. Bidirektionale Kommunikation und Loop-Protection

Obwohl das Iframe aus Sicherheitsgründen strikt isoliert ist, muss die React-Hauptapplikation wissen, was darin passiert. Dies ist notwendig, um Konsolenausgaben des Schülers anzuzeigen und den Code auf inhaltliche Korrektheit zu prüfen. Diese Überwindung der Sandbox-Grenze wird architektonisch durch die standardisierte postMessage API realisiert.<sup>6</sup>

Bevor der Nutzer-Code in das Iframe injiziert wird, fügt der Compiler der Plattform ein unsichtbares Interceptor-Skript in das Dokument ein. Dieses Skript überschreibt die nativen globalen Konsolenmethoden (console.log, console.warn, console.error) sowie den globalen Error-Handler (window.onerror). Anstatt die Ausgaben nur in die versteckten Browser-Entwicklertools zu schreiben, fängt das Skript jeden Aufruf ab und leitet ihn via window.parent.postMessage({ type: 'CONSOLE', data: payload }, '\*') an die Host-Applikation weiter.<sup>6</sup> Die React-Applikation lauscht auf dieses globale Message-Event, parst den Payload und rendert ihn in einer visuell ansprechenden, simulierten Konsole in der rechten Spalte des Layouts.<sup>33</sup>

Ein weiteres hochkritisches Element, insbesondere bei Anfängern, ist der Schutz vor Endlosschleifen (Infinite Loop Protection). Wenn ein Schüler versehentlich while (true) {} eingibt, blockiert der Main-Thread des Browsers sofort, und der Tab friert ein, was zu erheblichem Frust führt. Eine robuste Plattform implementiert hierfür einen Abstract Syntax Tree (AST) Parser. Dieser Parser analysiert den JavaScript-Code vor der Ausführung und injiziert in den Rumpf jeder for-, while- oder do-while-Schleife einen Sicherheitsmechanismus. Dieser misst die verstrichene Zeit seit Beginn der Schleife. Überschreitet die Schleife eine Laufzeit von beispielsweise 500 Millisekunden, wirft der injizierte Code einen Fehler ab (throw new Error('Infinite Loop detected')), bricht die Ausführung ab und meldet dies der simulierten Konsole.<sup>4</sup>

## 7\. Erweiterbarkeit und Datenmodellierung durch JSON-Schema

Die explizite Anforderung des Nutzers ist es, die Plattform "erweiterbar zu machen, vor allem bezogen auf die einzelnen Aufgaben in den Bundles". Um dies zu erreichen, darf die inhaltliche Definition der Aufgaben niemals hartcodiert in den React-Komponenten liegen.<sup>42</sup> Lehrpersonen müssen Aufgaben modifizieren oder hinzufügen können, ohne JavaScript-Kenntnisse besitzen zu müssen. Das gesamte System muss auf einer Headless-Architektur basieren, die durch JSON (JavaScript Object Notation) angetrieben wird.<sup>13</sup>

### 7.1. Das JSON-Schema als Strukturvertrag

JSON hat sich branchenübergreifend als De-facto-Standard für den strukturierten Datenaustausch und die Repräsentation von Metadaten etabliert.<sup>45</sup> Um sicherzustellen, dass jede neu erstellte Aufgabe vom Frontend fehlerfrei verarbeitet und gerendert werden kann, muss ein striktes JSON-Schema (idealerweise basierend auf dem Standard draft-2020-12) definiert werden.<sup>12</sup> Ein solches Schema fungiert als technischer Vertrag: Es definiert exakt und maschinenlesbar, welche Eigenschaften, Datentypen und Array-Strukturen eine Aufgabe zwingend aufweisen muss.<sup>8</sup>

Durch die Validierung der Aufgabendateien beim Start der Applikation - beispielsweise mittels robuster Bibliotheken wie Ajv (Another JSON Schema Validator) oder Zod - wird sichergestellt, dass unvollständige Aufgaben (etwa solche mit fehlenden Testfällen oder fehlerhaftem Markdown) vom System frühzeitig abgelehnt werden, bevor sie die Benutzeroberfläche beschädigen.<sup>50</sup>

### 7.2. Strukturierung eines Aufgaben-Objekts

Die Hierarchie der inhaltlichen Datenstruktur gliedert sich in Bundles und deren untergeordnete Tasks (Aufgaben). Eine einzelne Aufgabe innerhalb der Konfigurationsdatei könnte konzeptionell wie folgt in JSON abgebildet werden <sup>44</sup>:

| **Eigenschaft im JSON** | **Geforderter Datentyp** | **Funktionale Beschreibung innerhalb der Architektur**                                                                                                                                            |
| ----------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                      | String                   | Ein global eindeutiger Identifikator zur Referenzierung im LocalStorage (z. B. "html-aufgabe-01").                                                                                                |
| ---                     | ---                      | ---                                                                                                                                                                                               |
| bundleId                | String                   | Logische Zuordnung zum übergeordneten Bundle (z. B. "bundle-1-html").                                                                                                                             |
| ---                     | ---                      | ---                                                                                                                                                                                               |
| title                   | String                   | Der Anzeigename, der in der UI der linken Spalte gerendert wird.                                                                                                                                  |
| ---                     | ---                      | ---                                                                                                                                                                                               |
| instruction             | String (Markdown)        | Die didaktischen Erklärungen für den Lernenden, die im Frontend durch einen Markdown-Parser gerendert werden.<sup>23</sup>                                                                        |
| ---                     | ---                      | ---                                                                                                                                                                                               |
| initialCode             | Objekt (html, css, js)   | Das Scaffolding. Der Boilerplate-Code, mit dem die CodeMirror-Editoren beim Start befüllt werden, um die anfängliche kognitive Last zu reduzieren.                                                |
| ---                     | ---                      | ---                                                                                                                                                                                               |
| validationTests         | Array von Objekten       | Eine Sammlung von granularen Validierungsregeln, die erfüllt sein müssen, damit die Aufgabe als "gelöst" markiert wird.<sup>44</sup> Diese können DOM-Selektoren oder JS-Return-Werte definieren. |
| ---                     | ---                      | ---                                                                                                                                                                                               |

Diese strikte Modularisierung der Inhalte als JSON-Dokumente erlaubt es den Instruktoren, neue Aufgaben in einem simplen Texteditor anzulegen. Sie können das JSON-Dokument einfach in einem vordefinierten Ordner ablegen oder über eine spätere Administrator-Oberfläche hochladen.<sup>8</sup> Das React-Frontend parst diese Dateien beim Laden und baut die Menüs, Fortschrittsbalken und Editoren vollkommen dynamisch auf. Dies ist der fundamentale Schlüssel zur nachhaltigen Skalierbarkeit des Schnuppertags-Konzepts.

## 8\. Automatisierte Validierung und intelligentes Feedback

Der eigentliche pädagogische Wert der Plattform kulminiert in ihrer Fähigkeit, den geschriebenen Code der Lernenden nicht nur auszuführen, sondern inhaltlich zu validieren und darauf basierend hilfreiches, menschenlesbares Feedback zu generieren.<sup>53</sup> Eine solche Client-Side Validation muss zwingend lokal im Browser stattfinden. Das Senden von Code an einen Server zur Evaluierung würde unnötige Latenzen von mehreren Hundert Millisekunden erzeugen, den Flow stören und zudem unnötige Serverkosten und Skalierungsprobleme verursachen.<sup>56</sup>

Die technologische Art der Code-Validierung unterscheidet sich jedoch fundamental zwischen deklarativem Code (HTML/CSS, der das Aussehen beschreibt) und imperativem Code (JavaScript, der die Logik ausführt).<sup>58</sup>

### 8.1. Clientseitige DOM-Inspektion für HTML und CSS

Die Überprüfung von HTML und CSS ist tückisch, wenn man versucht, den rohen Text-String zu analysieren. Die Snippets &lt;div class="box"&gt;&lt;/div&gt; und &lt;div class='box' &gt;&lt;/div&gt; sind funktional und visuell vollkommen identisch, als reine Strings jedoch unterschiedlich. Eine stringbasierte Überprüfung würde ständig falsche Fehlermeldungen (False Negatives) produzieren. Die korrekte Lösung basiert auf der Inspektion des vom Browser geparsten und gerenderten DOMs (Document Object Model) innerhalb des Ausführungs-Iframes.<sup>59</sup>

Wenn der Nutzer auf den Button "Code prüfen" klickt, greift die React-Applikation über die DOM-API (contentDocument oder contentWindow.document) direkt auf die Struktur des Iframes zu.<sup>59</sup> Die Engine iteriert dann durch die im JSON definierten validationTests. Ein praktisches Beispiel für eine Validierungslogik:

- **Die Aufgabe:** Der Nutzer soll einen Button erstellen, der einen roten Hintergrund besitzt.
- **Die Logik:** Die Test-Engine sucht im DOM des Iframes nach dem Element mittels document.querySelector('button').<sup>61</sup> Wird das Element gefunden, extrahiert die Engine die vom Browser final berechneten CSS-Stile mittels window.getComputedStyle(button). Wenn die Eigenschaft backgroundColor dem Wert rgb(255, 0, 0) entspricht, gilt der Test als bestanden.
- **Didaktisches Feedback:** Fehlt der Button gänzlich, generiert das System das im JSON definierte Feedback: _"Wir können keinen &lt;button&gt; auf der Seite finden. Hast du die spitzen Klammern korrekt gesetzt?"_ Ist der Button vorhanden, aber nicht rot, lautet die Meldung: _"Der Button ist da, aber er hat noch nicht die richtige Hintergrundfarbe. Überprüfe deinen CSS-Code."_.<sup>62</sup>

Diese Methodik verzeiht Anfängern Syntax-Variationen (wie Leerzeichen, doppelte oder einfache Anführungszeichen, Hex-Codes statt RGB-Werte in CSS) und testet stattdessen das tatsächliche visuelle Resultat im DOM. Dies entspricht exakt der Arbeitsweise, wie auch End-to-End-Testing-Frameworks (wie Cypress oder Playwright) im professionellen Frontend-Engineering operieren.<sup>9</sup>

### 8.2. Logik-Verifikation und Unit-Testing für JavaScript

Die Validierung von JavaScript ist ungleich komplexer. Hier reicht es nicht, statische Elemente im DOM zu betrachten. Die Plattform muss prüfen, ob eine logische Funktionalität unter verschiedenen Bedingungen korrekt implementiert wurde.

Für grundlegende Aufgaben (wie das Deklarieren einer Variable oder einfache console.log-Ausgaben) greift der in Kapitel 6 beschriebene Ansatz: Die über postMessage abgefangenen Konsolenaufrufe werden in einem Array gespeichert und mit dem im JSON-Schema erwarteten Output abgeglichen.<sup>4</sup>

Für logische Aufgaben (beispielsweise: "Schreibe eine Funktion addiere(a, b), die zwei Zahlen zusammenzählt") muss ein unsichtbarer Test-Runner parallel zum Nutzer-Code in das Iframe injiziert werden.<sup>41</sup> Dieser Test-Runner ruft die Funktion des Nutzers nach der Deklaration mit verschiedenen, vordefinierten Argumenten (z. B. addiere(2, 3) und addiere(-1, 5)) auf und vergleicht den Rückgabewert mit den erwarteten Ergebnissen aus dem JSON-Schema. Dies entspricht dem klassischen Unit-Testing im professionellen Software-Engineering. Die Komplexität von Begriffen wie "Assertions" oder "Test Suites" wird jedoch vollständig abstrahiert und verborgen, um den Lernenden nicht zu überfordern.<sup>43</sup> Erst wenn alle Testfälle im Hintergrund den booleschen Wert true zurückliefern, triggert die Applikation das Konfetti und markiert die Aufgabe als gelöst.

## 9\. Modulares Curriculum: Gestaltung der Aufgaben-Bundles

Das inhaltliche Lehrkonzept der Applikation basiert auf der expliziten Anforderung dreier aufeinander aufbauender Bundles. Da der Schnuppertag in seiner Natur modular ist, können sich die Lernenden basierend auf ihrer individuellen Geschwindigkeit durch die Module bewegen.<sup>3</sup> Das Leitprinzip hierbei lautet: Die Aufgaben müssen "etwas bringen". Das bedeutet, sie müssen kleine, unmittelbare und visuell erfahrbare Erfolgserlebnisse liefern, die im Kontext echter Webentwicklung stehen, anstatt der Zielgruppe abstrakte mathematische Probleme zu präsentieren.<sup>2</sup>

### 9.1. Bundle 1: HTML und CSS Grundlagen (Struktur und Design)

Dieses erste Bundle konzentriert sich isoliert auf die Strukturierung von Informationen (Semantik) und visuelles Design. Da in diesem Bundle der JavaScript-Editor ausgeblendet bleibt, reduziert sich die kognitive Last drastisch. Das primäre Lernziel ist es, den Schülern zu demonstrieren, wie schnell sie das Aussehen einer Webseite durch deklarativen Code verändern können.

- **Aufgabe 1: Das Grundgerüst (Hello World der Struktur).** Einführung in grundlegende Text-Tags (&lt;h1&gt;, &lt;p&gt;). Die Schüler passen einen vorgegebenen Text an und fügen Überschriften hinzu, was das Iframe sofort live rendert.
- **Aufgabe 2: Medien und Verlinkungen.** Die Einbindung von Medien ist ein großer Motivator. Die Schüler lernen das &lt;img&gt;-Tag kennen und integrieren ein Bild über eine vorgegebene URL.
- **Aufgabe 3: Styling mit CSS.** Einführung des Konzepts von Klassen-Selektoren. Die Schüler lernen, Farben, Schriftarten und das Box-Model (Abstände wie Margin und Padding) zu manipulieren.
- **Zielprojekt (Master-Task): "Die eigene Profilkarte".** Am Ende des Bundles werden die gelernten Konzepte aggregiert. Die Schüler kombinieren HTML und CSS, um eine digitale Visitenkarte (Profile Card) mit Bild, Name, Hobby und ansprechendem Layout zu erstellen.<sup>1</sup> Dies liefert ein hochgradig personalisiertes, identitätsstiftendes Resultat, das den Schülern zeigt, dass sie in der Lage sind, echte User Interfaces zu bauen.

### 9.2. Bundle 2: JavaScript Grundlagen (Logik und Daten)

Das zweite Bundle blendet HTML und CSS weitgehend aus und fokussiert sich auf den JavaScript-Editor und die simulierte Konsole. Es leitet einen Paradigmenwechsel ein: Weg von der statischen Darstellung, hin zur dynamischen, zustandsbasierten Logik. Hierbei muss durch den Editor und das Feedback darauf geachtet werden, Frustrationen durch die strikteren Syntax-Regeln (wie vergessene Semikolons oder Klammern) abzufedern.<sup>66</sup>

- **Aufgabe 1: Variablen als Datenspeicher.** Einführung in die Konzepte let und const. Die Schüler speichern Namen und Alter in Variablen und geben diese in der Konsole aus.
- **Aufgabe 2: Mathematische Operatoren.** Einfache Berechnungen, die die Rechenleistung des Computers demonstrieren.<sup>66</sup>
- **Aufgabe 3: Kontrollstrukturen und Bedingungen.** Einführung von if/else-Statements. Die Schüler schreiben eine Logik, die basierend auf einer Variable prüft, ob ein Benutzer volljährig ist und Zugriff auf eine Website erhalten sollte.
- **Aufgabe 4: Arrays und Iterationen.** Die effiziente Verarbeitung von Datenlisten. Die Aufgabe besteht darin, durch eine Liste von Zahlen zu iterieren und beispielsweise alle geraden Zahlen auszugeben.<sup>66</sup>

### 9.3. Bundle 3: Interaktive Web-Applikationen (Das orchestrierte Mixed-Bundle)

Im finalen und anspruchsvollsten Bundle verschmelzen alle drei Technologien (HTML, CSS und JavaScript). Alle drei Editoren sind nun sichtbar. Die Schüler erlernen hier das fundamentale Konzept der DOM-Manipulation - also wie JavaScript als dynamischer Akteur das statische HTML zur Laufzeit modifiziert.<sup>67</sup> Dies repräsentiert die Kernkompetenz der modernen Frontend-Entwicklung.<sup>68</sup>

- **Aufgabe 1: Der Event-Listener.** Die Brücke zwischen Interface und Logik. Ein HTML-Button wird mit einem JavaScript-Event verknüpft, das bei einem Mausklick einen sichtbaren alert() im Browser auslöst.<sup>69</sup>
- **Aufgabe 2: Dynamische Inhaltsänderung.** Ein Klick auf ein Element ändert den Textinhalt (textContent) eines völlig anderen HTML-Elements, was die Macht der DOM-API demonstriert.<sup>16</sup>
- **Zielprojekt (Master-Task): "Color Flipper".** Eine voll funktionsfähige kleine Applikation. Das Interface besteht aus einem Button. Klickt der Nutzer darauf, generiert eine JavaScript-Funktion eine zufällige Farbe (entweder aus einem Array oder als dynamischen Hex-Code) und appliziert diese auf das style.backgroundColor-Attribut des &lt;body&gt;-Tags.<sup>69</sup>

Der erfolgreiche Abschluss dieses dritten Bundles vermittelt ein tiefes, anwendbares Verständnis dafür, wie die Technologien des Internets zusammenarbeiten. Es demonstriert, dass HTML das Skelett, CSS die Haut und JavaScript die Muskeln einer Website bilden. Dieses Wissen ist der wertvollste Erkenntnisgewinn eines Schnuppertages.

## 10\. Zusammenfassung und Implementierungsstrategie

Die technologische Konzeption einer E-Learning-Plattform für Schnupperlernende im Bereich der Applikationsentwicklung erfordert eine präzise Symbiose aus modernster Web-Architektur und fundierter kognitiver Didaktik. Der dargelegte Plan, die Plattform auf einer modularen, durch JSON-Schemas orchestrierten Architektur basieren zu lassen, stellt die unabdingbare Voraussetzung sicher, dass das System durch Lehrpersonen hochgradig erweiterbar, wartungsarm und zukunftssicher bleibt.<sup>8</sup>

Die systematische Evaluierung des Tech-Stacks hat evidenzbasiert dargelegt, dass eine vollständig clientseitige Single Page Application auf Basis von React und dem Build-Tool Vite - kombiniert mit der CodeMirror 6 Bibliothek für den Editor - die absolute technologische Spitzenklasse für diesen spezifischen Anwendungsfall darstellt. Sie liefert die optimale Balance aus Millisekunden-schnellem Feedback, Flexibilität und Entwicklungsgeschwindigkeit.<sup>26</sup> Durch den Einsatz von kryptografisch isolierten Iframes mit dem srcdoc-Attribut sowie AST-basierten Sicherheitsscannern wird kompromisslose Sicherheit auf den Rechnern der Lernenden gewährleistet. Gleichzeitig ermöglichen die ausgeklügelten clientseitigen Validierungsmechanismen (die DOM-Inspektion für statisches Design und injizierte Test-Runner für JS-Logik) ein verzögerungsfreies, automatisiertes und menschenlesbares Feedback.<sup>6</sup>

Gepaart mit einem responsiven, dreispaltigen Split-Pane-Layout und psychologisch wirksamen Gamification-Elementen (wie Fortschrittsbalken, Konfetti-Mikrointeraktionen und exportierbaren Zertifikats-Badges) wird diese Architektur in der Lage sein, die in der Informatik-Ausbildung oft existierende initiale Frustrationsbarriere drastisch zu senken.<sup>7</sup> Die didaktisch fundierte Aufteilung in die drei logisch aufeinander aufbauenden Kern-Bundles führt die Lernenden fließend und belohnend von der Strukturierung des ersten Tags bis hin zur Programmierung einer vollständig interaktiven Applikation.<sup>9</sup>

Zusammenfassend bietet dieses Konzeptdokument nicht nur den detaillierten Bauplan für eine technologisch robuste Software-Architektur, sondern beschreibt ein maßgeschneidertes, pädagogisch wertvolles Werkzeug. Es erfüllt alle gestellten Anforderungen an Modularität, Erweiterbarkeit und Sinnhaftigkeit und bildet das Fundament, um den Schnuppertag für Jugendliche zu einem nachhaltig positiven, identitätsstiftenden und weichenstellenden Erlebnis in der Welt der professionellen Applikationsentwicklung zu machen.

#### Referenzen

- Fun and Easy HTML Projects for Kids of All Ages - HackerKID, Zugriff am April 13, 2026, <https://www.hackerkid.org/blog/html-projects-for-kids/>
- Helping 14 year olds learn to code : r/learnprogramming - Reddit, Zugriff am April 13, 2026, <https://www.reddit.com/r/learnprogramming/comments/1khtqd5/helping_14_year_olds_learn_to_code/>
- Schnuppertag als Informatiker:in Applikationsentwicklung - Join Netcetera, apply today!, Zugriff am April 13, 2026, <https://www.netcetera.com/careers/job.html?shortcode=894F51ACA9>
- JavaScript Compiler Online - Run JS Code Free - Playcode, Zugriff am April 13, 2026, <https://playcode.io/javascript-compiler>
- JavaScript 30 - Build 30 things with vanilla JS in 30 days with 30 tutorials, Zugriff am April 13, 2026, <https://javascript30.com/>
- Building a Secure Code Sandbox: What I learned about iframe isolation and postMessage | by Muyiwa Johnson | Medium, Zugriff am April 13, 2026, <https://medium.com/@muyiwamighty/building-a-secure-code-sandbox-what-i-learned-about-iframe-isolation-and-postmessage-a6e1c45966df>
- Building HTML, CSS, and JS code preview using iframe's srcdoc attribute | Maciej Mionskowski, Zugriff am April 13, 2026, <https://mionskowski.pl/posts/iframe-code-preview/>
- Modular JSON Schema combination, Zugriff am April 13, 2026, <https://json-schema.org/understanding-json-schema/structuring>
- HTML and CSS Practice Projects to Boost Developer Skills - Jscrambler, Zugriff am April 13, 2026, <https://jscrambler.com/blog/html-css-and-javascript-practice-projects-to-level-up-your-developer-skills>
- Fun & Free Coding Activities for Kids | CodeWizardsHQ, Zugriff am April 13, 2026, <https://www.codewizardshq.com/coding-activities-for-kids/>
- Some notes on modular JSON Schema definitions - DJ Adams, Zugriff am April 13, 2026, <https://qmacro.org/blog/posts/2022/11/02/some-notes-on-modular-json-schema-definitions/>
- How a single JSON file could become your entire code base - DEV Community, Zugriff am April 13, 2026, <https://dev.to/zelcion/how-a-single-json-file-could-become-your-entire-code-base-356j>
- Courses for UI/UX Design Interactive: Beginner - Skillsoft, Zugriff am April 13, 2026, <https://www.skillsoft.com/channel/uiux-design-interactive-90818c53-9b28-424a-9f25-6d314f0617ca>
- UI/UX Beginner's Guide: Enhancing User Experience through Effective Design | Medium, Zugriff am April 13, 2026, <https://akadar899.medium.com/ui-ux-beginners-guide-in-ui-ux-designing-ad1f79555d10>
- JavaScript: Adding interactivity - Learn web development - MDN Web Docs, Zugriff am April 13, 2026, <https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Adding_interactivity>
- Coding and AI (Artificial Intelligence) Classes and Camps for Kids Near You | theCoderSchool, Zugriff am April 13, 2026, <https://www.thecoderschool.com/>
- 7 Best Gamified Learning Management Systems for Employee Training in 2026 - D2L, Zugriff am April 13, 2026, <https://www.d2l.com/blog/gamified-learning-management-system/>
- Gamification | Center for the Future of Libraries, Zugriff am April 13, 2026, <https://www.ala.org/future/trends/gamification>
- Top 12 Gamified Learning Platforms for Trainers | Roundup, Zugriff am April 13, 2026, <https://slideswith.com/blog/top-gamified-learning-platforms>
- Kajabi Gamification Template - Gamify Pro for Courses & Memberships, Zugriff am April 13, 2026, <https://www.jiffycoursesonline.com/kajabi-gamification>
- Top Gamification Learning Management Systems (2026 Update) - eLearning Industry, Zugriff am April 13, 2026, <https://elearningindustry.com/top-gamification-lms-software-learning-management-systems>
- Build Full Stack E-Learning Coding Platform using NextJs, React, Neon, CodeRabbit, Zugriff am April 13, 2026, <https://www.youtube.com/watch?v=rdaSPdCkoFQ>
- Build Your Own Code Playground | souporserious, Zugriff am April 13, 2026, <https://souporserious.com/build-your-own-code-playground/>
- Can you give me feedback to improve my first html project ?(link to code in description), Zugriff am April 13, 2026, <https://www.reddit.com/r/HTML/comments/1bw36i6/can_you_give_me_feedback_to_improve_my_first_html/>
- How we integrated a code editor on the Miro canvas | by Bogdan ..., Zugriff am April 13, 2026, <https://medium.com/miro-engineering/how-we-integrated-a-code-editor-on-the-miro-canvas-a41e0eff7f21>
- Replit - Comparing Code Editors: Ace, CodeMirror and Monaco, Zugriff am April 13, 2026, <https://blog.replit.com/code-editors>
- Ace, CodeMirror, and Monaco: A Comparison of the Code Editors You Use in the Browser : r/javascript - Reddit, Zugriff am April 13, 2026, <https://www.reddit.com/r/javascript/comments/s1e55h/ace_codemirror_and_monaco_a_comparison_of_the/>
- CodeMirror 6 Quickstart and Learn-By-Examples, Zugriff am April 13, 2026, <https://discuss.codemirror.net/t/codemirror-6-quickstart-and-learn-by-examples/5375>
- Ace, CodeMirror, and Monaco: A comparison of browser code editors (2021) | Hacker News, Zugriff am April 13, 2026, <https://news.ycombinator.com/item?id=30673759>
- How to create a collaborative code editor with CodeMirror, Yjs, Next.js, and Liveblocks, Zugriff am April 13, 2026, <https://liveblocks.io/docs/guides/how-to-create-a-collaborative-code-editor-with-codemirror-yjs-nextjs-and-liveblocks>
- Replaced Ace Editor with Code Mirror. And loving it : r/webdev - Reddit, Zugriff am April 13, 2026, <https://www.reddit.com/r/webdev/comments/1dibowk/replaced_ace_editor_with_code_mirror_and_loving_it/>
- I Built a LeetCode Clone with NEXT.JS! (Typescript, Tailwind CSS, Firebase, CodeMirror), Zugriff am April 13, 2026, <https://www.youtube.com/watch?v=LOr-02lCzzU>
- Vite vs Next.js: 2025 Developer Framework Comparison - Strapi, Zugriff am April 13, 2026, <https://strapi.io/blog/vite-vs-nextjs-2025-developer-framework-comparison>
- Vite vs Next.js: Complete Comparison for React Developers (2026) - DesignRevision, Zugriff am April 13, 2026, <https://designrevision.com/blog/vite-vs-nextjs>
- Vite vs. Next.js: A side-by-side comparison | Hygraph, Zugriff am April 13, 2026, <https://hygraph.com/blog/vite-vs-nextjs>
- Vite vs Next.js: A Comprehensive Comparison - TatvaSoft Blog, Zugriff am April 13, 2026, <https://www.tatvasoft.com/outsourcing/2026/01/vite-vs-next-js.html>
- When should you choose Next.js vs React + Vite for building web applications? - Reddit, Zugriff am April 13, 2026, <https://www.reddit.com/r/nextjs/comments/1neuh1s/when_should_you_choose_nextjs_vs_react_vite_for/>
- 18 Real-World JavaScript Projects You Need In Your Resume - Crio.Do, Zugriff am April 13, 2026, <https://www.crio.do/projects/category/javascript-projects/>
- Code Playground - Add-on Mode, Zugriff am April 13, 2026, <https://developer.adobe.com/express/add-ons/docs/guides/getting-started/code-playground-addon-mode>
- JavaScript and Node.js Online Test - TestDome, Zugriff am April 13, 2026, <https://www.testdome.com/tests/javascript-node-js-online-test/111>
- Dynamically Create Forms from JSON Schemas with SurveyJS, Zugriff am April 13, 2026, <https://surveyjs.io/stay-updated/blog/dynamically-create-forms-from-json-schema>
- Build Your Own JSON Parser - Coding Challenges, Zugriff am April 13, 2026, <https://codingchallenges.fyi/challenges/challenge-json-parser/>
- Learn json-everything, Zugriff am April 13, 2026, <https://blog.json-everything.net/posts/learn-json-everything/>
- What is JSON? Definitions & Examples - Code Institute, Zugriff am April 13, 2026, <https://codeinstitute.net/blog/what-is-json/>
- Why JSON and JSON Lines - NCBI, Zugriff am April 13, 2026, <https://www.ncbi.nlm.nih.gov/datasets/docs/v2/reference-docs/file-formats/metadata-files/why-jsonl/>
- Working with JSON - Learn web development | MDN, Zugriff am April 13, 2026, <https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON>
- JSON Schema examples, Zugriff am April 13, 2026, <https://json-schema.org/learn/json-schema-examples>
- An Introduction to JSON Schema: A Practical Look - YouTube, Zugriff am April 13, 2026, <https://www.youtube.com/watch?v=dtLl37W68g8>
- Choosing the Best JavaScript Validation Library: Yup, Zod, or Joi? | by Jaiman Soni, Zugriff am April 13, 2026, <https://medium.com/@jaimansoni/choosing-the-best-javascript-validation-library-yup-zod-or-joi-999280fc622c>
- Need to Verify Your JSON Schema? Here's a Few Ways to Do It! - Zuplo, Zugriff am April 13, 2026, <https://zuplo.com/blog/verify-json-schema>
- A language agnostic test suite for the JSON Schema specifications - GitHub, Zugriff am April 13, 2026, <https://github.com/json-schema-org/JSON-Schema-Test-Suite>
- How to create programming exercises with automated feedback - EATEL, Zugriff am April 13, 2026, <https://ea-tel.eu/events/how-to-create-programming-exercises-with-automated-feedback-2>
- Enhancing Form User Experience with CSS: Real-Time Feedback Techniques for Better User Interaction - DEV Community, Zugriff am April 13, 2026, <https://dev.to/devyoma/enhancing-form-user-experience-with-css-real-time-feedback-techniques-for-better-user-interaction-fig>
- Automated Feedback: less grading, better student work - FeedbackFruits, Zugriff am April 13, 2026, <https://feedbackfruits.com/solutions/automated-feedback>
- Client-side validation (validation in the presentation layers) - .NET | Microsoft Learn, Zugriff am April 13, 2026, <https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/client-side-validation>
- Client-side form validation - Learn web development | MDN, Zugriff am April 13, 2026, <https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation>
- Client side html/css/js validation - javascript - Stack Overflow, Zugriff am April 13, 2026, <https://stackoverflow.com/questions/11395326/client-side-html-css-js-validation>
- Check if specific text exists in iframe using javascript - Stack Overflow, Zugriff am April 13, 2026, <https://stackoverflow.com/questions/65765155/check-if-specific-text-exists-in-iframe-using-javascript>
- How to check if an element is inside an iframe or not - Stack Overflow, Zugriff am April 13, 2026, <https://stackoverflow.com/questions/12336031/how-to-check-if-an-element-is-inside-an-iframe-or-not>
- How to select elements inside iframe with Javascript - YouTube, Zugriff am April 13, 2026, <https://www.youtube.com/watch?v=SkAPftDyzNU>
- Automated Feedback - Student Help | Instructional Technology Help Center, Zugriff am April 13, 2026, <https://studenthelp.intech.arizona.edu/article/934-automated-feedback>
- Automated Feedback: Fostering an iterative feedback system - FeedbackFruits, Zugriff am April 13, 2026, <https://feedbackfruits.com/blog/automated-feedback-opening-the-way-to-an-iterative-feedback-system>
- Online JavaScript Coding Test - 15+ questions to screen candidates - CoderPad, Zugriff am April 13, 2026, <https://coderpad.io/online-coding-tests/javascript/>
- Lerneinheit 6: HTML/JavaScript: Interaktive Webseiten - Khan Academy, Zugriff am April 13, 2026, <https://de.khanacademy.org/computing/computer-programming/html-css-js>
- 12 JavaScript Code Challenges for Beginners - Codecademy, Zugriff am April 13, 2026, <https://www.codecademy.com/resources/blog/10-javascript-code-challenges-for-beginners>
- Programming Games For My Kids In simple HTML/CSS and JavaScript | by Erik Young, Zugriff am April 13, 2026, <https://medium.com/@erikyoung_58444/programming-games-for-my-kids-in-simple-html-css-and-javascript-42ed3b31934b>
- 10 Beginner(ish) JavaScript Code Challenges #fullstackroadmap (Ep. 6.9) - YouTube, Zugriff am April 13, 2026, <https://www.youtube.com/watch?v=ijbcs0ESqoM>
- 15+ Projects to master HTML, CSS, and JS with source code | by Astrogeek | Medium, Zugriff am April 13, 2026, <https://medium.com/@astrogeek77/15-projects-to-master-html-css-and-js-with-source-code-6fb883f08a25>
- HTML, CSS & JavaScript Full Course - Build 15 Projects - YouTube, Zugriff am April 13, 2026, <https://www.youtube.com/watch?v=kAiX0itnonM>
- 5 Mini JavaScript Projects - For Beginners - YouTube, Zugriff am April 13, 2026, <https://www.youtube.com/watch?v=2ml4x0rO1PQ>