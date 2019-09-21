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
    queryParams: {
        aq: string
    }
    searchAction: Function
}

const SearchBox: FC<SearchBoxProps> = ({ searchAction, defaultQuery, queryParams, status }) => {
    const {q = ''} = queryString.parse(location.search)
    const [query, setQuery] = useState(`${q}`)

    return (
        <div className='search-box'>
            <input 
                type='text' 
                placeholder='Search...' 
                value={query} 
                onChange={e => {
                    setQuery(e.target.value)
                }}
                onKeyPress={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        searchAction({ ...{q: query }, ...queryParams })
                    }
                }}
            />

            <button className={`cancel ${'' === query ? 'hide' : ''}`} onClick={() => {
                setQuery('')
            }}><MdClose size={22} /></button>

            <Link 
                className='submit' 
                to={`/?${queryString.stringify({ q: query, aq: queryParams.aq })}`}
                onClick={
                    () => query !== '' && searchAction({ ...{q: query }, ...queryParams })
                    }>
                    { status === SearchStatus.searching && <MdSync className='spin' size={22} /> }
                    { (status === SearchStatus.complete || (status === SearchStatus.error && query === '')) && <FiSearch size={22} /> }
                    { (status === SearchStatus.error && query !== '') && <MdSyncProblem size={22} /> }
            </Link>
        </div>
    )
}

export default SearchBox