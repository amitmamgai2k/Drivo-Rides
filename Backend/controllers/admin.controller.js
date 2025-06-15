const adminModel = require('../models/admin.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rideModel = require('../models/ride.model');
const captainModel = require('../models/captain.model');
const  userModel = require('../models/user.model');
const supportModel = require('../models/support.model');
const PaymentModel = require('../models/payment.model');


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
      console.log('ongoing rides count:', rides.length);
      return rides.length;
    } catch (error) {
      console.error('Error fetching ongoing rides:', error);
      return 0;
    }
  }
async function totalTimeTaken() {
    try {
      const rides = await rideModel.find({ status: "completed" });
      const totalTime = rides.reduce((acc, ride) => acc + ride.duration, 0);
      console.log('total time:', totalTime);
      return totalTime;
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
async function totalDistanceCovered() {
    try {
        const rides = await rideModel.find({ status: "completed" });
        const totalDistance = rides.reduce((acc, ride) => acc + ride.distance, 0);
        console.log('total distance:', totalDistance);
        return totalDistance;
    } catch (error) {
        console.error('Error fetching total distance:', error);
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
          const totalDistance = await totalDistanceCovered();
          const ongoingRides = await totalOngoingRides();
          const cancelledRides = await totalCancelledRides();
          const pendingRides = await totalPendingRides();
          const acceptedRides = await totalAcceptedRides();
          const totalTime = await totalTimeTaken();

          const metricsData = {
            totalRides,
            totalEarnings,
            activeCaptains,
            activeRiders,
            totalDistance,
            ongoingRides,
            cancelledRides,
            pendingRides,
            acceptedRides,
            totalTime
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
            .populate("payment")
            .exec();

          if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
          }
          console.log('ride',ride);

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
        const userId = req.params.id;
        try {
          if(userId){
            const user = await userModel.findById(userId).exec();
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ data: user });
          }else{
            const users = await userModel.find().exec();
            return res.status(200).json({ data: users });
          }

        } catch (error) {
          console.error("Error fetching users data:", error.message);
          return res.status(500).json({ message: "Server Error", error: error.message });
        }
      }
      module.exports.updateUserData = async (req, res) => {
        if (!req.admin) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
          const { id } = req.params;
          const updatedData = req.body;
          console.log('updatedData:', updatedData);

          try {
            const user = await userModel.findById(id);
            if (!user) {
              return res.status(404).json({ message: "User not found" });
            }
            if(updatedData.email){
              const existingUser = await userModel.findOne({ email: updatedData.email, _id: { $ne: id } });
              if (existingUser && existingUser._id.toString() !== id) {
                return res.status(400).json({ message: "Email already exists" });
              }
            }
              if(updatedData.mobileNumber){
                const existingUser = await userModel.findOne({ mobileNumber: updatedData.mobileNumber, _id: { $ne: id } });
                if (existingUser && existingUser._id.toString() !== id) {
                  return res.status(400).json({ message: "Mobile number already exists" });
                }
              }



            user.fullname.firstname = updatedData.firstname;
            user.fullname.lastname = updatedData.lastname;
            user.email = updatedData.email;
            user.mobileNumber = updatedData.mobileNumber;
            await user.save();
            res.status(200).json({ message: "User updated successfully" });
          } catch (error) {
            console.error("Error updating user:", error.message);
            return res.status(500).json({ message: "Server Error", error: error.message });
          }
        }
      }
      module.exports.deleteUser = async (req, res) => {
        if (!req.admin) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        const { id } = req.params;
        try {
          const user = await userModel.findByIdAndDelete(id);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
          console.error("Error deleting user:", error.message);
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
module.exports.getSupportTickets = async (req, res) => {
    if (!req.admin) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const supportTickets = await supportModel.find().exec();
        const formattedTickets = supportTickets.map(ticket => ({
            id: ticket._id,
            name: ticket.name,
            email: ticket.email,
            message: ticket.message,
            mobileNumber: ticket.mobileNumber,
            resolved: ticket.resolved,
            createdAt: ticket.createdAt.toISOString().split('T')[0],
            createdTime: ticket.createdAt.toISOString().split('T')[1].split('.')[0]
        }));

        res.status(200).json({ data: formattedTickets });
    } catch (error) {
        console.error("Error fetching support tickets:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
module.exports.resolveSupportTicket = async (req, res) => {
    if (!req.admin) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { ticketId } = req.params;

    try {
        const ticket = await supportModel.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }


        ticket.resolved = true;

        await ticket.save();

        res.status(200).json({ message: "Ticket resolved successfully" });
    } catch (error) {
        console.error("Error resolving support ticket:", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}


const monthMap = {
  1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr",
  5: "May", 6: "Jun", 7: "Jul", 8: "Aug",
  9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
};

module.exports.getMonthlyData = async (req, res) => {
  if (!req.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const rawData = await rideModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRides: { $sum: 1 },
          completedRides: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },
          earnings: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, "$price", 0],
            },
          },
        },
      },
      { $sort: { "_id": 1 } }
    ]);

    // Step 1: Pre-fill all months
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: monthMap[i + 1],
      totalRides: 0,
      completedRides: 0,
      earnings: 0,
    }));

    // Step 2: Overwrite with real data
    rawData.forEach(item => {
      const index = item._id - 1; // Month number is 1-based
      monthlyData[index] = {
        month: monthMap[item._id],
        totalRides: item.totalRides,
        completedRides: item.completedRides,
        earnings: item.earnings,
      };
    });

    res.status(200).json({ success: true, data: monthlyData });
  } catch (error) {
    console.error("Error fetching monthly data:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
const dayMap = {
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  0: "Sun"
};

module.exports.getWeeklyRides = async (req, res) => {
  if (!req.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const data = await rideModel.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          rides: { $sum: 1 },
        },
      }
    ]);


    const weeklyData = [
      { day: "Mon", rides: 0 },
      { day: "Tue", rides: 0 },
      { day: "Wed", rides: 0 },
      { day: "Thu", rides: 0 },
      { day: "Fri", rides: 0 },
      { day: "Sat", rides: 0 },
      { day: "Sun", rides: 0 },
    ];


    data.forEach(item => {
      const dayIndex = item._id === 1 ? 6 : item._id - 2;
      weeklyData[dayIndex].rides = item.rides;
    });

    console.log('weeklyData', weeklyData);

    res.status(200).json({ success: true, data: weeklyData });
  } catch (err) {
    console.error("Error fetching weekly rides:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


module.exports.getPaymentsData = async (req, res) => {
  if (!req.admin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Method 1: Using aggregation pipeline (Most efficient)
    const payments = await PaymentModel.aggregate([
      {
        $lookup: {
          from: "rides", // Make sure this matches your actual collection name
          localField: "rideId",
          foreignField: "_id",
          as: "rideData"
        }
      },
      {
        $unwind: {
          path: "$rideData",
          preserveNullAndEmptyArrays: false // This excludes payments without rides
        }
      },
      {
        $match: {
          "rideData.status": "completed" // Only completed rides
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userData"
        }
      },
      {
        $lookup: {
          from: "captains",
          localField: "captainId",
          foreignField: "_id",
          as: "captainData"
        }
      },
      {
        $unwind: { path: "$userData", preserveNullAndEmptyArrays: true }
      },
      {
        $unwind: { path: "$captainData", preserveNullAndEmptyArrays: true }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    const formattedPayments = payments.map(payment => ({
      orderId: payment.orderId,
      paymentId: payment.paymentId,
      ride: payment.rideData ? `${payment.rideData.originText} to ${payment.rideData.destinationText}` : "N/A",
      user: payment.userData ? `${payment.userData.fullname.firstname} ${payment.userData.fullname.lastname || ""}` : "N/A",
      captain: payment.captainData ? `${payment.captainData.fullname.firstname} ${payment.captainData.fullname.lastname || ""}` : "N/A",
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      upiId: payment.upiId || "N/A",
      status: payment.paymentStatus,
      bankReference: payment.bankReference || "N/A",
      gatewayName: payment.gatewayName || "N/A",
      paymentTime: payment.paymentTime.toISOString(),
      completionTime: payment.completionTime ? payment.completionTime.toISOString() : "Pending"
    }));

    res.status(200).json({
      success: true,
      count: formattedPayments.length,
      data: formattedPayments
    });

  } catch (error) {
    console.error("Error fetching payments data:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};