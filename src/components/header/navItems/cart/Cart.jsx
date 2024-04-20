import ItemList from "../../../body/resMenu/ItemList.jsx";
import useCart from "../../../../utils/useCart.js";
import { Link } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

// Cart component for rendering the shopping cart
const Cart = () => {
  // Using custom hook to get cart related states and functions
  const { isDarkMode, selectedItems, handleClearAll, isLoading } = useCart();

  // If there are no items in the cart, display a message indicating the cart is empty
  return selectedItems.length === 0 ? (
    <div
      className={`empty-cart w-screen h-screen border border-black flex flex-col items-center justify-center ${
        isDarkMode ? "text-gray-400" : "text-gray-500"
      }`}
    >
      {/* Image indicating the cart is empty */}
      <img
        className="w-[271px] h-[256px]"
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
        alt=""
      />
      <h3 className="mt-6 text-lg font-semibold text-gray-700">
        Your cart is empty
      </h3>

      {/* Suggestion to go to the home page to view more restaurants */}
      <p className="mt-2 text-gray-600">
        You can go to home page to view more restaurants
      </p>

      {/* Link to the home page */}
      <Link
        className=" mt-6 cursor-pointer font-inherit text-xs font-bold text-white bg-red-500 hover:bg-red-700  rounded-full outline-none  p-2 "
        to={"/"}
      >
        <span>SEE RESTAURANTS NEAR YOU</span>
      </Link>
    </div>
  ) : (
    // If there are items in the cart, display the cart items
    <div className={`text-center m-4  mt-40 p-4 ${isDarkMode && "text-white"}`}>
      <h1 className="text-2xl font-bold">Cart</h1>

      <div className=" m-auto">
        {/* If the cart is loading, display a spinner */}
        {isLoading && (
          <div className=" w-full flex items-center justify-center rounded-lg">
            <InfinitySpin />{" "}
          </div>
        )}

        {/* If the cart is not loading and there are items in the cart, display a clear cart button */}
        {!isLoading && selectedItems.length > 0 && (
          <button
            className="m-2 p-2 bg-bgColor hover:bg-slate-700 text-white rounded-lg"
            onClick={handleClearAll}
          >
            Clear Cart
          </button>
        )}

        {/* List of items in the cart */}
        <ItemList
          items={selectedItems}
          buttonContent={"Remove"}
          actionType={"delete"}
        />
      </div>
    </div>
  );
};

export default Cart;
