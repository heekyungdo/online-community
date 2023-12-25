import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const PaginationWrapper = styled.div`
text-align:right;
`

const PageUl = styled.ul`
list-style:none;
li{
    display: inline-block;
    padding: 5px;
    cursor:pointer;
}
`
const Pagination = ({postsPerPage, postsCurrentPage, totalPosts}) => {
  const pageNumbers = [];
  for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
    pageNumbers.push(i)
  }
  
    return (
    <PaginationWrapper>
        <button>{"<<"}</button>
        <button>{"<"}</button>
        <PageUl>
        {pageNumbers.map(number=>(
            <li key={number}>
                <span onClick={()=>postsCurrentPage(number)}>{number}</span>
            </li>
        ))}
        </PageUl>
       
        <button>{">"}</button>
        <button>{">>"}</button>
    </PaginationWrapper>
  )
}

Pagination.propTypes= {
postsPerPage:PropTypes.number,
postsCurrentPage:PropTypes.func,
totalPosts:PropTypes.number,
}

export default Pagination