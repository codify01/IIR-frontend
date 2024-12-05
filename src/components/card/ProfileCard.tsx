import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

interface ProfileCardProps {
    name: string,
    description: string,
    icon:React.ReactNode,
    onClick: () => void;

}

const ProfileCard: React.FC<ProfileCardProps> = ({name,description,icon, onClick}) => {
  return (
    <div onClick={onClick}>
    <div className="bg-pry/20 text-pry py-2 px-5 rounded-md w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
            {icon}
            <div>
                <h3 className='capitalize font-medium'>{name}</h3>
                <p className="text-sm">{description}</p>
            </div>
        </div>
        <IoIosArrowForward />
    </div>
</div>
  )
}

export default ProfileCard