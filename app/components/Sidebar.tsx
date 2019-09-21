import React, { ReactNode, FC } from 'react'
import { createMenuConnect, createFacetConnect } from '../redux/store'
import FacetList from './FacetList'

interface SidebarProps {
    children?: ReactNode
    className?: string
}

const FacetConnect = createFacetConnect({
    mapActions: actions => ({
        tick: actions.tickFacetValue
    }),
    mapState: selectors => ({
        facets: selectors.getFacetList()
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

const Sidebar: FC<SidebarProps> = () => {

    return (
        <MenuConnect >
            {(_, actions) => (
            <nav className={`sidebar ${_.menuOpen ? 'open' : ''}`}>
            <FacetConnect>
            {(__, _actions) => (
                <FacetList list={__.facets} />
            )}
            </FacetConnect>
            </nav>
            )}
        </MenuConnect>
    )
}

export default Sidebar