import express from "express";
const app = express();

app.get("/", (_req, res) => res.json({ message: "Hello to core package" }));

export { app };
