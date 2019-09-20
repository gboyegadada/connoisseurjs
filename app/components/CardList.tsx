import React, { ReactNode, FC } from 'react'
import { Item } from '../types/item'
import Card from './Card'
import '../styles/grid'

interface CardListProps {
    children?: ReactNode
    list: Item[]
}

const CardList: FC<CardListProps> = (props) => {
    const { list } = props

    return (
        <ul className='grid card-list'>
            {list.map(item => (
                <Card key={item.uniqueId} data={item} />
            ))}
        </ul>
    )
}

export default CardList