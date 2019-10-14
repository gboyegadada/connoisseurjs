import React, { ReactNode, FC } from 'react'
import { FacetValue as FacetValueType } from '../types/facet'
import { MdCheckBox, MdCheckBoxOutlineBlank, MdNotInterested, MdIndeterminateCheckBox } from 'react-icons/md';
import { createFacetConnect } from '../redux/store';
import qs from 'qs'
import { RouteComponentProps, withRouter } from 'react-router';

interface FacetValueProps extends RouteComponentProps<any> {
    children?: ReactNode
    data: FacetValueType
    fkey: string
    field: string
}

const FacetConnect = createFacetConnect({
    mapActions: actions => ({
        tick: actions.tickFacetValue,
        untick: actions.untickFacetValue,
        include: actions.includeFacetValue,
        exclude: actions.excludeFacetValue
    }),
    mapState: selectors => ({
        queryParams: selectors.getQueryParams(),
        aqUrlEncoded: selectors.getAdvancedQueryString(),
    })
})

export const FacetValue: FC<FacetValueProps> = ({ fkey, field, history, data: { value, numberOfResults, checked, exclude }}) => {
    const qp = qs.parse(location.search.substring(1))
    const numFormat = new Intl.NumberFormat('en-IN');

    const toggleTick = (a: any, s: any) => {
        checked ? a.untick({ field, value, history }) : a.tick({ field, value, history })
    }

    const toggleExclude = (a: any, s: any) => {
        exclude ? a.include({ field, value, history }) : a.exclude({ field, value, history })
    }

    return (
        <FacetConnect>
        {(_, actions) => (
        <li className='facet-value' key={fkey} data-value={value} data-count={numberOfResults}>
            { checked && !exclude && <MdCheckBox size={21} onClick={() => toggleTick(actions, _)} /> }
            { checked && exclude && <MdIndeterminateCheckBox size={21} onClick={() => toggleTick(actions, _)} /> }
            { !checked && <MdCheckBoxOutlineBlank size={21} onClick={() => toggleTick(actions, _)} /> }
            
            <span className={`facet-value-label ${exclude ? 'exclude' : ''}`} onClick={() => toggleTick(actions, _)}>{value}</span> <span className="facet-value-count">{numFormat.format(numberOfResults)}</span>
            <MdNotInterested className={`facet-value-exclude ${exclude ? 'active' : ''}`} size={12}  onClick={() => toggleExclude(actions, _)}/>
        </li>
        )}
        </FacetConnect>
    )
}

export default withRouter(FacetValue)