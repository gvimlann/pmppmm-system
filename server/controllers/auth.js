import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/auth';
const prisma = new PrismaClient();

export const agentRegister = async (req, res) => {
	async function main() {
		console.log('SERVER: REGISTER USER');
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
				message: 'Agent already exists',
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
			return res.status(400).send('Cant register new agent');
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
};

export const agentLogin = async (req, res) => {
	async function main() {
		console.log('SERVER: LOGIN USER');
		let { email, password } = req.body;
		if (!email) return res.status(400).send('Email is required');
		if (!password) return res.status(400).send('Password is required');

		// const hashedPassword = hashPassword(password);
		email = 'gvimlan@minedmind.my';
		const hashedPassword = 'password';

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

		const token = jwt.sign(
			{ id: userExist.id, role: 'AGENT' },
			process.env.JWT_SECRET,
			{
				expiresIn: '7d',
			}
		);

		console.log(token);

		// send token in cookie
		res.cookie('token', token, {
			httpOnly: true,
			// secure: true, // only works on HTTPS connection
		});

		res.json({ success: true });
	}

	main()
		.catch((e) => {
			// console.log('It is an error');
			console.log(e);
			// throw e;
			return res.status(400).send('Cant find the agent');
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
};
