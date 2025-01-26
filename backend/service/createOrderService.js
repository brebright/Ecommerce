var request = require("request");
const tools = require("../utils/tools");
const config = require("../config/config");
const applyFabricToken = require("./applyFabricTokenService");

exports.createOrderService = async (req, res) => {
  let title = req.body.title;
  let amount = req.body.amount;
  let applyFabricTokenResult = await applyFabricToken();
  let fabricToken = applyFabricTokenResult.token;
  let createOrderResult = await exports.requestCreateOrder(
    fabricToken,
    title,
    amount
  );
  let prepayId = createOrderResult.biz_content.prepay_id;
  let rawRequest = createRawRequest(prepayId);
  res.send(rawRequest);
};

exports.requestCreateOrder = async (fabricToken, title, amount) => {
  return new Promise((resolve) => {
    let reqObject = createRequestObject(title, amount);
    var options = {
      method: "POST",
      url: config.baseUrl + "/payment/v1/merchant/preOrder",
      headers: {
        "Content-Type": "application/json",
        "X-APP-Key": config.fabricAppId,
        Authorization: fabricToken,
      },
      rejectUnauthorized: false, //add when working with https sites
      requestCert: false, //add when working with https sites
      agent: false, //add when working with https sites
      body: JSON.stringify(reqObject),
    };
    request(options, (error, response) => {
      if (error) throw new Error(error);
      let result = JSON.parse(response.body);
      resolve(result);
    });
  });
};

function createRequestObject(title, amount) {
  let req = {
    timestamp: tools.createTimeStamp(),
    nonce_str: tools.createNonceStr(),
    method: "payment.preorder",
    version: "1.0",
  };
  let biz = {
    notify_url: "https://www.google.com",
    trade_type: "InApp",
    appid: config.merchantAppId,
    merch_code: config.merchantCode,
    merch_order_id: createMerchantOrderId(),
    title: title,
    total_amount: amount,
    trans_currency: "ETB",
    timeout_express: "120m",
    business_type: "BuyGoods",
    payee_identifier: config.merchantCode,
    payee_identifier_type: "04",
    payee_type: "5000",
  };
  req.biz_content = biz;
  req.sign = tools.signRequestObject(req);
  req.sign_type = "SHA256WithRSA";
  return req;
}

function createMerchantOrderId() {
  return new Date().getTime() + "";
}

function createRawRequest(prepayId) {
  let map = {
    appid: config.merchantAppId,
    merch_code: config.merchantCode,
    nonce_str: tools.createNonceStr(),
    prepay_id: prepayId,
    timestamp: tools.createTimeStamp(),
  };
  let sign = tools.signRequestObject(map);
  // order by ascii in array
  let rawRequest = [
    "appid=" + map.appid,
    "merch_code=" + map.merch_code,
    "nonce_str=" + map.nonce_str,
    "prepay_id=" + map.prepay_id,
    "timestamp=" + map.timestamp,
    "sign=" + sign,
    "sign_type=SHA256WithRSA",
  ].join("&");
  return rawRequest;
}



// const request = require("request");

// function createOrder(token, orderData) {
//   return new Promise((resolve, reject) => {
//     const options = {
//       method: "POST",
//       url: config.baseUrl + "/create/order",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(orderData),
//     };

//     request(options, (error, response) => {
//       if (error) return reject(error);
//       try {
//         let result = JSON.parse(response.body);
//         resolve(result);
//       } catch (e) {
//         reject(e);
//       }
//     });
//   });
// }

// module.exports = createOrder;
