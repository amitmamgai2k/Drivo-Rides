const rideService = require("../services/ride.service");
module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userID, origin, destination, vehicleType } = req.body;
    try {
        const ride = await rideService.createRide({user:req.user.user._id, origin, destination, vehicleType});
        res.status(200).json({ ride });
    } catch (err) {
        console.error("Error creating ride:", err);
        res.status(500).json({ error: "Server error" });
    }
}