import React, { useEffect, useState } from 'react'
import Leftnav from '../components/nav/Leftnav'
import NavTwo from '../components/nav/Navtwo'
import Bottombar from '../components/nav/Bottombar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface AdminLayoutProps {
  child: React.ReactNode
}

const AdminLayout:React.FC<AdminLayoutProps> = ({child}) => {
  const [user, setUser] = useState<object>({})
  const navigate = useNavigate()

  useEffect(() => {
      const fetchUser = async()=>{
          let config:{method:string,maxBodyLength:any,url:string,headers:object} = {
              method: 'get',
              maxBodyLength: Infinity,
              url: 'https://iirapi.sunmence.com.ng/user.php',
              headers: { 
                'Authorization': localStorage.getItem('token'), 
              }
            };
          const user = await axios.request(config)
          console.log(user);
          if (user.data && user.status == 200) {
              setUser(user.data)
          }else{
              navigate('/login')
          }
      }
      
      fetchUser();
  }, [])
  return (
    <div className="flex">
    <Leftnav />
    <div className="container md:px-5 space-y-4 md:pb-10 pb-20 h-[100vh] overflow-y-scrol">
        <NavTwo user={user} optStyle={"py-4"} />
        {child}
        <Bottombar />
    </div>
</div>
  )
}

export default AdminLayout