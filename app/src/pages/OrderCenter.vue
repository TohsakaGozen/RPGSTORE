<template>
  <div class="order">
    <div class="orderTitle">订单中心</div>
    <div class="orderContent">
      <div class="orderLeft">
        <ul>
          <li
            v-for="(i, index) in orderListData"
            :key="index"
            :class="{ orderActive: index == active }"
            @click="changeIndex(index)"
          >
            {{ i }}
          </li>
        </ul>
      </div>
      <div class="orderRight">
        <div v-if="active == 0" class="otherBox">
          <div
            class="orderBox"
            v-for="(list, index1) in buyGoods"
            :key="index1"
          >
            <div v-for="(item, index) in list" :key="index" class="orderItem">
              <div class="itemIntroduce">
                <img :src="item.goodDetail.path" alt="" />
                <p>
                  {{ item.goodDetail.produce }}
                </p>
              </div>
              <p>{{ item.buyNumber }}</p>
              <p>{{ item.buyNumber * item.goodDetail.price }}￥</p>
              <div class="option">
                <p @click="goTrade(list)">去支付</p>
                <p @click="cancelOrder(item, list, index1)">取消订单</p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="
            active == 1 ||
            active == 2 ||
            active == 3 ||
            active == 4 ||
            active == 5
          "
          class="otherBox"
        >
          <h1 style="text-align: center">空空如也捏</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "order",
  data() {
    return {
      orderListData: [
        "未支付订单",
        "已支付订单",
        "待发货",
        "已发货",
        "购买历史",
      ],
      active: 0,
    };
  },
  computed: {
    ...mapState("shopCar", ["buyGoods"]),
  },
  methods: {
    async goTrade(list) {
      try {
        await this.$store.dispatch("shopCar/addBuyGoods", list);
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
    cancelOrder(item, list, index) {
      this.$store.dispatch("shopCar/cancelOrder", [item, list, index]);
      this.$message({
        showClose: true,
        message: "取消成功",
        type: "success",
      });
    },
    changeIndex(index) {
      this.active = index;
    },
  },
  mounted() {
    console.log(this.OrderData);
  },
};
</script>

<style scoped>
.orderBox {
  background-color: rgb(249, 234, 237);
  margin-bottom: 25px;
  border-bottom: 1px solid;
}
.orderActive {
  background-color: pink;
  border-radius: 5px;
}
.order {
  width: 100%;
  min-height: 585px;
  display: flex;
  flex-direction: column;
}
.orderTitle {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  background-color: rgb(255, 162, 178);
}
.orderContent {
  width: 100%;
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
}
.orderLeft ul {
  min-height: 490px;
  padding: 5px;
}
.orderLeft {
  width: 10%;
  background-color: white;
}
.orderLeft li {
  display: flex;

  justify-content: center;
  align-items: center;
  list-style: none;
  height: 40px;
  cursor: pointer;
}
.orderRight {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.orderRight .orderItem {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding: 10px;
}
.orderRight .orderItem .itemIntroduce {
  width: 300px;
  height: 100px;
  display: flex;
  flex-wrap: nowrap;
}
.orderRight .orderItem .itemIntroduce img {
  width: 50%;
}
.orderRight .orderItem p {
  text-align: center;
  min-width: 150px;
  align-self: center;
  font-size: 15px;
}
.orderRight .orderItem .option {
  text-align: center;
  min-width: 150px;
  align-self: center;
  font-size: 15px;
}
.orderRight .orderItem .option p {
  cursor: pointer;
  margin: 10px;
}
</style>