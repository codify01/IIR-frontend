import React from 'react'
import CardSeven from '../../components/card/Cardseven'

const AdminDashboard: React.FC = () => {

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        <CardSeven redirect='/admin/manageinvestors' balType='Total Investors' amount={5} cta='View'/>
        <CardSeven redirect='/admin/manageinvestments' balType='Available Investments' amount={5} cta='View'/>
        <CardSeven redirect='/admin/managetransactions' balType='Pending KYC' amount={5} cta='View'/>
        <CardSeven redirect='/admin/managetransactions' balType='Pending Transactions' amount={5} cta='View'/>
      </div>
    </>
  )

}

export default AdminDashboard