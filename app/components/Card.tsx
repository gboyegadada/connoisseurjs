import React, { ReactNode, FC } from 'react'
import { ResultItem } from '../types/search'

interface CardProps {
    children?: ReactNode
    data: ResultItem,
    key: string
}

const Card: FC<CardProps> = (props) => {
    const { uniqueId, title } = props.data

    return (
        <li className='card' key={uniqueId}>
            <h5>{title}</h5>
        </li>
    )
}

export default Card