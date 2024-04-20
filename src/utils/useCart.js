import { useDispatch, useSelector } from "react-redux";
import docService from "../appwrite/docs";
import { clearCart } from "../store/slices/cartSlice";
import { useState } from "react";
import { toast } from "react-toastify";

// Custom hook for cart operations
const useCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const selectedItems = useSelector((state) => state.cart.items);
  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.$id;
  const dispatch = useDispatch();

  // Function to clear all items from cart
  const handleClearAll = async () => {
    setIsLoading(true);
    try {
      // Fetch all items in the cart
      const allItems = await docService.showCartItems(userId);
      // Loop through all items and delete each one
      for (let i = 0; i < allItems.documents.length; i++) {
        const doc = allItems.documents[i];
        await docService.deleteCartItems(doc.$id);
      }
      dispatch(clearCart());
      // Show a success message
      toast.success("All items have been removed successfully !");
    } catch (error) {
      // Show an error message
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Return values from the hook
  return {
    isDarkMode,
    selectedItems,
    handleClearAll,
    isLoading,
  };
};

export default useCart;
