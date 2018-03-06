import { Loading, Message } from 'element-ui'
import { ADDRESS } from './address'
import domtoimage from 'dom-to-image'
import $ from 'jQuery'

const addZero = (input) => {
  if (+input<10) {
    input = '0' + input
  }
  return input
}

// 页面loading
const callLoading = {
  flag: false,
  activeLoading() {
    //console.log('调用状态：'+callLoading.flag)
    callLoading.flag = true
  },
  deactiveLoading() {
    //console.log('非调用：'+callLoading.flag)
    callLoading.flag = false
  }
}

// 页面按钮Toast跟随提示
const callModalToast = (ev,msg) => {
  msg = msg || '默认信息'
  console.log(ev)
  const template = (`<div id="H_modalToast" style="position:absolute;left:${ev.clientX}px;top:${ev.clientY}px;width:150px;height:50px;">
    ${msg}
  </div>
  `)

  const $body = document.body
  const $container = document.createElement('div')
  $container.setAttribute('id', 'modalContainer')
  $container.innerHTML = template
  $body.appendChild($container)

  window.setTimeout(()=>{
    $body.removeChild($container)
  }, 1000)
}

// 页面Toast提示
// const callToast = (msg,duration) => {
//   const $prevContainer = document.getElementById('modalContainer')
//   console.log($prevContainer)
//   if ($prevContainer) {
//     document.body.removeChild($prevContainer)
//   }
//   msg = msg || '操作提示'
//   duration = duration || 1000
//   const template = `<div id="H_Toast"
//    style="z-index:9999;
//     background-color: rgba(0, 0, 0, 0.42);
//     text-align: center;
//     position: fixed;
//     left: 50%;
//     top: 50%;
//     width: 150px;
//     height: 90px;
//     margin-left: -75px;
//     margin-top: -25px;
//     border-radius: 4px;
//     color: #fff;
//     line-height: 90px;
//     font-size: 14px;">
//     ${msg}
//   </div>
//   `
//
//   const $body = document.body
//   const $container = document.createElement('div')
//   $container.setAttribute('id', 'modalContainer')
//   $container.innerHTML = template
//   $body.appendChild($container)
//
//   window.setTimeout(()=>{
//     $body.removeChild($container)
//   }, duration)
// }
const callToast = (msg,type) => {
  type = type || 'success'
  if (type == 'error' || type == 'warning') {
    Message({
      type: type,
      message: msg,
      showClose: true,
      duration: 0,
    })    
    return
  }
  Message({
    type: type,
    message: msg
  })
}

let me = {
  userinfo: JSON.parse(window.sessionStorage.getItem('userinfo')) || {
    username: '请登录',
    headimgurl: '',
    description: ''
  },
  updateMe: (input) => {
    me.userinfo = input
    window.sessionStorage.setItem('userinfo',JSON.stringify(input))
  },
  getMe($, err, cb) {
    $.$http.post(ADDRESS.USERINFO_ADDR)
      .then((res) => {
        if (res.body.flag == 1) {
          me.updateMe(res.body.content)
          cb?cb():()=>{return false}
        }
        else {
          err?err():()=>{return false}
        }
      }, (err) => {
        err?err():()=>{return false}
      })
  }
}

const deepClone = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ?
            cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
}

const videoTime = {
  addZero(input) {
    if (input < 10) {
      input = '0' +''+ input
    }
    return input
  },
  timeFormat(input) {
    const out = input.split(':')
    return (+out[0])*60*60 + (+out[1])*60 + (+out[2])
  },
  timeStringify(input) {
    const _t = new Date(input)
    const _op = _t.getFullYear() + '-'
              + this.addZero((_t.getMonth()) + 1) + '-'
              + this.addZero(_t.getDate()) + ' '
              + this.addZero(_t.getHours()) + ':'
              + this.addZero(_t.getMinutes()) + ':'
              + this.addZero(_t.getSeconds())
    return _op
  }
}

const handleOption = (input) => {
  const output = _.pairs(JSON.parse(input))
  console.log(output)
  return output
}

// const generateOption = (input) => {
//
// }

const clearTree = (dataList) => {
  if (dataList.length>0) {
    for (var i = 0; i < dataList.length; i++) {
      console.log(dataList[i])
      dataList[i].open = false
      if(dataList[i].children.length>0) {
        for (var j = 0; j < dataList[i].children.length; j++) {
          dataList[i].children[j].open = false
          if(dataList[i].children[j].children) {
            for (var k = 0; k < dataList[i].children[j].children.length; k++) {
              dataList[i].children[j].children[k].open = false
              if(dataList[i].children[j].children[k].children) {
                for (var l = 0; l < dataList[i].children[j].children[k].children.length; l++) {
                  dataList[i].children[j].children[k].children[l].open = false
                }
              }
            }
          }
        }
      }
    }
  }
}

