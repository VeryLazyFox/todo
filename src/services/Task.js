import Api from "@/services/Api";

export default {
  get() {
    return Api().get("/tasks");
  },
  update({ id, ...task }) {
    return Api().put(`/tasks/${id}`, task);
  },
  create(task) {
    return Api().post("/tasks", task);
  },
  delete(id) {
    return Api().delete(`/tasks/${id}`);
  }
};
