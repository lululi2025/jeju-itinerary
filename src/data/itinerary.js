// 👤 我的行程：5天自駕自遊版 (7/8 - 7/12)
export const myItinerary = [
  {
    dayNum: 1,
    date: '7/8(三)',
    theme: { h: 24, s: '90%', l: '95%', accent: '#ea580c' },
    summary: '抵達濟州島 & 家庭溫馨聚會',
    flights: [
      {
        airline: '臺灣虎航 IT654',
        time: '06:40 - 09:35',
        from: '台北 (TPE)',
        to: '濟州 (CJU)',
        status: '去程直飛'
      }
    ],
    timeline: [
      {
        time: '06:40',
        title: '🛫 飛機起飛',
        tag: 'flight',
        description: '搭乘台灣虎航 IT654 飛往濟州島，開啟美好旅程。',
        location: '桃園國際機場 T1'
      },
      {
        time: '09:35',
        title: '🛬 抵達濟州機場',
        tag: 'flight',
        description: '辦理入境手續，提取行李後出關。',
        location: '濟州國際機場',
        transit: { type: 'drive', time: '35 分鐘', dist: '22 公里', desc: '自駕/計程車前往東部海岸區' }
      },
      {
        time: '11:00',
        title: '🥯 會合家人！超人氣倫敦貝果大餐',
        tag: 'food',
        coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
        description: '在熱門的 London Bagel Museum 與先抵達的家人會合，品嚐香 Q 貝果。旁邊有網美墨鏡店 Blue Elephant 濟州店可以順便逛！',
        location: 'London Bagel Museum Jeju',
        mapUrl: 'https://map.naver.com/v5/search/London%20Bagel%20Museum%20Jeju',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=London+Bagel+Museum+Jeju',
        introUrl: 'https://mimi-travel.com/london-bagel-museum-jeju/',
        transit: { type: 'drive', time: '15 分鐘', dist: '11 公里', desc: '開車沿著海岸線往東' }
      },
      {
        time: '13:00',
        title: '🐚 海女博物館文化體驗',
        tag: 'activity',
        coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
        description: '了解濟州島獨特的海女文化與歷史發展，館內展品非常豐富，是認識濟州文化的必訪景點。',
        location: '海女博物館 (해녀박물관)',
        mapUrl: 'https://map.naver.com/v5/search/해녀박물관',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Jeju+Haenyeo+Museum',
        introUrl: 'https://anise.tw/244342',
        transit: { type: 'drive', time: '10 分鐘', dist: '6.5 公里', desc: '開車前往池畔別墅民宿' }
      },
      {
        time: '16:00',
        title: '🏡 民宿 Check-in & 玩水放鬆',
        tag: 'hotel',
        coverImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
        description: '入住超高規格的溫水泳池別墅，下午在別墅享受水療與泳池時光。別墅配備有密碼鎖、可烹飪、提供星巴克咖啡膠囊、溫水泳池。',
        location: 'Jungane 水療與泳池別墅 (21棟)',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Jungane+Spa+and+Pool+Villa',
        phone: '+82-507-1394-5085',
        details: [
          '地址：濟州市舊左邑海馬支海岸路2486-21號',
          '貼心提示：需自備牙刷刮鬍刀',
          '別墅配備：密碼鎖、可烹飪、提供星巴克咖啡膠囊、溫水泳池、水療中心'
        ]
      }
    ]
  },
  {
    dayNum: 2,
    date: '7/9(四)',
    theme: { h: 190, s: '85%', l: '94%', accent: '#0284c7' },
    summary: '浪漫牛島單車環島之旅',
    flights: [],
    timeline: [
      {
        time: '09:30',
        title: '🚢 搭船前往牛島',
        tag: 'activity',
        description: '開車或步行前往港口搭乘渡輪前往牛島，島上建議租借腳踏車/電動車環島。',
        location: '城山港/牛島渡輪',
        transit: { type: 'ferry', time: '15 分鐘', dist: '3.8 公里', desc: '搭乘渡輪抵達牛島天津港' }
      },
      {
        time: '10:30',
        title: '🚴‍♀️ 牛島環島遊 & 花生冰淇淋',
        tag: 'activity',
        coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        description: '欣賞牛島八景，吹著海風騎車，途中必吃特產花生冰淇淋與漢拏山炒飯。',
        location: '牛島 (우도)',
        mapUrl: 'https://map.naver.com/v5/search/우도',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Udo+Island',
        introUrl: 'https://www.bring-you.info/zh-tw/udo',
        transit: { type: 'drive', time: '20 分鐘', dist: '14 公里', desc: '搭船返回港口後，開車回別墅' }
      },
      {
        time: '15:00',
        title: '🏡 別墅二度玩水 & 烤肉派對',
        tag: 'hotel',
        coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        description: '回到 Jungane 別墅，在溫水泳池徹底放鬆，晚上可利用別墅廚房進行家庭聚餐。',
        location: 'Jungane 水療與泳池別墅'
      }
    ]
  },
  {
    dayNum: 3,
    date: '7/10(五)',
    theme: { h: 225, s: '80%', l: '94%', accent: '#2563eb' },
    summary: '海底世界探索 & 市區血拼',
    flights: [],
    timeline: [
      {
        time: '10:00',
        title: '🐠 Aqua Planet 水上星球樂園',
        tag: 'activity',
        coverImage: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80',
        description: '全亞洲最大水族館之一！欣賞精彩的海底動物餵食秀與大型海洋劇場表演，是必去地標。',
        location: 'Aqua Planet 濟州',
        mapUrl: 'https://map.naver.com/v5/search/Aqua%20Planet%20Jeju',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Aqua+Planet+Jeju',
        introUrl: 'https://yoti.life/jeju-aquaplanet/',
        transit: { type: 'drive', time: '50 分鐘', dist: '42 公里', desc: '開車返回濟州市區' }
      },
      {
        time: '14:00',
        title: '🛍️ 樂天免稅店購物血拼',
        tag: 'shopping',
        coverImage: 'https://images.unsplash.com/photo-1560243563-062bff001d68?auto=format&fit=crop&w=600&q=80',
        description: '前往市區大型免稅店，採購美妝、名牌包及各類韓國特產。',
        location: '樂天免稅店濟州店',
        mapUrl: 'https://map.naver.com/v5/search/Lotte%20Duty%20Free%20Jeju',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Lotte+Duty+Free+Jeju',
        introUrl: 'https://www.bring-you.info/zh-tw/jeju-travel-guide',
        transit: { type: 'drive', time: '15 分鐘', dist: '5 公里', desc: '開車去還車點' }
      },
      {
        time: '18:00',
        title: '🚗 家人還車 & 換乘自駕車',
        tag: 'activity',
        description: '家人行程即將結束，協助進行車輛歸還，並租借自己後續自駕的專屬車輛。',
        location: '租車公司服務處',
        transit: { type: 'walk', time: '5 分鐘', dist: '350 公尺', desc: '步行前往蓮洞商圈飯店' }
      },
      {
        time: '19:30',
        title: '🏨 入住市區飯店',
        tag: 'hotel',
        description: '入住位於市區、交通機能極佳的 Air City 飯店，方便明天自駕與後天去機場。',
        location: '濟州艾爾城市飯店 (Hotel Air City Jeju)',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Air+City+Jeju',
        details: ['位置：濟州市蓮洞，離機場僅 10 分鐘車程', '周邊：鄰近蓮洞步行街，生活機能優越']
      }
    ]
  },
  {
    dayNum: 4,
    date: '7/11(六)',
    theme: { h: 100, s: '70%', l: '94%', accent: '#16a34a' },
    summary: '自駕補考！西部海岸線浪漫兜風',
    flights: [],
    timeline: [
      {
        time: '09:30',
        title: '🏖️ 咸德海灘漫步 (補週二行程)',
        tag: 'activity',
        coverImage: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80',
        description: '自駕前往擁有清澈果凍海與白沙灘的咸德海灘，可前往熱門的 Cafe Delmoondo 喝杯海景咖啡。',
        location: '咸德海水浴場',
        mapUrl: 'https://map.naver.com/v5/search/Hamdeok%20Beach',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Hamdeok+Beach',
        introUrl: 'https://julia116.com/hamdeok-beach/',
        transit: { type: 'drive', time: '30 分鐘', dist: '17 公里', desc: '開車返回市區用餐' }
      },
      {
        time: '12:00',
        title: '🐷 黑豬肉一條街午餐 (補週二行程)',
        tag: 'food',
        coverImage: 'https://images.unsplash.com/photo-1629814234032-4752c4bbf5fb?auto=format&fit=crop&w=600&q=80',
        description: '大啖濟州島最著名的正宗黑豬肉燒烤，外皮焦脆肉質多汁！',
        location: '黑豬肉一條街 (흑돼지거리)',
        mapUrl: 'https://map.naver.com/v5/search/Black%20Pork%20Street',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Black+Pork+Street+Jeju',
        introUrl: 'https://julia116.com/dombedon/',
        transit: { type: 'drive', time: '35 分鐘', dist: '25 公里', desc: '開車前往西部沉浸式藝術館' }
      },
      {
        time: '14:30',
        title: '🎨 ARTE Museum 沉浸式藝術館 (自駕推薦)',
        tag: 'activity',
        coverImage: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=600&q=80',
        description: '開車前往欣賞超大型的數位聲光投影藝術，非常壯觀，是近年社群最熱門的打卡點。',
        location: 'ARTE MUSEUM Jeju',
        mapUrl: 'https://map.naver.com/v5/search/ARTE%20MUSEUM%20Jeju',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=ARTE+MUSEUM+Jeju',
        introUrl: 'https://julia116.com/arte-museum-jeju/',
        transit: { type: 'drive', time: '35 分鐘', dist: '26 公里', desc: '開車前往東門市場' }
      },
      {
        time: '17:30',
        title: '🧺 東門市場逛街 & 買被被 (補週二行程)',
        tag: 'shopping',
        coverImage: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=600&q=80',
        description: '前往東門市場，品嚐豐富的小吃夜市，並去採購網友瘋搶的濟州島特色棉被！',
        location: '濟州東門傳統市場',
        mapUrl: 'https://map.naver.com/v5/search/Dongmun%20Market',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Jeju+Dongmun+Traditional+Market',
        introUrl: 'https://www.bring-you.info/zh-tw/dongmun-market',
        transit: { type: 'drive', time: '15 分鐘', dist: '6.5 公里', desc: '返回連洞市區飯店' }
      },
      {
        time: '20:00',
        title: '🏨 返回飯店放鬆',
        tag: 'hotel',
        description: '將戰利品帶回市區飯店，整理行李準備明天登機。',
        location: '濟州艾爾城市飯店',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Air+City+Jeju'
      }
    ]
  },
  {
    dayNum: 5,
    date: '7/12(日)',
    theme: { h: 35, s: '75%', l: '94%', accent: '#d97706' },
    summary: '完美句點 & 返航台北',
    flights: [
      {
        airline: '臺灣虎航 IT655',
        time: '10:40 - 11:45',
        from: '濟州 (CJU)',
        to: '台北 (TPE)',
        status: '回程直飛'
      }
    ],
    timeline: [
      {
        time: '08:00',
        title: '🚗 還車手續辦理',
        tag: 'activity',
        description: '前往租車公司歸還車輛，檢查無誤後搭乘接駁車前往機場。',
        location: '租車公司辦公室',
        transit: { type: 'drive', time: '10 分鐘', dist: '4 公里', desc: '搭乘租車公司接駁車到機場' }
      },
      {
        time: '08:45',
        title: '🎒 機場報到與出關',
        tag: 'flight',
        description: '抵達濟州機場國際線辦理登機，辦理免稅退稅，最後採購機場伴手禮。',
        location: '濟州國際機場',
        transit: { type: 'flight', time: '2 小時 5 分鐘', dist: '1100 公里', desc: '虎航 IT655 返航' }
      },
      {
        time: '10:40',
        title: '🛫 飛機起飛',
        tag: 'flight',
        description: '搭乘虎航 IT655 返航台北，結束充實快樂的濟州五日遊。',
        location: '濟州國際機場'
      },
      {
        time: '11:45',
        title: '🏡 抵達台灣',
        tag: 'flight',
        description: '順利降落桃園機場，返回溫馨的家。',
        location: '桃園國際機場 T1'
      }
    ]
  }
];

