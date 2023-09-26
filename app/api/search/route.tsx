import { getRecipes } from "@/sanity/sanity-utils";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const recipes = await getRecipes();
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')

    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(query.toLowerCase()) || recipe.tags.includes(query)
    })

    return NextResponse.json(filteredRecipes);
}