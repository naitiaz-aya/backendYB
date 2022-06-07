// Framework Web rapide
const express = require("express");
// Mongoose est un outil de modélisation d'objets MongoDB
// conçu pour fonctionner dans un environnement asynchrone.
const mongoose = require("mongoose");
// Dotenv est un module sans dépendance qui charge des variables
// d'environnement à partir d'un .envfichier dans process.env
//const dotenv = require("dotenv")
// Helmet vous aide à sécuriser vos applications
// Express en définissant divers en-têtes HTTP.
const helmet = require("helmet");
// Middleware de l'enregistreur de requêtes HTTP pour node.js
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const path = require("path");
const multer = require("multer");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

//dotenv.config()
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:8800/",
  })
);

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middlware -code that runs before the final route call back.
app.use(express.json());
// app.use(helmet());
app.use(morgan("common"));
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, "public/images");
	},
	filename: (req, file, cb) => {
	  cb(null, req.body.name);
	},
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
	try {
	  return res.status(200).json("File uploded successfully");
	} catch (error) {
	  console.error(error);
	}
  });

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

mongoose
  .connect("mongodb://localhost:27017/socialmedia",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4
})

  .then(() => {
    app.listen(8800, () => {
      console.log(`
			  🚀  Server is running !
			  🔉  Listening on port 8800 !
			  📭  Query at http://localhost:8800/api !
			  👌  Db Connected successfully !
			  `);
    });
  })
  .catch(console.log);
