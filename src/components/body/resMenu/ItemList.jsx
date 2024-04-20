// Importing necessary hooks and components
import { CDN_URL } from "../../../utils/constants";
import { useItemList } from "../../../utils/useItemList";
import { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

// ItemList component
const ItemList = ({ items, buttonContent, actionType }) => {
  // State for loading items
  const [loadingItems, setLoadingItems] = useState({});
  // Destructuring properties from the useItemList custom hook
  const { handleAddClick, handleDeleteClick, cartItems, isDarkMode, userId } =
    useItemList();

  // Function to handle click events
  const handleClick = (item) => {
    // Set loading state for clicked item
    setLoadingItems((prev) => ({ ...prev, [item.$id || item.id]: true }));

    // Handle add or delete actions
    if (actionType === "add") {
      handleAddClick(item).finally(() => {
        // Remove loading state after action is complete
        setLoadingItems((prev) => ({ ...prev, [item.$id || item.id]: false }));
      });
    } else if (actionType === "delete") {
      handleDeleteClick(item?.$id).finally(() => {
        // Remove loading state after action is complete
        setLoadingItems((prev) => ({ ...prev, [item.$id || item.id]: false }));
      });
    }
  };

  // Component return
  return (
    <div>
      {/* Map through items and render each item */}
      {items.map((item) => {
        // Destructure item properties
        const info = item?.card?.info || item;

        // Construct item and user ids
        const itemId = info.$id || info.id;
        const id = `${userId}${itemId}`;

        // Destructure info properties
        const { name, price, defaultPrice, description, imageId } = info;
        // Calculate prices to show
        const priceToShow =
          typeof price === "number" ? price / 100 : Number(price);
        const defaultPriceToShow =
          typeof defaultPrice === "number"
            ? defaultPrice / 100
            : Number(defaultPrice);

        // Check if item is in cart
        const isInCart = cartItems.some((cartItem) => cartItem?.$id === id);

        // Check if item is loading
        const isLoading = loadingItems[itemId];

        // Return item component
        return (
          <div
            key={id}
            className={`flex flex-col-reverse gap-3 items-center md:flex md:flex-row max-w-2xl mx-auto md:justify-between rounded-lg py-2 my-2 relative px-2 ${
              isDarkMode
                ? "bg-bgCard text-white transition duration-500"
                : "bg-gray-200 border-b-2 text-black shadow-lg transition duration-500"
            }`}
          >
            {/* Item details */}
            <div className="flex flex-col text-start text-wrap w-full">
              <span className="font-bold">{name}</span>
              <span>₹ {priceToShow || defaultPriceToShow}</span>
              <p
                className={`text-[1rem] ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                } my-3`}
              >
                {description}
              </p>
            </div>
            {/* Item image and action button */}
            <div className="w-full sm:w-1/2 md:max-w-36 relative flex justify-center">
              <div className="w-full aspect-square relative rounded-lg overflow-hidden">
                <img
                  className={
                    imageId ? "absolute w-full h-full object-cover" : "hidden"
                  }
                  src={CDN_URL + imageId}
                  alt="dishImage"
                />
              </div>
              {/* Show loader when loading, else show the action button */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-lg">
                  <InfinitySpin />{" "}
                </div>
              )}
              {!isLoading && (
                <button
                  className={`py-1 w-3/4 md:px-4  text-white bg-bgColor shadow-lg rounded-lg absolute bottom-0 ${
                    isInCart && actionType === "add"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handleClick(info)}
                  disabled={isInCart && actionType === "add"}
                >
                  {buttonContent}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Exporting the ItemList component
export default ItemList;
