import Image from 'next/image'
import React from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../recoil/atom/modal'
import { selectedImageState } from '../recoil/atom/selectedImage'
import { ImageData, Item } from '../types/imageDataInterface'

const ImageLists = ({ meta, results }: ImageData) => {
    const [open, setOpen] = useRecoilState(modalState)
    const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState)

    return (
        <div>
            {meta.itemsLength === 0 && (
                <div className='w-full h-full flex items-center justify-center' role='emptyImageList'>
                    <p className='text-4xl font-bold text-red-600'>Image not Found</p>
                </div>
            )}
            {meta.itemsLength > 0 && (
                <div className='w-full grid grid-cols-3 gap-4' role='imageList'>
                    {results.items.map((item: Item, index: number) => (
                        <div
                            role={item.title}
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
                </div>
            )}
        </div>
    )
}

export default ImageLists
