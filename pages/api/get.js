import dbConnect from "/lib/dbConnect";
import Game from "/models/Game";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        let q = Game.find({})
        q.where("HomeTeam", req.query.ht)
        const games = await q.exec()
        // const games = await Game.find({})
        //   .where("HomeTeam")
        //   .in(["Leeds"])
        //   .where("FTR")
        //   .equals("D")
        //   .where("FTHG")
        //   .equals([0, 1])
        //   // .gt(17)
        //   // .lt(66)
        //   // .where("likes")
        //   // .in(["vaporizing", "talking"])
        //   // .limit(10)
        //   // .sort("-occupation")
        //   // .select("name occupation")
        //   .exec();
        // console.log("games :>> ", games);
        res.status(200).json(games);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
