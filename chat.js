import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const messages = req.body.messages || [];
  if (!messages.length) return res.status(400).json({ error: "No messages provided" });

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: messages,
    });

    const text = completion.data.choices[0].message.content;
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message || "OpenAI request failed" });
  }
}
