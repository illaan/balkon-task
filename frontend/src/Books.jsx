import React, { useState, useEffect } from "react";
import axios from "axios";
import BookList from "./BookList";
import BookDetails from "./BookDetails";

const Books = () => {
	const [newBook, setNewBook] = useState({
		isbn: "",
		title: "",
		pages: "",
		published: "",
		image: "",
	});
	const [addModal, setAddModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [viewModal, setViewModal] = useState(false);
	const [currentBook, setCurrentBook] = useState(null);
	const [books, setBooks] = useState([]);

	// Fetch books on component mount
	useEffect(() => {
		axios
			.get("http://localhost:5000/api/books")
			.then((response) => setBooks(response.data))

			.catch((error) => console.error("Error fetching books:", error));
	}, [books.length]);

	// Handle submitting the form to add a new book
	const handleBookSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/api/books", newBook)
			.then(() => {
				setBooks([...books, newBook]);
				setNewBook({
					isbn: "",
					title: "",
					pages: "",
					published: "",
					image: "",
				});
				setAddModal(false);
			})
			.catch((error) => console.error("Error adding book:", error));
	};

	// Handle submitting the form to edit a book
	const handleEditSubmit = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/books/${newBook.id}`, newBook)
			.then(() => {
				const updatedBooks = books.map((book) =>
					book.id === newBook.id ? newBook : book
				);
				setBooks(updatedBooks);
				setNewBook({
					isbn: "",
					title: "",
					pages: "",
					published: "",
					image: "",
				});
				setEditModal(false);
			})
			.catch((error) => console.error("Error updating book:", error));
	};

	const handleDeleteBook = (id) => {
		axios
			.delete(`http://localhost:5000/api/books/${id}`)
			.then(() => {
				setBooks(books.filter((book) => book.id !== id));
			})
			.catch((error) => console.error("Error deleting book:", error));
	};

	// Handle opening the edit modal
	const handleEditModal = (book) => {
		setNewBook(book);
		setEditModal(true);
	};

	// Handle opening the view modal
	const handleViewModal = (book) => {
		setCurrentBook(book);
		setViewModal(true);
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between w-full md:w-1/2 lg:w-1/3">
			<BookList
				books={books}
				handleDeleteBook={handleDeleteBook}
				handleEditModal={handleEditModal}
				handleViewModal={handleViewModal}
				openAddModal={() => setAddModal(true)}
			/>

			{/* Add Modal */}
			{addModal && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
						<button
							onClick={() => {
								setNewBook({
									isbn: "",
									title: "",
									pages: "",
									published: "",
									image: "",
								});
								setAddModal(false);
							}}
							className="absolute top-4 right-4 text-gray-700 text-lg font-semibold"
						>
							✕
						</button>
						<h3 className="text-lg font-medium text-gray-700 mb-4">
							Add New Book
						</h3>
						<form onSubmit={handleBookSubmit} className="space-y-4">
							<input
								type="text"
								placeholder="ISBN"
								value={newBook.isbn}
								required
								onChange={(e) =>
									setNewBook({ ...newBook, isbn: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							<input
								type="text"
								placeholder="Title"
								value={newBook.title}
								required
								onChange={(e) =>
									setNewBook({ ...newBook, title: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							<input
								type="number"
								step={10}
								placeholder="Pages"
								value={newBook.pages}
								required
								onChange={(e) =>
									setNewBook({ ...newBook, pages: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							<input
								type="number"
								step={100}
								placeholder="Published Year"
								value={newBook.published}
								required
								onChange={(e) =>
									setNewBook({ ...newBook, published: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							<input
								type="text"
								placeholder="Image URL"
								value={newBook.image}
								onChange={(e) =>
									setNewBook({ ...newBook, image: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							<button
								type="submit"
								className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
							>
								Add Book
							</button>
						</form>
					</div>
				</div>
			)}

			{/* Edit Modal */}
			{editModal && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
						<button
							onClick={() => {
								setEditModal(false);
								setNewBook({
									isbn: "",
									title: "",
									pages: "",
									published: "",
									image: "",
								});
							}}
							className="absolute top-4 right-4 text-gray-700 text-lg font-semibold"
						>
							✕
						</button>
						<h3 className="text-lg font-medium text-gray-700 mb-4">
							Edit Book
						</h3>
						<form onSubmit={handleEditSubmit} className="space-y-4">
							<input
								type="text"
								placeholder="ISBN"
								value={newBook.isbn}
								onChange={(e) =>
									setNewBook({ ...newBook, isbn: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							<input
								type="text"
								placeholder="Title"
								value={newBook.title}
								onChange={(e) =>
									setNewBook({ ...newBook, title: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							<input
								type="number"
								placeholder="Pages"
								value={newBook.pages}
								onChange={(e) =>
									setNewBook({ ...newBook, pages: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							<input
								type="number"
								placeholder="Published Year"
								value={newBook.published}
								onChange={(e) =>
									setNewBook({ ...newBook, published: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							<input
								type="text"
								placeholder="Image URL"
								value={newBook.image}
								onChange={(e) =>
									setNewBook({ ...newBook, image: e.target.value })
								}
								className="w-full p-2 border border-gray-300 rounded-lg"
							/>
							<button
								type="submit"
								className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 w-full"
							>
								Edit Book
							</button>
						</form>
					</div>
				</div>
			)}

			{/* View Modal */}
			{viewModal && currentBook && (
				<BookDetails
					id={currentBook.id}
					closeModal={() => setViewModal(false)}
				/>
			)}
		</div>
	);
};

export default Books;
