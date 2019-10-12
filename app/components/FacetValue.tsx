import React, { ReactNode, FC } from 'react'
import { FacetItem, FacetValue } from '../types/facet'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { createFacetConnect } from '../redux/store';

interface FacetValueProps {
    children?: ReactNode
    data: FacetValue,
    key: string
    field: string
}

const FacetConnect = createFacetConnect({
    mapActions: actions => ({
        tick: actions.tickFacetValue,
        untick: actions.untickFacetValue
    })
})

const FacetValue: FC<FacetValueProps> = (props) => {
    const { key, field, data: { value, numberOfResults, checked, exclude } } = props
    const numFormat = new Intl.NumberFormat('en-IN');

    const toggleTick = (a: any) => {
        checked ? a.untick({ field, value }) : a.tick({ field, value })
    }

    return (
        <FacetConnect>
        {(_, actions) => (
        <li className='facet-value' key={key} data-value={value} data-count={numberOfResults} onClick={() => toggleTick(actions)}>
            { checked ? <MdCheckBox size={21} /> : <MdCheckBoxOutlineBlank size={21} /> }
            
            <span className="facet-value-label">{value}</span> <span className="facet-value-count">{numFormat.format(numberOfResults)}</span>
        </li>
        )}
        </FacetConnect>
    )
}

export default FacetValue