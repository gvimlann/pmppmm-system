import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAdminDonor = async (req, res) => {
	async function main() {
		// ... you will write your Prisma Client queries here
		const allDonors = await prisma.donor.findMany({
			select: {
				id: true,
				name: true,
				icNumber: true,
				registrationNo: true,
				contactNumber: true,
				contactPerson: true,
				status: true,
				agent: true,
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

export const getDonor = async (req, res) => {
	async function main() {
		// ... you will write your Prisma Client queries here
		const allDonors = await prisma.donor.findMany({
			where: {
				agentId: req.user.id,
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
		// console.log(req.body.donorInfo);
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

		const agentId = req.user.id;

		const date = new Date();

		var newDate = new Date(date.setMonth(date.getMonth() + 6));

		console.log('agentId', agentId);

		let donorExist = null;
		let data = null;

		if (isCompany) {
			data = {
				isCompany,
				name,
				registrationNo,
				email,
				contactNumber: parseInt(contactNumber),
				contactPerson,
				address,
				agentId,
			};

			//   TODO: add another line to check if the donor is active or not
			donorExist = await prisma.donor.findMany({
				where: {
					AND: [
						{
							registrationNo: registrationNo,
						},
						{
							status: {
								not: 'EXPIRED',
							},
						},
					],
				},
			});
		} else {
			data = {
				isCompany,
				name,
				icNumber,
				email,
				contactNumber: parseInt(contactNumber),
				contactPerson,
				address,
				agentId,
			};

			//   TODO: add another line to check if the donor is active or not
			donorExist = await prisma.donor.findMany({
				where: {
					AND: [
						{
							icNumber: icNumber,
						},
						{
							status: {
								not: 'EXPIRED',
							},
						},
					],
				},
			});
		}

		if (donorExist.length !== 0)
			return res.status(400).send('Donor has been registered previously.');

		const donor = await prisma.donor.create({
			data: { ...data, expiryDate: newDate },
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
	const { donorId } = req.body;
	const agentId = req.user.id;
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
