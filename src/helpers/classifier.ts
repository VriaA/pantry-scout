import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function classifier(url: string | ImageData | undefined) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Identify the item in this image and mention only its name, do not describe it, just name it.",
          },
          {
            type: "image_url",
            image_url: {
              url: url as string,
              detail: "low",
            },
          },
        ],
      },
    ],
    max_tokens: 15,
  });
  if (response.choices[0].message.content) {
    return response.choices[0].message.content;
  } else {
    return "Could not classify image.";
  }
}
