import React, { ReactNode, FC } from 'react'
import { Item } from '../types/item'

interface CardProps {
    children?: ReactNode
    data: Item,
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