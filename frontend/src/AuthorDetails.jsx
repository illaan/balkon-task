import React from "react";

const AuthorDetails = ({
	modalType,
	author,
	setAuthor,
	onSubmit,
	onClose,
}) => {
	const isViewMode = modalType === "view";

	return (
		<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-md w-96 relative">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-700 text-lg font-semibold"
				>
					✕
				</button>
				<h3 className="text-lg font-medium text-gray-700 mb-4">
					{modalType === "add"
						? "Add New Author"
						: modalType === "edit"
						? "Edit Author"
						: "Author Details"}
				</h3>
				{isViewMode ? (
					<div>
						<p><strong>First Name:</strong> {author.first_name}</p>
						<p><strong>Last Name:</strong> {author.last_name}</p>
						<p><strong>Date of Birth:</strong> {author.dob}</p>
						<p><strong>Image:</strong></p>
						<img src={author.image || "/avatar.png"} alt="Author" className="w-20 h-20 rounded-full" />
					</div>
				) : (
					<form onSubmit={onSubmit} className="space-y-4">
						<input
							type="text"
							placeholder="First Name"
							value={author.first_name}
							onChange={(e) =>
								setAuthor({ ...author, first_name: e.target.value })
							}
							className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
						/>
						<input
							type="text"
							placeholder="Last Name"
							value={author.last_name}
							onChange={(e) =>
								setAuthor({ ...author, last_name: e.target.value })
							}
							className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
						/>
						<input
							type="date"
							placeholder="Date of Birth"
							value={author.dob}
							onChange={(e) =>
								setAuthor({ ...author, dob: e.target.value })
							}
							className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
						/>
						<input
							type="text"
							placeholder="Image URL"
							value={author.image}
							onChange={(e) =>
								setAuthor({ ...author, image: e.target.value })
							}
							className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
						/>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
						>
							{modalType === "add" ? "Add Author" : "Save Changes"}
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default AuthorDetails;
