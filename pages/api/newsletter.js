import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const emailInfo = req.body.email;
    if (!emailInfo) {
      res.status(422).json({ message: "Invalid Email" });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://conquestkerber:ConquestKerber23@cluster0.yhrhnl6.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db(); //connect to db
    await db.collection("emails").insertOne({ email: emailInfo });
    client.close();

    console.log(emailInfo);
    res.status(201).json({ message: "Signed up", data: emailInfo });
  }
}

export default handler;
