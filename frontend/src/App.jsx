// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Books from "./Books";
import Authors from "./Authors";

const App = () => {
	const [books, setBooks] = useState([]);
	const [authors, setAuthors] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/authors")
			.then((response) => {
				console.log("Fetched authors:", response.data);
				setAuthors(response.data);
			})

			.catch((error) => console.error("Error fetching authors:", error));
	}, []);

	// Fetch books on component mount
	useEffect(() => {
		axios
			.get("http://localhost:5000/api/books")
			.then((response) => setBooks(response.data))

			.catch((error) => console.error("Error fetching books:", error));
	}, []);

	return (
		<div className="min-h-screen max-w-full bg-gray-100 p-8 overflow-x-hidden">
			<div className="mx-auto max-w-7xl">
				<h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
					Books and Authors
				</h1>
				<div className="flex flex-wrap  justify-evenly gap-6">
					<Books
						books={books}
						setBooks={setBooks}
						authors={authors}
						setAuthors={setAuthors}
					/>
					<Authors authors={authors} setAuthors={setAuthors} />
				</div>
			</div>
		</div>
	);
};

export default App;
