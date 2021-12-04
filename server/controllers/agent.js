import AWS from 'aws-sdk';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const awsConfig = {
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
	apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);

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
			res.status(400).send('Cant add new transaction');
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
	const { id, email, approved } = req.body;

	console.log(req.body);

	async function main() {
		if (approved) {
			//send email to agent
			// console.log('Send Email');
			// console.log('******SENDING EMAIL TO CLIENT**********');

			const params = {
				Source: process.env.EMAIL_FROM,
				Destination: {
					ToAddresses: [process.env.EMAIL_FROM],
				},
				ReplyToAddresses: [process.env.EMAIL_FROM],
				Message: {
					Body: {
						Html: {
							Charset: 'UTF-8',
							Data: `
						<html>
							<h1>Your Account Has Been Approved</h1>
							<p>Please use the following information to log in:</p>
              <p>Email: ${email}</p>
              <p>Password: Your registered password</p>
						</html>
					`,
						},
					},
					Subject: {
						Charset: 'UTF-8',
						Data: 'PMPPMM Agent Account Approved',
					},
				},
			};
			const emailSent = SES.sendEmail(params, (err, data) => {
				if (err) {
					console.log(err);
					return res.status(400).json({
						success: false,
						message: 'Approved email not sent. Please retry again later.',
					});
				}
			});

			await prisma.agent.update({
				where: {
					id: id,
				},
				data: {
					approved,
				},
			});

			return res.json({ success: true });
		}
	}

	main()
		.catch((e) => {
			console.log(e);
			return res.status(400).send('Cant add new transaction');
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
