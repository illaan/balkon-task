import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import AuthorDetails from "./AuthorDetails";
import AuthorList from "./AuthorList";

const Authors = () => {
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

	const [authors, setAuthors] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/authors")
			.then((response) => {
				console.log("Fetched authors:", response.data);
				setAuthors(response.data);
			})

			.catch((error) => console.error("Error fetching authors:", error));
	}, [authors.length]);

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
			<AuthorList
				authors={authors}
				handleDeleteAuthor={handleDeleteAuthor}
				handleEditModal={handleEditModal}
				handleViewModal={handleViewModal}
				openAddModal={() => setAddModal(true)}
			/>
			{/* Modal for adding a new author */}
			{addModal && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
						{/* Close Button */}
						<button
							onClick={() => {
								setNewAuthor({
									first_name: "",
									last_name: "",
									dob: "",
									image: "",
								});
								setAddModal(false);
							}}
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
								required
								onChange={(e) =>
									setNewAuthor({ ...newAuthor, first_name: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
							/>
							<input
								type="text"
								placeholder="Last Name"
								value={newAuthor.last_name}
								required
								onChange={(e) =>
									setNewAuthor({ ...newAuthor, last_name: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
							/>
							<input
								type="date"
								placeholder="Date of Birth"
								value={newAuthor.dob}
								required
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
							onClick={() => {
								setEditModal(false);
								setNewAuthor({
									first_name: "",
									last_name: "",
									dob: "",
									image: "",
								});
							}}
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
				<AuthorDetails
					id={currentAuthor.id}
					closeModal={() => setViewModal(false)}
				/>
			)}
		</div>
	);
};

export default Authors;
