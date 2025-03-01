import { useContext,useEffect,useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
    LineElement,
    PointElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import {
    Users,
    Clock,
    BarChart3,
    IndianRupee,
    MapPin,
    ChevronUp,
    Calendar,
    TrendingUp,
    AlertCircle
} from "lucide-react";
import { CaptainDataContext } from "../../context/CaptainContext";

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    Legend,
    LinearScale,
    Title,
    Tooltip,
    LineElement,
    PointElement
);

function CaptainDashboard() {
    const [CanceledRides, setcanceledRides] = useState(0)
    const [completedRides, setcompletedRides] = useState(0)
    const [rideDetails, setRideDetails] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const captainData = useContext(CaptainDataContext);
     console.log('captainData',captainData);
     useEffect(() => {
        if (captainData) {
          gettingDashboardData();
        }
        }, [captainData]);

    const gettingDashboardData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/dashboard`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.status === 200) {
                toast.success('Dashboard data fetched successfully');
                setcanceledRides(response.data.cancelledRides);
                setcompletedRides(response.data.completedRides);
                setRideDetails(response.data.rideDetails);
                console.log('dashboard',response.data);
            }
        } catch (error) {
            toast.error('Failed to fetch dashboard data');
            console.error('Error fetching dashboard data:', error);

        }
    };





    // Dummy Data for Testing
    const totalRides = completedRides + CanceledRides;
    const canceledRides = CanceledRides;
    const totalEarnings = captainData.captain?.captain?.TotalEarnings ;
    const totalDistance = captainData.captain?.captain?.distanceTravelled  ;
    const totalTime = (captainData.captain?.captain?.hoursWorked ).toFixed(2);
    // in hours

    // Growth metrics
    const earningsGrowth = 8.5; // percentage
    const ridesGrowth = 12.3; // percentage
    const distanceGrowth = 5.2; // percentage
    const timeGrowth = -2.1; // percentage
    const cancellationRate = (canceledRides / totalRides) * 100;


    const recentRides = rideDetails.slice(0, 5).map((ride,index) => ({
        id : index+1,
        pickup: ride.origin,
        drop: ride.destination,
        fare: ride.price,
        status: ride.status,
        date: new Date(ride.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })





    }));
    const monthlyEarningsData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Earnings (₹)",
                data: [5000, 7000, 6500, 8000, 7200, 6000, 8500, 9000, 7800, 6700, 7100, 7500],
                backgroundColor: "rgba(56, 189, 248, 0.6)",
                borderColor: "rgb(56, 189, 248)",
                borderWidth: 2,
            },
        ],
    };

    const weeklyRidesData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Rides",
                data: [8, 12, 15, 10, 18, 22, 17],
                borderColor: "rgb(251, 191, 36)",
                backgroundColor: "rgba(251, 191, 36, 0.1)",
                tension: 0.3,
                fill: true,
                pointBackgroundColor: "rgb(251, 191, 36)",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 4,
            },
        ],
    };

    const rideStatsData = {
        labels: ["Completed Rides", "Cancelled Rides"],
        datasets: [
            {
                label: "Ride Stats",
                data: [totalRides - canceledRides, canceledRides],
                backgroundColor: ["#E0D68A", "#7699D4"],
                borderColor: ["black", "black"],
                borderWidth: 2,
            },
        ],
    };

    // Status color mapping
    const getStatusColor = (status) => {
        return status === "Completed" ? "bg-green-500" : "bg-red-500";
    };

    return (
        <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 text-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Captain Dashboard
                    </h1>

                    <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2 ">

                        <Calendar className="text-gray-400 mr-2 h-5 w-5" />
                        <span className="text-gray-300 text-sm">{ captainData.captain?.captain?.createdAt.slice(0, 4)}</span>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <StatCard
                        title="Total Rides"
                        value={totalRides}
                        icon={<Users className="text-yellow-400 h-6 w-6" />}
                        change={ridesGrowth}
                        bgGradient="from-yellow-500/20 to-yellow-600/20"
                        borderColor="border-yellow-500/40"
                    />
                    <StatCard
                        title="Total Earnings"
                        value={`₹${totalEarnings.toLocaleString()}`}
                        icon={<IndianRupee className="text-green-400 h-6 w-6" />}
                        change={earningsGrowth}
                        bgGradient="from-green-500/20 to-green-600/20"
                        borderColor="border-green-500/40"
                    />
                    <StatCard
                        title="Total Distance"
                        value={`${totalDistance.toLocaleString()} km`}
                        icon={<MapPin className="text-blue-400 h-6 w-6" />}
                        change={distanceGrowth}
                        bgGradient="from-blue-500/20 to-blue-600/20"
                        borderColor="border-blue-500/40"
                    />
                    <StatCard
                        title="Total Time"
                        value={`${totalTime} hrs`}
                        icon={<Clock className="text-purple-400 h-6 w-6" />}
                        change={timeGrowth}
                        bgGradient="from-purple-500/20 to-purple-600/20"
                        borderColor="border-purple-500/40"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Earnings Chart */}
                    <ChartCard title="Monthly Earnings" subtitle="Last 12 months revenue">
                        <Bar
                            data={monthlyEarningsData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false },
                                    tooltip: {
                                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                                        titleColor: '#f9fafb',
                                        bodyColor: '#f3f4f6',
                                        borderColor: 'rgba(75, 85, 99, 0.3)',
                                        borderWidth: 1,
                                        padding: 12,
                                        cornerRadius: 6,
                                    }
                                },
                                scales: {
                                    y: {
                                        grid: {
                                            color: 'rgba(75, 85, 99, 0.15)',
                                        },
                                        ticks: {
                                            color: 'rgba(156, 163, 175, 1)',
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            color: 'rgba(156, 163, 175, 1)',
                                        }
                                    }
                                }
                            }}
                        />
                    </ChartCard>

                    {/* Weekly Rides Chart */}
                    <ChartCard title="Weekly Rides" subtitle="Current week performance">
                        <Line
                            data={weeklyRidesData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false },
                                    tooltip: {
                                        backgroundColor: 'rgba(17, 24, 39, 0.8)',
                                        titleColor: '#f9fafb',
                                        bodyColor: '#f3f4f6',
                                        borderColor: 'rgba(75, 85, 99, 0.3)',
                                        borderWidth: 1,
                                        padding: 12,
                                        cornerRadius: 6,
                                    }
                                },
                                scales: {
                                    y: {
                                        grid: {
                                            color: 'rgba(75, 85, 99, 0.15)',
                                        },
                                        ticks: {
                                            color: 'rgba(156, 163, 175, 1)',
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            color: 'rgba(156, 163, 175, 1)',
                                        }
                                    }
                                }
                            }}
                        />
                    </ChartCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
    {/* Ride Status Pie Chart */}
    <ChartCard title="Ride Status" subtitle="Completion rate analysis" className="min-h-[450px] ">
        <div className="flex justify-center items-center  h-full ">
        <div className="h-80 w-80 mt-20 max-sm:min-h-60 max-sm:min-w-60 max-sm:mt-10">


                <Pie
                    data={rideStatsData}
                    options={{
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    color: 'rgba(156, 163, 175, 1)',
                                    padding: 20,
                                    usePointStyle: true,
                                    pointStyle: 'rect',
                                    boxWidth: 20,
                                    boxHeight: 10
                                }
                            },
                            tooltip: {
                                backgroundColor: 'rgba(17, 24, 39, 0.8)',
                                titleColor: '#f9fafb',
                                bodyColor: '#f3f4f6',
                                borderColor: 'rgba(75, 85, 99, 0.3)',
                                borderWidth: 1,
                                padding: 12,
                                cornerRadius: 6,
                            }
                        }
                    }}
                />
            </div>
        </div>
    </ChartCard>

    {/* Recent Rides Table (spans 2 columns) */}
    <div className="bg-gray-800 rounded-xl shadow-lg lg:col-span-2 border border-gray-700/50 min-h-[450px] flex flex-col">
        <div className="px-6 py-5 border-b border-gray-700/50 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-semibold text-white">Recent Rides</h2>
                <p className="text-gray-400 text-sm mt-1">Latest trip details</p>
            </div>
            <button  className="text-sm text-sky-400 hover:text-sky-300 transition-colors font-medium flex items-center">
                View All
                <ChevronUp className="h-4 w-4 ml-1 rotate-90" />
            </button>
        </div>
        <div className="overflow-x-auto flex-grow">
            <table className="min-w-full divide-y divide-gray-700/50">
                <thead>
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Pickup</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Drop</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Fare</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                    {recentRides.map((ride) => (
                        <tr key={ride.id} className="hover:bg-gray-700/30 transition-colors duration-150">
                            <td className="px-6 py-4">
                                <span className="text-sm text-gray-300">{ride.date}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm text-gray-300">{ride.pickup}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm text-gray-300">{ride.drop}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm font-medium text-white">{ride.fare}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    ride.status === "completed"
                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                                }`}>
                                    {ride.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>

                {/* Alert Section */}
                <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700/50 p-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-400">Attention needed</h3>
                            <div className="mt-2 text-sm text-gray-300">
                                <p>
                                    Your cancellation rate has increased by {cancellationRate.toFixed(2)}% compared to last month. High cancellation rates may affect your performance score.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function StatCard({ title, value, icon, change, bgGradient, borderColor }) {
    const isPositive = change >= 0;

    return (
        <div className={`bg-gray-800 rounded-xl shadow-lg p-6 border ${borderColor} relative overflow-hidden`}>
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-50`}></div>

            <div className="relative">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400 text-sm">{title}</p>
                    <div className="bg-gray-700/30 p-2 rounded-lg">{icon}</div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>

                <div className={`flex items-center text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    <span className="flex items-center">
                        {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingUp className="h-4 w-4 mr-1 rotate-180" />}
                        {isPositive ? "+" : ""}{change}%
                    </span>
                    <span className="text-gray-500 ml-1 text-xs">vs prev. month</span>
                </div>
            </div>
        </div>
    );
}

function ChartCard({ title, subtitle, children }) {
    return (
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700/50">
            <div className="px-6 py-5 border-b border-gray-700/50">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
            </div>
            <div className="p-6 h-64">{children}</div>
        </div>
    );
}

export default CaptainDashboard;