import React, { ReactNode, FC, useState } from 'react'
import Card from './Card'
import '../styles/grid'
import { ResultItem } from '../types/search'
import ReactPaginate from 'react-paginate';
import { createPaginatorConnect } from '../redux/store';

interface CardListProps {
    children?: ReactNode
    list: ResultItem[]
}

const PaginatorConnect = createPaginatorConnect({
    mapActions: actions => ({
        next: actions.next,
        previos: actions.previous,
        gotoPage: actions.gotoPage
    }),
    mapState: selectors => ({
        offset: selectors.getOffset(),
        pageLength: selectors.getPageLength(),
        pageCount: selectors.getPageCount(),
        q: selectors.getSearchQuery(),
        queryParams: selectors.getQueryParams()
    })
})

const CardList: FC<CardListProps> = (props) => {
    const { list } = props

    const [pageCount, setPageCount] = useState(0)

    return (
        <>
        <ul className='grid card-list'>
            {list.map(item => (
                <Card key={item.uniqueId} data={item} />
            ))}
        </ul>
        
        <PaginatorConnect>
            {(_, actions) =>(
                <section className='bottom flex-center'>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={_.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={pg => actions.gotoPage({ page: pg.selected, query: {...{q: _.q}, ..._.queryParams} })}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
                </section>
            )}
        </PaginatorConnect>
        </>
    )
}

export default CardList