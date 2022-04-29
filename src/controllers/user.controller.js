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


async function httpGetAllUsers(req, res) {
	try {
		const users = await userDatabase.find();
		return res.status(200).json({
			message: "Successful",
			success: true,
			data: users
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Unable to get users',
			success: false,
		})
	}
}


async function httpGetSingleUser(req, res) {
	try {
		const { id } = req.params
		const user = await userDatabase.findById(id);

		if(!user) {
			return res.status(404).json({
				message: 'User not found!',
				success: false
			})
		}

		return res.status(200).json({
			message: "Successful",
			success: true,
			data: user
		})
	} catch (error) {
		return res.status(400).json({
			message: 'Unable to get user',
			success: false,
		})
	}
}


module.exports = {
	httpCreateUserAccount,
	httpUserLogin,
	httpGetAllUsers,
	httpGetSingleUser
}