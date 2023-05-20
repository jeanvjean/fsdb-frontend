import styled from '@emotion/styled';

export const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  z-index: 1001;
  transition: opacity 0.3s linear;
  overflow: auto;
  padding: 5rem 0;
`;

export const ModalWrapperNoFlex = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  z-index: 1001;
  transition: opacity 0.3s linear;
  overflow: auto;
  padding: 5rem 0;
`;
