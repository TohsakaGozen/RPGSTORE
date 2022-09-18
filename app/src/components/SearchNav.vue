<template>
  <div class="search">
    <div class="dir">
      <a href="#">全部商品</a>
    </div>
    <hr />
    <div class="result">
      <button v-if="searchData.data">
        <p>{{ searchData.data }}</p>
        <i @click="deleteRes">X</i>
      </button>
      <button v-if="searchData.keyword">
        <p>{{ searchData.keyword }}</p>
        <i @click="deleteResKeyword">X</i>
      </button>
    </div>
    <table v-if="searchNav.title">
      <tr>
        <a
          href="#"
          v-for="(nav, index) in searchNav.title.tr1"
          :key="index"
          @click.prevent="getsearchDate(nav, searchNav.categoryid)"
          ><td>{{ nav }}</td></a
        >
      </tr>
      <tr>
        <a
          href="#"
          v-for="(nav, index) in searchNav.title.tr2"
          :key="index"
          @click.prevent="getsearchDate(nav, searchNav.categoryid)"
          ><td>{{ nav }}</td></a
        >
      </tr>
      <tr>
        <a
          href="#"
          v-for="(nav, index) in searchNav.title.tr3"
          :key="index"
          @click.prevent="getsearchDate(nav, searchNav.categoryid)"
          ><td>{{ nav }}</td></a
        >
      </tr>
      <tr>
        <a
          href="#"
          v-for="(nav, index) in searchNav.title.tr4"
          :key="index"
          @click.prevent="getsearchDate(nav, searchNav.categoryid)"
          ><td>{{ nav }}</td></a
        >
      </tr>
      <tr>
        <a
          href="#"
          v-for="(nav, index) in searchNav.title.tr5"
          :key="index"
          @click.prevent="getsearchDate(nav, searchNav.categoryid)"
          ><td>{{ nav }}</td></a
        >
      </tr>
      <tr>
        <a
          href="#"
          v-for="(nav, index) in searchNav.title.tr6"
          :key="index"
          @click.prevent="getsearchDate(nav, searchNav.categoryid)"
          ><td>{{ nav }}</td></a
        >
      </tr>
    </table>
  </div>
</template>

<script>
import { nextTick } from "vue";
import { mapGetters, mapState } from "vuex";
export default {
  name: "SearchNav",
  data() {
    return {
      searchData: {
        id: "",
        data: "",
        keyword: "",
        pageSize: 8,
        currentPage: 1,
        pagerCount: 5,
      },
      categoryid: 1,
    };
  },
  methods: {
    getsearchDate(navdata, id) {
      this.$router.push({
        name: "search",
        query: {
          data: navdata || this.$route.query.data,
          id: id || this.$route.query.id,
        },
        params: this.$route.params,
      });
      Object.assign(
        this.searchData,
        this.$route.query,
        this.$route.params,
        {
          data: navdata || this.$route.query.data,
        },
        this.showList.currentPage
      );
      console.log(this.searchData);
    },
    deleteRes() {
      this.searchData.data = "";
      this.$store.dispatch("search/ShowList", [this.searchData]);
      this.$store.dispatch("search/getNewSearchNav", [
        this.categoryid,
        this.searchData,
      ]);
      if (this.getsearchDate.keyword != "") {
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      } else {
        this.$router.push({
          name: "search",
        });
      }
    },
    deleteResKeyword() {
      this.searchData.keyword = "";
      this.$store.dispatch("search/ShowList", [this.searchData]);
      this.$store.dispatch("search/getNewSearchNav", [
        this.categoryid,
        this.searchData,
      ]);
      if (this.getsearchDate.query != "") {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      } else {
        this.$router.push({
          name: "search",
        });
      }
    },
  },
  computed: {
    ...mapState("search", ["showList"]),
    ...mapState("search", ["searchNav"]),
    ...mapGetters("search", ["navList"]),
  },
  beforeMount() {
    this.getsearchDate();
  },
  mounted() {
    nextTick(() => {
      this.$bus.$emit("getPageAll", this.searchData);
    });
    this.$store.dispatch("search/ShowList", [this.searchData]);
    for (let i = 1; i <= 5; i++) {
      if (this.searchData.id == i) {
        this.categoryid = i;
      }
    }
    this.$store.dispatch("search/getNewSearchNav", [
      this.categoryid,
      this.searchData,
    ]);
  },
  watch: {
    //监听路由属性
    $route(newvalue, oldvalue) {
      //路由变化时再次整理数据
      this.getsearchDate();
      this.$store.dispatch("search/ShowList", [this.searchData]);
      this.$store.dispatch("search/getNewSearchNav", [
        this.categoryid,
        this.searchData,
      ]);
    },
  },
};
</script>

<style scoped>
a:nth-child(1) {
  font-weight: bolder;
}
.dir {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 19px;
}
.dir a {
  border-radius: 5px 0;
  background-color: rgb(255, 189, 200);
  color: aliceblue;
  width: 85px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 1000;
  font-family: YOUYUAN;
  text-decoration: none;
}
.result {
  margin-top: 5px;
  width: 100%;
  display: flex;
  flex-direction: row;
}
button {
  border: 0;
  box-shadow: 0 0 5px silver;
  margin-right: 5px;
  min-width: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
}
button p {
  min-width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
button i {
  align-self: center;
  margin-top: 3px;
  text-decoration: none;
  color: black;
  cursor: pointer;
  margin-left: 10px;
}
.search {
  min-height: 350px;
}
table a {
  text-decoration: none;
  margin-right: 25px;
  margin-left: 5px;
  color: black;
  font-family: YOUYUAN;
}
table {
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
tr {
  border-bottom: 1px solid pink;
}
a :hover {
  background-color: azure;
}
</style>