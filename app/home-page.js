"use client";

const rawConfig = {
  passages: {
    P1: {
      icon: "📄",
      levels: {
        高频: {
          icon: "🔥",
          articles: [
            {
              id: "P1_TEA",
              title: "1.A Brief History of Tea",
              subtitle: "茶叶简史",
              file: "P1/A Brief History of Tea.html"
            },
            {
              id: "P1_SURVIVOR",
              title: "2.A survivor’s story",
              subtitle: "新西兰猫头鹰",
              file: "P1/A survivor’s story.html"
            },
            {
              id: "P1_FISHBOURNE",
              title: "8.Fishbourne Roman Palace",
              subtitle: "罗马宫殿",
              file: "P1/Fishbourne Roman Palace.html"
            },
            {
              id: "P1_RUBBER",
              title: "12.Rubber",
              subtitle: "橡胶",
              file: "P1/Rubber.html"
            },
            {
              id: "P1_SYDNEY_OPERA",
              title: "14.Sydney Opera House",
              subtitle: "悉尼歌剧院",
              file: "P1/Sydney Opera House.html"
            },
            {
              id: "P1_POTATO",
              title: "19.The Impact of the Potato",
              subtitle: "土豆的影响",
              file: "P1/The Impact of the Potato.html"
            },
            {
              id: "P1_THAMES_TUNNEL",
              title: "29.Tunnelling under the Thames",
              subtitle: "泰晤士河隧道",
              file: "P1/Tunnelling under the Thames.html"
            },
            {
              id: "P1_LUCY",
              title: "30.What Lucy Taught Us",
              subtitle: "露西化石",
              file: "P1/What Lucy Taught Us.html"
            },
            {
              id: "P1_031",
              title: "31.William Gilbert and Magnetism",
              subtitle: "电磁学之父",
              file: "P1/William Gilbert and Magnetism.html"
            },
            {
              id: "P1_102",
              title: "102.Katherine Mansfield",
              subtitle: "新西兰作家",
              file: "P1/Katherine Mansfield.html"
            },
            {
              id: "P1_PLASTICS",
              title: "116.The Development of Plastics",
              subtitle: "塑料的发展史",
              file: "P1/The Development of Plastics.html"
            },
            {
              id: "P1_FOOTPRINTS",
              title: "122.Footprints in the Mud",
              subtitle: "恐龙脚印",
              file: "P1/Footprints in the Mud.html"
            },
            {
              id: "P1_DOLLS",
              title: "126.Dolls through the ages",
              subtitle: "玩偶的变迁史",
              file: "P1/Dolls through the ages.html"
            },
            {
              id: "P1_PYRAMID",
              title: "128.The Pyramid of Cestius",
              subtitle: "罗马金字塔",
              file: "P1/The Pyramid of Cestius.html"
            },
            {
              id: "P1_SLEEP_STUDY",
              title: "139.Sleep Study on 部落",
              subtitle: "部落睡眠研究",
              file: "P1/Sleep Study on Modern-Day Hunter-Gatherers Dispels Popular Notions.html"
            },
            {
              id: "P1_GUITAR",
              title: "141.The history of the guitar",
              subtitle: "吉他的历史",
              file: "P1/The history of the guitar.html"
            },
            {
              id: "P1_OLIVE_OIL",
              title: "146.The Early History of Olive Oil",
              subtitle: "橄榄油的历史",
              file: "P1/The Early History of Olive Oil.html"
            },
            {
              id: "P1_PROSOPAGNOSIA",
              title: "152.Sorry—who are you",
              subtitle: "脸盲症",
              file: "P1/Sorry—who are you.html"
            },
            {
              id: "P1_HUMANS_FOOD",
              title: "155.A Brief History of Humans and Food",
              subtitle: "人类食物的历史",
              file: "P1/A Brief History of Humans and Food.html"
            },
            {
              id: "P1_AHEAD_OF_TIME",
              title: "211.Ahead of its time",
              subtitle: "新西兰头骨",
              file: "P1/Ahead of its time.html"
            },
            {
              id: "P1_CANE_TOAD",
              title: "216.Australia's cane toad problem",
              subtitle: "澳洲蟾蜍",
              file: "P1/Australia's cane toad problem.html"
            },
            {
              id: "P1_MAORI_HOOKS",
              title: "(删)10.Maori Fish Hooks",
              subtitle: "毛利鱼钩",
              file: "P1/Maori Fish Hooks.html"
            },
            {
              id: "P1_SILK_INDUSTRY",
              title: "(删)17.The Development of The Silk Industry",
              subtitle: "丝绸产业发展",
              file: "P1/The Development of The Silk Industry.html"
            },
            {
              id: "P1_BUSINESS_CARDS",
              title: "(删)20.The Importance of Business Cards",
              subtitle: "名片的重要性",
              file: "P1/The Importance of Business Cards.html"
            },
            {
              id: "P1_032",
              title: "(删)32.Wood",
              subtitle: "新西兰木材产业",
              file: "P1/Wood A Valuable Resource in New Zealand's Economy.html"
            },
            {
              id: "P1_SLOW_FOOD",
              title: "(删)129.The Slow Food Organization",
              subtitle: "慢食运动组织",
              file: "P1/The Slow Food Organization.html"
            },
            {
              id: "P1_BURGESS",
              title: "(删)140.The Burgess Shale fossils",
              subtitle: "伯吉斯页岩",
              file: "P1/The Burgess Shale fossils.html"
            }
          ]
        },
        次高频: {
          icon: "⭐",
          articles: [
            {
              id: "P1_AMBERGRIS",
              title: "4.Ambergris",
              subtitle: "龙涎香",
              file: "P1/Ambergris.html"
            },
            {
              id: "P1_OCEAN_SOUND",
              title: "9.Listening to the Ocean",
              subtitle: "海洋探测",
              file: "P1/Listening to the Ocean.html"
            },
            {
              id: "P1_MAORI_HOOKS",
              title: "10.Maori Fish Hooks",
              subtitle: "毛利鱼钩",
              file: "P1/Maori Fish Hooks.html"
            },
            {
              id: "P1_UNIVERSITY_DRAMA",
              title: "11.Report on a university drama project",
              subtitle: "大学戏剧项目报告",
              file: "P1/Report on a university drama project.html"
            },
            {
              id: "P1_SILK_INDUSTRY",
              title: "17.The Development of The Silk Industry",
              subtitle: "丝绸产业发展",
              file: "P1/The Development of The Silk Industry.html"
            },
            {
              id: "P1_BUSINESS_CARDS",
              title: "20.The Importance of Business Cards",
              subtitle: "名片的重要性",
              file: "P1/The Importance of Business Cards.html"
            },
            {
              id: "P1_BEATRIX_POTTER",
              title: "21.The life of Beatrix Potter",
              subtitle: "彼得兔作家",
              file: "P1/The life of Beatrix Potter.html"
            },
            {
              id: "P1_PAPER_ORIGIN",
              title: "23.The Origin of Paper",
              subtitle: "造纸术起源",
              file: "P1/The Origin of Paper.html"
            },
            {
              id: "P1_PEARLS",
              title: "24.The Pearls",
              subtitle: "珍珠",
              file: "P1/The Pearls.html"
            },
            {
              id: "P1_THOMAS_YOUNG",
              title: "27.Thomas Young The last man who knew everything",
              subtitle: "托马斯杨",
              file: "P1/Thomas Young The last man who knew everything.html"
            },
            {
              id: "P1_032",
              title: "32.Wood",
              subtitle: "新西兰木材产业",
              file: "P1/Wood A Valuable Resource in New Zealand's Economy.html"
            },
            {
              id: "P1_DYES",
              title: "134.Dyes and fabric dyeing",
              subtitle: "染料的历史",
              file: "P1/Dyes and fabric dyeing.html"
            },
            {
              id: "P1_BURGESS",
              title: "140.The Burgess Shale fossils",
              subtitle: "伯吉斯页岩",
              file: "P1/The Burgess Shale fossils.html"
            },
            {
              id: "P1_CARNIVOROUS_PLANTS",
              title: "153.Carnivorous plants",
              subtitle: "食虫植物",
              file: "P1/Carnivorous plants.html"
            },
            {
              id: "P1_THINK_SMALL",
              title: "172.Think Small",
              subtitle: "微观科学",
              file: "P1/Think Small.html"
            },
            {
              id: "P1_DUST",
              title: "181.Dust and the American West",
              subtitle: "美国西部尘埃",
              file: "P1/Dust and the American West.html"
            },
            {
              id: "P1_BAR_CODE",
              title: "188.The history of the bar code",
              subtitle: "条形码的历史",
              file: "P1/The history of the bar code.html"
            },
            {
              id: "P1_BRITISH_WOOL",
              title: "194.The history of the British wool industry",
              subtitle: "英国羊毛产业的历史",
              file: "P1/The history of the British wool industry.html"
            },
            {
              id: "P1_AIRBORNE_DENTISTS",
              title: "200.Australia's Airborne Dentists",
              subtitle: "澳洲飞行牙医",
              file: "P1/Australia's Airborne Dentists.html"
            },
            {
              id: "P1_CLIPPER_RACES",
              title: "(删)16.The Clipper Races",
              subtitle: "帆船竞速",
              file: "P1/The Clipper Races.html"
            },
            {
              id: "P1_CAVE_BEAR",
              title: "(删)124.The extinction of the cave bear",
              subtitle: "洞熊的灭绝",
              file: "P1/The extinction of the cave bear.html"
            },
            {
              id: "P1_CUNEIFORM",
              title: "(删)160.An important language development",
              subtitle: "楔形文字",
              file: "P1/An important language development.html"
            },
            {
              id: "P1_FOOD_DESERT",
              title: "(删)163.How to find your way out of a food desert",
              subtitle: "城市食物荒漠",
              file: "P1/How to find your way out of a food desert.html"
            },
            {
              id: "P1_SMELL",
              title: "(删)170.The unsung sense",
              subtitle: "被低估的嗅觉",
              file: "P1/The unsung sense.html"
            }
          ]
        }
      }
    },
    P2: {
      icon: "📃",
      levels: {
        高频: {
          icon: "🔥",
          articles: [
            {
              id: "P2_TALBOT_PARK",
              number: 1,
              title: "33.A new look for Talbot Park",
              subtitle: "奥克兰社区改造",
              file: "P2/A new look for Talbot Park.html"
            },
            {
              id: "P2_SPIDER_SILK",
              number: 2,
              title: "34.A unique golden textile",
              subtitle: "蜘蛛丝",
              file: "P2/A unique golden textile.html"
            },
            {
              id: "P2_BIRD_MIGRATION",
              number: 3,
              title: "36.Bird Migration",
              subtitle: "鸟类迁徙",
              file: "P2/Bird Migration.html"
            },
            {
              id: "P2_CSR",
              number: 4,
              title: "37.Corporate Social Responsibility",
              subtitle: "企业社会责任",
              file: "P2/Corporate Social Responsibility.html"
            },
            {
              id: "P2_DESERTS",
              number: 5,
              title: "39.How are deserts formed",
              subtitle: "沙漠成因",
              file: "P2/How are deserts formed.html"
            },
            {
              id: "P2_INTELLIGENT_BIRDS",
              number: 6,
              title: "41.Intelligent behaviour in birds",
              subtitle: "鸟类智慧行为",
              file: "P2/Intelligent behaviour in birds.html"
            },
            {
              id: "P2_INVESTMENT_SHARES",
              number: 7,
              title: "42.Investment in shares versus investment in other assets",
              subtitle: "回报数据分析",
              file: "P2/Investment in shares versus investment in other assets.html"
            },
            {
              id: "P2_ROMANS",
              number: 8,
              title: "43.Learning from the Romans",
              subtitle: "罗马混凝土",
              file: "P2/Learning from the Romans.html"
            },
            {
              id: "P2_SOCCER",
              number: 9,
              title: "45.Playing soccer",
              subtitle: "街头足球",
              file: "P2/Playing soccer.html"
            },
            {
              id: "P2_ROLLER_COASTER",
              number: 10,
              title: "46.Roller coaster",
              subtitle: "过山车",
              file: "P2/Roller coaster.html"
            },
            {
              id: "P2_MALARIA",
              number: 11,
              title: "50.The conquest of malaria in Italy",
              subtitle: "意大利疟疾防治",
              file: "P2/The conquest of malaria in Italy.html"
            },
            {
              id: "P2_ATTINE_ANTS",
              number: 12,
              title: "52.The fascinating world of attine ants",
              subtitle: "切叶蚁",
              file: "P2/The fascinating world of attine ants.html"
            },
            {
              id: "P2_TASMANIAN",
              number: 13,
              title: "57.The Tasmanian Tiger",
              subtitle: "袋狼",
              file: "P2/The Tasmanian Tiger.html"
            },
            {
              id: "P2_IMPORTANCE_OF_LAW",
              number: 14,
              title: "112.The Importance of Law",
              subtitle: "法律的意义",
              file: "P2/The Importance of Law.html"
            },
            {
              id: "P2_HERBAL",
              number: 15,
              title: "113.Herbal Medicines",
              subtitle: "新西兰草药",
              file: "P2/Herbal Medicines.html"
            },
            {
              id: "P2_MIND_MUSIC",
              number: 16,
              title: "115.Mind Music",
              subtitle: "脑海中的音乐(心灵音乐)",
              file: "P2/Mind Music.html"
            },
            {
              id: "P2_CALORIE",
              number: 17,
              title: "120.Will Eating Less Make You Live Longer",
              subtitle: "节食与长寿",
              file: "P2/Will Eating Less Make You Live Longer.html"
            },
            {
              id: "P2_KEEPING_WATER_AWAY",
              number: 18,
              title: "131.Keeping the water away",
              subtitle: "洪水防控",
              file: "P2/Keeping the water away.html"
            },
            {
              id: "P2_NEW_FILTER",
              number: 19,
              title: "156.New filter promises clean water for millions",
              subtitle: "新型泥土净水器",
              file: "P2/New filter promises clean water for millions.html"
            },
            {
              id: "P2_URBAN_REGENERATION",
              number: 20,
              title: "176.Urban Regeneration",
              subtitle: "柏林公园改造",
              file: "P2/Urban Regeneration.html"
            },
            {
              id: "P2_CAMOUFLAGE",
              number: 21,
              title: "180.Australia's camouflaged creatures",
              subtitle: "澳洲伪装生物",
              file: "P2/Australia's camouflaged creatures.html"
            },
            {
              id: "P2_MULTITASKING",
              number: 22,
              title: "201.Multi-tasking and the brain",
              subtitle: "大脑与多任务处理",
              file: "P2/Multi-tasking and the brain.html"
            },
            {
              id: "P2_ASTEROID",
              number: 11,
              title: "(删)55.The plan to bring an asteroid to Earth",
              subtitle: "捕获小行星",
              file: "P2/The plan to bring an asteroid to Earth.html"
            },
            {
              id: "P2_TOMATO",
              number: 15,
              title: "(删)119.The Constant Evolution of the Humble Tomato",
              subtitle: "番茄的演化",
              file: "P2/The Constant Evolution of the Humble Tomato.html"
            },
            {
              id: "P2_MULTITASKING_OLD",
              number: 40,
              title: "(删)40.How Well Do We Concentrate",
              subtitle: "多任务处理",
              file: "P2/How Well Do We Concentrate.html"
            },
            {
              id: "P2_WASTE_DISPOSAL",
              number: 10,
              title: "(删)48.Solving the problem of waste disposal",
              subtitle: "垃圾处理",
              file: "P2/Solving the problem of waste disposal.html"
            }
          ]
        },
        次高频: {
          icon: "⭐",
          articles: [
            {
              id: "P2_SKYSCRAPER_FARMING",
              number: 1,
              title: "47.Skyscraper Farming",
              subtitle: "摩天大楼种植",
              file: "P2/Skyscraper Farming.html"
            },
            {
              id: "P2_WASTE_DISPOSAL",
              number: 2,
              title: "48.Solving the problem of waste disposal",
              subtitle: "垃圾处理",
              file: "P2/Solving the problem of waste disposal.html"
            },
            {
              id: "P2_SURVIVING_CITY_LIFE",
              number: 3,
              title: "49.Surviving city life",
              subtitle: "动物适应城市",
              file: "P2/Surviving city life.html"
            },
            {
              id: "P2_FASHION_INDUSTRY",
              number: 4,
              title: "53.The fashion industry",
              subtitle: "时尚产业",
              file: "P2/The fashion industry.html"
            },
            {
              id: "P2_ASTEROID",
              number: 5,
              title: "55.The plan to bring an asteroid to Earth",
              subtitle: "捕获小行星",
              file: "P2/The plan to bring an asteroid to Earth.html"
            },
            {
              id: "P2_MONKEY",
              number: 6,
              title: "56.The return of monkey life",
              subtitle: "猴群回归",
              file: "P2/The return of monkey life.html"
            },
            {
              id: "P2_SHAKESPEARE",
              number: 7,
              title: "58.Who wrote Shakespeare's plays",
              subtitle: "莎士比亚",
              file: "P2/Who wrote Shakespeare's plays.html"
            },
            {
              id: "P2_CELEBRITY",
              number: 8,
              title: "107.A study of western celebrity",
              subtitle: "西方名人",
              file: "P2/A study of western celebrity.html"
            },
            {
              id: "P2_SPACE_EXPLORATION",
              number: 9,
              title: "110.Should space be explored by robots or by humans",
              subtitle: "人机太空探索",
              file: "P2/Should space be explored by robots or by humans.html"
            },
            {
              id: "P2_STRESS_LESS",
              number: 10,
              title: "117.Stress Less",
              subtitle: "工作压力",
              file: "P2/Stress Less.html"
            },
            {
              id: "P2_TOMATO",
              number: 11,
              title: "119.The Constant Evolution of the Humble Tomato",
              subtitle: "番茄的演化",
              file: "P2/The Constant Evolution of the Humble Tomato.html"
            },
            {
              id: "P2_MUSCLE_LOSS",
              number: 12,
              title: "121.Muscle Loss",
              subtitle: "肌肉流失",
              file: "P2/Muscle Loss.html"
            },
            {
              id: "P2_SLEEP",
              number: 13,
              title: "135.The Myth of the Eight-hour Sleep",
              subtitle: "八小时睡眠",
              file: "P2/The Myth of the Eight-hour Sleep.html"
            },
            {
              id: "P2_JELLYFISH",
              number: 14,
              title: "143.Jellyfish – The Dominant Species",
              subtitle: "水母-海洋中的优势物种",
              file: "P2/Jellyfish – The Dominant Species.html"
            },
            {
              id: "P2_POWER_OF_SMELL",
              number: 15,
              title: "164.The Power of Smell",
              subtitle: "嗅觉的力量",
              file: "P2/The Power of Smell.html"
            },
            {
              id: "P2_MAMMOTH_KILL",
              number: 16,
              title: "168.Mammoth Kill",
              subtitle: "猛犸象的灭绝",
              file: "P2/Mammoth Kill.html"
            },
            {
              id: "P2_ANTARCTIC_RESEARCH",
              number: 17,
              title: "182.Antarctic research",
              subtitle: "南极考察",
              file: "P2/Antarctic research.html"
            },
            {
              id: "P2_PLAYFUL",
              number: 18,
              title: "183.The importance of being playful",
              subtitle: "玩耍的重要性",
              file: "P2/The importance of being playful.html"
            },
            {
              id: "P2_CLIMATE_ECONOMY",
              number: 19,
              title: "191.The economic effect of climate change",
              subtitle: "气候对经济的影响",
              file: "P2/The economic effect of climate change.html"
            },
            {
              id: "P2_MEAT",
              number: 20,
              title: "192.Should we stop eating meat",
              subtitle: "是否应该吃素",
              file: "P2/Should we stop eating meat.html"
            },
            {
              id: "P2_DECISION_FATIGUE",
              number: 21,
              title: "209.Decision Fatigue",
              subtitle: "决策疲劳",
              file: "P2/Decision Fatigue.html"
            },
            {
              id: "P2_GROWING_MORE",
              number: 22,
              title: "213.Growing more for less",
              subtitle: "卫星农业",
              file: "P2/Growing more for less.html"
            },
            {
              id: "P2_MECHANICAL_FRIEND",
              number: 23,
              title: "217.A mechanical friend for children",
              subtitle: "孩子的机器人朋友",
              file: "P2/A mechanical friend for children.html"
            },
            {
              id: "P2_ORG_DESIGN",
              number: 6,
              title: "(删)106.Early Approaches to Organisational Design",
              subtitle: "组织设计",
              file: "P2/Early Approaches to Organisational Design.html"
            },
            {
              id: "P2_HAPPY",
              number: 11,
              title: "(删)133.How to be Happy",
              subtitle: "如何获得幸福",
              file: "P2/How to be Happy.html"
            },
            {
              id: "P2_MUSIC",
              number: 15,
              title: "(删)190.The power of music",
              subtitle: "音乐的力量",
              file: "P2/The power of music.html"
            },
            {
              id: "P2_DINGO_DEBATE",
              number: 51,
              title: "(删)51.The dingo debate",
              subtitle: "澳洲野犬",
              file: "P2/The dingo debate.html"
            }
          ]
        }
      }
    },
    P3: {
      icon: "📋",
      levels: {
        高频: {
          icon: "🔥",
          articles: [
            {
              id: "P3_VERBAL_NONVERBAL",
              number: 1,
              title: "60.A closer examination(verbal&non-verbal)",
              subtitle: "语言表达研究",
              file: "P3/A closer examination of a study on verbal and non-verbal messages.html"
            },
            {
              id: "P3_BOOK_REVIEW",
              number: 2,
              title: "61.Book Review The Discovery of Slowness",
              subtitle: "富兰克林(慢的发现)",
              file: "P3/Book Review The Discovery of Slowness.html"
            },
            {
              id: "P3_EVO_PSYCH",
              number: 3,
              title: "62.Charles Darwin and Evolutionary Psychology",
              subtitle: "进化心理学",
              file: "P3/Charles Darwin and Evolutionary Psychology.html"
            },
            {
              id: "P3_CLASS_SIZE",
              number: 4,
              title: "65.Does class size matter",
              subtitle: "课堂规模",
              file: "P3/Does class size matter.html"
            },
            {
              id: "P3_INSECT_ROBOTS",
              number: 5,
              title: "70.Insect-inspired robots",
              subtitle: "昆虫机器人",
              file: "P3/Insect-inspired robots.html"
            },
            {
              id: "P3_JEAN_PIAGET",
              number: 6,
              title: "71.Jean Piaget (1896–1980)",
              subtitle: "让·皮亚杰",
              file: "P3/Jean Piaget (1896–1980).html"
            },
            {
              id: "P3_LIVING_DUNES",
              number: 7,
              title: "76.Living dunes",
              subtitle: "流动沙丘",
              file: "P3/Living dunes.html"
            },
            {
              id: "P3_REBRANDING",
              number: 8,
              title: "80.Rebranding art museums",
              subtitle: "博物馆品牌重塑",
              file: "P3/Rebranding art museums.html"
            },
            {
              id: "P3_STEVENSON",
              number: 9,
              title: "81.Robert Louis Stevenson",
              subtitle: "苏格兰作家",
              file: "P3/Robert Louis Stevenson.html"
            },
            {
              id: "P3_HEADPHONES",
              number: 10,
              title: "82.Some views on the use of headphones",
              subtitle: "耳机使用",
              file: "P3/Some views on the use of headphones.html"
            },
            {
              id: "P3_TERMITE_MOUNDS",
              number: 11,
              title: "83.Termite Mounds",
              subtitle: "白蚁丘",
              file: "P3/Termite Mounds.html"
            },
            {
              id: "P3_FEAR",
              number: 12,
              title: "84.The Analysis of Fear",
              subtitle: "猴子恐惧实验",
              file: "P3/The Analysis of Fear.html"
            },
            {
              id: "P3_DECEPTION",
              number: 13,
              title: "85.The Art of Deception",
              subtitle: "欺骗的艺术",
              file: "P3/The Art of Deception.html"
            },
            {
              id: "P3_MARGARET_MAHY",
              number: 14,
              title: "91.The New Zealand writer Margaret Mahy",
              subtitle: "新西兰女作家",
              file: "P3/The New Zealand writer Margaret Mahy.html"
            },
            {
              id: "P3_MOTHER_TONGUE",
              number: 15,
              title: "95.The Significant Role of Mother Tongue in Education",
              subtitle: "母语教育",
              file: "P3/The Significant Role of Mother Tongue in Education.html"
            },
            {
              id: "P3_TUATARA",
              number: 16,
              title: "96.The tuatara – past and future",
              subtitle: "新西兰蜥蜴",
              file: "P3/The tuatara – past and future.html"
            },
            {
              id: "P3_VOYNICH",
              number: 17,
              title: "99.Voynich Manuscript",
              subtitle: "伏尼契手稿",
              file: "P3/Voynich Manuscript.html"
            },
            {
              id: "P3_MUSICAL_EXPERT",
              number: 18,
              title: "100.What makes a musical expert",
              subtitle: "音乐天赋",
              file: "P3/What makes a musical expert.html"
            },
            {
              id: "P3_YAWNING",
              number: 19,
              title: "101.Yawning",
              subtitle: "打呵欠",
              file: "P3/Yawning.html"
            },
            {
              id: "P3_SCIENCE_FILM",
              number: 20,
              title: "127.Science and Filmmaking (CGI)",
              subtitle: "电影科学(CGI)",
              file: "P3/Science and Filmmaking (CGI).html"
            },
            {
              id: "P3_MONA",
              number: 21,
              title: "130.Tasmania’s Museum of Old&New Art",
              subtitle: "塔斯马尼亚古今艺术博物馆 MONA",
              file: "P3/Tasmania’s Museum of Old and New Art.html"
            },
            {
              id: "P3_TEACHING_STYLES",
              number: 22,
              title: "132.Research into the effects of different teaching styles",
              subtitle: "教学风格研究",
              file: "P3/Research into the effects of different teaching styles.html"
            },
            {
              id: "P3_PATIENT_SAFETY",
              number: 23,
              title: "148.Improving Patient Safety",
              subtitle: "药品包装设计",
              file: "P3/Improving Patient Safety.html"
            },
            {
              id: "P3_SIGHT",
              number: 24,
              title: "184.The strange world of sight",
              subtitle: "奇异的视觉世界",
              file: "P3/The strange world of sight.html"
            },
            {
              id: "P3_PETROL_POWER",
              number: 25,
              title: "187.Petrol power an eco-revolution",
              subtitle: "交通的革命",
              file: "P3/Petrol power an eco-revolution.html"
            },
            {
              id: "P3_DEAF_TO_MUSIC",
              number: 26,
              title: "204.When people are 'deaf' to music",
              subtitle: "失乐症",
              file: "P3/When people are 'deaf' to music.html"
            },
            {
              id: "P3_AUSTRALIAN_LANDSCAPES",
              number: 27,
              title: "206.200 Years of Australian Landscapes",
              subtitle: "澳大利亚风景画200年",
              file: "P3/200 Years of Australian Landscapes at the Royal Academy in London.html"
            },
            {
              id: "P3_CHILDREN_LITERATURE",
              number: 28,
              title: "212.Children's literature studies today",
              subtitle: "儿童文学",
              file: "P3/Children's literature studies today.html"
            },
            {
              id: "P3_LINGUISTIC_CHANGE",
              number: 29,
              title: "218.The Causes of Linguistic Change",
              subtitle: "语言的演变",
              file: "P3/The Causes of Linguistic Change.html"
            },
            {
              id: "P3_ELEPHANT",
              number: 2,
              title: "(删)66.Elephant Communication",
              subtitle: "大象交流",
              file: "P3/Elephant Communication.html"
            },
            {
              id: "P3_FLOWER_POWER",
              number: 3,
              title: "(删)67.Flower Power",
              subtitle: "鲜花的力量(花之力)",
              file: "P3/Flower Power.html"
            },
            {
              id: "P3_FRUIT_BOOK",
              number: 11,
              title: "(删)89.The Fruit Book",
              subtitle: "果实之书",
              file: "P3/The Fruit Book.html"
            },
            {
              id: "P3_PIRAHA",
              number: 13,
              title: "(删)92.The Pirahã people of Brazil",
              subtitle: "巴西皮拉罕部落语言",
              file: "P3/The Pirahã people of Brazil.html"
            },
            {
              id: "P3_STAR_PERFORMERS",
              number: 16,
              title: "(删)104.Star Performers",
              subtitle: "明星员工",
              file: "P3/Star Performers.html"
            },
            {
              id: "P3_NEANDERTHAL",
              number: 17,
              title: "(删)118.Neanderthal Technology",
              subtitle: "尼安德特人的生存技艺",
              file: "P3/Neanderthal Technology.html"
            },
            {
              id: "P3_SOCIAL_HISTORY",
              number: 20,
              title: "(删)137.What is social history",
              subtitle: "社会史",
              file: "P3/What is social history.html"
            },
            {
              id: "P3_FAN_MIND",
              number: 22,
              title: "(删)151.Inside the mind of a fan",
              subtitle: "观赛心境",
              file: "P3/Inside the mind of a fan.html"
            },
            {
              id: "P3_MERCATOR",
              number: 23,
              title: "(删)158.Mercator - The Map Maker",
              subtitle: "地理制图师",
              file: "P3/Mercator - The Map Maker.html"
            },
            {
              id: "P3_ROME",
              number: 24,
              title: "(删)179.Looking at daily life in ancient Rome",
              subtitle: "古罗马的日常",
              file: "P3/Looking at daily life in ancient Rome.html"
            },
            {
              id: "P3_MARKETING",
              number: 26,
              title: "(删)77.Marketing and the information age",
              subtitle: "信息时代营销",
              file: "P3/Marketing and the information age.html"
            },
            {
              id: "P3_INSTRUMENT",
              number: 27,
              title: "(删)86.The benefits of learning an instrument",
              subtitle: "学乐器的好处",
              file: "P3/The benefits of learning an instrument.html"
            },
            {
              id: "P3_IMAGES_PLACES",
              number: 29,
              title: "(删)123.Images and Places",
              subtitle: "图像与地点",
              file: "P3/Images and Places.html"
            }
          ]
        },
        次高频: {
          icon: "⭐",
          articles: [
            {
              id: "P3_ELEPHANT",
              number: 1,
              title: "66.Elephant Communication",
              subtitle: "大象交流",
              file: "P3/Elephant Communication.html"
            },
            {
              id: "P3_FLOWER_POWER",
              number: 2,
              title: "67.Flower Power",
              subtitle: "鲜花的力量(花之力)",
              file: "P3/Flower Power.html"
            },
            {
              id: "P3_LIFE_ON_MARS",
              number: 3,
              title: "75.Life on Mars",
              subtitle: "火星地球化改造",
              file: "P3/Life on Mars.html"
            },
            {
              id: "P3_MARKETING",
              number: 4,
              title: "77.Marketing and the information age",
              subtitle: "信息时代营销",
              file: "P3/Marketing and the information age.html"
            },
            {
              id: "P3_MUSIC_LANGUAGE",
              number: 5,
              title: "78.Music Language We All Speak",
              subtitle: "音乐语言",
              file: "P3/Music Language We All Speak.html"
            },
            {
              id: "P3_FRUIT_BOOK",
              number: 6,
              title: "89.The Fruit Book",
              subtitle: "果实之书",
              file: "P3/The Fruit Book.html"
            },
            {
              id: "P3_STAR_PERFORMERS",
              number: 7,
              title: "104.Star Performers",
              subtitle: "明星员工",
              file: "P3/Star Performers.html"
            },
            {
              id: "P3_WHALE_CULTURE",
              number: 8,
              title: "111.Whale Culture",
              subtitle: "鲸鱼文化",
              file: "P3/Whale Culture.html"
            },
            {
              id: "P3_NEANDERTHAL",
              number: 9,
              title: "118.Neanderthal Technology",
              subtitle: "尼安德特人的生存技艺",
              file: "P3/Neanderthal Technology.html"
            },
            {
              id: "P3_IMAGES_PLACES",
              number: 10,
              title: "123.Images and Places",
              subtitle: "风景与印记",
              file: "P3/Images and Places.html"
            },
            {
              id: "P3_SIGN_BABY",
              number: 11,
              title: "167.Sign, Baby, Sign!",
              subtitle: "美国手语",
              file: "P3/Sign, Baby, Sign!.html"
            },
            {
              id: "P3_MEGAFAUNA",
              number: 12,
              title: "197.Australia's Megafauna Controversy",
              subtitle: "巨兽灭绝",
              file: "P3/Australia's Megafauna Controversy.html"
            },
            {
              id: "P3_PATAGONIA",
              number: 9,
              title: "(删)136.The peopling of Patagonia",
              subtitle: "巴塔哥尼亚的人类迁徙",
              file: "P3/The peopling of Patagonia.html"
            },
            {
              id: "P3_CONFORMITY",
              number: 10,
              title: "(删)138.Conformity",
              subtitle: "从众心理",
              file: "P3/Conformity.html"
            },
            {
              id: "P3_MOVEMENT_UNDERWATER",
              number: 11,
              title: "(删)147.Movement Underwater",
              subtitle: "水下运动",
              file: "P3/Movement Underwater.html"
            },
            {
              id: "P3_BRAND_LOYALTY",
              number: 12,
              title: "(删)169.The Costs of Brand Loyalty",
              subtitle: "品牌忠诚的代价",
              file: "P3/The Costs of Brand Loyalty.html"
            }
          ]
        }
      }
    }
  }
};

