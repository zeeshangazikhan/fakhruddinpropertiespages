import { NextRequest, NextResponse } from 'next/server';

// This API route performs runtime actions (sending SMTP emails) and
// therefore must be treated as dynamic when `output: 'export'` is enabled
export const dynamic = 'force-dynamic'
import nodemailer from 'nodemailer';

// Email recipients
const EMAIL_RECIPIENTS = ['zeeshan.solvetude@gmail.com', 'ak@solvetude.com', 'zeeshangazikhan@gmail.com'];

// Create transporter - choose `secure` based on port (465 => secure)
const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
const smtpSecure = smtpPort === 465; // true for SMTPS

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  // Allow self-signed/invalid certs in cPanel/custom setups
  // This is common for shared hosting SMTP servers
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2',
  },
});

interface EOIFormData {
  // Party 1
  name1: string;
  mobile1: string;
  email1: string;
  nationality1: string;
  passportNumber1: string;
  
  // Party 2 (optional)
  name2?: string;
  mobile2?: string;
  email2?: string;
  nationality2?: string;
  passportNumber2?: string;
  
  // Unit preferences
  unitType: string;
  unitNumber: string;
  downPayment: string;
  preferredUnit: string;
  salesManager: string;
  
  // Agency Information
  agencyName: string;
  agentName: string;
  agentMobile: string;
  
  // Metadata
  submittedAt: string;
  source: string;
}

