<template>
  <el-container class="wrapper" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="container">
      <router-view />
    </div>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    // HelloWorld,
  },
  computed: {
    ...mapState({
      fullscreenLoading(store) {
        return store.isFetching;
      }
    })
  },
  data() {
    return {
      category: "",
      sort: "",
      searchQuery: "",
      qwe: [
        {
          name: "qwe",
          id: 1
        },
        {
          name: "qw2e",
          id: 2
        }
      ]
    };
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
  justify-content: center;
  &__headline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
}
.headline {
  margin-right: 10px;
}
.state-block {
  display: flex;
  &__item {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
