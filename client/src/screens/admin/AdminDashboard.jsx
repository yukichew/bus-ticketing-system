import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import DashboardCard from "../../components/admin/DashboardCard";
import LineChart from "../../components/admin/LineChart";
import PieChart from "../../components/admin/PieChart";
import { MdAttachMoney } from "react-icons/md";
import { IoIosBus } from "react-icons/io";
import { RiFilePaper2Line } from "react-icons/ri";
import { fetchTotalBusOperators } from "../../api/busOperator";
import { getTransactionsDetails } from "../../api/transaction";
import { getAllBusSchedules } from "../../api/schedule";
import { LuMapPinned } from "react-icons/lu";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalBusOperatorsActive, setTotalBusOperatorsActive] = useState(0);
  const [totalBusOperatorsPending, setTotalBusOperatorsPending] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalBusSchedule, setTotalBusSchedule] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
    console.log("Sidebar Open:", !isSidebarOpen);
  };

  useEffect(() => {
    console.log("Sidebar state changed:", isSidebarOpen);
  }, [isSidebarOpen]);

  // Get total application and bus operator
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const activeCount = await fetchTotalBusOperators("Active");
        const pendingCount = await fetchTotalBusOperators("Pending");

        setTotalBusOperatorsActive(activeCount);
        setTotalBusOperatorsPending(pendingCount);
      } catch (err) {
        console.error("Error fetching bus operators counts:", err);
      }
    };

    fetchCounts();
  }, []);

  // Get total sales
  useEffect(() => {
    const fetchTotalTransactions = async () => {
      try {
        const { totalAmount } = await getTransactionsDetails();
        setTotalSales(totalAmount);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTotalTransactions();
  }, []);

  // Get total bus schedule
  useEffect(() => {
    const fetchTotalBusSchedules = async () => {
      try {
        const { totalBusSchedules } = await getAllBusSchedules();
        setTotalBusSchedule(totalBusSchedules);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTotalBusSchedules();
  }, []);

  return (
    <div className="relative flex h-screen overflow-hidden">
      <AdminHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <Sidebar isSidebarOpen={isSidebarOpen} />

      <main
        className={`flex-1 p-4 transition-all duration-300 mt-24 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } overflow-y-auto`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Total Bus Schedule"
            value={totalBusSchedule}
            gradientColors={["#0A21C0", "#B3B4BD"]}
            icon={<LuMapPinned />}
            link="/manage-bus-schedule"
          />
          <DashboardCard
            title="Total Ticket Sales"
            value={totalSales}
            gradientColors={["#141619", "#2c2E3A"]}
            icon={<MdAttachMoney />}
            link="/manage-transactions"
          />
          <DashboardCard
            title="Total Bus Operators"
            value={totalBusOperatorsActive}
            gradientColors={["#050A44", "#0A21C0"]}
            icon={<IoIosBus />}
            link="/manage-user"
            sectionState="Bus Operators"
          />
          <DashboardCard
            title="Total Applications"
            value={totalBusOperatorsPending}
            gradientColors={["#141619", "#B3B4BD"]}
            icon={<RiFilePaper2Line />}
            link="/manage-applications"
          />
        </div>

        <div className="mt-8 flex space-x-4">
          <div className="flex-1 p-4 bg-white rounded-lg shadow-lg drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
            <div className="font-poppins font-medium">Analytics Report</div>
            <LineChart />
          </div>

          <div className="flex-[0.5] p-4 bg-white rounded-lg shadow-lg drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
            {" "}
            <div className="font-poppins font-medium">
              Ticket Sales by Bus Type
            </div>
            <PieChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
