import axios from "@/utils/axios";

export default function getCsrf() {
  return axios.get("https://staging.pekadis.com/sanctum/csrf-cookie");
}
