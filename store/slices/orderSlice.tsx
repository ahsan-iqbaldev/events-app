import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../../config/firebase";

interface getCategoryProps {
  userId: string;
  page: number;
}

interface addOrderProps {
  formData: any;
  onSuccess: any;
}

interface orderState {
  orders: any[];
  loading: boolean;
  error: string | null;
}

export const getMyOrders = createAsyncThunk(
  "orders/getMyOrders",
  async ({ userId, page }: getCategoryProps, { rejectWithValue }) => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection("orders")
        .where("userId", "==", userId)
        .get();

      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return orders;
    } catch (err: any) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({ formData, onSuccess }: addOrderProps, { rejectWithValue }) => {
    try {
      const createdAt = firebase.firestore.FieldValue.serverTimestamp();
      await firebase.firestore().collection("orders").add({
        ...formData,
        createdAt,
      });
      onSuccess();
    } catch (err: any) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);

const initialState: orderState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add order";
      });
  },
});

export default orderSlice.reducer;
