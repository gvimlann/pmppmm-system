import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDonor = async (req, res) => {
	const { agentId } = req.body;
	async function main() {
		// ... you will write your Prisma Client queries here
		const allDonors = await prisma.donor.findMany({
			where: {
				agentId: agentId,
			},
		});
		// console.log(allDonors);
		res.json({ allDonors });
	}

	main()
		.catch((e) => {
			console.log('It is an error');
			console.log(e);
			throw e;
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
};

export const createDonor = async (req, res) => {
	try {
		console.log(req.body.donorInfo);
		const {
			isCompany,
			name,
			registrationNo,
			icNumber,
			contactNumber,
			contactPerson,
			email,
			address,
		} = req.body.donorInfo;
		const { agentId } = req.body;

		const date = new Date();

		console.log('agentId', agentId);

		const donorExist = await prisma.donor.findMany({
			where: {
				registrationNo: registrationNo,
			},
		});

		if (donorExist.length !== 0)
			return res.status(400).send('Donor has been registered previously.');

		const donor = await prisma.donor.create({
			data: {
				createdAt: new Date(),
				isCompany: isCompany,
				name: name,
				icNumber: icNumber,
				registrationNo: registrationNo,
				contactPerson: contactPerson,
				contactNumber: parseInt(contactNumber),
				email: email,
				address: address,
				status: 'PENDING',
				expiryDate: new Date(date.setMonth(date.getMonth() + 6)),
				agentId: agentId,
			},
		});

		res.json({ success: true });
	} catch (err) {
		console.log(err);
	}
};

export const updateDonor = async (req, res) => {
	try {
		res.json({ success: true });
	} catch (err) {
		console.log(err);
	}
};

export const deleteDonor = async (req, res) => {
	try {
		res.json({ success: true });
	} catch (err) {
		console.log(err);
	}
};

export const validateDonor = async (req, res) => {
	const { donorId, agentId } = req.body;
	// console.log(topicId, userId);
	// return res.json({ success: true });
	async function main() {
		// ... you will write your Prisma Client queries here
		const donor = await prisma.donor.findMany({
			where: {
				AND: [
					{
						id: {
							equals: parseInt(donorId),
						},
					},
					{
						agentId: {
							equals: parseInt(agentId),
						},
					},
				],
			},
		});
		if (donor.length === 0) {
			return res.status(401).send('Unauthorized Access');
		}
		console.log(donor);
		return res.json({ donor });
	}

	main()
		.catch((e) => {
			// console.log('It is an error');
			console.log(e);
			// throw e;
			return res.status(400).send('Cant find the donor');
		})
		.finally(async () => {
			await prisma.$disconnect();
		});
};