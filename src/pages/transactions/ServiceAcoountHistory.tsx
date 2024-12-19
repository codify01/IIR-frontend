// import React, { useEffect, useState } from 'react';
// import CardSix from '../../components/card/Cardsix';
// import { FaArrowAltCircleDown, FaWindowClose } from 'react-icons/fa';
// import axios from 'axios';

// const apiURL = import.meta.env.VITE_API_URL;

// interface ResultProps {
// 	id:number;
// 	investment_amount: number;
// 	investment_id:string;
// 	investor_name: number;
// 	service_fee: number;
// 	user_id: number;
// }

// const ServiceAccountHistory: React.FC = () => {
// 	const [isOpen, setIsOpened] = useState<boolean>(false);
// 	const [result, setResult] = useState<ResultProps[]>([]);
// 	const [isLoading, setIsLoading] = useState<boolean>(false);

// 	const handleViewDetails = () => {
// 		setIsOpened(true);
// 	};

// 	useEffect(() => {
// 		const fetchData = async () => {
// 		  setIsLoading(true)
		  
// 		  try {
// 			const response = await axios.post(`${apiURL}/serviceAccount.php`);
// 			console.log("response data", response.data);
// 			if (response.data.status === "success") {
// 			  try {
// 				const response2 = await axios.post(`${apiURL}/allService.php`);
// 				console.log("response2 data", response2.data);
// 				console.log("response2 data data", response2.data.data);
// 				setResult(response2.data.data)
// 				console.log("result", result);
				
// 			  } catch (error) {
// 				console.error("Error fetching data:", error);
// 			  }
// 			}
// 		  } catch (error) {
// 			console.error("Error fetching data:", error);
// 		  } finally {
// 			setIsLoading(false)
// 		  }
// 		};
		
		
// 		fetchData();
// 		console.log(result);
// 	  }, []);

// 	return (
// 		<div>
// 			<div className="space-y-6">
// 				<div className="flex md:flex-row flex-col gap-3 justify-between items-center">
// 					<h3 className="font-bold text-2xl">Transactions</h3>
// 				</div>

// 				<div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
// 					{
// 						result.map(({id, investment_amount, investment_id, investor_name, service_fee, user_id}, index) => (
// 							<CardSix
// 								key={index}
// 								type={"withdraw"}
// 								amount={service_fee}
// 								date={new Date()}
// 								category={"transact"}
// 								onViewDetails={() => handleViewDetails(id)}
// 							/>
// 						))
// 					}
// 				</div>
// 			</div>

// 			<div
// 				className={`w-full min-h-full fixed top-0 left-0 bg-black/50 flex items-center justify-center px-5 ${
// 					isOpen ? 'flex' : 'hidden'
// 				}`}
// 			>
// 				<div className="relative lg:w-2/5 md:w-1/2 w-full bg-white rounded-xl shadow-lg p-6 space-y-5">
// 					{/* Close Button */}
// 					<button
// 						onClick={() => setIsOpened(false)}
// 						className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-all duration-200"
// 					>
// 						<FaWindowClose className="text-2xl" />
// 					</button>

// 					{/* Icon */}
// 					<div className="flex items-center justify-center">
// 						<FaArrowAltCircleDown className="text-pry text-5xl" />
// 					</div>

// 					{/* Transaction Details */}
// 					<div className="space-y-4 text-gray-700">
// 						<h3 className="flex justify-between items-center border-b pb-2">
// 							<span className="font-semibold">Transaction Type:</span>
// 							<span className="capitalize text-pry font-medium">1% Charge</span>
// 						</h3>
// 						<h3 className="flex justify-between items-center border-b pb-2">
// 							<span className="font-semibold">Amount:</span>
// 							<span
// 								className={'font-bold text-green-800'}
// 							>
// 								NGN 20000
// 							</span>
// 						</h3>
// 						<h3 className="flex justify-between items-center border-b pb-2">
// 							<span className="font-semibold">Description:</span>
// 							<span className="text-gray-600">
// 								From Islamiat investment
// 							</span>
// 						</h3>
// 						<h3 className="flex justify-between items-center border-b pb-2">
// 							<span className="font-semibold">Date:</span>
// 							<span className="text-gray-600">
// 								{new Date().toLocaleString()}
// 							</span>
// 						</h3>
// 						<h3 className="flex justify-between items-center">
// 							<span className="font-semibold">Transaction Ref:</span>
// 							<span className="text-gray-600">
// 								{12}
// 							</span>
// 						</h3>
// 					</div>

// 					{/* Footer */}
// 					<div className="flex justify-end space-x-4">
// 						<button
// 							onClick={() => setIsOpened(false)}
// 							className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-200"
// 						>
// 							Close
// 						</button>
// 						<button className="bg-pry text-white px-4 py-2 rounded-lg hover:bg-pry/90 transition-all duration-200">
// 							Contact Support
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ServiceAccountHistory;




