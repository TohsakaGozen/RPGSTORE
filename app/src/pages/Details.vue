<template>
  <div class="content">
    <div class="itemParams">
      <div class="bigGlass">
        <div
          @mouseleave="display()"
          @mousemove="glass($event)"
          class="event"
        ></div>
        <img id="showImage" ref="showImage" :src="goodDetail.path" alt="" />
        <div ref="bigImage" class="bigImage">
          <img id="big" ref="big" :src="goodDetail.path" alt="" />
        </div>
        <div ref="mask" class="mask"></div>
        <div class="moreImage">
          <img
            @mouseenter="changeImage(goodDetail.path)"
            :src="goodDetail.path"
            alt=""
          />
          <img
            v-for="(image, index) in moreImage"
            :key="index"
            @mouseenter="changeImage(image)"
            :src="image"
            alt=""
          />
        </div>
      </div>
      <div class="shoppingParams">
        <div class="title">
          <h2>{{ goodDetail.produce }}</h2>
        </div>
        <div class="params">
          <form>
            <div class="price">
              <div class="goodPrice">
                <h3>价格:</h3>
                <p>￥{{ goodDetail.price }}</p>
              </div>
              <div class="activity">
                <h3>本店活动：满{{ 0.2 * parseInt(goodDetail.price) }}包邮</h3>
              </div>
            </div>
            <div class="sell">
              <h4>月销量：</h4>
              <p>{{ 100 * Math.ceil(5 * Math.random()) }}+</p>
            </div>
            <div class="email">
              <h3>配送</h3>
              <p>眉山东坡区</p>
              <p>至</p>
              <select name="" id="">
                <option value="">北京</option>
                <option value="">上海</option>
                <option value="">广州</option>
                <option value="">深圳</option>
                <option value="">成都</option>
              </select>
              <p style="font-size: 10px">快递:5￥</p>
              <p style="font-size: 10px">店铺预售,付款后90天内发货</p>
            </div>
            <div class="select">
              <div class="ver">
                <h3>版本</h3>
                <p
                  @click="changeVer1($event)"
                  data-class="1"
                  :class="verClass.ver1Class"
                >
                  台港版
                </p>
                <p
                  @click="changeVer1($event)"
                  data-class="2"
                  :class="verClass.ver2Class"
                >
                  国版
                </p>
                <p
                  @click="changeVer1($event)"
                  data-class="3"
                  :class="verClass.ver3Class"
                >
                  日版
                </p>
              </div>
              <div class="ver">
                <h3>语言</h3>
                <p
                  @click="changeVer2($event)"
                  data-class="4"
                  :class="verClass.ver4Class"
                >
                  中文
                </p>
                <p
                  @click="changeVer2($event)"
                  data-class="5"
                  :class="verClass.ver5Class"
                >
                  日文
                </p>
                <p
                  @click="changeVer2($event)"
                  data-class="6"
                  :class="verClass.ver6Class"
                >
                  英文
                </p>
              </div>
            </div>
            <div class="many">
              <h3>数量</h3>
              <div class="number">
                <input
                  @change="changeNumber($event)"
                  v-model="buyNumber"
                  type="text"
                />
                <div class="change">
                  <a @click.prevent="buyNumber++" href="#">+</a>
                  <a
                    @click.prevent="
                      buyNumber > 1 ? buyNumber-- : (buyNumber = 1)
                    "
                    href="#"
                    >-</a
                  >
                </div>
              </div>

              <p>件</p>
              <h6>有货</h6>
            </div>
            <div class="button">
              <h5 @click="goTrade">立即购买</h5>
              <button @click="addShopCar">加入购物车</button>

              <p>￥{{ goodDetail.price * buyNumber }}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="moreDetail">
      <div class="left">
        <div class="moreOption">
          <ul>
            <li class="moreOptionActive">商品详情</li>
            <li>评价</li>
            <li>专项服务</li>
          </ul>
          <div class="goodAttribu">
            <table>
              <tr>
                <th>品牌:</th>
                <td>other/其他</td>
                <th>规格:</th>
                <td>标准</td>
                <th>货号:</th>
                <td>005</td>
              </tr>
              <tr>
                <th>上市年份:</th>
                <td>2022</td>
                <th>材料:</th>
                <td>标准</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="showGoodImages">
          <img :src="goodDetail.path" alt="" />
          <img
            v-for="(image, index) in moreImage"
            :key="index"
            :src="image"
            alt=""
          />
        </div>
      </div>
      <div class="right">
        <div class="rightSection">
          <div class="hotList">
            <div class="hotTitle">
              <h4>最热排行</h4>
            </div>
            <div
              v-for="(hot, index) in hotList"
              :key="index"
              class="hotItem"
              @click="goAnotherDetail(hot)"
            >
              <img :src="hot.path" alt="" />
              <div class="hotItemIntroduce">
                <p>{{ hot.produce }}</p>
                <h4>{{ hot.price }}￥</h4>
              </div>
            </div>
          </div>
          <div class="likeList">
            <div class="likeTitle">
              <h4>推荐</h4>
            </div>
            <div
              v-for="(like, index) in likeList1"
              :key="index"
              class="likeItem"
              @click="goAnotherDetail(like)"
            >
              <img :src="like.path" alt="" />
              <div class="likeItemIntroduce">
                <p>{{ like.produce }}</p>
                <h4>{{ like.price }}￥</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Details",
  data() {
    return {
      goodDetail: {},
      moreImage: {},
      buyNumber: 1,
      verClass: {
        ver1Class: "",
        ver2Class: "",
        ver3Class: "",
        ver4Class: "",
        ver5Class: "",
        ver6Class: "",
      },
    };
  },
  computed: {
    ...mapState("home", ["hotList"]),
    ...mapState("home", ["likeList1"]),
  },
  methods: {
    async goTrade() {
      try {
        await this.$store.dispatch("shopCar/addBuyGoods", [
          {
            goodDetail: this.goodDetail,
            buyNumber: this.buyNumber,
            moreImage: this.moreImage,
          },
        ]);
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
    addSuccess() {
      this.$message({
        showClose: true,
        message: "成功添加到购物车",
        type: "success",
      });
    },
    addFailue() {
      this.$message({
        showClose: true,
        message: "已经在购物车中了哦",
        type: "warning",
      });
    },
    async addShopCar() {
      try {
        if (this.$store.state.user.token) {
          await this.$store.dispatch("shopCar/addShopCar", {
            goodDetail: this.goodDetail,
            buyNumber: this.buyNumber,
            moreImage: this.moreImage,
          });
          this.addSuccess();
        } else {
          this.$router.push({
            name: "login",
          });
        }
      } catch (error) {
        this.addFailue();
      }
    },
    goAnotherDetail(hot) {
      this.$router.push({
        name: "details",
        query: hot,
        params: hot.moreImage,
      });
      console.log(hot);
    },
    changeVer1(event) {
      this.verClass.ver1Class = 0;
      this.verClass.ver2Class = 0;
      this.verClass.ver3Class = 0;

      if (event.target.dataset.class == 1) {
        this.verClass.ver1Class = "verActive";
      } else if (event.target.dataset.class == 2) {
        this.verClass.ver2Class = "verActive";
      } else if (event.target.dataset.class == 3) {
        this.verClass.ver3Class = "verActive";
      }
    },
    changeVer2(event) {
      this.verClass.ver4Class = 0;
      this.verClass.ver5Class = 0;
      this.verClass.ver6Class = 0;

      if (event.target.dataset.class == 4) {
        this.verClass.ver4Class = "verActive";
      } else if (event.target.dataset.class == 5) {
        this.verClass.ver5Class = "verActive";
      } else if (event.target.dataset.class == 6) {
        this.verClass.ver6Class = "verActive";
      }
    },
    changeNumber(event) {
      let value = event.target.value;
      if (isNaN(value) || value < 1) {
        this.buyNumber = 1;
      } else {
        //正常大于1【大于1整数不能出现小数】
        this.buyNumber = parseInt(value);
      }
    },
    display() {
      let mask = this.$refs.mask;
      let big = this.$refs.bigImage;
      mask.style.display = "none";
      big.style.display = "none";
    },
    glass(event) {
      let mask = this.$refs.mask;
      let bigImage = this.$refs.bigImage;
      let big = this.$refs.big;
      mask.style.display = "block";
      bigImage.style.display = "block";
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      if (left <= 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top <= 0) top = 0;
      if (top >= 220) top = 220;
      if (left >= mask.offsetHeight) left = mask.offsetHeight;
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    },
    changeImage(path) {
      if (path) {
        this.$refs.showImage.src = path;
        this.$refs.big.src = path;
      }
    },
  },
  created() {
    this.$store.dispatch("home/getHotList");
    this.$store.dispatch("home/getLikeList");
    this.goodDetail = this.$route.query;
    this.goodDetail.isStar = 0;
    console.log(this.goodDetail);
    this.moreImage = this.$route.params;

    for (let i in this.moreImage) {
      if (this.moreImage[i] == undefined) {
        delete this.moreImage[i];
      }
    }
  },
  watch: {
    $route(n, o) {
      location.reload();
    },
  },
};
</script>

<style scoped>
.likeItem .likeItemIntroduce h4 {
  font-size: 20px;
  color: rgb(255, 124, 59);
  align-self: flex-end;
}
.likeItem .likeItemIntroduce {
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: YOUYUAN;
  font-size: 15px;
}
.likeItem {
  width: 100%;
  height: 380px;
  background-color: white;
  border-bottom: 1px black solid;
  display: flex;
  border-radius: 1px;
  flex-direction: column;
  padding: 5px;
  cursor: pointer;
  margin-bottom: 15px;
}
.likeItem img {
  border-radius: 3px;
  box-shadow: 0 0 3px slategray;
  width: 100%;
  height: 80%;
  margin-bottom: 5px;
}
.likeTitle {
  background-color: rgb(255, 114, 138);
  width: 100%;
  font-size: 15px;
  font-weight: 100;
  color: white;
  padding: 3px;
}
.hotTitle {
  background-color: rgb(255, 114, 138);
  width: 100%;
  font-size: 15px;
  font-weight: 100;
  color: white;
  padding: 3px;
}
.hotItem {
  width: 100%;
  height: 120px;
  background-color: white;
  border-bottom: 1px black solid;
  display: flex;
  border-radius: 1px;
  padding: 5px;
  cursor: pointer;
}
.hotItem img {
  border-radius: 3px;
  box-shadow: 0 0 3px slategray;
  width: 60%;
  height: 100%;
  margin-right: 5px;
}
.hotItem .hotItemIntroduce {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: YOUYUAN;
  font-size: 2px;
}
.hotItem .hotItemIntroduce h4 {
  font-size: 15px;
  color: rgb(255, 124, 59);
  align-self: flex-end;
}
.likeList {
  margin-bottom: 20px;
  width: 100%;
  background-color: white;
  min-height: 1300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 1px black;
}
.hotList {
  margin-bottom: 20px;
  width: 100%;
  background-color: white;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 1px black;
}
.goodAttribu table tr th {
  font-weight: 100;
  width: 30px;
  text-align: left;
}
.goodAttribu table tr td {
  width: 100px;
  font-weight: 100;
}
.goodAttribu {
  border-bottom: 1px solid pink;
}
.goodAttribu table {
  width: 100%;
  height: 100px;
}
.moreOption ul {
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: left;
  align-items: center;
  background-color: rgb(252, 233, 236);
}

.moreOption ul li {
  border-radius: 5px;
  margin-right: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 45px;
  background-color: pink;
  cursor: pointer;
}
.moreOption .moreOptionActive {
  background-color: orange;
}
.moreDetail {
  width: 1250px;
  display: flex;
}
.left {
  width: 80%;
}
.right {
  width: 20%;
}
.rightSection {
  margin-left: 20px;
  margin-top: 50px;
  width: 230px;
  height: 98%;
}
.moreOption {
  margin-top: 50px;
  width: 100%;
  height: 150px;
  background-color: rgba(244, 250, 248, 0.4);
}
.showGoodImages {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.showGoodImages img {
  width: 100%;
  height: 800px;
  margin-top: 20px;
}
.verActive {
  border: 1px solid pink;
}
.many p {
  font-size: 12px;
  margin-left: 3px;
}
.number {
  display: flex;
  flex-wrap: nowrap;
  width: 50px;
  height: 20px;
  align-items: center;
}
.number input {
  padding-left: 10px;
  width: 30px;
  height: 30px;
}
.change a {
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(249, 249, 249);
  width: 20px;
  height: 15px;
  border: 1px solid black;
}
.change {
  display: flex;
  flex-direction: column;
}
.bigImage {
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 420px;
  top: 0;
  left: 399px;
  display: none;
  border: 1px solid pink;
}
#big {
  position: absolute;
  width: 200%;
  height: 200%;
}
.event {
  position: absolute;
  width: 397px;
  height: 400px;
  z-index: 1000;
}
.mask {
  top: 0;
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: rgb(156, 255, 222, 0.5);
  display: none;
}
.moreImage {
  display: flex;
  width: 100%;
  height: 90px;
  justify-content: left;
  padding-left: 3px;
  overflow: auto;
}
.moreImage img {
  border-radius: 0;
  margin-right: 15px;
  width: 22%;
  height: 70px;
  transition: all 0.5s;
  cursor: pointer;
}
.moreImage img:hover {
  transform: scale(1.1);
  border: 1px solid pink;
}
.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.button p {
  color: orangered;
  margin-left: 220px;
  display: flex;
  border-radius: 10px;
  font-weight: 1000;
  min-width: 150px;
  height: 50px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
.button h5 {
  transition: all 0.5s;
  color: white;
  background-color: rgb(255, 169, 184);
  display: flex;
  justify-content: center;
  padding: 5px;
  box-shadow: 0 0 3px pink;
  width: 150px;
  height: 50px;
  font-size: 23px;
  align-items: center;
  margin: 25px;
  cursor: pointer;
  user-select: none;
}
.button button {
  border: 0;
  transition: all 0.5s;
  color: white;
  background-color: rgb(255, 169, 184);
  display: flex;
  justify-content: center;
  padding: 5px;
  box-shadow: 0 0 3px pink;
  width: 150px;
  height: 50px;
  font-size: 23px;
  align-items: center;
  margin: 25px;
  cursor: pointer;
  user-select: none;
}
.button h5:hover {
  transform: scale(1.05);
  opacity: 0.8;
  color: red;
}
.button button:hover {
  transform: scale(1.05);
  opacity: 0.8;
  color: red;
}
.email,
.many {
  display: flex;
  align-items: center;
  height: 60px;
  margin-bottom: 10px;
  padding: 6px;
  flex-direction: left;
  border-bottom: 1px solid black;
  flex-wrap: wrap;
}
.ver {
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: 5px;
  flex-direction: left;
  padding: 1px;
  flex-wrap: wrap;
}
.ver p {
  cursor: pointer;
  font-size: 12px;
}
.select {
  display: flex;
  flex-direction: column;
  min-height: 40px;
  padding: 5px;
  flex-direction: left;
  border-bottom: 1px solid black;
}
.sell {
  font-size: 20px;
  display: flex;
  align-items: center;
  height: 45px;
  padding: 5px;
  border-bottom: 1px solid black;
}
.sell p {
  margin-right: 5px;
  color: red;
}
.sell h4 {
  font-weight: 100;
  font-size: 13px;
}
h3 {
  margin-right: 10px;
  font-size: 13px;
  font-weight: 100;
}
.ver p {
  padding: 2px;
  display: flex;
  justify-content: center;
  box-shadow: 0 0 1px black;
  min-width: 4 0px;
}
.email p {
  margin-right: 10px;
  font-size: 13px;
}
.email select {
  margin-right: 10px;
}
.params {
  font-family: SONGTI;
  width: 100%;
}
.params p {
  margin-right: 10px;
}
.price {
  min-height: 60px;
  margin-top: 25px;
  flex-direction: left;
  display: flex;
  padding-left: 5px;
  padding-bottom: 15px;
  padding-top: 15px;
  flex-direction: column;
  margin-top: 25px;
  border-bottom: 1px solid black;
  background-color: rgb(253, 181, 134);
  border-radius: 5px;
}
.price p {
  font-size: 22px;
}
.goodPrice {
  display: flex;
  align-items: center;
}
.goodPrice p {
  color: rgb(255, 21, 0);
}
.params form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.goodPrice {
  display: flex;
}
.content {
  width: 1280px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.itemParams {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.bigGlass {
  box-shadow: 0 0 5px slategray;
  width: 31%;
  height: 500px;
  margin-top: 15px;
  position: relative;
  border-radius: 8px;
}
#showImage {
  width: 100%;
  height: 420px;
  border-radius: 8px;
}
.shoppingParams {
  width: 65%;
  margin-top: 15px;
}
.title {
  display: flex;
  justify-content: center;
}
.title h2 {
  text-align: center;
  font-size: 23px;
}
</style>