const recipe = {
    name: 'recipe',
    title: 'Recipes',
    type: "document",
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Recipe name and title that will display on the website.'
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{type: 'author'}]
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name' }
        },
        {
            name: 'source',
            title: 'Source',
            type: 'url',
            description: 'Where the recipe was originaly adapted from.'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            description: 'This will be the cover image and displayed at the top of the recipe.',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    title: 'Alt',
                    type: 'string'
                }
            ]
        },
        {
            name: 'time',
            title: 'Time',
            type: 'string',
            description: 'Time to complete recipe.'
        },
        {
            name: 'servings',
            title: 'Servings',
            type: 'string',
            description: 'How many serving does this make.'
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            description: 'One word descriptors that can be used to organize recipes.',
            of: [{
                type: 'reference',
                to: [{type: 'tag'}]
            }]
        },
        {
            name: 'ingredients',
            title: 'Ingredients',
            type: 'array',
            description: 'Ingedients and their respective measurements.',
            of: [{type: 'string'}]
        },
        {
            name: 'instructions',
            title: 'Instructions',
            type: 'array',
            description: 'Steps to follow for the recipe.',
            of: [{type: 'string'}]
        }
    ]
}

export default recipe;