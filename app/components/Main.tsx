import React, { ReactNode, FC, useEffect, useState } from 'react'
import { createSearchConnect } from '../redux/store'
import { SearchStatus } from '../types/search'
import CardList from './CardList'
import { MdSyncProblem, MdHourglassEmpty } from 'react-icons/md'
import { Bounce } from './spinners/Bounce'
import queryString from 'query-string'

const SearchConnect = createSearchConnect({
    mapActions: actions => ({
        startSearch: actions.startSearch,
        buildQueryFromURL: actions.buildQueryFromURL,
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

    triggerSearch(searchAction: Function, buildQueryFromURL: Function): null {
        buildQueryFromURL()
        searchAction()

        this.state.searchTriggered = true
        
        return null
    }

    render() {
        return (
            <SearchConnect>
                {(_, actions) => (
                <div className={`content ${(_.status === SearchStatus.searching ? 'loading' : '')}`}>
                    { !this.state.searchTriggered && this.triggerSearch(actions.startSearch, actions.buildQueryFromURL) }
                    { _.status === SearchStatus.searching && _.results.length < 1 && <Bounce />  }
                    { _.status !== SearchStatus.error && _.results.length > 0 && <CardList list={_.results} /> }
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
