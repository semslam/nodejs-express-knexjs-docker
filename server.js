const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: `127.0.01:8000`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); 

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to rock paper scissors game" });
});

require("./app/routes/article.route")(app)

app.all('*', (req, res) => {
  res.status(200).send({ message: "Not Found" });
});
// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


    
  