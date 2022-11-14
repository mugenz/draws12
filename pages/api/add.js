import dbConnect from "/lib/dbConnect";
import Game from "/models/Game";
import prem from "/public/stats/en_prem_21-22.json";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const games = await Game.find({});
        res.status(200).json(games);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log("req.body :>> ", req.body);
        const game = await Game.insertMany(req.body);
        res.status(201).json(game);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const game = await Game.deleteMany({ Div: { $exists: false } });
        res.status(201).json(game);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
