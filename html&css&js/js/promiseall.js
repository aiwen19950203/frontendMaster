function getCheckList(v) {
  let requestList = []
  const devKindArr = [
    {
      name: '身高体重',
      code: 'fatmeter'
    },
    {
      name: '平衡检测',
      code: 'balancestee'
    },
    {
      name: '热源检测',
      code: 'heatsource'
    },
    {
      name: '面舌检测',
      code: 'facediag'
    },
    {
      name: '血压检测',
      code: 'bloodpmeter'
    },
    {
      name: '血氧检测',
      code: 'bloodoxygen'
    },
    {
      name: '血糖尿酸',
      code: 'uabg'
    },
    {
      name: '经络能量',
      code: 'gdv'
    },
    {
      name: '气味检测',
      code: 'odor'
    },
    {
      name: '体温检测',
      code: 'temperature'
    },
    {
      name: '心肺检测',
      code: 'stethoscope'
    },
    {
      name: '心电检测',
      code: 'ecg'
    },
    {
      name: '色盲检测',
      code: 'question'
    },
    {
      name: '压力检测',
      code: 'bcgmeter'
    }
  ]
  // /platform/operation/stat/device/querydevicesexamcount
  const url = `/platform/operation/stat/exammirrorstat/queryDevicesExamCount`

  devKindArr.map(item => {
    let params = {
      startTime: '2020-01-01 00:00:00',
      endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      devkind: item.code,
      sourcekind : 'ytj/yjy'
    }
    if(v) {
      params.mirrid = v
    }
    let _promise = new Promise((resolve, reject) => {
      api.postXform(url, params).then(resp => {
        console.log(resp,"单个请求的结果")
        resp = resp.body
        if (resp.head.faultcode === 'ok') {
          resolve({
            status: 'success',
            name: item.name,
            data: resp.body
          })
        } else {
          reject({
            status: 'error',
            data: undefined
          })
        }
      })
    })
    requestList.push(_promise)
 
  })
  Promise.all(requestList).then(resArr=>{
    console.log(resArr)
    this.checkList = resArr.map((item) => {
      console.log(item)
        if (item.status === "success") {
          let obj = {
            name: item.name,
            count: item.data[0].value
          };
          return obj

          
        }
      });

      
  })
  
}