import express from 'express';
import cors from 'cors';
import validator from 'email-validator';
import delay from 'delay';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

const noEmailErr = {
	type: 'NO_EMAIL',
	message: 'email is required'
}

const invalidEmailErr = {
	type: 'INVALID_EMAIL',
	message: 'email is invalid'
}

const duplicateEmailErr = {
	type: 'EXISTING_EMAIL',
	message: 'email already exists'
}

const emails = new Set([
	'peled@rezonate.io',
	'amiga@rezonate.io',
	'a@b.com',
]);

app.get('/validate', async (req, res) => {
	const { email } = req.query;

	await delay(Math.random()*2000 + 500);

	if(!email)
		return res
			.status(400)
			.send(noEmailErr);

	if(!validator.validate(email))
		return res
			.status(400)
			.send(invalidEmailErr);

	if(emails.has(email))
		return res
			.status(403)
			.send(duplicateEmailErr);

	res.send({ok: 1});
});

app.listen(PORT);
console.log('listening on ' + PORT);

