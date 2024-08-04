import { NextResponse, NextRequest } from "next/server";
import openai from "@/libs/openai";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const ingredientsParam = searchParams.get("ingredients");
  const ingredients = ingredientsParam ? ingredientsParam.split(",") : null;

  if (!ingredients || ingredients.length === 0) {
    return NextResponse.json(
      { message: "No ingredients provided" },
      { status: 400 }
    );
  }

  const prompt = `Based on the following ingredients in my pantry: ${ingredients.join(
    ", "
  )}, 
  generate recipes, return an array of a maximum of 5 objects containing the name, duration, description, ingredients and the steps to take to complete the recipe. The only text that should be returned is the text in the array of recipes.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
      max_tokens: 2042,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const responseText = response.choices[0].message.content;
    const jsonEnd = (responseText as string).lastIndexOf("}") + 3;
    const jsonStart = (responseText as string).indexOf("[");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("JSON block not found in response");
    }

    const jsonResponse = JSON.parse(
      responseText?.substring(jsonStart, jsonEnd) as string
    );

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error("Error fetching recipes:", error.message);
    return NextResponse.json(
      { message: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}
