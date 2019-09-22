import React, { ReactNode, FC, useState } from 'react'
import { createSortConnect } from '../redux/store'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

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

interface CriterionProps {
    label: string
    field?: string
    criteria?: string
    activeField: string
    activeCriteria: string
    queryParams: {
        q: string
        aq: string
    }
    sortAction: Function
}

const Criterion: FC<CriterionProps> = ({ label, criteria, field, activeField, activeCriteria, sortAction }) => {
    // Grab @field and @order from current query string if any...
    const q = queryString.parse(location.search)
    let {order = 'ascending'} = q

    if (!field) {
        order = criteria
    }
    else if (order !== 'ascending' && order !== 'descending') {
        order = 'ascending'
    } 

    // Inititial state: ascending || descending || relevancy
    const [_order, setOrder] = useState(order)

    // Setup query params for this button
    // Something like this: "&sort=@field%20ascending"
    const s = {
        sort: field ? field : '',
        order: toggleOrder(_order)
    }

    // Determine if button is active
    const active = (field && field === activeField) || (!field && criteria && criteria === activeCriteria) 

    function toggleOrder(o: any) {
        switch (o) {
            case 'ascending':
                return 'descending'
                break
            case 'descending':
                return 'ascending'
                break
            default:
                return o
                break
        }
    }

    function handleClick() {

        // Toggle sort order
        const o = toggleOrder(_order)
        setOrder(o)

        // Dispatch sort action
        let payload: {field?: string, criteria?: string } = {}
        
        if (field) {
            payload.field = field
            payload.criteria = `field${o}`
        } else {
            payload.criteria = o
        }

        sortAction(payload)
    }

    return (
        <li>            
        <Link 
            className={active ? 'active' : ''} 
            to={`/?${queryString.stringify({ ...q, ...s })}`}
            onClick={handleClick}>
                {label} 
                {active && _order === 'ascending' && <MdExpandMore size='1.3em' />}
                {active && _order === 'descending' && <MdExpandLess size='1.3em' />}
        </Link>
        </li>
    )
}

const Sort: FC<any> = () => {
    return (
        <SortConnect>
            {(_, actions) => (
            <ul className='sort'>
                <Criterion 
                    label='Millesime' 
                    field='@tpmillesime' 
                    criteria='ascending'
                    activeField={_.sortField}
                    activeCriteria={_.sortCriteria}
                    queryParams={_.queryParams} 
                    sortAction={actions.sort} />
                <Criterion 
                    label='Prix' 
                    field='@tpprixnum' 
                    criteria='ascending'
                    activeField={_.sortField}
                    activeCriteria={_.sortCriteria}
                    queryParams={_.queryParams} 
                    sortAction={actions.sort} />
                <Criterion 
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