const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");

const app = express();

const corsOptions = {
	origin: "http://localhost:5173", // Only allow requests from frontend on localhost:3000
	methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
	allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", bookRoutes);
app.use("/api", authorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
