import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
export const ensureAuthenticated = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(403).json({ message: "Token is required" });
  }
  try {
    const decode = jwt.verify(req.headers["authorization"], process.env.SECRET);
   return next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Token is not valid or Token is expire" });
  }
};
