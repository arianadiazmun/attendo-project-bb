import { ObjectId } from "mongodb";
import { mongo_creds } from "../secrets.js";
import { dbConnect } from "./db/connect.js";

const db = dbConnect();
const coll_user = mongo_creds.USER_COLLECTION;
const coll = db.collection(coll_user);

//write a function to list all users
export async function getAllUsers(req, res) {
  try {
    const users = await coll.find().sort({ points: -1 }).toArray();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

//write a function to get One user
export async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const findUser = await coll.findOne({ _id: new ObjectId(userId) });
    res.send(findUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

//function to create one user
export async function createUser(req, res) {
  const { name, age, grade, points } = req.body;
  const newUser = { name, age, grade, points: Number(points) };
  try {
    await coll.insertOne(newUser);
    getAllUsers(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

//function to update
export async function updateByUserId(req, res) {
  const userId = req.params.id;
  const { name, age, grade, points } = req.body;
  const updatedUser = { name, age, grade, points };
  try {
    await coll.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: updatedUser }
    );
    getAllUsers(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

//function to delete one user

export async function deleteByUserId(req, res) {
  const userId = req.params.id;
  try {
    await coll.findOneAndDelete({ _id: new ObjectId(userId) });
    getAllUsers(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
