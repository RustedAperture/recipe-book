const author = {
    name: 'author',
    title: 'Authors',
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
        }
    ]
}

export default author;