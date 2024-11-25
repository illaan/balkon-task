const db = require("../config/db");

const getAllAuthors = async () => {
	const [rows] = await db.execute("SELECT * FROM authors");
	return rows;
};

const getAuthorById = async (id) => {
	const [rows] = await db.execute("SELECT * FROM authors WHERE id = ?", [id]);

	return rows[0];
};

const createAuthor = async (author) => {
	const { first_name, last_name, dob, image } = author;
	const [result] = await db.execute(
		"INSERT INTO authors (first_name, last_name, dob, image) VALUES (?, ?, ?, ?)",
		[first_name, last_name, dob, image]
	);

	return { ...author, id: result.insertId };
};

const updateAuthor = async (id, author) => {
	const { first_name, last_name, dob, image } = author;
	await db.execute(
		"UPDATE authors SET first_name = ?, last_name = ?, dob = ?, image = ? WHERE id = ?",
		[first_name, last_name, dob, image, id]
	);
};

const deleteAuthor = async (id) => {
	await db.execute("DELETE FROM authors WHERE id = ?", [id]);
};

const getBooksForSpecificAuthor = async (authorId) => {
	const [rows] = await db.execute("SELECT books FROM authors WHERE id = ?", [
		authorId,
	]);
	if (rows.length === 0) return [];
	return JSON.parse(rows[0].books);
};

module.exports = {
	getAllAuthors,
	getAuthorById,
	createAuthor,
	updateAuthor,
	deleteAuthor,
	getBooksForSpecificAuthor,
};
