import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

const Authors = ({ authors, setAuthors }) => {
	const [newAuthor, setNewAuthor] = useState({
		first_name: "",
		last_name: "",
		dob: "",
		image: "",
	});
	const [addModal, setAddModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [viewModal, setViewModal] = useState(false);
	const [currentAuthor, setCurrentAuthor] = useState(false);

	// Handle submitting the form to add a new author
	const handleAuthorSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/api/authors", newAuthor)
			.then((response) => {
				const createdAuthor = { ...newAuthor, id: response.data.id };
				setAuthors([...authors, createdAuthor]);
				setNewAuthor({ first_name: "", last_name: "", dob: "", image: "" });
				setAddModal(false);
			})
			.catch((error) => console.error("Error adding author:", error));
	};

	// Handle editing an author
	const handleEditSubmit = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/authors/${newAuthor.id}`, newAuthor)
			.then((response) => {
				// Update the authors list with the edited data
				setAuthors(
					authors.map((author) =>
						author.id === newAuthor.id ? { ...newAuthor } : author
					)
				);
				setNewAuthor({ first_name: "", last_name: "", dob: "", image: "" });
				setEditModal(false);
			})
			.catch((error) => console.error("Error updating author:", error));
	};

	// Handle deleting an author
	const handleDeleteAuthor = (id) => {
		axios
			.delete(`http://localhost:5000/api/authors/${id}`)
			.then(() => {
				setAuthors(authors.filter((author) => author.id !== id));
			})
			.catch((error) => console.error("Error deleting author:", error));
	};

	// Handle opening the edit modal
	const handleEditModal = (author) => {
		setNewAuthor({
			...author,
			dob: format(new Date(author.dob), "yyyy-MM-dd"),
		});
		setEditModal(true);
	};

	// Handle opening the view modal
	const handleViewModal = (author) => {
		setCurrentAuthor(author);
		setViewModal(true);
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between w-full md:w-1/2 lg:w-1/3">
			<h2 className="text-2xl font-semibold text-gray-700 mb-4">Authors</h2>

			{/* Table to display authors */}
			<table className="min-w-full table-auto  border-gray-300 mb-4">
				<thead>
					<tr>
						<th className="border-b px-4 py-2 text-left text-gray-700">Name</th>

						{/* <th className="border-b px-4 py-2 text-left text-gray-700">
							Date of Birth
						</th> */}

						<th className="border-b px-4 py-2 text-left text-gray-700">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{authors.map((author) => (
						<tr key={author.id} className="border-b">
							<td className=" px-4 py-2 text-gray-600">
								<a
									href="#"
									onClick={() => handleViewModal(author)}
									className="flex items-center gap-4"
								>
									<img
										src={author.image || `/avatar.png`}
										alt="/"
										className="w-10 h-10 rounded-full object-cover align-middle"
									/>
									<span className="hover:underline">
										{author.first_name} {author.last_name}
									</span>
								</a>
							</td>
							{/* <td className=" px-4 py-2 text-gray-600">
								{author.dob
									? format(new Date(author.dob), "yyyy-MM-dd")
									: "N/A"}
							</td> */}
							<td className=" px-4 py-2 text-gray-600">
								<button
									onClick={() => handleDeleteAuthor(author.id)}
									className="px-2 py-1 rounded-lg"
								>
									<FontAwesomeIcon
										icon={faTrashAlt}
										className="w-4 h-4 text-red-700"
									/>
								</button>
								<button
									onClick={() => handleEditModal(author)}
									className="px-2 py-1 rounded-lg"
								>
									<FontAwesomeIcon
										icon={faEdit}
										className="w-4 h-4 text-sm text-gray-700 stroke-transparent "
									/>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Button to trigger modal for adding a new author */}
			<div className="w-full flex justify-center items-center">
				<button
					onClick={() => setAddModal(true)}
					className="py-2 px-8 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-4"
				>
					Add New Author
				</button>
			</div>

			{/* Modal for adding a new author */}
			{addModal && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
						{/* Close Button */}
						<button
							onClick={() => setAddModal(false)}
							className="absolute top-2 right-2 text-gray-700 text-lg font-semibold"
						>
							✕
						</button>
						<h3 className="text-lg font-medium text-gray-700 mb-4">
							Add New Author
						</h3>
						<form onSubmit={handleAuthorSubmit} className="space-y-4">
							<input
								type="text"
								placeholder="First Name"
								value={newAuthor.first_name}
								onChange={(e) =>
									setNewAuthor({ ...newAuthor, first_name: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
							/>
							<input
								type="text"
								placeholder="Last Name"
								value={newAuthor.last_name}
								onChange={(e) =>
									setNewAuthor({ ...newAuthor, last_name: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
							/>
							<input
								type="date"
								placeholder="Date of Birth"
								value={newAuthor.dob}
								onChange={(e) =>
									setNewAuthor({ ...newAuthor, dob: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
							/>
							<input
								type="text"
								placeholder="Image URL"
								value={newAuthor.image}
								onChange={(e) =>
									setNewAuthor({ ...newAuthor, image: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
							/>
							<button
								type="submit"
								className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 w-full"
							>
								Add Author
							</button>
						</form>
					</div>
				</div>
			)}

			{/* Modal for editing an author */}
			{editModal && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
						{/* Close Button */}
						<button
							onClick={() => setEditModal(false)}
							className="absolute top-2 right-2 text-gray-700 text-lg font-semibold"
						>
							✕
						</button>
						<h3 className="text-lg font-medium text-gray-700 mb-4">
							Edit Author
						</h3>
						<form onSubmit={handleEditSubmit} className="space-y-4">
							<input
								type="text"
								placeholder="First Name"
								value={newAuthor.first_name}
								onChange={(e) =>
									setNewAuthor({ ...newAuthor, first_name: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
							/>
							<input
								type="text"
								placeholder="Last Name"
								value={newAuthor.last_name}
								onChange={(e) =>
									setNewAuthor({ ...newAuthor, last_name: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
							/>
							<input
								type="date"
								placeholder="Date of Birth"
								value={format(new Date(newAuthor.dob), "yyyy-MM-dd")}
								onChange={(e) =>
									setNewAuthor({ ...newAuthor, dob: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
							/>
							<input
								type="text"
								placeholder="Image URL"
								value={newAuthor.image}
								onChange={(e) =>
									setNewAuthor({ ...newAuthor, image: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
							/>
							<button
								type="submit"
								className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 w-full"
							>
								Edit Author
							</button>
						</form>
					</div>
				</div>
			)}
			{/* View Modal */}
			{viewModal && currentAuthor && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
						<button
							onClick={() => setViewModal(false)}
							className="absolute top-4 right-4 text-gray-700 text-lg font-semibold"
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
										First Name
									</td>
									<td className="border px-4 py-2 text-gray-600">
										{currentAuthor.first_name}
									</td>
								</tr>
								<tr>
									<td className="border px-4 py-2 font-medium text-gray-700">
										Last Name
									</td>
									<td className="border px-4 py-2 text-gray-600">
										{currentAuthor.last_name}
									</td>
								</tr>
								<tr>
									<td className="border px-4 py-2 font-medium text-gray-700">
										Date of Birth
									</td>
									<td className="border px-4 py-2 text-gray-600">
										{currentAuthor.dob
											? format(new Date(currentAuthor.dob), "yyyy-MM-dd")
											: "N/A"}
									</td>
								</tr>
								<tr>
									<td className="border px-4 py-2 font-medium text-gray-700">
										Image
									</td>
									<td className="border px-4 py-2 text-gray-600">
										<img
											src={currentAuthor.image || "/book.png"}
											alt={currentAuthor.first_name}
											className="w-16 h-16 object-cover"
										/>
									</td>
								</tr>
								<tr>
									<td className="border px-4 py-2 font-medium text-gray-700">
										Books
									</td>
									<td className="border px-4 py-2 text-gray-600">
										{currentAuthor.books ? (
											<ul className="list-disc pl-5">
												{JSON.parse(currentAuthor.books).map((book, index) => (
													<li key={index}>{book}</li>
												))}
											</ul>
										) : (
											"No books available"
										)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
};

export default Authors;
