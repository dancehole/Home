/*
作者: imsyy
主页：https://www.imsyy.top/
GitHub：https://github.com/imsyy/home
版权所有，请勿删除
*/

//弹窗样式
iziToast.settings({
    timeout: 1000,
    progressBar: false,
    close: false,
    closeOnEscape: true,
    position: 'topCenter',
    transitionIn: 'bounceInDown',
    transitionOut: 'flipOutX',
    displayMode: 'replace',
    layout: '1',
    backgroundColor: '#00000040',
    titleColor: '#efefef',
    messageColor: '#efefef',
    icon: 'Fontawesome',
    iconColor: '#efefef',
});

/* 鼠标样式 */
const body = document.querySelector("body");
const element = document.getElementById("g-pointer-1");
const element2 = document.getElementById("g-pointer-2");
const halfAlementWidth = element.offsetWidth / 2;
const halfAlementWidth2 = element2.offsetWidth / 2;

function setPosition(x, y) {
    element2.style.transform = `translate(${x - halfAlementWidth2 + 1}px, ${y - halfAlementWidth2 + 1}px)`;
}

body.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(function () {
        setPosition(e.clientX, e.clientY);
    });
});


//加载完成后执行
window.addEventListener('load', function () {

    //载入动画
    $('#loading-box').attr('class', 'loaded');
    $('#bg').css("cssText", "transform: scale(1);filter: blur(0px);transition: ease 1.5s;");
    $('.cover').css("cssText", "opacity: 1;transition: ease 1.5s;");
    $('#section').css("cssText", "transform: scale(1) !important;opacity: 1 !important;filter: blur(0px) !important");

    //用户欢迎
    setTimeout(function () {
        iziToast.show({
            timeout: 2500,
            icon: false,
            title: hello,
            message: '欢迎来到我的主页'
        });
    }, 800);

    //延迟加载音乐播放器（已注释）
    // let element = document.createElement("script");
    // element.src = "./js/music.js";
    // document.body.appendChild(element);

    //中文字体缓加载-此处写入字体源文件 （暂时弃用）
    //先行加载简体中文子集，后续补全字集
    //由于压缩过后的中文字体仍旧过大，可转移至对象存储或 CDN 加载
    // const font = new FontFace(
    //     "MiSans",
    //     "url(" + "./font/MiSans-Regular.woff2" + ")"
    // );
    // document.fonts.add(font);

    //移动端去除鼠标样式
    if (Boolean(window.navigator.userAgent.match(/AppWebKit.*Mobile.*/))) {
        $('#g-pointer-2').css("display", "none");
    }

}, false)

setTimeout(function () {
    $('#loading-text').html("字体及文件加载可能需要一定时间")
}, 3000);

//新春灯笼 （ 需要时可取消注释 ）
// new_element=document.createElement("link");
// new_element.setAttribute("rel","stylesheet");
// new_element.setAttribute("type","text/css");
// new_element.setAttribute("href","./css/lantern.css");
// document.body.appendChild(new_element);

// new_element=document.createElement("script");
// new_element.setAttribute("type","text/javascript");
// new_element.setAttribute("src","./js/lantern.js");
// document.body.appendChild(new_element);

//获取一言
const HITOKOTO_PUBLIC_API = 'https://v1.hitokoto.cn?max_length=24';
let currentHitokoto = null;
let isPrivateHitokoto = false;

function getPrivateHitokotoUrl() {
    const params = new URLSearchParams(API_CONFIG.hitokotoParams);
    return API_CONFIG.baseUrl + API_CONFIG.hitokotoEndpoint + '?' + params.toString();
}

function truncateText(text, maxLen) {
    if (!text) return '';
    if (text.length <= maxLen) return text;
    return text.substring(0, maxLen) + '...';
}

function truncateHitokoto(topic, content) {
    const TOPIC_MAX = 60;
    const CONTENT_MAX = 60;
    const TOTAL_MAX = 80;
    const ELLIPSIS = '...';

    let t = topic || '';
    let c = content || '';

    if (t.length > TOPIC_MAX) {
        t = t.substring(0, TOPIC_MAX) + ELLIPSIS;
    }
    if (c.length > CONTENT_MAX) {
        c = c.substring(0, CONTENT_MAX) + ELLIPSIS;
    }

    const totalLen = t.length + c.length;
    if (totalLen > TOTAL_MAX) {
        const remaining = TOTAL_MAX - t.length - ELLIPSIS.length;
        if (remaining > 0) {
            c = c.substring(0, remaining) + ELLIPSIS;
        } else {
            c = ELLIPSIS;
        }
    }

    return { topic: t, content: c };
}

