import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { nanoid } from "nanoid";
var PDFDocument = require("pdfkit");
import AWS from "aws-sdk";
import Busboy from "busboy";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

export const getTransaction = async (req, res) => {
  try {
    const { agentId } = req.body;
    async function main() {
      const allTransactions = await prisma.transaction.findMany({
        select: {
          id: true,
          status: true,
          paymentType: true,
          chequeDate: true,
          chequeNo: true,
          bankName: true,
          amount: true,
          donor: {
            select: {
              name: true,
            },
          },
        },
        where: {
          agentId: agentId,
        },
      });
      res.json({ allTransactions });
    }

    main()
      .catch((e) => {
        console.log("It is an error");
        console.log(e);
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  } catch (err) {
    console.log(err);
  }
};

export const getAdminTransaction = async (req, res) => {
  try {
    async function main() {
      const allTransactions = await prisma.transaction.findMany({
        select: {
          id: true,
          status: true,
          paymentType: true,
          chequeDate: true,
          chequeNo: true,
          bankName: true,
          amount: true,
          donor: {
            select: {
              name: true,
            },
          },
          agent: {
            select: {
              fullName: true,
            },
          },
        },
      });
      res.json({ allTransactions });
    }

    main()
      .catch((e) => {
        console.log("It is an error");
        console.log(e);
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  } catch (err) {
    console.log(err);
  }
};

export const createTransaction = async (req, res) => {
  // try {
  // 	const { donorId, receiptMainCompany, address, amount } = req.body;

  // 	res.json({ Success: true });
  // } catch (err) {
  // 	console.log(err);
  // }

  async function main() {
    const {
      donorInfo: { id, agentId },
      grandTotal,
    } = req.body;

    const transaction = await prisma.transaction.create({
      data: {
        donorId: id,
        amount: grandTotal,
        agentId: agentId,
      },
    });

    return res.json({ success: true });

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

export const updateAdminTransaction = async (req, res) => {
  async function main() {
    console.log(req.body);
    const {
      id,
      status = undefined,
      paymentType = undefined,
      chequeDate = undefined,
      chequeNo = undefined,
      bankName = undefined,
      amount = undefined,
    } = req.body;

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: id,
      },
      data: {
        status: status,
        paymentType: paymentType,
        chequeDate: chequeDate,
        chequeNo: chequeNo,
        bankName: bankName,
        amount: amount,
      },
    });

    return res.json({ success: true });
  }

  main()
    .catch((e) => {
      console.log("Update Transaction Failed");
      console.log(e);
      // throw e;
      // res.status(400).send('Cant add new transaction');
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

export const updateTransaction = async (req, res) => {
  async function main() {
    const {
      donorInfo: { id },
      status,
      paymentType,
      grandTotal,
      chequeDate,
      chequeNo,
      bankName,
    } = req.body;

    // console.log(id, grandTotal);

    const updatedTransaction = await prisma.transaction.update({
      where: {
        donorId: did,
        id: tid,
      },
      data: {
        status: status,
        paymentType: paymentType,
        chequeDate: chequeDate,
        chequeNo: chequeNo,
        bankName: bankName,
      },
    });

    return res.json({ success: true });
  }

  main()
    .catch((e) => {
      console.log("Update Transaction Failed");
      console.log(e);
      // throw e;
      // res.status(400).send('Cant add new transaction');
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

export const deleteTransaction = async (req, res) => {
  // try {
  // 	res.json({ Success: true });
  // } catch (err) {
  // 	console.log(err);
  // }

  async function main() {
    const {
      donorInfo: { id },
      tid,
    } = req.body;

    // console.log(id, grandTotal);

    const updatedTransaction = await prisma.transaction.update({
      where: {
        donorId: did,
        id: tid,
      },
      data: {
        status: status,
        paymentType: paymentType,
        chequeDate: chequeDate,
        chequeNo: chequeNo,
        bankName: bankName,
      },
    });

    const deleteTransaction = await prisma.transaction.delete({
      where: {
        donorId: did,
        id: tid,
      },
    });

    return res.json({ success: true });
  }

  main()
    .catch((e) => {
      console.log("Update Transaction Failed");
      console.log(e);
      // throw e;
      // res.status(400).send('Cant add new transaction');
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};

export const uploadFormTransaction = async (req, res) => {
  try {
    console.log("Uploading transaction");
    // const busboy = new Busboy({ headers: req.headers });

    // busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    // 	const params = {
    // 		Bucket: 'pmppmm-docs',
    // 		Key: filename,
    // 		Body: file,
    // 		ACL: 'public-read',
    // 	};

    // 	const upload = await S3.upload(params).promise();
    // 	console.log('the upload: ', upload);
    // 	return res.json({ success: true, upload: upload });
    // });

    // return req.pipe(busboy);

    const { file } = req.body;
    const base64Data = new Buffer.from(
      file.replace(/^data:application\/\w+;base64,/, ""),
      "base64"
    );

    const params = {
      Bucket: "pmppmm-docs",
      Key: "output.pdf",
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: "application/pdf",
    };

    const upload = await S3.upload(params).promise();
    console.log("the upload: ", upload);
    return res.json({ success: true, upload: upload });
  } catch (err) {
    console.log(err);
  }
};
