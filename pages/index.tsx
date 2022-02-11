import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import axios from 'axios'
import { ImageData } from '../types/imageDataInterface'
import { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import SearchInput from '../components/SearchInput'
import { useRecoilState, useRecoilValue } from 'recoil'
import { tagsState } from '../recoil/atom/tags'
import ImageLists from '../components/ImageLists'
import Modal from '../components/Modal'
import Pagination from '../components/Pagination'
import { paginationState } from '../recoil/atom/pagination'

const Home = (props: { images: ImageData }) => {
    const [imageData, setImageData] = useState(props.images)
    const tags = useRecoilValue(tagsState)
    const [page, setPage] = useRecoilState(paginationState)

    const debouncedSearch = useDebounce(tags, 500)

    useEffect(() => {
        const getImagesWithTags = async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/image?tags=${debouncedSearch}&page=${page}`)
            return setImageData(data)
        }

        getImagesWithTags()
    }, [debouncedSearch, page])

    useEffect(() => {
        setPage(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch])

    return (
        <div className='bg-slate-200 overflow-hidden'>
            <Head>
                <title>isFlickr Gallery?</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='container mx-auto min-h-screen max-h-screen px-72 py-6 flex flex-col space-y-5'>
                {/* Title */}
                <h1 className='text-6xl font-bold text-indigo-800'>
                    <span className='text-4xl font-normal'>is</span>
                    <span>Flickr</span> <span className='font-normal italic'>Gallery?</span>
                </h1>

                {/* Search Input */}
                <SearchInput />

                {/* Information */}
                <div>
                    <p className='font-semibold text-xl text-slate-700'>{imageData.results.title}</p>
                    <div className='flex justify-between text-slate-500 font-semibold'>
                        <p>Found {imageData.meta.itemsLength} images</p>
                        Page {imageData.meta.page} of {imageData.meta.totalPage}
                    </div>
                </div>

                {/* ?Images */}
                <ImageLists meta={imageData.meta} results={imageData.results} />

                <Pagination meta={imageData.meta} results={imageData.results} />
            </div>
            {/* Modal */}
            <Modal />
        </div>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await axios.get<ImageData>(`${process.env.NEXT_PUBLIC_SERVER_URL}/image`)
    return {
        props: {
            images: data,
        },
    }
}
