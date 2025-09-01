import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://emojihub.yurace.pro/api/all", {
      // важно: делаем запрос только с серверной части
      cache: "no-store", // чтобы всегда свежие данные
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch emojis: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
