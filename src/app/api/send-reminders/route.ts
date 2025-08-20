// export default async function handler(req: any, res: any) {
//   try {
//     const response = await fetch(process.env.apiLocal + "send-reminders");
//     const data = await response.json();

//     res.status(200).json({ success: true, data });
//   } catch (err: any) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// }
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  try {
    console.log(process.env.apiLocal + "send-reminders");
    console.log("eu to wexecultanda");

    const response = await fetch(process.env.apiLocal + "send-reminders");
    const data = await response.json();

    res.status(200).json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
}