function renderPrivateHitokoto(data) {
    currentHitokoto = data;
    isPrivateHitokoto = true;
    const result = truncateHitokoto(data.topic || '', data.content || '');
    const type = data.type || '私有';
    $('#hitokoto_topic').html(result.topic);
    $('#hitokoto_text').html(result.content);
    $('#from_text').html(type);
}

function renderPublicHitokoto(data) {
    currentHitokoto = data;
    isPrivateHitokoto = false;
    $('#hitokoto_topic').html('');
    $('#hitokoto_text').html(truncateText(data.hitokoto || '', 60));
    $('#from_text').html(data.from || '');
}

function getHitokoto() {
    if (hasAuthToken()) {
        fetchWithAuth(getPrivateHitokotoUrl())
            .then(response => {
                if (response.status === 401) {
                    clearAuthToken();
                    return fetch(HITOKOTO_PUBLIC_API).then(r => r.json()).then(data => {
                        renderPublicHitokoto(data);
                        return null;
                    });
                }
                if (!response.ok) {
                    return fetch(HITOKOTO_PUBLIC_API).then(r => r.json()).then(data => {
                        renderPublicHitokoto(data);
                        return null;
                    });
                }
                return response.json();
            })
            .then(data => {
                if (data && data.content !== undefined) {
                    renderPrivateHitokoto(data);
                }
            })
            .catch(err => {
                console.error('hitokoto error:', err);
                fetch(HITOKOTO_PUBLIC_API)
                    .then(response => response.json())
                    .then(data => {
                        renderPublicHitokoto(data);
                    })
                    .catch(console.error);
            });
    } else {
        fetch(HITOKOTO_PUBLIC_API)
            .then(response => response.json())
            .then(data => {
                renderPublicHitokoto(data);
            })
            .catch(console.error)
    }
}

getHitokoto();

function loadPrivateContent() {
    getHitokoto();
}

function showHitokotoDetail() {
    if (!currentHitokoto) return;
    const modal = document.getElementById('hitokoto-detail-modal');
    if (!modal) return;
    if (isPrivateHitokoto) {
        $('#detail-topic').html(currentHitokoto.topic || '');
        $('#detail-content').html(currentHitokoto.content || '');
        $('#detail-type').html(currentHitokoto.type || '');
        $('#detail-feedback-section').show();
    } else {
        $('#detail-topic').html('');
        $('#detail-content').html(currentHitokoto.hitokoto || '');
        $('#detail-type').html(currentHitokoto.from || '');
        $('#detail-feedback-section').hide();
    }
    modal.style.display = 'flex';
}

function hideHitokotoDetail() {
    const modal = document.getElementById('hitokoto-detail-modal');
    if (modal) modal.style.display = 'none';
}

function sendFeedback(type) {
    if (!currentHitokoto || !isPrivateHitokoto) return;
    const id = currentHitokoto.id;
    if (!id) return;
    fetchWithAuth(API_CONFIG.baseUrl + '/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, type: type })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                iziToast.show({
                    timeout: 2000,
                    icon: "fa-solid fa-check",
                    message: '反馈已记录'
                });
                hideHitokotoDetail();
                setTimeout(function () {
                    getHitokoto();
                }, 500);
            } else {
                iziToast.show({
                    timeout: 2000,
                    icon: "fa-solid fa-circle-exclamation",
                    message: data.msg || '反馈失败'
                });
            }
        })
        .catch(err => {
            console.error('feedback error:', err);
            iziToast.show({
                timeout: 2000,
                icon: "fa-solid fa-circle-exclamation",
                message: '网络错误，反馈失败'
            });
        });
}

let times = 0;
$('#hitokoto').click(function () {
    if (times == 0) {
        times = 1;
        let index = setInterval(function () {
            times--;
            if (times == 0) {
                clearInterval(index);
            }
        }, 1000);
        getHitokoto();
    } else {
        iziToast.show({
            timeout: 1000,
            icon: "fa-solid fa-circle-exclamation",
            message: '你点太快了吧'
        });
    }
});

$('#hitokoto').on('contextmenu', function (e) {
    e.preventDefault();
    showHitokotoDetail();
});

$(document).on('click', '#hitokoto-detail-modal .detail-close', function () {
    hideHitokotoDetail();
});

$(document).on('click', '#hitokoto-detail-modal', function (e) {
    if (e.target.id === 'hitokoto-detail-modal') {
        hideHitokotoDetail();
    }
});

$(document).on('click', '.feedback-btn', function () {
    const type = $(this).data('feedback-type');
    if (type) {
        sendFeedback(type);
    }
});

