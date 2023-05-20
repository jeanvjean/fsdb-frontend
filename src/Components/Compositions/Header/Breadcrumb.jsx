import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
import styled from '@emotion/styled';
import { AngleDoubleRight } from 'emotion-icons/fa-solid';

const routes = [
  { path: '/dashboard', breadcrumb: 'Dashboard' },
  {
    path: '/dashboard/aku-reps',
    breadcrumb: 'Aku Reps',
  },
  {
    path: '/dashboard/approvals',
    breadcrumb: 'Approvals',
  },
];

const DoubleArrow = styled(AngleDoubleRight)`
  width: 10px;
  ${({ active }) => active && 'display: none;'};
  margin: 0 10px;
`;

const ListItem = styled.li`
  background: transparent;

  a {
    text-decoration: none;
    color: ${(p) => p.theme.colors.black1};
    ${({ active, theme }) => {
      if (active) {
        return `
          color: ${theme.colors.white};
          padding: 5px 8px;
          font-size: ${theme.fontSizes.small};
          border-radius: 0;
          background-color: ${theme.colors.sonicSilver};
        `;
      }
    }};
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  font-size: ${(p) => p.theme.fontSizes.small};
  letter-spacing: 1px;
  margin: 0;
  padding: 0;

  @media (max-width: ${(p) => p.theme.breaks.MD}) {
    display: none;
  }
`;

const Breadcrumb = ({ breadcrumbs, disableDashoardRoute }) => {
  const lastBreadcrumbIndex = breadcrumbs.length - 1;
  const bds = breadcrumbs.filter((bd, i) => i > 0);

  return (
    <List>
      {bds.map(({ match, breadcrumb }, i) => {
        return (
          <React.Fragment key={i}>
            <ListItem active={lastBreadcrumbIndex - 1 === i}>
              <NavLink style={{ textTransform: 'capitalize', }} to={ disableDashoardRoute ? "#" : match.url}>
                {breadcrumb}
              </NavLink>
            </ListItem>
            <DoubleArrow active={lastBreadcrumbIndex - 1 === i} />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default withBreadcrumbs(routes, {})(Breadcrumb);
