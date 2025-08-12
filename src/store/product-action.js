import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import productActions from './product-slice'
// export const getProducts = createAsyncThunk("getProducts", async () => {
//   try {
//       const data = await axios.get(`http://localhost:8001/api/get-products`)
//     //   console.log("data" ,data);
      
//       return data
//   } catch (error) {
//     throw new Error(error)
//   }
    
// })

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({ sort = "new", page = 1, limit = 2, searchQuery = "",categories, }, { rejectWithValue }) => {
      try {
        // ✅ Only include `limit` if there's no search query
        const params = { sort, page, search: searchQuery, };
        if (!searchQuery) {
          params.limit = limit;
        }
        if (categories?.length) params.categories = categories.join(",");
        const response = await axios.get(`http://localhost:8001/api/get-products`, { params });

        // console.log("API Response:", response.data); // Debugging

        if (!response || !response.data) {
          throw new Error("Invalid API response format");
        }

        return {
          products: response.data,
          totalProduct: response.data.totalProduct || response.data.data.length,
        };
      } catch (error) {
        console.error("Error fetching products:", error);
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
  }
);

export const get_Subcategory = createAsyncThunk("get_Subcategory", async () => {
  try {
      const {data} = await axios.get(`http://localhost:8001/api/get-categories`)
      // console.log("data" ,data);
      
      return data
  } catch (error) {
    throw new Error(error)
  }
    
})

export const get_Subcat = createAsyncThunk("get_Subcat", async (id) => {
  try {
      const {data} = await axios.get(`http://localhost:8001/api/get-sub_category/${id}`)
      // console.log("data" ,data);
      
      return data
  } catch (error) {
    throw new Error(error)
  }
    
})
export const get_category = createAsyncThunk("get_category", async (id) => {
  try {
      const {data} = await axios.get(`http://localhost:8001/api/get-category/${id}`)
      // console.log("data" ,data);
      
      return data
  } catch (error) {
    throw new Error(error)
  }
    
})

// login

export const userLogin = createAsyncThunk("get-user",async(id) => {
  try {
    const token = sessionStorage.getItem("token");
    // console.log('token' , token);
    
    const userData = await axios.get(`http://localhost:8001/api/get-user/${id}`, {
      headers: { Authorization: `Bearer ${token}` } // Send token in headers
    });
    return userData.data;
  } catch (error) {
    throw new Error(error)
  }
})

// get cart

export const cart = createAsyncThunk("get-cart", async () => {
  try {
    const token = sessionStorage.getItem("token"); // Get token from sessionStorage

    const response = await axios.get("http://localhost:8001/api/get-cart", {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token
      },
    });

    // console.log(response.data);
    
    return response.data
  } catch (error) {
    throw new Error(error)
    
  }
})

//add to cart
export const addToCart = createAsyncThunk("add-cart", async ({ productId, quantity=1 }, { rejectWithValue,dispatch }) => {
  try {
      const response = await axios.post("http://localhost:8001/api/add-to-cart", { productId, quantity }, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      });
    // console.log(response.data);
    dispatch(cart())
      return response.data;
  } catch (error) {
      return rejectWithValue(error.response.data);
  }
});

//add wishlist
export const addWishlist = createAsyncThunk("add-wishlist", async ({ productId}, { rejectWithValue,dispatch }) => {
  try {
      const response = await axios.post("http://localhost:8001/api/add-wishlist", { productId }, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
      });
    // console.log(response.data);
    dispatch(cart())
      return response.data;
  } catch (error) {
      return rejectWithValue(error.response.data);
  }
});


// get wishlist

export const wishlist = createAsyncThunk("get-wishlist", async () => {
  try {
    const token = sessionStorage.getItem("token"); // Get token from sessionStorage

    const response = await axios.get("http://localhost:8001/api/get-wishlist", {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token
      },
    });

    // console.log(response.data);
    
    return response.data
  } catch (error) {
    throw new Error(error)
    
  }
})