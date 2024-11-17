import axios from "@/utils/axios";
import getCsrf from "@/services/getCsrf";
import {
  registerCustomer,
  loginCustomer,
  resendEmailVerificationLink,
  dashboard,
  profile,
  order,
  orderId
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
  },
});

export default dashboardSlice.reducer;
