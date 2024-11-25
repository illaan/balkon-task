const express = require("express");
const {
	getAllAuthors,
	getAuthorById,
	createAuthor,
	updateAuthor,
	deleteAuthor,
	getBooksForSpecificAuthor,
} = require("../models/author");
const router = express.Router();

router.get("/authors", async (req, res) => {
	const authors = await getAllAuthors();
	res.json(authors);
});

router.post("/authors", async (req, res) => {
	await createAuthor(req.body);
	res.status(201).json(res.data);
});

router.get("/authors/:id", async (req, res) => {
	const author = await getAuthorById(req.params.id);
	if (!author) return res.status(404).json({ message: "Author not found" });
	res.json(author);
});

router.put("/authors/:id", async (req, res) => {
	await updateAuthor(req.params.id, req.body);
	res.json({ message: "Author updated" });
});

router.delete("/authors/:id", async (req, res) => {
	await deleteAuthor(req.params.id);
	res.json({ message: "Author deleted" });
});

router.get("/authors/:id/books", async (req, res) => {
	const { id } = req.params;

	try {
		const books = await getBooksForSpecificAuthor(id);
		if (books.length === 0) {
			return res.status(404).json({ error: "Book not found or no authors." });
		}
		res.json(books);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Internal server error." });
	}
});

module.exports = router;
