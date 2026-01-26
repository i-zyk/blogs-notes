(function () {
    let bannerBox = document.querySelector('#bannerBox'),
        wrapper = bannerBox.querySelector('.wrapper'),
        pagination = bannerBox.querySelector('.pagination'),
        paginationList = pagination.querySelectorAll('span');

    let step = 0,
        autoTimer = null,
        distance = bannerBox.offsetWidth,
        count = 4;

    // 实现自动轮播
    const autoMove = function autoMove() {
        step++;
        if (step >= count) {
            wrapper.style.transitionDuration = '0s';
            wrapper.style.left = '0px';
            step = 1;
            wrapper.offsetWidth;
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
            if ((index === step) || (step === count - 1 && index === 0)) return; //点击这一项就是展示的这一项，则无需处理(不要忘记克隆那个)
            step = index;
            wrapper.style.left = `${-step*distance}px`;
            paginationFocus();
            return;
        }

        // 点击左右按钮
        if (tarTag === 'DIV' && tarClass.includes('navigation')) {
            if (tarClass.includes('prev')) {
                // 左按钮
                step--;
                if (step < 0) {
                    // 到达左边界:立即蹦到最后一张(克隆),然后运动到倒数第二张
                    wrapper.style.transitionDuration = '0s';
                    wrapper.style.left = `${-(count-1)*distance}px`;
                    step = count - 2;
                    wrapper.offsetWidth;
                }
                wrapper.style.transitionDuration = '0.3s';
                wrapper.style.left = `${-step*distance}px`;
                paginationFocus();
                return;
            }
            // 右按钮(和自动轮播一样)
            autoMove();
        }
    });


    // 开启自动轮播 & 控制自动轮播的暂停/继续
    autoTimer = setInterval(autoMove, 1000);
    bannerBox.onmouseenter = () => clearInterval(autoTimer);
    bannerBox.onmouseleave = () => autoTimer = setInterval(autoMove, 1000);
})();