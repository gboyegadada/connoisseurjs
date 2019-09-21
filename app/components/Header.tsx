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
        startSearch: actions.startSearch
    }),
    mapState: selectors => ({
        status: selectors.getStatus(),
        query: selectors.getSearchQuery(),
        advancedQuery: selectors.getAdvancedQuery()
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
                        <SearchBox searchAction={actions.startSearch} status={_.status} defaultQuery={ {q: _.query, aq: _.advancedQuery} } />
                    </section>
                </header>
            )}
        </SearchConnect>
    )
}

export default Header