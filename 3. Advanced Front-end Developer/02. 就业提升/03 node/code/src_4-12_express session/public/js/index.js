
/* -------------- 简单请求 -------------- */
// fetch("http://localhost:5003/api/student").then(resp => resp.json()).then(resp => {
//   console.log(resp)
// })


/* -------------- 预检请求 -------------- */
/* fetch("http://localhost:5003/api/student", {
  method: 'POST',
  headers: {
    a: 1,
    b: 2,
    'content-type': "application/json"
  },
  body: JSON.stringify({
    "name": "Semit",
    "dob": "2025-11-11",
    "sex": "false",
    "mobile": "021-2323454353",
    "ClassId": "1"
  })
}).then(resp => resp.json()).then(resp => {
  console.log(resp)
}) */

/* ------------ 附带身份凭证的请求 ----------- */

/* fetch("http://localhost:5003/api/student", {
  method: 'POST',
  headers: {
    a: 1,
    b: 2,
    'content-type': "application/json"
  },
  body: JSON.stringify({
    "name": "Semit",
    "dob": "2025-11-11",
    "sex": "false",
    "mobile": "021-2323454353",
    "ClassId": "1"
  }),
  credentials: "include", // 显式要求携带凭证
}).then(resp => resp.json()).then(resp => {
  console.log(resp)
}) */


// 登录
login.onclick = () => {
  fetch("http://localhost:5003/api/admin/login", {
    method: 'POST',
    headers: {
      'content-type': "application/json"
    },
    body: JSON.stringify({
      loginID: "admin2",
      loginPwd: "000000"
    }),
    credentials: "include", // 显式要求携带凭证
  }).then(resp => resp.json()).then(resp => {
    console.log(resp)
  })
}

updateStudent.onclick = () => {

  fetch("http://localhost:5003/api/student/111", {
    method: 'PUT',
    headers: {
      'content-type': "application/json"
    },
    body: JSON.stringify({
      "ClassId": (Math.floor(Math.random() * (40 - 1 + 1)) + 1).toString()
    }),
    credentials: "include", // 显式要求携带凭证
  }).then(resp => resp.json()).then(resp => {
    console.log(resp)
  })
}