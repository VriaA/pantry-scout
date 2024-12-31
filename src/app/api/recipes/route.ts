"use server";

import { NextResponse, NextRequest } from "next/server";
import openai from "@/libs/openai";
import getRecipiesPrompt from "./prompt";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const ingredientsParam = searchParams.get("ingredients");
  const ingredients = ingredientsParam ? ingredientsParam.split(",") : null;

  if (!ingredients || ingredients.length <= 0) {
    return NextResponse.json(
      { message: "No ingredients provided" },
      { status: 400 }
    );
  }

  const prompt = getRecipiesPrompt(ingredients);

  try {
    const response = await fetchWithRetry(
      () =>
        openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 2042,
          n: 1,
          stop: null,
          temperature: 0.7,
        }),
      3
    );

    const responseText = JSON.parse(response.choices[0].message.content);
    return NextResponse.json(responseText);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

async function fetchWithRetry(
  fetchFunction: () => Promise<any>,
  retries: number
): Promise<any> {
  try {
    return await fetchFunction();
  } catch (error) {
    if (retries === 1) throw error;
    return fetchWithRetry(fetchFunction, retries - 1);
  }
}
