import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://conquestkerber:ConquestKerber23@cluster0.yhrhnl6.mongodb.net/?retryWrites=true&w=majority"
  );
  if (req.method === "POST") {
    const { email, name, comment } = req.body;
    if (
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid  input" });
      return;
    }
    const newComment = {
      eventId,
      email,
      name,
      comment,
    };

    const db = client.db();
    const results = await db.collection("comments").insertOne(newComment);
    console.log(results);
    res.status(201).json({
      message: "Added comment",
      data: newComment,
    });
  }
  if (req.method === "GET") {
    const client = await MongoClient.connect(
      "mongodb+srv://conquestkerber:ConquestKerber23@cluster0.yhrhnl6.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();
    const results = await db
      .collection("comments")
      .find()
      .sort({ id: -1 })
      .toArray();
    res.status(201).json({ message: "success", data: results });
  }
  client.close();
}

export default handler;
