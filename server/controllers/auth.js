import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { hashPassword, comparePassword } from "../utils/auth";
const prisma = new PrismaClient();

export const agentRegister = async (req, res) => {
  async function main() {
    console.log("SERVER: REGISTER USER");
    let { email, username, fullName, icNumber, password, contactNumber } =
      req.body;

    const hashedPassword = hashPassword(password);
    const userExist = await prisma.agent.findFirst({
      where: {
        AND: [
          {
            email: email,
          },
          {
            hashedPassword: hashedPassword,
          },
        ],
      },
    });
    if (userExist !== null) {
      return res.status(400).json({
        success: false,
        errorCode: 10001,
        message: "Agent already exists",
      });
    }

    const user = await prisma.agent.create({
      email: email,
      username: username,
      fullName: fullName,
      icNumber: icNumber,
      contactNumber: contactNumber,
      hashedPassword: hashedPassword,
    });

    return res.json({ success: true });
  }

  main()
    .catch((e) => {
      console.log(e);
      return res.status(400).send("Cant register new agent");
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

export const login = async (req, res) => {
  async function main() {
    console.log("SERVER: LOGIN USER");
    let { email, password, accountType } = req.body;
    if (!email) return res.status(400).send("Email is required");
    if (!password) return res.status(400).send("Password is required");

    if (accountType === "agent") {
      const userExist = await prisma.agent.findFirst({
        where: {
          email: email,
        },
      });

      const match = await comparePassword(password, userExist.hashedPassword);

      if (match !== true) {
        return res.status(400).send("Cant find the agent");
      }

      const token = jwt.sign(
        { id: userExist.id, role: "AGENT" },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // send token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        // secure: true, // only works on HTTPS connection
      });

      res.json({ success: true, role: "AGENT" });
    } else if (accountType === "admin") {
      const userExist = await prisma.admin.findFirst({
        where: {
          email: email,
        },
      });

      const match = await comparePassword(password, userExist.hashedPassword);

      if (match !== true) {
        return res.status(400).send("Cant find the agent");
      }

      const token = jwt.sign(
        { id: userExist.id, role: "ADMIN" },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        // secure: true, // only works on HTTPS connection
      });

      res.json({ success: true, role: "ADMIN" });
    }
  }

  main()
    .catch((e) => {
      // console.log('It is an error');
      console.log(e);
      // throw e;
      return res.status(400).send("Cant find the agent");
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

export const agentLogout = async (req, res) => {
  async function main() {
    console.log("SERVER: LOGOUT USER");

    res.clearCookie("token");
    return res.json({ success: true });
  }

  main().catch((e) => {
    console.log(e);
    return res.status(400).send("Cant logout the agent");
  });
};

export const currentUser = async (req, res) => {
  async function main() {
    console.log(req.user);
    return res.json({ success: true, user: req.user });
  }

  main()
    .catch((e) => {
      console.log(e);
    })
    .finally(async () => {
      //   await prisma.disconnect();
    });
};
