import React, { ReactNode, FC } from 'react'

interface LoaderProps {
    children?: ReactNode
    className?: string
    loading: boolean
    error?: boolean 
}

const Loader: FC<LoaderProps> = () => {
    return (
        <h3>Loading...</h3>
    )
}

export default Loader