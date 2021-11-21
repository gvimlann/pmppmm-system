import expressJwt from "express-jwt";
import jwt from "jsonwebtoken";

// export const requireSignIn = expressJwt({
//   getToken: (req, res) => {
//     // console.log(`trying to get token ${JSON.stringify(req.cookies.token)}`);
//     return req.cookies.token;
//   },
//   secret: process.env.JWT_SECRET,
//   algorithms: ["HS256"],
// }); //if this is valid, we can access the req.id

export const requireSignIn = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export const requireAgentSignIn = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(req.user);
    if (req.user.role !== "AGENT") {
      res.status(401).json({ message: "Unauthorized Access" });
    }
    next();
  } catch (error) {
    // res.status(400).send("Invalid token");
    res.status(401).json({ message: "Unauthorized Access" });
  }
};

export const requireAdminSignIn = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(req.user);
    if (req.user.role !== "ADMIN") {
      res.status(401).json({ message: "Unauthorized Access" });
    }
    next();
  } catch (error) {
    // res.status(400).send("Invalid token");
    res.status(401).json({ message: "Unauthorized Access" });
  }
};
