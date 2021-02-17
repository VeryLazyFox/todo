<template>
  <div>
    <h2 class="headline">Create category</h2>
    <div class="new-category">
      <el-input
        class="new-category__input"
        v-model="category"
        maxlength="50"
        placeholder="Title"
        @keydown.native="handleKeyDown"
      ></el-input>
      <el-button @click="addCategory" type="primary">Create</el-button>
      <el-button @click="$router.push('/')" type="danger">Cancel</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      category: ""
    };
  },
  methods: {
    ...mapActions(["createCategoty", "startFetching", "stopFetching"]),
    handleKeyDown(e) {
      if (e.key === "Enter") {
        this.addCategory();
      }
    },
    addCategory() {
      if (this.category.trim().length > 0) {
        this.startFetching();
        this.createCategoty({ title: this.category }).then(
          this.stopFetching(),
          this.$router.push("/")
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.new-category {
  display: flex;
  &__input {
    margin-right: 10px;
  }
}
</style>
