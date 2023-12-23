import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";
import { visionTool } from "@sanity/vision";

const config = defineConfig({
    projectId: "fkw9bqvm",
    dataset: "production",
    title: "Recipe App",
    apiVersion: "2023-09-25",
    basePath: "/admin",
    plugins: [deskTool(), visionTool()],
    schema: { types: schemas },
    useCdn: true
})

export default config;