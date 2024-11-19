// import React, { useState, useEffect } from "react";

// const BookForm = ({ id, books, closeModal, saveBook }) => {
// 	const [formData, setFormData] = useState({
// 		isbn: "",
// 		title: "",
// 		pages: "",
// 		published: "",
// 		image: "",
// 	});

// 	// Prepopulate fields if editing
// 	useEffect(() => {
// 		if (id) {
// 			const bookToEdit = books.find((book) => book.isbn === id);
// 			if (bookToEdit) {
// 				setFormData(bookToEdit);
// 			//
// 		}
// 	}, [id, books]);

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		setFormData((prev) => ({ ...prev, [name]: value }));
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		saveBook(formData);
// 	};

// 	return (
// 		<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
// 			<div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
// 				<button
// 					onClick={closeModal}
// 					className="absolute top-4 right-4 text-gray-700 text-lg font-semibold"
// 				>
// 					✕
// 				</button>
// 				<h3 className="text-lg font-medium text-gray-700 mb-4">
// 					{id ? "Edit Book" : "Add New Book"}
// 				</h3>
// 				<form onSubmit={handleSubmit} className="space-y-4">
// 					<input
// 						type="text"
// 						name="isbn"
// 						placeholder="ISBN"
// 						value={formData.isbn}
// 						onChange={handleChange}
// 						disabled={!!id} // Disable ISBN in edit mode
// 						className="w-full p-2 border border-gray-300 rounded-lg"
// 					/>
// 					<input
// 						type="text"
// 						name="title"
// 						placeholder="Title"
// 						value={formData.title}
// 						onChange={handleChange}
// 						className="w-full p-2 border border-gray-300 rounded-lg"
// 					/>
// 					<input
// 						type="number"
// 						name="pages"
// 						placeholder="Pages"
// 						value={formData.pages}
// 						onChange={handleChange}
// 						className="w-full p-2 border border-gray-300 rounded-lg"
// 					/>
// 					<input
// 						type="number"
// 						name="published"
// 						placeholder="Published Year"
// 						value={formData.published}
// 						onChange={handleChange}
// 						className="w-full p-2 border border-gray-300 rounded-lg"
// 					/>
// 					<input
// 						type="text"
// 						name="image"
// 						placeholder="Image URL"
// 						value={formData.image}
// 						onChange={handleChange}
// 						className="w-full p-2 border border-gray-300 rounded-lg"
// 					/>
// 					<button
// 						type="submit"
// 						className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
// 					>
// 						{id ? "Save Changes" : "Add Book"}
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default BookForm;
