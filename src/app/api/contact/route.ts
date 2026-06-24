import { NextResponse } from "next/server";
import { Resend } from "resend";

// Fallback email or developer notification if API key isn't provided
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummykey_12345678");
const targetEmail = process.env.CONTACT_EMAIL || "grapheneinteriors@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      formType,
      name,
      phone,
      email,
      service,
      budget,
      address,
      contactMethod,
      message,
      preferredDate,
      preferredTime,
      photoName,
      photoBase64,
    } = body;

    // Check if API Key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Simulating form submission logging:");
      console.log(JSON.stringify(body, null, 2));
      return NextResponse.json({ success: true, message: "Demo mode submission success." });
    }

    let emailSubject = "";
    let emailHtml = "";
    let attachments: any[] = [];

    if (formType === "quote") {
      emailSubject = `New Luxury Quote Request: ${name} (${service})`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #748f6e; border-radius: 12px; background-color: #F8F8F8;">
          <h2 style="color: #111827; border-bottom: 2px solid #748f6e; padding-bottom: 10px; font-family: Georgia, serif;">Graphene Interiors Ltd — New Quote Lead</h2>
          <p style="font-size: 16px; color: #1F2937;">You have received a new luxury quote inquiry from the website.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr style="background-color: #eee;"><td style="padding: 10px; font-weight: bold; width: 180px;">Client Name:</td><td style="padding: 10px;">${name}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Phone:</td><td style="padding: 10px;"><a href="tel:${phone}">${phone}</a></td></tr>
            <tr style="background-color: #eee;"><td style="padding: 10px; font-weight: bold;">Email:</td><td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Service Needed:</td><td style="padding: 10px; text-transform: capitalize;">${service}</td></tr>
            <tr style="background-color: #eee;"><td style="padding: 10px; font-weight: bold;">Budget Range:</td><td style="padding: 10px;">${budget}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Project Address:</td><td style="padding: 10px;">${address}</td></tr>
            <tr style="background-color: #eee;"><td style="padding: 10px; font-weight: bold;">Preferred Contact:</td><td style="padding: 10px; text-transform: uppercase; font-weight: bold; color: #748f6e;">${contactMethod}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #fff; border-left: 4px solid #748f6e;">
            <strong style="display: block; margin-bottom: 5px;">Client Message:</strong>
            <p style="margin: 0; color: #1F2937; line-height: 1.5;">${message || "No message details provided."}</p>
          </div>
          ${photoName ? `<p style="margin-top: 15px; font-size: 13px; color: #666;">📎 A project photo (${photoName}) has been attached below.</p>` : ""}
          <p style="margin-top: 30px; font-size: 11px; text-align: center; color: #999; border-top: 1px solid #ddd; padding-top: 10px;">
            Submitted on: ${new Date().toLocaleString("en-GB")} from Graphene Interiors Web App
          </p>
        </div>
      `;

      if (photoBase64 && photoName) {
        // Convert Base64 dataURL to raw Buffer for Resend attachment
        const base64Data = photoBase64.split(",")[1];
        if (base64Data) {
          attachments.push({
            filename: photoName,
            content: Buffer.from(base64Data, "base64"),
          });
        }
      }
    } else if (formType === "consultation") {
      emailSubject = `Free 3D Consultation Request: ${name}`;
      emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #748f6e; border-radius: 12px; background-color: #F8F8F8;">
          <h2 style="color: #111827; border-bottom: 2px solid #748f6e; padding-bottom: 10px; font-family: Georgia, serif;">Graphene Interiors Ltd — Consultation Lead</h2>
          <p style="font-size: 16px; color: #1F2937;">You have received a new consultation request from the website exit-intent modal.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr style="background-color: #eee;"><td style="padding: 10px; font-weight: bold; width: 180px;">Client Name:</td><td style="padding: 10px;">${name}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Phone:</td><td style="padding: 10px;"><a href="tel:${phone}">${phone}</a></td></tr>
            <tr style="background-color: #eee;"><td style="padding: 10px; font-weight: bold;">Email:</td><td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Preferred Date:</td><td style="padding: 10px; font-weight: bold; color: #748f6e;">${preferredDate}</td></tr>
            <tr style="background-color: #eee;"><td style="padding: 10px; font-weight: bold;">Preferred Time:</td><td style="padding: 10px; text-transform: capitalize;">${preferredTime}</td></tr>
            <tr><td style="padding: 10px; font-weight: bold;">Preferred Contact:</td><td style="padding: 10px; text-transform: uppercase;">${contactMethod}</td></tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background-color: #fff; border-left: 4px solid #748f6e;">
            <strong style="display: block; margin-bottom: 5px;">Design Notes:</strong>
            <p style="margin: 0; color: #1F2937; line-height: 1.5;">${message || "No design notes provided."}</p>
          </div>
          <p style="margin-top: 30px; font-size: 11px; text-align: center; color: #999; border-top: 1px solid #ddd; padding-top: 10px;">
            Submitted on: ${new Date().toLocaleString("en-GB")} from Graphene Interiors Web App
          </p>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Graphene Interiors Website <leads@grapheneinteriors.co.uk>",
      to: [targetEmail],
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json({ success: true, data: emailResponse });
  } catch (error: any) {
    console.error("Resend API Route Error: ", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to dispatch email." },
      { status: 500 }
    );
  }
}
