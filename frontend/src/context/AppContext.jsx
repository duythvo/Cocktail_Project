import { createContext, use, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  //const backendUrl = "https://server-cocktail.onrender.com";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [recipes, setRecipes] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [recipeBox, setRecipeBox] = useState([]);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const navigate = useNavigate();

  const [user, setUser] = useState(false);

  const getCart = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-cart`, {
        headers: {
          token,
        },
      });

      if (data.success) {
        setCart(data.cart.items); // 👈 Chỉ set phần `items`
        console.log(data.cart.items); // Để xem trong console
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getRecipes = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/recipe/getRecipes`);

      if (data.success) {
        setRecipes(data.recipes);
        console.log(data.recipes);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getBlogs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/blog/getBlogs`);

      if (data.success) {
        setBlogs(data.blogs);
        console.log(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getRecipeBox = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/recipe_box/getRecipeBox`,
        {
          headers: {
            token,
          },
        }
      );
      if (data.success) {
        setRecipeBox(data.recipeBox);
        console.log(data.recipeBox);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: {
          token,
        },
      });
      if (data.success) {
        setUser(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const addToRecipeBox = async (recipeId) => {
    if (!token) {
      toast.error("You need to log in first.");
      return;
    }

    if (!window.confirm("Do you want to buy this recipe?")) {
      return;
    } else {
      try {
        const response = await axios.post(
          `${backendUrl}/api/user/add-to-cart`,
          { recipeId },
          {
            headers: {
              token,
            },
          }
        );

        if (response.data.success) {
          setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const newItems = recipes.find(
              (recipe) => recipe.recipeId === recipeId
            );
            if (newItems) {
              updatedCart.push({
                recipeId: newItems.recipeId,
                name: newItems.name,
                image: newItems.image_URL,
                price: newItems.price,
              });
            }
            return updatedCart;
          });
          toast.success("Drink added to cart.");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again.");
      }
      navigate("/cart");
    }

    // try {
    //   const rbId = recipeBox[0].rbId;

    //   if (!rbId) {
    //     toast.error("No recipe found.");
    //     return;
    //   }

    //   const response = await axios.post(
    //     `${backendUrl}/api/user/add-to-box`,
    //     { recipeId, rbId },
    //     {
    //       headers: {
    //         token,
    //       },
    //     }
    //   );

    //   if (response.data.success) {
    //     toast.success("Drink added to Recipe Box.");
    //     setRecipeBox((prevRecipes) => {
    //       const updatedRecipes = [...prevRecipes];
    //       updatedRecipes[0].listRecipes.push({ recipeId });
    //       updatedRecipes[0].count += 1;
    //       return updatedRecipes;
    //     });
    //   } else {
    //     toast.error(response.data.message);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast.error("An error occurred. Please try again.");
    // }
  };

  const addToRecipeBoxFromCart = async (recipeId) => {
    try {
      const rbId = recipeBox[0].rbId;

      if (!rbId) {
        toast.error("No recipe found.");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/user/add-to-box`,
        { recipeId, rbId },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        //toast.success("Drink added to Recipe Box.");
        setRecipeBox((prevRecipes) => {
          const updatedRecipes = [...prevRecipes];
          updatedRecipes[0].listRecipes.push({ recipeId });
          updatedRecipes[0].count += 1;
          return updatedRecipes;
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const checkRecipeContainBox = (recipeId) => {
    if (!recipeBox || recipeBox.length === 0) {
      return false;
    }
    if (!recipeBox[0].listRecipes) {
      return false;
    }
    if (recipeBox[0].listRecipes.length === 0) {
      return false;
    }
    const recipeIds = recipeBox[0].listRecipes.map((recipe) => recipe.recipeId);
    return recipeIds.includes(recipeId);
  };

  const removeFromRecipeBox = async (recipeId) => {
    if (!token) {
      toast.error("You need to log in first.");
      return;
    }

    if (!window.confirm("Are you sure you want to remove selected drinks?")) {
      return;
    }

    try {
      const rbId = recipeBox[0].rbId;

      if (!rbId) {
        toast.error("No recipe box found.");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/user/remove-from-box`,
        { recipeId, rbId },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Drink removed from Recipe Box.");
        setRecipeBox((prevRecipes) => {
          const updatedRecipes = [...prevRecipes];
          const recipeIndex = updatedRecipes[0].listRecipes.findIndex(
            (recipe) => recipe.recipeId === recipeId
          );

          if (recipeIndex !== -1) {
            updatedRecipes[0].listRecipes.splice(recipeIndex, 1);
            updatedRecipes[0].count -= 1;
          }

          return updatedRecipes;
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const addToCart = async (recipeId) => {
    if (!token) {
      toast.error("You need to log in first.");
      return;
    }

    if (!window.confirm("Do you want to add this drink to your cart?")) {
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/add-to-cart`,
        { recipeId },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        setCart((prevCart) => {
          const updatedCart = [...prevCart];
          const newItems = recipes.find(
            (recipe) => recipe.recipeId === recipeId
          );
          if (newItems) {
            updatedCart.push({
              recipeId: newItems.recipeId,
              name: newItems.name,
              image: newItems.image_URL,
              price: newItems.price,
            });
          }
          return updatedCart;
        });
        toast.success("Drink added to cart.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const removeFromCart = async (recipeId) => {
    if (!token) {
      toast.error("You need to log in first.");
      return;
    }

    if (!window.confirm("Are you sure you want to remove selected drinks?")) {
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/remove-from-cart`,
        { recipeId },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        setCart((prevCart) => {
          const updatedCart = prevCart.filter(
            (item) => item.recipeId !== recipeId
          );
          return updatedCart;
        });
        toast.success("Recipe removed from cart.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const removeAllFromCart = async (recipeId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/remove-from-cart`,
        { recipeId },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        setCart((prevCart) => {
          const updatedCart = prevCart.filter(
            (item) => item.recipeId !== recipeId
          );
          return updatedCart;
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const createOrder = async (items, totalPrice) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/create-order`,
        {
          items: JSON.stringify(items),
          totalPrice: totalPrice,
        },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Order created successfully.");
        console.log(response.data.order);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const value = {
    recipes,
    getRecipes,
    token,
    setToken,
    user,
    setUser,
    backendUrl,
    loadUserProfileData,
    blogs,
    getBlogs,
    recipeBox,
    getRecipeBox,
    addToRecipeBox,
    checkRecipeContainBox,
    removeFromRecipeBox,
    cart,
    getCart,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    addToRecipeBoxFromCart,
    createOrder,
  };

  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    getRecipeBox();
  }, [token]);

  useEffect(() => {
    getCart();
  }, [token]);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUser(false);
    }
  }, [token]);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
