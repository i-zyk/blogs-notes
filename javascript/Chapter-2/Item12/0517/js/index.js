(function () {
    let bannerBox = document.querySelector('#bannerBox'),
        wrapper = bannerBox.querySelector('.wrapper'),
        pagination = bannerBox.querySelector('.pagination'),
        paginationList = pagination.querySelectorAll('span');

    // step记录当前展示这个slide的索引
    // autoTimer记录自动轮播的定时器
    // distance记录容器的宽度，也是每一次wrapper运动的距离  1226
    // count记录slide的总数量(包含克隆这一张)
    let step = 0,
        autoTimer = null,
        distance = bannerBox.offsetWidth,
        count = 4;

    // 实现自动轮播
    const autoMove = function autoMove() {
        step++;
        if (step >= count) {
            // 如果累加后的索引比最大索引都大,说明当前已经是末尾这一张(克隆):我们让其立即运动到真实第一张 & 再让其有动画效果的运动到第二张
            wrapper.style.transitionDuration = '0s';
            wrapper.style.left = '0px';
            step = 1;
            wrapper.offsetWidth; //刷新渲染队列，让上面的代码立即先渲染一次
        }
        wrapper.style.transitionDuration = '0.3s';
        wrapper.style.left = `${-step*distance}px`;

        // 每次切换完成，同时控制焦点对齐
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

    // 开启自动轮播 & 控制自动轮播的暂停/继续
    autoTimer = setInterval(autoMove, 1000);
    bannerBox.onmouseenter = () => clearInterval(autoTimer);
    bannerBox.onmouseleave = () => autoTimer = setInterval(autoMove, 1000);
})();