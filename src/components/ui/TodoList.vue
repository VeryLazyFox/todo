<template>
  <!-- <div class="todo-list__list"> -->
  <transition-group name="list" tag="div">
    <todo-item
      @toggleStarred="updateTodo"
      @changeText="updateTodo"
      @toggleCompleted="updateTodo"
      @delete="deleteTodo"
      v-for="item in tasks"
      :key="item.id"
      :item="item"
    ></todo-item>
  </transition-group>
  <!-- </div> -->
</template>

<script>
import TodoItem from "@/components/ui/TodoItem";
import { mapActions } from "vuex";

export default {
  name: "TodoList",
  components: {
    TodoItem
  },
  props: {
    tasks: Array
  },
  methods: {
    ...mapActions([
      "updateTask",
      "startFetching",
      "stopFetching",
      "deleteTask"
    ]),
    updateTodo(item) {
      this.startFetching();
      this.updateTask(item).then(this.stopFetching());
    },
    deleteTodo({ id }) {
      this.startFetching();
      this.deleteTask(id).then(this.stopFetching());
    }
  }
};
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
  max-height: 80px;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transition: all 0.5s;

  max-height: 0px;
  padding: 0 !important;
  margin: 0 !important;
}
</style>
