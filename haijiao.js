// ==UserScript==
// @name         海角社区 解锁VIP观看高清下载搜索等限制,去除广告.正则版通杀所有 for openuserjs
// @description  https://github.com/91p2022/haijiao 解锁91pornVIP观看下载搜索限制,去除广告,付费视频等,警告:本脚本无任何盈利方式,触犯某收费且含有监控追踪代码脚本,疯狂举报且用且珍惜,请保护好个人财产和隐私.
// @copyright    https://t.me/vipnav
// @icon         https://www.google.com/s2/favicons?sz=64&domain=haijiao.com
// @version      0.0.3
// @author       https://t.me/vipnav
// @license      AGPL-3.0-only
// @homepageURL  https://t.me/vipnav
// @match        *.haijiao.com/*
// @match        *://*/post/details*
// @run-at       document-end
// @grant        none

// ==/UserScript==

(function() {
    'use strict';

    var targetEl = document.querySelector('h2[data-v-92dd434e]');

    if (targetEl) {
        addLinkToElement(targetEl);
    } else {
        // 如果元素未加载完成，添加一个 MutationObserver 监听器以监听其出现
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                var targetNodes = Array.from(mutation.addedNodes);
                targetNodes.forEach(function(node) {
                    if (node.matches && node.matches('h2[data-v-92dd434e]')) {
                        addLinkToElement(node);
                    }
                });
            });
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    function addLinkToElement(element) {
        var link = document.createElement('a');
        link.href = 'https://t.me/viphaijiao';
        link.innerText = '点我免费下载';
        link.style.cursor = 'pointer';

        link.onclick = function(e) {
            e.preventDefault();
            var url = window.location.href;
            var popup = window.open('', 'popup', 'width=500,height=500,top=100,left=100,scrollbars=yes');
            var content = popup.document.createElement('div');
            content.innerHTML = '<p>请将当前的网址：</p><p>' + url + '</p><p>发送至：</p><p>' + link.href + '</p><img src="https://user-images.githubusercontent.com/104338953/227548360-2becf236-480a-46b3-bb51-b679a7034853.png" width="500"><button onclick="window.close()">关闭</button>';
            content.style.margin = '20px';
            popup.document.body.appendChild(content);
        };

        var span = document.createElement('span');
        span.innerText = element.innerText;
        element.innerText = '';
        span.appendChild(document.createTextNode(' '));
        span.appendChild(link);
        element.appendChild(span);
    }
})();
