import React, { ReactNode, FC, useEffect, useState } from 'react'
import { createSearchConnect } from '../redux/store'
import { SearchStatus } from '../types/search'
import CardList from './CardList'
import { MdSyncProblem, MdHourglassEmpty } from 'react-icons/md'
import { Bounce } from './spinners/Bounce'
import queryString from 'query-string'

interface MainProps {
    children?: ReactNode
    className?: string
    location?: any
}

const SearchConnect = createSearchConnect({
    mapActions: actions => ({
        startSearch: actions.startSearch
    }),
    mapState: selectors => ({
        status: selectors.getStatus(),
        results: selectors.getSearchResults(),
        queryId: selectors.getQueryId(),
        queryParams: selectors.getQueryParams()
    })
})

export default class Main extends React.Component {
    state = { searchTriggered: false }

    triggerSearch(searchAction: Function, queryParams: any): null {
        const {q = '', aq = ''} = queryString.parse(location.search)
        searchAction({ ...{ query: q }, ...queryParams })

        this.state.searchTriggered = true
        
        return null
    }

    render() {
        return (
            <SearchConnect>
                {(_, actions) => (
                <div className='content'>
                    { !this.state.searchTriggered && this.triggerSearch(actions.startSearch, _.queryParams) }
                    { _.status === SearchStatus.searching && <Bounce />  }
                    { _.status === SearchStatus.complete && <CardList list={_.results} /> }
                    { _.status === SearchStatus.error && (
                        <div className='flex-start'>
                            <h3 className='error'>
                                <MdSyncProblem size={18} /> There was an error loading your search results.
                            </h3>
                        </div>
                    ) }
                </div>
            )}
            </SearchConnect>
        )
    }
}
