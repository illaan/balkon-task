import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const AuthorList = ({ authors, onEdit, onDelete, onView }) => {
	return (
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
							<a
								href="#"
								onClick={() => onView(author)}
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
							</a>
						</td>
						<td className="px-4 py-2 text-gray-600">
							<button
								onClick={() => onDelete(author.id)}
								className="px-2 py-1 rounded-lg"
							>
								<FontAwesomeIcon icon={faTrashAlt} className="text-red-700" />
							</button>
							<button
								onClick={() => onEdit(author)}
								className="px-2 py-1 rounded-lg"
							>
								<FontAwesomeIcon icon={faEdit} className="text-gray-700" />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default AuthorList;
