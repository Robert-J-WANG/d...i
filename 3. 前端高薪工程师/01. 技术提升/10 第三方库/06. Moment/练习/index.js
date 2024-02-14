// 获取当前时间
setCurTime();
function setCurTime() {
  $("[data-zone]").each((i, ele) => {
    const zone = +$(ele).attr("data-zone");
    $(ele).html(moment().utcOffset(zone).format("YYYY-MM-DD HH:mm:ss"));
  });
}
setInterval(setCurTime, 1000);

$("#birthInput").on("change", function () {
  const today = moment();
  const txt = $(this).val();
  const birthday = moment(txt);
  const age = today.diff(birthday, "years");
  const staySeconds = today.diff(birthday, "seconds");
  // console.log(staySeconds);

  if (!birthday.isValid() || birthday > today) {
    // 如果日期无效 或者 生日大于今日
    $("#birthInfo").html("错误的日期"); //清空元素内部
    return; // 结束
  }

  let nextBirthday;
  const thisYearBirth = moment(birthday).year(today.year()); // 今年的生日
  if (thisYearBirth < today) {
    //  已经过完生日了，计算明年的生日日期
    nextBirthday = moment(birthday).year(today.year() + 1);
  } else {
    // 还没过完
    nextBirthday = thisYearBirth;
  }
  const leftDays = nextBirthday.diff(today, "days");
  // console.log(leftDays);

  var cal = thisYearBirth.calendar(null, {
    sameDay: "今天",
    nextDay: "明天",
    nextWeek: "dddd",
    lastDay: "昨天",
    lastWeek: "dddd",
    sameElse: "YYYY-MM-DD",
  }); // 得到今年生日的日历显示

  const birthdayInfo = `
  <p>
  <strong>出生日期：</strong>
  <span>${birthday.format("YYYY-MM-DD")}</span>
</p>
<p>
  <strong>年龄：</strong>
  <span>${age}</span>
</p>
<p>
  你在这个世界上已存在了
  <strong>${staySeconds}</strong>
  秒钟
</p>
<p>
  你还有
  <strong>${leftDays}</strong>
  天就会迎来你 ${age + 1} 岁的生日
</p>

${
  thisYearBirth > today
    ? `你将在 <strong>${cal}</strong> 迎来你下个生日`
    : `你已在 <strong>${cal}</strong> 过了生日`
}
  `;

  $("#birthInfo").html(birthdayInfo);
});
