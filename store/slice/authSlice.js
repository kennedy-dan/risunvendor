import axios from "@/utils/axios";
import getCsrf from "@/services/getCsrf";
import {
  registerCustomer,
  loginCustomer,
  resendEmailVerificationLink,
} from "@/services/customer";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const _loginUser = createAsyncThunk(
  `customer/login`,
  async (payload) => {
    return getCsrf().then(async () => {
      const response = await loginCustomer(payload);
      return response;
    });
  }
);

export const _registerCustomer = createAsyncThunk(
  `customer/register`,
  async (payload) => {
    return getCsrf().then(async () => {
      const response = await registerCustomer(payload);
      return response;
    });
  }
);

export const registerContributor = createAsyncThunk(
  `contributor/register`,
  async (data) => {
    console.log(data);
    return getCsrf().then(async () => {
      const response = await axios.post(`/contributor/register`, {
        asset_type_of_interest: data,
      });
      return response.data;
    });
  }
);

// export const contributorLogin = createAsyncThunk(
// 	`contributor/register`,
// 	async ({ createData, cateID }) => {
// 		return getCsrf().then(async () => {
// 			const response = await axios.post(
// 				`/account/contributor/categories/${cateID}/register-auth-user`,
// 				createData
// 			);
// 			return response;
// 		});
// 	}
// );
export const resendEmailLink = createAsyncThunk(
  "auth/resendLink",
  async (data) => {
    return await axios.post(`/email/verification-notification`, data);
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (data) => {
    const response = await axios.post(
      "/account/settings/update-base-data",
      data
    );
    return response.data.data;
  }
);

const initialState = {
  user: null,
  contributorData: null,
  token: null,
  loading: false,
  status: "idle",
  error: null,
  modalDisplay: false,
  profileStatus: "idle",
  contributorToken: null,
  contributorStatus: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOutCustomer: (state) => {
      state.token = null;
      state.user = null;
      state.contributorData = null;
      state.contributorToken = null;
      state.error = null;
      state.loading = false;
    },
    setCustomerModalDisplay: (state, { payload }) => {
      state.modalDisplay = payload;
    },
    updateProfilePicture: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(_loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(_loginUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(_loginUser.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.loading = false;
        const { vendor } = payload.data.data;

        state.token = payload?.data?.token;
        state.user = vendor;
        // state.contributorData = user.contributor_data;
        // state.modalDisplay = false;
      });

    builder
      .addCase(_registerCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(_registerCustomer.rejected, (state) => {
        state.loading = false;
      })
      .addCase(_registerCustomer.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.data.data;
        toast.success(payload.data.message);
      });

    // REGISTER CONTRIBUTOR
    builder
      .addCase(registerContributor.pending, (state) => {
        state.contributorStatus = true;
      })
      .addCase(registerContributor.fulfilled, (state, { payload }) => {
        toast.success("Contributor's Account created successfully");
        state.contributorStatus = false;
        // state.token = payload?.data?.token_hash;
        //SWITCH TO STATUS
		console.log(payload)
        state.contributorToken = payload?.data?.contributor?.status;
      })
      .addCase(registerContributor.rejected, (state) => {
        state.contributorStatus = false;
      });

    //RESEND LINK
    builder
      .addCase(resendEmailLink.pending, (state) => {})
      .addCase(resendEmailLink.fulfilled, (state, { payload }) => {
        toast.success("Email Sent, Please Check your Mail");
      });

    //UPDATE PROFILE
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.profileStatus = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        if (payload) {
          state.profileStatus = "successful";
          toast.success("Profile Updated Successfully");
          state.user = payload;
        }
      });
  },
});

export const { logOutCustomer, setCustomerModalDisplay, updateProfilePicture } =
  authSlice.actions;
export default authSlice.reducer;
