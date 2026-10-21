import express from "express";

const PORT = 3210

const app = express();

// serve static files from the "public" directory
app.use(express.static("public"))

//// ENDPOINTS /////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Hello, CIS 3308 from Express!");
});

app.get("/greet", (req, res) => {
  const queryParams = req.query;
  console.log(queryParams);
  const name = req.query.name;
  res.send(`Hello, ${name}!`);
});

app.get("/example", (req, res) => {
  res.send("Example GET Endpoint");
})

app.post("/example", (req, res) => {
  res.send("Example POST endpoint");
})

////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}...`);
});