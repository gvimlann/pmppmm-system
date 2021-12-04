import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/auth';
const prisma = new PrismaClient();

export const agentRegister = async (req, res) => {
	async function main() {
		console.log('SERVER: REGISTER USER');
		let { email, fullName, icNumber, password, contactNumber } = req.body;

		const hashedPassword = await hashPassword(password);
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
			console.log(userExist);
			return res.status(400).json({
				success: false,
				errorCode: 10001,
				message:
					'Agent already exists. Please login with your registered email',
			});
		}

		const user = await prisma.agent.create({
			data: {
				email: email,
				fullName: fullName,
				icNumber: icNumber,
				contactNumber: parseInt(contactNumber),
				hashedPassword: hashedPassword,
			},
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

export const login = async (req, res) => {
	async function main() {
		console.log('SERVER: LOGIN USER');
		let { email, password, accountType } = req.body;
		if (!email) return res.status(400).send('Email is required');
		if (!password) return res.status(400).send('Password is required');

		// console.log(await hashPassword(password));

		if (accountType === 'agent') {
			const userExist = await prisma.agent.findFirst({
				where: {
					AND: [
						{
							email: email,
						},
						{
							approved: true,
						},
					],
				},
			});

			const match = await comparePassword(password, userExist.hashedPassword);

			if (match !== true) {
				return res.status(400).send('Cant find the agent');
			} else if (userExist.approved === false) {
				return res
					.status(400)
					.send(
						'Your account is still pending approval from the admin. Please try again later.'
					);
			}

			const token = jwt.sign(
				{ id: userExist.id, role: 'AGENT' },
				process.env.JWT_SECRET,
				{
					expiresIn: '7d',
				}
			);

			// send token in cookie
			res.cookie('token', token, {
				httpOnly: true,
				// secure: true, // only works on HTTPS connection
			});

			res.json({
				role: 'AGENT',
				id: userExist.id,
				status: userExist.status,
			});
		} else if (accountType === 'admin') {
			const userExist = await prisma.admin.findFirst({
				where: {
					email: email,
				},
			});

			const match = await comparePassword(password, userExist.hashedPassword);

			if (match !== true) {
				return res.status(400).send('Cant find the admin');
			}

			const token = jwt.sign(
				{ id: userExist.id, role: 'ADMIN' },
				process.env.JWT_SECRET,
				{
					expiresIn: '7d',
				}
			);

			res.cookie('token', token, {
				httpOnly: true,
				// secure: true, // only works on HTTPS connection
			});

			console.log('userExist: ', userExist);

			res.json({
				role: 'ADMIN',
				id: userExist.id,
				status: userExist.status,
			});
		}
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

export const agentLogout = async (req, res) => {
	async function main() {
		console.log('SERVER: LOGOUT USER');

		res.clearCookie('token');
		return res.json({ success: true });
	}

	main().catch((e) => {
		console.log(e);
		return res.status(400).send('Cant logout the agent');
	});
};

export const currentUser = async (req, res) => {
	async function main() {
		// console.log(req.user);
		const user = await prisma.agent.findFirst({
			where: {
				id: req.user.id,
			},
		});

		return res.json({
			success: true,
			user: { id: req.user.id, status: user.status, role: req.user.role },
		});
	}

	main()
		.catch((e) => {
			console.log(e);
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
};
