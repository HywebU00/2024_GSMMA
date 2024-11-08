// -----  基本功能開關   ---------------------------------------------------
window.addEventListener('load', () => {
  topNav(); // 手機版顯示nav選單
  // navSticky(); // 捲動時固定主選單
  // xSlider('.language button', '.language ul'); //語系
  // fontSize(); // 全站字體
  // fatFooter(); // fatFooter是否要展開
  scrollTables('.tableWrapper'); // table捲動功能

  webSearch();

  // tab功能
  tabFunction({
    target: '.tabSet',
    openFirst: false, // 預設先展開所有內容，鍵盤的自動開合功能無效
    openSwitch: true, // 是否可開合/切換
    autoClose: true, // 自動關閉其他開啟內容
    modeSwitch: false, // 預設模式自動切換，尺寸以上tab功能，尺寸以下手風琴功能
    width: 767, // 尺寸以上tab功能，尺寸以下手風琴功能
    index: 0, // 預設開啟第幾個
  });

  tableAddDataAttributes({
    elemClass: '.tableList', // 目標table
    dataName: 'title', // tableList樣式 加上 data-title
  });

  // 手風琴功能
  accordionFunction({
    target: '.accordion',
    openFirst: false, // 預設先展開所有內容，鍵盤的自動開合功能無效
    autoClose: true, // 點擊時自動關閉已展開的項目，若需要此功能需要關閉openFirst
    openSwitch: true, // 是否可開合
    index: 0, // 預設開啟第幾個
    info: {
      open: '展開', // 收合時顯示
      close: '收合', // 展開時顯示
    },
  });
});
// -----  基本功能開關   ---------------------------------------------------

