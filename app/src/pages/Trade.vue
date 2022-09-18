<template>
  <div class="trade">
    <div class="tradeAllTitle">
      <h3>请仔细核对您的订单</h3>
    </div>
    <div class="address">
      <div class="tradeTitle">收货地址</div>
      <div
        v-for="(p, index) in address"
        :key="index"
        class="personAddress"
        @click="changeActive(p)"
        @keyup.enter="sureSet()"
        :class="{ active: p.isdefault == 1 }"
      >
        <li v-if="p.isSet != 1">{{ p.name }}</li>
        <input v-if="p.isSet == 1" v-model="p.name" type="text" />
        <li v-if="p.isSet != 1">{{ p.home }}</li>
        <input v-if="p.isSet == 1" v-model="p.home" type="text" />
        <li v-if="p.isSet != 1">{{ p.phone }}</li>
        <input v-if="p.isSet == 1" v-model="p.phone" type="text" />
        <li
          v-if="p.isdefault == 1 && p.isSet != 1"
          @click.stop="changeAddress(p)"
        >
          修改
        </li>
        <li v-if="p.isSet == 1" @click.stop="sureSet()">确认</li>
      </div>
    </div>
    <div class="sureOrder">
      <div class="tradeTitle">订单确认</div>
      <div class="itemTitle">
        <li>商品属性</li>
        <li>商品数量</li>
        <li>商品价格</li>
      </div>

      <div v-for="(item, index) in payGoods" :key="index" class="orderItem">
        <div class="itemIntroduce">
          <img :src="item.goodDetail.path" alt="" />
          <p>
            {{ item.goodDetail.produce }}
          </p>
        </div>
        <p>{{ item.buyNumber }}</p>
        <p>{{ item.buyNumber * item.goodDetail.price }}￥</p>
      </div>
    </div>
    <div class="pay">
      <div class="tradeTitle">支付</div>
      <div class="payContent">
        <ul>
          <li>支持</li>
          <li>微信支付</li>
          <li>支付宝支付</li>
          <li>银联卡支付</li>
        </ul>
        <div class="payPrice">
          <p>实时付款：</p>
          <h2>{{ allPrice }}￥</h2>
        </div>
        <br />
        <p>
          用户信息：{{ sureInfo.name }} | {{ sureInfo.home }} |
          {{ sureInfo.phone }}
        </p>

        <button class="payMoney">立即支付</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      address: [
        {
          name: "Tohsaka",
          home: "四川省巴中市",
          phone: "16791243580",
          isdefault: "1",
          isSet: "0",
        },
        {
          name: "Sill",
          home: "四川省成都市",
          phone: "13760639900",
          isdefault: "0",
          isSet: "0",
        },
        {
          name: "Rance",
          home: "北京市朝阳区",
          phone: "19140538031",
          isdefault: "0",
          isSet: "0",
        },
      ],
      sureInfo: {
        name: "Tohsaka",
        home: "四川省巴中市",
        phone: "18181487399",
        isdefault: "1",
        isSet: "0",
      },
    };
  },
  mounted() {
    console.log(this.payGoods);
  },
  computed: {
    ...mapState("shopCar", ["payGoods"]),
    allPrice() {
      let allPrice = 0;
      for (let i of this.payGoods) {
        allPrice += i.goodDetail.price * i.buyNumber;
      }
      return allPrice;
    },
  },
  methods: {
    sureSet() {
      for (let i of this.address) {
        i.isSet = 0;
      }
    },
    changeAddress(p) {
      console.log(111);
      p.isSet = 1;
    },
    changeActive(p) {
      console.log(222);
      for (let i of this.address) {
        i.isdefault = 0;
      }
      p.isdefault = 1;
      this.sureInfo = p;
    },
  },
};
</script>

<style scoped>
.payMoney {
  padding: 15px;
  width: 100px;
  font-size: 15px;
  color: white;
  border: 0;
  background-color: orange;
  margin: 20px;
  cursor: pointer;
}
.itemTitle {
  list-style: none;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid pink;
  padding-bottom: 15px;
}
.itemTitle li:nth-child(2) {
  padding-left: 150px;
}
.itemTitle li:nth-child(3) {
  padding-left: 20px;
}
.itemTitle li {
  width: 300px;
  text-align: center;
}
.trade {
  width: 100%;
  min-height: 585px;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
}
.tradeAllTitle {
  padding: 15px;
  font-size: 20px;
  color: pink;
  font-weight: 100;
}
.tradeTitle {
  font-family: YOUYUAN;
  width: 7%;
  font-size: 20px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
}
.address {
  border-top: 2px solid pink;
  min-height: 185px;
  padding: 10px;
}
.active {
  border-radius: 5px;
  border: 1px pink solid;
}
.personAddress {
  margin: 5px;
  display: flex;
  list-style: none;
  padding: 10px;
  width: 650px;
}
.personAddress li {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.personAddress li:nth-child(2) {
  min-width: 200px;
}

.personAddress li:nth-child(4) {
  margin-left: 25px;
  padding: 5px;
  font-size: 15px;
  box-shadow: 0 0 1px black;
  text-align: center;
  min-width: 40px;
}
.personAddress li:nth-child(1) {
  min-width: 100px;
}
.personAddress input {
  margin-right: 20px;
}
.sureOrder {
  margin-top: 20px;
  min-height: 185px;
  padding: 10px;
  border-top: 2px solid pink;
}
.orderItem {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  padding: 10px;
  border-bottom: 1px solid pink;
}
.itemIntroduce {
  width: 300px;
  height: 100px;
  display: flex;
  flex-wrap: nowrap;
}
.itemIntroduce img {
  width: 50%;
}
.orderItem p {
  text-align: center;
  min-width: 150px;
  align-self: center;
  font-size: 15px;
}
.pay {
  margin-top: 40px;
  border-top: 2px solid pink;
  padding: 10px;
  min-height: 185px;
}
.payContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.payContent ul {
  display: flex;
  list-style: none;
  padding: 10px;
}
.payContent ul li {
  padding-left: 10px;
}
.payPrice {
  display: flex;
  align-items: center;
}
</style>