export interface ImageData {
    next: Next
    results: Results
}

export interface Next {
    page: number
    limit: number
    itemsLength: number
}

export interface Results {
    title: string
    link: string
    description: string
    modified: Date
    generator: string
    items: Item[]
}

export interface Item {
    title: string
    link: string
    media: Media
    date_taken: Date
    description: string
    published: Date
    author: string
    author_id: string
    tags: string
}

export interface Media {
    m: string
}
