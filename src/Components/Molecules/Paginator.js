import React from 'react';
import ReactPaginate from 'react-paginate';
import styled from '@emotion/styled/macro';

const Wrapper = styled.div`
  .pagination {
    align-items: center;
    display: flex;
    flex-direction: row;

    li {
      display: inline-flex;
      &:not(:last-child) {
        margin-right: 0.5rem;
      }
    }

    .page-item {
      color: #716d6d;
      font-size: 0.7rem;
      letter-spacing: 1px;
      outline: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem 1rem;

      &.active {
        background-color: ${({ theme }) => "#7753F3"};
        border-radius: 3px;
        color: ${({ theme }) => theme.colors.white};
        outline: none;
        border: none;
        a {
          color: ${({ theme }) => theme.colors.white};
          border: none;
          outline: none;
        }
      }
      a {
        border: none;
        outline: none;
      }
    }

    .previous,
    .next {
      position: relative;
      a {
        display: inline-block;
        height: 2rem;
        width: 1rem;
        cursor: pointer;
        margin-top: -7px;
      }
    }

    .previous {
      a {
        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          border-right: 10px solid #716d6d;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }

        &:after {
          content: '';
          position: absolute;
          left: 2px;
          top: 2px;
          border-right: 8px solid #fff;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
        }
      }
    }

    .next {
      a {
        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          border-left: 10px solid #716d6d;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
        }

        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 2px;
          border-left: 8px solid #fff;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
        }
      }
    }    
  }
`;

export const Paginator = props => {
  return (
    <Wrapper>
      <ReactPaginate
        activeClassName="active"
        breakClassName="break-me"
        breakLabel="..."
        containerClassName="pagination"
        marginPagesDisplayed={3}
        nextLabel={""}
        pageClassName="page-item"
        pageRangeDisplayed={3}
        previousLabel={""}
        subContainerClassName="pages pagination"
        {...props}
      />
    </Wrapper>
  );
};
