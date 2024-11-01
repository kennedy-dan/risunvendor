import axios from "axios";

export function loginCustomer(payload) {
  return axios.post(`/login`, payload);
}

export function registerCustomer(payload) {
  return axios.post(`/register`, payload);
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
  return axios.post(`/account/settings/update-base-data`, payload);
}

export function uploadProfileImage(payload) {
  return axios.post(`/account/settings/update-profile-image`, payload);
}

export function updateAccountInformation(payload) {
  return axios.post(`/account/settings/update-bank-details`, payload);
}

export function updatePassword(payload) {
  return axios.post(`/account/settings/update-password`, payload);
}
