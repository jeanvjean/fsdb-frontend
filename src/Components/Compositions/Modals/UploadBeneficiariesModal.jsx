import React, { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useDropzone } from 'react-dropzone';

import {apiCall} from '../../../api';
import { utils } from '../../../api/utils';

import { Approval } from './ApprovalModal';
import GenericModal from './GenericModal';
import { Button, UploadIcon, toastMessage, Select } from '../../Elements';
import PasswordInput from '../../Auth/PasswordInput';
import { CheckmarkCircle } from '../../Elements/Icons';
import MainModal from './MainModal';
import { ModalWrapper } from '../Dropdowns/Styles';
import { Box, Flex } from 'rebass';
import SelectField from '../../Elements/SelectField';

export const ellipsize = (text, maxlimit) => {
  if (text) {
    if (text.length > maxlimit) {
      return `${text.substring(0, maxlimit - 3)}...`;
    }
    return text;
  }
  return '';
};
export const bytesToSize = (bytes) => {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0B';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
};

export const Modal = styled(MainModal)`
  padding: 2rem;
  width: 600px;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  padding: 0.8rem 0;
`;
Modal.Header = styled.div`
  width: 100%;
  height: 70px;
  text-align: center;
  color: ${(p) => p.theme.colors.black};
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.colors.borderColor};
  font-size: ${(p) => p.theme.fontSizes.normal};
  font-weight: 600;
`;

export const UploadWrapper = styled.div`
  background-color: #cbfdf2;
  border-radius: 0;
  border: solid 1px #e1e1e1;
  /* width: 100%; */
  margin: 1rem;
`;

export const DropzoneWrapper = styled.div`
  padding: 1rem;
`;

export const DropArea = styled.div`
  align-items: center;
  border-radius: 0;
  border: 1px dashed #c2cdda;
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: center;
  position: relative;
  width: 100%;
  &:focus {
    outline: none;
  }
  .upload-icon {
    margin-bottom: 1.5rem;
  }
  .title {
    color: #555a6b;
    font-size: 0.8rem;
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: 1.1rem;
    text-align: center;
  }
  .text {
    color: #666666;
    font-size: 0.8rem;
    font-weight: 500;
    line-height: 1.22;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  button {
    border-radius: 0;
    font-size: 1.2rem;
  }
  ${({ isDragActive }) =>
    isDragActive &&
    css`
      &:before {
        background-color: #fff;
        content: '';
        height: 100%;
        left: 0;
        opacity: 0.4;
        position: absolute;
        top: 0;
        width: 100%;
      }
    `}
`;

export const DroppedItem = styled.div`
  border-top: 1px solid #e1e1e1;
  min-height: 3rem;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 1rem;
  .icon {
    border: 1px solid #95989a;
    clip-path: polygon(80% 0, 100% 14%, 100% 100%, 0 100%, 0 0);
    flex-shrink: 0;
    height: 27px;
    margin-right: 1.2rem;
    position: relative;
    width: 20px;
    &:before {
      border-left: 5px solid transparent;
      border-right: 3px solid transparent;
      border-top: 4px solid #95989a;
      content: '';
      height: 0;
      position: absolute;
      right: -2px;
      top: -1px;
      transform: rotate(50deg);
      width: 0;
    }
  }
  .details {
    display: flex;
    flex-direction: column;
    margin-right: 5px;
  }
  .name {
    color: #77839f;
    font-size: 0.8rem;
    font-weight: bold;
    line-break: anywhere;
    line-height: 1.22;
    margin-bottom: 2px;
  }
  .size {
    color: #979fb8;
    font-size: 0.7rem;
    font-weight: 500;
    line-height: 1.25;
  }
  .options {
    align-items: center;
    display: flex;
    margin-left: auto;
  }
  .percentage {
    color: rgba(104, 125, 219, 0.2);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.2;
    margin-right: 3px;
  }
  .close {
    appearance: none;
    background-color: #ff6464;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: inline-block;
    height: 1.6rem;
    position: relative;
    width: 1.6rem;
    &:before,
    &:after {
      background-color: #fff;
      content: '';
      height: 0.8rem;
      left: 50%;
      position: absolute;
      top: 50%;
      transform-origin: top;
      width: 1px;
    }
    &:before {
      transform: rotate(45deg) translate(-50%, -50%);
    }
    &:after {
      transform: rotate(-45deg) translate(-50%, -50%);
    }
  }
  &:before {
    background-color: #00b8cc;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    top: 0;
    transition: all 0.1s;
    width: ${({ progress }) => progress}%;
  }
`;

