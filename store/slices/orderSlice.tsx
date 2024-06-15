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
  orderStats: any;
  loading: boolean;
  error: any;
}

interface OrderDetailsParams {
  paramId: any;
  onSuccess?: (categories: any) => void;
}

interface Order {
  id: string;
  userId: string;
  // Add other order fields here
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

export const getOrderDetails = createAsyncThunk(
  "order/getOrderDetails",
  async ({ paramId, onSuccess }: OrderDetailsParams, { rejectWithValue }) => {
    console.log(paramId, onSuccess, "paramId, onSuccess");
    try {
      const snapshot = await firebase
        .firestore()
        .collection("orders")
        .where("productId", "==", paramId)
        .get();

      const snapshot2 = await firebase
        .firestore()
        .collection("tickets")
        .doc(paramId)
        .get();

      const ticket = snapshot2.data();

      const categories = snapshot.docs.map((doc) => {
        const data = doc.data() as Order;
        return {
          ...data,
          id: doc.id,
          ticket,
        };
      });

      console.log(categories, "categories");

      if (onSuccess) {
        onSuccess(categories);
      }

      return categories;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const getSearchOrderEvents = createAsyncThunk(
  "event/getSearchOrderEvents",
  async ({ query }: any, { rejectWithValue }) => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection("orders")
        .doc(query)
        .get();

      // const categories = { id: snapshot.id, ...snapshot.data() };

      const categories = { id: snapshot.id, ...(snapshot.data() as any) };

      console.log(categories, "categoriescategories");

      const snapshot2 = await firebase
        .firestore()
        .collection("tickets")
        .doc(categories?.productId)
        .get();

      const ticket = snapshot2.data();
      console.log(ticket, "ticket");

      const data = {
        ...categories,
        ticket,
      };

      console.log(data, "data");

      return [data];
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

const initialState: eventState = {
  myTickets: null,
  orderStats: [],
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
      })
      .addCase(getOrderDetails.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        console.log(action.payload, "categories");
        state.loading = false;
        state.orderStats = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSearchOrderEvents.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchOrderEvents.fulfilled, (state, action) => {
        console.log(action.payload, "categories");
        state.loading = false;
        state.orderStats = action.payload;
      })
      .addCase(getSearchOrderEvents.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
