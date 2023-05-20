import React from 'react'
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import styled from '@emotion/styled';
import { ModalWrapper } from '../Dropdowns/Styles';
import { Button } from '../../Elements';
import MainModal from '../Dropdowns/MainModal';

export const Modal = styled(MainModal)`
  padding: 2rem;
  max-width: 500px;
  height: 185;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 1rem;
`;
Modal.Header = styled.header`
  font-weight: 600;
  color: ${(p) => p.theme.colors.green3};
  font-size: ${p => p.theme.fontSizes.large};
  width: 100%;
  padding: 0;
  text-align: center;
`;
Modal.CropButton = styled(Button)`
  background-color: ${(p) => p.theme.colors.green3};
  color: ${(p) => p.theme.colors.white};
  font-weight: 600;
`;

const ImageCropModal = (props) => {
  return (
    <ModalWrapper>
      <Modal toggleDropdown={props.toggleModal}>
        <Modal.Header>Crop Image</Modal.Header>
        <ReactCrop
          src={props.src}
          crop={props.crop}
          ruleOfThirds
          onImageLoaded={props.onImageLoaded}
          onComplete={props.onComplete}
          onChange={props.onChange}
        />
        <Modal.CropButton onClick={props.toggleModal}>Crop</Modal.CropButton>
      </Modal>
    </ModalWrapper>
  );
}

export default ImageCropModal
