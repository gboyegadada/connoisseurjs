import React, { ReactNode, FC, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdClose, MdRefresh, MdSync, MdSyncProblem } from 'react-icons/md'
import { SearchStatus } from '../types/search'

interface SearchBoxProps {
    children?: ReactNode
    className?: string
    status: number
    onSubmit: Function
}

const SearchBox: FC<SearchBoxProps> = ({ onSubmit, status }) => {
    const [query, setQuery] = useState('')

    return (
        <div className='search-box'>
            <input type='text' placeholder='Search...' value={query} onChange={e => {
                setQuery(e.target.value)
            }}/>
            <button className='cancel' onClick={() => {
                setQuery('')
            }}><MdClose size={22} /></button>
            <button className='submit' onClick={(e) => {
                if (status === SearchStatus.searching) return 
                
                onSubmit({
                    query: query,
                    advancedQuery: ''
                })
            }}>
                { status === SearchStatus.searching && <MdSync className='spin' size={22} /> }
                { status === SearchStatus.complete && <FiSearch size={22} /> }
                { status === SearchStatus.error && <MdSyncProblem size={22} /> }
            </button>
        </div>
    )
}

export default SearchBox