import Api from "@/services/Api";

export default {
  get() {
    return Api().get("/category");
  },
  create(category) {
    return Api().post("/category", category);
  }
};
