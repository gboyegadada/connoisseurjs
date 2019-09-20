import React, { ReactNode, FC } from 'react'
import { createSearchConnect } from '../redux/store'
import { SearchStatus } from '../types/search'
import CardList from './CardList'
import { MdSyncProblem } from 'react-icons/md'
import { Bounce } from './spinners/Bounce'

interface MainProps {
    children?: ReactNode
    className?: string
}

const SearchConnect = createSearchConnect({
    mapActions: actions => ({
        startSearch: actions.startSearch
    }),
    mapState: selectors => ({
        status: selectors.getStatus(),
        results: selectors.getSearchResults()
    })
})

const Main: FC<MainProps> = () => {

    return (
        <SearchConnect>
            {(_) => (
            <div className='content'>
                { _.status === SearchStatus.searching && <Bounce />  }
                { _.status === SearchStatus.complete && <CardList list={_.results} /> }
                { _.status === SearchStatus.error && (
                    <div className='flex-center'>
                        <h3>
                            <MdSyncProblem size={18} /> There was an error loading your search results.
                        </h3>
                    </div>
                 ) }
            </div>
        )}
        </SearchConnect>
    )
}

export default Main