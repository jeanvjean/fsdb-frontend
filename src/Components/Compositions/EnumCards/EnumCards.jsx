import React from 'react';
import CountTo from 'react-count-to';
// import Tooltip from 'components/Elements/Tooltip';
import styled from '@emotion/styled';
import { Spinner } from '../../Elements/Spinner';
import { Flex } from 'rebass';

export const countFn = (value) => {
  let val
  if (typeof value === "number") val = value.toLocaleString()
  if (typeof value === "string") val = parseInt(value, 10).toLocaleString()

  return <span>{val || 0}</span>  
}

export const Enum = styled.div`
  border-bottom: 2px solid ${(p) => p.color || p.theme.colors.mediumBue};
  background: ${(p) => p.theme.colors.white};
  padding: 1rem;
  height: 130px;
  display: flex;
  /* width: calc(30% - 0.5rem); */
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 15px 0px;
  h2 {
    color: ${(p) => p.color || p.theme.colors.mediumBue};
  }
  &:hover {
    cursor: default;
    transform: scale(0.95);
    opacity: 0.6;
    transition: all 0.3s linear;
  }
  &:not(:hover) {
    transform: scale(1);
    opacity: 1;
    transition: all 0.4s linear;
  }
`;
Enum.Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 4rem;
  margin-top: 1rem;
`;
Enum.Title = styled.span`
  font-size: ${(p) => p.theme.fontSizes.small};
  color: ${(p) => p.theme.colors.black};
  margin-bottom: 0.5rem;
  @media (max-width: ${(p) => p.theme.breaks.XL}) {
    font-size: ${(p) => p.theme.fontSizes.xSmall};
  }
`;
Enum.Body = styled.h2`
  color: ${(p) => p.theme.colors.mediumBue};
  font-weight: 700;
  display: flex;
  font-size: 34px;
  height: 47px;
  @media (max-width: ${(p) => p.theme.breaks.XL}) {
    /* font-size: ${(p) => p.theme.fontSizes.xLarge}; */
    height: 40px;
  }
`;
Enum.Footer = styled.p`
  font-size: ${(p) => p.theme.fontSizes.small};
`;

const EnumCards = ({
  title,
  count,
  countFrom,
  footer,
  color,
  countTooltipId,
  countTooltipText,
  footerTooltipText,
  footerTooltipId,
  percentage,
  footerStyle,
  prefixNairaSymbol,
  loading
}) => {
  return (
    <Enum color={color}>

      {
        loading && <Flex width="100%" height="100%" alignItems="center" justifyContent="center">
          <Spinner size="1.5rem" color="black"/>
        </Flex>
      }

      {
        !loading && (
          <>
            <Enum.Title>{title}</Enum.Title>
            <Enum.Body data-tip data-for={countTooltipId}>
              <>
              {prefixNairaSymbol && <p>&#8358;</p>} 
              <CountTo from={countFrom || 70} to={+count} speed={1235}>
              {countFn}
              </CountTo>
              {percentage && '%'}          
            </>      
            </Enum.Body>
            <Enum.Footer style={footerStyle} data-tip data-for={footerTooltipId}>
              {footer}
            </Enum.Footer>          
          </>          
        )
      }

      {/* <Tooltip id={countTooltipId}>{countTooltipText}</Tooltip>
      <Tooltip id={footerTooltipId}>{footerTooltipText}</Tooltip> */}
    </Enum>
  );
};

export default EnumCards;
