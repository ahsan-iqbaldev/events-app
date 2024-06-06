import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../../config/firebase";

interface HandleUser {
  payload: any;
  onSuccess: any;
}

export const handleUser = createAsyncThunk(
  "auth/handleUser",
  async ({ payload, onSuccess }: HandleUser, { rejectWithValue }) => {
    try {
      console.log(payload, "payloadpayload");
      const userId = payload?.userId;

      const identifyUser = await firebase
        .firestore()
        .collection("users")
        .where("userId", "==", userId)
        .get();

      console.log(identifyUser, "identifyUser");

      if (identifyUser?.empty) {
        const createdAt = firebase.firestore.FieldValue.serverTimestamp();
        const userData = { ...payload, createdAt };
        await firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .set(userData);
        onSuccess("Register sucessfully");

        return userData;
      } else {
        const userData = identifyUser.docs.map((doc) => doc.data());
        console.log("User Data:", userData);
        onSuccess("Login sucessfully");
        return userData[0];
      }
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

interface AuthState {
  User: any;
  loading: boolean;
  error: any;
}

const initialState: AuthState = {
  User: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleUser.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(handleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.User = action.payload;
      })
      .addCase(handleUser.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default authSlice.reducer;
