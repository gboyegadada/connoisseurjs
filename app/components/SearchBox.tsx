import React, { ReactNode, FC, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdClose, MdSync, MdSyncProblem } from 'react-icons/md'
import { SearchStatus } from '../types/search'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import queryString from 'query-string'

interface SearchBoxProps extends RouteComponentProps<any> {
    children?: ReactNode
    className?: string
    status: number
    defaultQuery: {
        q: string
        aq?: string
    }
    queryParams: {
        q: string
        aq: string
    }
    searchAction: Function
    updateSearchQueryAction: Function
}


const SearchBox: FC<SearchBoxProps> = ({ searchAction, updateSearchQueryAction, history, queryParams, status }) => {
    const {q = '', ...qp} = queryString.parse(location.search)

    return (
        <div className='search-box'>
            <input 
                type='text' 
                placeholder='Search...' 
                value={queryParams.q} 
                onChange={e => {
                    updateSearchQueryAction({ ...queryParams, q: e.target.value })
                }}
                onKeyPress={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        history.push(`/?${queryString.stringify({ ...qp, q: queryParams.q })}`)
                        searchAction()
                    }
                }}
            />

            <button className={`cancel ${'' === queryParams.q ? 'hide' : ''}`} onClick={() => {
                updateSearchQueryAction({ ...queryParams, q: '' })
            }}><MdClose size={22} /></button>

            <Link 
                className='submit' 
                to={`/?${queryString.stringify({ ...qp, q: queryParams.q })}`}
                onClick={
                    () => queryParams.q !== '' && searchAction()
                    }>
                    { status === SearchStatus.searching && <MdSync className='spin' size={22} /> }
                    { (status === SearchStatus.complete || (status === SearchStatus.error && queryParams.q === '')) && <FiSearch size={22} /> }
                    { (status === SearchStatus.error && queryParams.q !== '') && <MdSyncProblem size={22} /> }
            </Link>
        </div>
    )
}

export default withRouter(SearchBox)