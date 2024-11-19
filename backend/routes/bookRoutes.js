const express = require("express");
const {
	getAllBooks,
	getBookByIsbn,
	createBook,
	updateBook,
	deleteBook,
} = require("../models/book");
const router = express.Router();

router.get("/books", async (req, res) => {
	const books = await getAllBooks();
	res.json(books);
});

router.post("/books", async (req, res) => {
	await createBook(req.body);
	res.status(201).json({ message: "Book created" });
});

router.get("/books/:isbn", async (req, res) => {
	const book = await getBookByIsbn(req.params.isbn);
	if (!book) return res.status(404).json({ message: "Book not found" });
	res.json(book);
});

router.put("/books/:isbn", async (req, res) => {
	await updateBook(req.params.isbn, req.body);
	res.json({ message: "Book updated" });
});

router.delete("/books/:isbn", async (req, res) => {
	await deleteBook(req.params.isbn);
	res.json({ message: "Book deleted" });
});

router.get("/books/:idBook/authors", async (req, res) => {
	const { idBook } = req.params;

	try {
		const authors = await db.query(
			`
					SELECT a.* FROM authors a
					JOIN book_authors ba ON a.id = ba.author_id
					WHERE ba.book_id = ?
			`,
			[idBook]
		);

		if (authors.length === 0) {
			return res
				.status(404)
				.json({ message: "No authors found for this book" });
		}

		res.status(200).json(authors);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error retrieving authors for book", error });
	}
});

router.post("/books/:idBook/authors", async (req, res) => {
	const { idBook } = req.params;
	const { authorId } = req.body;

	try {
		// Ensure book and author exist
		const bookExists = await db.query("SELECT * FROM books WHERE id = ?", [
			idBook,
		]);
		const authorExists = await db.query("SELECT * FROM authors WHERE id = ?", [
			authorId,
		]);

		if (!bookExists.length || !authorExists.length) {
			return res.status(404).json({ message: "Book or author not found" });
		}

		// Link author to the book
		await db.query(
			"INSERT INTO book_authors (book_id, author_id) VALUES (?, ?)",
			[idBook, authorId]
		);

		res.status(200).json({ message: "Author added to book" });
	} catch (error) {
		res.status(500).json({ message: "Error linking author to book", error });
	}
});

router.delete("/books/:idBook/authors/:idAuthor", async (req, res) => {
	const { idBook, idAuthor } = req.params;

	try {
		// Ensure the book-author relationship exists
		const result = await db.query(
			"DELETE FROM book_authors WHERE book_id = ? AND author_id = ?",
			[idBook, idAuthor]
		);

		if (result.affectedRows === 0) {
			return res.status(404).json({ message: "Relationship not found" });
		}

		res.status(200).json({ message: "Author removed from book" });
	} catch (error) {
		res.status(500).json({ message: "Error removing author from book", error });
	}
});

module.exports = router;
