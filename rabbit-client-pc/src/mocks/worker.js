import { setupWorker, rest } from "msw";
import { baseURL } from "@/utils/request";
import faker from "faker";

faker.locale = "zh_CN";

//创建用于请求拦截的人
const worker = setupWorker(
  //定义请求拦截程序
  //拦截get请求
  //path：请求拦截地址
  //resolver 请求处理程序
  rest.get(`${baseURL}message`, (req, res, ctx) => {
    return res(
      ctx.json(
        makeArray(faker.datatype.number(20), () => ({
          name: faker.name.firstName(),
          avatar: faker.internet.avatar(),
          phone: faker.phone.phoneNumber(),
          cityName: faker.address.cityName(),
          email: faker.internet.email(),
        }))
      )
    );
  }),
  rest.get(`${baseURL}member/collect`, (req, res, ctx) => {
    return res(
      ctx.json({
        msg: "成功",
        result: {
          counts: 50,
          page: req.url.searchParams.get("page"),
          pageSize: req.url.searchParams.get("pageSize"),
          pages: 0,
          items: makeArray(req.url.searchParams.get("pageSize"), () => ({
            id: faker.datatype.uuid(),
            name: faker.internet.userName(),
            desc: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${faker.datatype.number(
              { min: 1, max: 8 }
            )}.jpg`,
          })),
        },
      })
    );
  })
);

//导出做拦截请求的人
export default worker;
//在开发环境启用请求拦截程序
function makeArray(length, generator) {
  return Array.from({ length }, generator);
}
