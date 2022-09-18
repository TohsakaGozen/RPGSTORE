<template>
  <div>
    <SearchNav />
    <SearchShowList />
  </div>
</template>

<script>
import SearchNav from "../components/SearchNav.vue";
import SearchShowList from "../components/SearchShowList.vue";
export default {
  components: { SearchShowList, SearchNav },
  name: "Search",
};
</script>

<style scoped>
</style>