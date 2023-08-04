import { ObjectId } from "mongodb";
import { mongo_creds } from "../secrets.js";
import { dbConnect } from "./db/connect.js";

const db = dbConnect();
const coll_event = mongo_creds.EVENT_COLLECTION;
const coll = db.collection(coll_event);

//function to list all  events
export async function getAllEvents(req, res) {
  try {
    const docs = await coll.find().sort({ date: 1 }).toArray();
    const events = docs.map((doc) => ({ ...doc }));
    res.send(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

//function to get one event
export async function getEventById(req, res) {
  try {
    const eventId = req.params.id;
    const findEvent = await coll.findOne({ _id: new ObjectId(eventId) });
    res.send(findEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

//function to create, will add error handling later (as in if a user doesnt put in title, or date, etc...)
export async function createEvent(req, res) {
  const { title, description, date, type } = req.body;
  const newEvent = { title, description,type, date: new Date(date) }; // add type "datetime-local" when building the form
  try {
    await coll.insertOne(newEvent);
    getAllEvents(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

//function to update an event

export async function updateByEventId(req, res) {
  const eventId = req.params.id;
  const { title, description, date, type } = req.body;
  const updatedEvent = { title, description,type, date: new Date(date) };
  try {
    await coll.findOneAndUpdate(
      { _id: new ObjectId(eventId) },
      { $set: updatedEvent }
    );
    getAllEvents(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

//function to delete an event

export async function deleteByEventId(req, res) {
  const eventId = req.params.id;
  try {
    await coll.findOneAndDelete({_id: new ObjectId(eventId)})
getAllEvents(req,res)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
