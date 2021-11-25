import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAgent = async (req, res) => {
  // try {
  // 	const { name, icNumber, address, contactNumber, emailAddress, password } =
  // 		req.body;

  // 	let sampleData = {
  // 		name: 'Vimlan',
  // 		icNumber: '12124124214',
  // 		address: 'Rawang',
  // 		contactNumber: '012345555',
  // 		emailAddress: 'gvimlan@gmail.com',
  // 		status: 'PENDING',
  // 	};

  // 	let statusCode = ['PENDING', 'ACTIVE', 'SUSPENDED'];

  // 	res.json({
  // 		sampleData,
  // 	});
  // } catch (err) {
  // 	console.log(err);
  // }
  async function main() {
    const allAgents = await prisma.agent.findMany();
    // console.log(allAgents);

    return res.json({ success: true, allAgents: allAgents });

    // ... you will write your Prisma Client queries here
    // const allDonors = await prisma.donor.findMany();
    // console.log(allDonors);
    // res.json({ allDonors });
  }

  main()
    .catch((e) => {
      // console.log('It is an error');
      console.log(e);
      // throw e;
      // res.status(400).send('Cant add new transaction');
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

export const createAgent = async (req, res) => {
  try {
    res.json({ Success: true });
  } catch (err) {
    console.log(err);
  }
};

export const updateAgent = async (req, res) => {
  const {
    id,
    contactNumber = undefined,
    fullName = undefined,
    icNumber = undefined,
    status = undefined,
    username = undefined,
    approved = undefined,
  } = req.body;

  console.log(req.body);

  async function main() {
    const agent = await prisma.agent.update({
      where: {
        id: id,
      },
      data: {
        contactNumber: parseInt(contactNumber),
        fullName,
        icNumber,
        status,
        username,
        approved,
      },
    });

    console.log(agent);

    return res.json({ success: true });
  }

  main()
    .catch((e) => {
      console.log(e);
      res.status(400).send("Cant add new transaction");
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

export const deleteAgent = async (req, res) => {
  try {
    // send email
    res.json({ Success: true });
  } catch (err) {
    console.log(err);
  }
};

export const approveAgent = async (req, res) => {
  const { id, approved } = req.body;

  console.log(req.body);

  async function main() {
    await prisma.agent.update({
      where: {
        id: id,
      },
      data: {
        approved,
      },
    });

    if (approved) {
      //send email to agent
      console.log("******SENDING EMAIL TO CLIENT**********");
    }

    return res.json({ success: true });
  }

  main()
    .catch((e) => {
      console.log(e);
      res.status(400).send("Cant add new transaction");
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

export const resetPasswordAgent = async (req, res) => {
  try {
    // send email
    res.json({ Success: true });
  } catch (err) {
    console.log(err);
  }
};
