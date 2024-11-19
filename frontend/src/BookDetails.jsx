import React from "react";

const BookDetails = ({ book, closeModal }) => {
	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
				<button
					onClick={closeModal}
					className="absolute top-4 right-4 text-gray-700 text-lg font-semibold"
				>
					✕
				</button>
				<h3 className="text-lg font-medium text-gray-700 mb-4">Book Details</h3>
				<table className="min-w-full border-collapse border border-gray-300">
					<tbody>
						<tr>
							<td className="border px-4 py-2 font-medium text-gray-700">
								ISBN
							</td>
							<td className="border px-4 py-2 text-gray-600">{book.isbn}</td>
						</tr>
						<tr>
							<td className="border px-4 py-2 font-medium text-gray-700">
								Title
							</td>
							<td className="border px-4 py-2 text-gray-600">{book.title}</td>
						</tr>
						<tr>
							<td className="border px-4 py-2 font-medium text-gray-700">
								Pages
							</td>
							<td className="border px-4 py-2 text-gray-600">{book.pages}</td>
						</tr>
						<tr>
							<td className="border px-4 py-2 font-medium text-gray-700">
								Published
							</td>
							<td className="border px-4 py-2 text-gray-600">
								{book.published}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default BookDetails;
