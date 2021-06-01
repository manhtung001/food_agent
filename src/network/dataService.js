import request from './request';
let dataService = {
  login: (params) => {
    let url = 'api/admin/login';
    return request.post(params, url);
  },

  register: (params) => {
    let url = 'api/admin/register';
    return request.post(params, url);
  },

  refreshToken: (params, token) => {
    let url = 'api/shipper/renew-token';
    return request.post(params, url, token);
  },
  orderFood: (params) => {
    let url = 'api/user/order';
    return request.post(params, url);
  },
  addProduct: (params) => {
    let url = 'api/product/addProduct';
    return request.post(params, url);
  },

  getListShop: () => {
    let url = 'api/shop/getAll';
    return request.get(url);
  },
  getListFood: () => {
    let url = 'api/product/searchByCategory';
    return request.get(url);
  },
  getProductByIdShop: (id) => {
    if (id) {
      let url = `api/product/getproductbyidShop/${id}`;
      return request.get(url);
    }
    return [];
  },

  getAllOrder: (id) => {
    if (id) {
      let url = `api/admin/getAllOrder/${id}`;
      return request.get(url);
    }
  },

  getListSearchAll: () => {
    let url = 'api/product/getAll';
    return request.get(url);
  },
  getListShipping: (id) => {
    let url = `api/user/getHistoryOrder/${id}`;
    return request.get(url);
  }

  // getListNotification: (params) => {
  //   let url = 'api/notification/get-all-notification';
  //   return request.post(params, url);
  // },
  // updateNotiAllIsRead: (params) => {
  //   let url = 'api/notification/update-all-is-read';
  //   return request.post(params, url);
  // },
  // updateNotiIsRead: (params) => {
  //   let url = 'api/notification/update-is-read';
  //   return request.post(params, url);
  // }
};

export default dataService;
