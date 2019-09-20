import React, { ReactNode, FC } from 'react'
import Card from './Card'
import '../styles/grid'
import { ResultItem } from '../types/search'

interface CardListProps {
    children?: ReactNode
    list: ResultItem[]
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