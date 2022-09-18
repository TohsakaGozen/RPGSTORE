<template>
  <div class="shopCar">
    <div class="title">
      <h3>购物车(全部{{ shopCarList.length }})</h3>
      <h2>
        已选商品(不含运费)
        <p>{{ allGoodsPrice }}￥</p>
      </h2>
    </div>
    <div class="shopCarTitle">
      <div class="ItemIntrodece">
        <input
          type="checkbox"
          :checked="
            checkedGoods.length == shopCarList.length &&
            shopCarList.length != []
          "
          @click="allCheck($event)"
          name=""
          id=""
        />
        <p>全选</p>
        <h5>商品详情</h5>
      </div>
      <div class="onePrice">
        <h5>单价格</h5>
      </div>
      <div class="buyNumber">
        <h5>个数</h5>
      </div>
      <div class="AllPrice">
        <h5>总价格</h5>
      </div>
      <div class="Option">
        <h5>操作</h5>
      </div>
    </div>
    <div
      v-for="(item, index) in shopCarList"
      :key="index"
      :class="{ actived: highLight.indexOf(item.goodDetail.path) != -1 }"
      class="shopCarItem"
    >
      <div class="ItemIntrodece">
        <input
          ref="itemCheck"
          type="checkbox"
          :checked="false"
          @click="itemChecked($event, item)"
        />
        <img @click="goDetails(item)" :src="item.goodDetail.path" alt="" />
        <p @click="goDetails(item)">{{ item.goodDetail.produce }}</p>
      </div>
      <div class="onePrice">
        <h4>{{ item.goodDetail.price }}</h4>
      </div>
      <div class="buyNumber">
        <p
          @click="item.buyNumber <= 1 ? (item.buyNumber = 1) : item.buyNumber--"
        >
          -
        </p>
        <input type="text" :value="item.buyNumber" />
        <p @click="item.buyNumber++">+</p>
      </div>
      <div class="AllPrice">
        <h4>{{ item.buyNumber * item.goodDetail.price }}￥</h4>
      </div>
      <div class="Option">
        <h4 v-if="!item.goodDetail.isStar" @click="starItem(item)">收藏</h4>
        <h4 v-if="item.goodDetail.isStar" @click="starItem(item)">取消收藏</h4>
        <h4 @click="delItem(item)">删除</h4>
      </div>
    </div>
    <div class="shopCarResult">
      <div class="left">
        <div class="input">
          <input
            @click="allCheck($event)"
            :checked="
              checkedGoods.length == shopCarList.length &&
              shopCarList.length != []
            "
            type="checkbox"
            name=""
            id=""
          />
          <p>全选</p>
        </div>
        <h3 @click="checkedDel">删除</h3>
        <h3 @click="checkedStar">收藏</h3>
      </div>
      <div class="right">
        <h2>
          已选商品(不含运费)
          <p>{{ checkedGoods.length }}</p>
          件
        </h2>
        <p>{{ allGoodsPrice }}￥</p>
        <p @click="goTrade">提交订单</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "shopCar",
  data() {
    return {
      active: 0,
      checkedGoods: [],
      highLight: [],
    };
  },
  computed: {
    ...mapState("shopCar", ["shopCarList"]),
    allGoodsPrice() {
      let allGoodsPrice = 0;
      for (let good of this.checkedGoods) {
        allGoodsPrice = allGoodsPrice + good.buyNumber * good.goodDetail.price;
      }
      return allGoodsPrice;
    },
  },
  methods: {
    async goTrade() {
      try {
        await this.$store.dispatch("shopCar/addBuyGoods", this.checkedGoods);
        this.$router.push({
          name: "trade",
        });
      } catch (error) {
        this.$message({
          showClose: true,
          message: "提交失败",
          type: "warning",
        });
      }
    },
    goDetails(item) {
      this.$router.push({
        name: "details",
        query: item.goodDetail,
        params: item.moreImage,
      });
    },
    checkedStar() {
      for (let i of this.checkedGoods) {
        for (let j of this.shopCarList) {
          if (i.goodDetail.path == j.goodDetail.path) {
            this.starItem(j);
          }
        }
      }
    },
    checkedDel() {
      for (let i of this.checkedGoods) {
        console.log(i.goodDetail.produce);
        this.delItem(i);
      }
      for (let itemCheck of this.$refs.itemCheck) {
        itemCheck.checked = false;
      }
      this.checkedGoods = [];
    },
    async delItem(item) {
      try {
        await this.$store.commit("shopCar/DELITEM", item);
        this.checkedGoods.splice(this.checkedGoods.indexOf(item), 1);
        console.log(this.checkedGoods.length);
        console.log(this.shopCarList.length);
        this.$message({
          showClose: true,
          message: "删除成功",
          type: "success",
        });
      } catch (error) {}
    },
    starItem(item) {
      this.$store.commit("search/SETISSTAR", item.goodDetail);
      this.$store.commit("search/GETSTARLIST", item.goodDetail);
      this.$store.commit("shopCar/STARITEM");
    },
    itemChecked(event, good) {
      if (event.target.checked) {
        this.checkedGoods.push(good);
        this.highLight.push(good.goodDetail.path);
      } else {
        this.checkedGoods.splice(this.checkedGoods.indexOf(good), 1);
        this.highLight.splice(this.highLight.indexOf(good.goodDetail.path), 1);
      }
    },
    allCheck(event) {
      if (event.target.checked) {
        for (let itemCheck of this.$refs.itemCheck) {
          itemCheck.checked = true;
          this.checkedGoods = JSON.parse(JSON.stringify(this.shopCarList));
        }
        for (let i of this.shopCarList) {
          this.highLight.push(i.goodDetail.path);
        }
      } else {
        for (let itemCheck of this.$refs.itemCheck) {
          itemCheck.checked = false;
          this.checkedGoods = [];
          this.highLight = [];
        }
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.shopCarResult .left .input input {
  width: 15px;
  height: 15px;
  cursor: pointer;
}
.shopCarResult .left h3 {
  border: 1px solid silver;
  font-weight: 100;
  font-size: 15px;
  cursor: pointer;
  border-radius: 5px;
  padding: 3px;
  transition: all 0.1s;
}
.shopCarResult .left h3:hover {
  transform: scale(1.05);
  background-color: rgb(213, 255, 255);
}
.shopCarResult .left .input {
  display: flex;
  align-items: center;
  font-weight: 100;
}
.shopCarResult .left {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.shopCarResult .right {
  width: 500px;
  align-items: center;
  display: flex;
  justify-content: space-around;
}
.shopCarResult .right p:nth-child(3) {
  background-color: rgb(255, 118, 69);
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  display: flex;
  border-radius: 5px;
}
.shopCarResult .right h2 {
  display: flex;
  font-weight: 100;
  font-size: 18px;
  align-items: center;
}
.shopCarResult .right p {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 25px;
  color: orangered;
}
.shopCarResult {
  position: fixed;
  bottom: 0;
  width: 1380px;
  background-color: white;
  border-radius: 8px;
  height: 70px;
  display: flex;
  justify-content: space-between;
}
.shopCarItem h4 {
  font-size: 15px;
}
.shopCarItem .Option h4 {
  cursor: pointer;
  margin-top: 10px;
  padding: 3px;
  margin-bottom: 10px;
  box-shadow: 0 0 1px black;
  font-weight: normal;
  font-size: 13px;
  border-radius: 5px;
}
.shopCarItem .Option {
  width: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.shopCarItem .AllPrice h4 {
  font-size: 18px;
}
.shopCarItem .AllPrice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  text-align: center;
  color: rgb(255, 89, 0);
}
.shopCarItem .buyNumber p {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 1px black;
  height: 20px;
  width: 15px;
  padding: 1px;
  cursor: pointer;
  user-select: none;
}
.shopCarItem .buyNumber input {
  width: 18px;
  text-align: center;
  height: 21px;
}
.shopCarItem .buyNumber {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100px;
  text-align: center;
}
.shopCarItem .onePrice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  text-align: center;
}
.shopCarItem .ItemIntrodece {
  width: 300px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.shopCarItem .ItemIntrodece input {
  margin-top: 5px;
  margin-right: 20px;
  height: 15px;
  width: 15px;
  align-self: flex-start;
}
.shopCarItem .ItemIntrodece img {
  width: 120px;
  height: 100px;
  border-radius: 5px;
}
.shopCarItem .ItemIntrodece p {
  margin-left: 5px;
  width: 50%;
  font-size: 10px;
}
.shopCarItem {
  background-color: rgb(227, 226, 226, 0.5);
  padding: 10px;
  width: 90%;
  border: 2px solid rgb(212, 212, 212);
  display: flex;
  justify-content: space-around;
  flex-wrap: nowrap;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 15px;
}
.actived {
  border: 2px solid pink;
}
.title {
  width: 100%;
  height: 60px;
  display: flex;
  padding-left: 65px;
  padding-right: 65px;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
  font-family: YOUYUAN;
  border-bottom: 1px solid silver;
}
.title h2 {
  display: flex;
  font-size: 18px;
  font-weight: normal;
  align-items: center;
}
.title h2 p {
  margin-left: 10px;
  font-size: 25px;
  color: rgb(255, 77, 0);
}
.shopCarTitle .Option {
  width: 100px;
  text-align: center;
}
.shopCarTitle .AllPrice {
  width: 100px;
  text-align: center;
}
.shopCarTitle .buyNumber {
  width: 100px;
  text-align: center;
}
.shopCarTitle .onePrice {
  width: 100px;
  text-align: center;
}
.shopCarTitle .ItemIntrodece h5 {
  margin-left: 150px;
}
.shopCarTitle .ItemIntrodece p {
  font-size: 10px;
}
.shopCarTitle .ItemIntrodece input {
  margin-top: 2.5px;
  height: 13px;
  width: 13px;
}
.shopCarTitle .ItemIntrodece {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
  width: 300px;
}
.shopCarTitle {
  width: 90%;
  display: flex;
  justify-content: space-around;
  padding-left: 10px;
  padding-right: 10px;
  background-color: white;
}
.shopCar {
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  margin-bottom: 70px;
  align-items: center;
}
</style>