const userDatabase = require('../model/user.model');



async function httpCreateUserAccount(req, res) {
	try {
		const user = {...req.body};
		if (
			!user.fullName ||
			!user.email ||
			!user.phone ||
			!user.account_name ||
			!user.bank_name ||
			!user.account_number ||
			!user.country ||
			!user.password ||
			!user.location
		) {
			return res.status(400).json({
				success: false,
				message: 'Field(s) are missing!'
			})
		}

		let exist = await userDatabase.findOne({ email: user.email });
		console.log(exist);
		if (exist) {
			return res.status(400).json({
				message: "User already registered!",
				success: false
			})
		}

		let profile = await new userDatabase(user);
		profile.save();
		
		return res.status(201).json({
			data: profile,
			success: true,
			message: 'Account successfully created!'
		});
		
	} catch (error) {
		console.log(error)
		return res.status(400).json({
			message: 'Unable to create account',
			error: error
		})
	}
}



async function httpUserLogin (req, res) {

	try {
		const user = {...req.body}
		let exist  = await userDatabase.findOne({ email: user.id, password: user.password })
		if (!exist) {
			return res.status(404).json({
				message: 'User not found!',
				success: false
			})
		}

		return res.status(200).json({
			data: exist,
			success: true,
			message: "Login successful!"
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Unable to login user.',
			success: false,
			error: error
		})
	}
}


module.exports = {
	httpCreateUserAccount,
	httpUserLogin
}