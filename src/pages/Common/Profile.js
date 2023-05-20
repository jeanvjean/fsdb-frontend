import React, { useContext, useState } from 'react';
import Avatar from 'react-avatar';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import { ProfileContent, UserCard, UserDetails, UserType, ProfileTab } from './Profile.styles';
import DashboardLayout from '../../Components/Layouts/DashboardLayout';
import { Text } from '../../Components/Elements';
import { H3 } from '../../Components/GlobalStyles';
import SidebarProvider, { SidebarContext } from '../../context/SidebarContext';
import { getCroppedImg, imgCropInitialState } from '../../Components/utils';
import EditProfileForm from '../../Components/Compositions/Forms/EditProfileForm';
import ChangePasswordForm from '../../Components/Compositions/Forms/ChangePasswordForm';
import ActivityLogs from '../../Components/Compositions/ActivityLogs';
import ImageCropModal from '../../Components/Compositions/Modals/ImageCropModal';
import { useUser } from '../../hooks/useUser';
import { Email } from 'emotion-icons/material';
import { ROLES } from '../../Components/Compositions/Sidebar/sidebarData';

const ImgUploader = styled.input`
  width: 100%;
  height: 240px;
  border: 1px solid;
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

export const FormsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  min-height: 400px;
  width: 90%;
  overflow: auto;
  line-break: nowrap;
  @media (max-width: ${({ theme }) => theme.breaks.XL}) {
    width: 100%;
  }
  @media (max-width: ${({ theme }) => theme.breaks.LG}) {
    width: 100%;
  }
`;

export const FormsCardHeader = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.bodyBgColor};
`;

const tabs = {
  activities: 'activities',
  editProfile: 'editProfile',
  changePwd: 'changePwd',
};

const ProfilePage = (props) => {
  const { state } = useContext(SidebarContext);
  const [profileTab, setprofileTab] = useState(tabs.activities);
  const [newAvatarFile, setNewAvatarFile] = useState(null);
  const [imageState, setImageState] = useState(imgCropInitialState);
  const [avatarErr, setAvatarErr] = useState('');
  const [showCropModal, setShowCropModal] = useState(false);
  const [shouldBlockNavigation, setShouldBlockNavigation] = useState(false);
  const history = useHistory();

  const {user: {first_name, last_name, phone_number, user_type, email}} = useUser()

  const switchToEditProfile = () => {
    setprofileTab(tabs.editProfile);
  };
  const switchToChangePassword = () => {
    setprofileTab(tabs.changePwd);
  };
  const switchToActivityHistory = () => {
    setprofileTab(tabs.activities);
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setShowCropModal(true);
      if (
        e.target.files[0]?.type !== 'image/png' &&
        e.target.files[0]?.type !== 'image/jpeg' &&
        e.target.files[0]?.type !== 'image/jpg'
      ) {
        setAvatarErr('Only .png, .jpeg or .jpg files are accepted');
      } else if (e.target.files[0]?.size > 1048576) {
        setAvatarErr('Avatar size must not be more than 1MB');
      } else {
        setAvatarErr('');
      }
      setNewAvatarFile(e.target.files[0]);

      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () =>
          setImageState((prev) => ({
            ...prev,
            src: reader.result,
          })),
        false
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const makeClientCrop = async (crop) => {
    if (imageState.imageRef && crop.width && crop.height) {
      const { fileUrl, blob } = await getCroppedImg(imageState.imageRef, crop, 'newFile.jpeg');
      URL.revokeObjectURL(blob);
      setNewAvatarFile(blob);
      if (blob.size > 1048576) {
        setAvatarErr('Avatar size must not be more than 1MB');
      } else {
        setAvatarErr('');
      }
      setNewAvatarFile(blob);
      setImageState((prev) => ({ ...prev, croppedImageUrl: fileUrl }));
    }
  };

  const onImageLoaded = (image) => {
    setImageState((prev) => ({ ...prev, imageRef: image }));
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const onCropChange = (crop) => {
    setImageState((prev) => ({
      ...prev,
      crop,
    }));
  };

  const renderProfileName = () => {
    
    if (first_name && last_name) {
      return `${first_name} ${last_name}`;
    } else if (first_name && !last_name) {
      return first_name;
    } else if (!first_name && last_name) {
      return last_name;
    }
    return email?.split('@')[0];
  };

  return (
    <>
      {showCropModal && (
        <ImageCropModal
          crop={imageState.crop}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
          src={imageState.src}
          toggleModal={() => setShowCropModal(!showCropModal)}
        />
      )}
      <DashboardLayout state={state} disableDashoardRoute={user_type === ROLES.AKUPAY}>
        <header>
          <Text color="black" mb="1rem" weight="600" size="larger">
            PROFILE
          </Text>
        </header>
        <ProfileContent>
          <UserCard>
            <ImgUploader type="file" name="avatar_url" onChange={onSelectFile} />
            <Avatar
              size="239"
              style={{ marginLeft: '-1px' }}
              name={renderProfileName()}
              src={imageState.croppedImageUrl}
              email=""
              color={Avatar.getRandomColor('sitebase', ['#00CFE6', '#03E060', '#574CC1'])}
            />
            <UserDetails>
              <H3>{renderProfileName()}</H3>
              <UserType>{user_type}</UserType>
              <br />
              <span>{email||'N/A'}</span>
              <br />
              <span>{phone_number}</span>
            </UserDetails>
          </UserCard>
          <FormsCard>
            <FormsCardHeader>
              <ProfileTab
                isActive={profileTab === tabs.activities}
                onClick={switchToActivityHistory}
              >
                Activity History
              </ProfileTab>
              <ProfileTab isActive={profileTab === tabs.editProfile} onClick={switchToEditProfile}>
                Edit Profile
              </ProfileTab>
              <ProfileTab isActive={profileTab === tabs.changePwd} onClick={switchToChangePassword}>
                Change password
              </ProfileTab>
            </FormsCardHeader>
            {profileTab === tabs.activities && <ActivityLogs {...props} />}
            {profileTab === tabs.editProfile && (
              <EditProfileForm
                goBack={() => setprofileTab(tabs.activities)}
                {...props}
                newAvatarFile={newAvatarFile}
                avatarErr={avatarErr}
                // progress={progress}
              />
            )}
            {profileTab === tabs.changePwd && (
              <ChangePasswordForm goBack={() => setprofileTab(tabs.activities)} {...props} />
            )}
          </FormsCard>
        </ProfileContent>
      </DashboardLayout>
    </>
  );
};

const Page = () => (
  <SidebarProvider>
    <ProfilePage />
  </SidebarProvider>
);

export default Page;
