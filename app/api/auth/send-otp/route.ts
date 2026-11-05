
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone || !/^7[0-9]{8}$/.test(phone)) {
      return NextResponse.json(
        { error: "شماره موبایل افغانستان معتبر نیست." },
        { status: 400 }
      );
    }

    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const service = process.env.TWILIO_VERIFY_SERVICE_SID;

    if (!sid || !token || !service) {
      return NextResponse.json(
        { error: "تنظیمات سرویس پیامک تکمیل نشده است." },
        { status: 500 }
      );
    }

    const credentials = Buffer.from(`${sid}:${token}`).toString("base64");

    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${service}/Verifications`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: `+93${phone}`,
          Channel: "sms",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "ارسال پیامک موفق نشد." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "کد تأیید ارسال شد.",
    });

  } catch {
    return NextResponse.json(
      { error: "خطا در سرور." },
      { status: 500 }
    );
  }
}