// 自行加入的JS請寫在這裡
(function () {
  //cp輪播
  const cpSwiper = new Swiper('.cpSlider .swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: false,
    // 切換點
    pagination: {
      el: '.cpSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.cpSlider .nextSlider', //自行設定樣式
      prevEl: '.cpSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    breakpoints: {
      100: {
        slidesPerView: 1,
      },
      500: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 4,
      },
    },
  });

  //大圖輪播
  let mpSliderItem = document.querySelectorAll('.mpSlider .swiper-slide');
  let mpSliderPagination = [];
  mpSliderItem.forEach((item, index) => {
    mpSliderPagination.push(item.dataset.title);
  });
  const mpSlider = new Swiper('.mpSlider .swiper', {
    slidesPerView: 1,
    loop: false,
    // 切換點
    pagination: {
      el: '.mpSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
      renderBullet: function (index, className) {
        return `<button class="${className} noFonts" aria-label="${mpSliderPagination[index]}">${mpSliderPagination[index]}</button>`;
      },
    },
    // 切換箭頭
    navigation: {
      nextEl: '.mpSlider .nextSlider', //自行設定樣式
      prevEl: '.mpSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
  });

  //最新上架
  const newsSwiper = new Swiper('.indexPage .news .swiperBox .swiper', {
    spaceBetween: 40,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
    loop: true,
    loopedSlides: 3,
    breakpoints: {
      100: {
        slidesPerView: 1,
      },
      1001: {
        slidesPerView: 3,
      },
    },
  });
  const newsInfoSwiper = new Swiper('.indexPage .news .infoBox .swiper', {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    loopedSlides: 3,
    // 切換箭頭
    navigation: {
      nextEl: '.indexPage .news .nextSlider', //自行設定樣式
      prevEl: '.indexPage .news .prevSlider', //自行設定樣式
      disabledClass: '.indexPage .news swiperArrow-disabled', //不可點選樣式
    },
  });

  newsSwiper.controller.control = newsInfoSwiper;
  newsInfoSwiper.controller.control = newsSwiper;

  //排行榜

  const rankingSwiper = new Swiper('.indexPage .ranking .swiper', {
    slidesPerView: 3,
    slideToClickedSlide: true,
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      500: {
        slidesPerView: 3,
      },
    },
    // 切換箭頭
    navigation: {
      nextEl: '.indexPage .ranking .nextSlider', //自行設定樣式
      prevEl: '.indexPage .ranking .prevSlider', //自行設定樣式
      // disabledClass: '.indexPage .ranking swiperArrow-disabled', //不可點選樣式
    },
    pagination: {
      el: '.indexPage .ranking .swiperPagination',
    },
    on: {
      reachEnd: function () {
        let swiperNext = document.querySelector('.indexPage .ranking .nextSlider');
        function clickHandler() {
          rankingSwiper.slideTo(0);
          swiperNext.removeEventListener('click', clickHandler);
        }
        swiperNext.addEventListener('click', clickHandler);
      },
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      600: {
        slidesPerView: 3,
      },
    },
  });

  //linkSlider
  const linkSlider = new Swiper('.indexPage .linkSlider .swiper', {
    spaceBetween: 25,
    slidesPerView: 3,
    // watchSlidesProgress: true,
    navigation: {
      nextEl: '.indexPage .linkSlider .nextSlider', //下一張class，無障礙設定關係需要增加.nextSlider
      prevEl: '.indexPage .linkSlider .prevSlider', //前一張class，無障礙設定關係需要增加.prevSlider
      // disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    pagination: {
      el: '.indexPage .linkSlider .swiperPagination',
    },
    breakpoints: {
      100: { spaceBetween: 25, slidesPerView: 2 },
      767: { spaceBetween: 25, slidesPerView: 3 },
    },
  });

  //跑馬燈
  const marqueeSwiper = new Swiper('.marquee .swiper', {
    direction: 'vertical',
    // 切換點
    // 切換箭頭
    navigation: {
      nextEl: '.marquee .nextSlider', //自行設定樣式
      prevEl: '.marquee .prevSlider', //自行設定樣式
      disabledClass: '.marquee marquee-arrow-disabled', //不可點選樣式
    },
  });

  //cp_photo
  const navSlider = new Swiper('.navSlider .swiper', {
    lazy: true, // lazy load
    preloadImages: false, // 多筆設定lazy時須設定
    centeredSlides: false, // 多筆設定lazy時須設定
    slidesPerView: 4,
    // watchSlidesProgress: true,
    navigation: {
      nextEl: '.navSlider .nextSlider', //下一張class，無障礙設定關係需要增加.nextSlider
      prevEl: '.navSlider .prevSlider', //前一張class，無障礙設定關係需要增加.prevSlider
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
    },
  });

  const sliderFor = new Swiper('.sliderFor .swiper', {
    slidesPerView: 1, //顯示張數
    effect: 'fade', //淡入
    fadeEffect: {
      crossFade: true, //上一張淡出，false上一張不淡出，下一張疊在上方
    },
    pagination: {
      el: '.sliderFor .pagination',
      type: 'fraction', //顯示分頁
    },
    lazy: true,
    thumbs: {
      swiper: navSlider, //設定指向到哪個swiper，使用另一個設定的參數
    },
  });
})();

wow = new WOW({
  animateClass: 'animated',
  offset: 100,
  // callback: function (box) {
  //   console.log('WOW: animating <' + box.tagName.toLowerCase() + '>');
  // },
});
wow.init();
//theme 圖片區塊
const path1 = 'M0,0.442 C-0.003,0.554,0.054,0.688,0.481,0.96 C0.664,1,1,0.893,1,0.642 S0.774,0.018,0.59,0 S0.247,0.026,0.172,0.115 S0.003,0.346,0,0.442';

const path2 = 'M0,0.515 C0,0.688,0.083,0.922,0.264,0.985 C0.433,1,1,0.87,1,0.615 S0.957,0.019,0.769,0 S0.296,0.029,0.172,0.124 S0,0.342,0,0.515';

const path3 = 'M0,0.682 C0.022,0.852,0.179,0.993,0.365,0.999 C0.54,1,0.998,0.701,0.998,0.446 S0.814,0.025,0.626,0.006 S0.348,0,0.226,0.095 S-0.022,0.516,0,0.682';

