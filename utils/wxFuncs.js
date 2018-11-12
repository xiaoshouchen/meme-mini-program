const request = (url, data = {}, method = "GET") => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      success: res => {
        if (200 == res.statusCode) {
          if (200 == res.data.code) {
            resolve()
          }
        } else {
          reject(res);
        }
      },
      fail: rej => {
        reject(rej);
      }
    })
  });
}