function generateEmailHTML(data: EOIFormData): string {
  const hasParty2 = data.name2 && data.name2.trim() !== '';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New EOI Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #334058 0%, #4a5d7a 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                🏢 New EOI Submission
              </h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">
                Treppan Living Prive
              </p>
            </td>
          </tr>

          <!-- Submission Time Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #DAAA97 0%, #c99b86 100%); padding: 16px 40px;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="color: #ffffff; font-size: 14px;">
                    <strong>📅 Submitted:</strong> ${data.submittedAt}
                  </td>
                  <td align="right" style="color: #ffffff; font-size: 14px;">
                    <strong>🌐 Source:</strong> ${data.source}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Party 1 Details -->
          <tr>
            <td style="padding: 32px 40px 24px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <h2 style="margin: 0; color: #334058; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                      <span style="display: inline-block; width: 32px; height: 32px; background: #DAAA97; border-radius: 50%; color: white; text-align: center; line-height: 32px; margin-right: 12px; font-size: 14px;">1</span>
                      Interested Party 1
                    </h2>
                  </td>
                </tr>
              </table>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: #f8f9fa; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e9ecef;">
                    <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</span>
                    <p style="margin: 4px 0 0 0; color: #334058; font-size: 16px; font-weight: 600;">${data.name1}</p>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e9ecef;">
                    <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Mobile</span>
                    <p style="margin: 4px 0 0 0; color: #334058; font-size: 16px; font-weight: 600;">${data.mobile1}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e9ecef;">
                    <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                    <p style="margin: 4px 0 0 0; color: #334058; font-size: 16px; font-weight: 600;">
                      <a href="mailto:${data.email1}" style="color: #DAAA97; text-decoration: none;">${data.email1}</a>
                    </p>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e9ecef;">
                    <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Nationality</span>
                    <p style="margin: 4px 0 0 0; color: #334058; font-size: 16px; font-weight: 600;">${data.nationality1}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 16px 20px;">
                    <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Passport Number</span>
                    <p style="margin: 4px 0 0 0; color: #334058; font-size: 16px; font-weight: 600;">${data.passportNumber1}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${hasParty2 ? `
          <!-- Party 2 Details -->
          <tr>
            <td style="padding: 0 40px 24px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <h2 style="margin: 0; color: #334058; font-size: 18px; font-weight: 600;">
                      <span style="display: inline-block; width: 32px; height: 32px; background: #DAAA97; border-radius: 50%; color: white; text-align: center; line-height: 32px; margin-right: 12px; font-size: 14px;">2</span>
                      Interested Party 2
                    </h2>
                  </td>
                </tr>
              </table>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: #f8f9fa; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e9ecef;">
                    <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</span>
                    <p style="margin: 4px 0 0 0; color: #334058; font-size: 16px; font-weight: 600;">${data.name2}</p>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e9ecef;">
                    <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Mobile</span>
                    <p style="margin: 4px 0 0 0; color: #334058; font-size: 16px; font-weight: 600;">${data.mobile2}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e9ecef;">
                    <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                    <p style="margin: 4px 0 0 0; color: #334058; font-size: 16px; font-weight: 600;">
                      <a href="mailto:${data.email2}" style="color: #DAAA97; text-decoration: none;">${data.email2}</a>
                    </p>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e9ecef;">
                    <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Nationality</span>
                    <p style="margin: 4px 0 0 0; color: #334058; font-size: 16px; font-weight: 600;">${data.nationality2}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 16px 20px;">
                    <span style="color: #6c757d; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Passport Number</span>
                    <p style="margin: 4px 0 0 0; color: #334058; font-size: 16px; font-weight: 600;">${data.passportNumber2}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Unit Preferences -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <h2 style="margin: 0; color: #334058; font-size: 18px; font-weight: 600;">
                      🏠 Unit Preferences
                    </h2>
                  </td>
                </tr>
              </table>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #334058 0%, #4a5d7a 100%); border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 20px; text-align: center; border-right: 1px solid rgba(255,255,255,0.1);">
                    <span style="color: rgba(255,255,255,0.7); font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Unit Type</span>
                    <p style="margin: 8px 0 0 0; color: #DAAA97; font-size: 20px; font-weight: 700;">${data.unitType}</p>
                  </td>
                  <td style="padding: 20px; text-align: center; border-right: 1px solid rgba(255,255,255,0.1);">
                    <span style="color: rgba(255,255,255,0.7); font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Unit Number</span>
                    <p style="margin: 8px 0 0 0; color: #DAAA97; font-size: 20px; font-weight: 700;">${data.unitNumber}</p>
                  </td>
                  <td style="padding: 20px; text-align: center;">
                    <span style="color: rgba(255,255,255,0.7); font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Down Payment</span>
                    <p style="margin: 8px 0 0 0; color: #DAAA97; font-size: 20px; font-weight: 700;">${data.downPayment}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- EOI Value -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: #e7f3ff; border-radius: 12px; border: 1px solid #b3d9ff;">
                <tr>
                  <td style="padding: 20px;">
                    <span style="color: #004085; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">💰 EOI Value</span>
                    <p style="margin: 8px 0 0 0; color: #004085; font-size: 18px; font-weight: 700;">${data.preferredUnit}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Agency Information -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding-bottom: 16px;">
                    <h2 style="margin: 0; color: #334058; font-size: 18px; font-weight: 600;">
                      🏢 Agency Information
                    </h2>
                  </td>
                </tr>
              </table>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: #f0f8ff; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #d9e9f7;">
                    <span style="color: #004085; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Agency Name</span>
                    <p style="margin: 4px 0 0 0; color: #334058; font-size: 16px; font-weight: 600;">${data.agencyName}</p>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #d9e9f7;">
                    <span style="color: #004085; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Agent Name</span>
                    <p style="margin: 4px 0 0 0; color: #334058; font-size: 16px; font-weight: 600;">${data.agentName}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 16px 20px;">
                    <span style="color: #004085; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Agent Mobile</span>
                    <p style="margin: 4px 0 0 0; color: #334058; font-size: 16px; font-weight: 600;">${data.agentMobile}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sales Manager -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: #fff3cd; border-radius: 12px; border: 1px solid #ffc107;">
                <tr>
                  <td style="padding: 20px;">
                    <span style="color: #856404; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">👤 Assigned Sales Manager</span>
                    <p style="margin: 8px 0 0 0; color: #856404; font-size: 18px; font-weight: 700;">${data.salesManager}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f8f9fa; padding: 24px 40px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #6c757d; font-size: 12px;">
                This is an automated email from the Treppan Living Prive EOI system.
              </p>
              <p style="margin: 8px 0 0 0; color: #6c757d; font-size: 12px;">
                © ${new Date().getFullYear()} Fakhruddin Properties. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    console.log('send-eoi: incoming method=%s url=%s', request.method, request.url);
    let data: EOIFormData;
    let passport1Buffer: Buffer | null = null;
    let passport2Buffer: Buffer | null = null;
    
    try {
      // Check if it's FormData or JSON
      const contentType = request.headers.get('content-type') || '';
      
      if (contentType.includes('multipart/form-data')) {
        // Parse FormData
        const formData = await request.formData();
        
        // Extract text fields
        data = {
          name1: formData.get('name1') as string,
          mobile1: formData.get('mobile1') as string,
          email1: formData.get('email1') as string,
          nationality1: formData.get('nationality1') as string,
          passportNumber1: formData.get('passportNumber1') as string,
          name2: formData.get('name2') as string | undefined,
          mobile2: formData.get('mobile2') as string | undefined,
          email2: formData.get('email2') as string | undefined,
          nationality2: formData.get('nationality2') as string | undefined,
          passportNumber2: formData.get('passportNumber2') as string | undefined,
          unitType: formData.get('unitType') as string,
          unitNumber: formData.get('unitNumber') as string,
          downPayment: formData.get('downPayment') as string,
          preferredUnit: formData.get('preferredUnit') as string,
          salesManager: formData.get('salesManager') as string,
          agencyName: formData.get('agencyName') as string,
          agentName: formData.get('agentName') as string,
          agentMobile: formData.get('agentMobile') as string,
          submittedAt: formData.get('submittedAt') as string,
          source: formData.get('source') as string,
        };
        
        // Extract files
        const passport1File = formData.get('passport1') as File | null;
        const passport2File = formData.get('passport2') as File | null;
        
        if (passport1File && passport1File.size > 0) {
          passport1Buffer = Buffer.from(await passport1File.arrayBuffer());
        }
        if (passport2File && passport2File.size > 0) {
          passport2Buffer = Buffer.from(await passport2File.arrayBuffer());
        }
        
        // Store file names for later use
        const passport1FileName = passport1File?.name || 'Passport_Party1';
        const passport2FileName = passport2File?.name || 'Passport_Party2';
        
        // Add file names to data object for use in attachments
        (data as any).passport1FileName = passport1FileName;
        (data as any).passport2FileName = passport2FileName;
      } else {
        // Fallback to JSON for backward compatibility
        data = await request.json();
      }
    } catch (jsonErr) {
      console.error('send-eoi: invalid body', jsonErr);
      return NextResponse.json({ success: false, message: 'Invalid request body' }, { status: 400 });
    }
    console.log('send-eoi: SMTP host=%s port=%s secure=%s user=%s', smtpHost, smtpPort, smtpSecure, process.env.SMTP_USER);

    // Verify transporter connection before attempting to send
    try {
      await transporter.verify();
      console.log('send-eoi: SMTP transporter verified');
    } catch (verifyErr) {
      const errMsg = verifyErr instanceof Error ? verifyErr.message : String(verifyErr);
      console.error('send-eoi: SMTP transporter verification failed', {
        error: errMsg,
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        user: process.env.SMTP_USER,
      });
      return NextResponse.json({ 
        success: false, 
        message: `SMTP verification failed: ${errMsg}` 
      }, { status: 500 });
    }
    
    // Generate HTML email
    const htmlContent = generateEmailHTML(data);
    
    // Build attachments array
    const attachments: Array<{ filename: string; content: Buffer }> = [];
    if (passport1Buffer) {
      const fileName = (data as any).passport1FileName || 'Passport_Party1';
      attachments.push({
        filename: fileName,
        content: passport1Buffer,
      });
    }
    if (passport2Buffer) {
      const fileName = (data as any).passport2FileName || 'Passport_Party2';
      attachments.push({
        filename: fileName,
        content: passport2Buffer,
      });
    }
    
    // Send email to all recipients
    const mailOptions: any = {
      from: process.env.SMTP_FROM || '"Treppan Living Prive" <noreply@treppan.com>',
      to: EMAIL_RECIPIENTS.join(', '),
      subject: `🏢 New EOI Submission - ${data.name1} | ${data.unitType}`,
      html: htmlContent,
    };
    
    // Add attachments if any
    if (attachments.length > 0) {
      mailOptions.attachments = attachments;
    }

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'EOI submitted successfully' 
    });
    
  } catch (error) {
    console.error('Error sending EOI email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit EOI' },
      { status: 500 }
    );
  }
}

// Explicitly handle other methods so callers always get JSON responses
export async function GET(request: NextRequest) {
  console.log('send-eoi: GET received at %s', request.url);
  return NextResponse.json({ success: false, message: 'Method GET not allowed. Use POST.' }, { status: 405 });
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ success: false, message: 'Method PUT not allowed. Use POST.' }, { status: 405 });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ success: false, message: 'Method DELETE not allowed. Use POST.' }, { status: 405 });
}

export async function OPTIONS(request: NextRequest) {
  // Respond to preflight requests
  return new NextResponse(null, { status: 204, headers: { 'Allow': 'POST, OPTIONS' } });
}
