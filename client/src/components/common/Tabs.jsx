import React, { useState, useEffect } from "react";

const Tabs = ({ tabs, orientation = "horizontal", activeTabProp }) => {
  const [activeTab, setActiveTab] = useState(activeTabProp || tabs[0].label);

  useEffect(() => {
    if (activeTabProp) {
      setActiveTab(activeTabProp);
    }
  }, [activeTabProp]);

  const renderTabContent = () => {
    const activeTabContent = tabs.find((tab) => tab.label === activeTab);
    return activeTabContent ? activeTabContent.content : null;
  };

  return (
    <div className={`tabs ${orientation === "vertical" ? "flex" : ""}`}>
      <div
        className={`tab-headers ${
          orientation === "vertical"
            ? "flex flex-col w-1/6 border-r"
            : "flex border-b"
        }`}
      >
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`p-3 text-right ${
              activeTab === tab.label
                ? orientation === "vertical"
                  ? "border-r-2 border-primary"
                  : "border-b-2 border-primary"
                : ""
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className={`tab-content p-4 ${
          orientation === "vertical" ? "w-5/6" : ""
        }`}
      >
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Tabs;
