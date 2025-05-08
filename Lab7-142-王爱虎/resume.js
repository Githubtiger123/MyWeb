document.addEventListener('DOMContentLoaded', function() {
    // 照片轮播功能
    const carousel = document.querySelector('.photo-carousel');
    const images = carousel.querySelectorAll('img');
    const indicators = carousel.querySelectorAll('.carousel-indicators span');
    let currentIndex = 0;
    const totalImages = images.length;
    let interval;

    function showImage(index) {
        // 标记当前图片为离开状态
        const currentActive = carousel.querySelector('img.active');
        if (currentActive) {
            currentActive.classList.remove('active');
            currentActive.classList.add('leaving');
            
            // 移除离开动画类
            setTimeout(() => {
                currentActive.classList.remove('leaving');
            }, 1000);
        }

        // 更新指示器
        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[index].classList.add('active');

        // 设置新图片为活动状态
        images[index].classList.add('active');
        currentIndex = index;
    }

    function nextImage() {
        const nextIndex = (currentIndex + 1) % totalImages;
        showImage(nextIndex);
    }

    // 初始化
    showImage(currentIndex);
    
    // 自动轮播，间隔3秒
    function startCarousel() {
        interval = setInterval(nextImage, 3000);
    }
    startCarousel();
    
    // 鼠标悬停暂停轮播
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', startCarousel);
    
    // 点击指示器切换图片
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(interval);
            showImage(index);
            interval = setInterval(nextImage, 3000);
        });
    });

    // 添加技能和项目的功能
    document.getElementById('add-skill').addEventListener('click', function(e) {
        e.preventDefault();
        const list = document.getElementById('skills-list');
        const newItem = document.createElement('li');
        newItem.innerHTML = `
            <input type="text" placeholder="输入新技能">
            <button class="remove-btn"><i class="fas fa-times-circle"></i></button>
        `;
        list.appendChild(newItem);
    });

    document.getElementById('add-project').addEventListener('click', function(e) {
        e.preventDefault();
        const list = document.getElementById('projects-list');
        const newItem = document.createElement('li');
        newItem.innerHTML = `
            <input type="text" placeholder="输入新项目">
            <button class="remove-btn"><i class="fas fa-times-circle"></i></button>
        `;
        list.appendChild(newItem);
    });

    // 删除项目功能
    document.addEventListener('click', function(e) {
        if (e.target.closest('.remove-btn')) {
            e.preventDefault();
            e.target.closest('li').remove();
        }
    });

    // 照片上传功能
    document.getElementById('photo-upload').addEventListener('change', function(e) {
        const files = e.target.files;
        const carousel = document.querySelector('.photo-carousel');
        const indicators = document.querySelector('.carousel-indicators');
        
        // 清空现有图片和指示器
        carousel.querySelectorAll('img').forEach(img => img.remove());
        indicators.innerHTML = '';
        
        // 添加新图片
        Array.from(files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.alt = "上传的照片" + (index + 1);
                if (index === 0) img.classList.add('active');
                carousel.insertBefore(img, indicators);
                
                // 添加指示器
                const span = document.createElement('span');
                if (index === 0) span.classList.add('active');
                indicators.appendChild(span);
            };
            reader.readAsDataURL(file);
        });
    });
});