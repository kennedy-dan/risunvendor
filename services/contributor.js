import axios from "axios";

export function getContributorData() {
  return axios.get(`/contributor`);
}

export function updateContributorData(payload) {
  return axios.post(`/contributor/update-profile`, payload);
}

export function _contributorAssets(payload) {
  console.log(payload)
  return axios.get(`/assets/${payload}/contributor`);
}

export function getCategories() {
  return axios.get(`/form-categories`);
}

export function getCategoriesWithSubs() {
  return axios.get(`/categories`);
}

export function getTags() {
  return axios.get(`/tags`);
}

export function uploadAsset(payload) {
  return axios.post(
    `contributor/assets/store`,
    payload
  );
}

export function updateAsset(assetId, payload) {
  return axios.post(`/contributor/assets/${assetId}/update`, payload);
}

export function disableAsset(assetId) {
  return axios.post(`/contributor/assets/${assetId}/disable`);
}

export function uploadCoverImage(assetId, payload) {
  return axios.post(
    `contributor/assets/${assetId}/update-image`,
    payload
  );
}

export function uploadAdditionalFile(assetId, payload) {
  return axios.post(`/contributor/assets/${assetId}/upload-file`, payload);
}

export function requestAssetActivation(assetId) {
  return axios.post(`/contributor/assets/${assetId}/activate`);
}

export function getAssets(params) {
  return axios.get(`/contributor/assets`, { params });
}

export function getAsset(assetId) {
  return axios.get(`/contributor/assets/${assetId}`);
}

export function requestWithdrawal(payload) {
  return axios.post(`/contributor/withdrawals/initialize`, payload);
}

export function resendOtp(transactionId) {
  return axios.post(`/contributor/withdrawals/${transactionId}/resend-otp`);
}

export function confirmOtp(payload) {
  return axios.post(`/contributor/withdrawals/confirm-otp`, payload);
}

export function getBankingDetails() {
  return axios.get(`/contributor/account-details`);
}

export function getWithdrawalsHistory() {
  return axios.get(`/contributor/payouts`);
}

export function getSubContributors() {
  return axios.get(`/contributor/sub-contributors`);
}

export function getSubContributorsPermissions() {
  return axios.get(`/contributor/sub-contributors/permissions`);
}

export function createSubContributor(payload) {
  return axios.post(`/contributor/sub-contributors/create`, payload);
}

export function deleteSubContributor(params) {
  return axios.get(`/contributor/sub-contributors/delete`, { params });
}
