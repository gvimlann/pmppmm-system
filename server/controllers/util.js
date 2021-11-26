import AWS from 'aws-sdk';

const awsConfig = {
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
	apiVersion: process.env.AWS_API_VERSION,
};

export const sendEmail = async (req, res) => {
	console.log('Send Email');
	res.json({ success: true });
};
