import { PortableTextBlock } from "sanity";

export type Recipe = {
    _id: string;
    _createdAt: string;
    name: string;
    author: string;
    time: string;
    slug: string;
    source: string;
    image: string;
    tags: Array<string>;
    ingredients: Array<string>;
    instructions: Array<string>;
    content: PortableTextBlock[];
}