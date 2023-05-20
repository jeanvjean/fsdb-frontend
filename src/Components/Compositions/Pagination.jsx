import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const defaultButton = (props) => <button {...props}>{props.children}</button>;

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;

  .Table__pagination {
    display: flex;
  }

  .Table__itemCount {
    font-size: 14px;
  }

  .Table__pageButton {
    font-size: 15px;
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.grey2};
    background-color: ${({ theme }) => theme.colors.grey5};
    cursor: pointer;
  }

  .Table__pageButton:disabled {
    cursor: not-allowed;
    color: gray;
  }

  .Table__pageButton--active {
    color: #574CC1;
    font-weight: bold;
  }
`;

export const PaginationBTN = styled.button`
  padding: 6px 20px;
  line-height: 14px;
  border-radius: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: solid 2px transparent;
  -webkit-font-smoothing: antialiased;
  margin: 0;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  white-space: nowrap;
  background-image: none;
  background-color: ${({ bg, theme }) => theme.colors[bg]};
  color: ${({ color, theme }) => theme.colors[color]};
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
  -webkit-transition: all 0.15s;
  transition: all 0.15s;
`;


export default class Pagination extends React.Component {
  constructor(props) {
    super();

    this.state = {
      visiblePages: this.getVisiblePages(null, props.pages),
    };
  }

  static propTypes = {
    pages: PropTypes.number,
    page: PropTypes.number,
    PageButtonComponent: PropTypes.any,
    onPageChange: PropTypes.func,
    previousText: PropTypes.string,
    nextText: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.pages !== nextProps.pages) {
      this.setState({
        visiblePages: this.getVisiblePages(null, nextProps.pages),
      });
    }
  }

  filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter((page) => page <= totalPages);
  };

  getVisiblePages = (page, total) => {
    if (total < 7) {
      return this.filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  changePage = (page) => {
    const activePage = this.props.page;

    if (page === activePage) {
      return;
    }

    const visiblePages = this.getVisiblePages(page, this.props.pages);

    this.setState({
      visiblePages: this.filterPages(visiblePages, this.props.pages),
    });

    this.props.onPageChange(page);
  }

  render() {
    const { PageButtonComponent = defaultButton } = this.props;
    const { visiblePages } = this.state;
    const activePage = this.props.page;

    return (
      <Flex>
        <div className="Table__pagination">
          <div className="Table__prevPageWrapper">
            <PageButtonComponent
              className="Table__pageButton"
              onClick={() => {
                if (activePage === 1) return;
                this.changePage(activePage - 1);
              }}
              disabled={activePage === 1}
            >
              {this.props.previousText}
            </PageButtonComponent>
          </div>
          <div className="Table__visiblePagesWrapper">
            {visiblePages.map((page, index, array) => {
              return (
                <PageButtonComponent
                  key={page}
                  className={
                    activePage === page
                      ? 'Table__pageButton Table__pageButton--active'
                      : 'Table__pageButton'
                  }
                  onClick={() => this.changePage(page)}
                >
                  {array[index - 1] + 2 < page ? `...${page}` : page}
                </PageButtonComponent>
              );
            })}
          </div>
          <div className="Table__nextPageWrapper">
            <PageButtonComponent
              className="Table__pageButton"
              onClick={() => {
                if (activePage === this.props.pages) return;
                this.changePage(activePage + 1);
              }}
              disabled={activePage === this.props.pages}
              
            >
              {this.props.nextText}
            </PageButtonComponent>
          </div>
        </div>
      </Flex>
    );
  }
}
