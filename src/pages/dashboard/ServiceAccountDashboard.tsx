import React, { useState } from "react";
import Cardtwo from "../../components/card/Cardtwo";
import { NavLink } from "react-router-dom";
import CardThree from "../../components/card/Cardthree";
import CardSix from "../../components/card/Cardsix";

const ServiceAccountDashboard: React.FC = () => {
    const [refBalVisibility, setRefBalVisibility] = useState<boolean>(true);

    return (

      <div className=" mx-auto mt-5 space-y-10">
     
        <div className="w-1/2">
          <Cardtwo
            balType="Service Charge Balance"
            amount={200000}
            thisState={refBalVisibility}
            cta="Withdraw Earnings"
            redirect="/user/withdraw"
            newStyle="pointer-events-none"
            action={() => setRefBalVisibility(!refBalVisibility)}
          />
        </div>

      {/* Recent Investments Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-2xl md:text-3xl text-gray-800">
            Recent Earnings
          </h3>
          <NavLink to="/serviceacc/transactions" className="text-pry underline">
            View All
          </NavLink>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
              <CardSix
								key={"transaction"}
								type={"withdraw"}
								amount={30000}
								date={"transaction"}
								category={"transaction"}
								onViewDetails={"() => handleViewDetails(transaction)"}
							/>
              <CardSix
								key={"transaction"}
								type={"deposit"}
								amount={30000}
								date={"transaction"}
								category={"transaction"}
								onViewDetails={"() => handleViewDetails(transaction)"}
							/>
        </div>
      </div>
    </div>

    )

}

export default ServiceAccountDashboard