import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log(process.env.apiLocal + "send-reminders");
    console.log("Eu estou executando");

    const response = await fetch(process.env.apiLocal + "send-reminders");
    const data = await response.json();

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
