import dbConnect from "/lib/dbConnect";
import Game from "/models/Game";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      console.log("req.query :>> ", req.query);
      try {
        let q = Game.find({});
        req.query.ht != "all" && q.where("HomeTeam", req.query.ht);
        req.query.at != "all" && q.where("AwayTeam", req.query.at);
        req.query.ftr != "all" && q.where("FTR", req.query.ftr);
        req.query.htr != "all" && q.where("HTR", req.query.htr);
        q.where("FTHG", [0, 1]);

        const games = await q.exec();
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