const callMimeTypeCheck = (file, type) => {
  const file_end = file.name.split('.').pop()
  // console.log(file_end)
  if (type.constructor == String) {
    if (file_end != type) {
      callToast('格式错误', 'warning')
      return false
    }
    return true
  }
  else if (type.constructor == Array) {
    let _check = false
    for (var i = 0; i < type.length; i++) {
      if (type[i] == file_end) {
        _check = true
      }
    }
    if (!_check) {
      console.log('xzxcczxc');
      callToast('格式错误', 'warning')
      return false
    }
    return true
  }
}

const convertImgToUrl = (dom) => {
  dom = '<div>'+dom+'</div>'
  const _htmlContent = $(dom).find('.HTMLIMAGE')
  for(var i = 0; i<_htmlContent.length; i++) {
    console.log(_name)
    const _name = _htmlContent[i].name
    const name = _name.split('||')[0]
    const id = _name.split('||')[1]
    const time = _name.split('||')[2]
    const number=_name.split('||')[3]
    const _className = _htmlContent[i].className
    if( _className == 'targetMater HTMLIMAGE' ){
      const HEAD = '/bc'
      dom = dom.replace(_htmlContent[i].outerHTML,
      '<a data-type="3" data-id="'+id+'" class="active-click-route TASK-A-CONTENT" href="'+HEAD+'/l/attach/previewAttachmentNew?attachmentId='+id+'" target="_blank" >'+name+'</a>')
    }
    if( _className == 'targetVideo HTMLIMAGE' ){
      dom = dom.replace(_htmlContent[i].outerHTML,
      '<a data-type="1" data-id="'+id+'" class="active-click-route TASK-A-CONTENT" href="#/personalSourceDetail/video?id='+id+'">'+name+'</a>')
    }
    else{
      dom = dom.replace(_htmlContent[i].outerHTML,
      '<a data-type="2" data-id="'+id+'" data-num="'+number+'" data-time="'+time+'" class="active-click-route TASK-A-CONTENT" href="#/personalSourceDetail/paper?id='+id+'">'+name+'</a>')
    }
  }
  return dom
}

const convertImgToUrlCutHref = (dom) => {
  dom = '<div>'+dom+'</div>'
  const _htmlContent = $(dom).find('.HTMLIMAGE')
  for(var i = 0; i<_htmlContent.length; i++) {
    const _name = _htmlContent[i].name
    const rute = _name.split('||')[1]
    const name = _name.split('||')[0]
    const _className = _htmlContent[i].className
    dom = dom.replace(_htmlContent[i].outerHTML,
      '<a class="active-click-route" >'+name+'</a>')
  }
  return dom
}

// 超链接 => 图片
const A_TO_IMAGE = (_dom, cb) => {

 let _added = $(_dom).find('.TASK-A-CONTENT')
 if( _added.length == 0 ){
  cb(_dom, childNode)
 }
//  console.log(_added)
 for( let i=0;i<_added.length;i++ ){
   let id = _added[i].dataset.id
   let type = _added[i].dataset.type
   let time = _added[i].dataset.time
   let num = _added[i].dataset.num
   let text = _added[i].innerHTML

   var _id = ''
   var _className = ''

   
   var childNode = document.createElement('div');
   childNode.setAttribute('class', 'editor-add-resource');
   childNode.setAttribute('contenteditable', 'false');
   childNode.innerHTML = `<span class="s_name">${text}&nbsp;&nbsp;&nbsp;&nbsp;<i style="color:#3283d3;font-size:24px">×</i></span>`
   document.getElementById("resourceCont").append(childNode)
   
   domtoimage.toPng(childNode)
   .then(function (dataUrl) {
    //  console.log(dataUrl)
    // childNode.remove()
     if( type == 1 ){
       _className = 'targetVideo'
       _id = id
     }
     else if( type == 2 ){
       _className = 'targetPaper'
       _id = id +'||' + time + '||'+ num
     }
     else{
      _className = 'targetMater'
      _id = id
    }

      var img = new Image();
      img.src = dataUrl;
      img.setAttribute('class', _className + ' HTMLIMAGE')
      img.name = text + '||' + _id
      _dom = _dom.replace(_added[i].outerHTML,img.outerHTML)

      if( i == _added.length-1){
        cb(_dom, childNode)
        // $('#resourceCont').html('')
      }
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
  }

}

export {
  addZero,
  me,
  callLoading,
  callModalToast,
  callToast,
  deepClone,
  videoTime,
  handleOption,
  clearTree,
  callMimeTypeCheck,
  convertImgToUrl,
  convertImgToUrlCutHref,
  A_TO_IMAGE
}
