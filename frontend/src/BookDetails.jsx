import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const BookDetails = ({ id, closeModal }) => {
	const [book, setBook] = useState(null);
	const [authors, setAuthors] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/books/${id}`)
			.then((response) => {
				if (response.data) {
					setBook(response.data);
				} else {
					console.log("No data returned for this book.");
				}
			})
			.catch((err) => {
				console.error("Error fetching book:", err);
			});
	}, [id]);
	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/books/${id}/authors`)
			.then((response) => {
				if (response.data) {
					console.log(response.data, "response.data for authors array");
					setAuthors(response.data);
				} else {
					console.log("No authors found for this book.");
				}
			})
			.catch((err) => {
				console.error("Error fetching authors:", err);
			});
	}, [id]);

	if (!book) {
		return <div>Loading...</div>;
	}

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
						<tr>
							<td className="border px-4 py-2 font-medium text-gray-700">
								Image
							</td>
							<td className="border px-4 py-2 text-gray-600">
								<img
									src={book.image || "/book.png"}
									alt="Author"
									className="w-12"
								/>
							</td>
						</tr>
						<tr>
							<td className="border px-4 py-2 font-medium text-gray-700">
								Book/s
							</td>
							<td className="border px-4 py-2 text-gray-600">
								{authors.length > 0 ? (
									<ul className="list-disc list-inside text-gray-600">
										{authors.map((author, index) => (
											<li key={index}>
												{author.first_name}
												&nbsp;
												{author.last_name}
											</li>
										))}
									</ul>
								) : (
									<p className="text-gray-600">
										No authors found for this book.
									</p>
								)}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default BookDetails;
