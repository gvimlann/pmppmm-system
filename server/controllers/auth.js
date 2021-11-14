import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
	async function main() {
		console.log('SERVER: LOGIN USER');

		const token = jwt.sign({ id: 1, role: 'AGENT' }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});

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
			return res.status(400).send('Cant find the donor');
		})
		.finally(async () => {
			// await prisma.$disconnect();
		});
};
