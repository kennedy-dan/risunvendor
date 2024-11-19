import axios from "axios";

export function loginCustomer(payload) {
  return axios.post(`/vendor/login`, payload);
}
export function dashboard() {
  return axios.get('/vendor/dashboard')
}
export function order() {
  return axios.get('/vendor/orders')
}
export function orderId(id) {
  return axios.get(`/vendor/orders/${id}`)
}
export function profile() {
  return axios.get('/vendor/profile')
}
export function registerCustomer(payload) {
  return axios.post(`vendor/register`, payload);
}

export function forgotPassword(payload) {
  return axios.post(`/forgot-password`, payload);
}

export function resetPassword(payload) {
  return axios.post(`/reset-password`, payload);
}

export function resendEmailVerificationLink(payload) {
  return axios.post(`/email/verification-notification`, payload);
}

export function uploadProfile(payload) {
  return axios.post(`/vendor/update`, payload);
}

export function requestWithdrawal(payload) {
  return axios.post(`/vendor/withdrawals/request`, payload);
}

export function requesthistoryWithdrawal() {
  return axios.get(`/vendor/withdrawals/history`);
}

export function uploadProfileImage(payload) {
  return axios.post(`/account/settings/update-profile-image`, payload);
}

export function updateAccountInformation(payload) {
  return axios.post(`/vendor/bank-account/create`, payload);
}

export function updatePassword(payload) {
  return axios.post(`/account/settings/update-password`, payload);
}
