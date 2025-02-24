import MeineAnmeldungen from "@/components/event-anmeldungen/meine-anmeldungen";

export default function EventAnmeldungen() {
  return (
    <div>
      <h1 className="sm:text-3xl text-center sm:text-left">
        Zu besuchende Ausstellungen
      </h1>
      <h2 className="sm:text-2xl text-center sm:text-left">
        Meine Anmeldungen
      </h2>
      <div className="flex flex-col gap-6">
        <MeineAnmeldungen />
      </div>
    </div>
  );
}
