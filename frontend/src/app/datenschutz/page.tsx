import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      <h1 className="sm:text-3xl text-center sm:text-left">Datenschutz</h1>
      <div className="flex flex-col gap-6">
        <Suspense>
          <p className="font-bold">Datenschutzerklärung</p>
          <p className="font-bold">Stand: Januar 2025</p>

          <p className="mb-6">
            Der Schutz Ihrer persönlichen Daten ist uns, The Art Gallery, ein
            wichtiges Anliegen. In dieser Datenschutzerklärung informieren wir
            Sie darüber, welche Daten wir erheben, wie wir sie verwenden und
            welche Rechte Sie in Bezug auf Ihre Daten haben.
          </p>

          <h2 className="mb-2">
            1. Verantwortlicher für die Datenverarbeitung
          </h2>
          <p className="mb-6">
            Max Mustermann
            <br />
            Musterstrasse 123
            <br />
            1234 Musterstadt
            <br />
            +41 44 123 45 67
            <br />
            E-Mail: info@the-art-gallery.ch
          </p>

          <h2 className="mb-2">
            2. Erhebung und Verarbeitung personenbezogener Daten
          </h2>
          <p className="mb-4">
            Wir verarbeiten Ihre personenbezogenen Daten ausschliesslich im
            Rahmen der geltenden Datenschutzgesetze der Schweiz (DSG). Die von
            uns erhobenen Daten umfassen:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              Bei der Registrierung: Vor- und Nachname, E-Mail-Adresse,
              Passwort.
            </li>
            <li>
              Bei der Event-Erstellung: Event-Titel, Beschreibung, Datum und
              Ort, eventuelle Teilnehmerlisten.
            </li>
            <li>Bei der Event-Anmeldung: Vor- und Nachname, E-Mail-Adresse.</li>
            <li>Technische Daten: IP-Adresse, Zugriffszeit.</li>
          </ul>

          <h2 className="mb-2">3. Zweck der Datenverarbeitung</h2>
          <p className="mb-4">
            Die von Ihnen bereitgestellten Daten werden zu folgenden Zwecken
            verwendet:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Bereitstellung und Verwaltung Ihres Benutzerkontos.</li>
            <li>Erstellung und Verwaltung von Events.</li>
            <li>
              Kommunikation mit Ihnen in Bezug auf Ihre Anfragen oder Events.
            </li>
            <li>
              Verbesserung unserer Dienstleistungen und Analyse der Nutzung der
              Website.
            </li>
          </ul>

          <h2 className="mb-2">4. Rechtsgrundlagen</h2>
          <p className="mb-4">
            Die Verarbeitung Ihrer Daten erfolgt auf Basis folgender
            Rechtsgrundlagen:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              Einwilligung gemäss Art. 6 DSG für die Registrierung und
              Event-Erstellung.
            </li>
            <li>Vertragserfüllung zur Bereitstellung der Dienstleistungen.</li>
            <li>
              Berechtigte Interessen, z. B. zur Sicherheit und Optimierung der
              Website.
            </li>
          </ul>

          <h2 className="mb-2">5. Weitergabe Ihrer Daten</h2>
          <p className="mb-6">
            Ihre Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte
            weitergegeben, ausser: An IT-Dienstleister, die für den Betrieb
            unserer Website notwendig sind. Wenn wir gesetzlich dazu
            verpflichtet sind.
          </p>

          <h2 className="mb-2">6. Speicherung und Löschung der Daten</h2>
          <p className="mb-6">
            Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für
            die Erfüllung der genannten Zwecke erforderlich ist oder wie es
            gesetzlich vorgeschrieben ist. Nach Ablauf der Speicherfrist werden
            Ihre Daten sicher gelöscht.
          </p>

          <h2 className="mb-2">7. Cookies und Tracking-Technologien</h2>
          <p className="mb-4">
            Unsere Website verwendet Cookies, um die Nutzung der Website zu
            verbessern. Cookies sind kleine Dateien, die auf Ihrem Gerät
            gespeichert werden.
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              Erforderliche Cookies: Diese Cookies sind für den Betrieb der
              Website notwendig.
            </li>
            <li>
              Optionale Cookies: Diese helfen uns, die Nutzung der Website zu
              analysieren.
            </li>
            <li>
              Sie können die Verwendung von Cookies in Ihrem Browser
              deaktivieren.
            </li>
          </ul>

          <h2 className="mb-2">8. Ihre Rechte</h2>
          <p className="mb-4">
            Sie haben folgende Rechte in Bezug auf Ihre personenbezogenen Daten:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>
              Recht auf Auskunft: Sie können Informationen über die von uns
              verarbeiteten Daten anfordern.
            </li>
            <li>
              Recht auf Berichtigung: Sie können unrichtige Daten korrigieren
              lassen.
            </li>
            <li>
              Recht auf Löschung: Sie können die Löschung Ihrer Daten verlangen.
            </li>
            <li>
              Recht auf Datenübertragbarkeit: Sie können Ihre Daten in einem
              gängigen Format anfordern.
            </li>
            <li>
              Recht auf Widerruf: Sie können eine erteilte Einwilligung
              jederzeit widerrufen.
            </li>
          </ul>
          <p className="mb-6">
            Anfragen zu Ihren Rechten richten Sie bitte an:
            datenschutz@the-art-gallery.ch
          </p>

          <h2 className="mb-2">9. Änderungen dieser Datenschutzerklärung</h2>
          <p className="mb-6">
            Wir behalten uns das Recht vor, diese Datenschutzerklärung bei
            Bedarf anzupassen. Die aktuelle Version ist immer auf unserer
            Website verfügbar.
          </p>
        </Suspense>
      </div>
    </div>
  );
}
