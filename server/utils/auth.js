import bcrypt from 'bcrypt';

export const hashPassword = (password) => {
	return new Promise((resolve, reject) => {
		// success is resolve
		bcrypt.genSalt(12, (err, salt) => {
			if (err) return reject(err);
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) return reject(err);
				resolve(hash);
			});
		});
	});
};

export const comparePassword = (password, hashed) => {
	return bcrypt.compare(password, hashed);
};
