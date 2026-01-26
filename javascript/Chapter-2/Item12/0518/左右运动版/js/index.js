(function () {
    let bannerBox = document.querySelector('#bannerBox'),
        wrapper = bannerBox.querySelector('.wrapper'),
        pagination = bannerBox.querySelector('.pagination'),
        paginationList = null;

    let step = 0,
        autoTimer = null,
        distance = bannerBox.offsetWidth,
        count = 4;

    // 获取数据 & 数据绑定
    const binding = function binding() {
        // 获取数据
        let data = [],
            xhr = new XMLHttpRequest,
            str1 = ``,
            str2 = ``;
        xhr.open('GET', './data.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send();

        // 数据绑定
        data.push(data[0]);
        data.forEach((item, index) => {
            str1 += `<div class="slide">
                <img src="${item.pic}" alt="">
            </div>`;
            if (index < data.length - 1) {
                str2 += `<span index="${index}" class="${index===0?'active':''}"></span>`;
            }
        });
        wrapper.innerHTML = str1;
        pagination.innerHTML = str2;

        count = data.length;
        wrapper.style.width = `${count*100}%`;
        paginationList = pagination.querySelectorAll('span');
    };

    // 封装公共切换的方法
    const change = function change(dir) {
        if (dir != null) {
            if (dir === 'left') {
                // 切换到上一张
                step--;
                if (step < 0) {
                    wrapper.style.transitionDuration = '0s';
                    wrapper.style.left = `${-(count-1)*distance}px`;
                    step = count - 2;
                    wrapper.offsetWidth;
                }
            } else {
                // 切换到下一张
                step++;
                if (step >= count) {
                    wrapper.style.transitionDuration = '0s';
                    wrapper.style.left = '0px';
                    step = 1;
                    wrapper.offsetWidth;
                }
            }
        }
        wrapper.style.transitionDuration = '0.3s';
        wrapper.style.left = `${-step*distance}px`;
        paginationFocus();
    };

    // 分页器对齐
    const paginationFocus = function paginationFocus() {
        let temp = step;
        if (temp === count - 1) temp = 0;
        paginationList.forEach((item, index) => {
            if (index === temp) {
                item.className = 'active';
                return;
            }
            item.className = '';
        });
    };

    // 基于事件委托实现容器中分页器点击切换 & 左右导航按钮点击切换
    bannerBox.addEventListener('click', function (ev) {
        let target = ev.target,
            tarTag = target.tagName,
            tarClass = target.className;

        // 点击分页器的焦点
        if (tarTag === 'SPAN') {
            let index = +target.getAttribute('index');
            if ((index === step) || (step === count - 1 && index === 0)) return;
            step = index;
            change();
            return;
        }

        // 点击左右按钮
        if (tarTag === 'DIV' && tarClass.includes('navigation')) {
            tarClass.includes('prev') ? change('left') : change('right');
        }
    });

    // 开启自动轮播 & 控制自动轮播的暂停/继续
    binding();
    autoTimer = setInterval(change.bind(null, 'right'), 1000);
    bannerBox.onmouseenter = () => clearInterval(autoTimer);
    bannerBox.onmouseleave = () => autoTimer = setInterval(change.bind(null, 'right'), 1000);
})();