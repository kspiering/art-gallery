import { authConfig } from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);

    if (!session || !session.accessToken) {
      return NextResponse.json(
        { message: "Nicht authentifiziert" },
        { status: 401 }
      );
    }

    const data = await request.json();

    // Validierung der erforderlichen Felder
    if (!data.title || !data.content || !data.date || !data.place) {
      return NextResponse.json(
        { message: "Alle Felder müssen ausgefüllt sein" },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.BACKEND_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: responseData.message || "Fehler beim Erstellen des Events" },
        { status: response.status }
      );
    }

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Event Erstellung fehlgeschlagen:", error);
    return NextResponse.json(
      { message: "Server-Fehler bei der Event-Erstellung" },
      { status: 500 }
    );
  }
}
