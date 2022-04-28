const videoDatabase = require('../model/video.model');


async function httpSaveVideo(req, res) {
	try {
		const video = {...req.body};
		if (
			!video.user||
			!video.video_url ||
			!video.car_brand ||
			!video.car_model ||
			!video.mobile_brand
		) {
			return res.status(400).json({
				message: "Some field(s) are missing!",
				success: false,
			});
		}

		const exist = await videoDatabase.findOne({ video_url: video.video_url });

		if (!exist) {
			let videoProfile = await new videoDatabase(video);
			videoProfile.save();

			return res.status(201).json({
				data: videoProfile,
				success: true,
				message: "Video saved successfully!"
			})
		} 


		exist.video_url = video.video_url;
		exist.car_brand = video.car_brand;
		exist.car_model = video.car_model;
		exist.damaged = video.damaged;
		exist.status = {
			approved: video.status.approved,
			message: [...video.status.message]
		}

		console.log(exist);

		exist.save();

		return res.status(200).json({
			message: "Video updated!",
			success: true,
			data: exist
		})
		
	} catch (error) {
		
	}
}


async function httpGetUserUpload(req, res) {
	try {
		const { id } = req.params;
		const videos = await videoDatabase.find({ user: id });

		console.log(videos);
		return res.status(200).json({
			message: "User uploads successfully",
			success: true,
			data: videos
		})
		
	} catch (error) {
		return res.status(404).json({
			message: 'unable to fetch uploads',
			success: false,
			data: []
		})
	}
}

async function httpGetAllUpload(req, res) {
	try {
		const videos = await videoDatabase.find();

		return res.status(200).json({
			message: "User uploads successfully",
			success: true,
			data: videos
		})
		
	} catch (error) {
		return res.status(404).json({
			message: 'unable to fetch uploads',
			success: false,
			data: []
		})
	}
}

// async function httpGetAllUpload(req, res) {
// 	try {
// 		const videos = await videoDatabase.find();

// 		return res.status(200).json({
// 			message: "User uploads successfully",
// 			success: true,
// 			data: videos
// 		})
		
// 	} catch (error) {
// 		return res.status(404).json({
// 			message: 'unable to fetch uploads',
// 			success: false,
// 			data: []
// 		})
// 	}
// }


module.exports = {
	httpSaveVideo,
	httpGetUserUpload,
	httpGetAllUpload
}