export const Dropped = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BrowseButton = styled(Button)`
  background: ${(p) => p.theme.colors.green3};
  font-size: ${(p) => p.theme.fontSizes.small}!important;
  padding: 0.3rem 0.5rem;
  border: none !important;
  box-shadow: 0 0 0 !important;
  &:hover {
    box-shadow: 0 0 0 !important;
  }
`;
Modal.Buttons = styled.div`
  display: flex;
  margin: 1rem;
  justify-content: center;

  button:first-child {
    margin-right: 1rem;
    background-color: ${({theme}) => theme.colors.mediumBue};
    color: white;
  }

  button:nth-child(2) {
    background-color: ${({theme}) => theme.colors.red};
    color: white;
  }
`;

export const CancelIcon = styled.img`
  position: relative;
  float: right;
  max-width: 25px;
  right: -7px;
  bottom: 20px;
  cursor: pointer;
`;



const UploadAgentsModal = ({ toggleDropdown, showProgramForm, prog_id }) => {
  const [myFiles, setMyFiles] = useState([]);
  const modalRef = React.useRef()

  // const [showLoader, setShowLoader] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isuploading, setIsUploading] = useState(false);
  const [uploadState, setUploadState] = useState({
    confirmPasswordLoading: false,
    confirmPassword: '',
    passwordConfirmed: false,
    showPasswordConfirmModal: false,
  });
  const [programmes, setProgrammes] = useState([])
  const [prog, setProg] = useState('' || prog_id)

  const onDrop = useCallback(
    (acceptedFiles) => {
      // if (!showProgress) {
      if (acceptedFiles.length + myFiles.length > 5) {
        const oldLength = myFiles.length;
        alert(
          `You have passed the additional uploads limit, you have only ${Math.abs(
            5 - oldLength
          )} slots left`
        );
        return;
      }

      if (acceptedFiles.length > 5) {
        alert("Files to upload can't be more than 5");
        return;
      }

      setShowProgress(false);
      setMyFiles((f) => [...acceptedFiles, ...f,]);
      // }
    },
    [myFiles]
  );

  const removeFile = (i) => {
    const newFiles = [...myFiles];
    newFiles.splice(i, 1);
    setMyFiles(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.csv',
    onDrop,
  });

  const confirmAuth = async () => {
    setUploadState(s => ({ ...s, confirmPasswordLoading: true }));
    try {
      const res = await utils.authenticatePassword(uploadState.confirmPassword);
      if (res.data.message === 'Success') {
        toastMessage({
          type: 'success',
          message: 'Password confirmed successfully',
        });
        setUploadState(s => ({ ...s, confirmPasswordLoading: false, showPasswordConfirmModal: false }));
        await handleUpload()
      }
    }catch(err) {
      toastMessage({
        type: 'error',
        message: err.response.data.message || 'Could not validate authentication',
      });
      setUploadState(s => ({ ...s, confirmPasswordLoading: false, showPasswordConfirmModal: false }));
      }
  }

  const handleUpload = async () => {
    const formData = new FormData();

    if (myFiles.length) {
      formData.append('applicant', myFiles[0], myFiles[0]?.name);
      formData.append('programme_id', prog);
      try {
          setIsUploading(true);
          const res = await apiCall('upload-beneficiary', 'post', formData, {
            onUploadProgress: (prog) => {
              const { loaded, total } = prog;
              const percentageProgress = Math.floor((loaded / total) * 100);
              setProgress(percentageProgress);
            },
          });
          setIsUploading(false);
          if (res) {
            toggleDropdown();
            toastMessage({
              type: 'success',
              message: 'Applicants have been uploaded and currently being processed',
            });
          }
        
        
      } catch (err) {
        if (err) {
            toastMessage({ type: 'error', message: err.response?.data?.message });
        }
      }
    }
  };

  const fetchAllProgrammes = async () => {
    try {
      setProgrammes([])
      const res = await utils.fetchAllProgrammes()
      setProgrammes(res.data)
    } catch (error) {
      
    }
  }

  const closeModal = (event) => {
    if (event.target.id === "modalRefWrapper") {
        toggleDropdown()
    } 
  }


  // useEffect(() => {
  //   fetchAllProgrammes()
  // }, [])

  return (
    <>
    {uploadState.showPasswordConfirmModal && (
        <GenericModal title="Confirm Authentication">
          {uploadState.passwordConfirmed ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '4rem',
                alignItems: 'center',
              }}
            >
              <CheckmarkCircle />
            </div>
          ) : (
            <>
              <div style={{ padding: '2rem', display: 'flex', justifyItems: 'center' }}>
                <PasswordInput
                  onChange={(e) =>
                    setUploadState((s) => ({
                      ...s,
                      confirmPassword: e.target.value,
                    }))
                  }
                  name="password"
                  placeholder="Password"
                  error={''}
                />
              </div>
              <Approval.Buttons>
                <Button
                  color="white"
                  bg="mediumBue"
                  onClick={confirmAuth}
                  mr="1rem"
                  loading={uploadState.confirmPasswordLoading}
                >
                  Confirm Password
                </Button>
                <Button color="white" bg="red3" onClick={() => setUploadState(s => ({ ...s, showPasswordConfirmModal: false}))}>
                  Close
                </Button>
              </Approval.Buttons>
            </>
          )}
        </GenericModal>
      )}
    <ModalWrapper onClick={closeModal} id="modalRefWrapper" >
      <Modal toggleDropdown={() => {}}  >
        <CancelIcon src="/cancel-icon.svg" alt="cancel" onClick={toggleDropdown } />
        <Modal.Header>Upload Beneficiaries</Modal.Header>
        <UploadWrapper>
          <DropzoneWrapper>
            <DropArea isDragActive={isDragActive} {...getRootProps()}>
              <input {...getInputProps()} />
              <UploadIcon width={42} height={36} />
              <span className="title">
                {isDragActive ? 'Drop' : 'Drag'} files here
              </span>
              <span className="text">or</span>

              <BrowseButton>Browse files</BrowseButton>
            </DropArea>
          </DropzoneWrapper>

          <Dropped>
            {myFiles.length
              ? myFiles.map((f, i) => {
                  return (
                    <DroppedItem progress={progress}>
                      <div className="icon" />
                      <div className="details">
                        <span className="name">{ellipsize(f.name, 18)}</span>
                        <span className="size">{bytesToSize(f.size)}</span>
                      </div>

                      <div className="options">
                        {showProgress && (
                          <span className="percentage">{progress}%</span>
                        )}
                        <button
                          aria-label="Delete button"
                          className="close"
                          onClick={() => removeFile(i)}
                          type="button"
                        />
                      </div>
                    </DroppedItem>
                  );
                })
              : null}
          </Dropped>

          <Flex mt="2rem" mb="5rem" justifyContent="center" alignItems="center" >
            {
              showProgramForm && (
                <Box mt="1rem" width={[1, 1, 6/12]}>
                <SelectField
                  label="Programme"
                  onChange={(e) => setProg(e.target.value)}
                  // ref={dateRangeRef}
                  id="date-range"
                  name="programme"
                  flex={0}
                  noRadius
                  whiteBg
                >
                  <option value="" defaultChecked disabled selected>
                    Select programme
                  </option>
                  {
                    programmes.map(p => <option value={p.id}>{p.name}</option>)
                  }
                </SelectField>         
              </Box>   
              )
            }
          
        </Flex>          
        </UploadWrapper>

        <Modal.Buttons>
          <Button onClick={() => {
            if(!prog.length){
              toastMessage({
                type: 'error',
                message: 'Please select a programme',
              });
              return
            }
            setUploadState(s => ({
              ...s,
              showPasswordConfirmModal: true
            }))            

          }}>
            {isuploading ? 'loading' : 'Upload'}
          </Button>
          <Button onClick={() => toggleDropdown()}>Cancel</Button>
        </Modal.Buttons>
      </Modal>
    </ModalWrapper>
    </>
  );
};

export default UploadAgentsModal;