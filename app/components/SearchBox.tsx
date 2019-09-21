import React, { ReactNode, FC, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdClose, MdRefresh, MdSync, MdSyncProblem } from 'react-icons/md'
import { SearchStatus } from '../types/search'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

interface SearchBoxProps {
    children?: ReactNode
    className?: string
    status: number
    defaultQuery: {
        q: string
        aq?: string
    }
    searchAction: Function
}

const SearchBox: FC<SearchBoxProps> = ({ searchAction, defaultQuery, status }) => {
    const {q = ''} = queryString.parse(location.search)
    const [query, setQuery] = useState(`${q}`)

    return (
        <div className='search-box'>
            <input type='text' placeholder='Search...' value={query} onChange={e => {
                setQuery(e.target.value)
            }}/>
            <button className={`cancel ${'' === query ? 'hide' : ''}`} onClick={() => {
                setQuery('')
            }}><MdClose size={22} /></button>
            <Link 
                className='submit' 
                to={`/?${queryString.stringify({ q: query, aq: defaultQuery.aq })}`}
                onClick={() => query !== '' && searchAction({ query, advancedQuery: defaultQuery.aq })}>
                    { status === SearchStatus.searching && <MdSync className='spin' size={22} /> }
                    { (status === SearchStatus.complete || (status === SearchStatus.error && query === '')) && <FiSearch size={22} /> }
                    { (status === SearchStatus.error && query !== '') && <MdSyncProblem size={22} /> }
            </Link>
        </div>
    )
}

export default SearchBox