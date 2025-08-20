import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const authHeader = request.headers.get("authorization");
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response("Unauthorized", {
  //     status: 401,
  //   });
  // }

  try {
    console.log(process.env.apiLocal + "send-reminders");
    console.log("Eu estou executando");

    const response = await fetch(process.env.apiLocal + "send-reminders");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