function getScore(id) {
  if (typeof window === "undefined") return "";
  const score = window.localStorage.getItem("ielts_score_" + id);
  return score ? `(${score})` : "";
}

function getAttempts(id) {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem("ielts_attempts_" + id);
  if (!raw) return 0;
  const n = parseInt(raw, 10);
  if (Number.isNaN(n) || n < 0) return 0;
  return n;
}

function getAllArticles(config) {
  const items = [];
  Object.entries(config.passages).forEach(([passageKey, passage]) => {
    Object.entries(passage.levels).forEach(([levelName, level]) => {
      level.articles.forEach(article => {
        items.push({
          passageKey,
          passageIcon: passage.icon,
          levelName,
          levelIcon: level.icon,
          ...article
        });
      });
    });
  });
  return items;
}

function incrementAttempts(id) {
  if (typeof window === "undefined") return;
  const current = getAttempts(id);
  const next = current + 1;
  window.localStorage.setItem("ielts_attempts_" + id, String(next));
}

function buildVolumeSets(articles) {
  const filtered = articles.filter(
    a =>
      (a.levelName === "高频" || a.levelName === "次高频")
  );
  const byPassage = {
    P1: [],
    P2: [],
    P3: []
  };
  filtered.forEach(a => {
    if (byPassage[a.passageKey]) {
      byPassage[a.passageKey].push(a);
    }
  });
  
  // Sort by Level (High > Medium) then by ID
  Object.keys(byPassage).forEach(key => {
    byPassage[key].sort((a, b) => {
      // Priority: 高频 > 次高频
      if (a.levelName === "高频" && b.levelName !== "高频") return -1;
      if (a.levelName !== "高频" && b.levelName === "高频") return 1;
      
      // Then by ID
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      return 0;
    });
  });

  const maxSets = Math.min(
    byPassage.P1.length,
    byPassage.P2.length,
    byPassage.P3.length
  );
  const sets = [];
  for (let i = 0; i < maxSets; i += 1) {
    sets.push([byPassage.P1[i], byPassage.P2[i], byPassage.P3[i]]);
  }
  const volumes = [];
  for (let i = 0; i < sets.length; i += 4) {
    const group = sets.slice(i, i + 4);
    if (group.length > 0) {
      volumes.push(group);
    }
  }
  return volumes;
}

