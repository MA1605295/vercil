import fs from "fs";

export default async function handler(req, res) {
  //const userId = params;

  if (req.method === "GET") {
    try {
      const file = await fs.promises.readFile("temp/ideas.json");
      //filter the ideas with the user id
      res.status(200).json(JSON.parse(file).filter((data) => data.userId == req.query.user));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === "POST") {
    try {
      //get users
      const fileReader = await fs.promises.readFile("temp/ideas.json");
      //write to file
      await fs.promises.writeFile("temp/ideas.json", req.body);
      console.log("File written successfully");
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

  } else if (req.method === "DELETE") {
    //get ideas
    const file = await fs.promises.readFile("temp/ideas.json");
    //filter the data and remove the match idea id
    await fs.promises.writeFile("temp/ideas.json", JSON.parse(file).filter((data) => data.id !== res.body.id));
    console.log("idea deleted successfully");
    //next is to reWrite the file with the new data.
  }
}