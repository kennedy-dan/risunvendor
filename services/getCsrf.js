import axios from "@/utils/axios";

export default function getCsrf() {
  return axios.get("https://myartstockapi.treendit.com/sanctum/csrf-cookie");
}
