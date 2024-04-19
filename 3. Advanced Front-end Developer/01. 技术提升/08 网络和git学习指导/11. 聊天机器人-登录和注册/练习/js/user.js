// 对某一个表单项进行验证
class InputValidator {
  /**
   * @param {String} inputId The id of the input
   * @param {Function} validateFunc 验证规则函数，当需要对该文本框进行验证时，会调用该函数，函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回，则表示无错误
   */
  constructor(inputId, validateFunc) {
    this.input = $(inputId);
    this.p = this.input.nextElementSibling;
    this.validateFunc = validateFunc;
    // 失去焦点的时候才验证
    this.input.onblur = () => {
      this.validate();
    };
  }
  /**
   * 开始验证，成功返回true，否则返回false
   */
  async validate() {
    const err = await this.validateFunc(this.input.value);
    if (err) {
      // 验证失败
      this.p.innerText = err;
      return false;
    } else {
      // 验证成功
      this.p.innerText = "";
      return true;
    }
  }
  /**
   * 验证所有的表单项，防止所有表单项不填写，直接点击提交
   * 所以表单验证成功返回true，否则返回false
   * @param {InputValidator} validators
   */
  static async validateAll(...validators) {
    // 每个表单都进行验证
    const proms = validators.map((v) => v.validate());
    console.log(proms); // [Promise, Promise]
    const results = await Promise.all(proms);
    console.log(results); // [false, false]
    // 所以表单验证成功返回true，否则返回false
    return results.every((r) => r);
  }
}

// const loginIdValidator = new InputValidator("#txtLoginId", async function (
//   val
// ) {
//   if (!val) {
//     return "账号不能为空";
//   }
//   const resp = await API.exists(val);
//   if (resp.data) {
//     return "该账户已经存在，请重新输入";
//   }
//   if (resp.code === 400) {
//     return "用户名不能超过20个字符，请重新输入";
//   }
// });

// const nicknameValidator = new InputValidator("#txtNickname", function (val) {
//   if (!val) {
//     return "昵称不能为空";
//   }
// });

// 验证所以表单项
// InputValidator.validateAll(loginIdValidator, nicknameValidator);
