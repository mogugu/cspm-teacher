var getThisWeek = function (date) {
  var flag = new Date(date);
  var week = [];
  var flag_week_day = flag.getDay();
  var gap = 1000*60*60*24;
  if (flag_week_day == 0) {
    week.push({
      year: flag.getFullYear(),
      month: flag.getMonth()+1,
      day:flag.getDate(),
      date:flag.getTime(),
      weekday:flag.getDay()
    })
    for (var i = 1; i < 7; i++) {
      var _date = new Date(flag.getTime() + i*gap);
      week.push({
        year: _date.getFullYear(),
        month: _date.getMonth()+1,
        day:_date.getDate(),
        date:_date.getTime(),
        weekday:_date.getDay()
      })
    }
    return week;
  }
  var firstDay = new Date(flag.getTime() - flag_week_day*gap);
  week.push({
      year: firstDay.getFullYear(),
      month: firstDay.getMonth()+1,
      day:firstDay.getDate(),
      date:firstDay.getTime(),
      weekday: firstDay.getDay()
  })
  for (var i = 1; i < 7; i++) {
      var _date = new Date(firstDay.getTime() + i*gap);
      week.push({
        year: _date.getFullYear(),
        month: _date.getMonth()+1,
        day:_date.getDate(),
        date:_date.getTime(),
        weekday:_date.getDay()
      })
  }
  return week;
}

var getTime = function(fmt,date)   
{ //author: meizz   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

var weekConvert = function (weekday) {
  switch(weekday) {
    case 0: return '周日';
    case 1: return '周一';
    case 2: return '周二';
    case 3: return '周三';
    case 4: return '周四';
    case 5: return '周五';
    case 6: return '周六';
  }
}

var getSec = function (time) {
  var s = '';

  var hour = time.split(':')[0];
  var min = time.split(':')[1];
  var sec = time.split(':')[2];

  s = Number(hour*3600) + Number(min*60) + Number(sec);

  return s;
};

export {
  getTime,
  getThisWeek,
  weekConvert,
  getSec
}
