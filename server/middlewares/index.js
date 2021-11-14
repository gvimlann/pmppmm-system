import expressJwt from 'express-jwt';

export const requireSignIn = expressJwt({
	getToken: (req, res) => {
		console.log(`trying to get token ${JSON.stringify(req.cookies.token)}`);
		return req.cookies.token;
	},
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
}); //if this is valid, we can access the req.id
