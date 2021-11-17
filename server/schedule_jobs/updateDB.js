import nodeCron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updateDatabase = async () => {
	async function main() {
		console.log('Update DB');
		var dateOffset = 24 * 60 * 60 * 1000 - 14;
		var myDate = new Date();
		myDate.setTime(myDate.getTime() - dateOffset);
		const updateDonorExpiry = await prisma.donor.updateMany({
			where: {
				AND: [
					{
						expiryDate: {
							lte: myDate,
						},
					},
					{
						status: {
							not: 'EXPIRED',
						},
					},
				],
			},
			data: {
				status: 'EXPIRED',
			},
		});
		// res.json({ updateDonorExpiry });
		// console.log(updateDonorExpiry);
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

// export const updateDB = nodeCron.schedule('* * * * * *', updateDatabase);
export const updateDB = nodeCron.schedule('0 0 1 * * *', updateDatabase);
