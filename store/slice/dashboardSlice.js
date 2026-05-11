import axios from "@/utils/axios";
import getCsrf from "@/services/getCsrf";
import {
  registerCustomer,
  loginCustomer,
  resendEmailVerificationLink,
  dashboard,
  profile,
  order,
  orderId,
  updateAccountInformation,
  uploadProfile,
  requestWithdrawal,
  requesthistoryWithdrawal,
  getbanks,
  postbanks,
  getBankingDetails
} from "@/services/customer";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const dashboardinfo = createAsyncThunk(
  `customer/dashboard`,
  async (payload) => {
    const response = await dashboard();
    return response.data;
  }
);

export const orderinfo = createAsyncThunk(
  `customer/orderinfo`,
  async (payload) => {
    const response = await order();
    return response.data;
  }
);

export const createbankinfo = createAsyncThunk(
  `customer/createbankinfo`,
  async (payload) => {
    const response = await updateAccountInformation(payload);
    return response.data;
  }
);

export const editprofileinfo = createAsyncThunk(
  `customer/editprofileinfo`,
  async (payload) => {
    const response = await uploadProfile(payload);
    return response.data;
  }
);

export const withdrawreq = createAsyncThunk(
  `customer/withdrawreq`,
  async (payload) => {
    const response = await requestWithdrawal(payload);
    return response.data;
  }
);

export const withhistorydrawreq = createAsyncThunk(
  `customer/withhistorydrawreq`,
  async (payload) => {
    const response = await requesthistoryWithdrawal();
    return response.data;
  }
);

export const orderinfoId = createAsyncThunk(
  `customer/orderinfoId`,
  async (payload) => {
    const response = await orderId(payload);
    return response.data;
  }
);

export const profileinfo = createAsyncThunk(
  `customer/profileinfo`,
  async (payload) => {
    const response = await profile();
    return response.data;
  }
);

export const _banks = createAsyncThunk(
  "/_banks",
  async (payload) => {
    const response = await getbanks();
    return response.data;
  }
);

export const _banksdet = createAsyncThunk(
  "/_banksdet",
  async (payload) => {
    const response = await getBankingDetails();
    return response.data;
  }
);

export const _postbanks = createAsyncThunk(
  "/_postbanks",
  async (payload) => {
    const response = await postbanks(payload);
    return response.data;
  }
);

const initialState = {
  info: {
    loading: true,
    data: null,
  },
  order: {
    loading: true,
    data: null,
  },
  orderId: {
    loading: true,
    data: null,
  },
  profiledata: {
    loading: true,
    data: null,
  },
  withdrawhistory: {
    loading: true,
    data: null,
  },
   bnk: {
    data: null,
    loading: true,
  }, 
   bnkdet: {
    data: null,
    loading: true,
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(dashboardinfo.pending, (state) => {
        state.info.loading = true;
      })
      .addCase(dashboardinfo.rejected, (state) => {
        state.info.loading = false;
      })
      .addCase(dashboardinfo.fulfilled, (state, { payload }) => {
        state.info.data = payload;
        state.info.loading = false;
      });
      builder
      .addCase(orderinfo.pending, (state) => {
        state.order.loading = true;
      })
      .addCase(orderinfo.rejected, (state) => {
        state.order.loading = false;
      })
      .addCase(orderinfo.fulfilled, (state, { payload }) => {
        state.order.data = payload;
        state.order.loading = false;
      });
      builder
      .addCase(orderinfoId.pending, (state) => {
        state.orderId.loading = true;
      })
      .addCase(orderinfoId.rejected, (state) => {
        state.orderId.loading = false;
      })
      .addCase(orderinfoId.fulfilled, (state, { payload }) => {
        state.orderId.data = payload;
        state.orderId.loading = false;
      });

    builder
      .addCase(profileinfo.pending, (state) => {
        state.profiledata.loading = true;
      })
      .addCase(profileinfo.rejected, (state) => {
        state.profiledata.loading = false;
      })
      .addCase(profileinfo.fulfilled, (state, { payload }) => {
        state.profiledata.data = payload;
        state.profiledata.loading = false;
      });

      builder
      .addCase(_banks.pending, (state) => {
        state.bnk.loading = true;
      })
      .addCase(_banks.rejected, (state) => {
        state.bnk.loading = false;
      })
      .addCase(_banks.fulfilled, (state, { payload }) => {
        state.bnk.loading = false;
        state.bnk.data = payload;
      });
      builder
      .addCase(_banksdet.pending, (state) => {
        state.bnkdet.loading = true;
      })
      .addCase(_banksdet.rejected, (state) => {
        state.bnkdet.loading = false;
      })
      .addCase(_banksdet.fulfilled, (state, { payload }) => {
        state.bnkdet.loading = false;
        state.bnkdet.data = payload;
      });
  },
});

export default dashboardSlice.reducer;
