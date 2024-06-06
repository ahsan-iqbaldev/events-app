import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "../../config/firebase";

interface HandleUser {
  payload: any;
  onSuccess: any;
}

interface UserData {
  id: string;
  category: string[];
  userId: string;
}

interface eventState {
  categories: any;
  loading: boolean;
  error: any;
  eventDetail: any;
}
interface getCategoryProps {
  userId: string;
  onSuccess: any;
}
interface getEventDetailsProps {
  id: string;
  onSuccess: any;
}

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async ({ payload, onSuccess }: HandleUser, { rejectWithValue }) => {
    try {
      console.log(payload);

      const { imageUrl, ...restPayload } = payload;

      const storageRef = firebase
        .storage()
        .ref()
        .child(`Eventimages/${imageUrl.name}`);
      await storageRef.put(imageUrl);
      const downloadURL = await storageRef.getDownloadURL();

      const finalPayload = {
        ...restPayload,
        imageUrl: downloadURL,
      };

      await firebase
        .firestore()
        .collection("events")
        .add(finalPayload)
        .then((doc) => {
          console.log(doc, "docbythen");
          onSuccess(doc?.id);
        });
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "event/addCategory",
  async ({ payload, onSuccess }: HandleUser, { rejectWithValue }) => {
    try {
      const identifyUser = await firebase
        .firestore()
        .collection("category")
        .where("userId", "==", payload?.userId)
        .get();

      if (identifyUser?.empty) {
        await firebase.firestore().collection("category").add(payload);
        onSuccess();
      } else {
        const userData: UserData[] = identifyUser.docs.map((doc) => {
          const data = doc.data() as Omit<UserData, "id">;
          return {
            id: doc.id,
            ...data,
          };
        });

        const categoryArr = userData[0]?.category || [];
        const updatePayload = [...categoryArr, ...(payload?.category || [])];

        await firebase
          .firestore()
          .collection("category")
          .doc(userData[0]?.id)
          .update({
            category: updatePayload,
          });

        onSuccess();
      }
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const getCategory = createAsyncThunk(
  "event/getCategory",
  async ({ userId, onSuccess }: getCategoryProps, { rejectWithValue }) => {
    try {
      await firebase
        .firestore()
        .collection("category")
        .where("userId", "==", userId)
        .onSnapshot((snapshot) => {
          const categories: UserData[] = snapshot.docs.map((doc) => {
            const data = doc.data() as Omit<UserData, "id">;
            return {
              id: doc.id,
              ...data,
            };
          });
          const categoriesArr = categories[0];

          if (categoriesArr?.category.length > 0) {
            onSuccess(categoriesArr?.category);
            console.log(categoriesArr);
            return categoriesArr;
          }
        });
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

export const getEventDetails = createAsyncThunk(
  "event/getEventDetails",
  async ({ id, onSuccess }: getEventDetailsProps, { rejectWithValue }) => {
    try {
      const eventReferrence = await firebase
        .firestore()
        .collection("events")
        .doc(id)
        .get();

      const eventDetail = eventReferrence?.data();
      onSuccess();
      return eventDetail;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

const initialState: eventState = {
  categories: null,
  eventDetail: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createEvent.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getCategory.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        console.log(action.payload, "action.payload");
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getEventDetails.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.eventDetail = action.payload;
      })
      .addCase(getEventDetails.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default eventSlice.reducer;
