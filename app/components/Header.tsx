import React, { ReactNode, FC, useState } from 'react'
import { createSearchConnect, createMenuConnect } from '../redux/store'
import { SearchStatus } from '../types/search'
import { MdMenu } from 'react-icons/md'
import SearchBox from './SearchBox'


interface HeaderProps {
    children?: ReactNode
    className?: string
}

const SearchConnect = createSearchConnect({
    mapActions: actions => ({
        startSearch: actions.startSearch,
        updateSearchQuery: actions.updateSearchQuery,
    }),
    mapState: selectors => ({
        status: selectors.getStatus(),
        q: selectors.getSearchQuery(),
        aq: selectors.getAdvancedQuery(), 
        queryParams: selectors.getQueryParams() 
    })
})

const MenuConnect = createMenuConnect({
    mapActions: actions => ({
        toggleMenu: actions.toggleMenu
    }),
    mapState: menuOpenState => ({
        menuOpen: menuOpenState
    })
})

const Header: FC<HeaderProps> = () => {
    return (
        <SearchConnect>
            {(_, actions) => (
                <header>
                    <section className='l'>
                        <MenuConnect >
                        {(_m, menuActions) => (
                            <button className='menu-toggle' onClick={() => menuActions.toggleMenu()}>
                                <MdMenu size={24} />
                            </button>
                        )}
                        </MenuConnect>
                    </section>

                    <section className='r'>
                        <SearchBox searchAction={actions.startSearch} updateSearchQueryAction={actions.updateSearchQuery} status={_.status} defaultQuery={ {q: _.q, aq: _.aq} } queryParams={_.queryParams} />
                    </section>
                </header>
            )}
        </SearchConnect>
    )
}

export default Header