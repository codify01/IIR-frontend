// import React from 'react';
// import CardFive from '../../components/card/Cardfive';
// import { Link } from 'react-router-dom';

// const ManageInvestments: React.FC = () => {

//     const availableInvestments: { amount: number; duration: string; interestRate: string; tier: string; }[] = [
//         // {
//         //     amount: 1000,
//         //     duration: "1 month",
//         //     interestRate: "5%",
//         //     tier: "platinum"
//         // },
//         // {
//         //     amount: 1000,
//         //     duration: "1 month",
//         //     interestRate: "5%",
//         //     tier: "platinum"
//         // },
//     ]

//     return (
        
//         <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
//             {
//                 availableInvestments.length > 0
//                 ?
//                 availableInvestments.map(({amount, duration, interestRate, tier}, index) => (
//                     <CardFive key={index} amount={amount} duration={duration} interestRate={interestRate} tier={tier} optStyle="hidden" />
//                 ))
//                 :
//                 <div className="text-center col-span-2 font-semibold">
//                     <h3 className='text-4xl text-pry'>No Investment available</h3>
//                         <Link to="/admin/createinvestment">
//                             <button className="text-tet bg-pry/55 mt-5 text-sm py-4 px-4 rounded-md">Create an Investment</button>
//                         </Link>
//                 </div>
//             }
//         </div>

//     )

// }

// export default ManageInvestments