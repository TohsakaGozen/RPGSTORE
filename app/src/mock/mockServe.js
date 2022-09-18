//引入mockjs模块
import Mock from "mockjs";
//把JSON数据格式引入（jons文件默认的就是默认暴露）
import hot from './hot.json'
import like from './like.json'
import today from './today.json'
import showList from './showList.json'
import searchNav from './searchNav.json'

//mock数据(两个参数，第一个是请求参数地址，第二个是请求的数据)
Mock.mock('/mock/today', { code: 200, data: today })//模拟首页的今日推荐
Mock.mock('/mock/hot', { code: 200, data: hot })//模拟首页的热门
Mock.mock('/mock/like', { code: 200, data: like })//模拟首页的猜你喜欢
// Mock.mock('/mock/showList', { code: 200, data: showList })//

Mock.mock('/mock/showList', 'post', //“拦截域名”，“请求方式”，“返回数据”，模拟搜索数据
    (req) => {
        let data = JSON.parse(req.body)//请求体，用于获取参数
        const getpages = function () {
            if (data[0].currentPage == showList.page1.currentPage) {
                return showList.page1
            }
            else if (data[0].currentPage == showList.page2.currentPage) {
                return showList.page2
            }
            else if (data[0].currentPage == showList.page3.currentPage) {
                return showList.page3
            }
            else if (data[0].currentPage == showList.page4.currentPage) {
                return showList.page4
            }
            else if (data[0].currentPage == showList.page5.currentPage) {
                return showList.page5
            }
        }
        return getpages()
    }

)

Mock.mock('/mock/searchNav', 'get', //“拦截域名”，“请求方式”，“返回数据”，模拟搜索数据
    (req) => {
        let data = JSON.parse(req.body)//请求体，用于获取参数
        if (data[0] == 1) {
            return searchNav.nav1
        }
        else if (data[0] == 2) {
            return searchNav.nav2
        }
        else if (data[0] == 3) {
            return searchNav.nav3
        }
        else if (data[0] == 4) {
            return searchNav.nav4
        }
        else if (data[0] == 5) {
            return searchNav.nav5
        }
        else if (data[1].keyword == '漫画') {
            return searchNav.nav1
        }
        else {
            return like
        }

    }
)



