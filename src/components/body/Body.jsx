import React, { useState } from "react";
import RestaurantCard, { isOpenLable } from "./restCard/RestaurantCard";
import Shimmer from "./restCard/Shimmer";
import { Link } from "react-router-dom";
import useRestaurantData from "../../utils/useRestaurantData";
import useOnlineStatus from "../../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import noresult from "../../logos/no-results.png";
import OfflinePage from "../OfflinePage";

// Body component for rendering the main content of the application
const Body = () => {
  // State for handling the search text
  const [searchText, setSearchText] = useState("");

  // Higher Order Component for the RestaurantCard
  const RestaurantCardLabel = isOpenLable(RestaurantCard);

  // Using Redux useSelector hook to get the darkMode state from the Redux store
  const isDarkMode = useSelector((state) => state.theme.darkMode);

  // Using custom hooks to get the data from the API and the online status
  const {
    resDataList,
    filteredList,
    setFilteredList,
    bgColor,
    cardColor,
    textColor,
    buttonColor,
    inputColor,
    title,
  } = useRestaurantData();

  const onlineStatus = useOnlineStatus();

  // If the user is offline, display the OfflinePage
  if (onlineStatus === false) return <OfflinePage />;

  // If the restaurant data list is empty, display the Shimmer component
  if (resDataList?.length === 0) {
    return <Shimmer />;
  }
  return (
    // Container for the main content
    <div className={`mt-20 h-auto py-4 ${bgColor}`}>
      <div
        className={`${cardColor} filter flex flex-col overflow-x-hidden  md:justify-between md:flex md:items-center rounded-lg shadow-md p-4`}
      >
        {/* Search input and filter button */}
        <div
          className={`search flex flex-col md:flex md:flex-row overflow-x-hidden justify-center md:gap-28 items-center px-4 py-1 w-full ${textColor}`}
        >
          {/* Search input */}
          <div className="relative w-[260px] md:w-72 min-w-[275.5px] overflow-x-hidden ">
            <input
              type="text"
              placeholder="Search for restaurants, cuisines"
              className={`search_input search-m border border-solid border-gray-300  rounded-xl p-2 pl-[40px] w-full text-[16px]  ${inputColor}`}
              value={searchText}
              onChange={(e) => {
                const searchTextValue = e.target.value.toLowerCase();
                setSearchText(searchTextValue);

                if (searchTextValue === "") setFilteredList(resDataList);
                else {
                  const filteredRestaurantList = resDataList?.filter(
                    (res) =>
                      res.info.name.toLowerCase().includes(searchTextValue) ||
                      res.info.cuisines.some((cuisine) =>
                        cuisine.toLowerCase().includes(searchTextValue)
                      )
                  );
                  setFilteredList(filteredRestaurantList);
                }
              }}
            />
            {/* Search icon */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: "#939393" }}
              ></i>
            </div>
          </div>
          {/* Filter button for top rated restaurants */}
          <button
            className={`filter_btn  md:mr-0 mt-3 md:mt-0 w-[275.5px] md:w-72 py-1 ${buttonColor} hover:bg-green-100 rounded-lg`}
            onClick={() => {
              let newResdataList = resDataList.filter((data) => {
                return data?.info?.avgRating > 4.3;
              });
              setFilteredList(newResdataList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>
      {/* Restaurant list section */}
      <div className="flex items-center  justify-center">
        <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)]  xl:w-[calc(100%-14rem)] 2xl:w-[calc(100%-25rem)]">
          <h2
            className={`food-menu-title my-10 text-center text-xl md:text-3xl font-bold ${
              isDarkMode && "text-textColor"
            }`}
          >
            {title}
          </h2>
          {/* If the filtered list is empty, display a message indicating no
          results found */}
          {filteredList.length === 0 ? (
            <div className="lg:flex lg:justify-center lg:items-center m-32">
              <img
                className="w-80"
                src={noresult}
                alt="Search Results Are Finished - No Results Found Cartoon@clipartmax.com"
              />
            </div>
          ) : (
            // If the filtered list is not empty, display the restaurant cards
            <div className="flex justify-center mx-auto  overflow-hidden">
              <div className=" grid grid-cols-1 gap-9 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-3  ">
                {filteredList?.map((data) => (
                  // Link to the restaurant details page
                  <Link key={data.info.id} to={"/restaurants/" + data.info.id}>
                    {/* If the restaurant have any offers, display the
                    RestaurantCardLabel component, otherwise display the
                    RestaurantCard component */}
                    {data.info.isOpen ? (
                      <RestaurantCardLabel resData={data} />
                    ) : (
                      <RestaurantCard resData={data} />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
