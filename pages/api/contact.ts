import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(405).json({ ok: false, error: "Method not allowed" });

  try {
    const { email, message, name, score, type } = req.body as {
      email?: string;
      message?: string;
      name?: string;
      score?: number;
      type: string
    };

    const safeEmail = (email || "").trim();
    const safeMessage = (message || "").trim();
    const safeName = (name || "").trim();
    const safeScore = score
    const safeType = (type || "").trim();

    // if (!safeMessage || safeMessage.length < 3) {
    //   return res
    //     .status(400)
    //     .json({ ok: false, error: "Message is too short." });
    // }
    if (safeEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(safeEmail)) {
      return res.status(400).json({ ok: false, error: "Invalid email." });
    }
    if (safeMessage.length > 4000) {
      return res.status(400).json({ ok: false, error: "Message is too long." });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId)
      return res
        .status(500)
        .json({ ok: false, error: "Missing Telegram config." });

    const text =
      (safeType ? `TYPE: ${safeType}\n` : "") +
      (safeName ? `Name: ${safeName}\n` : "") +
      (safeScore ? `Score: ${safeScore}\n` : "") +
      (safeEmail ? `Email: ${safeEmail}\n` : "") +
      `Message:\n${safeMessage}`;

    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          disable_web_page_preview: true,
        }),
      },
    );

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      return res
        .status(502)
        .json({
          ok: false,
          error: "Telegram request failed.",
          details: errText,
        });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(400).json({ ok: false, error: "Invalid request body." });
  }
}
