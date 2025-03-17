import React, { useState, useEffect } from 'react';
import CardSix from '../../components/card/Cardsix';
import { FaArrowAltCircleDown, FaWindowClose } from 'react-icons/fa';
import axios from 'axios';

const apiURL = import.meta.env.VITE_API_URL;

interface Transaction {
	id: string;
	transaction_type: string;
	amount: number;
	category: string;
	status:string;
	created_at: string;
	transaction_id: string;
	description: string;
}

const TransactionHistory: React.FC = () => {
	const [isOpen, setIsOpened] = useState<boolean>(false);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [selectedTransaction, setSelectedTransaction] =
		useState<Transaction | null>(null);

	const fetchTransactions = async () => {
		const userId = localStorage.getItem('ident');
		if (!userId) {
			setError('User ID is missing. Please log in again.');
			setIsLoading(false);
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const response = await axios.post(
				`${apiURL}/each_transaction_history.php`,
				{ user_id: userId },
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('token') || '',
					},
				}
			);
			console.log("transactions response.data", response.data);

			if (
				response.data?.status === 'success' &&
				Array.isArray(response.data.data)
			) {
				setTransactions(response.data.data);
			} else {
				setError(response.data?.message || 'Failed to fetch transactions.');
			}
		} catch (err) {
			console.error('Error fetching transaction history:', err);
			setError('An error occurred while fetching transactions.');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTransactions();
	}, []);

	const handleViewDetails = (transaction: Transaction) => {
		setSelectedTransaction(transaction);
		setIsOpened(true);
	};

	return (
		<div>
			<div className="space-y-6">
				<div className="flex md:flex-row flex-col gap-3 justify-between items-center">
					<h3 className="font-bold text-2xl">Transactions</h3>
				</div>

				<div className="grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
					{isLoading ? (
						<div className="flex justify-center items-center col-span-2">
							<div className="w-10 h-10 border-4 border-dotted border-t-transparent border-pry rounded-full animate-spin"></div>
						</div>
					) : error ? (
						<p className="text-center text-red-500 col-span-2">{error}</p>
					) : transactions.length > 0 ? (
						transactions.map((transaction) => (
							<CardSix
								key={transaction.id}
								type={transaction.transaction_type}
								amount={transaction.amount}
								date={transaction.created_at}
								category={transaction.category}
								onViewDetails={() => handleViewDetails(transaction)}
							/>
						))
					) : (
						<p className="text-center text-gray-500 col-span-2">
							No transaction history available.
						</p>
					)}
				</div>
			</div>

			{selectedTransaction && (
				<div
					className={`w-full min-h-full fixed top-0 left-0 bg-black/50 flex items-center justify-center px-5 ${
						isOpen ? 'flex' : 'hidden'
					}`}
				>
					<div className="relative lg:w-1/3 md:w-1/2 w-full bg-white rounded-xl shadow-lg p-6 space-y-5">
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
								<span className="capitalize text-pry font-medium">
									{selectedTransaction.transaction_type}
								</span>
							</h3>
							<h3 className="flex justify-between items-center border-b pb-2">
								<span className="font-semibold">Amount:</span>
								<span
									className={`font-bold ${
										selectedTransaction.transaction_type === 'deposit'
											? 'text-red-500'
											: 'text-green-500'
									}`}
								>
									NGN {selectedTransaction.amount.toLocaleString('en-NG')}
								</span>
							</h3>
							<h3 className="flex justify-between items-center border-b pb-2">
								<span className="font-semibold">Description:</span>
								<span className="text-gray-600">
									{selectedTransaction.description}
								</span>
							</h3>
							<h3 className="flex justify-between items-center border-b pb-2">
								<span className="font-semibold">Date:</span>
								<span className="text-gray-600">
									{new Date(selectedTransaction.created_at).toLocaleString()}
								</span>
							</h3>
							<h3 className="flex justify-between items-center border-b pb-2">
								<span className="font-semibold">Status:</span>
								<span className={selectedTransaction.status == "pending"?"text-yellow-600":selectedTransaction.status == "approved" || selectedTransaction.status == "successful"? "text-green-600":"text-red-600"}>
									{selectedTransaction.status}
								</span>
							</h3>
							<h3 className="flex justify-between items-center">
								<span className="font-semibold">Transaction Ref:</span>
								<span className="text-gray-600">
									{selectedTransaction.transaction_id}
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
			)}
		</div>
	);
};

export default TransactionHistory;
