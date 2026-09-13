import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function envValue(name: string, fallback = "") {
  const value = process.env[name]?.trim();
  if (!value) return fallback;
  return value.replace(/^['"]|['"]$/g, "").trim();
}

const ZOHO_USER = envValue("ZOHO_USER", "info@lotusmedinnovation.com");
const ZOHO_APP_PASSWORD = envValue("ZOHO_APP_PASSWORD");
const ZOHO_HOST = envValue("ZOHO_HOST", "smtp.zoho.com");
const ZOHO_PORT = Number(envValue("ZOHO_PORT", "465")) || 465;
const CONTACT_TO_EMAIL = envValue("CONTACT_TO_EMAIL", "info@lotusmedinnovation.com");
const CONTACT_COPY_EMAIL = envValue("CONTACT_COPY_EMAIL", "lmiglocapital@gmail.com");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function asText(value: unknown) {
  return String(value || "").trim();
}

export async function POST(request: Request) {
  if (!ZOHO_APP_PASSWORD) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const firstName = asText(body.firstName);
  const lastName = asText(body.lastName);
  const email = asText(body.email);
  const phone = asText(body.phone);
  const message = asText(body.message);
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Website visitor";

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  if (phone.replace(/\D/g, "").length < 8) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 400 },
    );
  }

  const zohoInbox = CONTACT_TO_EMAIL;
  const gmailCopy = CONTACT_COPY_EMAIL;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: ZOHO_PORT,
    secure: ZOHO_PORT === 465,
    auth: {
      user: ZOHO_USER,
      pass: ZOHO_APP_PASSWORD,
    },
  });

  const makeContent = (sentTo: string) => ({
    from: `"Lotus Med Innovation" <${ZOHO_USER}>`,
    replyTo: email,
    subject: `New contact form message from ${fullName} [${sentTo}]`,
    text: [
      `This copy was sent to: ${sentTo}`,
      "",
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Message: ${message || "(no message)"}`,
    ].join("\n"),
    html: `
      <div style="font-family: Georgia, serif; color: #191614; line-height: 1.5;">
        <p style="margin: 0 0 16px;"><strong>This copy was sent to:</strong> ${escapeHtml(sentTo)}</p>
        <h2 style="margin: 0 0 16px;">New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(message || "(no message)")}</p>
      </div>
    `,
  });

  try {
    await transporter.sendMail({
      ...makeContent(zohoInbox),
      to: zohoInbox,
    });
  } catch (error) {
    console.error("Zoho inbox send failed:", error);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 502 },
    );
  }

  if (gmailCopy && gmailCopy.toLowerCase() !== zohoInbox.toLowerCase()) {
    try {
      await transporter.sendMail({
        ...makeContent(gmailCopy),
        to: gmailCopy,
      });
    } catch (error) {
      console.error("Gmail copy send failed:", error);
    }
  }

  return NextResponse.json({ ok: true });
}
