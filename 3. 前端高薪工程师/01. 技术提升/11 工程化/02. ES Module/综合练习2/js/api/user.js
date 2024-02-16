// 调用api接口，跟user相关的函数
export async function userLogin(loginId, loginPwd) {
  const res = await fetch("https://study.duyiedu.com/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loginId, loginPwd }),
  }).then((resp) => resp.json());
  return res.data;
}
