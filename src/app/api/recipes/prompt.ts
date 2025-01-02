export default function getRecipesPrompt(ingredients: string[]) {
  return `Based on the following ingredients in my pantry: ${ingredients.join(
    ", "
  )}, 
  generate recipes, return an array of a maximum of 10 objects containing the name, duration, description, ingredients and the steps to take to complete the recipe. The only text that should be returned is the text in the array of recipes. for example [    {
        "name": "Egg and Cheese Breakfast Sandwich",
        "duration": "15 minutes",
        "description": "A quick breakfast sandwich with egg, cheese, and crispy bacon.",
        "ingredients": [
            "egg",
            "cheese",
            "bread",
            "bacon",
            "butter"
        ],
        "steps": [
            "Cook bacon in a skillet until crispy, then set aside.",
            "In the same skillet, melt a little butter and crack the egg.",
            "Cook until the egg is set, then add cheese on top to melt.",
            "Toast the bread in the skillet until golden.",
            "Assemble the sandwich by placing the egg and cheese on one slice of bread, topping with bacon and another slice of bread."
        ]
    },
    {
        "name": "Fish with Olive and Parsley Sauce",
        "duration": "25 minutes",
        "description": "A light fish dish topped with a flavorful olive and parsley sauce.",
        "ingredients": [
            "fish",
            "olives",
            "parsley",
            "butter",
            "chives"
        ],
        "steps": [
            "Season the fish with salt and pepper, then cook in a skillet with butter until done.",
            "Chop olives and parsley, mixing them in a bowl.",
            "Add a little olive oil and finely chopped chives to the olive mixture.",
            "Once the fish is cooked, top it with the olive and parsley sauce and serve."
        ]
    }]`;
}
