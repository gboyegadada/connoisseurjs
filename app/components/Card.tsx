import React, { ReactNode, FC } from 'react'
import { ResultItem } from '../types/search'
import { MdLocationCity, MdLocationOn } from 'react-icons/md'

interface CardProps {
    children?: ReactNode
    data: ResultItem,
    key: string
}

const Card: FC<CardProps> = (props) => {
    const { uniqueId, title, uri, raw } = props.data
    const numFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD' });

    return (
        <li className='card' key={uniqueId}>
            <a href={uri}>
                <img className='card-image' src={raw.tpthumbnailuri} />
            </a>
            <a href={uri}>
                <h5>{title}</h5>
            </a>
            <ul className='card-info'>
                <li><MdLocationOn /> {raw.tppays}</li>
                <li><MdLocationCity /> {raw.tpregion}</li>
                <li>
                { numFormat.format(parseFloat(raw.tpprixnum)) }
                </li>
            </ul>
            <ul className='tags'></ul>
        </li>
    )
}

export default Card