// src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Books from "./Books";
import Authors from "./Authors";

const App = () => {
	return (
		<div className="min-h-screen max-w-full bg-gray-100 p-8 overflow-x-hidden">
			<div className="mx-auto max-w-7xl">
				<h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
					Books and Authors
				</h1>
				<div className="flex flex-wrap  justify-evenly gap-6">
					<Books />
					<Authors />
				</div>
			</div>
		</div>
	);
};

export default App;
