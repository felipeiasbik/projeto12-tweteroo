import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Olá!!!!")
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));