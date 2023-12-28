import { NextRequest, NextResponse } from 'next/server';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SG_API);

export async function POST(req) {
	let body = await req.json();
	try {
		await sendgrid.send({
			to: 'adityatripathi04@outlook.com',
			from: 'adityatripathi.at04@gmail.com',
			subject: `Trip a Peg enquiry from ${body.name}`,
			html: `
            <section style="padding-left: 1.5rem;padding-right: 1.5rem;padding-top: 2rem;padding-bottom: 2rem;max-width: 42rem;background-color: #ffffff;">
                <main style="margin-top: 2rem;">
                    <h2 style="color: #374151;">Hi <b>Trip a Peg</b>,</h2>
                    <p style="margin-top: 0.5rem;line-height: 2;color: #4B5563;">
                        There is a new enquiry:<br/>
                        Name: ${body.name} <br/>
                        Email: ${body.email} <br/>
                        Phone: ${body.phone} <br/>
                        Query: ${body.query} <br/>
                        Trip: ${body.tripName} <br/>
                    </p>
                    
                    <p style="margin-top: 0.5rem;color: #4B5563; ">
                        Thanks, <br>
                        Aditya Tripathi
                    </p>
                </main>
                
            
                <footer style="margin-top:2rem">
                    <p style="color: #6B7280;">
                        This email was sent to <a href="#" style="color: #2563EB;" target="_blank">tripapeg@gmail.com</a>. 
                    </p>
            
                    <p style="mt-3 color: #6B7280;">&copy; ${new Date().getFullYear()} Trip a Peg. All Rights Reserved.</p>
                </footer>
            </section>
            `,
		});
		console.log('Sent email');
	} catch (error) {
		console.log(error);
		return NextResponse.status({ ok: false });
	}
	return NextResponse.json({ ok: true });
}
