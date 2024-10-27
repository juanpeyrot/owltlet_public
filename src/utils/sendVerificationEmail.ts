

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
  const response = await fetch (`/api/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
			'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? "",
    },
    body: JSON.stringify({toEmail: email, verificationToken}),
  })

  return response.json();
}