//获取天气
//请前往 https://www.mxnzp.com/doc/list 申请 app_id 和 app_secret
//请前往 https://dev.qweather.com/ 申请 key
const add_id = "vcpmlmqiqnjpxwq1"; // app_id
const app_secret = "PeYnsesgkmK7qREhIFppIcsoN0ZShv3c"; // app_secret
const key = "691d007d585841c09e9b41e79853ecc2" // key
function getWeather() {
    fetch("https://www.mxnzp.com/api/ip/self?app_id=" + add_id + "&app_secret=" + app_secret)
        .then(response => response.json())
        .then(data => {
            let str = data.data.city
            let city = str.replace(/市/g, '')
            console.log(data,"sssss")
            $('#city_text').html(city);
            fetch("https://geoapi.qweather.com/v2/city/lookup?location=" + city + "&number=1&key=" + key)
                .then(response => response.json())
                .then(location => {
                    let id = location.location[0].id
                    fetch("https://devapi.qweather.com/v7/weather/now?location=" + id + "&key=" + key)
                        .then(response => response.json())
                        .then(weather => {
                            $('#wea_text').html(weather.now.text)
                            $('#tem_text').html(weather.now.temp + "°C&nbsp;")
                            $('#win_text').html(weather.now.windDir)
                            $('#win_speed').html(weather.now.windScale + "级")
                        })
                })
        })
        .catch(console.error);
}

getWeather();

let wea = 0;
$('#upWeather').click(function () {
    if (wea == 0) {
        wea = 1;
        let index = setInterval(function () {
            wea--;
            if (wea == 0) {
                clearInterval(index);
            }
        }, 60000);
        getWeather();
        iziToast.show({
            timeout: 2000,
            icon: "fa-solid fa-cloud-sun",
            message: '实时天气已更新'
        });
    } else {
        iziToast.show({
            timeout: 1000,
            icon: "fa-solid fa-circle-exclamation",
            message: '请稍后再更新哦'
        });
    }
});

//获取时间
let t = null;
t = setTimeout(time, 1000);

function time() {
    clearTimeout(t);
    dt = new Date();
    let y = dt.getYear() + 1900;
    let mm = dt.getMonth() + 1;
    let d = dt.getDate();
    let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let day = dt.getDay();
    let h = dt.getHours();
    let m = dt.getMinutes();
    let s = dt.getSeconds();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    $("#time").html(y + "&nbsp;年&nbsp;" + mm + "&nbsp;月&nbsp;" + d + "&nbsp;日&nbsp;" + "<span class='weekday'>" + weekday[day] + "</span><br>" + "<span class='time-text'>" + h + ":" + m + ":" + s + "</span>");
    t = setTimeout(time, 1000);
}

//链接提示文字

/*
// 代码在修改为 document.addEventListener("DOMContentLoaded", function () { ... }) 之后创建了新的元素，那么在这个事件监听器外部使用 jQuery 选择器来索引这些元素可能会失效。这是因为 jQuery 选择器会在 DOMContentLoaded 事件之后立即执行，而在此之后动态创建的元素还没有被 jQuery 所选择。

// 为了解决这个问题，你可以使用事件委托（event delegation）来处理动态创建的元素。使用事件委托，你可以将事件绑定到父元素，然后利用事件冒泡机制来处理子元素上的事件。这样，即使动态创建的元素还不存在时，事件绑定也会生效。

// 下面是你的代码如何修改为使用事件委托：
*/
$(document).on("mouseover", "#social", function () {
  $("#social").css({
      "background": "rgb(0 0 0 / 25%)",
      'border-radius': '6px',
      "backdrop-filter": "blur(5px)"
  });
  $("#link-text").css({
      "display": "block",
  });
}).on("mouseout", "#social", function () {
  $("#social").css({
      "background": "none",
      "border-radius": "6px",
      "backdrop-filter": "none"
  });
  $("#link-text").css({
      "display": "none"
  });
});

// $(document).on("mouseover", "#github", function () {
//   $("#link-text").html("去 Github 看看");
// }).on("mouseout", "#github", function () {
//   $("#link-text").html("通过这里联系我");
// });
// $(document).on("mouseover", "#qq", function () {
//   $("#link-text").html("有什么事吗");
// }).on("mouseout", "#qq", function () {
//   $("#link-text").html("通过这里联系我");
// });
// $(document).on("mouseover", "#email", function () {
//   $("#link-text").html("来封 Email");
// }).on("mouseout", "#email", function () {
//   $("#link-text").html("通过这里联系我");
// });
// $(document).on("mouseover", "#bilibili", function () {
//   $("#link-text").html("来 B 站看看 ~");
// }).on("mouseout", "#bilibili", function () {
//   $("#link-text").html("通过这里联系我");
// });
// $(document).on("mouseover", "#telegram", function () {
//   $("#link-text").html("你懂的 ~");
// }).on("mouseout", "#telegram", function () {
//   $("#link-text").html("通过这里联系我");
// });

//非常巧妙的使用html元素自定义属性实现，利用公共类名link，而不是很冗长的代码
$(document).on("mouseover", ".link", function () {
  var linkText = $(this).data("link-text");
  $("#link-text").html(linkText);
}).on("mouseout", ".link", function () {
  $("#link-text").html("通过这里联系我");
});


