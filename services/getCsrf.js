import axios from "@/utils/axios";

export default function getCsrf() {
  return axios.get("https://api.myartstock.com/sanctum/csrf-cookie");
}
