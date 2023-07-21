import express from "express";
import cors from "cors";
import functions from "firebase-functions"

const app = express ()
app.use(express.json())
app.use(cors())

app.get("/", (req, res)=> res.send("ari 2.0 and ari 1.0"))

export const api = functions.https.onRequest(app)
