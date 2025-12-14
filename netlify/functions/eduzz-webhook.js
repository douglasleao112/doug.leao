export default async (req, context) => {
  try {
    const raw = await req.text();

    // responde 200 IMEDIATO pra Eduzz validar e ativar
    const forwardPromise = fetch("https://script.google.com/macros/s/AKfycbwCMAGf9mHJ2eQCmZ9a-lMHfm8LoglPIW3JRc90HMEWMvAor4t3Br-z2064-XbflnexIg/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: raw || "{}",
    });

    // não espera o forward terminar
    context.waitUntil(forwardPromise);

    return new Response("ok", { status: 200, headers: { "Content-Type": "text/plain" } });
  } catch (e) {
    return new Response("ok", { status: 200, headers: { "Content-Type": "text/plain" } });
  }
};
