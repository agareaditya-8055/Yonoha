import React from "react";
import offline from "../logos/offline.png";

// OfflinePage component for rendering the offline page
const OfflinePage = () => {
  return (
    // Container for the offline image
    <div
      className="flex
    items-center justify-center mt-28"
    >
      {/* Offline image */}
      <img className="w-96 h-96" src={offline} alt="" />
    </div>
  );
};

export default OfflinePage;
