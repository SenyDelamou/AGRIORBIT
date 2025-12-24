// src/api/send-welcome-email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST = async (request: Request) => {
  try {
    const { email, name } = await request.json();

    if (!email || !name) {
      return new Response(JSON.stringify({ error: 'Email et nom requis' }), {
        status: 400,
      });
    }

    await resend.emails.send({
      from: 'AgriOrbit <onboarding@resend.dev>', // fonctionne immédiatement
      to: [email],
      subject: 'Bienvenue sur AgriOrbit 🌱',
      html: `
        <h1>Bonjour ${name} !</h1>
        <p>Merci de vous être inscrit avec Google.</p>
        <p>Votre compte est prêt. Connectez-vous quand vous voulez sur <a href="https://agriorbit.vercel.app">agriorbit.vercel.app</a></p>
        <br>
        <p>L'équipe AgriOrbit</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Erreur envoi email' }), {
      status: 500,
    });
  }
};