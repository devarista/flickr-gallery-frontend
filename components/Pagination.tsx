import React from 'react'
import { useRecoilState } from 'recoil'
import { paginationState } from '../recoil/atom/pagination'
import { ImageData, Meta } from '../types/imageDataInterface'

const Pagination = ({ meta }: ImageData) => {
    const [page, setPage] = useRecoilState(paginationState)
    return (
        <div className='w-full flex space-x-4 items-center justify-center'>
            <button
                disabled={meta.previous === null && true}
                className='rounded px-4 py-2 disabled:bg-slate-400 disabled:text-slate-500 disabled:cursor-not-allowed hover:bg-indigo-600 bg-indigo-500 text-slate-200'
                onClick={() => {
                    setPage(meta.previous!)
                }}
            >
                Previous
            </button>
            <button
                disabled={meta.next === null && true}
                className='rounded px-4 py-2 disabled:bg-slate-400 disabled:text-slate-500 disabled:cursor-not-allowed hover:bg-indigo-600 bg-indigo-500 text-slate-200'
                onClick={() => {
                    setPage(meta.next!)
                }}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination
