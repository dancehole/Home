/*
作者: imsyy
主页：https://www.imsyy.top/
GitHub：https://github.com/imsyy/home
版权所有，请勿删除
*/

//个人认为使用init.js比set.js+json更加方便，因为可以注释

/* 自定义配置 */

document.addEventListener("DOMContentLoaded", function () {
  let data = {
    //页面名称
    title: "dancehole的小破站~",
    //页面描述/关键字/作者
    description: "dancehole 个人主页 邓仕昊 深圳技术大学",
    keywords: "keywords, for, your, website",
    author: "Author Name",
    //主页左栏 主要信息（一般为介绍信息/头像）
    mainPageDes: "sztu在逃程序猿",
    mainPageDes2: "正在南科大实习&备战考研ing",
    secPageDes: "距离考研还有xx天",

    logo_img: "./img/icon/dancehole.jpg",
    github: "dancehole",      //username
    qq: "https://cdn.jsdelivr.net/gh/dancehole/image@main/img/WechatNum",         //二维码链接，可以传到图床上
    email: "1391755954@qq.com",
    bilibili: "159625526",   //id
    telegram: "yourtelegramusername",
    gitee: "dancehole",   //id,
    // Define other data as needed
    // ...
    Copyright_text: "Copyright © 2023-2024 dancehole@sztu",
    beian: "(备案已失效)",


    //加载页面内容
    loadingTitle: "dancehole的小破站~",
    loadingText: "加载中",
  };


  // 修改页面标题
  document.title = data.title;

  //加载页面内容
  document.getElementById("loading-title").innerHTML = data.loadingTitle;
  document.getElementById("loading-text").innerHTML = data.loadingText;

  //textContent和innerHTML区别在于innerHTML支持<strong>等html标签
  document.getElementById("change").textContent = data.mainPageDes;
  document.getElementById("change1").innerHTML = data.mainPageDes2;

  // 设置元数据 (用于给搜索引擎爬取，不渲染页面)
  document.querySelector("meta[name='description']").setAttribute('content', data.description);
  document.querySelector("meta[name='keywords']").setAttribute('content', data.keywords);
  document.querySelector("meta[name='author']").setAttribute('content', data.author);

  // 更新图片
  document.getElementById("logo-img").src = data.logo_img;

  // 设置相关链接 可注释取消：通常来说，我们不喜欢别人知道我们这么多平台的联系方式（怕社死）
  //个人主页
  document.getElementById('my-home-page').setAttribute("href", "https://dancehole.gitee.io/web-d/")
  document.getElementById('my-home-page').setAttribute("data-link-text", "我的个人主页");

  //github
  document.getElementById('social').innerHTML += '<a href="https://github.com/' + data.github + '" class="link" id="github" style="margin-left: 4px" target="_blank" data-link-text="去 Github 看看"><i class="fa-brands fa-github"></i></a>'
  //qq
  document.getElementById('social').innerHTML += '<a href = "' + data.qq + '" class="link" id= "qq" target = "_blank" data-link-text="加我的qq" ><i class="fa-brands fa-qq"></i></a >'
  //wechat
  //email
  document.getElementById('social').innerHTML += '<a a a href = "' + data.email + '" class="link" id = "email" data-link-text="send email" ><i class="fa-solid fa-envelope"></i></a >'
  //bilibili
  document.getElementById('social').innerHTML += '<a href="https://space.bilibili.com/' + data.bilibili + '" class="link" id="bilibili" target="_blank" data-link-text="偷看一下bilibili"><i class="fa-brands fa-bilibili"></i></a>'
  //document.getElementById('social').innerHTML += '<a href="https://www.facebook.com/'+data.telegram+'" class="link" id="facebook" target="_blank"><i class="fa-brands fa-facebook"></i></a>'
  document.getElementById('social').innerHTML += '<a id="link-text">通过这里联系我</a>'

  // 其他操作
  // ...

  // 页脚版权
  document.getElementById("power-text").innerHTML = data.Copyright_text;
  document.getElementById("beian").innerHTML = "&amp;&nbsp;" + data.beian;

  //2024-04-14 首页网站列表可以动态加载（响应式），支持1-15个网站外链（1行3-4个，最多3行）
  // 元素排布方式列表 可以自定义
  const customLayouts = {
    1: { rows: 1, cols: 1 },
    2: { rows: 1, cols: 2 },
    3: { rows: 1, cols: 3 },
    4: { rows: 2, cols: 2 },
    5: { rows: 2, cols: 3 },
    6: { rows: 2, cols: 3 },
    7: { rows: 2, cols: 4 },
    8: { rows: 2, cols: 4 },
    9: { rows: 3, cols: 3 },
    10: { rows: 3, cols: 4 },
    11: { rows: 3, cols: 4 },
    12: { rows: 3, cols: 4 },
    13: { rows: 3, cols: 5 },
    14: { rows: 3, cols: 5 },
    15: { rows: 3, cols: 5 },
  };
  const webList = [
    { "link": "https://dancehole.gitee.io/web-d/", "descript": "主页", "ico": '<i class="fa fa-home" aria-hidden="true"></i>' },  //ico格式 直接从FA copy过来 <i>...</i>
    { "link": "https://dancehole.gitee.io/liwenyue/", "descript": "bir-lwy", "ico": '<i class="fa fa-birthday-cake" aria-hidden="true"></i>' },
    { "link": "https://dancehole.gitee.io/my-blog/", "descript": "bir-dad", "ico": '<i class="fa fa-birthday-cake" aria-hidden="true"></i>' },
    { "link": "https://dancehole.gitee.io/vue-chess", "descript": "五子棋", "ico": '<i class="fa fa-gamepad" aria-hidden="true"></i> ' },
    { "link": "https://dancehole.gitee.io/code-labs", "descript": "codelabs", "ico": '<i class="fa fa-file-text" aria-hidden="true"></i>' },
    { "link": "https://dancehole.gitee.io/todolist", "descript": "Todo", "ico": '<i class="fa fa-list" aria-hidden="true"></i>' },
    //超过15个的部分会自动忽略，不建议超过9个
  ]
  //获取排布信息 准备动态排布
  let webListLen = webList.length
  let row = customLayouts[webListLen].rows
  let cols = customLayouts[webListLen].cols
  let arrange = 0  //已经排布的元素个数

  //构建行
  for (let i = 0; i < row; i++) {
    if (i === 0) document.getElementById("web-link").innerHTML += `<div class="row"  id="web-row` + (i+1) + `"><div>`
    else document.getElementById("web-link").innerHTML += `<div class="row"  id="web-row`+ (i+1) + `" style="margin-top: 1.5rem;"><div>`

    //构建元素
    for (let j = 0; j < cols; j++) {
      //使用反引号`定义一个带换行的字符串
      let style= j%2==0 ? '' :' 2 '
      let extraHtml = `<div class="col `+style+`">  
      <a href="`+ webList[arrange].link + `" target="_blank">
        <div class="link-card cards">
          `+ webList[arrange].ico + `
          <span class="link-name">`+ webList[arrange].descript + `</span>
        </div>
      </a>
      </div>`
      let rowId = "web-row"+(i+1)
      document.getElementById(rowId).innerHTML += extraHtml
      arrange++
      if(arrange==webListLen || arrange>=15)break //排列超过15个会报错，这里强行退出
    }
  }


  // // //动态加载 网站列表 外链
  // document.getElementById("web-row2").innerHTML+=extraHtml
  // document.getElementById("web-row2").innerHTML+=extraHtml

  //定义新行
  //document.getElementById("web-link").innerHTML += `<div class="row"  id="web-row3" style="margin-top: 1.5rem;"><div>`
  //document.getElementById("web-row3").innerHTML += extraHtml



  // 更新日志 动态加载
  // 2024-04-13 更新：更新日志写入set.js 从html中移出  动态加载
  // 参数：time格式为 "yyyy-mm-dd"（由于没有后端），type为"bug_fix"或者"feature_update"
  let update_note = [
    {
      "time": "2024-04-07",
      "type": "bug_fix",
      "content": "移动端适配优化"
    },
    {
      "time": "2024-04-08",
      "type": "feature_update",
      "content": "日志功能迁移至js"
    },
    {
      "time": "2024-04-09",
      "type": "feature_update",
      "content": "初始化功能迁移至js"
    }, {
      "time": "2024-04-13",
      "type": "feature_update",
      "content": "修改歌单"
    },
    {
      "time": "2024-04-14",
      "type": "feature_update",
      "content": "网站列表、菜单栏改为js添加.方便修改/增删"
    },
    // 其他更新日志
  ];

  // 遍历更新日志数组，将每条日志添加到 DOM 元素中[格式：时间+类型+内容]
  //可以直接构建一个包含所有日志内容的 HTML 字符串，然后将其一次性设置为 innerHTML，而不是每次循环都修改 innerHTML。这样可以提高性能。
  let logContent = "";
  let logtype = "";
  update_note.forEach(function (log) {
    if (log.type === "feature_update") {
      logtype = '<i class="fa-solid fa-circle-plus"></i>&nbsp;';
    } else if (log.type === "bug_fix") {
      logtype = '<i class="fa-solid fa-screwdriver-wrench"></i>&nbsp;'
    }
    logContent += log.time + "&nbsp;&nbsp;" + logtype + "&nbsp;&nbsp;" + log.content + '<br>';
  });
  document.getElementById("upnote-content").innerHTML += logContent;

})

/* <span class="uptext">
<i class="fa-solid fa-circle-plus"></i>&nbsp;壁纸支持个性化设置
</span>
<span class="uptext">
<i class="fa-solid fa-circle-plus"></i>&nbsp;音乐播放器支持音量控制
</span>
<span class="uptext">
<i class="fa-solid fa-screwdriver-wrench"></i>&nbsp;修复天气 API
</span>
<span class="uptext">
<i class="fa-solid fa-screwdriver-wrench"></i>&nbsp;时光胶囊显示错误
</span>
<span class="uptext">
<i class="fa-solid fa-screwdriver-wrench"></i>&nbsp;移动端动画及细节<br>
<i class="fa-solid fa-screwdriver-wrench"></i>&nbsp;移动端动画及细节<br>
<i class="fa-solid fa-screwdriver-wrench"></i>&nbsp;移动端动画及细节<br>
<i class="fa-solid fa-screwdriver-wrench"></i>&nbsp;移动端动画及细节<br>
<i class="fa-solid fa-screwdriver-wrench"></i>&nbsp;移动端动画及细节<br>
</span>
<span class="uptext">
<i class="fa-solid fa-screwdriver-wrench"></i>&nbsp;图标更换为 Font
Awesome</span> */


// 背景图片 Cookies 
function setBgImg(bg_img) {
  if (bg_img) {
    Cookies.set('bg_img', bg_img, {
      expires: 36500
    });
    return true;
  }
  return false;
};

// 获取背景图片 Cookies
function getBgImg() {
  let bg_img_local = Cookies.get('bg_img');
  if (bg_img_local && bg_img_local !== "{}") {
    return JSON.parse(bg_img_local);
  } else {
    setBgImg(bg_img_preinstall);
    return bg_img_preinstall;
  }
}

let bg_img_preinstall = {
  "type": "1", // 1:默认背景 2:每日一图 3:随机风景 4:随机动漫
  "2": "https://api.dujin.org/bing/1920.php", // 每日一图
  "3": "https://api.ixiaowai.cn/gqapi/gqapi.php", // 随机风景
  "4": "https://api.ixiaowai.cn/api/api.php" // 随机动漫
};


// 更改背景图片
function setBgImgInit() {
  let bg_img = getBgImg();
  $("input[name='wallpaper-type'][value=" + bg_img["type"] + "]").click();

  switch (bg_img["type"]) {
    case "1":
      $('#bg').attr('src', `./img/background${1 + ~~(Math.random() * 10)}.webp`) //随机默认壁纸
      break;
    case "2":
      $('#bg').attr('src', bg_img_preinstall[2]); //必应每日
      break;
    case "3":
      $('#bg').attr('src', bg_img_preinstall[3]); //随机风景
      break;
    case "4":
      $('#bg').attr('src', bg_img_preinstall[4]); //随机动漫
      break;
  }
};

$(document).ready(function () {
  // 壁纸数据加载
  setBgImgInit();
  // 设置背景图片
  $("#wallpaper").on("click", ".set-wallpaper", function () {
    let type = $(this).val();
    let bg_img = getBgImg();
    bg_img["type"] = type;
    iziToast.show({
      icon: "fa-solid fa-image",
      timeout: 2500,
      message: '壁纸设置成功，刷新后生效',
    });
    setBgImg(bg_img);
  });
});



