import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone, code } = await req.json();

    if (
      !phone ||
      !/^7[0-9]{8}$/.test(phone) ||
      !/^[0-9]{6}$/.test(code)
    ) {
      return NextResponse.json(
        { error: "شماره یا کد تأیید معتبر نیست." },
        { status: 400 }
      );
    }

    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const service = process.env.TWILIO_VERIFY_SERVICE_SID;

    if (!sid || !token || !service) {
      return NextResponse.json(
        { error: "تنظیمات پیامک تکمیل نشده است." },
        { status: 500 }
      );
    }

    const credentials = Buffer.from(
      `${sid}:${token}`
    ).toString("base64");

    const response = await fetch(
      `https://verify.twilio.com/v2/Services/${service}/VerificationCheck`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: `+93${phone}`,
          Code: code,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || data.status !== "approved") {
      return NextResponse.json(
        { error: "کد تأیید اشتباه است یا اعتبار آن تمام شده." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "شماره موبایل با موفقیت تأیید شد.",
    });

  } catch {
    return NextResponse.json(
      { error: "خطای سرور رخ داده است." },
      { status: 500 }
    );
  }
}
