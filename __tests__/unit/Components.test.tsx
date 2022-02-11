import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil'
import ImageLists from '../../components/ImageLists'
import Modal from '../../components/Modal'
import Pagination from '../../components/Pagination'

import SearchInput from '../../components/SearchInput'
import { ImageData } from '../../types/imageDataInterface'

const imageData: ImageData = {
    meta: {
        page: 4,
        totalPage: 10,
        previous: 3,
        next: 5,
        limit: 2,
        itemsLength: 20,
    },
    results: {
        title: 'Uploads from everyone',
        link: 'https://www.flickr.com/photos/',
        description: '',
        modified: '2022-02-10T14:57:38Z',
        generator: 'https://www.flickr.com',
        items: [
            {
                title: 'Siskin',
                link: 'https://www.flickr.com/photos/145221994@N05/51873594433/',
                media: {
                    m: 'https://live.staticflickr.com/65535/51873594433_956e4f4a08_m.jpg',
                },
                date_taken: '2022-02-09T19:36:36-08:00',
                description:
                    ' <p><a href="https://www.flickr.com/people/145221994@N05/">rogercollorick</a> posted a photo:</p> <p><a href="https://www.flickr.com/photos/145221994@N05/51873594433/" title="Siskin"><img src="https://live.staticflickr.com/65535/51873594433_956e4f4a08_m.jpg" width="240" height="145" alt="Siskin" /></a></p> ',
                published: '2022-02-10T14:58:17Z',
                author: 'nobody@flickr.com ("rogercollorick")',
                author_id: '145221994@N05',
                tags: '',
            },
            {
                title: 'Cedar Waxwing (Bombycilla cedrorum)',
                link: 'https://www.flickr.com/photos/byjcb/51873594683/',
                media: {
                    m: 'https://live.staticflickr.com/65535/51873594683_171f8b32a9_m.jpg',
                },
                date_taken: '2022-01-18T10:16:05-08:00',
                description:
                    ' <p><a href="https://www.flickr.com/people/byjcb/">byjcb</a> posted a photo:</p> <p><a href="https://www.flickr.com/photos/byjcb/51873594683/" title="Cedar Waxwing (Bombycilla cedrorum)"><img src="https://live.staticflickr.com/65535/51873594683_171f8b32a9_m.jpg" width="160" height="240" alt="Cedar Waxwing (Bombycilla cedrorum)" /></a></p> <p>- Rancho San Rafael, WAS (NV)</p>',
                published: '2022-02-10T14:58:31Z',
                author: 'nobody@flickr.com ("byjcb")',
                author_id: '34238008@N02',
                tags: 'waxwing birds',
            },
        ],
    },
}

const emptyImageData: ImageData = {
    meta: {
        page: 0,
        totalPage: 0,
        previous: null,
        next: null,
        limit: 6,
        itemsLength: 0,
    },
    results: {
        title: 'Recent Uploads tagged asjfkashjdjasfd',
        link: 'https://www.flickr.com/photos/tags/asjfkashjdjasfd/',
        description: '',
        modified: '1970-01-01T00:00:00Z',
        generator: 'https://www.flickr.com',
        items: [],
    },
}

describe('Unit Test to All Components', () => {
    it('renders a search input', () => {
        render(
            <RecoilRoot>
                <SearchInput />
            </RecoilRoot>
        )
        const search = screen.getByRole('search')

        expect(search).toBeInTheDocument()
    })

    it('renders a image list with the imageData object', () => {
        render(
            <RecoilRoot>
                <ImageLists meta={imageData.meta} results={imageData.results} />
            </RecoilRoot>
        )
        const imageList = screen.getByRole('imageList')

        expect(imageList).toBeInTheDocument()
    })

    it('renders a image list with emptyImageData object', () => {
        render(
            <RecoilRoot>
                <ImageLists meta={emptyImageData.meta} results={emptyImageData.results} />
            </RecoilRoot>
        )

        const emptyImageList = screen.getByRole('emptyImageList')

        expect(emptyImageList).toBeInTheDocument()
    })

    it('renders a modal with selected image', () => {
        render(
            <RecoilRoot>
                <Modal />
            </RecoilRoot>
        )

        const modal = screen.getByRole('modal')

        expect(modal).toBeVisible()
    })

    it('renders a pagination controls', () => {
        render(
            <RecoilRoot>
                <Pagination meta={imageData.meta} results={imageData.results} />
            </RecoilRoot>
        )

        const pagination = screen.getByRole('pagination')

        expect(pagination).toBeInTheDocument()
    })
})
