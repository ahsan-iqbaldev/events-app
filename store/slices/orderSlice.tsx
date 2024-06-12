import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../../config/firebase";

interface getCategoryProps {
  userId: string;
  onSuccess: any;
}
interface addOrder {
  formData: any;
  onSuccess: any;
}

interface eventState {
  orders: any;
  loading: boolean;
  error: any;
}

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async ({ formData, onSuccess }: addOrder, { rejectWithValue }) => {
    try {
      const createdAt = firebase.firestore.FieldValue.serverTimestamp();
      await firebase
        .firestore()
        .collection("orders")
        .add({ ...formData, createdAt });
      onSuccess();
    } catch (err: any) {
      console.error(err);
      return rejectWithValue(err.message);
    }
  }
);

const initialState: eventState = {
  orders: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export default orderSlice.reducer;
