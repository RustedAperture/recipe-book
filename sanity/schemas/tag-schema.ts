const tag = {
    name: 'tag',
    title: 'Tags',
    type: "document",
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name' }
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string'
        },
    ]
}

export default tag;