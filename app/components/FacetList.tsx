import React, { ReactNode, FC } from 'react'
import Facet from './Facet'
import { FacetItem, FacetList } from '../types/facet'

interface FacetListProps {
    children?: ReactNode
    list: FacetList
}

const FacetList: FC<FacetListProps> = (props) => {
    const { list } = props

    return (
        <ul className='grid facet-list'>
            { Object.keys(list).map(id => <Facet key={list[id].field} data={list[id]} />) }
        </ul>
    )
}

export default FacetList