import React, { ReactNode, FC } from 'react'
import { FacetItem } from '../types/facet'

interface FacetProps {
    children?: ReactNode
    data: FacetItem,
    key: string
}

const Facet: FC<FacetProps> = (props) => {
    const { field } = props.data
    const numFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD' });

    return (
        <li className='facet' key={field} data-field={field}>
            <h5>&nbsp;</h5>
        </li>
    )
}

export default Facet