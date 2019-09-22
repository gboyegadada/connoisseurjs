import React, { FC } from 'react'
import { createSortConnect } from '../redux/store'
import SortLink from './SortLink'

const SortConnect = createSortConnect({
    mapState: selectors => ({
        sortField: selectors.getSortField(),
        sortCriteria: selectors.getSortCriteria(),
        q: selectors.getSearchQuery(),
        aq: selectors.getAdvancedQuery(), 
        queryParams: selectors.getQueryParams() 
    }),
    mapActions: actions => ({
        sort: actions.sort,
        sortCriteria: actions.sortCriteria
    })
})

const Sort: FC<any> = () => {
    return (
        <SortConnect>
            {(_, actions) => (
            <ul className='sort'>
                <SortLink 
                    label='Millesime' 
                    field='@tpmillesime' 
                    criteria='ascending'
                    activeField={_.sortField}
                    activeCriteria={_.sortCriteria}
                    queryParams={_.queryParams} 
                    sortAction={actions.sort} />
                <SortLink 
                    label='Prix' 
                    field='@tpprixnum' 
                    criteria='ascending'
                    activeField={_.sortField}
                    activeCriteria={_.sortCriteria}
                    queryParams={_.queryParams} 
                    sortAction={actions.sort} />
                <SortLink 
                    label='Relevancy' 
                    criteria='relevancy'
                    activeField={_.sortField}
                    activeCriteria={_.sortCriteria}
                    queryParams={_.queryParams} 
                    sortAction={actions.sort} />
            </ul>
            )}
        </SortConnect>
    )
}

export default Sort