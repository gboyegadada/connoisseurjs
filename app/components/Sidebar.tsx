import React, { ReactNode, FC } from 'react'

interface SidebarProps {
    children?: ReactNode
    className?: string
}

const Sidebar: FC<SidebarProps> = () => {

    return (
        <nav className='sidebar'>
            <h5>Step</h5>
        </nav>
    )
}

export default Sidebar