import React, { ReactNode, FC, useState } from 'react'
import Card from './Card'
import { ResultItem } from '../types/search'
import ReactPaginate from 'react-paginate'
import { createPaginatorConnect } from '../redux/store'
import { MdInfoOutline, MdSwapVert } from 'react-icons/md'

interface CardListProps {
    children?: ReactNode
    list: ResultItem[]
}

const PaginatorConnect = createPaginatorConnect({
    mapActions: actions => ({
        next: actions.next,
        previous: actions.previous,
        gotoPage: actions.gotoPage
    }),
    mapState: selectors => ({
        offset: selectors.getOffset(),
        pageLength: selectors.getPageLength(),
        pageCount: selectors.getPageCount(),
        totalCount: selectors.getTotalCount(),
        itemCount: selectors.getItemCount(),
        q: selectors.getSearchQuery(),
        queryParams: selectors.getQueryParams()
    })
})

const CardList: FC<CardListProps> = (props) => {
    const { list } = props

    const [pageCount, setPageCount] = useState(0)
    const numFormat = new Intl.NumberFormat('en-US');

    return (
        <PaginatorConnect>
            {(_, actions) =>(
            <>
                <div className='top'>
                    <ul className='list-info'>
                        <li>
                            <MdInfoOutline size='1.2em' /> Items <strong>{(_.offset+1)}</strong> to <strong>{(_.offset + _.itemCount)}</strong> of <strong>{numFormat.format(_.totalCount)}</strong>
                        </li>

                        <li>
                            <MdSwapVert size='1.2em' />
                        </li>
                    </ul>
                </div>
                
                <ul className='grid card-list'>
                    {list.map(item => (
                        <Card key={item.uniqueId} data={item} />
                    ))}
                </ul>
            
                <div className='bottom flex-center'>
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
                </div>
            </>
            )}
        </PaginatorConnect>
    )
}

export default CardList