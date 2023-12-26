import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const PaginationWrapper = styled.div`
display:flex;
align-items:center;
justify-content:flex-end;
`

const PageUl = styled.ul`
list-style:none;
li{
    display: inline-block;
    padding: 5px 10px;
    margin:5px;
    cursor:pointer;
    border:1px solid blue;
    border-radius:5px;
}
`
const Pagination = ({postsPerPage, handleCurrentPage, currentPage, totalPosts}) => {
  const pageNumbers = [];
  for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
    pageNumbers.push(i)
  }

  const lastBtn = Math.ceil(totalPosts/postsPerPage)
  
    return (
    <PaginationWrapper>
        <button onClick={()=>handleCurrentPage(1)}>{"<<"}</button>
        <button onClick={()=>handleCurrentPage(currentPage-1)}>{"<"}</button>
        <PageUl>
        {pageNumbers.map(number=>(
            <li key={number}>
                <span onClick={()=>handleCurrentPage(number)}>{number}</span>
            </li>
        ))}
        </PageUl>
        <button onClick={()=>handleCurrentPage(currentPage+1)}>{">"}</button>
        <button onClick={()=>handleCurrentPage(lastBtn)}>{">>"}</button>
    </PaginationWrapper>
  )
}

Pagination.propTypes= {
  postsPerPage:PropTypes.number,
  handleCurrentPage:PropTypes.func,
  currentPage:PropTypes.number,
  totalPosts:PropTypes.number,
}

export default Pagination