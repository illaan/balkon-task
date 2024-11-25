const express = require("express");

const {
	getAllBooks,
	getBookById,
	createBook,
	updateBook,
	deleteBook,
	getAuthorsForSpecificBook,
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

router.get("/books/:id", async (req, res) => {
	const book = await getBookById(req.params.id);
	if (!book) return res.status(404).json({ message: "Book not found" });
	res.json(book);
});

router.put("/books/:id", async (req, res) => {
	await updateBook(req.params.id, req.body);
	res.json({ message: "Book updated" });
});

router.delete("/books/:id", async (req, res) => {
	await deleteBook(req.params.id);
	res.json({ message: "Book deleted" });
});

router.get("/books/:id/authors", async (req, res) => {
	const { id } = req.params;

	try {
		const authors = await getAuthorsForSpecificBook(id);
		if (authors.length === 0) {
			return res.status(404).json({ error: "Book not found or no authors." });
		}
		res.json(authors);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal server error." });
	}
});

module.exports = router;
