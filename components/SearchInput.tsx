import React from 'react'
import { useRecoilState } from 'recoil'
import { tagsState } from '../recoil/atom/tags'

const SearchInput = () => {
    const [tags, setTags] = useRecoilState(tagsState)
    return (
        <div className='container mx-auto w-full flex items-center'>
            <div className='mt-1 flex rounded-md shadow-sm w-full'>
                <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>Search by Tags</span>
                <input
                    role='search'
                    type='search'
                    onChange={(e) => {
                        setTags(e.target.value)
                    }}
                    name='search'
                    value={tags}
                    id='search'
                    className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
                    placeholder='cat'
                />
            </div>
        </div>
    )
}

export default SearchInput
