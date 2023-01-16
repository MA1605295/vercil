import { v4 as uuid4 } from "uuid"
export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            //return unique id
            res.status(200).json(uuid4());
        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    } else if (req.method === "POST") {
        try {
            //get users
            const fileReader = await fs.promises.readFile("temp/users.json");
            //write to file
            //merge the 2 arrays
            const data = [...JSON.parse(fileReader),res.body];
                await fs.promises.writeFile("temp/users.json",data );
            console.log("File written successfully");
        } catch (e) {
            res.status(500).json({ error: e.message });
        }

    }
}
