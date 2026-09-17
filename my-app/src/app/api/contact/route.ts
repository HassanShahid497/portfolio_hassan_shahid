import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all fields (name, email, and message)." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_EMAIL || "hassanshahid497@gmail.com";

    // 1. Check for Resend API Key (Recommended for Next.js)
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || "Portfolio Contact <onboarding@resend.dev>",
          to: [recipientEmail],
          reply_to: email,
          subject: `Portfolio Contact Inquiry from ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; rounded: 8px;">
              <h2 style="color: #10b981; margin-top: 0;">New Message from Portfolio Website</h2>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 15px 0;" />
              <p><strong>Sender Name:</strong> ${name}</p>
              <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 3px solid #10b981;">
                ${message.replace(/\n/g, "<br/>")}
              </div>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0 10px 0;" />
              <p style="font-size: 12px; color: #888;">Received from Hassan Shahid's Portfolio Website</p>
            </div>
          `,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Resend API error:", data);
        return NextResponse.json(
          { success: false, error: data.message || "Failed to send email via Resend." },
          { status: res.status }
        );
      }

      return NextResponse.json({ success: true, data });
    }

    // 2. Check for Web3Forms Access Key
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            name,
            email,
            message,
            subject: `Portfolio Contact: ${name}`,
            from_name: "Portfolio Contact Form",
          }),
        });

        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          if (res.ok && data.success) {
            return NextResponse.json({ success: true, data });
          }
          return NextResponse.json(
            { success: false, error: data.message || "Failed to deliver email via Web3Forms." },
            { status: 400 }
          );
        }
      } catch (e) {
        console.error("Web3Forms backend attempt failed:", e);
      }
    }

    // 3. Dev / Fallback mode (Logs message so development/testing works without API key)
    console.log("-----------------------------------------");
    console.log("📨 NEW CONTACT FORM SUBMISSION (Simulated)");
    console.log(`From: ${name} <${email}>`);
    console.log(`To: ${recipientEmail}`);
    console.log(`Message: ${message}`);
    console.log("To receive live emails directly in your inbox, set RESEND_API_KEY in .env.local");
    console.log("-----------------------------------------");

    return NextResponse.json({
      success: true,
      simulated: true,
      message: "Message received! Add RESEND_API_KEY to .env.local for live inbox delivery.",
    });
  } catch (error: unknown) {
    console.error("Contact API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
