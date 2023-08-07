import express from "express";
import cors from "cors";
//import functions from "firebase-functions";
import { createEvent, deleteByEventId, getAllEvents, getEventById, updateByEventId } from "./src/event.js";
import { onRequest } from "firebase-functions/v2/https";
import { createUser, deleteByUserId,getUserById, getAllUsers, updateByUserId } from "./src/user.js";

const app = express();
app.use(express.json());
app.use(cors());

//routes:

//user routes:
//app.get("/", (req, res) => res.send("ari 2.0 and ari 1.0"));
app.get('/users', getAllUsers);
app.get('/users/:id',getUserById);
app.post('/users',createUser);//users?
app.patch('/users/:id',updateByUserId);
app.delete('/users/:id',deleteByUserId);

//events routes:
//app.get("/", (req, res) => res.send("ari 2.0 and ari 1.0"));
app.get('/events', getAllEvents);
app.get('/events/:id', getEventById);
app.post('/events', createEvent);
app.patch('/events/:id',updateByEventId);
app.delete('/events/:id',deleteByEventId);


export const api = onRequest(app)
