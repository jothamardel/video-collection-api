const paymentDatabase = require('../model/payment.model');



async function httpPostPayment(req, res) {
	try {

		const paid = {...req.body}

		let findIfExist = await paymentDatabase.findOne({ user: paid.user });

		if (!findIfExist) {
			findIfExist = await new paymentDatabase(paid);
			findIfExist.save();
			return res.status(201).json({
				message: "Successful.",
				success: true,
				data: findIfExist
			})
		}

		findIfExist.total_videos_paid = paid.total_videos_paid;
		findIfExist.unpaid_videos = paid.unpaid_videos;
		findIfExist.total_videos = paid.total_videos;

		findIfExist.save();

		return res.status(200).json({
			message: 'Operation successful.',
			success: true,
			data: findIfExist
		})
		
	} catch (error) {

		res.status(400).json({
			message: 'Unable save payment.',
			success: false
		})
		
	}
}

async function httpGetAllPayments(req, res) {
	try {
		const payments = await paymentDatabase.find();

		return res.status(200).json({
			message: 'Successful.',
			success: true,
			data: payments
		})
	} catch (error) {
		return res.status(400).json({
			message: 'unable to retrieve payments.',
			success: true
		})
	}
}

async function httpGetSinglePayment(req, res) {
	try {
		const { id } = req.params;
		console.log(id)
		const payment = await paymentDatabase.findOne({ user: id });
		return res.status(200).json({
			message: "Successful.",
			success: true,
			data: payment
		})
	} catch (error) {
		console.log(error.message)
		return res.status(400).json({
			message: "unable to retrieve data",
			success: false
		})
	}
}

module.exports = {
	httpPostPayment,
	httpGetAllPayments,
	httpGetSinglePayment
}