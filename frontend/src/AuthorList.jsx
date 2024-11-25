import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const AuthorList = ({
	authors,
	handleDeleteAuthor,
	handleEditModal,
	handleViewModal,
	openAddModal,
}) => {
	return (
		<div className="w-full">
			<h2 className="text-2xl font-semibold text-gray-700 mb-4">Authors</h2>
			<table className="min-w-full table-auto border-gray-300">
				<thead>
					<tr>
						<th className="border-b px-4 py-2 text-left text-gray-700">Name</th>
						<th className="border-b px-4 py-2 text-left text-gray-700">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{authors.map((author) => (
						<tr key={author.id} className="border-b">
							<td className="px-4 py-2 text-gray-600">
								<button
									onClick={() => handleViewModal(author)}
									className="flex items-center gap-4"
								>
									<img
										src={author.image || "/avatar.png"}
										alt={author.first_name}
										className="w-10 h-10 rounded-full object-cover"
									/>
									<span className="hover:underline">
										{author.first_name} {author.last_name}
									</span>
								</button>
							</td>
							<td className="px-4 py-2 text-gray-600">
								<button
									onClick={() => handleDeleteAuthor(author.id)}
									className="px-2 py-1 rounded-lg"
								>
									<FontAwesomeIcon icon={faTrashAlt} className="text-red-700" />
								</button>
								<button
									onClick={() => handleEditModal(author)}
									className="px-2 py-1 rounded-lg"
								>
									<FontAwesomeIcon icon={faEdit} className="text-gray-700" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="w-full my-4 flex justify-center">
				<button
					onClick={openAddModal}
					className="py-2 px-8 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
				>
					Add New Author
				</button>
			</div>
		</div>
	);
};

export default AuthorList;
