import { useState } from "react";
import FAQ from "./FAQ";
import faqData from "../../../utils/faqData";
import { useSelector } from "react-redux";

// About component for rendering the About page
const About = () => {
  // State for handling the visibility of FAQ items
  const [showItems, setShowItems] = useState(0);

  // Using Redux useSelector hook to get the darkMode state from the Redux store
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  return (
    // Container for the About page content
    <div
      className={` m-auto mt-36 max-w-screen-md p-4 ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      {/* Title for the About page */}
      <h1 className="my-4 text-2xl font-semibold">More About this project</h1>

      {/* Container for the FAQ items */}
      <div className="flex items-center flex-col ">
        {/* Mapping over faqData to render each FAQ item */}
        {faqData.map((data, index) => (
          <FAQ
            key={data.id}
            // Show the FAQ item if its index matches the showItems state
            showItems={index === showItems ? true : false}
            // Function for handling the visibility of FAQ items
            setShowItems={() => {
              if (index === showItems) {
                setShowItems(null);
              } else {
                setShowItems(index);
              }
            }}
            title={data.title}
            description={data.description}
          />
        ))}
      </div>
    </div>
  );
};

export default About;
