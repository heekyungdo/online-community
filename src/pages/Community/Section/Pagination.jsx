import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const PaginationWrapper = styled.div`
display:flex;
align-items:center;
justify-content:flex-end;
`
const Button = styled.button`
margin:5px;
padding: 5px 10px;
`
const ButtonUl = styled.ul`
list-style:none;
padding:0 5px;
`

const ButtonList = styled.li`
display: inline-block;
padding: 5px 10px;
margin:5px;
cursor:pointer;
border:1px solid #555;
border-radius:5px;
cursor: pointer;
background-color: ${(props) => (props.$clicked===props.$current ? '#555' : 'fff')};
color:${(props)=>props.$clicked===props.$current?'#fff':'#000'}
`

const Pagination = ({handleCurrentPage, currentPage,lastPage}) => {

  const pageNumbers = [];
  for(let i=1; i<=lastPage; i++){
    pageNumbers.push(i)
  }


    return (
    <PaginationWrapper>
        <Button onClick={()=>handleCurrentPage(1)} disabled={currentPage===1}>{"<<"}</Button>
        <Button onClick={()=>handleCurrentPage(currentPage-1)} disabled={currentPage===1}>{"<"}</Button>
<ButtonUl>
        {pageNumbers.map(number=>(
            <ButtonList key={number} $clicked={number} $current={currentPage}>
                <span onClick={()=>handleCurrentPage(number)}>{number}</span>
            </ButtonList>
        ))}
        </ButtonUl>
        <Button onClick={()=>handleCurrentPage(currentPage+1)} disabled={currentPage===lastPage}>{">"}</Button>
        <Button onClick={()=>handleCurrentPage(lastPage)} disabled={currentPage===lastPage}>{">>"}</Button>
    </PaginationWrapper>
  )
}

Pagination.propTypes= {
  handleCurrentPage:PropTypes.func,
  currentPage:PropTypes.number,
  lastPage:PropTypes.number
}

export default Pagination