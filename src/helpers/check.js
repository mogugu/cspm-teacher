const REG_MAIL = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i
const REG_PHONE = /^1(3|4|5|7|8)\d{9}$/

const checkEmail = (input) => {
  input += ''
  return REG_MAIL.test(input)
}

const checkPhone = (input) => {
  input += ''
  return REG_PHONE.test(input)
}

export {
  checkEmail,
  checkPhone
}
