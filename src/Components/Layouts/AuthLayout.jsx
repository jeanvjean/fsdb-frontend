import React from 'react';
import { AuthContainer, FormWrapper, Footer } from './Styles';

const AuthLayout = ({ children }) => {
  return (
    <>
      <AuthContainer>
        <FormWrapper>
          {children}
          <Footer>
            <p>2020 © All rights reserved. AKU PLC</p>
          </Footer>
        </FormWrapper>
      </AuthContainer>
    </>
  );
};

export default AuthLayout;
