import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState, useEffect } from "react";

const BookList = ({
	books,
	handleDeleteBook,
	handleEditModal,
	handleViewModal,
	openAddModal,
}) => {
	return (
		<div className="w-full">
			<h2 className="text-2xl font-semibold text-gray-700 mb-4">Books</h2>
			<table className="min-w-full table-auto border-gray-300 mb-4">
				<thead>
					<tr>
						<th className="border-b px-4 py-2 text-left text-gray-700">
							Title
						</th>
						<th className="border-b px-4 py-2 text-left text-gray-700">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{books.map((book) => (
						<tr key={book.isbn} className="border-b">
							<td className="px-4 py-2 text-gray-600">
								<button
									href="#"
									onClick={() => handleViewModal(book)}
									className="flex items-center gap-4"
								>
									<img
										src={book.image || `/book.png`}
										className="w-10 h-10 rounded-full object-cover"
									/>
									<span className="hover:underline">{book.title}</span>
								</button>
							</td>
							<td className="px-4 py-2 text-gray-600">
								<button
									onClick={() => handleDeleteBook(book.id)}
									className="px-2 py-1 rounded-lg"
								>
									<FontAwesomeIcon
										icon={faTrashAlt}
										className=" text-red-700"
									/>
								</button>
								<button
									onClick={() => handleEditModal(book)}
									className="px-2 py-1 rounded-lg"
								>
									<FontAwesomeIcon icon={faEdit} className=" text-gray-700" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="w-full flex justify-center">
				<button
					onClick={openAddModal}
					className="py-2 px-8 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
				>
					Add New Book
				</button>
			</div>
		</div>
	);
};

export default BookList;
