import React, { useState } from "react";
import BusScheduleSummary from "../../../components/admin/BusScheduleSummary";
import Carousel from "../../../components/common/Carousel";
import ViewBusRoutes from "../../../components/admin/modal/ViewBusRoutes";

const BusScheduleInfo = ({ schedule }) => {
  const [activeTab, setActiveTab] = useState("routes");

  const busImages = schedule?.busImages || [];

  const renderActiveTabContent = () => {
    if (activeTab === "routes") {
      return <BusScheduleSummary schedule={schedule} />;
    }
    if (activeTab === "images" && busImages.length > 0) {
      return <Carousel images={busImages} />;
    }
    if (activeTab === "bus info") {
      return <ViewBusRoutes schedule={schedule} />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("routes")}
          className={`px-4 py-2 rounded ${
            activeTab === "routes" ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          Routes Info
        </button>
        <button
          onClick={() => setActiveTab("bus info")}
          className={`px-4 py-2 rounded ${
            activeTab === "bus info" ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          Bus Info
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={`px-4 py-2 rounded ${
            activeTab === "images" ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          Bus Images
        </button>
      </div>

      <div className="border-t pt-4">{renderActiveTabContent()}</div>
    </div>
  );
};

export default BusScheduleInfo;
