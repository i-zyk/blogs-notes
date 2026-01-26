(function () {
    let container = document.querySelector('#container'),
        wrapper = container.querySelector('.wrapper'),
        slides = null,
        navPrev = container.querySelector('.navigation.prev'),
        navNext = container.querySelector('.navigation.next');
    let step = 0,
        autoTimer = null,
        count = 0,
        interval = 1000,
        data = [];

    // 获取数据
    const queryData = function queryData() {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', './data.json', false);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send();
    };

    // 实现数据绑定
    const binding = function binding(initial) {
        // 1.如果数据不足5条，我们需要补齐5条
        if (data.length === 0) return;
        while (data.length < 5) {
            let diff = 5 - data.length,
                clone = data.slice(0, diff);
            data = data.concat(clone);
        }
        count = data.length;

        // 2.在绑定slide之前，需要按照规则给每个slide设置样式，增加到数据的每一项中「className&sty」
        let temp1 = step - 2,
            temp2 = step - 1,
            temp3 = step, //正中间这一项
            temp4 = step + 1,
            temp5 = step + 2;
        if (temp1 < 0) temp1 = count + temp1;
        if (temp2 < 0) temp2 = count + temp2;
        if (temp4 > count - 1) temp4 = temp4 - count;
        if (temp5 > count - 1) temp5 = temp5 - count;
        data = data.map((item, index) => {
            let zIndex = 0,
                className = 'slide',
                transform = 'translate(-50%,-50%) scale(0.55)';
            switch (index) {
                case temp1:
                    zIndex = 1;
                    transform = 'translate(-195%,-50%) scale(0.7)';
                    break;
                case temp2:
                    zIndex = 2;
                    transform = 'translate(-130%,-50%) scale(0.85)';
                    break;
                case temp3:
                    className = 'slide active';
                    zIndex = 3;
                    transform = 'translate(-50%,-50%) scale(1)';
                    break;
                case temp4:
                    zIndex = 2;
                    transform = 'translate(30%,-50%) scale(0.85)';
                    break;
                case temp5:
                    zIndex = 1;
                    transform = 'translate(95%,-50%) scale(0.7)';
                    break;
            }
            item.className = className;
            item.sty = `z-index:${zIndex};transform:${transform};`;
            return item;
        });

        // 5.如果initial不是true，说明不是第一次执行这个方法，此时我们按照最新计算的样式，修改每个slide样式即可
        if (!initial) {
            data.forEach((item, index) => {
                let {
                    className,
                    sty
                } = item;
                slides[index].className = className;
                slides[index].style.cssText = sty;
            });
            return;
        }

        // 3.数据渲染:动态创建slide，并且设置样式
        let str = ``;
        data.forEach(item => {
            let {
                pic,
                className,
                sty,
                descript: {
                    name,
                    identity,
                    dream
                }
            } = item;
            str += `<div class="${className}" style="${sty}">
                <img src="${pic}" alt="">
                <div class="mark"></div>
                <div class="desc">
                    <p>${name}</p>
                    <p>身份:${identity}</p>
                    <p>梦想:${dream}</p>
                </div>
            </div>`;
        });
        wrapper.innerHTML = str;

        // 4.获取slide & 控制按钮显示
        slides = wrapper.querySelectorAll('.slide');
        navPrev.style.display = navNext.style.display = 'block';
    };

    // 自动轮播
    const autoMove = function autoMove() {
        step++;
        if (step >= count) step = 0;
        binding();
    };

    // 控制自动轮播暂停或者开启
    container.addEventListener('mouseenter', () => clearInterval(autoTimer));
    container.addEventListener('mouseleave', () => autoTimer = setInterval(autoMove, interval));

    // 点击左右按钮切换
    container.addEventListener('click', function (ev) {
        let target = ev.target,
            targetTag = target.tagName,
            targetClass = target.className;
        if (targetTag === "DIV" && targetClass.includes('navigation')) {
            if (targetClass.includes('prev')) {
                // 左按钮
                step--;
                if (step < 0) step = count - 1;
                binding();
                return;
            }
            // 右按钮
            autoMove();
        }
    });

    queryData();
    binding(true);
    autoTimer = setInterval(autoMove, interval);
})();