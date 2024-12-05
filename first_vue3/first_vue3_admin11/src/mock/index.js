import Mock from 'mockjs'
import goodList from './goodList.json'
import userList from './userList.json'
Mock.setup({
    timeout: 800
});
// Mock.mock("/getAllGoodList", "get", require("./goodList.json"));

Mock.mock("http://localhost:8080/getAllList", {
  code: 200,
  list: goodList
});
Mock.mock("http://localhost:8080/getUserList", {
  code: 200,
  list: userList
});