import React, { useEffect, useState } from 'react';
import CardSix from '../../components/card/Cardsix';
import axios from 'axios';
import { FaArrowAltCircleDown, FaWindowClose } from 'react-icons/fa';

const apiURL = import.meta.env.VITE_API_URL;

interface ResultProps {
  id: number;
  investment_amount: number;
  investment_id: string;
  investor_name: string;
  service_fee: number;
  user_id: number;
  created_at: string;
}

const ServiceAccountHistory: React.FC = () => {
  const [result, setResult] = useState<ResultProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<ResultProps | null>(null);
  const [isOpen, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.post(`${apiURL}/allService.php`);
        if (response.data.status === "success") {
          setResult(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setTimeout(() => {
		// }, 10000)
		setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(result.length / itemsPerPage);
  const paginatedData = result.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (transaction: ResultProps) => {
	setSelectedTransaction(transaction);
	setIsOpened(true);
  };

	const formatAccountBalance = (amount: number) => {
		return `NGN ${amount.toLocaleString('en-NG')}`;
	};

  return (

    <div>
      	<div className="space-y-6">
			<h3 className="font-bold text-2xl">Transactions</h3>

			{isLoading ? (
			<div className="flex justify-center items-center h-[150px]">
				<div className="w-10 h-10 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></div>
				</div>
			) : (
			<div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-4">
				{paginatedData.map((transaction, index) => (
				<CardSix
					key={index}
					type={"1% Service Charge"}
					amount={Number(transaction.service_fee)}
					date={transaction.created_at}
					category={"investment"}
					onViewDetails={() => handleViewDetails(transaction)}
				/>
				))}
			</div>
			)}

			{/* Pagination Controls */}
			<div className="flex justify-center items-center space-x-2 mb-10">
			<button
				disabled={currentPage === 1 || isLoading}
				onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
				className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 disabled:bg-gray-300"
			>
				Previous
			</button>
			<span className="font-medium">
				Page {currentPage} of {totalPages}
			</span>
			<button
				disabled={currentPage === totalPages || isLoading}
				onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
				className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 disabled:bg-gray-300"
			>
				Next
			</button>
			</div>
		</div>

	  	{selectedTransaction && (
			<div
				className={`w-full min-h-full fixed top-0 left-0 bg-black/50 flex items-center justify-center px-5 ${
					isOpen ? 'flex' : 'hidden'
				}`}
			>
				<div className="relative lg:w-2/5 md:w-3/5 w-full bg-white rounded-xl shadow-lg p-6 space-y-5">
					{/* Close Button */}
					<button
						onClick={() => setIsOpened(false)}
						className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-all duration-200"
					>
						<FaWindowClose className="text-2xl" />
					</button>

					{/* Icon */}
					<div className="flex items-center justify-center">
						<FaArrowAltCircleDown className="text-pry text-5xl" />
					</div>

					{/* Transaction Details */}
					<div className="space-y-4 text-gray-700">
						<h3 className="flex justify-between items-center border-b pb-2">
							<span className="font-semibold">Service Charge:</span>
							<span className="text-green-900 font-bold">
								{formatAccountBalance(Number(selectedTransaction.service_fee))}
							</span>
						</h3>
						<h3 className="flex justify-between items-center border-b pb-2">
							<span className="font-semibold">Transaction Type:</span>
							<span className="capitalize font-medium">
								{formatAccountBalance(Number(selectedTransaction.investment_amount))}
							</span>
						</h3>
						<h3 className="flex justify-between items-center border-b pb-2">
							<span className="font-semibold">Date:</span>
							<span className="text-gray-600">
								{selectedTransaction.created_at}
							</span>
						</h3>
						<h3 className="border-b pb-2 flex justify-between items-center">
							<span className="font-semibold">Investment ID:</span>
							<span className="text-gray-600">
								{selectedTransaction.investment_id}
							</span>
						</h3>
						<h3 className="border-b pb-2">
							<span className="font-semibold me-2">Description:</span>
							<span className="text-gray-600">
								{`Service charge of 1.5% when user ${selectedTransaction.user_id} invested ${formatAccountBalance(Number(selectedTransaction.investment_amount))} on ${new Date(selectedTransaction.created_at)}`}
							</span>
						</h3>
					</div>

					{/* Footer */}
					<div className="text-center">
						<button
							onClick={() => setIsOpened(false)}
							className="bg-pry/20 font-medium hover:bg-gray-200 w-1/2 text-gray-700 px-4 py-2 rounded-lg transition-all duration-200"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		)}
    </div>

  );
};

export default ServiceAccountHistory;

