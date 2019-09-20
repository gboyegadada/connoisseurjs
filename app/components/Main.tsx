import React, { ReactNode, FC } from 'react'
import { createSearchConnect } from '../redux/store'
import { SearchStatus } from '../types/search'
import CardList from './CardList'
import Loader from './Loader'

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
                {_.status === SearchStatus.complete 
                    ? <CardList list={_.results} />
                    : <Loader loading={true} /> 
                }
            </div>
        )}
        </SearchConnect>
    )
}

export default Main