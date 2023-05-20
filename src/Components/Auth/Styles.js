import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Button } from '../Elements/Button';

export const FormTitle = styled.div`
  width: 380px;
  margin: 10px 0 20px 0;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.lightBlack2};
  @media (max-width: ${({ theme }) => theme.breaks.SM}) {
    width: 300px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 10px;
`;

export const Input = styled.input`
  border: 1px solid ${({ theme, error }) => (!error ? theme.colors.lightBlack2 : theme.colors.red)};
  width: 380px;
  height: 60px;
  padding: 20px;
  font-size: ${({ theme }) => theme.fontSizes.normal};
  background: transparent;
  @media (max-width: ${({ theme }) => theme.breaks.SM}) {
    width: 300px;
  }

  &:focus {
    box-shadow: 0 5px 8px rgba(100, 100, 100, 0.1);
    outline: 0;
    transition: all 0.3s ease-in-out;
  }
`;

export const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
`;

export const FormActions = styled.div`
  width: 380px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  height: 50px;
  margin: 1.2rem 0;
  @media (max-width: ${({ theme }) => theme.breaks.SM}) {
    width: 300px;
  }
`;

export const ForgotPwdLink = styled(Link)`
  flex-basis: 50%;
  text-align: center;
  height: 100%;
  padding: 15px;
  color: ${({ theme }) => theme.colors.lightBlack1};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.normal};
`;

export const LoginBtn = styled(Button)`
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mediumBue};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0;
  height: 100%;
  font-size: ${({ theme }) => theme.fontSizes.larger};
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

export const LogoWrapper = styled.div`
  width: 380px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightBlack2};
  margin: 0 20px 20px 20px;
  padding-bottom: 10px;
  @media (max-width: ${({ theme }) => theme.breaks.SM}) {
    width: 300px;
  }
`;

export const Img = styled.img`
  width: ${({ width }) => width};
`;

export const Div = styled.div`
  display: block;
  width: 380px;
  @media (max-width: ${({ theme }) => theme.breaks.SM}) {
    width: 300px;
  }
`;

export const SuccessMsgContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightBlack2};
  width: 380px;
  padding: 1.5rem 1rem;
  color: ${({ theme }) => theme.colors.mediumBue};
`;

export const BackToLoginBtn = styled(Button)`
  flex-basis: 40%;
  height: 100%;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;
