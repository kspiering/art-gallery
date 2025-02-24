import { Suspense } from "react";

export default async function Home() {
  return (
    <div>
      <h1 className="sm:text-3xl text-center sm:text-left">Impressum</h1>
      <div className="flex flex-col gap-6">
        <Suspense>
          <div className="space-y-6">
            <div>
              <p className="font-bold">Verantwortlich für den Inhalt:</p>
              <p>The Art Gallery AG</p>
              <p>Max Mustermann</p>
              <p>Musterstrasse 123</p>
              <p>1234 Musterstadt</p>
              <p>Schweiz</p>
            </div>

            <div>
              <p>📞 Telefon: +41 44 123 45 67</p>
              <p>📧 E-Mail: info@the-art-gallery.ch</p>
              <p>🌐 Webseite: www.mustermann-the-art-gallery.ch</p>
            </div>

            <div>
              <p>Handelsregistereintrag</p>
              <p>Eingetragen im Handelsregister des Kantons Zürich</p>
              <p>Handelsregisternummer: CHE-123.456.789</p>
            </div>

            <div>
              <p>Umsatzsteuer-Identifikationsnummer (UID)</p>
              <p>CHE-123.456.789 MWST</p>
            </div>

            <div>
              <p>Haftungsausschluss</p>
              <p>
                Der Inhalt dieser Webseite wurde mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                können wir jedoch keine Gewähr übernehmen.
              </p>
            </div>

            <div>
              <p>Urheberrecht</p>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                dieser Webseite unterliegen dem Urheberrecht. Beiträge Dritter
                sind als solche gekennzeichnet.
              </p>
            </div>

            <div>
              <p>Streitschlichtung</p>
              <p>
                In der Schweiz gibt es keine gesetzliche Pflicht zur Teilnahme
                an einem Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle. Wir sind jedoch bestrebt,
                eventuelle Konflikte direkt mit unseren Kunden zu klären.
              </p>
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