//特殊日期自动变灰

// 获取当前日期
let currentDate = new Date();
let currentMonth = currentDate.getMonth() + 1;
let currentDateOfMonth = currentDate.getDate();

// 定义特殊纪念日及相关信息
let specialDays = [
    { date: '4.4', message: "清明节" },
    { date: '5.12', message: "国际护士节" },
    { date: '7.7', message: "七七事变纪念日" },
    { date: '9.9', message: "9·18事变纪念日" },
    { date: '9.18', message: "九一八事变纪念日" },
    { date: '12.13', message: "南京大屠杀死难者公祭日" }
];

// 遍历特殊日期数组
for (let specialDay of specialDays) {
    let [month, day] = specialDay.date.split('.');
    // 检查是否是特殊纪念日
    if (parseInt(month) === currentMonth && parseInt(day) === currentDateOfMonth) {
        // 变灰处理
        document.write(
            '<style>html{-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);_filter:none}</style>'
        );
        // 更新页面内容
        $("#change").html("Silence in silence");
        $("#change1").html("今天是"+specialDay.date+specialDay.message+"，全站已切换为黑白模式");

        // 显示通知
        window.addEventListener('load', function () {
            setTimeout(function () {
                iziToast.show({
                    timeout: 14000,
                    icon: "fa-solid fa-clock",
                    message: specialDay.message + "，全站已切换为黑白模式"
                });
            }, 3800);
        }, false);

        // 停止遍历，因为只需处理一次特殊日期
        break;
    }
}




//更多页面切换
let shoemore = false;
$('#switchmore').on('click', function () {
    shoemore = !shoemore;
    if (shoemore && $(document).width() >= 990) {
        $('#container').attr('class', 'container mores');
        $("#change").html("Oops&nbsp;!");
        $("#change1").html("哎呀，这都被你发现了（ 再点击一次可关闭 ）");
    } else {
        $('#container').attr('class', 'container');
        $("#change").html("Hello&nbsp;World&nbsp;!");
        $("#change1").html("一个建立于 21 世纪的小站，存活于互联网的边缘");
    }
});

//更多页面关闭按钮
$('#close').on('click', function () {
    $('#switchmore').click();
});

//移动端菜单栏切换
let switchmenu = false;
$('#switchmenu').on('click', function () {
    switchmenu = !switchmenu;
    if (switchmenu) {
        $('#row').attr('class', 'row menus');
        $("#menu").html("<i class='fa-solid fa-xmark'></i>");
    } else {
        $('#row').attr('class', 'row');
        $("#menu").html("<i class='fa-solid fa-bars'></i>");
    }
});

//更多弹窗页面
$(document).on('click', '#openmore', function () {
    $('#box').css("display", "block");
    $('#row').css("display", "none");
    $('#more').css("cssText", "display:none !important");
});
$('#closemore').on('click', function () {
    $('#box').css("display", "none");
    $('#row').css("display", "flex");
    $('#more').css("display", "flex");
});

//监听网页宽度
window.addEventListener('load', function () {
    window.addEventListener('resize', function () {
        //关闭移动端样式
        if (window.innerWidth >= 600) {
            $('#row').attr('class', 'row');
            $("#menu").html("<i class='fa-solid fa-bars'></i>");
            //移除移动端切换功能区
            $('#rightone').attr('class', 'row rightone');
        }

        if (window.innerWidth <= 990) {
            //移动端隐藏更多页面
            $('#container').attr('class', 'container');
            $("#change").html("Hello&nbsp;World&nbsp;!");
            $("#change1").html("一个建立于 21 世纪的小站，存活于互联网的边缘");

            //移动端隐藏弹窗页面
            $('#box').css("display", "none");
            $('#row').css("display", "flex");
            $('#more').css("display", "flex");
        }
    })
})

//移动端切换功能区
let changemore = false;
$('#changemore').on('click', function () {
    changemore = !changemore;
    if (changemore) {
        $('#rightone').attr('class', 'row menus mobile');
    } else {
        $('#rightone').attr('class', 'row menus');
    }
});

//更多页面显示关闭按钮
$("#more").hover(function () {
    $('#close').css("display", "block");
}, function () {
    $('#close').css("display", "none");
})

//屏蔽右键
document.oncontextmenu = function () {
    iziToast.show({
        timeout: 2000,
        icon: "fa-solid fa-circle-exclamation",
        message: '为了浏览体验，本站禁用右键'
    });
    return false;
}


//版权信息栈 更新

let content = `
博客:  https://bolo.wuhobin.top
Github:  https://github.com/wuhobin
`
//console.log(`%c${title1} %c${title2}
//%c${content}`, styleTitle1, styleTitle2, styleContent)
