import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

const AuthorDetails = ({ id, closeModal }) => {
	const [author, setAuthor] = useState(null);
	const [books, setBooks] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/authors/${id}`)
			.then((response) => {
				if (response.data) {
					setAuthor(response.data);
				} else {
					console.log("No data returned for this author.");
				}
			})
			.catch((err) => {
				console.error("Error fetching author:", err);
			});
	}, [id]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/authors/${id}/books`)
			.then((response) => {
				if (response.data) {
					console.log(response.data, "response.data for authors array");
					setBooks(response.data);
				} else {
					console.log("No authors found for this book.");
				}
			})
			.catch((err) => {
				console.error("Error fetching authors:", err);
			});
	}, [id]);

	if (!author) {
		return <div>Loading...</div>;
	}

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
				<button
					onClick={closeModal}
					className="absolute top-2 right-2 text-gray-700 text-lg font-semibold"
				>
					✕
				</button>
				<h3 className="text-lg font-medium text-gray-700 mb-4">
					Author Details
				</h3>
				<table className="min-w-full border-collapse border border-gray-300">
					<tbody>
						<tr>
							<td className="border px-4 py-2 font-medium text-gray-700">
								First name
							</td>
							<td className="border px-4 py-2 text-gray-600">
								{author.first_name}
							</td>
						</tr>
						<tr>
							<td className="border px-4 py-2 font-medium text-gray-700">
								Last name
							</td>
							<td className="border px-4 py-2 text-gray-600">
								{author.last_name}
							</td>
						</tr>
						<tr>
							<td className="border px-4 py-2 font-medium text-gray-700">
								Date of Birth
							</td>
							<td className="border px-4 py-2 text-gray-600">
								{format(new Date(author.dob), "yyyy-MM-dd")}
							</td>
						</tr>
						<tr>
							<td className="border px-4 py-2 font-medium text-gray-700">
								Image
							</td>
							<td className="border px-4 py-2 text-gray-600">
								<img
									src={author.image || "/avatar.png"}
									alt="Author"
									className="w-12"
								/>
							</td>
						</tr>
						<tr>
							<td className="border px-4 py-2 font-medium text-gray-700">
								Author/s
							</td>
							<td className="border px-4 py-2 text-gray-600">
								{books.length > 0 ? (
									<ul className="list-disc list-inside text-gray-600">
										{books.map((book, index) => (
											<li key={index}>{book.title}</li>
										))}
									</ul>
								) : (
									<p className="text-gray-600">
										No books found for this author.
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

export default AuthorDetails;
