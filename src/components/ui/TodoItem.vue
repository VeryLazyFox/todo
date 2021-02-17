<template>
  <div
    v-on-clickaway="handleClickAwayContainer"
    class="todo-item__container"
    :class="{
      'todo-item__container-completed': completed,
      'todo-item__container-starred': item.starred
    }"
  >
    <div class="todo-item__wrapper">
      <el-checkbox
        v-model="completed"
        @change="toggleCompleted"
        size="medium"
        class="todo-item__checkbox"
      ></el-checkbox>
      <el-input
        v-on-clickaway="handleClickAway"
        v-model="text"
        @keydown.native="handleKeyDown"
        class="todo-item__input"
        :class="{
          'todo-item__input-disabled': disabled
        }"
        ref="inputRef"
        :readonly="disabled"
        maxlength="50"
        placeholder="Please input"
      ></el-input>
      <i
        @click="toggleStarred"
        :class="{
          'todo-item__icon-active': item.starred
        }"
        class="el-icon-star-on todo-item__icon"
      ></i>
      <i
        @click="editIconClick"
        class="el-icon-edit-outline todo-item__icon"
        :class="{
          'todo-item__icon-active': !disabled
        }"
      ></i>
      <i @click="deleteIconClick" class="el-icon-close todo-item__icon"></i>
    </div>
    <p class="todo-item__categories">
      <el-tag
        v-for="category in item.categoryArray"
        :key="category"
        :type="completed ? 'info' : ''"
        size="mini"
        >{{ category }}</el-tag
      >
    </p>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  data() {
    return {
      completed: false,
      text: "",
      disabled: true,
      editIconActive: false
    };
  },
  props: {
    item: {
      id: Number,
      text: String,
      completed: Boolean,
      starred: Boolean,
      created: String,
      categoryArray: Array
    }
  },
  methods: {
    fillItem(item) {
      this.text = item.text;
      this.completed = item.completed;
    },
    deleteIconClick() {
      this.$emit("delete", {
        id: this.item.id
      });
    },
    editIconClick() {
      this.editIconActive = !this.editIconActive;
      if (this.editIconActive) {
        this.disabled = false;
        this.$refs.inputRef.focus();
      }
    },
    handleClickAway(e) {
      if (this.disabled) {
        return;
      } else {
        if (
          this.editIconActive &&
          e.target.classList.contains("el-icon-edit-outline")
        ) {
          return;
        } else {
          this.canceledEdditing();
        }
      }
    },
    handleClickAwayContainer() {
      this.canceledEdditing();
    },
    canceledEdditing() {
      this.text = this.item.text;
      this.disabled = true;
      this.editIconActive = false;
    },
    changeText() {
      this.$emit("changeText", {
        ...this.item,
        text: this.text
      });
    },
    toggleStarred() {
      this.$emit("toggleStarred", {
        ...this.item,
        starred: !this.item.starred
      });
    },
    toggleCompleted() {
      this.$emit("toggleCompleted", {
        ...this.item,
        completed: this.completed
      });
    },
    handleKeyDown(e) {
      if (e.key === "Enter" || e.key === "Escape") {
        this.disabled = true;
        this.editIconActive = false;
      }
      if (e.key === "Enter") {
        this.changeText();
      }
      if (e.key === "Escape") {
        this.canceledEdditing();
      }
    }
  },
  mounted() {
    this.fillItem(this.item);
  },
  watch: {
    item: function(val) {
      this.fillItem(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.todo-item {
  &__container {
    background-color: white;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
    padding: 10px;
    margin-bottom: 15px;
    transition: all 0.5s ease;

    &-starred {
      background-color: $primary-light;
    }
    &-completed {
      background-color: $lite-background-secondary;
    }
  }
  &__wrapper {
    display: flex;
    align-items: center;
  }
  &__input {
    margin-left: 10px;
    .el-input__inner {
      border-color: transparent !important;
    }

    &-disabled {
      input {
        border-color: transparent !important;
      }
    }
  }
  &__icon {
    font-size: 25px;
    cursor: pointer;
    margin-right: 3px;
    &:hover {
      color: $primary;
    }
    &:last-child {
      margin-right: 0;
    }
    &-active {
      color: $primary;
    }
  }
  &__categories {
    margin: 0;
    font-size: 12px;
    text-align: start;
    .el-tag--mini {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>

<style lang="scss">
.todo-item__wrapper {
  .todo-item {
    &__input {
      &-disabled {
        input {
          border-color: transparent !important;
        }
      }
    }
    &__checkbox {
      @include check-box;
    }
  }
  .el-input__inner {
    transition: all 0.5s ease;
  }
}

.todo-item__container-starred {
  .el-input__inner {
    background-color: $primary-light !important;
  }
}
.todo-item__container-completed {
  .el-input__inner {
    background-color: $lite-background-secondary !important;
  }
}
</style>