function getWrongBookItems() {
  if (typeof window === "undefined") return [];
  const items = [];
  Object.entries(window.localStorage).forEach(([key, value]) => {
    if (!key.startsWith("ielts_wrong_")) return;
    try {
      const parsed = JSON.parse(String(value));
      if (parsed && parsed.articleId) {
        items.push(parsed);
      }
    } catch (e) {}
  });
  return items;
}

function getStats(allArticles) {
  if (typeof window === "undefined") {
    return {
      total: allArticles.length,
      finishedCount: 0,
      totalWrongCount: 0,
      progressPercent: 0,
      byPassage: {}
    };
  }
  let finishedCount = 0;
  let totalWrongCount = 0;
  const byPassage = {};
  allArticles.forEach(a => {
    if (!byPassage[a.passageKey]) {
      byPassage[a.passageKey] = {
        total: 0,
        finishedCount: 0,
        progressPercent: 0
      };
    }
    byPassage[a.passageKey].total += 1;
    const score = window.localStorage.getItem("ielts_score_" + a.id);
    if (score) {
      finishedCount += 1;
      byPassage[a.passageKey].finishedCount += 1;
    }
  });
  Object.entries(window.localStorage).forEach(([key, value]) => {
    if (!key.startsWith("ielts_wrong_")) return;
    try {
      const parsed = JSON.parse(String(value));
      if (parsed && Array.isArray(parsed.wrongs)) {
        totalWrongCount += parsed.wrongs.length;
      }
    } catch (e) {}
  });
  const total = allArticles.length;
  const progressPercent =
    total === 0 ? 0 : Math.round((finishedCount / total) * 100);
  Object.values(byPassage).forEach(p => {
    p.progressPercent =
      p.total === 0 ? 0 : Math.round((p.finishedCount / p.total) * 100);
  });
  return {
    total,
    finishedCount,
    totalWrongCount,
    progressPercent,
    byPassage
  };
}

