export interface ImageData {
    meta: Meta
    results: Results
}

export interface Meta {
    page: number
    limit: number
    totalPage: number
    next: number | null
    previous: number | null
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
