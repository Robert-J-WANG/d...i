
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

fetch("http://localhost:5003/api/student", {
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
})