const path4 = 'M0.022,0.696 C0.044,0.867,0.294,0.991,0.482,0.997 C0.659,1,1,0.708,1,0.451 S0.724,0.019,0.534,0 S0.252,0.05,0.129,0.145 S0,0.529,0.022,0.696';

function circle(name, t1, time1, t2, time2, t3, time3, t4, time4) {
  const indexPage = document.querySelector('.indexPage');
  if (!indexPage) {
    return;
  }
  let el = gsap.timeline();

  el.to(name, {
    attr: { d: t1 },
    duration: time1,
    ease: 'sine.out',
  })
    .to(name, {
      attr: { d: t2 },
      duration: time2,
      ease: 'sine.out',
    })
    .to(name, {
      attr: { d: t3 },
      duration: time3,
      ease: 'sine.out',
    })
    .to(name, {
      attr: { d: t4 },
      duration: time4,
      ease: 'sine.out',
    })
    .repeat(-1);
}

circle('#picBox', path2, 3, path3, 3, path4, 3, path1, 3);
circle('#picBox2', path3, 3, path1, 3, path2, 3, path4, 3);

(function () {
  const indexPage = document.querySelector('.indexPage');
  if (indexPage) {
    // let mpTabButton = document.querySelectorAll('.indexPage .tabSet .tabItems button');
    // let themePic = document.querySelector('.theme .picBox .pic');
    // let img = themePic.querySelector('img');
    // img.setAttribute('src', mpTabButton[0].dataset.pic);
    // mpTabButton.forEach((item) => {
    //   item.addEventListener('click', (e) => {
    //     let picSrc = item.dataset.pic;
    //     img.classList.add('change');
    //     setTimeout(() => {
    //       img.setAttribute('src', picSrc);
    //     }, 150);
    //     setTimeout(() => {
    //       img.classList.remove('change');
    //     }, 300);
    //   });
    // });

    const memberBtn = document.querySelector('.memberBtn');
    const memberBox = document.querySelector('.memberBox');
    const webSearch = document.querySelector('.wrapper .webSearch');
    memberBtn.addEventListener('click', () => {
      jsSlideToggle(memberBox);
      jsSlideUp(webSearch);
    });
  }

  const lpPublications = document.querySelector('.lpPublications');
  const switchBox = lpPublications?.querySelector('.switchBox');
  if (lpPublications && switchBox) {
    const typeList = switchBox.querySelector('.list');
    const typeGrid = switchBox.querySelector('.grid');
    typeList.classList.add('active');

    const lpList = document.querySelector('.lpPublications > .list');
    switchBox.addEventListener('click', (e) => {
      if (e.target === typeList) {
        typeList.classList.add('active');
        typeGrid.classList.remove('active');
        lpList.classList.remove('grid');
      } else if (e.target === typeGrid) {
        typeList.classList.remove('active');
        typeGrid.classList.add('active');
        lpList.classList.add('grid');
      }
    });
  }
})();

