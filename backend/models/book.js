const db = require("../config/db");

const getAllBooks = async () => {
	const [rows] = await db.execute("SELECT * FROM books");
	return rows;
};

const getBookByIsbn = async (isbn) => {
	const [rows] = await db.execute("SELECT * FROM books WHERE isbn = ?", [isbn]);
	return rows[0];
};

const createBook = async (book) => {
	const { isbn, title, pages, published, image } = book;
	await db.execute(
		"INSERT INTO books (isbn, title, pages, published, image) VALUES (?, ?, ?, ?, ?)",
		[isbn, title, pages, published, image]
	);
};

const updateBook = async (isbn, book) => {
	const { title, pages, published, image } = book;
	await db.execute(
		"UPDATE books SET title = ?, pages = ?, published = ?, image = ? WHERE isbn = ?",
		[title, pages, published, image, isbn]
	);
};

const deleteBook = async (isbn) => {
	await db.execute("DELETE FROM books WHERE isbn = ?", [isbn]);
};

module.exports = {
	getAllBooks,
	getBookByIsbn,
	createBook,
	updateBook,
	deleteBook,
};
