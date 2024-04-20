import { useDispatch, useSelector } from "react-redux";
import { addItems, removeItems } from "../store/slices/cartSlice.js";
import docService from "../appwrite/docs.js";
import { toast } from "react-toastify";

export const useItemList = () => {
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const cartItems = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state?.auth?.userData?.$id);
  const dispatch = useDispatch();

  // Function to handle add click
  const handleAddClick = async (item) => {
    try {
      const {
        id: cartItemId,
        name,
        price,
        defaultPrice,
        description,
        imageId,
      } = item;

      // Construct id
      const id = `${userId}${cartItemId}`;
      // Calculate prices
      const priceString = (price / 100).toString();
      const defaultpriceString = (defaultPrice / 100).toString();

      // Check if user is logged in
      if (userId) {
        // Create a new document for the cart item
        const createDocs = await docService.createCartItems({
          id,
          name,
          price: priceString,
          defaultPrice: defaultpriceString,
          description,
          imageId,
          userId,
        });

        // If document creation is successful, add the item to the cart
        if (createDocs) {
          dispatch(addItems(createDocs));
          toast.success("Item has been added successfully !");
        }
      } else {
        toast.error("Please sign in !");
        console.log("Please Sign In");
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  // Function to handle delete click
  const handleDeleteClick = async (itemId) => {
    try {
      // Delete the cart item document
      const deleteItem = await docService.deleteCartItems(itemId);

      // If document deletion is successful, remove the item from the cart
      if (deleteItem) {
        dispatch(removeItems(itemId));
        toast.error("Item has been removed successfully !");
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  // Return values from the hook
  return {
    handleAddClick,
    handleDeleteClick,
    cartItems,
    isDarkMode,
    userId,
  };
};
