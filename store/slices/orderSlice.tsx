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
  myTickets: any;
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

export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async ({ UserId }: any, { rejectWithValue }) => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection("orders")
        .where("userId", "==", UserId)
        .get();

      const categories: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));

      if (categories.length > 0) {
        const createdByIds = Array.from(
          new Set(categories.map((category: any) => category.createdBy))
        );
        const productIds = Array.from(
          new Set(categories.map((category: any) => category.productId))
        );

        const userDocs = await Promise.all(
          createdByIds.map((id: any) =>
            firebase.firestore().collection("users").doc(id).get()
          )
        );

        const productDocs = await Promise.all(
          productIds.map((id: any) =>
            firebase.firestore().collection("tickets").doc(id).get()
          )
        );

        const userMap = userDocs.reduce((acc: any, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        }, {});

        const productMap = productDocs.reduce((acc: any, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        }, {});

        console.log(productMap);

        const categoriesWithUserDataAndProductData = categories.map(
          (category: any) => ({
            ...category,
            organizer: userMap[category.createdBy],
            ticket: productMap[category.productId],
          })
        );

        return categoriesWithUserDataAndProductData;
      } else {
        return [];
      }
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

const initialState: eventState = {
  myTickets: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        console.log(action.payload, "categories");
        state.loading = false;
        state.myTickets = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
