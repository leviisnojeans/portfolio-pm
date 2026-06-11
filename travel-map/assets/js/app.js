const {
  useState,
  useMemo,
  useEffect
} = React;
const G = {
  green: "#3DBE7A",
  amber: "#F0A030",
  red: "#E05A4E"
};
const MONTH_IMG = {
  1: "assets/img/month-1-lg.webp",
  2: "assets/img/month-2-lg.webp",
  3: "assets/img/month-3-lg.webp",
  4: "assets/img/month-4-lg.webp",
  5: "assets/img/month-5-lg.webp",
  6: "assets/img/month-6-lg.webp",
  7: "assets/img/month-7-lg.webp",
  8: "assets/img/month-8-lg.webp",
  9: "assets/img/month-9-lg.webp",
  10: "assets/img/month-10-lg.webp",
  11: "assets/img/month-11-lg.webp",
  12: "assets/img/month-12-lg.webp"
};

/* ═══ Destination Images (全覆盖) ═══ */
const _u = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=80`;
const DEST_IMG = {};

/* === Destination x Month Images: 按季节理由匹配, Wikimedia Commons 1280px === */
const DEST_MONTH_IMG = {
  "日本京都::3": "001-cherry-blossom-at-the-rock-garden-of-ryoan-ji-te",
  "日本京都::11": "002-kiyomizu-dera-kyoto-november-2016-01",
  "冰岛::2": "003-gigjokull-iceland-unsplash",
  "冰岛::7": "004-landmannalaugar-in-summer-2009-13",
  "挪威峡湾::6": "005-geirangerfjord-from-rnesvingen-2013-june",
  "挪威峡湾::7": "006-20160604t095017-norwegen-ms1",
  "意大利阿马尔菲::5": "007-amalfi-limoni-e-peperoncini-lemons-and-red-dried",
  "意大利阿马尔菲::7": "008-atrani-costiera-amalfitana-23-8-2011",
  "摩洛哥马拉喀什::1": "009-merzouga-sahara",
  "摩洛哥马拉喀什::11": "010-jemaa-el-fnaa-at-night",
  "泰国清迈::1": "011-chiang-mai-temple-thailand",
  "泰国清迈::12": "012-doi-suthep-temple-chiang-mai-thailand",
  "卡帕多奇亚::4": "013-cappadocia-aerial-view-landscape",
  "卡帕多奇亚::10": "014-autumn-in-goreme-valley",
  "越南会安::2": "015-lantern-shop-in-hoi-an-2",
  "越南会安::11": "016-hoi-an-ancient-town-2020-01-cn-06",
  "法国普罗旺斯::5": "017-provence-gordes-pro-02-45-0957",
  "法国普罗旺斯::7": "018-sunflowers-and-lavander-outside-aix-en-provence",
  "希腊圣托里尼::6": "019-santorini-80",
  "希腊圣托里尼::9": "020-1000-three-domes-of-oia-in-santorini-photo-by-gi",
  "西班牙塞维利亚::10": "021-plaza-virgen-de-los-reyes-seville-spain-sep-2009",
  "葡萄牙里斯本::4": "022-lisbon-nh-town-hall",
  "葡萄牙里斯本::9": "023-lisbon-nh-town-hall",
  "老挝琅勃拉邦::11": "024-luang-prabang-monks-alm-dawn-02",
  "老挝琅勃拉邦::12": "025-pirogue-and-boat-on-the-mekong-with-colorful-sky",
  "摩洛哥菲斯::5": "026-vue-medina-fes",
  "摩洛哥菲斯::10": "027-leather-tanning-fes",
  "日本东京::3": "028-cherry-blossom-in-nakameguro-20230330-1",
  "越南河内::7": "029-hanoi-vietnam-thang-long-water-puppet-theatre-01",
  "越南河内::9": "030-hanoi-vietnam-thang-long-water-puppet-theatre-01",
  "印度果阿::1": "031-mandrem-beach-and-mandrem-river-mandrem-goa-indi",
  "印度果阿::12": "032-mandrem-beach-and-mandrem-river-mandrem-goa-indi",
  "阿联酋迪拜::1": "033-a-car-on-dubai-dune-bashing",
  "阿联酋迪拜::12": "034-new-year-fireworks-display-in-dubai-uae-23799085",
  "日本北海道::1": "035-3",
  "新西兰南岛::1": "036-queenstown-snow-peaks-unsplash",
  "菲律宾长滩岛::1": "037-sunset-punta-bunga-beach-boracay-flickr-ray-in-m",
  "智利圣地亚哥::1": "038-santiago-de-chile-20252037299",
  "斯里兰卡::1": "039-sri-lanka-blue-whale-16566108879",
  "坦桑尼亚桑给巴尔::1": "040-white-sandy-beach-at-nungwi-zanzibar",
  "缅甸蒲甘::1": "041-bagan-myanmar-htilominlo-temple-and-other-buddhi",
  "澳大利亚塔斯马尼亚::1": "042-parque-nacional-cradle-mountain-tasmania-austral",
  "越南胡志明市::1": "043-ho-chi-minh-city-skyline",
  "威尼斯::2": "044-venice-carnival-masked-lovers-2010",
  "埃及卢克索::2": "045-thebes-luxor-egypt-valley-of-the-kings-from-abov",
  "阿根廷巴塔哥尼亚::2": "046-perito-moreno-glacier-patagonia-argentina-luca-g",
  "巴西里约热内卢::2": "047-carnival-in-rio-de-janeiro",
  "印尼巴厘岛::2": "048-muncan-bali-indonesia-rice-paddy-along-jalan-ray",
  "韩国首尔::2": "049-hyangwonjeong-winter-2013",
  "韩国首尔::10": "050-bukchon-ro-11-gil-street-with-hanok-houses-at-bl",
  "厄瓜多尔加拉帕戈斯::2": "051-bartolome-island-galapagos-50122421803",
  "日本札幌::2": "052-us-navy-060209-n-7526r-205-illuminated-trees-and",
  "马来西亚槟城::2": "053-malaysia-penang-breakfast-in-the-street-1and-451",
  "荷兰阿姆斯特丹::3": "054-tulip-field-near-keukenhof",
  "约旦佩特拉::3": "055-al-khazneh-the-treasury-2-petra-jordan",
  "古巴哈瓦那::3": "056-chevrolet-classic-car-in-havana-harbor-april-200",
  "哥斯达黎加::3": "057-arenal-volcano-70785p",
  "印度斋浦尔::3": "058-jaipur-03-2016-02-amber-fort",
  "阿根廷伊瓜苏::3": "059-00-1838-iguazu-falls-from-the-brazilian-side",
  "西班牙巴塞罗那::3": "060-barcelona-la-sagrada-familia-view-north-passion",
  "中国西藏拉萨::3": "061-potala",
  "葡萄牙波尔图::3": "062-view-of-ribeira-from-cais-de-gaia-20250605-1628",
  "瑞士少女峰::4": "063-eiger-monch-jungfrau-01",
  "瑞士少女峰::8": "064-wengen-and-jungfrau-in-summer",
  "日本金泽::4": "065-asanogawa-bridge-and-cherry-blossoms-kanazawa-ap",
  "希腊米科诺斯::4": "066-mykonos-20a",
  "希腊米科诺斯::7": "067-little-venice-chora-mykonos-greece-53506747223",
  "秘鲁圣谷::4": "068-rainbow-mountain-peru",
  "突尼斯撒哈拉::4": "069-erg-chebbi-sunset",
  "新西兰皇后镇::4": "070-queenstown-nz-08",
  "新西兰皇后镇::12": "071-arrow-junction-crown-ranges-queenstown-district",
  "泰国清莱::4": "072-chiang-rai-wat-rong-khun-2026-img-11",
  "美国华盛顿::4": "073-tidal-basin-blossoms-by-matthew-bisanz",
  "中国徽州::4": "074-terraces-at-jiangling-panoramio",
  "韩国济州岛::4": "075-hydrangea-macrophylla-in-front-of-seongsan-ilchu",
  "南非开普敦::5": "076-cape-town-city-bowl-and-table-mountain-at-dawn",
  "秘鲁马丘比丘::5": "077-machu-picchu-peru-2015-07-30-dd-47",
  "克罗地亚杜布罗夫尼克::5": "078-dubrovnik-2016-05-26-dsc06252-view-from-the-wall",
  "美国犹他::5": "079-double-o-arch-arches-national-park-2",
  "格鲁吉亚第比利斯::5": "080-20110421-tbilisi-georgia-panoramic",
  "越南沙巴::5": "081-terraced-fields-sa-pa-6",
  "摩洛哥舍夫沙万::5": "082-2018-01-blue-chaouen",
  "印度喀拉拉::5": "083-nedumudy-houseboat",
  "中国香格里拉::5": "084-songzanlin-monastery-shangri-la-china-panoramio",
  "加拿大落基山::6": "085-banff-national-park-ab-canada-lake-louise-2022-2",
  "希腊科孚岛::6": "086-the-old-fortress-and-the-old-town-of-corfu-septe",
  "英国伦敦::6": "087-royal-ascot-carriage-procession-geograph-org-uk",
  "日本冲绳::6": "088-kerama-island-6081229008",
  "斯洛文尼亚布莱德::6": "089-bled-island-in-lake-bled-slovenia-20240504-0901",
  "挪威罗弗敦群岛::6": "090-reine-i-lofoten-lc0148",
  "美国黄石::6": "091-yellowstone-national-park-wy-usa-upper-geyser-ba",
  "美国黄石::9": "092-yellowstone-national-park-wy-usa-grand-prismatic",
  "蒙古国乌兰巴托::6": "093-2024-10-18-ulaanbaatar-1",
  "土耳其费特希耶::6": "094-paragliding-over-oludeniz-beach-2014-10-panorami",
  "塞伦盖蒂::7": "095-serengeti-wildebeest-migration-jf",
  "克罗地亚十六湖::7": "096-waterfalls-at-plitvice-lakes",
  "印尼龙目岛::7": "097-people-on-the-beach-gili-trawangan-island-indone",
  "西班牙潘普洛纳::7": "098-running-of-the-bulls-on-estafeta-street",
  "曼谷::7": "099-4y1a1378-night-market-in-bangkok-33527832161",
  "加拿大爱德华王子岛::7": "100-beach-point-coast-prince-edward-island-471031-94",
  "阿尔巴尼亚里维埃拉::7": "101-ksamil-albania-beach",
  "玻利维亚乌尤尼盐沼::8": "102-reflection-on-the-salar-de-uyuni-bolivia",
  "芬兰拉普兰::8": "103-midnight-sun-and-jatkankynttila-bridge-2020",
  "马赛马拉::8": "104-zebras-and-wildebeest-maasai-mara",
  "苏格兰高地::8": "105-gairnshiel-bridge-scottish-highlands-39775291381",
  "中国西藏::8": "106-bos-grunniens-at-yundrok-yumtso-lake",
  "爱沙尼亚塔林::8": "107-tallinna-vanalinn-paikesetousu-ajal",
  "印尼科莫多::8": "108-pink-beach-padar-island-komodo-national-park-ind",
  "美国阿拉斯加::8": "109-brown-bear-in-glacier-bay-38f9d856-1dd8-b71c-070",
  "格鲁吉亚卡兹别克::8": "110-gergeti-trinity-church-and-kuru-mountain-range-a",
  "加拿大育空::8": "111-granger-homes-at-midnight-15844953383",
  "慕尼黑::9": "112-munchen-hacker-festzelt-eingang-gesperrt",
  "中国新疆::9": "113-lakekanas",
  "加拿大魁北克::9": "114-autumnal-retreat-in-old-quebec-a-canvas-of-fadin",
  "意大利托斯卡纳::9": "115-chianti-vineyard-with-harvest-activity",
  "尼泊尔安纳普尔纳::9": "116-snowy-annapurna-range-panorama",
  "巴西潘塔纳尔::9": "117-pantanal-mato-grosso-brasil",
  "埃塞俄比亚达纳基勒::9": "118-danakil-depression-fordors",
  "克罗地亚伊斯特拉::9": "119-rovinj-valdibora-crkva-svete-eufemije-1663",
  "伊斯坦布尔::10": "120-hagia-sophia-mars-2013",
  "墨西哥瓦哈卡::10": "121-church-with-agave-oaxaca-mx",
  "尼泊尔::10": "122-mountains-in-snow-mountain-lake-chola-valley-nep",
  "印度拉贾斯坦::10": "123-jaipur-03-2016-39-jal-mahal-water-palace",
  "阿曼马斯喀特::10": "124-old-muscat-city-view-muscat-oman3",
  "美国新英格兰::10": "125-newengland-fall",
  "澳大利亚乌鲁鲁::10": "126-petermann-ranges-au-uluru-kata-tjuta-national-pa",
  "德国巴伐利亚::10": "127-neuschwanstein-castle-54523277201",
  "日本北海道大雪山::10": "128-2014-panoramio",
  "泰国苏梅岛::11": "129-pier-in-bophut-village-in-ko-samui",
  "纳米比亚::11": "130-006-dune-45-in-sossusvlei-at-sunrise-photo-by-gi",
  "智利百内::11": "131-cuernos-del-paine-in-torres-del-paine-national-p",
  "葡萄牙阿尔加维::11": "132-faro-31502884497",
  "约旦死海::11": "133-dead-sea-from-jordan",
  "缅甸曼德勒::11": "134-u-bein-sunset-mandalay-myanmar",
  "埃及开罗::11": "135-all-gizah-pyramids",
  "中国云南元阳::11": "136-2007-12-02-yuanyang-rice-terraces-sunset",
  "法国斯特拉斯堡::12": "137-strasbourg-christkindelsmarik-30-nov-2014",
  "芬兰罗瓦涅米::12": "138-aurora-borealis-over-saana-fell",
  "澳大利亚悉尼::12": "139-sydney-habour-bridge-opera-house-fireworks-new-y",
  "肯尼亚马赛马拉::12": "140-male-leopard-mara",
  "菲律宾巴拉望::12": "141-el-nido-bay-desert-tropical-island-coastline-pal",
  "奥地利维也纳::12": "142-001-christmas-market-wien-weihnachtsmarkt-christ",
  "德国纽伦堡::12": "143-christkindlesmarkt-nurnberg-fleischbrucke",
  "智利瓦尔帕莱索::12": "144-templeman-y-almirante-montt-valparaiso",
  "西班牙塞维利亚::4": "145-plaza-de-espana-sevilla-01",
  "日本东京::7": "146-sumidagawa-fireworks-festival-2023-53327943697",
  "印度瓦拉纳西::11": "147-varanasi-munshi-ghat3"
};

/* ═══ Month Subtitles ═══ */
const MONTH_SUB = {
  1: "在冰雪与温泉之间，找到冬天的宁静",
  2: "极光、狂欢节，与世界最古老的庆典",
  3: "整个地球在苏醒，而你准备出发",
  4: "春天最好的时光，给最值得的旅程",
  5: "人群散去，世界在等你独自发现",
  6: "极昼开始，今夏最长的一天从这里出发",
  7: "地球最热烈的时刻，去一个让你终生难忘的地方",
  8: "盛夏的尾声，在结束之前再燃一次",
  9: "蓝天与初秋，旅行者的黄金窗口",
  10: "金色的世界，人潮已散，美景全留给你",
  11: "安静的季节，属于深度旅行者的礼物",
  12: "在年末的光芒里，与这一年好好告别"
};

/* ═══ Type Gradients ═══ */
const TG = {
  nature: "linear-gradient(160deg,#0a2518 0%,#1a5c3a 100%)",
  beach: "linear-gradient(160deg,#071a36 0%,#0d4a78 100%)",
  culture: "linear-gradient(160deg,#1a0e08 0%,#5c2e14 100%)",
  wildlife: "linear-gradient(160deg,#141a06 0%,#3c5010 100%)",
  festival: "linear-gradient(160deg,#180a1e 0%,#5c1a78 100%)",
  food: "linear-gradient(160deg,#1a0805 0%,#7a2810 100%)"
};

/* ═══ Static data ═══ */
const TYPES = {
  nature: {
    id: "nature",
    label: "自然徒步",
    emoji: "🏔"
  },
  beach: {
    id: "beach",
    label: "海滩度假",
    emoji: "🏖"
  },
  culture: {
    id: "culture",
    label: "城市文化",
    emoji: "🏛"
  },
  wildlife: {
    id: "wildlife",
    label: "野生动物",
    emoji: "🦁"
  },
  festival: {
    id: "festival",
    label: "节庆活动",
    emoji: "🎭"
  },
  food: {
    id: "food",
    label: "美食体验",
    emoji: "🍜"
  }
};
const TYPE_ORDER = ["nature", "beach", "culture", "wildlife", "festival", "food"];
const BUDGETS = {
  "$": {
    label: "经济",
    color: G.green
  },
  "$$": {
    label: "中档",
    color: G.amber
  },
  "$$$": {
    label: "高端",
    color: G.red
  }
};
const CROWD = {
  "极低": {
    label: "极少人",
    color: "#3DBE7A"
  },
  "低": {
    label: "人少",
    color: "#56D68A"
  },
  "中": {
    label: "适中",
    color: "#F0A030"
  },
  "高": {
    label: "较多",
    color: "#E08040"
  },
  "极高": {
    label: "爆满",
    color: "#E05A4E"
  }
};
const getCrowd = c => CROWD[c] || CROWD["中"];
const MONTHS = [{
  id: 1,
  name: "一月",
  en: "Jan",
  emoji: "❄️",
  tag: "冬季"
}, {
  id: 2,
  name: "二月",
  en: "Feb",
  emoji: "🌸",
  tag: "冬末"
}, {
  id: 3,
  name: "三月",
  en: "Mar",
  emoji: "🌺",
  tag: "早春"
}, {
  id: 4,
  name: "四月",
  en: "Apr",
  emoji: "🌼",
  tag: "春季"
}, {
  id: 5,
  name: "五月",
  en: "May",
  emoji: "🌿",
  tag: "春末"
}, {
  id: 6,
  name: "六月",
  en: "Jun",
  emoji: "☀️",
  tag: "初夏"
}, {
  id: 7,
  name: "七月",
  en: "Jul",
  emoji: "🏖",
  tag: "盛夏"
}, {
  id: 8,
  name: "八月",
  en: "Aug",
  emoji: "🌊",
  tag: "盛夏"
}, {
  id: 9,
  name: "九月",
  en: "Sep",
  emoji: "🍂",
  tag: "初秋"
}, {
  id: 10,
  name: "十月",
  en: "Oct",
  emoji: "🍁",
  tag: "金秋"
}, {
  id: 11,
  name: "十一月",
  en: "Nov",
  emoji: "🌙",
  tag: "深秋"
}, {
  id: 12,
  name: "十二月",
  en: "Dec",
  emoji: "🎄",
  tag: "冬季"
}];

/* ════════════════ DESTINATIONS DATA ════════════════ */
function _x(name, desc) {
  return {
    name,
    desc
  };
}
const DESTINATIONS = [
// ════════════════ 多月份目的地 ════════════════
{
  place: "日本京都",
  region: "东亚",
  budget: "$$",
  months: [{
    month: 3,
    highlight: "千年古寺中的樱花祭典",
    weather: "12°C",
    crowd: "极高",
    types: ["culture", "festival"],
    why: "3 月底到 4 月初，京都从清水寺到哲学之道的染井吉野花期仅约 10 天。同样的庭院与寺庙在这十天里彻底变样，是京都最具仪式感的窗口，错过要等一整年。",
    experiences: [_x("哲学之道", "沿小溪的樱花隧道，京都最浪漫的步行路"), _x("清水寺夜樱", "夜间点灯的木造露台俯瞰整片樱花海"), _x("祇园艺伎街", "傍晚穿和服漫步，可能偶遇真正的艺伎"), _x("伏见稻荷千鸟居", "清晨人少时穿越朱红色鸟居山道")],
    budgetDetail: {
      daily: [400, 800, 1500],
      flight: "¥2500–4500",
      note: "樱花季住宿提前 4 个月起订，京都站附近性价比最高"
    }
  }, {
    month: 11,
    highlight: "红叶满山媲美樱花季",
    weather: "15°C",
    crowd: "高",
    types: ["culture", "nature"],
    why: "11 月下旬是京都枫红高峰——同样的庭院寺庙换上全然不同的色调。游客比樱花季少 30%，气温更舒适，是被严重低估的京都黄金季。",
    experiences: [_x("东福寺通天桥", "被誉为京都最壮观的红叶谷俯瞰点"), _x("永观堂禅林寺", "日本最古老的红叶名所，夜间点灯极美"), _x("岚山小火车", "沿保津川峡谷穿越红叶山林"), _x("金阁寺", "金色舍利殿与红叶倒映同框")],
    budgetDetail: {
      daily: [400, 800, 1500],
      flight: "¥2500–4500",
      note: "11 月中下旬是高峰，可选 11 月初前后避开人流"
    }
  }]
}, {
  place: "冰岛",
  region: "欧洲",
  budget: "$$$",
  months: [{
    month: 2,
    highlight: "北极光最强概率与蓝冰洞",
    weather: "-2°C",
    crowd: "中",
    types: ["nature"],
    why: "2 月夜长气温仍低，是极光强度与晴夜概率综合最佳的月份。瓦特纳冰川下的蓝冰洞每年只在 11 月–3 月开放，是地球少数能进入的天然蓝冰大教堂。",
    experiences: [_x("蓝冰洞探险", "瓦特纳冰川下随冬季塑形的蓝色洞穴"), _x("极光追逐", "远离雷克雅未克的暗夜中等待天空起舞"), _x("黄金圈", "间歇泉、辛格维利尔与黄金瀑布"), _x("蓝湖温泉", "在零下气温里浸泡乳蓝色地热温泉")],
    budgetDetail: {
      daily: [600, 1100, 2000],
      flight: "¥4500–7000",
      note: "冬季强烈建议跟当地一日游小团，独立自驾在冰雪路面风险较高"
    }
  }, {
    month: 7,
    highlight: "极昼下的冰川徒步与高地",
    weather: "12°C",
    crowd: "中",
    types: ["nature"],
    why: "7 月冰岛进入极昼，午夜阳光让每天可玩 20 小时以上。内陆高地公路（F-road）全线开放，兰德曼纳劳卡的彩色流纹岩山脉一年仅此 3 个月可抵达，是徒步者的终极乐园。",
    experiences: [_x("兰德曼纳劳卡徒步", "世界最美徒步路线之一，彩色山脉与温泉河谷"), _x("杰古沙龙冰河湖", "乘船在漂浮冰山中穿梭，海豹出没"), _x("斯卡夫塔山冰川徒步", "《权力的游戏》北境取景地的蓝冰之旅"), _x("西峡湾拉特拉尔角", "欧洲最西端观鸟悬崖，百万海鹦筑巢")],
    budgetDetail: {
      daily: [600, 1100, 2000],
      flight: "¥4500–7000",
      note: "7 月住宿建议提前 3 个月预订；租车务必选四驱 SUV 并购买全险"
    }
  }]
}, {
  place: "挪威峡湾",
  region: "北欧",
  budget: "$$$",
  months: [{
    month: 6,
    highlight: "极昼开启的峡湾季",
    weather: "15°C",
    crowd: "低",
    types: ["nature"],
    why: "6 月极昼刚开始，日照长达 19 小时，但国际游客还没涌入。雪线刚好融退让出高山徒步路线，而山顶仍有残雪点缀峡湾，是一年中峡湾摄影最出片的月份，且酒店价格比 7-8 月低 20%。",
    experiences: [_x("布道石徒步", "吕瑟峡湾上方 604 米的悬空岩台"), _x("弗洛姆铁路", "全球最美铁路，穿越瀑布与峡谷"), _x("艾于兰峡湾观景台", "建筑师设计的悬空木质观景台"), _x("卑尔根布吕根码头", "彩色木屋与世界遗产汉萨同盟历史")],
    budgetDetail: {
      daily: [700, 1100, 1800],
      flight: "¥5000–8000",
      note: "6 月初夏雪未全化，部分高山步道可能仍关闭；超市购物自炊可大幅降成本"
    }
  }, {
    month: 7,
    highlight: "极昼里航行壮丽峡湾",
    weather: "20°C",
    crowd: "中",
    types: ["nature"],
    why: "七月是挪威极昼最长的月份——午夜阳光下的峡湾航行，一年仅此机会。雪线刚好融退，徒步路线全开，但夏季旅游高峰还未到顶峰。",
    experiences: [_x("盖朗厄尔峡湾游船", "七姐妹瀑布与世界遗产蓝绿水道"), _x("松恩峡湾", "挪威最长最深，搭船穿越壮丽景观"), _x("弗洛姆铁路", "全球最美铁路线，穿越峡湾山谷"), _x("布道石徒步", "悬崖顶观景台，俯瞰吕瑟峡湾全景")],
    budgetDetail: {
      daily: [800, 1200, 2000],
      flight: "¥5000–8000（提前 3 个月）",
      note: "挪威物价极高，超市自炊可显著降低成本"
    }
  }]
}, {
  place: "意大利阿马尔菲",
  region: "欧洲",
  budget: "$$$",
  months: [{
    month: 5,
    highlight: "初夏柠檬海岸最佳季",
    weather: "23°C",
    crowd: "中",
    types: ["beach", "food"],
    why: "5 月阿马尔菲柠檬花盛开、气温温和，海水已经可以游泳但游客仅为 7 月的一半。众神之路徒步不会被酷暑灼烤，波西塔诺的沙滩包场感是夏季无法想象的奢侈。",
    experiences: [_x("众神之路徒步", "悬崖之上的地中海全景徒步路线"), _x("波西塔诺海滩", "彩色房屋叠落的明信片小镇"), _x("拉韦洛辛布罗内别墅", "高于海面 350 米的无边花园"), _x("柠檬园晚餐", "在私家柠檬园中品尝柠檬意面与柠檬酒")],
    budgetDetail: {
      daily: [700, 1100, 1800],
      flight: "¥5000–7000（飞那不勒斯）",
      note: "5 月性价比极高，建议住普莱亚诺避开阿马尔菲主镇溢价"
    }
  }, {
    month: 7,
    highlight: "地中海悬崖海岸度假",
    weather: "28°C",
    crowd: "高",
    types: ["beach", "food"],
    why: "7 月是阿马尔菲最热烈的月份——白天在翡翠色海水中游泳，傍晚在悬崖餐厅吃海鲜看日落。虽然人多，但正是这种人声鼎沸造就了意大利夏日的核心体验：阳光、海水、美食、音乐齐奏。",
    experiences: [_x("卡普里岛一日游", "蓝洞探秘与法拉利奥尼岩石"), _x("阿马尔菲大教堂", "阿拉伯-诺曼风格的千年主教堂"), _x("翡翠洞游泳", "天然海蚀洞内的绿宝石水域"), _x("米诺里海鲜", "渔村深夜捕捞当天上桌的烤鱼")],
    budgetDetail: {
      daily: [800, 1300, 2000],
      flight: "¥5000–7000",
      note: "7 月住宿翻倍且需提前 4 个月预订，建议住萨勒诺坐轮渡前往"
    }
  }]
}, {
  place: "摩洛哥马拉喀什",
  region: "非洲",
  budget: "$$",
  months: [{
    month: 1,
    highlight: "凉季撒哈拉沙漠营地",
    weather: "18°C",
    crowd: "低",
    types: ["culture", "nature"],
    why: "1 月是马拉喀什最舒适的月份——白天 20°C 不晒，夜晚沙漠仍有星河。撒哈拉沙漠营地这个时候避开了夏季酷热，骑骆驼看日出毫无煎熬。",
    experiences: [_x("杰马夫纳广场", "夜市极具烟火气的千年集市与表演"), _x("撒哈拉沙漠营地", "梅尔祖卡红沙丘骑骆驼看日出星空"), _x("马若雷勒花园", "圣罗兰钟爱的乳蓝色花园与小博物馆"), _x("麦地那迷宫", "在老城蜿蜒小巷中寻找皮革染坊与香料")],
    budgetDetail: {
      daily: [400, 800, 1500],
      flight: "¥6000–8000",
      note: "广场摄影需付小费，谨防主动'帮带路'的人"
    }
  }, {
    month: 11,
    highlight: "凉爽舒适的麦地那时节",
    weather: "20°C",
    crowd: "低",
    types: ["culture"],
    why: "11 月沙漠暑气退尽，麦地那集市逛一天也不流汗。橙子与椰枣正当时令，傍晚在屋顶喝薄荷茶看阿特拉斯山落日，是北非最惬意也最被低估的旅行月份。",
    experiences: [_x("本优素福神学院", "马赛克铺满墙壁的伊斯兰建筑杰作"), _x("巴希亚宫", "19 世纪大臣宫殿，瓷砖与庭院极致精美"), _x("阿特拉斯山一日游", "雪顶山脉与柏柏尔村落徒步"), _x("传统摩洛哥烹饪课", "学做塔吉锅与蒸粗麦粉")],
    budgetDetail: {
      daily: [400, 800, 1500],
      flight: "¥6000–8000",
      note: "11 月是摩洛哥旺季，提前 2 个月订 Riad 庭院民宿性价比最佳"
    }
  }]
}, {
  place: "泰国清迈",
  region: "东南亚",
  budget: "$",
  months: [{
    month: 1,
    highlight: "花节与古寺巡游",
    weather: "25°C",
    crowd: "中",
    types: ["culture", "food"],
    why: "1 月清迈正值凉季，气温 25°C 左右不闷不热。清迈花节全城花车游行，古城护城河旁兰花与菊花铺满——是体验泰北文化最舒适的时间，也是骑行古城的最佳月份。",
    experiences: [_x("素贴山双龙寺", "金碧辉煌的山顶佛寺俯瞰全城"), _x("清迈古城骑行", "护城河围绕的四方古城骑行探寺"), _x("清迈夜市", "手工艺品、街头按摩与泰北小吃"), _x("大象自然公园", "负责任的大象庇护所与丛林漫步")],
    budgetDetail: {
      daily: [200, 400, 800],
      flight: "¥1500–2500",
      note: "1 月是泰北旺季但清迈比南部便宜，古城内民宿 150-300 元就能住很好"
    }
  }, {
    month: 12,
    highlight: "凉季最舒适月份",
    weather: "22°C",
    crowd: "中",
    types: ["culture", "food"],
    why: "12 月清迈早晚微凉，是全年最舒服的月。圣诞与新年前夕古城寺庙有跨年祈福仪式，周日夜市是泰国最大手工艺集市，适合用超高性价比收尾一年。",
    experiences: [_x("周日夜市", "整条拉查丹能路变身手工艺品长街"), _x("泰式烹饪学校", "半天学会冬阴功、绿咖喱、芒果糯米饭"), _x("因他暖山日出", "泰国最高峰上的云海与零度清晨"), _x("宁曼路咖啡馆", "泰北创意街区的精品咖啡与设计小店")],
    budgetDetail: {
      daily: [200, 400, 800],
      flight: "¥1500–2500",
      note: "跨年期间住宿略涨但仍很便宜，提前 1 个月订即可"
    }
  }]
}, {
  place: "卡帕多奇亚",
  region: "中东",
  budget: "$$",
  months: [{
    month: 4,
    highlight: "热气球最佳季 + 樱桃花",
    weather: "18°C",
    crowd: "中",
    types: ["nature"],
    why: "4 月气流稳定、能见度高，是热气球升空率最高的月份；同时樱桃花盛开，红土奇岩中点缀粉白花海，是卡帕一年最美也最适合摄影的窗口。",
    experiences: [_x("热气球升空", "日出时数百只热气球同时升起的奇景"), _x("格雷梅露天博物馆", "岩窟教堂群与拜占庭壁画"), _x("洞穴酒店", "住进真正的火山岩洞穴里"), _x("红谷玫瑰谷徒步", "日落时分在彩色岩谷中漫步")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥4500–6500",
      note: "热气球受天气影响大，建议预留 2-3 天以防取消"
    }
  }, {
    month: 10,
    highlight: "秋色岩谷与稳定气流",
    weather: "18°C",
    crowd: "中",
    types: ["nature"],
    why: "10 月与 4 月气温接近，但变红的葡萄藤与白杨让岩谷呈现全然不同的秋色。热气球升空率同样高达 85% 以上，且 10 月游客比 4 月少约 40%，体验更松弛。",
    experiences: [_x("玫瑰谷日落骑马", "穿越秋季金色的火山岩地貌"), _x("地下城探秘", "德林库尤地下城深达八层的古代避难所"), _x("帕夏贝仙人烟囱", "最奇特的蘑菇形火山岩柱群"), _x("土耳其陶罐烤肉", "在洞穴餐厅品尝卡帕特色陶罐炖羊肉")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥4500–6500",
      note: "10 月同样是绝佳热气球季但竞争更小，行程灵活度高"
    }
  }]
}, {
  place: "越南会安",
  region: "东南亚",
  budget: "$",
  months: [{
    month: 2,
    highlight: "灯笼节古城最美季",
    weather: "22°C",
    crowd: "低",
    types: ["culture", "food"],
    why: "2 月会安干季凉爽，古城灯笼节正值旧历新年，满城丝绸灯笼与河面水灯铺满。游客极少，裁缝铺不排队，秋盆河上的划船几乎独享整条水巷。",
    experiences: [_x("灯笼夜市", "满城彩色丝绸灯笼点亮古城水巷"), _x("秋盆河划船", "傍晚放水灯于河中，古桥下穿行"), _x("会安裁缝定制", "20 小时内量身完成奥黛或西装"), _x("白玫瑰饺子", "会安独有小吃，透明米皮包虾仁")],
    budgetDetail: {
      daily: [150, 350, 700],
      flight: "¥2000–3500（飞岘港）",
      note: "2 月是性价比巅峰，高端酒店仅夏季一半价；建议住古城步行范围内"
    }
  }, {
    month: 11,
    highlight: "凉爽舒适的古城与海岸",
    weather: "24°C",
    crowd: "低",
    types: ["culture", "food"],
    why: "11 月雨季收尾，空气洗净后的会安空气透明如山泉。古城游客稀少，安邦海滩人迹罕至，是一年中骑车穿行稻田和古寺最惬意的月份。",
    experiences: [_x("美山圣地", "占婆王国遗迹，丛林中的印度教寺庙群"), _x("会安烹饪课", "逛早市买食材，学做越南河粉与春卷"), _x("安邦海滩骑行", "稻田与椰林之间骑行到沙滩"), _x("日本廊桥", "1590 年代建造的会安标志性古桥")],
    budgetDetail: {
      daily: [150, 350, 700],
      flight: "¥2000–3500",
      note: "11 月初偶有阵雨但便宜又人少，是精打细算的黄金期"
    }
  }]
}, {
  place: "法国普罗旺斯",
  region: "欧洲",
  budget: "$$$",
  months: [{
    month: 5,
    highlight: "葡萄园与初放薰衣草",
    weather: "24°C",
    crowd: "中",
    types: ["nature", "food"],
    why: "5 月普罗旺斯罂粟花与鼠尾草先于薰衣草登场，葡萄园嫩绿满坡，市场开启松露与芦笋季。游客仅为 7 月薰衣草高峰的 40%，小镇停车不愁，是懂行人的普罗旺斯季。",
    experiences: [_x("戈尔德石头城", "法国最美村庄，悬崖上的石头古镇"), _x("鲁西永赭石步道", "火焰色岩壁中的奇幻徒步路线"), _x("阿维尼翁教皇宫", "中世纪教皇驻地与世界遗产"), _x("普罗旺斯集市", "周日早市买薰衣草蜂蜜、橄榄油与香草")],
    budgetDetail: {
      daily: [600, 1100, 1800],
      flight: "¥5000–7500（飞马赛）",
      note: "5 月性价比高，租车自驾最自由；吕贝隆山谷民宿比酒店更有味"
    }
  }, {
    month: 7,
    highlight: "漫山遍野薰衣草盛开",
    weather: "28°C",
    crowd: "高",
    types: ["nature", "food"],
    why: "7 月瓦朗索尔高原的薰衣草地毯开出震撼的紫蓝色——只有 4 周窗口，错过再等一年。向日葵也在同期盛放，紫黄交错的田野是普罗旺斯最具辨识度的画面。",
    experiences: [_x("瓦朗索尔高原薰衣草田", "无边紫色花海中的经典明信片视角"), _x("塞南克修道院", "石砌修道院被薰衣草环绕的绝景"), _x("凡尔登大峡谷划船", "欧洲最大峡谷的碧绿湖水"), _x("艾克斯普罗旺斯", "南法最美城市，喷泉与树荫下的咖啡馆")],
    budgetDetail: {
      daily: [700, 1300, 2000],
      flight: "¥5000–7500",
      note: "薰衣草花期 6 月底–7 月底，建议 7 月前两周前往，下旬开始收割"
    }
  }]
}, {
  place: "希腊圣托里尼",
  region: "欧洲",
  budget: "$$$",
  months: [{
    month: 6,
    highlight: "初夏白房子与蓝顶教堂",
    weather: "26°C",
    crowd: "中",
    types: ["beach"],
    why: "6 月圣托里尼已经入夏但游轮大军还没到，蓝顶教堂和白房子村庄不用与人争抢机位。海水温暖可以游泳，日落不拥挤，是平衡天气与体验的最佳月份。",
    experiences: [_x("伊亚日落", "全球最美日落的蓝白悬崖小镇"), _x("费拉-伊亚徒步", "沿火山口悬崖的 10 公里海景步道"), _x("红沙滩", "火山岩形成的独特红色沙滩"), _x("火山岛温泉船游", "乘船登活火山岛，在硫磺温泉中漂浮")],
    budgetDetail: {
      daily: [700, 1200, 2200],
      flight: "¥5000–7500",
      note: "6 月初价低于 7-8 月；悬崖酒店带私人泳池建议提前 3 个月"
    }
  }, {
    month: 9,
    highlight: "旺季后的人少景美",
    weather: "27°C",
    crowd: "中",
    types: ["beach"],
    why: "9 月旺季尾声——游客减少 40%，海水被晒了三个月正达最暖，日落从 8 点的拥挤变成 7 点半的从容。物价微降但所有餐饮和船游仍在运营，是圣托里尼最舒服的季节。",
    experiences: [_x("阿克罗蒂里遗址", "3600 年前的米诺斯青铜时代古城"), _x("葡萄酒庄园品鉴", "火山土壤孕育的独特阿西尔提科白葡萄酒"), _x("卡马里黑沙滩", "火山黑沙的海滩酒吧与潜水"), _x("皮尔戈斯城堡日落", "避开伊亚人潮的最高点替代日落点")],
    budgetDetail: {
      daily: [600, 1100, 1800],
      flight: "¥5000–7500",
      note: "9 月中下旬价格下调明显，是蜜月旅行的最佳平衡点"
    }
  }]
}, {
  place: "西班牙塞维利亚",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 4,
    highlight: "四月春祭与弗拉明戈",
    weather: "22°C",
    crowd: "中",
    types: ["culture", "festival"],
    why: "4 月是塞维利亚四月节(Feria de Abril)——全城穿上传统服饰、马车穿街、帐篷里跳 Sevillanas 舞。同时橙花满城飘香，是安达卢西亚最具感染力的月份。",
    experiences: [_x("四月节集市", "数百个彩灯帐篷里的弗拉明戈与雪莉酒"), _x("塞维利亚王宫", "《权力的游戏》多恩花园取景地"), _x("西班牙广场", "半圆形瓷砖建筑与运河小船"), _x("弗拉明戈小剧场", "在老城洞穴式小剧场看原生态表演")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥4000–6000",
      note: "四月节期间住宿翻倍且需提前 3 个月订；节日期间很多餐厅歇业须留意"
    }
  }, {
    month: 10,
    highlight: "凉爽秋日避开酷热",
    weather: "23°C",
    crowd: "低",
    types: ["culture"],
    why: "10 月酷暑退去(夏季常达 40°C)，气温回落到宜人的 23°C。游客散场，塞维利亚王宫不用排队、西班牙广场可以独霸运河。是全年逛古迹最舒适的月份。",
    experiences: [_x("塞维利亚大教堂", "世界第三大教堂，哥伦布之墓所在地"), _x("圣十字区漫步", "犹太区白墙窄巷与花盆庭院"), _x("都市阳伞", "世界最大木结构建筑的日落天台"), _x("特里亚纳市场", "河对岸的本地人美食与陶瓷街区")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥4000–6000",
      note: "10 月性价比极高，夏季后的塞维利亚最松弛宜人"
    }
  }]
}, {
  place: "葡萄牙里斯本",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 4,
    highlight: "春光明媚游客未至",
    weather: "20°C",
    crowd: "中",
    types: ["culture", "food"],
    why: "4 月里斯本气温刚好，蓝花楹开始绽放，28 路电车不用挤破头。复活节后的城市节奏舒缓，沙滩还不热但阳光已经足以在露台享受葡式蛋挞和咖啡。",
    experiences: [_x("贝伦塔与热罗尼莫斯修道院", "大航海时代的世界遗产双子星"), _x("阿尔法马老城", "法多音乐回荡的迷宫般中世纪街区"), _x("贝伦蛋挞创始店", "Pastéis de Belém 的秘方蛋挞外酥内嫩"), _x("辛特拉一日游", "童话般的佩纳宫与摩尔人城堡")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥4000–6000",
      note: "4 月是里斯本性价比最高的月份之一，阳光充足但不燥热"
    }
  }, {
    month: 9,
    highlight: "秋初阳光与沙丁鱼节",
    weather: "24°C",
    crowd: "中",
    types: ["culture", "food", "festival"],
    why: "9 月里斯本有沙丁鱼节(Festa da Sardinha)——烤沙丁鱼的香气弥漫整个阿尔法马老城，街头烤肉、法多音乐与葡萄酒免费品尝，是最能感受里斯本灵魂的节庆。",
    experiences: [_x("沙丁鱼节", "阿尔法马街头烤沙丁鱼盛宴与露天法多音乐"), _x("LX Factory", "旧工厂改造的创意街区，书店与天台酒吧"), _x("里斯本海洋馆", "欧洲最大的室内水族馆"), _x("卡斯凯什海滩", "火车半小时可达的大西洋冲浪小镇")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥4000–6000",
      note: "沙丁鱼节日期每年浮动，建议提前查好；9 月海水最暖适合冲浪"
    }
  }]
}, {
  place: "老挝琅勃拉邦",
  region: "东南亚",
  budget: "$",
  months: [{
    month: 11,
    highlight: "水灯节与僧侣化缘",
    weather: "26°C",
    crowd: "低",
    types: ["culture", "festival"],
    why: "11 月老挝迎来水灯节(Loy Krathong)，琅勃拉邦的湄公河上数千盏水灯漂流，所有寺庙点起烛光。同时干季刚开启、空气透明，是全年感受老挝灵性最美的窗口。",
    experiences: [_x("清晨布施", "天未亮看橘袍僧侣沿街化缘的千年传统"), _x("光西瀑布", "三层碧蓝钙化池的天然跳水天堂"), _x("普西山日落", "360 度俯瞰湄公河与古城全景"), _x("香通寺", "琅勃拉邦最精美的马赛克生命之树壁画")],
    budgetDetail: {
      daily: [150, 300, 600],
      flight: "¥2000–3500（飞万象转机）",
      note: "老挝消费极低，精品酒店也只 200-400 元一晚；水灯节日期按阴历浮动"
    }
  }, {
    month: 12,
    highlight: "干季最舒适法式遗风",
    weather: "25°C",
    crowd: "低",
    types: ["culture", "food"],
    why: "12 月老挝干季进入最佳状态——万里晴空、气温宜人。琅勃拉邦法式殖民建筑中的牛角包配老挝咖啡是独特的文化混搭，是避开东南亚人潮寻找宁静的完美选择。",
    experiences: [_x("湄公河游船", "搭慢船看石灰岩山与河边村落"), _x("夜市淘宝", "苗族刺绣与老挝咖啡豆伴手礼"), _x("大象营地", "丛林骑象与训象师一日体验"), _x("法式烘焙早餐", "殖民遗风的羊角包+老挝咖啡早餐")],
    budgetDetail: {
      daily: [150, 300, 600],
      flight: "¥2000–3500",
      note: "12 月是最旺季，建议提前 2 个月订河畔精品酒店"
    }
  }]
}, {
  place: "摩洛哥菲斯",
  region: "非洲",
  budget: "$$",
  months: [{
    month: 5,
    highlight: "温暖舒适的迷宫老城",
    weather: "25°C",
    crowd: "低",
    types: ["culture"],
    why: "5 月菲斯气温温和，逛 9400 条迷宫般巷道不流汗不挤。皮革染坊的气味在微风中也更易接受，老城麦地那的日常生活节奏是全年最惬意的时候。",
    experiences: [_x("皮革染坊", "从屋顶俯瞰千年不变的彩色染缸工艺"), _x("卡鲁因大学", "世界最古老的大学，精美伊斯兰庭院"), _x("麦地那迷路", "9400 条巷道的世界最大无车城区"), _x("陶器作坊", "亲手体验菲斯蓝陶瓷的绘制工艺")],
    budgetDetail: {
      daily: [350, 600, 1000],
      flight: "¥6000–8000",
      note: "5 月是菲斯最舒适月，Riad 庭院民宿 300-500 元就能住进历史建筑"
    }
  }, {
    month: 10,
    highlight: "秋意中的皮革染坊",
    weather: "22°C",
    crowd: "低",
    types: ["culture"],
    why: "10 月菲斯秋高气爽，皮革染坊在凉爽空气中参观体验最好。游客比春季还少，深入老城手工艺作坊可以安静地看铜匠与马赛克匠人工作。",
    experiences: [_x("布伊纳尼亚神学院", "马赛克、木雕与石膏雕的伊斯兰建筑极致"), _x("菲斯蓝陶瓷工坊", "从塑形到彩绘的全程观摩"), _x("梅里尼德王陵", "山顶遗址俯瞰整个菲斯老城全景"), _x("菲斯美食导览", "街头哈里拉汤、骆驼肉塔吉与甜点")],
    budgetDetail: {
      daily: [350, 600, 1000],
      flight: "¥6000–8000",
      note: "10 月是摩洛哥最佳旅行季，避开沙漠热浪又抓住秋日暖阳"
    }
  }]
}, {
  place: "日本东京",
  region: "东亚",
  budget: "$$",
  months: [{
    month: 3,
    highlight: "目黑川樱花夜景",
    weather: "13°C",
    crowd: "极高",
    types: ["culture", "festival"],
    why: "3 月下旬东京樱花满开，目黑川两岸的 800 棵樱花树在夜间点灯后美得不真实。同时樱花季限定的和果子和便当只有这 10 天才能吃到，是东京最浪漫也最拥挤的一周。",
    experiences: [_x("目黑川夜樱", "800 棵樱花树下河面倒影的粉色隧道"), _x("上野公园花见", "席地而坐的野餐赏樱日本传统"), _x("浅草寺+晴空塔", "江户风情与现代东京同框"), _x("筑地场外市场", "金枪鱼拍卖与寿司早餐")],
    budgetDetail: {
      daily: [500, 900, 1800],
      flight: "¥2500–4500",
      note: "樱花季酒店翻 3 倍且需提前 4 个月；若错过满开可去富士山河口湖延后一周"
    }
  }, {
    month: 7,
    highlight: "隅田川花火大会",
    weather: "30°C",
    crowd: "高",
    types: ["culture", "festival", "food"],
    why: "7 月最后一个周六隅田川花火大会——20000 发焰火在晴空塔背景上炸开，是东京夏季的高光时刻。搭配浴衣、路边摊烧鸟和刨冰，是日本夏天的终极体验。",
    experiences: [_x("隅田川花火", "2 万发焰火与晴空塔同框的夏夜"), _x("原宿竹下通", "潮流文化与可丽饼的年轻人天堂"), _x("深夜新宿", "黄金街的微型酒吧与居酒屋"), _x("丰洲市场", "筑地搬迁后的新一代海鲜圣地")],
    budgetDetail: {
      daily: [500, 900, 1800],
      flight: "¥2500–4500",
      note: "花火大会当日极挤，建议中午占位；7 月高温高湿需备饮水和毛巾"
    }
  }]
}, {
  place: "越南河内",
  region: "东南亚",
  budget: "$",
  months: [{
    month: 7,
    highlight: "老城区与河粉之都",
    weather: "30°C",
    crowd: "低",
    types: ["food", "culture"],
    why: "7 月是河内淡季——阵雨来得快去得快，洗过的老城街道更干净。当地人都在吃最正宗的河粉（热汤驱暑是越南智慧），不用排队吃遍三十六行街。",
    experiences: [_x("三十六行街", "每条街卖一种商品的老城迷宫"), _x("还剑湖晨练", "看河内人打太极跳广场舞的清晨"), _x("河粉朝圣", "Pho Gia Truyen 等传奇河粉店"), _x("升龙水上木偶", "千年传统的水上木偶剧场")],
    budgetDetail: {
      daily: [150, 300, 600],
      flight: "¥1500–2500",
      note: "7 月是河内最便宜月，五星级酒店仅 400-600 元；阵雨通常 1 小时内结束"
    }
  }, {
    month: 9,
    highlight: "秋初凉风与法式遗风",
    weather: "28°C",
    crowd: "低",
    types: ["food", "culture"],
    why: "9 月河内初秋——还剑湖畔的桂花香、凉爽晚风中的法式殖民建筑，是河内一年最浪漫的月份。中秋节的灯笼和月饼也让老城区添了节庆气息。",
    experiences: [_x("火车街", "铁轨两侧咖啡馆看火车贴身驶过"), _x("升龙皇城", "世界遗产的越南千年皇宫遗址"), _x("鸡蛋咖啡创始店", "Cafe Giang 的河内独创蛋黄咖啡"), _x("西湖日落", "环湖骑行看夕阳与水上寺庙")],
    budgetDetail: {
      daily: [150, 300, 600],
      flight: "¥1500–2500",
      note: "9 月河内进入最美季节，中秋前后老城有灯笼市集"
    }
  }]
}, {
  place: "印度果阿",
  region: "南亚",
  budget: "$",
  months: [{
    month: 1,
    highlight: "干季沙滩与葡式建筑",
    weather: "32°C",
    crowd: "中",
    types: ["beach", "culture"],
    why: "1 月果阿正值干季巅峰——每天都是蓝天艳阳，阿拉伯海平静如湖。葡式教堂与印度教神庙比邻而居，是感受果阿独特融合文化的最佳月份。",
    experiences: [_x("帕洛伦海滩", "果阿最长的白沙滩与海滩小屋"), _x("仁慈耶稣大教堂", "圣方济各遗骸所在的世界遗产"), _x("杜德萨加瀑布", "丛林吉普车穿行至三层大瀑布"), _x("安朱纳跳蚤市场", "每周三的嬉皮时代遗留大集市")],
    budgetDetail: {
      daily: [200, 400, 800],
      flight: "¥3000–4500",
      note: "1 月是果阿最旺季但消费仍低；海滩小屋 200 元就能住一线海景"
    }
  }, {
    month: 12,
    highlight: "跨年海滩派对",
    weather: "30°C",
    crowd: "高",
    types: ["beach", "festival"],
    why: "12 月果阿是全球跨年派对圣地——从安静的南果沙滩瑜伽到北果通宵锐舞，干季阳光配上跨年氛围，是亚洲最接近伊比萨的体验。",
    experiences: [_x("跨年海滩派对", "北果沙滩电子音乐与篝火到天亮"), _x("旧果阿世界遗产", "葡萄牙殖民时期的巴洛克教堂群"), _x("香料庄园午餐", "热带雨林中的有机香料园体验"), _x("曼多维河日落游船", "海豚出没的河面日落与果阿音乐")],
    budgetDetail: {
      daily: [250, 500, 1000],
      flight: "¥3000–4500",
      note: "跨年期间住宿需提前 3 个月订；北果喧闹、南果安静，按偏好选区域"
    }
  }]
}, {
  place: "阿联酋迪拜",
  region: "中东",
  budget: "$$$",
  months: [{
    month: 1,
    highlight: "购物节与沙漠 Safari",
    weather: "24°C",
    crowd: "高",
    types: ["culture", "food"],
    why: "1 月迪拜气温 24°C——全年唯一可以在户外不流汗逛沙漠的月份。迪拜购物节横跨整月，各大商场折扣低至 2 折，加上新年焰火，是沙漠都市一年最活力的时刻。",
    experiences: [_x("迪拜购物节", "全球最大购物节，品牌打折+抽奖送车"), _x("哈利法塔日出", "世界最高塔 124 层俯瞰沙漠与海"), _x("沙漠冲沙", "4x4 越野车穿越红沙丘+星空营地烧烤"), _x("黄金市集+香料市集", "德伊勒老城区的传统阿拉伯商业")],
    budgetDetail: {
      daily: [700, 1400, 3000],
      flight: "¥3500–5500",
      note: "购物节 1 月全月；高端酒店价格不菲但中档选择足够，冲沙团人均 200-400 元"
    }
  }, {
    month: 12,
    highlight: "温暖跨年与高塔焰火",
    weather: "22°C",
    crowd: "高",
    types: ["culture", "festival"],
    why: "12 月迪拜是冬季暖阳的最佳选择——哈利法塔跨年焰火全球直播，棕榈岛酒店泳池仍能游泳。整个城市被圣诞和跨年装饰点亮，是奢华与节庆融合的极致。",
    experiences: [_x("哈利法塔跨年焰火", "世界最高建筑的新年倒计时盛典"), _x("棕榈岛跳伞", "从万米高空俯瞰棕榈岛人工奇迹"), _x("迪拜相框", "新旧迪拜交界的巨型金色画框"), _x("阿法迪历史区", "百年风塔建筑群中的阿拉伯茶文化")],
    budgetDetail: {
      daily: [800, 1600, 3500],
      flight: "¥3500–5500",
      note: "跨年期间是全年最贵，建议提前半年订；避开跨年正日可显著降预算"
    }
  }]
},
// ════════════════ 一月 ════════════════
{
  place: "日本北海道",
  region: "东亚",
  budget: "$$$",
  months: [{
    month: 1,
    highlight: "粉雪滑雪与札幌雪祭",
    weather: "-5°C",
    crowd: "中",
    types: ["nature", "festival"],
    why: "北海道是亚洲最稳定的粉雪产地——1 月降雪密集、雪质轻盈，是滑雪客的圣地。同时札幌雪祭点亮整座城市，是日本冬季最盛大的庆典之一。",
    experiences: [_x("二世古滑雪场", "亚洲顶级粉雪与日式雪场氛围"), _x("小樽运河", "冬夜里点灯的童话煤油灯之路"), _x("札幌雪祭", "大通公园的冰雕巨像与灯光秀"), _x("登别地狱谷", "火山口蒸汽中的硫磺温泉")],
    budgetDetail: {
      daily: [700, 1200, 2200],
      flight: "¥2500–4500",
      note: "二世古旺季需提前半年订房，札幌雪祭期间市内住宿翻倍"
    }
  }]
}, {
  place: "新西兰南岛",
  region: "大洋洲",
  budget: "$$$",
  months: [{
    month: 1,
    highlight: "南半球夏天峡湾与雪山",
    weather: "20°C",
    crowd: "中",
    types: ["nature"],
    why: "1 月是新西兰南岛的盛夏——日照长达 16 小时，米尔福德峡湾的瀑布水量充沛，库克山雪顶在绿色山谷之上格外分明。鲁冰花季刚过但薰衣草田正盛，是南岛户外最佳窗口。",
    experiences: [_x("米尔福德峡湾游船", "峡湾海豹与瀑布雨中的壮观航行"), _x("库克山胡克谷步道", "雪山脚下的冰川湖轻徒步"), _x("皇后镇蹦极+喷射艇", "冒险之都的经典心跳项目"), _x("特卡波星空", "全球首个暗夜保护区的银河")],
    budgetDetail: {
      daily: [800, 1300, 2200],
      flight: "¥6000–9000",
      note: "1 月是新西兰旺季，租车和住宿需提前 3 个月订；建议逆时针环南岛"
    }
  }]
}, {
  place: "菲律宾长滩岛",
  region: "东南亚",
  budget: "$$",
  months: [{
    month: 1,
    highlight: "白沙滩与潜水胜地",
    weather: "27°C",
    crowd: "中",
    types: ["beach"],
    why: "1 月长滩岛进入最佳干季窗口——海面平静如镜，白沙滩在阳光下呈现最完美的奶白色。季风转向后海面能见度高达 30 米，是潜水和浮潜最清晰的月份。",
    experiences: [_x("白沙滩日落", "连续多年评为全球最美沙滩之一的日落"), _x("跳岛浮潜", "鳄鱼岛周边珊瑚礁与热带鱼群"), _x("布拉波海滩风筝冲浪", "亚洲最佳风筝冲浪点之一"), _x("魔幻岛悬崖跳海", "从 3 米到 15 米的悬崖跳台")],
    budgetDetail: {
      daily: [350, 600, 1200],
      flight: "¥2000–3500",
      note: "1 月是旺季但春节前后更贵，建议 1 月中旬出行避开高峰"
    }
  }]
}, {
  place: "智利圣地亚哥",
  region: "南美",
  budget: "$$$",
  months: [{
    month: 1,
    highlight: "葡萄酒庄园与安第斯",
    weather: "29°C",
    crowd: "低",
    types: ["food", "nature"],
    why: "1 月智利正值南美盛夏，安第斯山脉雪水融化灌溉葡萄园——迈坡谷和卡萨布兰卡的酒庄正值丰收季，品酒体验最佳。同时也是徒步安第斯山的最佳天气窗口。",
    experiences: [_x("迈坡谷酒庄", "赤霞珠发源地，安第斯山脚下的品酒之旅"), _x("圣克里斯托瓦尔山", "登山顶俯瞰圣地亚哥全城与雪山天际线"), _x("瓦尔帕莱索一日游", "彩色涂鸦山城与聂鲁达故居"), _x("卡洪德尔马伊波峡谷", "安第斯山脉中的碧蓝水库与徒步路线")],
    budgetDetail: {
      daily: [600, 1000, 1800],
      flight: "¥10000–14000",
      note: "航班较贵但当地消费适中，酒庄品酒人均 200-400 元含午餐"
    }
  }]
}, {
  place: "斯里兰卡",
  region: "南亚",
  budget: "$",
  months: [{
    month: 1,
    highlight: "东海岸冲浪与观鲸",
    weather: "28°C",
    crowd: "低",
    types: ["beach", "wildlife"],
    why: "1 月斯里兰卡东海岸进入旱季——亭可马里和阿鲁甘湾的海面平静、能见度高，是冲浪初学者的天堂。同时蓝鲸迁徙经过南部海域，出海观鲸成功率高达 90%。",
    experiences: [_x("米瑞莎观鲸", "乘船近距离看蓝鲸与海豚群"), _x("狮子岩", "空中宫殿遗址，世界第八大奇迹"), _x("高山茶园火车", "穿越云雾茶园的世界最美火车线"), _x("雅拉国家公园猎游", "锡兰豹与大象的 Safari")],
    budgetDetail: {
      daily: [200, 400, 800],
      flight: "¥3000–4500",
      note: "斯里兰卡性价比极高，全程包车含司机约 300-400 元/天"
    }
  }]
}, {
  place: "坦桑尼亚桑给巴尔",
  region: "非洲",
  budget: "$$",
  months: [{
    month: 1,
    highlight: "香料之岛与印度洋海滩",
    weather: "30°C",
    crowd: "低",
    types: ["beach", "culture"],
    why: "1 月桑给巴尔正值干季——印度洋碧蓝温暖，石头城的香料市场满溢丁香与肉桂香。此时海豚出没频率最高，浮潜在珊瑚礁中看到的鱼群密度是雨季的 3 倍。",
    experiences: [_x("石头城迷宫漫步", "千年贸易港的阿拉伯-斯瓦希里混合建筑"), _x("南威海滩海豚游", "清晨出海与印度洋瓶鼻海豚共泳"), _x("乔扎尼森林", "红疣猴保护区与红树林独木舟"), _x("香料农场", "亲手采摘丁香、肉桂与香草荚")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥6000–8000",
      note: "1 月是桑给巴尔最舒适月，海滩度假村建议提前 2 个月预订"
    }
  }]
}, {
  place: "缅甸蒲甘",
  region: "东南亚",
  budget: "$",
  months: [{
    month: 1,
    highlight: "佛塔群日出与热气球",
    weather: "27°C",
    crowd: "低",
    types: ["culture", "nature"],
    why: "1 月蒲甘干季蓝天——2000 余座佛塔在晨雾中浮现的日出画面全年最清晰。热气球升空率最高，同时游客不到旺季的一半，佛塔探秘几乎独享整片平原。",
    experiences: [_x("热气球日出", "升空俯瞰千万佛塔与金色晨曦"), _x("阿南达寺", "蒲甘最大最精美的白色佛寺"), _x("伊洛瓦底江日落游船", "江上观佛塔剪影与归鸟"), _x("老蒲甘马车骑行", "穿行在千年佛塔群的马车之旅")],
    budgetDetail: {
      daily: [200, 400, 700],
      flight: "¥2500–4000（飞曼德勒转）",
      note: "缅甸消费极低，豪华酒店也仅 300-500 元；热气球需提前 2 个月预订"
    }
  }]
}, {
  place: "澳大利亚塔斯马尼亚",
  region: "大洋洲",
  budget: "$$$",
  months: [{
    month: 1,
    highlight: "夏季国家公园与野生动物",
    weather: "22°C",
    crowd: "低",
    types: ["nature", "wildlife"],
    why: "1 月是塔斯马尼亚的盛夏——薰衣草田满开(南半球最大薰衣草农场在飘丝)，摇篮山的步道全开且无雪。小袋熊和塔斯马尼亚恶魔在凉爽夏日最活跃，是澳洲最被低估的夏季目的地。",
    experiences: [_x("摇篮山鸽子湖徒步", "冰川湖环绕山景的世界级步道"), _x("飘丝薰衣草庄园", "南半球最大薰衣草田的紫色花海"), _x("酒杯湾", "全球十佳海滩的完美弧形白沙滩"), _x("布鲁尼岛美食之旅", "生蚝、奶酪、威士忌的美食环岛")],
    budgetDetail: {
      daily: [700, 1100, 1800],
      flight: "¥6000–8500（飞霍巴特）",
      note: "1 月是塔岛旺季，国家公园通票建议提前在线购买"
    }
  }]
}, {
  place: "越南胡志明市",
  region: "东南亚",
  budget: "$",
  months: [{
    month: 1,
    highlight: "干季美食与法式街区",
    weather: "28°C",
    crowd: "中",
    types: ["food", "culture"],
    why: "1 月胡志明市干季晴天率 95%，不闷不热，最适合骑摩托穿梭街头。春节(农历新年)前夕全城花市与年货街开张，街头美食也从不会辜负。",
    experiences: [_x("滨城市场", "百年市场中的越南咖啡与特色小吃"), _x("古芝地道", "越战地下城，体验狭窄隧道穿行"), _x("范五老街夜生活", "背包客天堂的小吃摊与啤酒街"), _x("法国区建筑漫步", "西贡大教堂与百年邮局的殖民遗韵")],
    budgetDetail: {
      daily: [200, 400, 700],
      flight: "¥1500–2500",
      note: "胡志明市消费极低，街头河粉约 15 元一碗；打摩的比出租车方便"
    }
  }]
},
// ════════════════ 二月 ════════════════
{
  place: "威尼斯",
  region: "欧洲",
  budget: "$$$",
  months: [{
    month: 2,
    highlight: "威尼斯狂欢节面具盛会",
    weather: "8°C",
    crowd: "高",
    types: ["culture", "festival"],
    why: "2 月威尼斯狂欢节是全球最古老的化装盛会——全城穿越回 18 世纪，圣马可广场变成面具与华服的舞台。冬季运河有薄雾笼罩，摄影画面比任何季节都梦幻。",
    experiences: [_x("狂欢节面具游行", "圣马可广场的华服面具与评委会评选"), _x("贡多拉运河游", "冷冽空气穿梭水巷的独特冬韵"), _x("彩色岛布拉诺", "彩虹色渔村与手工蕾丝"), _x("威尼斯双年展前展", "趁人少看当代艺术与建筑的前哨站")],
    budgetDetail: {
      daily: [600, 1100, 2000],
      flight: "¥4500–6500",
      note: "狂欢节期间酒店极贵且需提前 4 个月；住梅斯特坐火车 10 分钟可省 50%"
    }
  }]
}, {
  place: "埃及卢克索",
  region: "非洲",
  budget: "$$",
  months: [{
    month: 2,
    highlight: "帝王谷淡季人极少",
    weather: "23°C",
    crowd: "低",
    types: ["culture"],
    why: "2 月卢克索白天气温 23°C——是逛帝王谷和卡纳克神庙最舒适的温度。游客仅为冬季旺季的 40%，法老陵墓几乎独享，可以在墓室里慢慢端详壁画而不被推着走。",
    experiences: [_x("帝王谷图坦卡蒙墓", "最完整法老陵墓的原地下壁画"), _x("卡纳克神庙", "世界最大柱厅的 134 根巨型石柱"), _x("热气球日出", "尼罗河上空看西岸神庙与沙漠日出"), _x("尼罗河日落帆船", "搭乘传统三桅帆船看西岸夕阳")],
    budgetDetail: {
      daily: [350, 600, 1100],
      flight: "¥5000–7000",
      note: "2 月性价比极高，卢克索冬宫等历史酒店含早仅 400-700 元"
    }
  }]
}, {
  place: "阿根廷巴塔哥尼亚",
  region: "南美",
  budget: "$$$",
  months: [{
    month: 2,
    highlight: "夏末冰川徒步最佳",
    weather: "20°C",
    crowd: "中",
    types: ["nature"],
    why: "2 月巴塔哥尼亚夏末稳定——风速比 12-1 月低 30%，莫雷诺冰川的大面积崩塌最频繁。菲茨罗伊峰的日出朝霞概率全年最高，徒步条件最佳。",
    experiences: [_x("莫雷诺冰川迷你徒步", "踏上活冰川蓝冰的极致体验"), _x("菲茨罗伊日出", "拉古纳德洛斯特雷斯看日照金山"), _x("托雷湖观景", "冰川、湖泊与尖峰同框"), _x("乌斯怀亚世界尽头", "火地岛国家公园与企鹅岛")],
    budgetDetail: {
      daily: [800, 1300, 2200],
      flight: "¥12000–16000",
      note: "需提前半年订 El Chalten 住宿；阿根廷国内航班另购"
    }
  }]
}, {
  place: "巴西里约热内卢",
  region: "南美",
  budget: "$$$",
  months: [{
    month: 2,
    highlight: "里约狂欢节",
    weather: "30°C",
    crowd: "极高",
    types: ["festival", "beach"],
    why: "2 月里约狂欢节是人类规模最大的派对——桑巴大道 7 万观众齐看顶级桑巴舞学校竞演，全城街头派对(blocos)超过 500 场。这是巴西灵魂最沸腾的一周。",
    experiences: [_x("桑巴大道竞演", "顶级桑巴学校的 80 分钟花车与舞蹈盛宴"), _x("科帕卡巴纳海滩", "狂欢节前后白天的沙滩派对"), _x("基督像", "世界新七大奇迹的山顶全景"), _x("拉帕拱门夜生活", "桑巴夜与街头 caipirinha 调酒")],
    budgetDetail: {
      daily: [800, 1500, 3000],
      flight: "¥12000–16000",
      note: "狂欢节期间住宿翻 4-5 倍且需提前半年；桑巴大道门票 ¥200-3000 不等"
    }
  }]
}, {
  place: "印尼巴厘岛",
  region: "东南亚",
  budget: "$$",
  months: [{
    month: 2,
    highlight: "避雨季后的稻田与寺庙",
    weather: "28°C",
    crowd: "低",
    types: ["beach", "culture"],
    why: "2 月巴厘岛雨季尾声——阵雨通常在凌晨和傍晚，白天大晴。梯田在雨水浇灌后呈现最饱和的绿色，是摄影和徒步乌布稻田的最佳月份。而且 2 月欧美游客大减，全岛安静。",
    experiences: [_x("德格拉朗梯田", "乌布翠绿稻田中的竹编秋千"), _x("海神庙日落", "海上岩洞寺庙的剪影日落"), _x("圣猴森林", "乌布猴群与古寺共存"), _x("努萨佩尼达一日游", "恐龙湾悬崖与魔鬼鱼浮潜")],
    budgetDetail: {
      daily: [350, 600, 1200],
      flight: "¥2500–4000",
      note: "2 月是巴厘岛最便宜月，五星度假村仅 600-900 元/晚"
    }
  }]
}, {
  place: "韩国首尔",
  region: "东亚",
  budget: "$$",
  months: [{
    month: 2,
    highlight: "冬末宫殿雪景与美食",
    weather: "2°C",
    crowd: "中",
    types: ["culture", "food"],
    why: "2 月首尔景福宫的雪景韩服拍摄最美——白雪覆瓦的宫殿配传统韩服，是首尔最上镜的季节。同时街头辣炒年糕和鱼饼摊在冷天中最诱人，汗蒸幕也是冬季最佳体验。",
    experiences: [_x("景福宫韩服雪景", "穿韩服免费入宫，白雪古宫拍大片"), _x("北村韩屋村", "传统韩屋群与远眺首尔塔"), _x("广藏市场", "生拌牛肉与绿豆煎饼的百年市场"), _x("龙山汗蒸幕", "韩式桑拿+甜米露+鸡蛋的冬日治愈")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥1500–2500",
      note: "2 月首尔仍寒冷但游客少；韩服租赁约 100 元/4 小时含发型"
    }
  }, {
    month: 10,
    highlight: "宫殿枫叶与韩屋村",
    weather: "17°C",
    crowd: "中",
    types: ["culture", "food"],
    why: "10 月下旬首尔景福宫的红叶与韩屋瓦顶的对照最美——秋高气爽，北村韩屋村的银杏金黄。街头辣炒年糕和鱼饼在微凉的秋日中最温暖，是首尔全年最舒服的季节。",
    experiences: [_x("景福宫秋叶", "枫红与银杏映衬朝鲜宫殿瓦顶"), _x("北村韩屋村", "银杏树下的传统韩屋巷弄"), _x("南山首尔塔", "秋色中的城市全景+情人锁"), _x("梨花壁画村", "秋季阳光下的街头艺术与咖啡")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥1500–2500",
      note: "10 月底枫红高峰；景福宫韩服免费入场，租赁约 100 元"
    }
  }]
}, {
  place: "厄瓜多尔加拉帕戈斯",
  region: "南美",
  budget: "$$$",
  months: [{
    month: 2,
    highlight: "达尔文岛屿野生动物季",
    weather: "27°C",
    crowd: "低",
    types: ["wildlife", "nature"],
    why: "2 月加拉帕戈斯海域最暖——海水 25°C 浮潜不用穿厚湿衣，锤头鲨群和企鹅同时出没（暖水珊瑚与冷水上升流交汇）。海狮幼崽和蓝脚鲣鸟的求偶舞蹈也在此时。",
    experiences: [_x("伊莎贝拉岛浮潜", "与海龟、海狮、企鹅同游的火山岛"), _x("巴托洛梅岛", "加拉帕戈斯最具标志性的尖峰岩景观"), _x("圣克鲁斯达尔文研究中心", "象龟繁育基地与进化论圣地"), _x("火山隧道潜水", "海底熔岩隧道的独特潜水体验")],
    budgetDetail: {
      daily: [1000, 1800, 3500],
      flight: "¥10000–15000",
      note: "船宿是体验加拉帕戈斯最佳方式，需提前 6-12 个月预订"
    }
  }]
}, {
  place: "日本札幌",
  region: "东亚",
  budget: "$$",
  months: [{
    month: 2,
    highlight: "札幌冰雪节灯光秀",
    weather: "-5°C",
    crowd: "高",
    types: ["festival", "nature"],
    why: "2 月札幌冰雪节横跨三大会场——大通公园的巨型雪雕、薄野的冰雕大赛、TSUDOME 的雪滑梯，是日本冬季最盛大的雪之祭典。同时北海道滑雪季进入深粉雪最佳状态。",
    experiences: [_x("大通公园雪雕", "国际雪雕大赛的巨型作品与夜间灯光"), _x("薄野冰雕", "夜晚点亮后晶莹剔透的冰之艺术"), _x("札幌拉面共和国", "味噌拉面发源地的 8 家名店对决"), _x("定山溪温泉", "距市区 1 小时的山谷雪景温泉")],
    budgetDetail: {
      daily: [500, 900, 1600],
      flight: "¥2500–4500",
      note: "冰雪节期间札幌住宿紧张，建议住小樽或定山溪当日往返"
    }
  }]
}, {
  place: "马来西亚槟城",
  region: "东南亚",
  budget: "$",
  months: [{
    month: 2,
    highlight: "娘惹文化与街头美食",
    weather: "28°C",
    crowd: "低",
    types: ["food", "culture"],
    why: "2 月槟城干季蓝天——乔治市壁画街不晒不热，榴莲季虽未到但街头美食最全。农历新年期间华人区张灯结彩，娘惹家庭开放参观，是美食+文化密度最高的月份。",
    experiences: [_x("乔治市壁画寻宝", "立陶宛艺术家创作的街头壁画骑行打卡"), _x("槟城美食天堂", "炒粿条、亚参叻沙、煎蕊一站式吃遍"), _x("升旗山缆车", "殖民时期山顶避暑站的雨林全景"), _x("娘惹博物馆", "峉峉娘惹文化的金碧辉煌大宅")],
    budgetDetail: {
      daily: [150, 300, 600],
      flight: "¥1500–2500",
      note: "槟城是亚洲性价比最高的美食城市，街头米其林仅 10-20 元一顿"
    }
  }]
},
// ════════════════ 三月 ════════════════
{
  place: "荷兰阿姆斯特丹",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 3,
    highlight: "郁金香花海开始绽放",
    weather: "10°C",
    crowd: "中",
    types: ["nature", "culture"],
    why: "3 月下旬库肯霍夫公园开园——世界最大郁金香花园的 700 万株球茎花卉同时绽放。同时运河风开始变暖，骑自行车穿行运河带不再冻手，是荷兰最美的春季序曲。",
    experiences: [_x("库肯霍夫公园", "700 万株郁金香、风信子与洋水仙花海"), _x("运河骑行", "租自行车沿运河带穿行九街与吊桥"), _x("梵高博物馆", "世界最大梵高收藏的向日葵与星空"), _x("安妮之家", "二战密室的沉浸式历史体验")],
    budgetDetail: {
      daily: [500, 900, 1500],
      flight: "¥4000–6000",
      note: "郁金香季 3 月下旬–5 月中旬；周末库肯霍夫极挤，建议周中清早前往"
    }
  }]
}, {
  place: "约旦佩特拉",
  region: "中东",
  budget: "$$",
  months: [{
    month: 3,
    highlight: "玫瑰之城最舒适季",
    weather: "18°C",
    crowd: "低",
    types: ["nature", "culture"],
    why: "3 月佩特拉白天气温 18-22°C——徒步穿越蛇道和爬上修道院的 800 级台阶不会中暑，是全年最舒适的探索窗口。沙漠野花也开始在玫瑰色岩石间绽放。",
    experiences: [_x("蛇道徒步", "穿越 1.2 公里窄谷走到卡兹尼神殿的震撼"), _x("修道院登顶", "800 级台阶后的 45 米高岩雕立面"), _x("瓦迪拉姆火星沙漠", "《火星救援》取景地的红色沙丘与星空帐篷"), _x("佩特拉之夜", "千盏烛光照亮蛇道与神殿的夜间体验")],
    budgetDetail: {
      daily: [400, 700, 1300],
      flight: "¥5000–7500",
      note: "Jordan Pass 含签证和景点门票，建议提前在线购买"
    }
  }]
}, {
  place: "古巴哈瓦那",
  region: "加勒比",
  budget: "$$",
  months: [{
    month: 3,
    highlight: "哈瓦那爵士节与老爷车",
    weather: "27°C",
    crowd: "低",
    types: ["culture", "festival", "food"],
    why: "3 月哈瓦那旱季最稳定——蓝天率接近 100%，哈瓦那国际爵士节汇聚全球顶级拉丁爵士乐手。泼彩般的老爷车在马雷贡大道上的画面，是古巴最经典的视觉。",
    experiences: [_x("哈瓦那爵士节", "全城场馆的拉丁爵士与古巴奏鸣曲"), _x("老爷车巡游", "敞篷雪佛兰穿越革命广场与海滨"), _x("旧哈瓦那徒步", "世界遗产的殖民广场与海明威酒馆"), _x("比尼亚莱斯山谷", "雪茄烟田与喀斯特石山的骑马之旅")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥7000–10000（经转机）",
      note: "古巴现金社会，带足欧元或加元；上网需买 ETECSA WiFi 卡"
    }
  }]
}, {
  place: "哥斯达黎加",
  region: "中美",
  budget: "$$$",
  months: [{
    month: 3,
    highlight: "雨林海滩与火山",
    weather: "27°C",
    crowd: "中",
    types: ["nature", "wildlife"],
    why: "3 月哥斯达黎加干季巅峰——丛林步道不泥泞，吼猴与树懒在阳光下最活跃。太平洋海岸的冲浪浪头最稳定，阿雷纳火山的锥顶没有云雾遮挡概率最高。",
    experiences: [_x("阿雷纳火山徒步", "完美锥形火山的熔岩步道与温泉"), _x("蒙特维德云雾森林", "悬索桥上的云雾森林冠层漫步"), _x("曼努埃尔安东尼奥国家公园", "白面猴与树懒栖息的雨林沙滩"), _x("塔拉曼卡河漂流", "热带雨林中的 III-IV 级激流体验")],
    budgetDetail: {
      daily: [600, 1000, 1800],
      flight: "¥8000–11000",
      note: "哥斯达黎加是中美洲最贵但最安全；自驾需四驱 SUV"
    }
  }]
}, {
  place: "印度斋浦尔",
  region: "南亚",
  budget: "$",
  months: [{
    month: 3,
    highlight: "洒红节彩色狂欢",
    weather: "28°C",
    crowd: "中",
    types: ["festival", "culture"],
    why: "3 月斋浦尔洒红节(Holi)是印度最疯狂的色彩嘉年华——全城互撒彩色粉末，风之宫殿前的粉色街道变成七彩海洋。这个节日代表了印度最欢乐的一面。",
    experiences: [_x("洒红节庆祝", "全城撒粉狂欢，风之宫殿前的七彩人潮"), _x("琥珀堡", "山丘上的莫卧儿城堡与镜宫"), _x("城市宫殿", "粉色之城中心的王室博物馆"), _x("简塔·曼塔天文台", "300 年前的巨大日晷与天文仪器")],
    budgetDetail: {
      daily: [200, 400, 800],
      flight: "¥3500–5000",
      note: "洒红节日期每年按阴历浮动；穿准备丢弃的白色衣服是洒红节传统"
    }
  }]
}, {
  place: "阿根廷伊瓜苏",
  region: "南美",
  budget: "$$",
  months: [{
    month: 3,
    highlight: "瀑布水量丰沛雨林",
    weather: "26°C",
    crowd: "中",
    types: ["nature"],
    why: "3 月伊瓜苏雨季尾巴——水量达到全年最大，魔鬼咽喉的轰鸣声震耳欲聋，水雾彩虹持续在空中出没。丛林植被最茂盛翠绿，蝴蝶群也比旱季密集得多。",
    experiences: [_x("魔鬼咽喉", "在悬空栈道尽头直面 14 条瀑布的咆哮"), _x("伊瓜苏瀑布游船", "坐快艇冲入瀑布水帘的湿透体验"), _x("鸟园", "巨嘴鸟与金刚鹦鹉零距离的彩鸟天堂"), _x("三国界碑", "巴西、阿根廷、巴拉圭三国交汇处")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥10000–13000（飞布宜诺斯艾利斯转）",
      note: "阿根廷和巴西两侧视角不同，建议两侧都去；防水设备必备"
    }
  }]
}, {
  place: "西班牙巴塞罗那",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 3,
    highlight: "高迪建筑与初春街头",
    weather: "16°C",
    crowd: "中",
    types: ["culture", "food"],
    why: "3 月巴塞罗那气温回升、阳光充足但游客还未爆满。圣家堂预约无需提前数周，高迪建筑前的排队短了一半。街头咖啡馆开始把桌椅摆出，是城市开始苏醒的月份。",
    experiences: [_x("圣家堂", "高迪的未完成杰作，彩色光影奇迹"), _x("桂尔公园", "马赛克蜥蜴与梦幻露台"), _x("波盖利亚市场", "兰布拉大道上的美食菜市场"), _x("哥特区小巷漫步", "中世纪窄巷中的隐藏广场与Tapas")],
    budgetDetail: {
      daily: [500, 800, 1400],
      flight: "¥4000–6000",
      note: "3 月性价比高于夏季；圣家堂务必提前在线预约时间段"
    }
  }]
}, {
  place: "中国西藏拉萨",
  region: "东亚",
  budget: "$$",
  months: [{
    month: 3,
    highlight: "高原阳光与朝圣者",
    weather: "8°C",
    crowd: "中",
    types: ["culture", "nature"],
    why: "3 月拉萨日光之城名副其实——冬日最后一场雪衬托布达拉宫，游客极少，八廓街的朝圣者依然虔诚转经。是全年最少人挤、最能感受藏地灵性的窗口。",
    experiences: [_x("布达拉宫", "免排队的冬日珍宝馆与白宫"), _x("大昭寺等身佛像", "释迦牟尼 12 岁等身像的朝圣中心"), _x("八廓街转经", "跟随朝圣者的顺时针转经路"), _x("羊卓雍措一日游", "碧蓝圣湖与雪山全景")],
    budgetDetail: {
      daily: [300, 500, 900],
      flight: "¥1500–3000（建议火车进藏适应海拔）",
      note: "3 月气温仍低需备羽绒服；入藏函需提前办理，火车进藏利于适应高原"
    }
  }]
}, {
  place: "葡萄牙波尔图",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 3,
    highlight: "波特酒乡与杜罗河谷",
    weather: "15°C",
    crowd: "低",
    types: ["food", "culture"],
    why: "3 月波尔图杜罗河谷的杏花盛开——河岸两旁的白色花海与梯田葡萄园是波尔图最出片的季节。波特酒庄的品酒室不用排队，整个城市还在巴黎和巴塞罗那游客的雷达之外。",
    experiences: [_x("杜罗河谷酒庄", "搭火车深入河谷品酒+午餐配年份波特"), _x("莱罗书店", "哈利波特灵感来源的新哥特式最美书店"), _x("圣本托车站", "2 万片青花瓷砖壁画讲述葡萄牙历史"), _x("里贝拉河岸", "彩色房屋映在杜罗河的世界遗产街区")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥4000–6000（飞里斯本转火车）",
      note: "3 月波尔图机票和住宿为全年最低，性价比远超里斯本"
    }
  }]
},
// ════════════════ 四月 ════════════════
{
  place: "瑞士少女峰",
  region: "欧洲",
  budget: "$$$",
  months: [{
    month: 4,
    highlight: "雪山与春草同框",
    weather: "12°C",
    crowd: "低",
    types: ["nature"],
    why: "4 月少女峰地区冬夏交替——山腰绿草初生、野花探头，而山顶依然白雪覆盖。滑雪季与徒步季在这个月重叠，可上午滑雪下午徒步，游客仅为夏季的 30%。",
    experiences: [_x("少女峰铁路", "欧洲最高火车站 3454 米处的阿莱奇冰川"), _x("劳特布伦嫩", "72 条瀑布的瑞士最美山谷"), _x("格林德瓦菲斯特", "悬崖步道与阿尔卑斯牧场徒步"), _x("因特拉肯滑翔伞", "雪山下湖光山色的双人飞行")],
    budgetDetail: {
      daily: [800, 1300, 2200],
      flight: "¥5000–7500（飞苏黎世转）",
      note: "4 月是瑞士淡季性价比最佳月，瑞士通票含大部分交通和景点"
    }
  }, {
    month: 8,
    highlight: "雪山徒步与高山小火车",
    weather: "15°C",
    crowd: "高",
    types: ["nature"],
    why: "8 月少女峰徒步路线全开——从格林德瓦到劳特布伦嫩的经典环线在野花最盛时通达。欧洲最高火车站 3454 米的阿莱奇冰川观景台可远眺阿尔卑斯山全景。",
    experiences: [_x("少女峰铁路", "齿轮火车登顶欧洲最高火车站"), _x("格林德瓦-菲斯特", "悬崖步道与阿尔卑斯滑翔伞"), _x("门利兴-小沙伊德格", "高山牧场与三峰同框的经典徒步"), _x("因特拉肯双湖", "图恩湖和布里恩茨湖之间的山城")],
    budgetDetail: {
      daily: [800, 1300, 2500],
      flight: "¥5000–7500",
      note: "8 月是瑞士最旺季，少女峰通票和住宿需提前 3 个月预订"
    }
  }]
}, {
  place: "日本金泽",
  region: "东亚",
  budget: "$$",
  months: [{
    month: 4,
    highlight: "晚樱与兼六园金箔",
    weather: "15°C",
    crowd: "中",
    types: ["culture"],
    why: "4 月中旬金泽兼六园是日本三大名园中樱花最晚满开的——在京都樱花落去后仍可追樱。同时金箔工艺、武家屋敷和茶屋街组合出远丰富于预期的文化密度。",
    experiences: [_x("兼六园", "日本三大名园的樱花与雪吊灯笼"), _x("金泽 21 世纪美术馆", "游泳池幻觉装置与当代艺术"), _x("东茶屋街", "金箔冰淇淋与江户艺伎街区"), _x("近江町市场", "北陆最鲜海胆、金枪鱼与螃蟹")],
    budgetDetail: {
      daily: [400, 700, 1300],
      flight: "¥2500–4000（飞小松）",
      note: "金泽晚樱大约 4 月 15-20 日；JR Pass 可从东京/大阪直达"
    }
  }]
}, {
  place: "希腊米科诺斯",
  region: "欧洲",
  budget: "$$$",
  months: [{
    month: 4,
    highlight: "淡季尾的风车与海滩",
    weather: "19°C",
    crowd: "低",
    types: ["beach"],
    why: "4 月米科诺斯全岛苏醒但游轮和派对大军尚未抵达——白房子刚刷新、三角梅初开，海风微凉但阳光足够暖。沙滩包场、餐厅不用等位，是安静享受基克拉泽斯之美的最后窗口。",
    experiences: [_x("小威尼斯日落", "海边餐桌看风车与夕阳同框"), _x("天堂海滩", "4 月包场翡翠海水的静谧体验"), _x("米科诺斯镇迷路", "白墙蓝窗迷宫般的巷弄探索"), _x("提洛岛考古", "阿波罗出生地的古希腊遗迹半日游")],
    budgetDetail: {
      daily: [700, 1300, 2500],
      flight: "¥5000–7500",
      note: "4 月价格比旺季低 40%，是米科诺斯性价比最高的月份"
    }
  }, {
    month: 7,
    highlight: "白房子蓝海与派对",
    weather: "29°C",
    crowd: "高",
    types: ["beach", "festival"],
    why: "7 月米科诺斯进入全盛——全球最知名 DJ 在海滩俱乐部驻场，小威尼斯的日落配鸡尾酒是夏季最奢侈的画面。这是派对文化与基克拉泽斯美学的终极碰撞月。",
    experiences: [_x("天堂海滩俱乐部", "世界级 DJ 的海滩派对到深夜"), _x("小威尼斯日落", "在海边餐桌看风车与血红落日"), _x("米科诺斯镇迷路", "蓝窗白墙迷宫般巷弄的拍照之旅"), _x("提洛岛考古", "阿波罗与阿尔忒弥斯出生地的古希腊遗址")],
    budgetDetail: {
      daily: [800, 1500, 3000],
      flight: "¥5000–7500",
      note: "7 月米科诺斯是欧洲最贵海岛之一，但氛围无可替代；提前 4 个月订"
    }
  }]
}, {
  place: "秘鲁圣谷",
  region: "南美",
  budget: "$$",
  months: [{
    month: 4,
    highlight: "印加遗址与彩虹山",
    weather: "18°C",
    crowd: "低",
    types: ["nature", "culture"],
    why: "4 月圣谷雨季结束——印加梯田翠绿如新，彩虹山的七色地层在刚洗过的空气中饱和度最高。马丘比丘云雾开始变薄而旺季人潮尚未抵达，是印加文化探索的黄金窗口。",
    experiences: [_x("奥扬泰坦博", "唯一保存完整的印加城市与堡垒"), _x("莫瑞梯田", "圆形下沉式印加农业实验梯田"), _x("马拉斯盐田", "三千块盐池的白色拼图"), _x("皮萨克周日集市", "安第斯手织品与彩色玉米的本地市集")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥12000–15000",
      note: "圣谷海拔比库斯科低，适合作为马丘比丘前的适应地"
    }
  }]
}, {
  place: "突尼斯撒哈拉",
  region: "非洲",
  budget: "$$",
  months: [{
    month: 4,
    highlight: "沙漠星空与柏柏尔村",
    weather: "28°C",
    crowd: "极低",
    types: ["nature", "culture"],
    why: "4 月突尼斯撒哈拉不炎热——白天 28°C 沙漠不煎熬，夜晚可盖毯子。撒哈拉星空在无月夜中倒泻银河，柏柏尔人的穴居村落和盐湖是摩洛哥之外的北非惊喜。",
    experiences: [_x("杰里德大盐湖", "撒哈拉边缘的镜面盐湖与海市蜃楼"), _x("马特马塔穴居", "柏柏尔人挖掘的地下庭院村落"), _x("杜兹沙丘日落", "撒哈拉门户的骆驼骑行与日落"), _x("迦太基遗址", "突尼斯城的古罗马世界遗产")],
    budgetDetail: {
      daily: [350, 600, 1000],
      flight: "¥6000–8000",
      note: "突尼斯免签，物价远低于摩洛哥，是北非性价比之王"
    }
  }]
}, {
  place: "新西兰皇后镇",
  region: "大洋洲",
  budget: "$$$",
  months: [{
    month: 4,
    highlight: "秋色湖区与蹦极",
    weather: "14°C",
    crowd: "中",
    types: ["nature"],
    why: "4 月皇后镇进入南半球最美秋季——瓦卡蒂普湖畔的白杨和枫树变成金色与红色，雪山开始添新雪。冒险运动全年可玩但秋季层林尽染下的蹦极是无与伦比的视觉体验。",
    experiences: [_x("卡瓦劳大桥蹦极", "世界蹦极发源地 43 米跳入秋色"), _x("箭镇秋色", "19 世纪淘金小镇的金色枫叶"), _x("米尔福德峡湾日游", "秋季云雾更少的峡湾全景"), _x("格林诺奇骑马", "《指环王》中土世界的达特河谷骑行")],
    budgetDetail: {
      daily: [700, 1200, 2000],
      flight: "¥6000–9000",
      note: "4 月是皇后镇摄影最佳月，秋季色彩集中在 4 月中下旬"
    }
  }, {
    month: 12,
    highlight: "夏初湖区与蹦极",
    weather: "18°C",
    crowd: "中",
    types: ["nature"],
    why: "12 月皇后镇夏初——鲁冰花在瓦卡蒂普湖畔盛开，蹦极和喷射艇的冒险运动在温暖天气中体验最佳。峡湾和徒步路线全开，是南半球的完美夏季假期。",
    experiences: [_x("卡瓦劳大桥蹦极", "世界蹦极发源地的 43 米跳跃"), _x("米尔福德峡湾", "夏季瀑布流量最大的游船"), _x("格林诺奇骑马", "《指环王》中土世界的达特河谷"), _x("Shotover 喷射艇", "峡谷中时速 85 公里的极限体验")],
    budgetDetail: {
      daily: [700, 1200, 2200],
      flight: "¥6000–9000",
      note: "12 月是新西兰旺季，鲁冰花花期 + 圣诞假期；需提前 3 个月订"
    }
  }]
}, {
  place: "泰国清莱",
  region: "东南亚",
  budget: "$",
  months: [{
    month: 4,
    highlight: "宋干节泼水狂欢",
    weather: "34°C",
    crowd: "高",
    types: ["festival", "culture"],
    why: "4 月清莱宋干节(泰国新年)是全城水战——泼水意味着洗去厄运、迎接新年。清莱的泼水比曼谷更传统、比清迈更野趣，加上白庙蓝庙的视觉冲击，是泰北最具活力的体验。",
    experiences: [_x("白庙", "当代艺术家的全白镜面碎片的震撼寺庙"), _x("蓝庙", "宝石蓝与金色的当代佛教艺术"), _x("宋干节水战", "全城泼水+抹泥+泡沫的泰国新年"), _x("金三角", "湄公河三国交界与鸦片博物馆")],
    budgetDetail: {
      daily: [150, 300, 600],
      flight: "¥1500–2500（飞清迈转车）",
      note: "宋干节 4 月 13-15 日；电子设备务必防水袋保护"
    }
  }]
}, {
  place: "美国华盛顿",
  region: "北美",
  budget: "$$$",
  months: [{
    month: 4,
    highlight: "樱花大道与潮汐湖",
    weather: "18°C",
    crowd: "高",
    types: ["culture", "nature"],
    why: "4 月初华盛顿潮汐湖的 3000 株樱花与杰斐逊纪念堂同框——是北美最壮观的樱花盛景。国家樱花节持续 4 周，所有史密森尼博物馆免费参观，是美国春天最文艺的目的地。",
    experiences: [_x("潮汐湖樱花", "樱花环绕杰斐逊纪念堂的经典镜头"), _x("国家广场博物馆群", "航空航天、自然历史、艺术三馆齐逛"), _x("国会山", "美国国会大厦与最高法院"), _x("乔治城漫步", "运河、彩色排屋与 DC 最潮美食街区")],
    budgetDetail: {
      daily: [700, 1200, 2000],
      flight: "¥5000–8000",
      note: "樱花花期 4 月初约 10 天，需提前半年订酒店；所有博物馆免费"
    }
  }]
}, {
  place: "中国徽州",
  region: "东亚",
  budget: "$",
  months: [{
    month: 4,
    highlight: "油菜花海与白墙黛瓦",
    weather: "18°C",
    crowd: "中",
    types: ["nature", "culture"],
    why: "4 月徽州油菜花满山——宏村和西递的白墙黛瓦被金色花海包围，黄山云海在春季也最频繁。是中国传统水墨画实景化的最佳月份，也是古村落最适合骑行的温度。",
    experiences: [_x("宏村月沼", "徽派建筑倒映月沼的经典清晨"), _x("西递牌坊群", "世界遗产古村落的徽商大宅"), _x("黄山云海日出", "春季云海概率最高的日出"), _x("徽杭古道徒步", "千年古道中的溪流与茶园")],
    budgetDetail: {
      daily: [200, 400, 700],
      flight: "¥800–1500（飞黄山）",
      note: "4 月是徽州最美月但清明假期极挤；建议非假期周中出行"
    }
  }]
}, {
  place: "韩国济州岛",
  region: "东亚",
  budget: "$$",
  months: [{
    month: 4,
    highlight: "油菜花与樱花并放",
    weather: "15°C",
    crowd: "中",
    types: ["nature"],
    why: "4 月济州岛是韩国最早迎接春天的地方——油菜花与樱花同时盛放，汉拿山杜鹃开始染红山坡。免签直飞且环岛骑行温度完美，是小长假的境外首选。",
    experiences: [_x("城山日出峰", "世界遗产火山口的油菜花海日出"), _x("汉拿山徒步", "韩国最高峰的杜鹃花步道"), _x("涉地可支", "海岸悬崖上的灯塔与油菜花"), _x("偶来市场", "济州黑猪肉与橘子主题美食")],
    budgetDetail: {
      daily: [400, 700, 1100],
      flight: "¥1500–2500",
      note: "济州免签；4 月是油菜花+樱花双花期，环岛骑行是最佳体验方式"
    }
  }]
},
// ════════════════ 五月 ════════════════
{
  place: "南非开普敦",
  region: "非洲",
  budget: "$$",
  months: [{
    month: 5,
    highlight: "秋高气爽赏鲸季开始",
    weather: "18°C",
    crowd: "低",
    types: ["nature", "wildlife"],
    why: "5 月开普敦南半球秋季金黄——桌山云层最少的季节，山顶视野可看到好望角。南露脊鲸开始进入近海产子，沿海公路驾车随时可能看到鲸鱼出水。",
    experiences: [_x("桌山缆车", "世界新七大自然的平顶山全景"), _x("好望角", "大西洋与印度洋交汇的非洲最西南角"), _x("博尔德斯海滩企鹅", "非洲企鹅群在沙滩上摇摇摆摆"), _x("斯泰伦博斯酒庄", "开普荷兰式酒庄的秋色品酒之旅")],
    budgetDetail: {
      daily: [400, 700, 1300],
      flight: "¥6000–9000",
      note: "5 月是开普敦淡季，五星酒店仅 500-800 元；自驾最自由但保持警惕"
    }
  }]
}, {
  place: "秘鲁马丘比丘",
  region: "南美",
  budget: "$$",
  months: [{
    month: 5,
    highlight: "旱季云雾少徒步绝佳",
    weather: "20°C",
    crowd: "中",
    types: ["nature", "culture"],
    why: "5 月雨季刚结束，马丘比丘的云雾相对稀薄，能见度全年最佳；同时还未进入 6-8 月的旺季高峰，门票相对好买，印加古道徒步也最舒适。",
    experiences: [_x("印加古城", "云雾缭绕中俯瞰失落的山顶之城"), _x("印加古道徒步", "4 天 3 夜世界顶级徒步线路"), _x("瓦伊纳比丘", "陡峭险峰俯瞰整个马丘比丘"), _x("圣谷+彩虹山", "周边印加文化与高山七彩奇观")],
    budgetDetail: {
      daily: [500, 900, 1500],
      flight: "¥12000–15000",
      note: "门票需提前数月预订；高原反应需在库斯科适应 1-2 天"
    }
  }]
}, {
  place: "克罗地亚杜布罗夫尼克",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 5,
    highlight: "6 月人爆炸前的最佳窗口",
    weather: "22°C",
    crowd: "中",
    types: ["culture", "beach"],
    why: "5 月杜布罗夫尼克的海水已能游泳，亚得里亚海呈现最深邃的蓝。游客仅为 7 月《权游》高峰的 40%，古城墙上独自漫步看日落是夏天不可想象的奢侈。",
    experiences: [_x("古城墙漫步", "1.9 公里石墙上的君临城全景"), _x("洛克鲁姆岛", "城墙外 10 分钟船的修道院岛与铁王座"), _x("缆车上 Srđ 山", "俯瞰古城红屋顶与湛蓝大海"), _x("察夫塔特小镇", "更安静的海滨小镇海滨午餐")],
    budgetDetail: {
      daily: [400, 700, 1300],
      flight: "¥5000–8000",
      note: "5 月价格是旺季的 60%；古城内住宿贵，住拉帕德半岛坐巴士进城更划算"
    }
  }]
}, {
  place: "美国犹他",
  region: "北美",
  budget: "$$",
  months: [{
    month: 5,
    highlight: "拱门与峡谷地凉爽",
    weather: "25°C",
    crowd: "中",
    types: ["nature"],
    why: "5 月犹他州沙漠还没进入酷暑——白天 25°C 是徒步拱门和布莱斯峡谷的完美温度。日出日落时的红岩在温和光线下最鲜艳，且 5 月野花点缀沙漠，比纯夏季更有层次。",
    experiences: [_x("精致拱门日落", "犹他标志：独立拱门与红色岩谷"), _x("布莱斯峡谷日出", "上千根红色石林在晨光中燃烧"), _x("锡安天使降临", "悬崖边缘的经典美国国家公园步道"), _x("纪念碑谷", "纳瓦霍保留地的西部电影取景地")],
    budgetDetail: {
      daily: [500, 800, 1400],
      flight: "¥5000–8000（飞盐湖城）",
      note: "5 月犹他州自驾游最佳；国家公园年票 $80 覆盖所有 5 个犹他公园"
    }
  }]
}, {
  place: "格鲁吉亚第比利斯",
  region: "中亚",
  budget: "$",
  months: [{
    month: 5,
    highlight: "花开葡萄园性价比极高",
    weather: "22°C",
    crowd: "低",
    types: ["culture", "food"],
    why: "5 月格鲁吉亚的山谷里野花满坡、葡萄藤抽芽——卡赫季葡萄酒产区的酒庄刚结束春季修剪。第比利斯老城的硫磺浴和教堂免费或极便宜，是欧洲风土+亚洲物价的神奇组合。",
    experiences: [_x("卡赫季葡萄酒之旅", "8000 年酿酒史的酒庄陶罐(Qvevri)品酒"), _x("纳里卡拉堡垒", "俯瞰第比利斯彩色老城的古老要塞"), _x("硫磺浴", "老城圆顶砖浴室的天然温泉泡浴"), _x("卡兹别克圣三一教堂", "海拔 2170 米雪山教堂的孤独美")],
    budgetDetail: {
      daily: [200, 400, 700],
      flight: "¥4000–6000",
      note: "格鲁吉亚消费极低，酒庄品酒 50-100 元就能喝到上好萨别拉维"
    }
  }]
}, {
  place: "越南沙巴",
  region: "东南亚",
  budget: "$",
  months: [{
    month: 5,
    highlight: "梯田水满与山地部落",
    weather: "22°C",
    crowd: "低",
    types: ["nature", "culture"],
    why: "5 月沙巴梯田开始放水——数千层水稻田变成天空之镜，日出时反射金色晨光。此时是插秧季的开始，苗族和红瑶族妇女在梯田中劳作的传统画面全年最集中。",
    experiences: [_x("番西邦峰缆车", "印度支那最高峰 3143 米的天门云海"), _x("猫猫村徒步", "苗寨梯田与染布坊的文化徒步"), _x("沙巴周末集市", "红瑶族、花苗族的传统服饰与草药市集"), _x("银瀑布", "山间瀑布与竹桥结合的清凉步道")],
    budgetDetail: {
      daily: [150, 300, 600],
      flight: "¥1500–2500（飞河内转夜间火车）",
      note: "5 月水梯田最美但偶有阵雨；夜间卧铺火车是河内-沙巴最经典交通"
    }
  }]
}, {
  place: "摩洛哥舍夫沙万",
  region: "非洲",
  budget: "$",
  months: [{
    month: 5,
    highlight: "蓝色小镇与里夫山",
    weather: "24°C",
    crowd: "低",
    types: ["culture"],
    why: "5 月舍夫沙万的蓝色在春季阳光下最鲜艳——游客还不多的窗口里，蓝色巷弄中的猫咪和花盆是纯享版的拍照体验。里夫山脉徒步也不热不冷。",
    experiences: [_x("蓝色麦地那", "蓝色巷弄中的无尽拍照与漫步"), _x("西班牙清真寺日落", "山顶俯瞰蓝色小镇全景的日落"), _x("里夫山脉徒步", "柏柏尔村落与野花盛开的山路"), _x("摩洛哥烹饪课", "在蓝色庭院中学做塔吉锅与蒸粗麦粉")],
    budgetDetail: {
      daily: [200, 400, 700],
      flight: "¥5000–7000（飞得土安转）",
      note: "舍夫沙万住宿便宜，200-400 元住进蓝色庭院民宿"
    }
  }]
}, {
  place: "印度喀拉拉",
  region: "南亚",
  budget: "$",
  months: [{
    month: 5,
    highlight: "季风前的回水船屋",
    weather: "30°C",
    crowd: "低",
    types: ["nature", "food"],
    why: "5 月喀拉拉季风来临前——回水区(Backwaters)的棕榈绿最饱和，船屋在水道中漂过稻田与村庄。阿育吠陀按摩的最佳季节（湿度高毛孔张开），是南印度最松弛的体验。",
    experiences: [_x("阿勒皮船屋", "传统 Ketuvallam 船屋在椰林水道中的一夜"), _x("蒙纳尔茶园", "海拔 1600 米的翠绿茶山与香料园"), _x("阿育吠陀按摩", "传承 5000 年的草药精油疗法"), _x("科钦中国渔网", "郑和时代的悬臂渔网与殖民建筑")],
    budgetDetail: {
      daily: [150, 350, 700],
      flight: "¥3000–4500",
      note: "5 月是喀拉拉最便宜月，船屋住宿含三餐仅 300-600 元"
    }
  }]
}, {
  place: "中国香格里拉",
  region: "东亚",
  budget: "$",
  months: [{
    month: 5,
    highlight: "高原杜鹃花海与雪山",
    weather: "15°C",
    crowd: "中",
    types: ["nature"],
    why: "5 月下旬香格里拉的杜鹃花海从普达措一直铺到梅里雪山脚下——粉色、白色、紫色的高山杜鹃在林间齐放。雪山未化的雪顶映衬花海，是滇西北一年最美的 2 周。",
    experiences: [_x("普达措国家公园", "属都湖草甸上满山杜鹃的栈道"), _x("松赞林寺", "小布达拉宫的金顶与僧侣早课"), _x("梅里雪山飞来寺日出", "日照金山在杜鹃花季的最佳观赏"), _x("独克宗古城", "世界最大转经筒与藏式老城")],
    budgetDetail: {
      daily: [250, 450, 800],
      flight: "¥1000–2000（飞香格里拉）",
      note: "5 月下旬杜鹃盛开；高原昼夜温差大，备足保暖衣物"
    }
  }]
},
// ════════════════ 六月 ════════════════
{
  place: "加拿大落基山",
  region: "北美",
  budget: "$$$",
  months: [{
    month: 6,
    highlight: "班夫高山湖泊融化",
    weather: "22°C",
    crowd: "中",
    types: ["nature"],
    why: "6 月落基山雪线刚开始消退，路易斯湖、梦莲湖的冰开始融化呈现标志性的绿宝石色。游客比 7-8 月旺季少 30%，野花开始覆盖山谷。",
    experiences: [_x("路易斯湖", "群山环绕的绿宝石湖与维多利亚冰川"), _x("梦莲湖", "十峰山倒影中的高山湖泊"), _x("冰原大道", "世界最美自驾公路之一"), _x("班夫小镇", "温泉、缆车与北美野生动物")],
    budgetDetail: {
      daily: [700, 1200, 2000],
      flight: "¥6000–9000",
      note: "国家公园营地需提前 4 个月预订；自驾需备防熊喷雾"
    }
  }]
}, {
  place: "希腊科孚岛",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 6,
    highlight: "爱奥尼亚海早夏",
    weather: "27°C",
    crowd: "中",
    types: ["beach"],
    why: "6 月科孚岛进入早夏——爱奥尼亚海温暖如浴，威尼斯建筑群在蓝天下熠熠生辉。岛上游客密度仅为圣托里尼的 1/4，但海水和沙滩毫不逊色，是希腊隐藏的宝石。",
    experiences: [_x("帕莱欧卡斯提撒海滩", "六湾环绕的碧蓝海湾浮潜"), _x("科孚老城", "威尼斯堡垒与英国宫殿的世界遗产"), _x("西达尔运河", "爱奥尼亚海与泻湖的隐秘水道"), _x("阿喀琉斯宫", "茜茜公主的希腊神话主题宫殿")],
    budgetDetail: {
      daily: [400, 700, 1300],
      flight: "¥4500–7000",
      note: "6 月中旬前价格实惠，下旬开始涨；科孚消费低于圣托里尼 30%"
    }
  }]
}, {
  place: "英国伦敦",
  region: "欧洲",
  budget: "$$$",
  months: [{
    month: 6,
    highlight: "皇家阿斯科特赛马",
    weather: "20°C",
    crowd: "高",
    types: ["culture", "festival"],
    why: "6 月伦敦进入极致夏季——日照长达 17 小时，皇家阿斯科特赛马会是英式优雅的巅峰(帽子与礼服)。白金汉宫的皇家卫兵换岗在阳光下最盛大。",
    experiences: [_x("皇家阿斯科特赛马", "英伦帽子文化与顶级赛马的社交盛事"), _x("泰晤士河畔", "大本钟、伦敦眼与塔桥的河畔漫步"), _x("大英博物馆", "罗塞塔石碑与帕特农雕塑免费参观"), _x("西区音乐剧", "《歌剧魅影》或《悲惨世界》的夜场")],
    budgetDetail: {
      daily: [700, 1200, 2200],
      flight: "¥5000–7500",
      note: "6 月伦敦酒店价高，住 Zone 2-3 坐地铁进城可省 30%"
    }
  }]
}, {
  place: "日本冲绳",
  region: "东亚",
  budget: "$$",
  months: [{
    month: 6,
    highlight: "梅雨末海水最清澈",
    weather: "30°C",
    crowd: "中",
    types: ["beach"],
    why: "6 月下旬冲绳梅雨收尾——海水透明度达到全年最高（可达 50 米），座间味岛和阿嘉岛的珊瑚礁与海龟在玻璃般的海水下清晰可见。是冲绳潜水最佳月份。",
    experiences: [_x("座间味岛浮潜", "与海龟同游的庆良间蓝色水域"), _x("美丽海水族馆", "世界最大水槽中的鲸鲨"), _x("古宇利大桥", "跨海大桥的心形岩与翡翠海"), _x("首里城", "琉球王国世界遗产的修复与展望")],
    budgetDetail: {
      daily: [500, 800, 1400],
      flight: "¥2500–4000",
      note: "6 月梅雨季末可能有阵雨，下旬为佳；冲绳建议租车最自由"
    }
  }]
}, {
  place: "斯洛文尼亚布莱德",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 6,
    highlight: "湖心岛与教堂钟声",
    weather: "25°C",
    crowd: "低",
    types: ["nature"],
    why: "6 月布莱德湖进入早夏——朱利安阿尔卑斯山的雪融水汇入湖中呈现最纯的蓝绿色。划船登湖心岛的朝圣教堂敲钟 3 次许愿，是欧洲最浪漫又最低调的高山湖泊体验。",
    experiences: [_x("普莱特纳船划湖心岛", "乘传统木船登上斯洛文尼亚唯一的岛"), _x("布莱德城堡", "悬崖上的千年城堡俯瞰湖心岛"), _x("文特加峡谷", "木质栈道穿越碧蓝激流的峡谷"), _x("博希尼湖", "比布莱德更大的野生冰川湖")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥4500–7000（飞卢布尔雅那）",
      note: "斯洛文尼亚消费低于西欧，是欧洲性价比最高的自然目的地之一"
    }
  }]
}, {
  place: "挪威罗弗敦群岛",
  region: "北欧",
  budget: "$$$",
  months: [{
    month: 6,
    highlight: "渔村与午夜阳光徒步",
    weather: "15°C",
    crowd: "低",
    types: ["nature"],
    why: "6 月罗弗敦进入午夜阳光——24 小时日照可在任何时间徒步，Reinebringen 山顶俯瞰红色渔村与峡湾交错的画面是北极圈最震撼的风景。此时鱼干架上的鳕鱼季节刚过，渔村最上镜。",
    experiences: [_x("Reinebringen 登顶", "俯拍挪威最美的渔村与峡湾全景"), _x("亨宁斯韦尔", "足球场在群岛间的北极最美球场"), _x("海鹰峡湾橡皮艇", "近距离看白尾海雕与海豹"), _x("Å 村", "罗弗敦最南端的传统红色渔村")],
    budgetDetail: {
      daily: [800, 1400, 2500],
      flight: "¥5500–8000（飞博德转渡轮）",
      note: "罗弗敦住宿稀少需提前 4 个月订；Rorbuer 渔屋是特色住宿"
    }
  }]
}, {
  place: "美国黄石",
  region: "北美",
  budget: "$$",
  months: [{
    month: 6,
    highlight: "野牛幼崽与温泉群",
    weather: "20°C",
    crowd: "高",
    types: ["wildlife", "nature"],
    why: "6 月黄石公园万物复苏——野牛幼崽在草原上奔跑，大棱镜温泉在温和气温下蒸汽最少、颜色最鲜艳。熊、狼、麋鹿幼崽也在此月最活跃，是黄石野生动物季的巅峰。",
    experiences: [_x("老忠实间歇泉", "每 90 分钟准时喷发的世界最著名间歇泉"), _x("大棱镜温泉", "美国最大温泉的彩虹圈色彩"), _x("拉马山谷观狼", "黎明和黄昏看灰狼群狩猎"), _x("黄石大峡谷", "下瀑布在峡谷中的壮观景象")],
    budgetDetail: {
      daily: [500, 900, 1600],
      flight: "¥6000–9000",
      note: "6 月黄石旺季，园内住宿需提前一年订；住西黄石小镇是替代方案"
    }
  }, {
    month: 9,
    highlight: "秋意温泉与野牛迁徙",
    weather: "18°C",
    crowd: "低",
    types: ["nature", "wildlife"],
    why: "9 月黄石游客骤降 50%——暑气退去后的温泉区蒸汽在秋凉中更壮观，麋鹿发情季的鸣叫声回荡山谷。野牛群开始从高山草甸迁徙，是黄石最宁静也最美的月份。",
    experiences: [_x("猛犸温泉", "秋季晨雾中的梯田状石灰华温泉"), _x("拉马山谷麋鹿", "听公麋鹿的发情号角声"), _x("大棱镜鸟瞰", "秋季无蒸汽遮挡的温泉全景"), _x("黄石湖皮划艇", "在安静湖面上划向偏远温泉")],
    budgetDetail: {
      daily: [400, 700, 1300],
      flight: "¥6000–9000",
      note: "9 月黄石住宿好订许多；秋季路况好但偶有早雪需关注"
    }
  }]
}, {
  place: "蒙古国乌兰巴托",
  region: "中亚",
  budget: "$$",
  months: [{
    month: 6,
    highlight: "草原最绿与游牧生活",
    weather: "22°C",
    crowd: "低",
    types: ["nature", "culture"],
    why: "6 月蒙古草原在入夏雨后最绿——从乌兰巴托到鄂尔浑河谷的草原是无边的绿色绒毯。那达慕节前游客极少，住在真正的游牧蒙古包中体验马奶酒与牧羊是独一无二的生活体验。",
    experiences: [_x("特勒吉国家公园骑马", "花岗岩奇石间的蒙古马草原驰骋"), _x("游牧蒙古包住宿", "跟牧民家庭放牧、挤马奶、烤全羊"), _x("甘丹寺", "蒙古最大藏传佛教寺院的早课"), _x("鄂尔浑河谷", "世界遗产的千年草原与突厥碑文")],
    budgetDetail: {
      daily: [300, 500, 900],
      flight: "¥3000–5000",
      note: "蒙古 6 月草原最美，建议包车+向导约 400-600 元/天"
    }
  }]
}, {
  place: "土耳其费特希耶",
  region: "中东",
  budget: "$",
  months: [{
    month: 6,
    highlight: "滑翔伞与死海漂浮",
    weather: "30°C",
    crowd: "中",
    types: ["nature", "beach"],
    why: "6 月费特希耶的海湾呈现土耳其蓝的最深色——巴巴达山滑翔伞飞到 Ölüdeniz 蓝礁湖上空是地球上最接近飞翔的体验。利西亚之路的徒步风景也在此月进入最佳状态。",
    experiences: [_x("巴巴达山滑翔伞", "从 1960 米飞向蓝绿泻湖的极致视觉"), _x("Ölüdeniz 蓝礁湖", "土耳其死海的平静碧蓝水域"), _x("蝴蝶谷", "只能乘船或徒步到达的悬崖峡谷"), _x("卡亚柯伊鬼村", "希腊-土耳其人口交换后的荒废石屋群")],
    budgetDetail: {
      daily: [250, 450, 900],
      flight: "¥4000–6000",
      note: "土耳其里拉持续贬值对游客极有利；滑翔伞约 500-800 元含照片视频"
    }
  }]
},
// ════════════════ 七月 ════════════════
{
  place: "塞伦盖蒂",
  region: "非洲",
  budget: "$$$",
  months: [{
    month: 7,
    highlight: "震撼角马大迁徙",
    weather: "25°C",
    crowd: "中",
    types: ["wildlife", "nature"],
    why: "七月是角马跨越马拉河的核心窗口——百万兽群、鳄鱼伏击、扬尘日落，地球最壮观的野生动物剧场。错过这个月，就要再等一年。",
    experiences: [_x("马拉河观渡", "角马生死跨河，鳄鱼伏击的震撼时刻"), _x("热气球猎游", "清晨升空俯瞰大草原日出"), _x("马赛村落", "了解游牧民族文化与生活方式"), _x("星空营地", "无光害草原中央的奢华帐篷")],
    budgetDetail: {
      daily: [1500, 2500, 5000],
      flight: "¥8000–11000",
      note: "必须接种黄热病疫苗，Safari 营地需提前半年预订"
    }
  }]
}, {
  place: "克罗地亚十六湖",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 7,
    highlight: "瀑布水量最丰沛季",
    weather: "23°C",
    crowd: "中",
    types: ["nature"],
    why: "7 月十六湖的水量在春季融雪后达峰——16 个湖泊之间的 90 条瀑布以最大流量倾泻，湖水从翠绿到天蓝分层最明显。木栈道就在瀑布上方，水雾清凉，是欧洲最魔幻的水世界。",
    experiences: [_x("上湖区徒步", "12 个湖泊间木质栈道穿越瀑布群"), _x("下湖区乘船", "科兹亚克湖上的电动船风景"), _x("大瀑布", "克罗地亚最大瀑布的 78 米落差"), _x("拉斯托克水村", "十六湖附近的水磨坊小村庄")],
    budgetDetail: {
      daily: [400, 700, 1300],
      flight: "¥5000–8000",
      note: "7 月旺季建议早上 7 点进园避开人流；门票需提前在线购买"
    }
  }]
}, {
  place: "印尼龙目岛",
  region: "东南亚",
  budget: "$$",
  months: [{
    month: 7,
    highlight: "比巴厘安静的潜水海岛",
    weather: "29°C",
    crowd: "低",
    types: ["beach"],
    why: "7 月龙目岛干季巅峰——吉利三岛的海水能见度 30+ 米，海龟数量远超巴厘岛。林贾尼火山的登山步道全开，山顶日出俯瞰整个龙目海峡是印尼最佳徒步体验之一。",
    experiences: [_x("吉利群岛浮潜", "三岛之间的海龟高速公路浮潜"), _x("林贾尼火山登顶", "3726 米活火山的星光日出与火山湖"), _x("库塔海滩冲浪", "南龙目未开发的冲浪秘境"), _x("粉红沙滩", "铁锈红珊瑚粉末形成的粉色沙滩")],
    budgetDetail: {
      daily: [300, 550, 1000],
      flight: "¥2500–4000",
      note: "龙目岛消费约为巴厘岛 60%；林贾尼徒步需请向导 2 天 1 夜"
    }
  }]
}, {
  place: "西班牙潘普洛纳",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 7,
    highlight: "圣费尔明奔牛节",
    weather: "26°C",
    crowd: "高",
    types: ["festival", "culture"],
    why: "7 月潘普洛纳奔牛节(San Fermín)是海明威笔下的狂野盛典——公牛在窄巷中追逐白衣红巾人群，全城七天不间断的酒精与烟火。是西班牙最具肾上腺素的节庆。",
    experiences: [_x("奔牛", "每天早 8 点 825 米窄巷追逐的公牛与跑者"), _x("斗牛场", "傍晚斗牛表演与全场红巾挥舞"), _x("城堡广场", "全城派对核心的管乐队与 Sangria"), _x("纳瓦拉酒庄", "奔牛节间隙的本地葡萄酒初探")],
    budgetDetail: {
      daily: [500, 900, 1800],
      flight: "¥5000–7500（飞毕尔巴鄂转）",
      note: "奔牛节住宿需提前半年；跑牛有真实风险，需清醒评估"
    }
  }]
}, {
  place: "曼谷",
  region: "东南亚",
  budget: "$",
  months: [{
    month: 7,
    highlight: "街头小吃与夜市天堂",
    weather: "30°C",
    crowd: "中",
    types: ["food", "culture"],
    why: "7 月曼谷雨季中的阵雨通常在傍晚 1 小时内结束——洗过的城市更凉爽，街头炒河粉和烤串在雨后空气中香气最浓。此时是东南亚最便宜的国际都市，用一顿米其林摊贩开启美食之旅。",
    experiences: [_x("唐人街美食夜巡", "耀华力路的碳烤海鲜与泰式蚵仔煎"), _x("大皇宫+玉佛寺", "泰国王室的镀金圣殿与翡翠佛"), _x("乍都乍周末市场", "全球最大周末集市的 15000 个摊位"), _x("昭披耶河渡轮", "水上巴士看黎明寺与河畔生活")],
    budgetDetail: {
      daily: [200, 400, 800],
      flight: "¥1500–2500",
      note: "7 月曼谷是全年最便宜月，五星酒店仅 400-600 元；轻轨+突突车最方便"
    }
  }]
}, {
  place: "加拿大爱德华王子岛",
  region: "北美",
  budget: "$$",
  months: [{
    month: 7,
    highlight: "龙虾季与红土海岸",
    weather: "24°C",
    crowd: "低",
    types: ["food", "nature"],
    why: "7 月 PEI 龙虾捕捞季正酣——码头直接买刚上岸的龙虾，价格仅为餐厅 1/3。红土悬崖与绿色田野对照、安妮小屋的田园风光是加拿大最温柔的海岛。",
    experiences: [_x("码头龙虾盛宴", "渔民码头的水煮龙虾+黄油卷"), _x("卡文迪什沙滩", "红色砂岩悬崖与白沙海湾"), _x("绿山墙安妮故居", "《红发安妮》的原型农场与森林"), _x("联邦大桥", "13 公里跨海大桥的驾车之旅")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥6000–9000（飞夏洛特敦）",
      note: "7 月是 PEI 最美月但住宿有限，建议提前 3 个月订 B&B"
    }
  }]
}, {
  place: "阿尔巴尼亚里维埃拉",
  region: "欧洲",
  budget: "$",
  months: [{
    month: 7,
    highlight: "未开发海岸与超低物价",
    weather: "30°C",
    crowd: "低",
    types: ["beach"],
    why: "7 月阿尔巴尼亚的 Ionian 海岸——同属爱奥尼亚海，海水与希腊科孚岛同款但物价仅 1/3。Ksamil 的白色沙滩和蓝洞未被大众旅游覆盖，是欧洲最后的海滩秘境。",
    experiences: [_x("Ksamil 海滩", "阿尔巴尼亚的马尔代夫白沙滩"), _x("布特林特考古遗址", "希腊-罗马-拜占庭的世界遗产古城"), _x("蓝眼泉", "深达 50 米的碧蓝喀斯特泉"), _x("希马拉老城", "山海之间的奥斯曼石屋古镇")],
    budgetDetail: {
      daily: [200, 400, 700],
      flight: "¥4500–6500（飞地拉那）",
      note: "阿尔巴尼亚是欧洲消费最低国之一，海滩海鲜大餐人均 50-80 元"
    }
  }]
},
// ════════════════ 八月 ════════════════
{
  place: "玻利维亚乌尤尼盐沼",
  region: "南美",
  budget: "$$",
  months: [{
    month: 8,
    highlight: "旱季纯白天空之镜",
    weather: "15°C",
    crowd: "低",
    types: ["nature"],
    why: "8 月是乌尤尼旱季中段——盐沼水分蒸发后呈现完美的六边形结晶，无垠白色平面如同天空之镜。星空季也开始，无光害的盐漠中可看到银河铺满天际。",
    experiences: [_x("日出天空之镜", "湿润盐沼上水天倒影完美对称"), _x("仙人掌岛", "盐漠中心的绿洲与巨型仙人掌"), _x("火山+冒泡热泉", "周边高原的彩色湖与活火山"), _x("星空摄影", "无光害盐漠中的银河大片")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥13000–16000",
      note: "海拔 3650 米需慢动作；建议从拉巴斯进入并先适应"
    }
  }]
}, {
  place: "芬兰拉普兰",
  region: "北欧",
  budget: "$$$",
  months: [{
    month: 8,
    highlight: "湖区桑拿与极昼驯鹿",
    weather: "20°C",
    crowd: "低",
    types: ["nature"],
    why: "8 月拉普兰极昼最后一个月——午夜阳光下的松林徒步、湖中桑拿后跳入冷水是在芬兰才能理解的极致享受。驯鹿群在山地悠闲觅食，北欧夏日没有任何蚊虫外的烦恼。",
    experiences: [_x("湖区木屋桑拿", "传统烟熏桑拿+跳湖的芬兰式放松"), _x("驯鹿农场", "萨米人的驯鹿放牧与手工艺"), _x("乌尔霍凯科宁国家公园", "北极圈内的荒野徒步"), _x("午夜阳光皮划艇", "在永昼的湖面上划艇看夕阳不落")],
    budgetDetail: {
      daily: [700, 1200, 2000],
      flight: "¥6000–9000",
      note: "8 月拉普兰是性价比最高的北欧自然目的地；蚊子需防但可控"
    }
  }]
}, {
  place: "马赛马拉",
  region: "非洲",
  budget: "$$$",
  months: [{
    month: 8,
    highlight: "天国之渡猛兽捕猎",
    weather: "24°C",
    crowd: "中",
    types: ["wildlife"],
    why: "8 月马赛马拉的角马渡河进入高峰——马拉河每日上演生死跨越，鳄鱼伏击和狮子狩猎的频率全年最高。草原被 200 万头蹄类动物覆盖，是野生动物摄影师的终极梦想。",
    experiences: [_x("马拉河渡口守候", "在河湾处等待角马群冲入河中的震撼"), _x("大猫追踪", "草原上狮群、花豹与猎豹的集中猎游"), _x("马赛族勇士徒步", "跟着马赛战士学习丛林追踪"), _x("热气球香槟早餐", "俯瞰百万兽群的日出飞行")],
    budgetDetail: {
      daily: [1500, 2500, 5000],
      flight: "¥8000–11000",
      note: "7-8 月是马赛马拉最旺季，营地需提前半年以上预订"
    }
  }]
}, {
  place: "苏格兰高地",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 8,
    highlight: "石楠花紫与威士忌",
    weather: "17°C",
    crowd: "中",
    types: ["nature", "food"],
    why: "8 月苏格兰高地的石楠花(Heather)盛放——整个高地披上紫色地毯，是全年色彩最饱和的月份。爱丁堡军乐节也在 8 月举行，苏格兰裙和风笛在城堡前震撼上演。",
    experiences: [_x("爱丁堡军乐节", "城堡前的苏格兰风笛方阵与烟火"), _x("斯凯岛", "老人峰、仙女池与奎雷因的壮丽徒步"), _x("斯佩塞威士忌之路", "苏格兰一半以上酒厂的格兰花格与麦卡伦"), _x("尼斯湖", "搭船在苏格兰最神秘的水域寻水怪")],
    budgetDetail: {
      daily: [500, 900, 1600],
      flight: "¥5000–7500",
      note: "8 月爱丁堡军乐节期间住宿极度紧张，需提前半年订"
    }
  }]
}, {
  place: "中国西藏",
  region: "东亚",
  budget: "$$",
  months: [{
    month: 8,
    highlight: "高原凉爽与藏历节",
    weather: "18°C",
    crowd: "中",
    types: ["culture", "nature"],
    why: "8 月西藏气温最温和——白天 18-22°C，是全年唯一可以单衣游布达拉宫的月份。雪顿节(藏历 6 月 30 日)晒大佛、酸奶宴、藏戏同时上演，是西藏文化密度最高的时刻。",
    experiences: [_x("雪顿节晒佛", "哲蚌寺巨大唐卡在晨曦中展开的震撼"), _x("纳木错/羊卓雍措", "夏季圣湖碧蓝与雪山倒影"), _x("布达拉宫", "免寒风中攀爬的夏日内殿参观"), _x("罗布林卡", "达赖喇嘛夏宫的藏戏与酸奶宴")],
    budgetDetail: {
      daily: [300, 500, 900],
      flight: "¥1500–3000",
      note: "雪顿节在藏历 6 月底 7 月初(公历约 8 月)；入藏函需提前办"
    }
  }]
}, {
  place: "爱沙尼亚塔林",
  region: "东欧",
  budget: "$",
  months: [{
    month: 8,
    highlight: "中世纪老城高性价比",
    weather: "22°C",
    crowd: "低",
    types: ["culture"],
    why: "8 月塔林的汉萨同盟中世纪老城在波罗的海阳光下最迷人——完整城墙、尖顶教堂与石板路组成欧洲保存最好的中世纪城市。物价仅为赫尔辛基 1/3，渡轮 2 小时可达。",
    experiences: [_x("塔林老城城墙", "欧洲最完整的中世纪城墙与塔楼"), _x("托姆比亚城堡", "爱沙尼亚议会与东正教大教堂"), _x("卡德里奥宫", "彼得大帝为叶卡捷琳娜建的巴洛克夏宫"), _x("老城地下隧道", "中世纪商人通道与地窖的暗黑之旅")],
    budgetDetail: {
      daily: [250, 450, 800],
      flight: "¥5000–7000（飞赫尔辛基转渡轮）",
      note: "塔林是欧洲性价比最高的中世纪古城；渡轮从赫尔辛基 2 小时"
    }
  }]
}, {
  place: "印尼科莫多",
  region: "东南亚",
  budget: "$$",
  months: [{
    month: 8,
    highlight: "科莫多龙与粉红沙滩",
    weather: "28°C",
    crowd: "中",
    types: ["wildlife", "beach"],
    why: "8 月科莫多国家公园进入干季巅峰——科莫多龙在旱季最活跃（交配季），粉红沙滩在阳光直射下最鲜艳。Manta 魔鬼鱼在温暖海域大量出没，浮潜即见。",
    experiences: [_x("科莫多龙追踪", "在野外看世界最大蜥蜴的原始形态"), _x("粉红沙滩浮潜", "红珊瑚碎沙的粉色海滩与热带鱼"), _x("帕达尔岛登顶", "四色海湾的全景明信片视角"), _x("Manta Point", "与翼展 4 米的魔鬼鱼同游")],
    budgetDetail: {
      daily: [500, 800, 1500],
      flight: "¥4000–6000（飞拉布汉巴焦）",
      note: "8 月是科莫多最佳月但在印尼属旺季；务必带向导看龙"
    }
  }]
}, {
  place: "美国阿拉斯加",
  region: "北美",
  budget: "$$$",
  months: [{
    month: 8,
    highlight: "观熊冰川与极光初现",
    weather: "18°C",
    crowd: "中",
    types: ["wildlife", "nature"],
    why: "8 月阿拉斯加棕熊在鲑鱼洄游河段最集中——卡特迈国家公园的 Brooks Falls 可同时看到 5-6 头熊捕鱼。极光季在月末开始，是熊与极光同框的罕见月。",
    experiences: [_x("Brooks Falls 观熊", "棕熊在瀑布顶等跳跃鲑鱼的经典画面"), _x("德纳里国家公园", "北美洲最高峰下的驯鹿与灰熊"), _x("基奈峡湾游船", "冰川崩塌与座头鲸群"), _x("极光初现", "8 月末北境暗夜中的第一道绿光")],
    budgetDetail: {
      daily: [900, 1600, 3000],
      flight: "¥7000–10000",
      note: "卡特迈需乘水上飞机前往，需提前 6 个月预约"
    }
  }]
}, {
  place: "格鲁吉亚卡兹别克",
  region: "高加索",
  budget: "$",
  months: [{
    month: 8,
    highlight: "高加索山与教堂徒步",
    weather: "20°C",
    crowd: "低",
    types: ["nature", "culture"],
    why: "8 月卡兹别克山的 Gergeti 圣三一教堂在野花与雪顶之间最出片——海拔 2170 米的孤独教堂是格鲁吉亚最神圣的画面。Svaneti 的高加索村落徒步也在夏季全开。",
    experiences: [_x("Gergeti 教堂日出", "雪山之巅的 14 世纪孤独石教堂"), _x("斯瓦涅季塔楼村", "高加索山区的 UNESCO 千年防御塔"), _x("第比利斯老城", "硫磺浴、木阳台与纳里卡拉堡垒"), _x("卡赫季酒庄", "世界最早酿酒国陶罐(Qvevri)酿酒")],
    budgetDetail: {
      daily: [200, 400, 700],
      flight: "¥4000–6000",
      note: "格鲁吉亚超低消费，四驱车上教堂约 100 元；徒步可省车费"
    }
  }]
}, {
  place: "加拿大育空",
  region: "北美",
  budget: "$$$",
  months: [{
    month: 8,
    highlight: "午夜太阳与荒野探险",
    weather: "18°C",
    crowd: "极低",
    types: ["nature"],
    why: "8 月育空夏季最后一个月——克朗代克公路穿越针叶林与湖泊，北极圈内的荒野只有风声和鸟鸣。极光在月末出现，是北美最后真正的荒野体验。",
    experiences: [_x("克朗代克公路", "世界顶级自驾道路穿越极地荒野"), _x("克卢恩国家公园", "加拿大最高峰洛根山下的冰川湖"), _x("道森城", "淘金热时代的木板路与北极酒吧"), _x("育空河独木舟", "在北美最长未筑坝河流漂 3-5 天")],
    budgetDetail: {
      daily: [800, 1300, 2200],
      flight: "¥8000–12000（飞怀特霍斯）",
      note: "育空地广人稀，自驾需备卫星电话和备用轮胎"
    }
  }]
},
// ════════════════ 九月 ════════════════
{
  place: "慕尼黑",
  region: "欧洲",
  budget: "$$$",
  months: [{
    month: 9,
    highlight: "慕尼黑啤酒节全球最大",
    weather: "18°C",
    crowd: "极高",
    types: ["festival", "food"],
    why: "9 月下旬到 10 月初是慕尼黑啤酒节窗口——全球最大的民俗节庆，600 万人涌入特蕾西娅草坪，传统帐篷里的巴伐利亚啤酒、铜管乐与皮裤白裙是德国最具代表性的文化场景。",
    experiences: [_x("特蕾西娅草坪", "啤酒节主会场，14 个传统帐篷各有特色"), _x("玛利亚广场", "市政厅木偶钟与慕尼黑老城"), _x("宁芬堡宫", "巴伐利亚国王的洛可可夏宫"), _x("新天鹅堡日游", "前往迪士尼原型的童话城堡")],
    budgetDetail: {
      daily: [700, 1300, 2200],
      flight: "¥5000–7500",
      note: "啤酒节期间住宿提前半年预订，价格翻倍；学几句德语祝酒词更受欢迎"
    }
  }]
}, {
  place: "中国新疆",
  region: "东亚",
  budget: "$$",
  months: [{
    month: 9,
    highlight: "北疆秋色金黄如画",
    weather: "15°C",
    crowd: "高",
    types: ["nature"],
    why: "9 月下旬北疆进入中国最美秋色——喀纳斯与禾木的白桦林在 10 天内从绿变金，雪山与碧湖在金黄衬托下如油画。是中国秋季景观的绝对巅峰。",
    experiences: [_x("喀纳斯湖", "变色湖与金色白桦林的完美搭配"), _x("禾木村日出", "晨雾中的金色白桦与木屋村落"), _x("白哈巴", "中国西北第一村的图瓦人秋色"), _x("可可托海", "额尔齐斯大峡谷的秋季徒步")],
    budgetDetail: {
      daily: [400, 700, 1300],
      flight: "¥3000–5000（飞乌鲁木齐转）",
      note: "9 月底是喀纳斯最旺季，景区住宿需提前 2 个月订；自驾需办边防证"
    }
  }]
}, {
  place: "加拿大魁北克",
  region: "北美",
  budget: "$$",
  months: [{
    month: 9,
    highlight: "枫叶开始与法语城市",
    weather: "20°C",
    crowd: "中",
    types: ["culture", "nature"],
    why: "9 月下旬魁北克的枫叶从北向南开始变色——老魁北克城墙内的法式餐厅与街头音乐家在秋色中更有韵味。Mont-Tremblant 的红叶与法式小镇叠加出独特的北美欧风。",
    experiences: [_x("老魁北克城墙", "北美唯一完整城墙的法语世界遗产"), _x("Mont-Tremblant", "蒙特利尔以北的枫红度假山"), _x("蒙莫朗西瀑布", "高于尼亚加拉的 83 米秋色瀑布"), _x("奥尔良岛", "圣劳伦斯河上的苹果采摘与奶酪")],
    budgetDetail: {
      daily: [500, 800, 1400],
      flight: "¥5000–8000",
      note: "9 月下旬枫叶初红，住宿低于 10 月高峰；需租车更自由"
    }
  }]
}, {
  place: "意大利托斯卡纳",
  region: "欧洲",
  budget: "$$$",
  months: [{
    month: 9,
    highlight: "葡萄收获与松露季",
    weather: "24°C",
    crowd: "中",
    types: ["food", "nature"],
    why: "9 月托斯卡纳葡萄采收季——基安蒂酒庄赤脚踩葡萄的古老丰收仪式开启。白松露开始出现，起伏的丘陵在初秋阳光下呈现最饱满的金色，是美食与风景同时巅峰的月份。",
    experiences: [_x("基安蒂酒庄采收", "参与葡萄采摘与品尝新酒"), _x("圣吉米尼亚诺", "中世纪塔楼之城与世界冠军冰淇淋"), _x("皮恩扎+奥尔恰谷", "世界遗产的丝柏之路与羊乳干酪"), _x("白松露搜寻", "跟随松露猎人与狗在森林中寻宝")],
    budgetDetail: {
      daily: [700, 1200, 2000],
      flight: "¥5000–7500（飞佛罗伦萨）",
      note: "9 月是托斯卡纳美食巅峰，农庄民宿(Agriturismo)是最佳住宿体验"
    }
  }]
}, {
  place: "尼泊尔安纳普尔纳",
  region: "南亚",
  budget: "$",
  months: [{
    month: 9,
    highlight: "雨季后喜马拉雅清晰",
    weather: "22°C",
    crowd: "中",
    types: ["nature"],
    why: "9 月下旬雨季结束——洗涤过的喜马拉雅雪山在空气中饱和度最高，安纳普尔纳环线和 ABC 大本营的徒步条件创全年最佳。空气透明如洗，日照金山震撼度翻倍。",
    experiences: [_x("ABC 安娜普尔纳大本营", "7 天徒步到 4130 米的雪山环绕营地"), _x("博卡拉费瓦湖", "划船看鱼尾峰倒影与滑翔伞"), _x("甘杜克村", "古隆族村落与梯田中的喜马拉雅日出"), _x("布恩山日出", "低难度 3 天到 3210 米的全景日出")],
    budgetDetail: {
      daily: [150, 300, 600],
      flight: "¥3000–4500",
      note: "9 月底雨季收尾，10 月旺季前有短暂完美窗口；向导约 150-200 元/天"
    }
  }]
}, {
  place: "巴西潘塔纳尔",
  region: "南美",
  budget: "$$$",
  months: [{
    month: 9,
    highlight: "湿地野生动物与美洲豹",
    weather: "30°C",
    crowd: "低",
    types: ["wildlife", "nature"],
    why: "9 月潘塔纳尔旱季末——动物聚集在剩余水域，美洲豹在河岸晒太阳的目击率全年最高（几乎 100%）。水豚、凯门鳄与巨型水獭的密度比非洲 Safari 还高。",
    experiences: [_x("美洲豹追踪", "河岸守候世界第三大猫的狩猎"), _x("巨型水獭观察", "水獭家族在透明河水中捕鱼"), _x("骑马穿越湿地", "潘塔纳尔牛仔文化中的沼泽骑行"), _x("夜巡探照灯", "夜间看凯门鳄红眼与夜猴")],
    budgetDetail: {
      daily: [700, 1300, 2500],
      flight: "¥10000–14000",
      note: "9 月是美洲豹目击率最高月；需打黄热病疫苗"
    }
  }]
}, {
  place: "埃塞俄比亚达纳基勒",
  region: "非洲",
  budget: "$$$",
  months: [{
    month: 9,
    highlight: "岩浆湖与外星地貌",
    weather: "35°C",
    crowd: "极低",
    types: ["nature"],
    why: "9 月雨季尾声，达纳基勒洼地的尔塔阿雷火山熔岩湖在夜间最易接近（温度相对温和）。色彩斑斓的硫磺泉、盐沼与外星般的地貌是地球上最不像地球的地方。",
    experiences: [_x("尔塔阿雷熔岩湖", "夜间徒步到火山口看翻滚的岩浆"), _x("达洛尔硫磺泉", "荧光绿和橙色的酸性热泉地貌"), _x("盐驼队", "跟随阿法尔人的骆驼盐队穿越盐沼"), _x("盐湖日落", "白色盐壳上的彩色矿物日落")],
    budgetDetail: {
      daily: [800, 1500, 3000],
      flight: "¥7000–10000",
      note: "达纳基勒需跟团(安全原因)；地球上最热的居住地之一"
    }
  }]
}, {
  place: "克罗地亚伊斯特拉",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 9,
    highlight: "松露节与葡萄酒产区",
    weather: "22°C",
    crowd: "低",
    types: ["food", "culture"],
    why: "9 月伊斯特拉半岛的白松露与黑松露同时进入收获季——莫托文的松露节汇聚全欧顶级食材。马尔瓦西亚葡萄酒在秋日阳光下品鉴，是克罗地亚版的托斯卡纳。",
    experiences: [_x("莫托文松露节", "白松露拍卖与松露意面大赛"), _x("罗维尼老城", "彩色房屋倒映亚得里亚海的渔港"), _x("普拉罗马竞技场", "世界保存最好的罗马竞技场之一"), _x("布里俄尼国家公园", "铁托的私人岛屿动物园与松林")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥5000–8000",
      note: "9 月伊斯特拉人少秋高，松露美食+绝美海景是克罗地亚的隐藏宝藏"
    }
  }]
},
// ════════════════ 十月 ════════════════
{
  place: "伊斯坦布尔",
  region: "中东",
  budget: "$$",
  months: [{
    month: 10,
    highlight: "跨越欧亚凉爽秋日",
    weather: "20°C",
    crowd: "低",
    types: ["culture", "food"],
    why: "10 月伊斯坦布尔秋高气爽——蓝色清真寺与圣索菲亚的排队从夏季 2 小时缩短到 15 分钟。博斯普鲁斯海峡渡轮在秋日夕阳中穿越欧亚大陆，烤栗子与芝麻面包 Simit 在街头温暖飘香。",
    experiences: [_x("蓝色清真寺+圣索菲亚", "两大奇迹建筑的晨光参访"), _x("博斯普鲁斯渡轮", "欧亚之间的海峡日落游"), _x("大巴扎", "4000 家店铺的奥斯曼市场"), _x("加拉达塔日落", "金角湾全景与烤栗子")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥4000–6000",
      note: "10 月是伊斯坦布尔最佳月；土耳其里拉贬值对游客有利"
    }
  }]
}, {
  place: "墨西哥瓦哈卡",
  region: "北美",
  budget: "$$",
  months: [{
    month: 10,
    highlight: "亡灵节前奏与梅斯卡尔",
    weather: "25°C",
    crowd: "中",
    types: ["festival", "culture", "food"],
    why: "10 月瓦哈卡为亡灵节预热——万寿菊开始铺满街巷，梅斯卡尔(Mezcal)酒庄进入龙舌兰收获季。街头已经能看到骷髅装扮与祭坛搭建，是亡灵节前最真实的准备期。",
    experiences: [_x("蒙特阿尔万", "萨波特克文明的山顶金字塔"), _x("梅斯卡尔酒庄", "龙舌兰采收与地坑蒸馏体验"), _x("10/31 亡灵节序幕", "万寿菊花瓣街道与街头音乐会"), _x("瓦哈卡美食市场", "七种摩尔酱与蚱蜢小吃的发源地")],
    budgetDetail: {
      daily: [400, 700, 1200],
      flight: "¥7000–10000",
      note: "亡灵节 11/1-2 日，10 月底抵达可看准备过程且住宿便宜"
    }
  }]
}, {
  place: "尼泊尔",
  region: "南亚",
  budget: "$",
  months: [{
    month: 10,
    highlight: "雪山徒步最清晰",
    weather: "20°C",
    crowd: "高",
    types: ["nature"],
    why: "10 月是尼泊尔徒步季正式开启——季风过后空气透明如洗，安纳普尔纳和珠峰地区的雪山能见度达全年顶峰。国庆假期后的人潮退去，中下旬是性价比徒步最佳窗口。",
    experiences: [_x("安纳普尔纳大环线", "世界上最经典的长途徒步线路"), _x("珠峰大本营 EBC", "近距离朝拜世界之巅的 14 天徒步"), _x("加德满都杜巴广场", "活女神庙与纽瓦丽建筑群"), _x("奇特旺国家公园", "独木舟猎游+独角犀牛与孟加拉虎")],
    budgetDetail: {
      daily: [150, 300, 600],
      flight: "¥3000–4500",
      note: "10 月是徒步最旺季，加德满都飞卢卡拉机票需提前 2 个月"
    }
  }]
}, {
  place: "印度拉贾斯坦",
  region: "南亚",
  budget: "$",
  months: [{
    month: 10,
    highlight: "斋浦尔粉色城与城堡",
    weather: "30°C",
    crowd: "中",
    types: ["culture"],
    why: "10 月拉贾斯坦酷暑退去——斋浦尔、焦特布尔、乌代浦尔的城堡和宫殿在全天候适中的气温中漫步。骆驼节在比卡内尔开始，是全年畅游北印的最佳开端。",
    experiences: [_x("风之宫殿", "斋浦尔粉色砂岩正面的 953 个小窗"), _x("梅兰加尔堡", "焦特布尔蓝色之城上的雄伟石堡"), _x("皮丘拉湖宫殿", "乌代浦尔湖中央的泰姬陵同款大理石"), _x("塔尔沙漠骆驼骑行", "杰伊瑟尔梅尔的金色沙丘沙漠露营")],
    budgetDetail: {
      daily: [200, 400, 800],
      flight: "¥3500–5000",
      note: "10 月拉贾斯坦是印度性价比最高的旅行区域；火车 AC 舱舒适便宜"
    }
  }]
}, {
  place: "阿曼马斯喀特",
  region: "中东",
  budget: "$$",
  months: [{
    month: 10,
    highlight: "被低估的中东明珠",
    weather: "32°C",
    crowd: "低",
    types: ["culture", "nature"],
    why: "10 月马斯喀特从夏季高温中解脱——大清真寺的水晶吊灯与波斯地毯、Mutrah 集市的乳香香气是真实的一千零一夜。没有迪拜的喧嚣，是中东最优雅的秘境。",
    experiences: [_x("苏丹卡布斯清真寺", "世界最大的水晶吊灯与手工波斯地毯"), _x("Mutrah 集市", "乳香、香料与阿曼银饰的传统市场"), _x("瓦迪沙布峡谷", "碧蓝水潭与洞穴的徒步探险"), _x("瓦希巴沙漠", "贝都因营地与红色沙丘星空")],
    budgetDetail: {
      daily: [400, 700, 1300],
      flight: "¥4500–6500",
      note: "阿曼免签；10 月是阿曼最佳月，气温回落到可以户外活动"
    }
  }]
}, {
  place: "美国新英格兰",
  region: "北美",
  budget: "$$$",
  months: [{
    month: 10,
    highlight: "枫叶大道与苹果采摘",
    weather: "15°C",
    crowd: "高",
    types: ["nature", "culture"],
    why: "10 月初新英格兰的红叶进入高峰——佛蒙特 100 号公路、新罕布什尔白山国家森林的红枫与白教堂构成美国最经典的秋色画面。苹果酒甜甜圈与南瓜田是附加的季节限定体验。",
    experiences: [_x("Kancamagus 公路", "新罕布什尔 34 英里无广告牌的红叶公路"), _x("佛蒙特 100 号公路", "白教堂、廊桥与枫红交织"), _x("苹果采摘", "家庭农场的苹果酒热甜甜圈"), _x("波士顿自由之路", "16 个美国独立战争历史遗址")],
    budgetDetail: {
      daily: [600, 1100, 2000],
      flight: "¥5000–8000",
      note: "红叶峰值约 10 月第一二周；佛蒙特的 B&B 需提前 3 个月订"
    }
  }]
}, {
  place: "澳大利亚乌鲁鲁",
  region: "大洋洲",
  budget: "$$$",
  months: [{
    month: 10,
    highlight: "巨石日落与原住民文化",
    weather: "30°C",
    crowd: "低",
    types: ["nature", "culture"],
    why: "10 月乌鲁鲁白天温和——巨岩在日出和日落时呈现深红到紫的变色比夏季更稳定。原住民阿南古人的点画工坊和星光晚宴在旱季蓝天下的沙漠中不可错过。",
    experiences: [_x("乌鲁鲁日出", "晨光中巨岩从灰色变成炽红的全过程"), _x("寂静之声晚宴", "沙漠星空下的自助晚宴与南十字星"), _x("卡塔丘塔风之谷", "36 块巨岩组成的徒步峡谷"), _x("原住民点画工坊", "阿南古人手把手教沙漠符号画")],
    budgetDetail: {
      daily: [700, 1300, 2500],
      flight: "¥6000–9000",
      note: "乌鲁鲁住宿有限(Ayers Rock Resort)，需提前 2-3 个月预订"
    }
  }]
}, {
  place: "德国巴伐利亚",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 10,
    highlight: "新天鹅堡与阿尔卑斯",
    weather: "12°C",
    crowd: "中",
    types: ["culture", "nature"],
    why: "10 月巴伐利亚的阿尔卑斯山麓秋色正浓——新天鹅堡在红叶与雪顶中呈现最童话的画面。十月节收尾后的啤酒花园更安静，烤猪肘和椒盐卷饼在秋凉中更暖胃。",
    experiences: [_x("新天鹅堡", "玛丽安桥上的秋季童话城堡全景"), _x("国王湖", "德国最深湖的电动船与回音壁"), _x("楚格峰", "德国最高峰的缆车与秋色全景"), _x("贝希特斯加登", "鹰巢与盐矿的历史之旅")],
    budgetDetail: {
      daily: [500, 800, 1400],
      flight: "¥5000–7500（飞慕尼黑）",
      note: "10 月中旬秋色最佳；新天鹅堡需提前在线预约时间段"
    }
  }]
}, {
  place: "日本北海道大雪山",
  region: "东亚",
  budget: "$$",
  months: [{
    month: 10,
    highlight: "日本最早枫叶名所",
    weather: "10°C",
    crowd: "中",
    types: ["nature"],
    why: "10 月初大雪山是日本最早的红叶——因为高海拔，旭岳的黑北红枫在 9 月底到 10 月初达到高峰，比京都早整整 1 个月。是日本赏枫季的序曲，搭配温泉体验极佳。",
    experiences: [_x("旭岳缆车", "北海道最高峰的红色苔原与雪顶"), _x("层云峡", "柱状节理峡谷中的红黄瀑布"), _x("黑北温泉", "旭岳山脚的高山温泉看红叶"), _x("天人峡", "隐秘的红叶峡谷与羽衣瀑布")],
    budgetDetail: {
      daily: [500, 800, 1400],
      flight: "¥2500–4500（飞旭川）",
      note: "10 月初是北海道最早枫叶；山区气温低需备冲锋衣"
    }
  }]
},
// ════════════════ 十一月 ════════════════
{
  place: "印度瓦拉纳西",
  region: "南亚",
  budget: "$",
  months: [{
    month: 11,
    highlight: "恒河排灯节最壮观",
    weather: "25°C",
    crowd: "中",
    types: ["culture", "festival"],
    why: "11 月是排灯节(Diwali)期间，瓦拉纳西的恒河边数百个 Ghat 同时点燃灯火、油灯漂流、夜祭仪式延续千年。气温也是全年最舒适的窗口。",
    experiences: [_x("恒河晨浴日出", "清晨小船看朝拜者沐浴升起的太阳"), _x("恒河夜祭", "延续千年的火供仪式与灯海"), _x("鹿野苑", "释迦牟尼初转法轮的佛教圣地"), _x("老城区漫步", "狭窄巷弄、火葬场与生死哲思")],
    budgetDetail: {
      daily: [200, 500, 900],
      flight: "¥3500–5000",
      note: "只喝瓶装水；尊重当地宗教，火葬场禁止拍照"
    }
  }]
}, {
  place: "泰国苏梅岛",
  region: "东南亚",
  budget: "$$",
  months: [{
    month: 11,
    highlight: "潜水旺季启动",
    weather: "30°C",
    crowd: "中",
    types: ["beach"],
    why: "11 月苏梅岛季风转向——安通国家海洋公园的泻湖海水平静如镜，涛岛(Koh Tao)的潜水能见度从雨季的 10 米跃升至 30 米。是泰国湾潜水和水上活动的最佳启幕月。",
    experiences: [_x("涛岛潜水", "东南亚性价比最高的潜水考证圣地"), _x("安通国家海洋公园", "42 个岛屿的皮划艇泻湖探险"), _x("查汶海滩", "苏梅最长的白沙滩与海滩酒吧"), _x("秘密佛花园", "雨林深处的私人佛教雕塑群")],
    budgetDetail: {
      daily: [350, 650, 1200],
      flight: "¥2500–4000",
      note: "11 月是苏梅旺季开始，价比 12-1 月低 20%；潜水考证约 2000-2500 元"
    }
  }]
}, {
  place: "纳米比亚",
  region: "非洲",
  budget: "$$$",
  months: [{
    month: 11,
    highlight: "震撼红沙漠大片",
    weather: "30°C",
    crowd: "低",
    types: ["nature"],
    why: "11 月纳米比亚旱季尾声——苏索斯维利的红沙丘在低角度晨光下红得最浓烈。埃托沙国家公园的动物聚集在剩余水坑周围，Safari 密度超过非洲任何地方。",
    experiences: [_x("苏索斯维利 45 号沙丘", "世界最古老沙漠的日出与枯树"), _x("死亡谷白色盐盘", "900 年枯树与橙红沙丘的对比"), _x("埃托沙国家公园", "水坑守候大象、犀牛与狮群"), _x("骷髅海岸+十字角海豹", "10 万只海豹的海滩传奇")],
    budgetDetail: {
      daily: [700, 1300, 2500],
      flight: "¥8000–12000",
      note: "纳米比亚自驾需四驱；11 月是旱季末，水坑动物密度最高"
    }
  }]
}, {
  place: "智利百内",
  region: "南美",
  budget: "$$$",
  months: [{
    month: 11,
    highlight: "巴塔哥尼亚徒步旺季",
    weather: "15°C",
    crowd: "中",
    types: ["nature"],
    why: "11 月百内国家公园春末夏初——野花初放、冰川崩裂频率高，风速比夏季低。W 线和 O 线徒步路线全开，游客比 12-1 月旺季少，营地好订。",
    experiences: [_x("W 线徒步", "4-5 天穿越三大峡谷的巴塔哥尼亚精华"), _x("百内角峰日出", "标志性角峰群的最经典日出机位"), _x("格雷冰川", "划皮划艇穿越蓝色冰山的湖面"), _x("法国谷", "雪山环绕的悬冰川山谷")],
    budgetDetail: {
      daily: [800, 1400, 2500],
      flight: "¥12000–16000",
      note: "百内营地需提前 4-6 个月预订；11 月是性价比徒步窗口"
    }
  }]
}, {
  place: "葡萄牙阿尔加维",
  region: "欧洲",
  budget: "$",
  months: [{
    month: 11,
    highlight: "欧洲最便宜的美海岸",
    weather: "20°C",
    crowd: "极低",
    types: ["beach"],
    why: "11 月阿尔加维的黄金海岸仍然阳光温暖——即使不下水，海蚀洞和金色砂岩在秋冬光线中最上镜。游客几乎为零，是欧洲冬季避寒性价比最高的选择。",
    experiences: [_x("贝纳吉尔海蚀洞", "乘小船进入穹顶开天窗的海中洞穴"), _x("圣文森特角", "欧洲大陆最西南端的灯塔日落"), _x("拉戈斯黄金海岸", "砂岩拱门与碧蓝海水的步道"), _x("法鲁老城", "被忽略的城墙古城与瓷砖教堂")],
    budgetDetail: {
      daily: [250, 450, 800],
      flight: "¥4000–6000",
      note: "11 月阿尔加维是欧洲最便宜的阳光海岸；租车探洞最自由"
    }
  }]
}, {
  place: "约旦死海",
  region: "中东",
  budget: "$$",
  months: [{
    month: 11,
    highlight: "漂浮体验与沙漠城堡",
    weather: "25°C",
    crowd: "低",
    types: ["nature", "culture"],
    why: "11 月死海气温适中——不热不冷，漂浮在盐度 34% 的水面上读报纸不再被烈日灼烤。游客比春夏季少 60%，酒店价格下调，是死海最舒服的月份。",
    experiences: [_x("死海漂浮", "地球最低点的永不沉没体验"), _x("佩特拉古城", "玫瑰之城的卡兹尼神殿与修道院"), _x("瓦迪拉姆火星沙漠", "《沙丘》与《火星救援》的取景地"), _x("马达巴马赛克地图", "圣城马赛克的世界遗产教堂")],
    budgetDetail: {
      daily: [400, 700, 1300],
      flight: "¥5000–7500",
      note: "Jordan Pass 含签证+佩特拉门票；11 月约旦温和，是全年最佳季节"
    }
  }]
}, {
  place: "缅甸曼德勒",
  region: "东南亚",
  budget: "$",
  months: [{
    month: 11,
    highlight: "柚木桥日落与古都",
    weather: "28°C",
    crowd: "低",
    types: ["culture"],
    why: "11 月曼德勒干季蓝天——乌本桥的日落剪影在无水汽阻挡的空气中最清晰。蒲甘的热气球升空率也开始上升，且游客仅为旺季的 30%。",
    experiences: [_x("乌本桥日落", "世界最长柚木桥 1.2 公里的剪影日落"), _x("马哈牟尼佛塔", "缅甸最神圣的贴金佛像"), _x("敏贡古城", "伊洛瓦底江上游的巨钟与白塔"), _x("实皆山", "600 座白塔的金色日落全景")],
    budgetDetail: {
      daily: [200, 400, 700],
      flight: "¥2500–4000",
      note: "缅甸消费极低；11 月是最舒适季，但政治情况需提前关注"
    }
  }]
}, {
  place: "埃及开罗",
  region: "中东",
  budget: "$$",
  months: [{
    month: 11,
    highlight: "凉爽探秘金字塔",
    weather: "24°C",
    crowd: "中",
    types: ["culture"],
    why: "11 月开罗从夏季 40°C 酷热中解脱——吉萨金字塔的沙漠步行不再煎熬，埃及博物馆的图坦卡蒙黄金面具可以慢慢观赏而不被汗流浃背的旅行团推挤。",
    experiences: [_x("吉萨金字塔群", "胡夫金字塔+狮身人面像的清晨探秘"), _x("埃及博物馆", "图坦卡蒙黄金面具与木乃伊"), _x("哈利利集市", "开罗最老市场的铜器与香料"), _x("萨拉丁城堡", "中世纪城堡俯瞰开罗全城")],
    budgetDetail: {
      daily: [350, 600, 1100],
      flight: "¥4500–6500",
      note: "11 月是埃及最佳月；金字塔建议 8 点开门即到避开人流"
    }
  }]
}, {
  place: "中国云南元阳",
  region: "东亚",
  budget: "$",
  months: [{
    month: 11,
    highlight: "梯田水满与云海",
    weather: "15°C",
    crowd: "中",
    types: ["nature", "culture"],
    why: "11 月元阳梯田开始放水——哈尼族人民准备冬耕，1300 年历史的梯田变成千层天空之镜。冬季云海和晨雾在日出时灌满山谷，是元阳摄影的黄金窗口。",
    experiences: [_x("多依树日出", "云雾中金色梯田的天镜日出"), _x("坝达日落", "3700 级梯田的最壮观日落"), _x("箐口哈尼村", "蘑菇房与哈尼族织布的传统生活"), _x("老虎嘴梯田", "最陡峭的梯田曲线与落日余晖")],
    budgetDetail: {
      daily: [200, 400, 700],
      flight: "¥1000–2000（飞昆明转车）",
      note: "11 月水梯田开始；日出前很冷需备羽绒服，中午短袖即可"
    }
  }]
},
// ════════════════ 十二月 ════════════════
{
  place: "法国斯特拉斯堡",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 12,
    highlight: "全欧最美圣诞市集",
    weather: "4°C",
    crowd: "中",
    types: ["culture", "festival", "food"],
    why: "斯特拉斯堡圣诞市集始于 1570 年，是欧洲最古老也最浪漫的圣诞市场。运河环绕的小法兰西区披上灯饰，木屋飘出热红酒、肉桂面包与阿尔萨斯白酒香气。",
    experiences: [_x("克勒贝尔广场", "巨型圣诞树与灯光秀的核心广场"), _x("小法兰西", "运河木骨架房屋的童话街区"), _x("圣母大教堂", "哥特式杰作与天文钟"), _x("科尔马一日游", "附近更小更美的圣诞市集童话镇")],
    budgetDetail: {
      daily: [600, 1100, 1800],
      flight: "¥5500–7500",
      note: "圣诞前两周市集人最多，建议早上 11 点前到达；防扒手"
    }
  }]
}, {
  place: "芬兰罗瓦涅米",
  region: "北欧",
  budget: "$$$",
  months: [{
    month: 12,
    highlight: "圣诞老人村与极光玻璃屋",
    weather: "-10°C",
    crowd: "高",
    types: ["nature", "festival"],
    why: "12 月罗瓦涅米是真正的圣诞老人故乡——跨越北极圈拿证书的地方。极光季正盛，玻璃屋顶躺在床上看绿光起舞，是冬季最具仪式感的体验。",
    experiences: [_x("圣诞老人村", "北极圈线打卡与寄给未来的信"), _x("极光玻璃屋", "躺在加热床上仰望天空起舞"), _x("哈士奇雪橇", "穿越白色森林的爱斯基摩传统体验"), _x("驯鹿农场", "萨米人传统生活与桑拿")],
    budgetDetail: {
      daily: [1000, 1800, 3500],
      flight: "¥6500–9000",
      note: "保暖装备建议在当地租顶级款；冬季日照仅 2-3 小时需合理安排活动"
    }
  }]
}, {
  place: "澳大利亚悉尼",
  region: "大洋洲",
  budget: "$$$",
  months: [{
    month: 12,
    highlight: "短裤跨年与海港焰火",
    weather: "27°C",
    crowd: "中",
    types: ["beach", "festival"],
    why: "12 月悉尼夏初——邦迪海滩的泳池与海浪在圣诞季最热闹，南半球跨年焰火是全球最早也最壮观的之一。海港大桥与歌剧院的焰火画面是澳洲的年度最高光。",
    experiences: [_x("悉尼跨年焰火", "海港大桥+歌剧院的全球最壮观跨年"), _x("邦迪至库吉海岸步道", "6 公里绝壁海岸步道"), _x("蓝山国家公园", "三姐妹峰的桉树蓝雾"), _x("岩石区圣诞集市", "殖民时期街区的夏日圣诞")],
    budgetDetail: {
      daily: [700, 1200, 2200],
      flight: "¥5000–8000",
      note: "跨年焰火观看点需提前 12 小时占位；悉尼住宿 12 月极贵需提前订"
    }
  }]
}, {
  place: "肯尼亚马赛马拉",
  region: "非洲",
  budget: "$$$",
  months: [{
    month: 12,
    highlight: "圣诞 Safari 豹最活跃",
    weather: "25°C",
    crowd: "中",
    types: ["wildlife"],
    why: "12 月马赛马拉短雨季刚过——草原嫩绿吸引食草动物，花豹和猎豹在绿草掩护下最活跃。游客仅为 7-8 月旺季的 70%，Safari 体验更私密。",
    experiences: [_x("大猫追踪", "绿草季的花豹与猎豹最佳目击率"), _x("马赛村文化", "马赛勇士的跳跃舞蹈与放牧生活"), _x("马拉河河马池", "非渡河季的河马与鳄鱼群"), _x("草原香槟早餐", "草原日出中的奢华野餐")],
    budgetDetail: {
      daily: [1200, 2200, 4500],
      flight: "¥8000–11000",
      note: "12 月是圣诞假期旺季，欧美人多；Safari 营地需提前 4 个月"
    }
  }]
}, {
  place: "菲律宾巴拉望",
  region: "东南亚",
  budget: "$$",
  months: [{
    month: 12,
    highlight: "爱妮岛与科隆潜水",
    weather: "28°C",
    crowd: "中",
    types: ["beach"],
    why: "12 月巴拉望进入干季——爱妮岛的石灰岩潟湖海水清澈如镜，科隆的二战沉船潜水能见度飙升。是菲律宾海岛中风景最壮丽且游客密度远低于长滩的选择。",
    experiences: [_x("爱妮岛潟湖跳岛", "大小潟湖+秘密沙滩的皮划艇探险"), _x("科隆沉船潜水", "二战日本军舰的珊瑚覆盖水下博物馆"), _x("公主港地下河", "世界最长通航地下河的新世界七大自然奇观"), _x("凯央根湖", "菲律宾最上镜的镜湖与石灰岩群")],
    budgetDetail: {
      daily: [350, 650, 1200],
      flight: "¥2500–4000",
      note: "12 月是巴拉望最佳月但机票涨；科隆+爱妮岛建议分开安排"
    }
  }]
}, {
  place: "奥地利维也纳",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 12,
    highlight: "圣诞市场与新年舞会",
    weather: "2°C",
    crowd: "中",
    types: ["culture", "festival", "food"],
    why: "12 月维也纳是全欧最优雅的圣诞城市——市政厅广场的圣诞市场在古典音乐中飘香，美泉宫与霍夫堡的舞会季开启。热红酒与萨赫蛋糕在冬日里是奥匈帝国的味道。",
    experiences: [_x("市政厅圣诞市场", "维也纳最大的圣诞集市的旋转木马"), _x("美泉宫", "茜茜公主的夏宫与宫廷交响乐"), _x("霍夫堡新年舞会", "华尔兹发源地的华尔兹之夜"), _x("金色大厅", "维也纳爱乐乐团的跨年音乐会")],
    budgetDetail: {
      daily: [500, 900, 1600],
      flight: "¥5000–7500",
      note: "12 月是维也纳最浪漫季但也是最贵；音乐会票需提前 2 个月"
    }
  }]
}, {
  place: "德国纽伦堡",
  region: "欧洲",
  budget: "$$",
  months: [{
    month: 12,
    highlight: "德国最著名圣诞市场",
    weather: "2°C",
    crowd: "中",
    types: ["culture", "festival", "food"],
    why: "12 月纽伦堡圣诞市场是德国最古老和最有名的——主广场的木质摊位只出售手工制品和纽伦堡姜饼(Lebkuchen)，没有塑料玩具。是德国圣诞传统最纯正的呈现。",
    experiences: [_x("圣婴圣诞市场", "主广场 180 个手工木屋的传统市集"), _x("纽伦堡姜饼", "600 年历史的 Lebkuchen 老店"), _x("皇帝堡", "中世纪神圣罗马帝国皇帝的城堡"), _x("玩具博物馆", "纽伦堡 600 年玩具制造史的缩影")],
    budgetDetail: {
      daily: [400, 800, 1400],
      flight: "¥5000–7500（飞慕尼黑转火车）",
      note: "纽伦堡圣诞市场仅在降临节期间开放；手工姜饼是必买伴手礼"
    }
  }]
}, {
  place: "智利瓦尔帕莱索",
  region: "南美",
  budget: "$$",
  months: [{
    month: 12,
    highlight: "彩色山城跨年烟火",
    weather: "22°C",
    crowd: "低",
    types: ["culture", "festival"],
    why: "12 月瓦尔帕莱索在南美盛夏——聂鲁达故居的五层彩色房子在阳光下最鲜艳，南美最大的跨年烟花在全城 42 座山头上同时绽放。是智利最文艺也最疯狂的跨年地。",
    experiences: [_x("彩色山城街巷", "42 座山头的涂鸦壁画与彩色排屋"), _x("聂鲁达故居 La Sebastiana", "诗人五层船形故居俯瞰太平洋"), _x("跨年烟花", "南半球最大规模的海港跨年烟火"), _x("阿雷格里山缆车", "百年历史木制升降缆车")],
    budgetDetail: {
      daily: [400, 800, 1500],
      flight: "¥10000–14000（飞圣地亚哥转车）",
      note: "跨年住宿需提前 3 个月；瓦尔帕莱索山坡陡峭，轻装出行"
    }
  }]
}];

/* ═══ Utils ═══ */
function flatten(dest, num) {
  const m = dest.months.find(x => x.month === num);
  if (!m) return null;
  return {
    place: dest.place,
    region: dest.region,
    budget: dest.budget,
    weather: m.weather,
    crowd: m.crowd,
    types: m.types || [],
    highlight: m.highlight,
    why: m.why,
    experiences: m.experiences,
    budgetDetail: m.budgetDetail,
    _ref: dest,
    _currentMonth: num
  };
}
function getByMonth(idx) {
  const n = idx + 1;
  return DESTINATIONS.filter(d => d.months.some(m => m.month === n)).map(d => flatten(d, n)).filter(Boolean);
}
const VERIFY_INDEX = {
  "日本京都": {
    qid: "Q34600",
    lat: 35.0116,
    lon: 135.7681,
    name: "Kyoto"
  },
  "希腊圣托里尼": {
    qid: "Q129296",
    lat: 36.3932,
    lon: 25.4615,
    name: "Santorini"
  },
  "冰岛": {
    qid: "Q189",
    lat: 64.9631,
    lon: -19.0208,
    name: "Iceland"
  },
  "意大利阿马尔菲": {
    qid: "Q80563",
    lat: 40.634,
    lon: 14.6027,
    name: "Amalfi"
  },
  "摩洛哥马拉喀什": {
    qid: "Q101625",
    lat: 31.6295,
    lon: -7.9811,
    name: "Marrakesh"
  },
  "挪威峡湾": {
    qid: "Q79928",
    lat: 62.1,
    lon: 7.0944,
    name: "Geiranger"
  },
  "泰国清迈": {
    qid: "Q81931",
    lat: 18.7883,
    lon: 98.9853,
    name: "Chiang Mai"
  },
  "卡帕多奇亚": {
    qid: "Q202754",
    lat: 38.6431,
    lon: 34.8289,
    name: "Cappadocia"
  },
  "越南会安": {
    qid: "Q211574",
    lat: 15.8801,
    lon: 108.338,
    name: "Hội An"
  },
  "法国普罗旺斯": {
    qid: "Q46611",
    lat: 43.9493,
    lon: 4.8055,
    name: "Avignon"
  },
  "西班牙塞维利亚": {
    qid: "Q8717",
    lat: 37.3828,
    lon: -5.9731,
    name: "Seville"
  },
  "葡萄牙里斯本": {
    qid: "Q597",
    lat: 38.7169,
    lon: -9.1395,
    name: "Lisbon"
  },
  "老挝琅勃拉邦": {
    qid: "Q7381",
    lat: 19.8833,
    lon: 102.1373,
    name: "Luang Prabang"
  },
  "摩洛哥菲斯": {
    qid: "Q183512",
    lat: 34.0339,
    lon: -5.0003,
    name: "Fes"
  },
  "日本东京": {
    qid: "Q1490",
    lat: 35.6762,
    lon: 139.6503,
    name: "Tokyo"
  },
  "越南河内": {
    qid: "Q1858",
    lat: 21.0245,
    lon: 105.8412,
    name: "Hanoi"
  },
  "印度果阿": {
    qid: "Q1171",
    lat: 15.2993,
    lon: 74.124,
    name: "Goa"
  },
  "阿联酋迪拜": {
    qid: "Q612",
    lat: 25.2048,
    lon: 55.2708,
    name: "Dubai"
  },
  "日本北海道": {
    qid: "Q37313",
    lat: 43.0621,
    lon: 141.3544,
    name: "Sapporo"
  },
  "新西兰南岛": {
    qid: "Q127839",
    lat: -45.0312,
    lon: 168.6626,
    name: "Queenstown"
  },
  "威尼斯": {
    qid: "Q641",
    lat: 45.4408,
    lon: 12.3155,
    name: "Venice"
  },
  "印尼巴厘岛": {
    qid: "Q5765",
    lat: -8.4095,
    lon: 115.1889,
    name: "Bali"
  },
  "韩国首尔": {
    qid: "Q8684",
    lat: 37.5665,
    lon: 126.978,
    name: "Seoul"
  },
  "西班牙巴塞罗那": {
    qid: "Q1492",
    lat: 41.3851,
    lon: 2.1734,
    name: "Barcelona"
  },
  "约旦佩特拉": {
    qid: "Q171178",
    lat: 30.3285,
    lon: 35.4444,
    name: "Petra"
  },
  "印度斋浦尔": {
    qid: "Q23842",
    lat: 26.9124,
    lon: 75.7873,
    name: "Jaipur"
  },
  "伊斯坦布尔": {
    qid: "Q406",
    lat: 41.0082,
    lon: 28.9784,
    name: "Istanbul"
  },
  "曼谷": {
    qid: "Q1861",
    lat: 13.7563,
    lon: 100.5018,
    name: "Bangkok"
  },
  "秘鲁马丘比丘": {
    qid: "Q128207",
    lat: -13.1631,
    lon: -72.545,
    name: "Machu Picchu"
  },
  "克罗地亚杜布罗夫尼克": {
    qid: "Q680508",
    lat: 42.6507,
    lon: 18.0944,
    name: "Dubrovnik"
  },
  "荷兰阿姆斯特丹": {
    qid: "Q727",
    lat: 52.3676,
    lon: 4.9041,
    name: "Amsterdam"
  },
  "日本札幌": {
    qid: "Q37313",
    lat: 43.0621,
    lon: 141.3544,
    name: "Sapporo"
  },
  "马来西亚槟城": {
    qid: "Q273548",
    lat: 5.4141,
    lon: 100.3288,
    name: "Penang"
  },
  "格鲁吉亚第比利斯": {
    qid: "Q994",
    lat: 41.6941,
    lon: 44.8337,
    name: "Tbilisi"
  },
  "英国伦敦": {
    qid: "Q84",
    lat: 51.5074,
    lon: -0.1278,
    name: "London"
  },
  "芬兰罗瓦涅米": {
    qid: "Q28699",
    lat: 66.5039,
    lon: 25.7294,
    name: "Rovaniemi"
  },
  "澳大利亚悉尼": {
    qid: "Q3130",
    lat: -33.8688,
    lon: 151.2093,
    name: "Sydney"
  },
  "奥地利维也纳": {
    qid: "Q1741",
    lat: 48.2082,
    lon: 16.3738,
    name: "Vienna"
  },
  "埃及开罗": {
    qid: "Q85",
    lat: 30.0626,
    lon: 31.2497,
    name: "Cairo"
  },
  "尼泊尔": {
    qid: "Q837",
    lat: 28.3949,
    lon: 84.124,
    name: "Nepal"
  },
  "韩国济州岛": {
    qid: "Q18680",
    lat: 33.4996,
    lon: 126.5312,
    name: "Jeju"
  },
  "菲律宾长滩岛": {
    qid: "Q855235",
    lat: 11.975,
    lon: 121.9225,
    name: "Boracay"
  },
  "智利圣地亚哥": {
    qid: "Q2887",
    lat: -33.4375,
    lon: -70.65,
    name: "Santiago"
  },
  "斯里兰卡": {
    qid: "Q854",
    lat: 7.0,
    lon: 81.0,
    name: "Sri Lanka"
  },
  "坦桑尼亚桑给巴尔": {
    qid: "Q1774",
    lat: -5.9,
    lon: 39.3,
    name: "Zanzibar"
  },
  "缅甸蒲甘": {
    qid: "Q29317",
    lat: 21.1725,
    lon: 94.86,
    name: "Bagan"
  },
  "澳大利亚塔斯马尼亚": {
    qid: "Q34366",
    lat: -42.0,
    lon: 147.0,
    name: "Tasmania"
  },
  "越南胡志明市": {
    qid: "Q1854",
    lat: 10.7756,
    lon: 106.7019,
    name: "Ho Chi Minh City"
  },
  "埃及卢克索": {
    qid: "Q130514",
    lat: 25.6967,
    lon: 32.6444,
    name: "Luxor"
  },
  "阿根廷巴塔哥尼亚": {
    qid: "Q81561",
    lat: -50.3378,
    lon: -72.26,
    name: "El Calafate"
  },
  "巴西里约热内卢": {
    qid: "Q8678",
    lat: -22.9111,
    lon: -43.2056,
    name: "Rio de Janeiro"
  },
  "厄瓜多尔加拉帕戈斯": {
    qid: "Q38095",
    lat: -0.6667,
    lon: -90.55,
    name: "Galápagos Islands"
  },
  "古巴哈瓦那": {
    qid: "Q1563",
    lat: 23.1367,
    lon: -82.3589,
    name: "Havana"
  },
  "哥斯达黎加": {
    qid: "Q800",
    lat: 10.0,
    lon: -84.0,
    name: "Costa Rica"
  },
  "阿根廷伊瓜苏": {
    qid: "Q55378",
    lat: -25.6108,
    lon: -54.5803,
    name: "Puerto Iguazú"
  },
  "中国西藏拉萨": {
    qid: "Q1026100",
    lat: 29.6539,
    lon: 91.1175,
    name: "Lhasa"
  },
  "葡萄牙波尔图": {
    qid: "Q36433",
    lat: 41.15,
    lon: -8.6108,
    name: "Porto"
  },
  "瑞士少女峰": {
    qid: "Q15312",
    lat: 46.5369,
    lon: 7.9625,
    name: "Jungfrau"
  },
  "日本金泽": {
    qid: "Q191130",
    lat: 36.5611,
    lon: 136.6565,
    name: "Kanazawa"
  },
  "希腊米科诺斯": {
    qid: "Q190210",
    lat: 37.45,
    lon: 25.3333,
    name: "Mykonos"
  },
  "秘鲁圣谷": {
    qid: "Q2237464",
    lat: -13.3333,
    lon: -72.0833,
    name: "Sacred Valley"
  },
  "突尼斯撒哈拉": {
    qid: "Q504661",
    lat: 33.9197,
    lon: 8.1336,
    name: "Tozeur"
  },
  "新西兰皇后镇": {
    qid: "Q613602",
    lat: -45.0311,
    lon: 168.6625,
    name: "Queenstown, New Zealand"
  },
  "泰国清莱": {
    qid: "Q856772",
    lat: 19.9094,
    lon: 99.8275,
    name: "Chiang Rai"
  },
  "美国华盛顿": {
    qid: "Q61",
    lat: 38.895,
    lon: -77.0367,
    name: "Washington, D.C."
  },
  "中国徽州": {
    qid: "Q180470",
    lat: 29.7132,
    lon: 118.3151,
    name: "Huangshan City"
  },
  "南非开普敦": {
    qid: "Q5465",
    lat: -33.9253,
    lon: 18.4239,
    name: "Cape Town"
  },
  "美国犹他": {
    qid: "Q223969",
    lat: 38.7281,
    lon: -109.54,
    name: "Arches National Park"
  },
  "越南沙巴": {
    qid: "Q7395483",
    lat: 22.3357,
    lon: 103.8417,
    name: "Sa Pa"
  },
  "摩洛哥舍夫沙万": {
    qid: "Q676778",
    lat: 35.1714,
    lon: -5.2697,
    name: "Chefchaouen"
  },
  "印度喀拉拉": {
    qid: "Q585026",
    lat: 9.4978,
    lon: 76.3286,
    name: "Alappuzha"
  },
  "中国香格里拉": {
    qid: "Q933866",
    lat: 27.8458,
    lon: 99.7422,
    name: "Shangri-La, Yunnan"
  },
  "加拿大落基山": {
    qid: "Q41858",
    lat: 51.1667,
    lon: -115.55,
    name: "Banff National Park"
  },
  "希腊科孚岛": {
    qid: "Q121378",
    lat: 39.6,
    lon: 19.87,
    name: "Corfu"
  },
  "日本冲绳": {
    qid: "Q181966",
    lat: 26.2122,
    lon: 127.6792,
    name: "Naha"
  },
  "斯洛文尼亚布莱德": {
    qid: "Q202852",
    lat: 46.3683,
    lon: 14.1147,
    name: "Bled"
  },
  "挪威罗弗敦群岛": {
    qid: "Q186822",
    lat: 68.3331,
    lon: 14.6664,
    name: "Lofoten"
  },
  "美国黄石": {
    qid: "Q351",
    lat: 44.6,
    lon: -110.5,
    name: "Yellowstone National Park"
  },
  "蒙古国乌兰巴托": {
    qid: "Q23430",
    lat: 47.9214,
    lon: 106.9055,
    name: "Ulaanbaatar"
  },
  "土耳其费特希耶": {
    qid: "Q207998",
    lat: 36.6206,
    lon: 29.1142,
    name: "Fethiye"
  },
  "塞伦盖蒂": {
    qid: "Q11812902",
    lat: -2.4,
    lon: 34.6,
    name: "Serengeti National Park"
  },
  "克罗地亚十六湖": {
    qid: "Q189849",
    lat: 44.8804,
    lon: 15.616,
    name: "Plitvice Lakes National Park"
  },
  "印尼龙目岛": {
    qid: "Q7564",
    lat: -8.6312,
    lon: 116.3176,
    name: "Lombok"
  },
  "西班牙潘普洛纳": {
    qid: "Q10282",
    lat: 42.8167,
    lon: -1.65,
    name: "Pamplona"
  },
  "加拿大爱德华王子岛": {
    qid: "Q1978",
    lat: 46.4,
    lon: -63.2,
    name: "Prince Edward Island"
  },
  "阿尔巴尼亚里维埃拉": {
    qid: "Q193226",
    lat: 39.875,
    lon: 20.01,
    name: "Sarandë"
  },
  "玻利维亚乌尤尼盐沼": {
    qid: "Q1014511",
    lat: -20.4628,
    lon: -66.8239,
    name: "Uyuni"
  },
  "芬兰拉普兰": {
    qid: "Q103717",
    lat: 66.5028,
    lon: 25.7285,
    name: "Rovaniemi"
  },
  "马赛马拉": {
    qid: "Q207724",
    lat: -1.49,
    lon: 35.14,
    name: "Maasai Mara"
  },
  "苏格兰高地": {
    qid: "Q106652",
    lat: 57.12,
    lon: -4.71,
    name: "Scottish Highlands"
  },
  "中国西藏": {
    qid: "Q1026100",
    lat: 29.6539,
    lon: 91.1175,
    name: "Lhasa"
  },
  "爱沙尼亚塔林": {
    qid: "Q1770",
    lat: 59.4372,
    lon: 24.745,
    name: "Tallinn"
  },
  "印尼科莫多": {
    qid: "Q4520",
    lat: -8.6516,
    lon: 119.5766,
    name: "Komodo National Park"
  },
  "美国阿拉斯加": {
    qid: "Q39450",
    lat: 61.2167,
    lon: -149.8936,
    name: "Anchorage, Alaska"
  },
  "格鲁吉亚卡兹别克": {
    qid: "Q1025823",
    lat: 42.6583,
    lon: 44.6417,
    name: "Stepantsminda"
  },
  "加拿大育空": {
    qid: "Q2055",
    lat: 60.7172,
    lon: -135.0558,
    name: "Whitehorse"
  },
  "慕尼黑": {
    qid: "Q1726",
    lat: 48.1375,
    lon: 11.575,
    name: "Munich"
  },
  "中国新疆": {
    qid: "Q1723644",
    lat: 48.815,
    lon: 87.04,
    name: "Kanas Lake"
  },
  "加拿大魁北克": {
    qid: "Q2145",
    lat: 46.8161,
    lon: -71.2242,
    name: "Quebec City"
  },
  "意大利托斯卡纳": {
    qid: "Q2751",
    lat: 43.3183,
    lon: 11.3314,
    name: "Siena"
  },
  "尼泊尔安纳普尔纳": {
    qid: "Q6640",
    lat: 28.2097,
    lon: 83.9853,
    name: "Pokhara"
  },
  "巴西潘塔纳尔": {
    qid: "Q157603",
    lat: -17.4,
    lon: -57.5,
    name: "Pantanal"
  },
  "埃塞俄比亚达纳基勒": {
    qid: "Q14213070",
    lat: 14.2417,
    lon: 40.3,
    name: "Danakil Depression"
  },
  "克罗地亚伊斯特拉": {
    qid: "Q5316",
    lat: 45.0833,
    lon: 13.6333,
    name: "Rovinj"
  },
  "墨西哥瓦哈卡": {
    qid: "Q131429",
    lat: 17.0606,
    lon: -96.7253,
    name: "Oaxaca City"
  },
  "印度拉贾斯坦": {
    qid: "Q66485",
    lat: 26.915,
    lon: 75.82,
    name: "Jaipur"
  },
  "阿曼马斯喀特": {
    qid: "Q3826",
    lat: 23.6139,
    lon: 58.5922,
    name: "Muscat"
  },
  "美国新英格兰": {
    qid: "Q550498",
    lat: 44.4653,
    lon: -72.6846,
    name: "Stowe, Vermont"
  },
  "澳大利亚乌鲁鲁": {
    qid: "Q33910",
    lat: -25.345,
    lon: 131.0361,
    name: "Uluru"
  },
  "德国巴伐利亚": {
    qid: "Q4152",
    lat: 47.5575,
    lon: 10.7494,
    name: "Neuschwanstein Castle"
  },
  "日本北海道大雪山": {
    qid: "Q1157658",
    lat: 43.65,
    lon: 142.85,
    name: "Daisetsuzan Volcanic Group"
  },
  "印度瓦拉纳西": {
    qid: "Q79980",
    lat: 25.3189,
    lon: 83.0128,
    name: "Varanasi"
  },
  "泰国苏梅岛": {
    qid: "Q270375",
    lat: 9.5,
    lon: 100.0,
    name: "Ko Samui"
  },
  "纳米比亚": {
    qid: "Q1932730",
    lat: -24.7398,
    lon: 15.2876,
    name: "Sossusvlei"
  },
  "智利百内": {
    qid: "Q901646",
    lat: -50.9831,
    lon: -72.9664,
    name: "Torres del Paine National Park"
  },
  "葡萄牙阿尔加维": {
    qid: "Q159457",
    lat: 37.0161,
    lon: -7.935,
    name: "Faro, Portugal"
  },
  "约旦死海": {
    qid: "Q23883",
    lat: 31.5207,
    lon: 35.4845,
    name: "Dead Sea"
  },
  "缅甸曼德勒": {
    qid: "Q185518",
    lat: 21.9831,
    lon: 96.0844,
    name: "Mandalay"
  },
  "法国斯特拉斯堡": {
    qid: "Q6602",
    lat: 48.5733,
    lon: 7.7522,
    name: "Strasbourg"
  },
  "肯尼亚马赛马拉": {
    qid: "Q207724",
    lat: -1.49,
    lon: 35.14,
    name: "Maasai Mara"
  },
  "菲律宾巴拉望": {
    qid: "Q111483",
    lat: 11.18,
    lon: 119.39,
    name: "El Nido, Palawan"
  },
  "德国纽伦堡": {
    qid: "Q2090",
    lat: 49.4539,
    lon: 11.0775,
    name: "Nuremberg"
  },
  "智利瓦尔帕莱索": {
    qid: "Q33986",
    lat: -33.0461,
    lon: -71.6197,
    name: "Valparaíso"
  },
  "中国云南元阳": {
    qid: "Q11605230",
    lat: 23.1172,
    lon: 102.7377,
    name: "Honghe Hani Rice Terraces"
  }
};
const FAV_KEY_V4 = "ltm_v4_favorites";
function loadFavs() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY_V4) || "[]");
  } catch {
    return [];
  }
}
function saveFavs(next) {
  try {
    localStorage.setItem(FAV_KEY_V4, JSON.stringify(next));
  } catch {}
}
/* ═══ 验证结果缓存（自动核对，避免重复请求；气候数据稳定，缓存 30 天）═══ */
const VERIFY_CACHE_KEY = "ltm_verify_v1";
const VERIFY_TTL = 30 * 24 * 3600 * 1000;
function loadVerifyCache(dest) {
  try {
    const c = JSON.parse(localStorage.getItem(VERIFY_CACHE_KEY) || "{}");
    const e = c[favId(dest)];
    if (e && Date.now() - e.t < VERIFY_TTL) return e.s;
  } catch {}
  return null;
}
function saveVerifyCache(dest, status) {
  try {
    const c = JSON.parse(localStorage.getItem(VERIFY_CACHE_KEY) || "{}");
    c[favId(dest)] = {
      s: status,
      t: Date.now()
    };
    localStorage.setItem(VERIFY_CACHE_KEY, JSON.stringify(c));
  } catch {}
}
function favId(dest) {
  return dest.place + "::" + (dest._currentMonth || "");
}
function shortPlace(place) {
  return String(place || "").replace(/^希腊/, "").replace(/^意大利/, "").replace(/^日本/, "").replace(/^西班牙/, "").replace(/^葡萄牙/, "").replace(/^法国/, "").replace(/^英国/, "").replace(/^德国/, "").replace(/^荷兰/, "").replace(/^挪威/, "").replace(/^瑞士/, "").replace(/^奥地利/, "").replace(/^印尼/, "").replace(/^印度/, "").replace(/^越南/, "").replace(/^泰国/, "").replace(/^韩国/, "").replace(/^中国/, "").replace(/^澳大利亚/, "").replace(/^新西兰/, "").replace(/^加拿大/, "").replace(/^美国/, "").replace(/^阿根廷/, "").replace(/^秘鲁/, "").replace(/^摩洛哥/, "").replace(/^埃及/, "").replace(/^南非/, "").replace(/^坦桑尼亚/, "").replace(/^肯尼亚/, "").replace(/^阿联酋/, "").replace(/^约旦/, "").replace(/^格鲁吉亚/, "").replace(/^斯洛文尼亚/, "").replace(/^克罗地亚/, "").replace(/^爱沙尼亚/, "").replace(/^玻利维亚/, "").replace(/^厄瓜多尔/, "").replace(/^智利/, "").replace(/^巴西/, "").replace(/^缅甸/, "").replace(/^老挝/, "").replace(/^斯里兰卡/, "");
}
function monthLabel(num) {
  return MONTHS[(num || 1) - 1]?.name || "当月";
}
function imgFor(dest, size) {
  const n = DEST_MONTH_IMG[dest.place + "::" + (dest._currentMonth || "")];
  if (n) return "assets/img/" + n + (size === "lg" ? "-lg" : "-sm") + ".webp";
  return MONTH_IMG[dest._currentMonth] || MONTH_IMG[1];
}
function bg(dest, size) {
  return {
    backgroundImage: 'linear-gradient(to top,rgba(0,0,0,.74),rgba(0,0,0,.08) 62%),url("' + imgFor(dest, size) + '")'
  };
}
function tempNumber(value) {
  return Number(String(value || "").replace(/[^\d.-]/g, ""));
}
function reasonFor(dest) {
  const t = tempNumber(dest.weather);
  if (Number.isFinite(t) && t >= 15 && t <= 26) return "气候舒适";
  if ((dest.types || []).includes("festival")) return "节庆限定";
  if (["极低", "低"].includes(dest.crowd)) return "人少宜游";
  if (dest.budget === "$") return "预算友好";
  if ((dest.types || []).includes("nature")) return "自然窗口";
  return "当季体验";
}
function scoreDest(dest) {
  const t = tempNumber(dest.weather);
  let score = 0;
  if (Number.isFinite(t) && t >= 15 && t <= 26) score += 4;
  if (["极低", "低"].includes(dest.crowd)) score += 3;
  if ((dest.types || []).includes("festival")) score += 2;
  if (dest.budget === "$") score += 1;
  return score;
}
function pickFeatured(list) {
  const sorted = [...list].sort((a, b) => scoreDest(b) - scoreDest(a));
  const chosen = [];
  const used = {};
  for (const dest of sorted) {
    const primary = dest.types?.[0] || "other";
    if (!used[primary]) {
      chosen.push(dest);
      used[primary] = true;
    }
    if (chosen.length === 3) break;
  }
  for (const dest of sorted) {
    if (chosen.length < 3 && !chosen.includes(dest)) chosen.push(dest);
  }
  return chosen.slice(0, 3);
}
function lastDayOfMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
function haversineKm(a, b) {
  const R = 6371,
    rad = x => x * Math.PI / 180;
  const dLat = rad(b.lat - a.lat),
    dLon = rad(b.lon - a.lon);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}
async function verifyDestination(dest) {
  const index = VERIFY_INDEX[dest.place];
  if (!index) {
    return {
      status: "fallback",
      summary: "该目的地暂未接入联网验证，继续使用固定兜底数据。",
      items: [{
        label: "固定数据",
        value: "已保留"
      }, {
        label: "下一步",
        value: "补齐地点 ID 后可验证"
      }]
    };
  }
  const month = dest._currentMonth || 1;
  const entityUrl = "https://www.wikidata.org/wiki/Special:EntityData/" + index.qid + ".json";
  const entityRes = await fetch(entityUrl);
  if (!entityRes.ok) throw new Error("Wikidata 请求失败");
  const entityJson = await entityRes.json();
  const entity = entityJson.entities[index.qid];
  const labels = entity.labels || {};
  const label = labels.zh && labels.zh.value || labels.en && labels.en.value || index.name;
  const coordClaim = entity.claims?.P625?.[0]?.mainsnak?.datavalue?.value;
  const onlineCoord = coordClaim ? {
    lat: coordClaim.latitude,
    lon: coordClaim.longitude
  } : {
    lat: index.lat,
    lon: index.lon
  };
  const dist = haversineKm({
    lat: index.lat,
    lon: index.lon
  }, onlineCoord);
  const y = 2024;
  const start = y + "-" + String(month).padStart(2, "0") + "-01";
  const end = y + "-" + String(month).padStart(2, "0") + "-" + String(lastDayOfMonth(y, month)).padStart(2, "0");
  const meteoUrl = "https://archive-api.open-meteo.com/v1/archive?latitude=" + index.lat + "&longitude=" + index.lon + "&start_date=" + start + "&end_date=" + end + "&daily=temperature_2m_max&timezone=auto";
  const meteoRes = await fetch(meteoUrl);
  if (!meteoRes.ok) throw new Error("天气数据请求失败");
  const meteo = await meteoRes.json();
  const values = (meteo.daily?.temperature_2m_max || []).filter(v => typeof v === "number");
  const avg = values.length ? values.reduce((s, v) => s + v, 0) / values.length : null;
  const fixedTemp = tempNumber(dest.weather);
  const tempDiff = Number.isFinite(fixedTemp) && avg !== null ? Math.abs(avg - fixedTemp) : null;
  const okCoord = dist < 50;
  const okTemp = tempDiff === null ? true : tempDiff <= 6;
  return {
    status: okCoord && okTemp ? "verified" : "review",
    summary: okCoord && okTemp ? "公开数据与固定数据基本一致。" : "公开数据与固定数据存在差异，建议人工复核后再改文案。",
    items: [{
      label: "地点身份",
      value: label + " · " + index.qid
    }, {
      label: "坐标核验",
      value: okCoord ? "一致，误差约 " + Math.round(dist) + " km" : "需复核，误差约 " + Math.round(dist) + " km"
    }, {
      label: "" + monthLabel(month) + "月白天气温",
      value: avg === null ? "未取得" : avg.toFixed(1) + "°C · 固定数据 " + dest.weather
    }, {
      label: "文案处理",
      value: "仅提示可信度，不自动改写"
    }]
  };
}
function App() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showFavs, setShowFavs] = useState(false);
  const [favs, setFavs] = useState(loadFavs);
  const current = MONTHS[month];
  const allDests = useMemo(() => getByMonth(month), [month]);
  const featured = useMemo(() => pickFeatured(allDests), [allDests]);
  const types = useMemo(() => TYPE_ORDER.filter(t => allDests.some(d => (d.types || []).includes(t))), [allDests]);
  const filtered = filter === "all" ? allDests : allDests.filter(d => (d.types || []).includes(filter));
  const favSet = new Set(favs);
  const toggleFav = dest => {
    const id = favId(dest);
    const next = favSet.has(id) ? favs.filter(x => x !== id) : [...favs, id];
    setFavs(next);
    saveFavs(next);
  };
  const openById = id => {
    const found = DESTINATIONS.flatMap(base => base.months.map(m => flatten(base, m.month))).find(d => favId(d) === id);
    if (found) setOpen(found);
  };
  return /*#__PURE__*/React.createElement("main", {
    className: "app-shell"
  }, /*#__PURE__*/React.createElement(TopActions, {
    favCount: favs.length,
    onSearch: () => setShowSearch(true),
    onFavs: () => setShowFavs(true)
  }), /*#__PURE__*/React.createElement(Hero, {
    current: current,
    month: month,
    setMonth: m => {
      setMonth(m);
      setFilter("all");
    },
    featured: featured,
    onOpen: setOpen
  }), /*#__PURE__*/React.createElement(ContentBand, {
    current: current,
    types: types,
    filter: filter,
    setFilter: setFilter,
    list: filtered,
    total: allDests.length,
    onOpen: setOpen
  }), /*#__PURE__*/React.createElement(BottomNav, {
    current: current,
    count: allDests.length,
    onPrev: () => {
      setMonth((month + 11) % 12);
      setFilter("all");
    },
    onNext: () => {
      setMonth((month + 1) % 12);
      setFilter("all");
    }
  }), open && /*#__PURE__*/React.createElement(DetailModal, {
    dest: open,
    onClose: () => setOpen(null),
    isFav: favSet.has(favId(open)),
    onFav: () => toggleFav(open)
  }), " ", showSearch && /*#__PURE__*/React.createElement(SearchPanel, {
    onClose: () => setShowSearch(false),
    onOpen: d => {
      setShowSearch(false);
      setOpen(d);
    }
  }), showFavs && /*#__PURE__*/React.createElement(FavPanel, {
    favs: favs,
    onClose: () => setShowFavs(false),
    onOpen: id => {
      setShowFavs(false);
      openById(id);
    }
  }));
}
function TopActions({
  favCount,
  onSearch,
  onFavs
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "top-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    "aria-label": "\u641C\u7D22",
    onClick: onSearch
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 20 20",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "9",
    r: "5.5",
    stroke: "currentColor",
    strokeWidth: "1.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.5 13.5L17 17",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    "aria-label": "\u6536\u85CF",
    onClick: onFavs
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 20 20",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 16.5C10 16.5 2.5 12 2.5 6.5C2.5 4.567 4.067 3 6 3C7.233 3 8.317 3.633 9 4.6C9.683 3.633 10.767 3 12 3C13.933 3 15.5 4.567 15.5 6.5C15.5 12 10 16.5 10 16.5Z",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), favCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "badge"
  }, favCount)));
}
function Hero({
  current,
  month,
  setMonth,
  featured,
  onOpen
}) {
  const cover = featured[0] || getByMonth(month)[0] || flatten(DESTINATIONS[0], DESTINATIONS[0].months[0].month);
  return /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("header", {
    className: "brand-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, "Levi's Travel Map"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("article", {
    className: "cover-card",
    style: bg(cover, "lg")
  }, /*#__PURE__*/React.createElement("div", {
    className: "cover-copy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, current.en, " Issue \xB7 ", getByMonth(month).length, " Places"), /*#__PURE__*/React.createElement("h1", {
    className: "cover-title serif"
  }, current.name, /*#__PURE__*/React.createElement("br", null), "\u7684\u8FDC\u65B9"), /*#__PURE__*/React.createElement("p", null, MONTH_SUB[current.id], "\u3002\u6309\u5929\u6C14\u3001\u4F53\u9A8C\u3001\u4EBA\u6D41\u548C\u9884\u7B97\u5FEB\u901F\u7F29\u5C0F\u9009\u62E9\u3002"))), /*#__PURE__*/React.createElement("div", {
    className: "planner-column"
  }, /*#__PURE__*/React.createElement("section", {
    className: "glass-panel month-panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-label"
  }, "Plan by season"), /*#__PURE__*/React.createElement("h2", null, "\u53BB\u54EA\u513F\uFF0C\u4EA4\u7ED9\u6708\u4EFD\u51B3\u5B9A\u3002"), /*#__PURE__*/React.createElement("div", {
    className: "month-tabs hs"
  }, MONTHS.map((m, i) => /*#__PURE__*/React.createElement("button", {
    key: m.id,
    className: 'month-tab ' + (month === i ? 'active' : ''),
    onClick: () => setMonth(i)
  }, /*#__PURE__*/React.createElement("span", null, m.en), /*#__PURE__*/React.createElement("span", null, getByMonth(i).length))))), /*#__PURE__*/React.createElement("section", {
    className: "featured-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "panel-label"
  }, "Editor's Picks"), /*#__PURE__*/React.createElement("h2", null, "\u672C\u6708\u7CBE\u9009")), /*#__PURE__*/React.createElement("span", {
    className: "status-chip muted"
  }, featured.length, " Editor's Picks")), /*#__PURE__*/React.createElement("div", {
    className: "featured-grid hs"
  }, featured.map(dest => /*#__PURE__*/React.createElement(FeatureCard, {
    key: favId(dest),
    dest: dest,
    onOpen: onOpen
  })))))));
}
function FeatureCard({
  dest,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: "feature-card",
    style: bg(dest),
    onClick: () => onOpen(dest)
  }, /*#__PURE__*/React.createElement("span", {
    className: "reason"
  }, reasonFor(dest)), /*#__PURE__*/React.createElement("div", {
    className: "feature-copy"
  }, /*#__PURE__*/React.createElement("h3", null, shortPlace(dest.place)), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("span", null, dest.weather), /*#__PURE__*/React.createElement("span", null, dest.crowd), /*#__PURE__*/React.createElement("span", null, dest.budget))));
}
function ContentBand({
  current,
  types,
  filter,
  setFilter,
  list,
  total,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "content-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-bar hs"
  }, /*#__PURE__*/React.createElement("button", {
    className: 'type-pill ' + (filter === 'all' ? 'active' : ''),
    onClick: () => setFilter('all')
  }, "\u5168\u90E8"), types.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    className: 'type-pill ' + (filter === t ? 'active' : ''),
    onClick: () => setFilter(t)
  }, TYPES[t].label))), /*#__PURE__*/React.createElement("div", {
    className: "all-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "all-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "panel-label"
  }, "All Destinations"), /*#__PURE__*/React.createElement("h2", {
    className: "serif"
  }, "\u6D4F\u89C8\u5168\u90E8\u76EE\u7684\u5730")), /*#__PURE__*/React.createElement("p", null, current.name, " \u5171 ", total, " \u4E2A\u7CBE\u9009\u76EE\u7684\u5730\uFF0C\u8986\u76D6\u4E9A\u6D32\u3001\u6B27\u6D32\u3001\u975E\u6D32\u3001\u5357\u5317\u7F8E\u6D32\u3002\u70B9\u5F00\u5361\u7247\u67E5\u770B\u5929\u6C14\u3001\u4F53\u9A8C\u4E0E\u9884\u7B97\u53C2\u8003\u3002")), /*#__PURE__*/React.createElement("div", {
    className: "destination-grid"
  }, list.map(dest => /*#__PURE__*/React.createElement("button", {
    className: "destination-card",
    key: favId(dest),
    style: bg(dest),
    onClick: () => onOpen(dest)
  }, /*#__PURE__*/React.createElement("b", null, dest.place), /*#__PURE__*/React.createElement("small", null, dest.highlight))))));
}
function DetailModal({
  dest,
  onClose,
  isFav,
  onFav
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("section", {
    className: "detail-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-media",
    style: bg(dest, "lg")
  }, /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose
  }, "\xD7"), /*#__PURE__*/React.createElement("button", {
    className: "modal-fav",
    onClick: onFav
  }, isFav ? '♥' : '♡'), /*#__PURE__*/React.createElement("div", {
    className: "detail-media-copy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, monthLabel(dest._currentMonth), " \xB7 ", dest.region), /*#__PURE__*/React.createElement("h2", {
    className: "serif"
  }, dest.place))), /*#__PURE__*/React.createElement("div", {
    className: "detail-content"
  }, /*#__PURE__*/React.createElement("span", {
    className: "highlight-pill"
  }, "\u2726 ", dest.highlight), /*#__PURE__*/React.createElement("div", {
    className: "stat-row"
  }, /*#__PURE__*/React.createElement("span", null, "\u6E29\u5EA6 ", dest.weather), /*#__PURE__*/React.createElement("span", null, "\u4EBA\u6D41 ", dest.crowd), /*#__PURE__*/React.createElement("span", null, "\u9884\u7B97 ", dest.budget), /*#__PURE__*/React.createElement("span", null, reasonFor(dest))), /*#__PURE__*/React.createElement(DetailSection, {
    title: "\u4E3A\u4EC0\u4E48\u8FD9\u4E2A\u6708"
  }, /*#__PURE__*/React.createElement("p", null, dest.why)), /*#__PURE__*/React.createElement(DetailSection, {
    title: "\u6838\u5FC3\u4F53\u9A8C"
  }, (dest.experiences || []).map((e, i) => /*#__PURE__*/React.createElement("div", {
    className: "experience",
    key: e.name || i
  }, /*#__PURE__*/React.createElement("span", {
    className: "experience-num"
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, e.name), /*#__PURE__*/React.createElement("small", null, e.desc))))), /*#__PURE__*/React.createElement(DetailSection, {
    title: "\u51FA\u884C\u53C2\u8003"
  }, /*#__PURE__*/React.createElement("p", null, dest.budgetDetail?.note || "先收藏为候选地，再和同行人比较天气、预算与体验优先级。")), /*#__PURE__*/React.createElement(VerificationBox, {
    dest: dest
  }))));
}
function DetailSection({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "detail-section"
  }, /*#__PURE__*/React.createElement("h3", null, title), children);
}
function VerificationBox({
  dest
}) {
  const supported = !!VERIFY_INDEX[dest.place];
  // phase: 'loading' | 'done' | 'hide'；status: 'verified' | 'review'
  const [phase, setPhase] = useState(() => !supported ? 'hide' : loadVerifyCache(dest) ? 'done' : 'loading');
  const [status, setStatus] = useState(() => supported ? loadVerifyCache(dest) : null);
  useEffect(() => {
    if (!supported) {
      setPhase('hide');
      return;
    }
    const cached = loadVerifyCache(dest);
    if (cached) {
      setStatus(cached);
      setPhase('done');
      return;
    }
    let alive = true;
    setPhase('loading');
    verifyDestination(dest).then(r => {
      if (!alive) return;
      const s = r.status === 'verified' || r.status === 'review' ? r.status : null;
      if (!s) {
        setPhase('hide');
        return;
      }
      setStatus(s);
      setPhase('done');
      saveVerifyCache(dest, s);
    }).catch(() => {
      if (alive) setPhase('hide');
    });
    return () => {
      alive = false;
    };
  }, [dest.place, dest._currentMonth]);
  if (phase === 'hide') return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "detail-section"
  }, /*#__PURE__*/React.createElement("h3", null, "\u6570\u636E\u53EF\u4FE1\u5EA6"), phase === 'loading' ? /*#__PURE__*/React.createElement("span", {
    className: "status-chip muted"
  }, "\u6838\u5BF9\u4E2D\u2026") : /*#__PURE__*/React.createElement("span", {
    className: "status-chip"
  }, "\u2713 ", status === 'verified' ? '地点与当月气候数据已核对' : '地点已核对 · 气温为参考值'));
}
function SearchPanel({
  onClose,
  onOpen
}) {
  const [q, setQ] = useState("");
  const all = useMemo(() => DESTINATIONS.flatMap(base => base.months.map(m => flatten(base, m.month))), []);
  const list = all.filter(d => !q.trim() || [d.place, d.region, d.highlight, (d.types || []).map(t => TYPES[t]?.label).join(" ")].join(" ").toLowerCase().includes(q.trim().toLowerCase())).slice(0, 30);
  return /*#__PURE__*/React.createElement("section", {
    className: "overlay-sheet"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-top"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "serif"
  }, "\u641C\u7D22\u76EE\u7684\u5730"), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    onClick: onClose
  }, "\xD7")), /*#__PURE__*/React.createElement("input", {
    className: "search-field",
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "\u8F93\u5165\u57CE\u5E02\u3001\u5730\u533A\u6216\u4F53\u9A8C",
    autoFocus: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "result-list"
  }, list.map(d => /*#__PURE__*/React.createElement("button", {
    className: "mini-result",
    key: favId(d),
    onClick: () => onOpen(d)
  }, /*#__PURE__*/React.createElement("b", null, d.place), /*#__PURE__*/React.createElement("span", null, monthLabel(d._currentMonth), " \xB7 ", d.highlight)))));
}
function FavPanel({
  favs,
  onClose,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "overlay-sheet"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-top"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "serif"
  }, "\u5019\u9009\u6E05\u5355"), /*#__PURE__*/React.createElement("button", {
    className: "icon-btn",
    onClick: onClose
  }, "\xD7")), favs.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "empty-copy"
  }, "\u8FD8\u6CA1\u6709\u6536\u85CF\u3002\u6253\u5F00\u4E00\u4E2A\u76EE\u7684\u5730\uFF0C\u70B9\u53F3\u4E0A\u89D2\u7684\u5FC3\u5F62\u5373\u53EF\u52A0\u5165\u5019\u9009\u3002") : /*#__PURE__*/React.createElement("div", {
    className: "result-list"
  }, favs.map(id => {
    const parts = id.split('::');
    return /*#__PURE__*/React.createElement("button", {
      className: "mini-result",
      key: id,
      onClick: () => onOpen(id)
    }, /*#__PURE__*/React.createElement("b", null, parts[0]), /*#__PURE__*/React.createElement("span", null, monthLabel(Number(parts[1])), " \xB7 \u70B9\u51FB\u67E5\u770B\u8BE6\u60C5"));
  })));
}
function BottomNav({
  current,
  count,
  onPrev,
  onNext
}) {
  return /*#__PURE__*/React.createElement("nav", {
    className: "bottom-nav"
  }, /*#__PURE__*/React.createElement("button", {
    className: "nav-arrow",
    onClick: onPrev
  }, "\u2039"), /*#__PURE__*/React.createElement("button", {
    className: "month-current"
  }, current.name, /*#__PURE__*/React.createElement("span", null, current.en, " \xB7 ", count, " places")), /*#__PURE__*/React.createElement("button", {
    className: "nav-arrow",
    onClick: onNext
  }, "\u203A"));
}

/* ═══ Unsplash API 图片补全 ═══
 * 1. 前往 https://unsplash.com/developers 注册应用
 * 2. 复制 Access Key 填入下方
 * 留空时跳过 API，仅使用已验证的静态图片
 */
const UNSPLASH_KEY = "";
const IMG_CACHE_KEY = "ltm_img_v2";
function loadImgCache() {
  try {
    return JSON.parse(localStorage.getItem(IMG_CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}
function saveImgCache(c) {
  try {
    localStorage.setItem(IMG_CACHE_KEY, JSON.stringify(c));
  } catch {}
}
async function checkImg(url) {
  return new Promise(res => {
    const i = new Image();
    i.onload = () => res(true);
    i.onerror = () => res(false);
    i.src = url;
  });
}
async function bootstrap() {
  // 1. 注入 localStorage 缓存（API 拉取过的图片）
  const cache = loadImgCache();
  Object.entries(cache).forEach(([p, u]) => {
    if (!DEST_IMG[p]) DEST_IMG[p] = u;
  });

  // 2. 立即渲染：图库已在构建期逐张验证，无需阻塞式全量预加载；
  //    浏览器只按需懒加载当前可见的图，首屏更快、流量更省（失败仍回退到月份通用图）。
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(/*#__PURE__*/React.createElement(App, null));

  // 3. 后台拉取缺失图片（若配置了 API Key）
  if (UNSPLASH_KEY) fetchMissingImages(root, cache);
}
async function fetchMissingImages(root, cache) {
  const allPlaces = [...new Set(DESTINATIONS.map(d => d.place))];
  const missing = allPlaces.filter(p => !DEST_IMG[p]);
  if (!missing.length) return;
  let updated = false;
  for (const place of missing) {
    try {
      // 优先用 VERIFY_INDEX 里的英文名，否则直接用中文（Unsplash 支持）
      const q = encodeURIComponent(VERIFY_INDEX[place]?.name || place);
      const res = await fetch(`https://api.unsplash.com/photos/random?query=${q}&orientation=landscape&content_filter=high&client_id=${UNSPLASH_KEY}`);
      if (!res.ok) continue;
      const data = await res.json();
      const url = data?.urls?.regular;
      if (url) {
        DEST_IMG[place] = url;
        cache[place] = url;
        updated = true;
      }
    } catch {}
    // 每次请求间隔 300ms，避免触发速率限制（50次/小时免费额度）
    await new Promise(r => setTimeout(r, 300));
  }
  if (updated) {
    saveImgCache(cache);
    root.render(/*#__PURE__*/React.createElement(App, null)); // 用新图重渲染
    console.log(`[LTM] 通过 Unsplash API 补全了 ${missing.length} 张图片并已缓存`);
  }
}
bootstrap();
