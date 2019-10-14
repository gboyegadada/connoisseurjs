import React, { ReactNode, FC } from 'react'
import { FacetItem } from '../types/facet'
import FacetValue from './FacetValue';

interface FacetProps {
    children?: ReactNode
    data: FacetItem,
    key: string
}

const Facet: FC<FacetProps> = (props) => {
    const { field, title, values } = props.data
    const numFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD' });

    return ( 
        <>
        {(values.length > 0) &&
        <li className='facet' key={field} data-field={field}>
            <h5 className="facet-heading">{title}</h5>
            <ul className="facet-values">
                {values.map(v => {
                    const k = v.value.toLowerCase().replace(' ', '-')
                    return <FacetValue field={field} data={v} fkey={k} key={k}/>
                })}
            </ul>
        </li>
        }
        </>
    )
}

export default Facet