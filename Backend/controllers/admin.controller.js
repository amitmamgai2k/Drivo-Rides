const adminModel = require('../models/admin.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rideModel = require('../models/ride.model');
const captainModel = require('../models/captain.model');
const  userModel = require('../models/user.model');


module.exports.addAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await adminModel.hashPassword(password);

        const admin = new adminModel({ email, password: hashedPassword });
        await admin.save();

        res.status(201).json({ message: "Admin created successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Error creating admin", error });
    }
};

module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        console.log(email, password);

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }


        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Generate token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
async function totalCompletedRides() {
    try {
      const rides = await rideModel.find({ status: "completed" });
      console.log('rides count:', rides.length);
      return rides.length;
    } catch (error) {
      console.error('Error fetching completed rides:', error);
      return 0;
    }
  }
  async function totalOngoingRides() {
    try {
      const rides = await rideModel.find({ status: "ongoing" });
      return rides.length;
    } catch (error) {
      console.error('Error fetching ongoing rides:', error);
      return 0;
    }
  }
async function totalCancelledRides() {
    try {
      const rides = await rideModel.find({ status: "cancelled" });
      return rides.length;
    } catch (error) {
      console.error('Error fetching cancelled rides:', error);
      return 0;
    }
  }
async function totalPendingRides() {
    try {
      const rides = await rideModel.find({ status: "pending" });
      return rides.length;
    } catch (error) {
      console.error('Error fetching pending rides:', error);
      return 0;
    }
  }
  async function totalAcceptedRides() {
    try {
      const rides = await rideModel.find({ status: "accepted" });
      return rides.length;
    } catch (error) {
      console.error('Error fetching accepted rides:', error);
      return 0;
    }
  }
  async function totalEarning(){
    try {
        const totalEarnings = await rideModel.aggregate([
            { $match: { status: "completed" } },
            { $group: { _id: null, total: { $sum: "$price" } } },
            { $project: { _id: 0, total: 1 } },
        ]);
        return totalEarnings[0].total;


    } catch (error) {
        console.error('Error fetching total earnings:', error);
        return 0;

    }

  }
  async function totalActiveCaptains(){
    try {
        const activeCaptains =await captainModel.find({ status: { $in: ['online', 'offline'] } });
        console.log('active captains count:', activeCaptains.length);
        return activeCaptains.length;

    } catch (error) {
        console.error('Error fetching active captains:', error);
        return 0;

    }
  }
    async function totalActiveRiders(){
        try {
            const activeRiders = await userModel.find({email:{$ne:null}});
            console.log('active riders count:', activeRiders.length);
            return activeRiders.length;

        } catch (error) {
            console.error('Error fetching active riders:', error);
            return 0;

        }
    }


    module.exports.getMetricsData = async (req, res) => {


        if (!req.admin) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        try {
          const totalRides = await totalCompletedRides();
          const totalEarnings = await totalEarning();
          const activeCaptains = await totalActiveCaptains();
          const activeRiders = await totalActiveRiders();

          const metricsData = {
            totalRides,
            totalEarnings,
            activeCaptains,
            activeRiders,
          };

          res.status(200).json({ data: metricsData });
          console.log("Metrics data sent successfully");
        } catch (error) {
          console.error("Error fetching dashboard metrics:", error.message);
          return res.status(500).json({ message: "Server Error", error: error.message });
        }
      };
      module.exports.getRecentRides = async (req, res) => {
        if (!req.admin) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        try {
          const recentRides = await rideModel
            .find()
            .sort({ createdAt: -1 })
            .populate("user", "fullname")
            .populate("captain", "fullname")
            .exec();

          const simplifiedRides = recentRides.map((ride) => {
            const userFullName = ride.user?.fullname
              ? `${ride.user.fullname.firstname} ${ride.user.fullname.lastname || ""}`.trim()
              : "N/A";

            const captainFullName = ride.captain?.fullname
              ? `${ride.captain.fullname.firstname} ${ride.captain.fullname.lastname || ""}`.trim()
              : "Pending";

            return {
              id: ride._id,
              user: userFullName,
              captain: captainFullName,
              from: ride.originText,
              to: ride.destinationText,
              amount: ride.price,
              status: ride.status
            };
          });



          res.status(200).json({ data: simplifiedRides });

        } catch (error) {
          console.error("Error fetching recent rides:", error);
          res.status(500).json({ message: "Server Error", error: error.message });
        }
      };
      module.exports.getRideDataWithID = async (req, res) => {
        if (!req.admin) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        try {
          const rideId = req.params.rideId;
          const ride = await rideModel.findById(rideId)
            .populate("user")
            .populate("captain")
            .exec();

          if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
          }
          res.status(200).json({ data: ride });

        } catch (error) {
          console.error("Error fetching ride data:", error.message);
          return res.status(500).json({ message: "Server Error", error: error.message });
        }
      };
      module.exports.getCaptainsData = async (req, res) => {
        if (!req.admin) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        const captainId = req.params.id;



        try {
          if (captainId) {
            const captain = await captainModel.findById(captainId).exec();
            if (!captain) {
              return res.status(404).json({ message: "Captain not found" });
            }
            return res.status(200).json({ data: captain });
          } else {
            const captains = await captainModel.find().exec();
            return res.status(200).json({ data: captains });
          }
        } catch (error) {
          console.error("Error fetching captains data:", error.message);
          return res.status(500).json({ message: "Server Error", error: error.message });
        }
      };

      module.exports.getUsersData = async (req, res) => {
        if (!req.admin) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        try {
          const users = await userModel.find().exec();
          res.status(200).json({ data: users });
        } catch (error) {
          console.error("Error fetching users data:", error.message);
          return res.status(500).json({ message: "Server Error", error: error.message });
        }
      }

      module.exports.updateCaptainData = async (req, res) => {
        if (!req.admin) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;
        const updatedData = req.body;

        try {
          const captain = await captainModel.findById(id);
          if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
          }

          // Check if updated email is already used by another captain
          if (updatedData.email) {
            const existingEmail = await captainModel.findOne({ email: updatedData.email, _id: { $ne: id } });
            if (existingEmail) {
              return res.status(400).json({ message: "Email is already in use by another captain" });
            }
            captain.email = updatedData.email;
          }

          // Check if updated mobile number is already used by another captain
          if (updatedData.mobileNumber) {
            const existingMobile = await captainModel.findOne({ mobileNumber: updatedData.mobileNumber, _id: { $ne: id } });
            if (existingMobile) {
              return res.status(400).json({ message: "Mobile number is already in use by another captain" });
            }
            captain.mobileNumber = updatedData.mobileNumber;
          }
          if(updatedData.vehiclePlate){
            const existingPlate = await captainModel.findOne({ 'vehicle.plate': updatedData.vehiclePlate, _id: { $ne: id } });
            if (existingPlate) {
              return res.status(400).json({ message: "Vehicle plate is already in use by another captain" });
            }
          }


          if (updatedData.firstname) captain.fullname.firstname = updatedData.firstname;
          if (updatedData.lastname) captain.fullname.lastname = updatedData.lastname;
          if (updatedData.vehicleModel) captain.vehicle.model = updatedData.vehicleModel;
          if (updatedData.vehicleType) captain.vehicle.vehicleType = updatedData.vehicleType;
          if (updatedData.vehiclePlate) captain.vehicle.plate = updatedData.vehiclePlate;
          if (updatedData.vehicleColor) captain.vehicle.color = updatedData.vehicleColor;
          if (updatedData.vehicleCapacity) captain.vehicle.capacity = updatedData.vehicleCapacity;

          await captain.save();

          res.status(200).json({ message: "Captain updated successfully", data: captain });

        } catch (error) {
          console.error("Error updating captain:", error.message);
          res.status(500).json({ message: "Server Error", error: error.message });
        }
      };
      module.exports.deleteCaptain = async (req, res) => {
        if (!req.admin) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.params;

        try {
          const captain = await captainModel.findByIdAndDelete(id);
          if (!captain) {
            return res.status(404).json({ message: "Captain not found" });
          }



          res.status(200).json({ message: "Captain deleted successfully" });

        } catch (error) {
          console.error("Error deleting captain:", error.message);
          res.status(500).json({ message: "Server Error", error: error.message });
        }
      };
      module.exports.getRidesStatus = async (req, res) => {
        if (!req.admin) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        try {
          const ridesStatus = await rideModel.aggregate([
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },

              }
            }
          ]);
          console.log("Rides Status:", ridesStatus);

          res.status(200).json({ data: ridesStatus });
        } catch (error) {
          console.error("Error fetching rides status:", error.message);
          res.status(500).json({ message: "Server Error", error: error.message });
        }
      };


