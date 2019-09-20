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
        status: selectors.getStatus()
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
                    <MenuConnect >
                    {(_m, menuActions) => (
                        <button className='menu-toggle' onClick={() => menuActions.toggleMenu()}>
                            <MdMenu size={24} />
                        </button>
                    )}
                    </MenuConnect>

                    <SearchBox onSubmit={actions.startSearch} status={_.status} />
                </header>
            )}
        </SearchConnect>
    )
}

export default Header