const db = require("../config/db");

const getAllBooks = async () => {
	const [rows] = await db.execute("SELECT * FROM books");
	return rows;
};

const getBookById = async (id) => {
	const [rows] = await db.execute("SELECT * FROM books WHERE id = ?", [id]);
	return rows[0];
};

const createBook = async (book) => {
	const { isbn, title, pages, published, image } = book;
	const [result] = await db.execute(
		"INSERT INTO books (isbn, title, pages, published, image) VALUES (?, ?, ?, ?, ?)",
		[isbn, title, pages, published, image]
	);

	return { ...book, id: result.insertId };
};

const updateBook = async (id, book) => {
	const { isbn, title, pages, published, image } = book;
	await db.execute(
		"UPDATE books SET isbn = ?, title = ?, pages = ?, published = ?, image = ? WHERE id = ?",
		[isbn, title, pages, published, image, id]
	);
};
2;
const deleteBook = async (id) => {
	await db.execute("DELETE FROM books WHERE id = ?", [id]);
};

const getAuthorsForSpecificBook = async (bookId) => {
	const [rows] = await db.execute("SELECT authors FROM books WHERE id = ?", [
		bookId,
	]);
	if (rows.length === 0) return [];
	return JSON.parse(rows[0].authors);
};

module.exports = {
	getAllBooks,
	getBookById,
	createBook,
	updateBook,
	deleteBook,
	getAuthorsForSpecificBook,
};
