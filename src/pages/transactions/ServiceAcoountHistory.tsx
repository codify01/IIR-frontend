import React, { useState } from 'react';
import CardSix from '../../components/card/Cardsix';
import { FaArrowAltCircleDown, FaWindowClose } from 'react-icons/fa';

const apiURL = import.meta.env.VITE_API_URL;

const ServiceAccountHistory: React.FC = () => {
	const [isOpen, setIsOpened] = useState<boolean>(false);

	const handleViewDetails = () => {
		setIsOpened(true);
	};

	return (
		<div>
			<div className="space-y-6">
				<div className="flex md:flex-row flex-col gap-3 justify-between items-center">
					<h3 className="font-bold text-2xl">Transactions</h3>
				</div>

				<div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
						<CardSix
							key={5}
							type={"withdraw"}
							amount={200000}
							date={new Date()}
							category={"transact"}
							onViewDetails={() => handleViewDetails()}
						/>
				</div>
			</div>

			<div
				className={`w-full min-h-full fixed top-0 left-0 bg-black/50 flex items-center justify-center px-5 ${
					isOpen ? 'flex' : 'hidden'
				}`}
			>
				<div className="relative lg:w-2/5 md:w-1/2 w-full bg-white rounded-xl shadow-lg p-6 space-y-5">
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
							<span className="font-semibold">Transaction Type:</span>
							<span className="capitalize text-pry font-medium">1% Charge</span>
						</h3>
						<h3 className="flex justify-between items-center border-b pb-2">
							<span className="font-semibold">Amount:</span>
							<span
								className={'font-bold text-green-800'}
							>
								NGN 20000
							</span>
						</h3>
						<h3 className="flex justify-between items-center border-b pb-2">
							<span className="font-semibold">Description:</span>
							<span className="text-gray-600">
								From Islamiat investment
							</span>
						</h3>
						<h3 className="flex justify-between items-center border-b pb-2">
							<span className="font-semibold">Date:</span>
							<span className="text-gray-600">
								{new Date().toLocaleString()}
							</span>
						</h3>
						<h3 className="flex justify-between items-center">
							<span className="font-semibold">Transaction Ref:</span>
							<span className="text-gray-600">
								{12}
							</span>
						</h3>
					</div>

					{/* Footer */}
					<div className="flex justify-end space-x-4">
						<button
							onClick={() => setIsOpened(false)}
							className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-200"
						>
							Close
						</button>
						<button className="bg-pry text-white px-4 py-2 rounded-lg hover:bg-pry/90 transition-all duration-200">
							Contact Support
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ServiceAccountHistory;
