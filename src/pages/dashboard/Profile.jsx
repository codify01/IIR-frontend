import React from 'react'
import DesktopUserProfile from './DesktopUserProfile'
import UserProfile from './UserProfile'

const Profile = () => {
  return (
    <React.Fragment>
      <UserProfile/>
      <DesktopUserProfile/>
    </React.Fragment>
  )
}

export default Profile