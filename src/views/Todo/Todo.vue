<template>
  <div class="todo">
    <div class="container__headline">
      <h2 class="headline">Sheduler</h2>
      <div class="state-block">
        <el-select
          v-model="category"
          @change="setCategoryFilter(category)"
          class="state-block__item"
          popper-class="state-block__dropdown"
          clearable
          no-data-text="no category"
          placeholder="Category"
        >
          <el-option
            v-for="item in sortCategoryList"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="sort"
          @change="setSortBy(sort)"
          class="state-block__item"
          placeholder="Sort by"
        >
          <el-option
            v-for="item in sortBy"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>

        <el-input
          placeholder="Search"
          suffix-icon="el-icon-search"
          v-model="searchQuery"
          @input="setSearchQuery(searchQuery)"
        >
        </el-input>
      </div>
    </div>
    <div class="todo-list__wrapper">
      <div class="todo-list__headline">
        <el-input
          class="todo-list__input"
          v-model="todoText"
          maxlength="50"
          placeholder="Headline"
          @keydown.native="handleKeyDown"
        ></el-input>
        <el-select
          v-model="categories"
          multiple
          class="todo-list__categories"
          collapse-tags
          placeholder="Select"
        >
          <el-option
            v-for="item in categoriesList"
            :key="item.title"
            :label="item.title"
            :value="item.title"
          >
          </el-option>
        </el-select>
        <el-button @click="addNewTask" type="primary" icon="el-icon-plus"
          >Add task</el-button
        >
        <el-button
          @click="$router.push('/create-category')"
          type="primary"
          icon="el-icon-plus"
          >Add category</el-button
        >
      </div>
      <todo-list
        v-if="sortedFilteredTaskList.length > 0"
        :tasks="sortedFilteredTaskList"
      ></todo-list>
      <p v-else>No tasks here yet</p>
    </div>
    <div class="todo-list__check-all">
      <el-checkbox
        :value="allCompleted"
        :disabled="allCompleted"
        @click.native.prevent="toggleCompleted"
        size="medium"
        class="todo-item__checkbox"
        >All tasks completed</el-checkbox
      >
    </div>
  </div>
</template>

<script>
import TodoList from "@/components/ui/TodoList";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Todo",
  components: {
    TodoList
  },
  data() {
    return {
      category: "",
      sort: "",
      searchQuery: "",
      todoText: "",
      completedAll: false,
      categories: []
    };
  },
  computed: {
    ...mapState({
      tasks({ task }) {
        return task.taskList;
      },
      sortBy({ task }) {
        return task.sortByList;
      },
      categoriesList({ category }) {
        return category.categories;
      }
    }),
    ...mapGetters([
      "sortCategoryList",
      "allCompleted",
      "sortedFilteredTaskList"
    ])
  },
  methods: {
    ...mapActions([
      "getTasks",
      "createTask",
      "getCategory",
      "completeAllTasks",
      "startFetching",
      "stopFetching",
      "setCategoryFilter",
      "setSearchQuery",
      "setSortBy"
    ]),
    toggleCompleted() {
      this.startFetching();
      const uncompletedTasks = this.tasks.filter(item => !item.completed);
      this.completeAllTasks(uncompletedTasks).then(() => {
        this.stopFetching();
      });
    },
    handleKeyDown(e) {
      if (e.key === "Enter") {
        this.addNewTask();
      }
    },
    // changeCategory() {
    //   this.setCategoryFilter(this.category)
    // },
    addNewTask() {
      if (this.todoText.trim().length > 0) {
        this.startFetching();
        this.createTask({
          text: this.todoText,
          completed: false,
          starred: false,
          created: Date.now(),
          categoryArray: this.categories
        }).then(
          (this.todoText = ""),
          (this.categories = []),
          this.stopFetching()
        );
      }
    }
  },
  mounted() {
    this.startFetching();
    this.getTasks().then(this.getCategory().then(this.stopFetching));
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 50px 0;
}
.container {
  width: 90%;
  padding: 20px;
  background-color: $lite-background;
  margin: 0 auto;
  border-radius: 8px;
  display: flex;
  &__headline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
  }
}
.headline {
  margin-right: 10px;
}
.state-block {
  display: flex;
  &__item {
    margin-right: 10px;
  }
}
.todo-list {
  &__wrapper {
    margin-bottom: 80px;
  }
  &__headline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  &__input {
    margin-right: 10px;
  }
  &__check-all {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &__categories {
    margin-right: 10px;
    min-width: 200px;
  }
}
</style>

<style lang="scss">
.todo {
  .todo-item {
    &__checkbox {
      @include check-box;
    }
  }
}
</style>
