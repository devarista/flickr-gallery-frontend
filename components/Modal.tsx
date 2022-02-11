import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import React, { Fragment, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { modalState } from '../recoil/atom/modal'
import { selectedImageState } from '../recoil/atom/selectedImage'

const Modal = () => {
    const cancelButtonRef = useRef(null)
    const [open, setOpen] = useRecoilState(modalState)
    const selectedImage = useRecoilValue<any>(selectedImageState)

    return (
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
                                <Image src={selectedImage?.media?.m} alt={selectedImage?.title} layout='responsive' objectFit='cover' height={1} width={1} quality={100} />
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
