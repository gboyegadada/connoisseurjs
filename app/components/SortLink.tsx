import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

interface SortLinkProps {
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

const SortLink: FC<SortLinkProps> = ({ label, criteria, field, activeField, activeCriteria, sortAction }) => {
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

export default SortLink