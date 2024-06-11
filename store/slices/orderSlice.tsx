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

//   export const  getOrder=createAsyncThunk(
//     "event/ getOrder",
//     async ({ userId, onSuccess }: getCategoryProps, { rejectWithValue }) => {
//       try {
//         await firebase
//           .firestore()
//           .collection("orderes")
//           .where("userId", "==", userId)
//           .onSnapshot((snapshot) => {
//             const categories: UserData[] = snapshot.docs.map((doc) => {
//               const data = doc.data() as Omit<UserData, "id">;
//               return {
//                 id: doc.id,
//                 ...data,
//               };
//             });
//             const categoriesArr = categories[0];

//             if (categoriesArr?.category.length > 0) {
//               onSuccess(categoriesArr?.category);
//               console.log(categoriesArr);
//               return categoriesArr;
//             }
//           });
//       } catch (err: any) {
//         console.log(err);
//         return rejectWithValue(err.message);
//       }
//     }
//   )

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
    //   .addCase(addOrder.pending, (state) => {
    //     console.log("Running");
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(addOrder.fulfilled, (state, action) => {
    //     state.loading = false;
    //   })
    //   .addCase(addOrder.rejected, (state, action) => {
    //     console.log("Error");
    //     state.loading = false;
    //     state.error = action.error;
    //   });
  },
});

export default orderSlice.reducer;
