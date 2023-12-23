import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";
import { Recipe } from "@/types/Recipe";
import { Tag } from "@/types/Tag";

export async function getRecipes(): Promise<Recipe[]> {
    return createClient(clientConfig).fetch(
        groq`*[_type == "recipe"]{
            _id,
            _createdAt,
            name,
            source,
            "author": author->name,
            "slug": slug.current,
            "image": image.asset->url,
            "tags": tags[]->name,
            time,
            servings,
            ingredients,
            instructions
        }`
    )
}

export async function getRecipe(slug: string): Promise<Recipe> {
    return createClient(clientConfig).fetch(
        groq`*[_type == "recipe" && slug.current == $slug][0]{
            _id,
            _createdAt,
            name,
            source,
            "author": author->name,
            "slug": slug.current,
            "image": image.asset->url,
            "tags": tags[]->name,
            time,
            servings,
            ingredients,
            instructions
        }`,
        { slug }
    )
}

export async function getTags(): Promise<Tag[]> {
    return createClient(clientConfig).fetch(
        groq`*[_type == "tag"]{
            _id,
            _createdAt,
            name,
            "slug": slug.current
        }`
    )
}

export async function getTag(slug: string): Promise<Tag> {
    return createClient(clientConfig).fetch(
        groq`*[_type == "tag" && slug.current == $slug][0]{
            _id,
            _createdAt,
            name,
        }`,
        { slug }
    )
}