// 👨‍👩‍👧‍👦 家人的行程：6天溫馨原版 (7/6 - 7/11)
export const familyItinerary = [
  {
    dayNum: 1,
    date: '7/6(一)',
    theme: { h: 220, s: '80%', l: '95%', accent: '#1d4ed8' },
    summary: '出發抵達濟州島 & 享用晚餐',
    flights: [
      {
        airline: '德威航空/虎航等',
        time: '15:50 - 18:50',
        from: '高雄 (KHH)',
        to: '濟州 (CJU)',
        status: '去程直飛'
      }
    ],
    timeline: [
      {
        time: '15:50',
        title: '🛫 高雄出發 ＆ 晚餐part1',
        tag: 'flight',
        description: '在高雄機場出發，於登機前在候機室享用簡單晚餐 part 1，隨後登機啟程。',
        location: '高雄小港國際機場'
      },
      {
        time: '18:50',
        title: '🛬 抵達濟州 ＆ 晚餐part2',
        tag: 'flight',
        description: '降落濟州國際機場，出關後前往市區享用溫馨的晚餐 part 2，開啟愉快假期。',
        location: '濟州國際機場',
        transit: { type: 'drive', time: '10 分鐘', dist: '4.5 公里', desc: '搭車前往濟州市區飯店' }
      },
      {
        time: '20:30',
        title: '🏨 入住市區飯店',
        tag: 'hotel',
        coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        description: '入住機能極佳的 Air City 飯店，好好休息，準備明早取車。',
        location: '濟州艾爾城市飯店 (Hotel Air City Jeju)',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Air+City+Jeju'
      }
    ]
  },
  {
    dayNum: 2,
    date: '7/7(二)',
    theme: { h: 100, s: '70%', l: '94%', accent: '#16a34a' },
    summary: '租車出發 & 東部經典海邊漫步',
    flights: [],
    timeline: [
      {
        time: '09:00',
        title: '🚗 租車取車手續',
        tag: 'activity',
        description: '前往租車公司完成相關簽約與檢查手續，領取未來幾天旅程的座車。',
        location: '租車公司服務處',
        transit: { type: 'drive', time: '15 分鐘', dist: '6 公里', desc: '開車前往傳統市場' }
      },
      {
        time: '10:00',
        title: '🧺 東門傳統市場逛街 & 買被被',
        tag: 'shopping',
        coverImage: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=600&q=80',
        description: '逛濟州最出名的東門市場，品嚐章魚燒、黑豬肉捲等豐富美食，並去挑選超舒服的濟州島特產棉被！',
        location: '濟州東門傳統市場',
        mapUrl: 'https://map.naver.com/v5/search/Dongmun%20Market',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Jeju+Dongmun+Traditional+Market',
        introUrl: 'https://www.bring-you.info/zh-tw/dongmun-market',
        transit: { type: 'drive', time: '5 分鐘', dist: '1.2 公里', desc: '開車前往黑豬肉一條街' }
      },
      {
        time: '12:00',
        title: '🐷 正宗黑豬肉一條街大餐',
        tag: 'food',
        coverImage: 'https://images.unsplash.com/photo-1629814234032-4752c4bbf5fb?auto=format&fit=crop&w=600&q=80',
        description: '中午大啖烤黑豬肉！肉質彈牙香脆，搭配清脆生菜與韓式泡菜，幸福感拉滿！',
        location: '黑豬肉一條街 (흑돼지거리)',
        mapUrl: 'https://map.naver.com/v5/search/Black%20Pork%20Street',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Black+Pork+Street+Jeju',
        introUrl: 'https://julia116.com/dombedon/',
        transit: { type: 'drive', time: '30 分鐘', dist: '17 公里', desc: '開車往東北方向海浴場' }
      },
      {
        time: '14:30',
        title: '🏖️ 咸德海水浴場漫步',
        tag: 'activity',
        coverImage: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=600&q=80',
        description: '在被譽為「濟州馬爾地夫」的咸德海灘踏浪，砂質潔白海水碧藍，可在 Delmoondo 享受悠閒午後。',
        location: '咸德海水浴場',
        mapUrl: 'https://map.naver.com/v5/search/Hamdeok%20Beach',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Hamdeok+Beach',
        introUrl: 'https://julia116.com/hamdeok-beach/',
        transit: { type: 'drive', time: '10 分鐘', dist: '5.5 公里', desc: '開車至首日海景別墅別墅' }
      },
      {
        time: '17:00',
        title: '🏡 海景泳池別墅 Check-in',
        tag: 'hotel',
        coverImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
        description: '第一晚入住極具詩意的小朝天海景別墅，白牆紅磚超好拍，下午 4 點即可入住房間。',
        location: '小朝天海景泳池別墅 (朝天邑一流洞路1536號)',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Pool+Villa+Jocheon+Jeju',
        phone: '+82-507-1394-5085',
        details: [
          '地址：濟州市朝天邑一流洞路1536號 (白牆紅磚屋)',
          '入住時間：4點 | 退房時間：11點',
          '貼心提示：需自備牙刷與牙膏',
          '別墅密碼：入住前一天將發送簡訊密碼'
        ]
      }
    ]
  },
  {
    dayNum: 3,
    date: '7/8(三)',
    theme: { h: 24, s: '90%', l: '95%', accent: '#ea580c' },
    summary: '東部網美咖啡 & 貝果盛宴',
    flights: [],
    timeline: [
      {
        time: '09:00',
        title: '🥯 倫敦貝果博物館大餐',
        tag: 'food',
        coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
        description: '在熱門的 London Bagel Museum 品嚐香 Q 貝果，建議使用 Catchtable App 線上登記候位。',
        location: 'London Bagel Museum Jeju',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=London+Bagel+Museum+Jeju',
        introUrl: 'https://mimi-travel.com/london-bagel-museum-jeju/',
        transit: { type: 'drive', time: '15 分鐘', dist: '11 公里', desc: '開車沿著海岸線往東' }
      },
      {
        time: '11:00',
        title: '🐚 海女博物館文化體驗 (與主角會合點！)',
        tag: 'activity',
        coverImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
        description: '在此站與剛降落出關的主角(您)會合！一同參觀海女史料與生活日常展品，體驗傳統文化。',
        location: '海女博物館 (해녀박물관)',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Jeju+Haenyeo+Museum',
        introUrl: 'https://anise.tw/244342',
        transit: { type: 'drive', time: '10 分鐘', dist: '6.5 公里', desc: '前往後面兩天入住的泳池別墅' }
      },
      {
        time: '16:00',
        title: '🏡 別墅 Check-in & 水療泳池放鬆',
        tag: 'hotel',
        coverImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
        description: '入住超讚的 Jungane 溫水泳池別墅！晚上可以利用別墅廚房可烹煮餐食，備有咖啡膠囊。',
        location: 'Jungane 水療與泳池別墅 (21棟)',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Jungane+Spa+and+Pool+Villa',
        phone: '+82-507-1394-5085',
        details: [
          '地址：濟州市舊左邑海馬支海岸路2486-21號',
          '入住時間：4點 | 退房時間：11點',
          '貼心提示：需自備牙刷與刮鬍刀',
          '民宿亮點：密碼鎖、水療池、溫水泳池、星巴克咖啡膠囊'
        ]
      }
    ]
  },
  {
    dayNum: 4,
    date: '7/9(四)',
    theme: { h: 190, s: '85%', l: '94%', accent: '#0284c7' },
    summary: '浪漫牛島單車環島之旅',
    flights: [],
    timeline: [
      {
        time: '09:30',
        title: '🚢 搭船前往牛島',
        tag: 'activity',
        description: '出發前往城山港搭乘渡輪，島上建議租借電動車，吹著海風進行環島。',
        location: '城山港/牛島渡輪',
        transit: { type: 'ferry', time: '15 分鐘', dist: '3.8 公里', desc: '抵達牛島港口' }
      },
      {
        time: '10:30',
        title: '🚴‍♀️ 牛島環島遊 & 花生冰淇淋',
        tag: 'activity',
        coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        description: '騎電動車環島欣賞碧綠海洋，品嚐必吃的特產花生冰淇淋，以及獨特造型的漢拏山炒飯。',
        location: '牛島 (우도)',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Udo+Island',
        introUrl: 'https://www.bring-you.info/zh-tw/udo',
        transit: { type: 'drive', time: '20 分鐘', dist: '14 公里', desc: '搭船回本島後開車回別墅' }
      },
      {
        time: '15:00',
        title: '🏡 別墅二度玩水 & 聚餐派對',
        tag: 'hotel',
        coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        description: '返回 Jungane 別墅享受溫水泳池，下午大家一起在民宿戲水，享受難得的家庭放鬆時刻。',
        location: 'Jungane 水療與泳池別墅'
      }
    ]
  },
  {
    dayNum: 5,
    date: '7/10(五)',
    theme: { h: 225, s: '80%', l: '94%', accent: '#2563eb' },
    summary: '水族館探索 & 市區免稅店購物',
    flights: [],
    timeline: [
      {
        time: '10:00',
        title: '🐠 Aqua Planet 水上星球樂園',
        tag: 'activity',
        coverImage: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80',
        description: '全亞洲最大水族館之一！欣賞巨大的海底觀景窗與精彩的大型雜技及海豚表演。',
        location: 'Aqua Planet 濟州',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Aqua+Planet+Jeju',
        introUrl: 'https://yoti.life/jeju-aquaplanet/',
        transit: { type: 'drive', time: '50 分鐘', dist: '42 公里', desc: '開車返回濟州市區' }
      },
      {
        time: '14:00',
        title: '🛍️ 樂天免稅店購物血拼',
        tag: 'shopping',
        coverImage: 'https://images.unsplash.com/photo-1560243563-062bff001d68?auto=format&fit=crop&w=600&q=80',
        description: '前往市區超好買的樂天免稅店進行美妝、伴手禮採購。',
        location: '樂天免稅店濟州店',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Lotte+Duty+Free+Jeju',
        introUrl: 'https://www.bring-you.info/zh-tw/jeju-travel-guide',
        transit: { type: 'drive', time: '15 分鐘', dist: '5 公里', desc: '開車還車，隨後入住飯店' }
      },
      {
        time: '18:00',
        title: '🚗 還車手續辦理',
        tag: 'activity',
        description: '完成幾天下來的自駕車輛歸還檢查手續（主角此時會租用自己後續的車子）。',
        location: '租車公司服務處',
        transit: { type: 'walk', time: '5 分鐘', dist: '350 公尺', desc: '步行至市區飯店' }
      },
      {
        time: '19:30',
        title: '🏨 入住市區飯店',
        tag: 'hotel',
        description: '今晚同樣入住機能極佳的 Air City 飯店，周圍蓮洞步行街買消夜、逛化妝品超方便。',
        location: '濟州艾爾城市飯店 (Hotel Air City Jeju)',
        googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Air+City+Jeju',
        details: ['位置：濟州市蓮洞，離機場僅 10 分鐘車程', '周邊：蓮洞步行街、炸雞店、超商雲集']
      }
    ]
  },
  {
    dayNum: 6,
    date: '7/11(六)',
    theme: { h: 35, s: '75%', l: '94%', accent: '#d97706' },
    summary: '完美旅程句點 & 搭機返航',
    flights: [
      {
        airline: '德威航空/虎航等',
        time: '10:50 - 12:15',
        from: '濟州 (CJU)',
        to: '高雄 (KHH)',
        status: '回程直飛'
      }
    ],
    timeline: [
      {
        time: '08:30',
        title: '🎒 抵達濟州機場報到',
        tag: 'flight',
        description: '搭乘計程車抵達機場辦理行李託運、退稅以及最後免稅商店採購。',
        location: '濟州國際機場',
        transit: { type: 'flight', time: '2 小時 25 分鐘', dist: '1100 公里', desc: '飛機起飛返台' }
      },
      {
        time: '10:50',
        title: '🛫 飛機起飛',
        tag: 'flight',
        description: '搭乘返航客機告別美麗的濟州島。',
        location: '濟州國際機場'
      },
      {
        time: '12:15',
        title: '🏡 抵達高雄',
        tag: 'flight',
        description: '順利抵達小港機場，回到溫馨的家，結束難忘的家族濟州之旅。',
        location: '高雄小港國際機場'
      }
    ]
  }
];
