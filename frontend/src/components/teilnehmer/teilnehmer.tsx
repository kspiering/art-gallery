import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface TeilnehmerPageProps {
  participants: {
    firstname: string;
    lastname: string;
    email: string;
    created_at: string;
  }[];
}

export default function TeilnehmerPage({ participants }: TeilnehmerPageProps) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Teilnehmer: {participants.length}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {participants.map((participant, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex flex-row gap-2">
                  <label className="font-medium text-gray-500">Vorname: </label>
                  <span className="font-semibold">{participant.firstname}</span>
                </div>
                <div className="flex flex-row gap-2">
                  <label className="font-medium text-gray-500">
                    Nachname:{" "}
                  </label>
                  <span className="font-semibold">{participant.lastname}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
