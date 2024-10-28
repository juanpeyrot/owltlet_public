import emailjs from "emailjs-com";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  try {
		console.log(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
		await emailjs.send(
			process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
			process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
			{
				to_email: email,
				verification_url: `${process.env.NEXT_PUBLIC_URL}/auth/verify?token=${verificationToken}`,
				reply_to: email,
			},
			process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ""
		);
	}
	catch (err){
		console.log(err)
	}
};