function getSearchText(article) {
  const fields = [
    article.title || "",
    article.subtitle || "",
    String(article.number || ""),
    article.id || "",
    article.levelName || "",
    article.passageKey || ""
  ];
  return fields.join(" ").toLowerCase();
}

function callArticleFunction(name) {
  if (typeof window === "undefined") return;
  const frame = document.querySelector(".article-frame");
  if (!frame) return;
  const win = frame.contentWindow;
  if (!win) return;
  const fn = win[name];
  if (typeof fn === "function") {
    fn();
  }
}

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { modifyIframeContent } from "./utils/iframe-modifier";

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [allArticles, setAllArticles] = useState([]);
  const [wrongItems, setWrongItems] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    finishedCount: 0,
    totalWrongCount: 0,
    progressPercent: 0,
    byPassage: {}
  });
  const [showWrongBook, setShowWrongBook] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleFrameKey, setArticleFrameKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [articleSubmitted, setArticleSubmitted] = useState(false);
  const [showVolume] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [activeStatsTab, setActiveStatsTab] = useState("P1");
  const [questionStatus, setQuestionStatus] = useState({});

  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.data || event.data.type !== 'IELTS_TEST_UPDATE') return;
      const { subType, payload } = event.data;
      
      if (subType === 'REMOTE_SUBMIT') {
          handleSubmitArticle(true);
          return;
      }

      setQuestionStatus(prev => {
        if (subType === 'INIT_QUESTIONS' && Array.isArray(payload)) {
          const next = {};
          payload.forEach(qid => {
            next[qid] = { answered: false, marked: false, isCorrect: null };
          });
          return next;
        }

        const next = { ...prev };
        
        if (subType === 'ANSWER_UPDATE') {
          if (!next[payload.id]) next[payload.id] = { answered: false, marked: false, isCorrect: null };
          next[payload.id].answered = payload.hasAnswer;
        } else if (subType === 'MARKER_UPDATE') {
          if (!next[payload.id]) next[payload.id] = { answered: false, marked: false, isCorrect: null };
          next[payload.id].marked = payload.marked;
        } else if (subType === 'RESULTS' && Array.isArray(payload)) {
          payload.forEach(r => {
            if (!r || !r.id) return;
            if (!next[r.id]) next[r.id] = { answered: false, marked: false, isCorrect: null };
            next[r.id].answered = true;
            next[r.id].isCorrect = !!r.isCorrect;
          });
        }
        
        return next;
      });
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [selectedArticle]);

  useEffect(() => {
    if (!selectedArticle || isPaused || articleSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedArticle, isPaused, articleSubmitted, timeLeft]);

  useEffect(() => {
    if (selectedArticle && !isPaused) {
      // Small delay to ensure iframe is loaded
      const timer = setTimeout(() => {
        const frame = document.querySelector(".article-frame");
        if (frame && frame.contentWindow) {
          const win = frame.contentWindow;
          modifyIframeContent(win, true);
          
          if (articleSubmitted) {
            const saved = window.localStorage.getItem("ielts_result_" + selectedArticle.id);
            if (saved) {
              try {
                const res = JSON.parse(saved);
                if (win.applyInlineResults) {
                  win.applyInlineResults(res);
                } else {
                  setTimeout(() => {
                    if (win.applyInlineResults) {
                      win.applyInlineResults(res);
                    }
                  }, 200);
                }
                setQuestionStatus(prev => {
                  const next = { ...prev };
                  res.forEach(r => {
                    if (!next[r.id]) next[r.id] = { answered: true, marked: false };
                    next[r.id].isCorrect = r.isCorrect;
                  });
                  return next;
                });
              } catch (e) {}
            }
          } else {
            const draft = window.localStorage.getItem("ielts_draft_" + selectedArticle.id);
            if (draft) {
              try {
                const map = JSON.parse(draft);
                if (win.applyUserAnswers) {
                  win.applyUserAnswers(map);
                }
              } catch (e) {}
            } else {
              try {
                win.postMessage(
                  {
                    type: "IELTS_PARENT_ACTION",
                    subType: "RESET_ALL"
                  },
                  "*"
                );
              } catch (e) {}
            }
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedArticle, articleFrameKey, isPaused, articleSubmitted]);

  useEffect(() => {
    const items = getAllArticles(rawConfig);
    setAllArticles(items);
  }, []);

  useEffect(() => {
    if (allArticles.length === 0) return;
    const s = getStats(allArticles);
    const wrong = getWrongBookItems();
    setStats(s);
    setWrongItems(wrong);
  }, [allArticles, refreshKey]);

  const [statsSort, setStatsSort] = useState("index");

  const articleStats = useMemo(() => {
    function parseAccuracy(text) {
      if (!text) return null;
      const m = text.match(/(\d+)\s*\/\s*(\d+)/);
      if (!m) return null;
      const correct = Number(m[1]);
      const total = Number(m[2]);
      if (!total) return null;
      return correct / total;
    }
    return allArticles.map((a, index) => {
      const attempts = getAttempts(a.id);
      const scoreText = getScore(a.id);
      const accuracy = parseAccuracy(scoreText);
      let status = "未开始";
      if (scoreText) status = "已完成";
      else if (attempts > 0) status = "进行中";
      
      // Extract clean title (remove leading number like "1.")
      const cleanTitle = a.title.replace(/^\d+\./, '').trim();
      
      // Parse correct/total from scoreText if available
      let correctCount = 0;
      let totalCount = 0;
      if (scoreText) {
          const m = scoreText.match(/(\d+)\s*\/\s*(\d+)/);
          if (m) {
              correctCount = Number(m[1]);
              totalCount = Number(m[2]);
          }
      }

      // Parse index from title (e.g. "1.Title" -> 1, "(删)10.Title" -> 10)
      const titleMatch = a.title.match(/^(?:\(删\))?(\d+)\./);
      const articleIndex = titleMatch ? parseInt(titleMatch[1], 10) : (index + 1);

      return {
        index: articleIndex,
        id: a.id,
        title: a.title,
        cleanTitle,
        attempts,
        score: scoreText,
        correctCount,
        totalCount,
        passageKey: a.passageKey,
        accuracy,
        status
      };
    });
  }, [allArticles]);

  const sortedArticleStats = useMemo(() => {
    const arr = [...articleStats];
    if (statsSort === "attempts") {
      arr.sort((a, b) => b.attempts - a.attempts);
    } else if (statsSort === "accuracy") {
      arr.sort((a, b) => {
        const av = a.accuracy ?? -1;
        const bv = b.accuracy ?? -1;
        return bv - av;
      });
    } else {
        // Default to index
        arr.sort((a, b) => a.index - b.index);
    }
    return arr;
  }, [articleStats, statsSort]);

  const articleStatsByPassage = useMemo(() => {
    const result = {};
    sortedArticleStats.forEach(row => {
      if (!result[row.passageKey]) result[row.passageKey] = [];
      result[row.passageKey].push(row);
    });
    return result;
  }, [sortedArticleStats]);

  const partStats = useMemo(() => {
    const stats = {
        P1: { correctQ: 0, totalQ: 0, finishedArts: 0, totalArts: 0 },
        P2: { correctQ: 0, totalQ: 0, finishedArts: 0, totalArts: 0 },
        P3: { correctQ: 0, totalQ: 0, finishedArts: 0, totalArts: 0 }
    };
    
    articleStats.forEach(a => {
        const k = a.passageKey; 
        if (!stats[k]) return;
        
        stats[k].totalArts++;
        if (a.score) {
            stats[k].finishedArts++;
            const m = a.score.match(/(\d+)\s*\/\s*(\d+)/);
            if (m) {
                stats[k].correctQ += Number(m[1]);
                stats[k].totalQ += Number(m[2]);
            }
        }
    });
    
    const result = {};
    ['P1', 'P2', 'P3'].forEach(k => {
        const acc = stats[k].totalQ ? (stats[k].correctQ / stats[k].totalQ) : 0;
        result[k] = {
            accuracy: (acc * 100).toFixed(1),
            finished: stats[k].finishedArts,
            total: stats[k].totalArts
        };
    });
    return result;
  }, [articleStats]);

  const [openPassages, setOpenPassages] = useState({
    P1: true,
    P2: true,
    P3: true
  });

  const filtered = useMemo(() => {
    const trimmed = search.trim().toLowerCase();
    if (!trimmed) return allArticles;
    return allArticles.filter(a => getSearchText(a).includes(trimmed));
  }, [allArticles, search]);

  const grouped = useMemo(() => {
    const result = {};
    filtered.forEach(a => {
      if (!result[a.passageKey]) {
        result[a.passageKey] = {
          icon: a.passageIcon,
          levels: {}
        };
      }
      if (!result[a.passageKey].levels[a.levelName]) {
        result[a.passageKey].levels[a.levelName] = {
          icon: a.levelIcon,
          articles: []
        };
      }
      result[a.passageKey].levels[a.levelName].articles.push(a);
    });
    return result;
  }, [filtered]);

  function handleOpenArticle(article, shouldReset = false) {
    if (shouldReset) {
      // Append reset param to file path if not present
      const fileWithReset = article.file.includes('?') 
          ? article.file + '&reset=true' 
          : article.file + '?reset=true';
      setSelectedArticle({ ...article, file: fileWithReset });
    } else {
      setSelectedArticle(article);
    }
    setArticleFrameKey(current => current + 1);
    setArticleSubmitted(false);
    setTimeLeft(20 * 60);
    setQuestionStatus({});
  }

  function handleBackToList() {
    setSelectedArticle(null);
    setIsPaused(false);
    setArticleSubmitted(false);
    setQuestionStatus({});
  }

  function handleSaveExitArticle() {
    if (!selectedArticle || typeof window === "undefined") return;
    const frame = document.querySelector(".article-frame");
    if (frame && frame.contentWindow && typeof frame.contentWindow.extractUserAnswers === "function") {
      try {
        const map = frame.contentWindow.extractUserAnswers();
        window.localStorage.setItem("ielts_draft_" + selectedArticle.id, JSON.stringify(map));
      } catch (e) {}
    }
    incrementAttempts(selectedArticle.id);
    setSelectedArticle(null);
    setIsPaused(false);
    setArticleSubmitted(false);
    setQuestionStatus({});
  }

  function handleRestartArticle() {
    if (!selectedArticle || typeof window === "undefined") return;
    const id = selectedArticle.id;
    window.localStorage.removeItem("ielts_score_" + id);
    window.localStorage.removeItem("ielts_wrong_" + id);
    window.localStorage.removeItem("ielts_notes_" + id);
    setArticleFrameKey(current => current + 1);
    setIsPaused(false);
    setArticleSubmitted(false);
    setTimeLeft(20 * 60);
    setQuestionStatus({});
    const s = getStats(allArticles);
    const wrong = getWrongBookItems();
    setStats(s);
    setWrongItems(wrong);
    // Force refresh list to update status
    setRefreshKey(k => k + 1);
  }

  function handleClearAllHistory() {
    if (typeof window === "undefined") return;
    if (!window.confirm("确定要清除所有做题历史吗？此操作不可恢复。")) return;
    
    const keys = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (
        key &&
        (key.startsWith("ielts_") ||
         key.startsWith("mock_") ||
         key === "ielts_suite_history")
      ) {
        keys.push(key);
      }
    }
    
    keys.forEach(key => window.localStorage.removeItem(key));
    
    setRefreshKey(k => k + 1);
    setArticleFrameKey(k => k + 1);
    // Re-calculate stats immediately
    const s = getStats(allArticles);
    const wrong = getWrongBookItems();
    setStats(s);
    setWrongItems(wrong);
  }

  function handlePauseArticle() {
    setIsPaused(!isPaused);
  }

  function handleSubmitArticle(isInternal = false) {
    if (!selectedArticle) return;
    incrementAttempts(selectedArticle.id);
    
    const frame = document.querySelector(".article-frame");
    if (frame && frame.contentWindow) {
        const win = frame.contentWindow;
        
        // 1. Trigger internal submit if available (for visual feedback)
        // Only if NOT triggered by internal submit (to avoid loop)
        if (isInternal !== true && typeof win.submitAnswers === 'function') {
             win.submitAnswers();
        } else if (isInternal !== true) {
             callArticleFunction("submitAnswers");
        }

        // 2. Extract answers and calculate score for legacy pages
        // For pages wrapped by our single-article injector, scoring is handled inside iframe.
        if (!win.__IELTS_SINGLE_WRAPPED && typeof win.answerKey === 'object') {
             let userMap = {};
             
             // Method A: Standard extract function
             if (typeof win.extractUserAnswers === 'function') {
                  userMap = win.extractUserAnswers();
             } 
             // Method B: Try to read from local storage if available (common in legacy articles)
             else if (win.PAPER_ID) {
                  try {
                      const saved = win.localStorage.getItem(win.PAPER_ID + "_answers");
                      if (saved) userMap = JSON.parse(saved);
                  } catch(e) {}
             }
             
             // Method C: Fallback DOM scraping if map is empty/incomplete
             const answerKey = win.answerKey;
             Object.keys(answerKey).forEach(q => {
                  if (userMap[q]) return; // Already found
                  
                  // Try inputs
                  const input = win.document.querySelector(`input[name="${q}"]:checked`);
                  if (input) {
                      userMap[q] = input.value;
                      return;
                  }
                  
                  const textInput = win.document.querySelector(`input[type="text"][name="${q}"]`);
                  if (textInput) {
                      userMap[q] = textInput.value;
                      return;
                  }

                  // Try dropzones (Article 60)
                  const dropzone = win.document.querySelector(`.summary-dropzone[data-q="${q}"]`);
                  if (dropzone && dropzone.textContent) {
                       // Check if it's not the placeholder
                       if (dropzone.textContent !== dropzone.dataset.q) {
                           userMap[q] = dropzone.textContent.trim();
                       }
                  }
             });

             const res = [];
             Object.keys(answerKey).forEach(function (q) {
                  var uA = userMap[q];
                  var cA = answerKey[q];
                  var correct = false;
                  if (Array.isArray(cA)) {
                    var setUser = new Set(String(uA || '').split(',').map(function (v) { return v.trim().toLowerCase(); }).filter(Boolean));
                    var setCorrect = new Set(cA.map(function (v) { return String(v).toLowerCase(); }));
                    if (setUser.size === setCorrect.size) {
                      correct = true;
                      setCorrect.forEach(function (v) {
                        if (!setUser.has(v)) correct = false;
                      });
                    }
                  } else if (uA) {
                    if (String(uA).toLowerCase() === String(cA).toLowerCase()) correct = true;
                  }
                  res.push({ id: q, userAns: uA, correctAns: cA, isCorrect: correct });
            });
            
            if (typeof win.applyInlineResults === 'function') {
                win.applyInlineResults(res);
            }
            if (typeof window !== 'undefined' && selectedArticle && selectedArticle.id) {
                const correctCount = res.filter(r => r.isCorrect).length;
                const totalCount = res.length;
                window.localStorage.setItem(
                    "ielts_score_" + selectedArticle.id,
                    `${correctCount}/${totalCount}`
                );
                window.localStorage.setItem(
                    "ielts_result_" + selectedArticle.id,
                    JSON.stringify(res)
                );
                window.localStorage.removeItem("ielts_draft_" + selectedArticle.id);
            }
            setQuestionStatus(prev => {
                const next = { ...prev };
                res.forEach(r => {
                    if (!next[r.id]) next[r.id] = { answered: true, marked: false };
                    next[r.id].isCorrect = r.isCorrect;
                });
                return next;
            });
        }
    }

    setRefreshKey(k => k + 1);
    setArticleSubmitted(true);
    setIsPaused(false);
  }

  function handleResetArticle() {
    const frame = document.querySelector(".article-frame");
    if (frame && frame.contentWindow) {
      frame.contentWindow.postMessage(
        { type: "IELTS_PARENT_ACTION", subType: "RESET_ALL" },
        "*"
      );
    } else {
      callArticleFunction("resetForm");
    }
    if (selectedArticle && selectedArticle.id) {
        window.localStorage.removeItem("ielts_draft_" + selectedArticle.id);
    }
    setQuestionStatus({});
    setArticleSubmitted(false);
  }

  function handleOpenArticleWrongBookTop() {
    callArticleFunction("openWrongBook");
  }

  function handleOpenWrongArticle(articleId) {
    const article = allArticles.find(a => a.id === articleId);
    if (!article) return;
    handleOpenArticle(article);
    setShowWrongBook(false);
  }

  function handleOpenArticleFromStats(id) {
    const article = allArticles.find(a => a.id === id);
    if (!article) return;
    handleOpenArticle(article);
    setShowStats(false);
  }

  function handleReviewArticle(id) {
    const article = allArticles.find(a => a.id === id);
    if (!article) return;
    setSelectedArticle(article);
    setArticleFrameKey(current => current + 1);
    setArticleSubmitted(true);
    setIsPaused(false);
    setTimeLeft(0);
    setShowStats(false);
  }

  function handleScrollToQuestion(qid) {
      const frame = document.querySelector(".article-frame");
      if (frame && frame.contentWindow) {
          frame.contentWindow.postMessage({ 
              type: 'IELTS_PARENT_ACTION', 
              subType: 'SCROLL_TO_QUESTION', 
              payload: qid 
          }, '*');
      }
  }

  function handleRetakeArticle(id) {
    const article = allArticles.find(a => a.id === id);
    if (!article) return;
    // Clear data
    if (typeof window !== "undefined") {
        window.localStorage.removeItem("ielts_score_" + id);
        window.localStorage.removeItem("ielts_wrong_" + id);
        window.localStorage.removeItem("ielts_notes_" + id);
        window.localStorage.removeItem("ielts_result_" + id);
        window.localStorage.removeItem("ielts_draft_" + id);
    }
    
    // Update stats state is handled by useEffect on allArticles change, but here we manually trigger?
    // Actually allArticles doesn't change, but local storage does.
    // We should update stats state.
    // Re-fetch stats
   if (typeof window !== "undefined") {
       setTimeout(() => {
           const s = getStats(allArticles);
           const wrong = getWrongBookItems();
           setStats(s);
           setWrongItems(wrong);
       }, 50);
   }

   handleOpenArticle(article, true);
   setShowStats(false);
}

  function handleDeleteWrong(id) {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem("ielts_wrong_" + id);
    const updated = getWrongBookItems();
    setWrongItems(updated);
    const s = getStats(allArticles);
    setStats(s);
  }

  function handleClearProgress() {
    if (typeof window === "undefined") return;
    const keysToRemove = [];
    Object.keys(window.localStorage).forEach(key => {
      if (
        key.startsWith("ielts_score_") ||
        key.startsWith("ielts_wrong_") ||
        key.startsWith("ielts_notes_") ||
        key.startsWith("ielts_result_") ||
        key.startsWith("ielts_draft_") ||
        key.startsWith("mock_") ||
        key === "ielts_suite_history"
      ) {
        keysToRemove.push(key);
      }
    });
    keysToRemove.forEach(k => window.localStorage.removeItem(k));
    const s = getStats(allArticles);
    const wrong = getWrongBookItems();
    setStats(s);
    setWrongItems(wrong);
  }

  const hasResult = filtered.length > 0;
  const containerStyle = selectedArticle ? { maxWidth: "100%", padding: 0 } : {};

  return (
    <div className="container" style={containerStyle}>
      {!selectedArticle && (
        <>
          <div className="header">
            <h1>📚 IELTS Reading Practice</h1>
            <p>雅思阅读机考练习系统</p>
          </div>

          <div className="top-bar">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="搜索文章标题、编号..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="action-buttons">
              <button
                className="btn"
                onClick={() => router.push("/volume")}
              >
                📂 套卷模拟
              </button>
              <button
                className="btn btn-stats"
                onClick={() => setShowStats(true)}
              >
                📊 统计
              </button>
            </div>
          </div>
        </>
      )}

      {selectedArticle ? (
        <div className="article-viewer">
          <div className="article-viewer-header" style={{ justifyContent: 'space-between', padding: '8px 24px', minHeight: '50px' }}>
            <button className="back-button" onClick={handleBackToList}>
              ←
            </button>
            {/* Title hidden per request */}
            <div className="article-viewer-actions" style={{ marginLeft: 'auto', width: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
              {!articleSubmitted && (
                  <div style={{ fontFamily: 'monospace', fontSize: '18px', fontWeight: 'bold', marginRight: '8px', color: timeLeft < 300 ? '#ef4444' : '#374151', minWidth: '60px', textAlign: 'center' }}>
                    {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
                  </div>
              )}
              {articleSubmitted ? (
                <>
                  <span style={{ fontSize: 13, color: "#6b7280" }}>
                    审阅模式
                  </span>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-outline"
                    onClick={handlePauseArticle}
                  >
                    {isPaused ? "继续" : "暂停"}
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={handleSaveExitArticle}
                  >
                    保存退出
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmitArticle}
                  >
                    提交
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="article-frame-wrapper" style={{ position: 'relative', flex: 1, marginTop: 0 }}>
            {isPaused && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(5px)',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: '#333'
              }}>
                <div style={{ marginBottom: '20px', fontSize: '48px' }}>⏸️</div>
                <div>练习暂停中</div>
                <button 
                  className="btn btn-primary" 
                  style={{ marginTop: '20px', fontSize: '18px', padding: '10px 30px' }}
                  onClick={handlePauseArticle}
                >
                  点击继续
                </button>
              </div>
            )}
            <iframe
              key={articleFrameKey}
              src={`/${selectedArticle.file}`}
              className="article-frame"
              title={selectedArticle.title}
              style={{ opacity: isPaused ? 0 : 1, height: '100%' }}
              onLoad={(e) => modifyIframeContent(e.target.contentWindow, true)}
            />
          </div>
          
          {/* Bottom Status Bar */}
          <div className="article-bottom-bar" style={{
              height: '60px',
              background: 'white',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
              justifyContent: 'space-between',
              zIndex: 50
          }}>
              {(() => {
                  const qIds = Object.keys(questionStatus).sort((a, b) => {
                      const na = parseInt(a.replace(/\D/g, ''), 10);
                      const nb = parseInt(b.replace(/\D/g, ''), 10);
                      if (!isNaN(na) && !isNaN(nb)) return na - nb;
                      return a.localeCompare(b);
                  });
                  const totalQ = qIds.length;
                  const correctQ = qIds.filter(q => questionStatus[q].isCorrect).length;
                  
                  return (
                      <>
                          {articleSubmitted && (
                              <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', minWidth: '150px' }}>
                                  正确: <span style={{ color: '#10b981' }}>{correctQ}</span> / 总题数: {totalQ}
                              </div>
                          )}
                          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '4px 0', flex: 1, justifyContent: 'center' }}>
                              {qIds.map(q => {
                                  const status = questionStatus[q];
                                  let bg = '#f3f4f6';
                                  let color = '#6b7280';
                                  if (status.isCorrect === true) { bg = '#d1fae5'; color = '#059669'; }
                                  else if (status.isCorrect === false) { bg = '#fee2e2'; color = '#dc2626'; }
                                  else if (status.answered) { bg = '#dbeafe'; color = '#2563eb'; }
                                  
                                  return (
                                      <div 
                                        key={q} 
                                        onClick={() => handleScrollToQuestion(q)}
                                        style={{
                                            width: '32px', 
                                            height: '32px', 
                                            borderRadius: '4px', 
                                            background: bg, 
                                            color: color,
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            flexShrink: 0
                                        }}
                                        title={`Question ${q}`}
                                      >
                                        {q.replace(/^\D+/, '')}
                                        {status.marked && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '-6px',
                                                right: '-6px',
                                                zIndex: 10,
                                                color
                                            }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                                            </div>
                                        )}
                                      </div>
                                  );
                              })}
                          </div>
                          <div style={{ minWidth: '50px' }}></div>
                      </>
                  );
              })()}
          </div>
        </div>
      ) : hasResult ? (
        <div className="content-grid">
          {Object.entries(grouped).map(([passageKey, passage]) => (
            <div key={passageKey} className="passage-card">
              <h2>
                <span className="passage-icon">{passage.icon}</span>
                {passageKey}
              </h2>
              {Object.entries(passage.levels).map(([levelName, level]) => (
                <div key={levelName} className="level-group">
                  <div className="level-header">
                    <span className="level-icon">{level.icon}</span>
                    <span className="level-title">{levelName}</span>
                    <span className="level-count">
                      共 {level.articles.length} 篇
                    </span>
                  </div>
                  <div className="article-list">
                    {level.articles.map(article => (
                      <div
                        key={article.id}
                        className="article-item"
                        onClick={() => handleOpenArticle(article)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div className="article-title">
                              <span>{article.title}</span>
                            </div>
                            {article.subtitle ? (
                              <div className="article-subtitle" style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {article.subtitle}
                              </div>
                            ) : null}
                        </div>
                        
                        <div className="article-actions" style={{ display: 'flex', gap: '8px', marginLeft: '10px', alignItems: 'center', flexShrink: 0 }}>
                            {getScore(article.id) ? (
                                <>
                                    <span style={{ fontSize: '12px', color: '#3b82f6', marginRight: '4px' }}>
                                      {getScore(article.id)}
                                    </span>
                                    <button 
                                        onClick={(e) => { 
                                            e.stopPropagation(); 
                                            handleReviewArticle(article.id);
                                        }}
                                        title="复习"
                                        style={{
                                            padding: '6px',
                                            borderRadius: '4px',
                                            border: '1px solid #e2e8f0',
                                            background: '#eff6ff',
                                            color: '#3b82f6',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '32px',
                                            height: '32px'
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    </button>
                                    <button 
                                        onClick={(e) => { 
                                            e.stopPropagation(); 
                                            handleRetakeArticle(article.id); 
                                        }}
                                        title="重置"
                                        style={{
                                            padding: '6px',
                                            borderRadius: '4px',
                                            border: '1px solid #e2e8f0',
                                            background: '#fff',
                                            color: '#64748b',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '32px',
                                            height: '32px'
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                    </button>
                                </>
                            ) : (
                                <button 
                                        onClick={(e) => { 
                                            e.stopPropagation(); 
                                            handleOpenArticle(article);
                                        }}
                                        title="开始"
                                        style={{
                                            padding: '6px',
                                            borderRadius: '4px',
                                            border: 'none',
                                            background: '#3b82f6',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '32px',
                                            height: '32px'
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                    </button>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>🔍 没有找到匹配的文章</h3>
          <p>试试其他关键词吧</p>
        </div>
      )}

      <div className={`modal ${showStats ? "active" : ""}`}>
        <div className="modal-content" style={{maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto', padding: '0'}}>
          <div className="modal-header" style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '20px', 
              borderBottom: '1px solid #f1f5f9',
              position: 'sticky', 
              top: 0, 
              background: '#fff', 
              zIndex: 10
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <h2 style={{margin: 0}}>📊 学习统计</h2>
                <button
                    onClick={handleClearAllHistory}
                    style={{
                        fontSize: '13px',
                        padding: '6px 12px',
                        background: '#fee2e2',
                        color: '#ef4444',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    🗑️ 清除历史
                </button>
            </div>
            <button 
                onClick={() => setShowStats(false)} 
                style={{
                    fontSize: '24px', 
                    lineHeight: '1', 
                    cursor: 'pointer',
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                    transition: 'all 0.2s'
                }}
                title="关闭"
            >
                ×
            </button>
          </div>
          
          <div style={{padding: '20px'}}>
          {/* Summary Cards */}
          <div style={{display: 'flex', gap: '20px', marginBottom: '20px'}}>
             {['P1', 'P2', 'P3'].map(p => {
                 const stat = partStats[p];
                 const color = p === 'P1' ? '#10b981' : p === 'P2' ? '#f59e0b' : '#3b82f6';
                 const label = p === 'P1' ? 'Part 1' : p === 'P2' ? 'Part 2' : 'Part 3';
                 return (
                     <div key={p} style={{flex: 1, background: '#fff', borderRadius: '8px', padding: '15px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <div style={{width: '32px', height: '32px', borderRadius: '6px', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px'}}>
                                {p}
                            </div>
                            <span style={{fontSize: '16px', fontWeight: '600', color: '#334155'}}>{label}</span>
                        </div>
                        <div style={{textAlign: 'right'}}>
                            <div style={{fontSize: '20px', fontWeight: '700', color: '#1e293b'}}>{stat.accuracy}%</div>
                            <div style={{fontSize: '12px', color: '#64748b'}}>{stat.finished}/{stat.total} 篇</div>
                        </div>
                     </div>
                 );
             })}
          </div>

          <div className="stats-controls" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
              <div className="stats-tabs" style={{margin: 0}}>
                 {['P1', 'P2', 'P3'].map(p => (
                   <div 
                     key={p} 
                     className={`stats-tab ${activeStatsTab === p ? 'active' : ''}`}
                     onClick={() => setActiveStatsTab(p)}
                   >
                     {p}
                   </div>
                 ))}
              </div>
              
              <div className="stats-sort" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <span style={{fontSize: '14px', color: '#64748b', fontWeight: '600'}}>排序方式:</span>
                  {[
                      { key: 'accuracy', label: '按正确率', icon: '⬇️' },
                      { key: 'attempts', label: '按做题次数', icon: '⬇️' },
                      { key: 'index', label: '按文章序号', icon: '⬆️' }
                  ].map(opt => (
                      <button
                        key={opt.key}
                        onClick={() => setStatsSort(opt.key)}
                        style={{
                            padding: '6px 12px',
                            fontSize: '12px',
                            borderRadius: '4px',
                            border: statsSort === opt.key ? 'none' : '1px solid #e2e8f0',
                            background: statsSort === opt.key ? '#3b82f6' : '#fff',
                            color: statsSort === opt.key ? '#fff' : '#64748b',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: '500',
                            transition: 'all 0.2s'
                        }}
                      >
                          {opt.key === 'index' ? '⇅' : '⬇'} {opt.label}
                      </button>
                  ))}
              </div>
          </div>

          <div className="stats-table">
            <div className="stats-row stats-row-header" style={{
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '2px solid #e2e8f0',
                padding: '12px 0',
                fontWeight: 'bold',
                color: '#475569',
                marginBottom: '8px'
            }}>
              <span className="stats-col-index" style={{width: '60px', textAlign: 'center'}}>序号</span>
              <span style={{flex: 1, paddingLeft: '10px'}}>文章</span>
              <span style={{width: '100px', textAlign: 'center'}}>做题次数</span>
              <span style={{width: '120px', textAlign: 'center'}}>正确/总题数</span>
              <span className="stats-col-progress" style={{width: '100px', textAlign: 'center'}}>正确率</span>
              <span style={{width: '240px', textAlign: 'center'}}>操作</span>
            </div>
            {(articleStatsByPassage[activeStatsTab] || []).map((row) => {
               const accuracyStr = row.accuracy !== null ? Math.round(row.accuracy * 100) + '%' : '-';
               const hasResult = !!row.score; 
               const correctTotalStr = row.score ? `${row.correctCount}/${row.totalCount}` : '-';
               
               return (
                 <div key={row.id} className="stats-row" style={{cursor: 'default', display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9'}}>
                    <span className="stats-col-index" style={{width: '60px', textAlign: 'center'}}>{row.index}</span>
                    <span style={{flex: 1, paddingLeft: '10px'}}>
                      {row.cleanTitle}
                      {row.status === '进行中' && <span style={{fontSize: '10px', background: '#e2e8f0', padding: '1px 4px', borderRadius: '4px', marginLeft: '6px', color: '#64748b'}}>进行中</span>}
                    </span>
                    <span style={{width: '100px', textAlign: 'center', color: '#64748b'}}>
                        {row.attempts > 0 ? row.attempts : '-'}
                    </span>
                    <span style={{width: '120px', textAlign: 'center', color: '#64748b'}}>
                        {correctTotalStr}
                    </span>
                    <span className="stats-col-progress" style={{width: '100px', textAlign: 'center', color: row.accuracy !== null ? (row.accuracy >= 0.6 ? '#10b981' : row.accuracy >= 0.4 ? '#f59e0b' : '#ef4444') : '#94a3b8', fontWeight: 'bold'}}>
                      {accuracyStr}
                    </span>
                    <div style={{width: '240px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '8px'}}>
                       {hasResult ? (
                          <>
                            <button className="stats-action-btn stats-action-review" onClick={() => handleReviewArticle(row.id)}>复习解析</button>
                            <button className="stats-action-btn stats-action-retake" onClick={() => handleRetakeArticle(row.id)}>重新练习</button>
                          </>
                       ) : (
                          <button className="stats-action-btn stats-action-start" onClick={() => handleOpenArticleFromStats(row.id)}>开始练习</button>
                       )}
                    </div>
                 </div>
               )
            })}
          </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export { rawConfig, getAllArticles, getScore, getAttempts, buildVolumeSets };