(function () {
  const mapBox = document.querySelector('.mapBox');
  const mapBoxI = document.querySelectorAll('.mapBox g');
  const mapBoxEl = document.querySelectorAll('.mapBox .mapInfo .el');
  const mapBoxA = document.querySelectorAll('.mapBox svg a');
  const islandsData = document.querySelectorAll('.islands .item');
  const cityData = document.querySelectorAll('.cityBox .topBtnBox li');
  if (mapBox) {
    function mouseEvent(e, classInfo) {
      e.preventDefault();
      let className = e.target.parentNode.dataset.class;
      let mainData = document.querySelector(`.mapBox svg [data-class*="${className}"]`);
      let infoData = document.querySelector(`.mapBox .mapInfo [data-class*="${className}"]`);
      let islandsInfoData = document.querySelector(`.mapBox .islands [data-class*="${className}"]`);
      let cityInfoData = document.querySelector(`.mapBox .cityBox [data-class*="${className}"]`);
      //main
      if (infoData) {
        const siblings = Array.prototype.filter.call(infoData.parentNode.children, (child) => {
          return child !== infoData;
        });
        siblings.forEach((content) => content.classList.remove(classInfo));
        infoData.classList.toggle(classInfo);

        const siblingsMap = Array.prototype.filter.call(mainData.parentNode.children, (child) => {
          return child !== mainData;
        });
        siblingsMap.forEach((content) => content.classList.remove(classInfo));
        mainData.classList.toggle(classInfo);

        islandsData.forEach((content) => content.classList.remove(classInfo)); //外島
      }

      //islands
      if (islandsInfoData) {
        const islandsOther = Array.prototype.filter.call(islandsInfoData.parentNode.children, (child) => {
          return child !== islandsInfoData;
        });
        islandsOther.forEach((content) => content.classList.remove(classInfo));
        islandsInfoData.classList.toggle(classInfo);

        mapBoxI.forEach((content) => content.classList.remove(classInfo)); //本島
        mapBoxEl.forEach((content) => content.classList.remove(classInfo)); //本島
      }

      //city
      if (cityData) {
        const cityOther = Array.prototype?.filter.call(cityInfoData.parentNode.children, (child) => {
          return child !== cityInfoData;
        });
        cityOther.forEach((content) => content.classList.remove(classInfo));
        cityInfoData.classList.toggle(classInfo);
      }
    }

    // 外島
    islandsData.forEach((item) => {
      item.addEventListener('click', (e) => {
        mouseEvent(e, 'clickActive');
      });
      item.addEventListener('mouseover', (e) => {
        mouseEvent(e, 'active');
      });
      item.addEventListener('mouseleave', (e) => {
        mapBox.querySelectorAll('.active').forEach((content) => content.classList.remove('active'));
      });
    });

    //本島
    mapBoxA.forEach((item) => {
      item.addEventListener('click', (e) => {
        mouseEvent(e, 'clickActive');
      });
      item.addEventListener('mouseover', (e) => {
        mouseEvent(e, 'active');
      });
      item.addEventListener('mouseleave', (e) => {
        mapBox.querySelectorAll('.active').forEach((content) => content.classList.remove('active'));
      });
    });

    // 地圖-計畫現況-縣市
    cityData.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        let checkAll = mapBox.querySelectorAll('.clickActive').length;
        let contentMap = mapBox.querySelectorAll('.cityBox .content');

        const other = Array.prototype.filter.call(contentMap, (child) => {
          return child !== contentMap[index];
        });

        other.forEach((content) => content.classList.remove('active2'));
        contentMap[index].classList.toggle('active2');

        if (index === 0 && checkAll <= 3) {
          mapBoxI.forEach((content) => content.classList.add('clickActive'));
          mapBoxEl.forEach((content) => content.classList.add('clickActive'));
          cityData.forEach((content) => content.classList.add('clickActive'));
          islandsData.forEach((content) => content.classList.add('clickActive'));
        } else if (index === 0 && checkAll > 6) {
          mapBoxI.forEach((content) => content.classList.remove('clickActive'));
          mapBoxEl.forEach((content) => content.classList.remove('clickActive'));
          cityData.forEach((content) => content.classList.remove('clickActive'));
          islandsData.forEach((content) => content.classList.remove('clickActive'));
        } else if (index > 0) {
          mapBoxI.forEach((content) => content.classList.remove('clickActive'));
          mapBoxEl.forEach((content) => content.classList.remove('clickActive'));
          cityData.forEach((content) => content.classList.remove('clickActive'));
          islandsData.forEach((content) => content.classList.remove('clickActive'));
          mouseEvent(e, 'clickActive');
        }
      });
      item.addEventListener('mouseover', (e) => {
        index > 0 && mouseEvent(e, 'active');
      });
      item.addEventListener('mouseleave', (e) => {
        mapBox.querySelectorAll('.active').forEach((content) => content.classList.remove('active'));
      });
    });

    mapBox.addEventListener('mouseleave', (e) => {
      mapBox.querySelectorAll('.active').forEach((content) => content.classList.remove('active'));
    });
  }

  function checkData() {}
  cityData.forEach((item) => {
    item.addEventListener('click', (e) => {
      checkData();
    });
  });
})();
