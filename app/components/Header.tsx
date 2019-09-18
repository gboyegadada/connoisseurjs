import React, { ReactNode, FC } from 'react'
import { createSearchConnect } from '../redux/store'
import { SearchStatus } from '../types/search'


interface HeaderProps {
    children?: ReactNode
    className?: string
}

const SearchConnect = createSearchConnect({
    mapActions: actions => ({
        startSearch: actions.startSearch
    }),
    mapState: selectors => ({
        status: selectors.getStatus()
    })
})

const Header: FC<HeaderProps> = () => {
    return (
        <SearchConnect>
            {(_, actions) => (
                <header>
                    <input type='text' onChange={(e) => {
                        actions.startSearch({
                            query: e.target.value,
                            advancedQuery: ''
                        })
                    }} />

                    {_.status === SearchStatus.searching 
                        ? <span>Searching...</span>
                        : null 
                    }
                </header>
            )}
        </SearchConnect>
    )
}

export default Header