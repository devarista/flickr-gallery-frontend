import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import axios from 'axios'
import { ImageData, Item } from '../types/imageDataInterface'
import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'

const Home = (props: { images: ImageData }) => {
    const cancelButtonRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [imageData, setImageData] = useState(props.images)
    const [tags, setTags] = useState<string>('')
    const [page, setPage] = useState(1)
    const [selectedImage, setSelectedImage] = useState<Item | null>(null)

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
    }, [debouncedSearch])

    return (
        <div className='bg-slate-200 overflow-hidden'>
            <Head>
                <title>isFlickr Gallery?</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='container mx-auto min-h-screen max-h-screen px-72 py-6 flex flex-col space-y-5'>
                <div className='text-6xl font-bold text-indigo-800'>
                    <span className='text-4xl font-normal'>is</span>
                    <span>Flickr</span> <span className='font-normal italic'>Gallery?</span>
                </div>
                <div className='container mx-auto w-full flex items-center'>
                    <div className='mt-1 flex rounded-md shadow-sm w-full'>
                        <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>Search by Tags</span>
                        <input
                            type='search'
                            onChange={(e) => {
                                setTags(e.target.value)
                            }}
                            name='search'
                            id='search'
                            className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                            placeholder='cat'
                        />
                    </div>
                </div>
                <div>
                    <p className='font-semibold text-xl text-slate-700'>{imageData.results.title}</p>
                    <div className='flex justify-between text-slate-500 font-semibold'>
                        <p>Found {imageData.meta.itemsLength} images</p>
                        Page {imageData.meta.page} of {imageData.meta.totalPage}
                    </div>
                </div>
                {imageData.meta.itemsLength === 0 && (
                    <div className='w-full h-full flex items-center justify-center'>
                        <p className='text-4xl font-bold text-red-600'>Image not Found</p>
                    </div>
                )}
                {imageData.meta.itemsLength > 0 && (
                    <main className='w-full grid grid-cols-3 gap-4'>
                        {imageData.results.items.map((item: Item, index: number) => (
                            <div
                                onClick={() => {
                                    setSelectedImage(item)
                                    setOpen(true)
                                }}
                                key={index}
                                className='relative group rounded-lg'
                            >
                                <Image
                                    className='group-hover:scale-105 rounded-lg transform shadow duration-500 transition ease-in-out'
                                    src={item.media.m}
                                    alt={item.title}
                                    layout='responsive'
                                    width={1}
                                    height={1}
                                    objectFit='cover'
                                    priority
                                    quality={100}
                                />
                                <div className='hidden group-hover:flex justify-end flex-col duration-500 transition ease-in-out rounded-lg w-full absolute bottom-0 p-4 font-bold text-slate-100 text-lg bg-gradient-to-t from-black/50 to-transparent'>
                                    <div className='truncate'>{item.title}</div>
                                    <span>by {item.author.split(' ')[1].replaceAll(/[^a-zA-Z0-9]*/g, '')}</span>
                                </div>
                            </div>
                        ))}
                    </main>
                )}
                <div className='w-full flex space-x-4 items-center justify-center'>
                    <button
                        disabled={imageData.meta.previous === null && true}
                        className='rounded px-4 py-2 disabled:bg-slate-400 disabled:text-slate-500 disabled:cursor-not-allowed hover:bg-indigo-600 bg-indigo-500 text-slate-200'
                        onClick={() => {
                            setPage(imageData.meta.previous!)
                        }}
                    >
                        Previous
                    </button>
                    <button
                        disabled={imageData.meta.next === null && true}
                        className='rounded px-4 py-2 disabled:bg-slate-400 disabled:text-slate-500 disabled:cursor-not-allowed hover:bg-indigo-600 bg-indigo-500 text-slate-200'
                        onClick={() => {
                            setPage(imageData.meta.next!)
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Modal */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' initialFocus={cancelButtonRef} onClose={setOpen}>
                    <div className='flex items-end justify-center min-h-screen px-4 py-4 text-center sm:block sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <div className='inline-block align-bottom bg-white max-w-4xl rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full'>
                                <div className='bg-white p-4 '>
                                    <Image src={selectedImage?.media.m!} alt={selectedImage?.title} layout='responsive' objectFit='cover' height={1} width={1} quality={100} />
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
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
