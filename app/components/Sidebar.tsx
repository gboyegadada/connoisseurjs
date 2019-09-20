import React, { ReactNode, FC } from 'react'
import { createMenuConnect } from '../redux/store'

interface SidebarProps {
    children?: ReactNode
    className?: string
}

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
            <h5>Step</h5>
        </nav>
        )}
        </MenuConnect>
    )
}

export default Sidebar