import express from "express";
const PORT = 3210;
const app = express();
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.send("Hello, CIS 3308 from Express!");
});
app.get("/greet", (req, res) => {
    const queryParams = req.query;
    console.log(queryParams);
    const name = req.query.name;
    res.send(`Hello, ${name}`);
});
app.get("/example", (req, res) => {
    res.send("Example GET endpoint!");
});
app.post("/example", (req, res) => {
    res.send("Example POST endpoint!");
});
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}...`);
});
//# sourceMappingURL=main.js.map