import React, { ReactNode, FC } from 'react'
import { createSearchConnect } from '../redux/store'

interface MainProps {
    children?: ReactNode
    className?: string
}

const SearchConnect = createSearchConnect({
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
            <pre>
                {JSON.stringify(_.results, null, 2)}
            </pre>
            </div>
        )}
        </SearchConnect>
    )
}

export default Main