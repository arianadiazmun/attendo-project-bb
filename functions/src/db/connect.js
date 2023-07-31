import { MongoClient } from "mongodb";
import { mongo_creds } from "../../secrets.js";


export function dbConnect () {
  const client = new MongoClient(mongo_creds.URI)
  return client.db(mongo_creds.DB)
}
