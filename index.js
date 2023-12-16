const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config(); // Load environment variables from .env file

const telegramToken = process.env.TELEGRAM_BOT_TOKEN;


const bot = new TelegramBot(telegramToken, { polling: true });
const userHistory = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Welcome to VisionGround, a renowned agency in DeFi specializing in marketing, branding, and design. No matter if you're a small project seeking trending services or a large venture aiming for a significant market impact with next-level branding and KOL’s, VisionGround is your solution. Our dedication to excellence has earned us the trust and recommendation of 100% of our customer base.\n\nExplore the options below to start your interaction with us.",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Services",
              callback_data: "services",
            },
          ],
          [
            { text: "Portfolio", callback_data: "portfolio" },
            { text: "Website", url: "http://your-link-here.com" },
          ],
        ],
      },
    }
  );
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  const messageId = query.message.message_id;

  if (data === "back") {
    const history = userHistory[chatId];
    if (history && history.length > 1) {
      const previousMessage = history.pop();
      bot.editMessageText(previousMessage.text, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: previousMessage.reply_markup,
      });
    }
    return;
  }

  if (
    [
      "marketing",
      "graphics",
      "telegram",
      "tgbot",
      "tgmassdm",
      "twitter",
      "twittertrending",
      "twitterkols",
      "dextools",
      "dextoolstrending",
      "upvotes",
      "coinmarketcap",
      "badge",
      "cmctrending",
      "top3",
      "top6",
      "listing",
      "coingecko",
      "cgtrending",
      "crypto.com",
      "cryptotrending",
      "livecoinwatch",
      "top3upvotes",
      "4chan",
      "advert",
      "graphics",
      "contact",
      "branding",
      "browse",
      "strategy",
      "webdesign",
      "uiux",
      "packaging",
      "motion",
      "concept",
      "logodesign",
      "illustration",
    ].includes(data)
  ) {
    bot.deleteMessage(chatId, messageId);
  }
  // Save the current message to the user's history
  const history = userHistory[chatId] || [];
  history.push({
    text: query.message.text,
    reply_markup: query.message.reply_markup,
  });
  userHistory[chatId] = history;

  // Handle different buttons
  switch (data) {
    case "services":
      bot.sendMessage(
        chatId,
        "What can we help you with (Any services not listed below might still be available upon request, feel free to reach out to us)?",
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Marketing", callback_data: "marketing" },
                { text: "Graphics", callback_data: "graphics" },
              ],
            ],
          },
        }
      );
      break;
    case "portfolio":
      bot.sendMessage(chatId, "Here you go:");
      break;
    case "marketing":
      bot.sendMessage(
        chatId,
        "We provide a diverse range of marketing services, ensuring your project gains the exposure it needs in a competitive market. Choose the platform you'd like to market on",
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Telegram", callback_data: "telegram" },
                { text: "Twitter", callback_data: "twitter" },
                { text: "Dextools", callback_data: "dextools" },
              ],
              [
                { text: "Coinmarketcap", callback_data: "coinmarketcap" },
                { text: "Crypto.com", callback_data: "crypto.com" },
                { text: "Coingecko", callback_data: "coingecko" },
              ],
              [
                { text: "Livecoinwatch", callback_data: "livecoinwatch" },
                { text: "4Chan", callback_data: "4chan" },
              ],
              [{ text: "<< Back", callback_data: "back" }],
            ],
          },
        }
      );
      break;
    case "graphics":
      bot.sendMessage(
        chatId,
        "Our graphics services include web design, UI/UX design, packaging/print design (such as brochures, flyers, posters), motion graphics, concept design, logo design, and illustrations. Each service is tailored in collaboration with our team. Pricing and scope of work will be determined on a case-by-case basis for your specific needs. Feel free to contact us through this bot or explore our individual graphic services in the menus below to determine what best suits your project:",
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Contact", callback_data: "contact" },
                { text: "Browse graphic services", callback_data: "browse" },
              ],
              [{ text: "<< Back", callback_data: "back" }],
            ],
          },
        }
      );
      break;
    case "contact":
      bot.sendMessage(chatId, "Contacts:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "@shammgod24", url: "https://t.me/shammgod24" },
              { text: "@zifaka", url: "https://t.me/zifaka" },
            ],
            [{ text: "<< Back", callback_data: "back" }],
          ],
        },
      });
      break;
    case "browse":
      bot.sendMessage(
        chatId,
        "Browse Graphic Services:\n",

        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: "Branding", callback_data: "branding" },
                { text: "Brand Strategy", callback_data: "strategy" },
                { text: "Webdesign", callback_data: "webdesign" },
              ],
              [
                { text: "Ui/UX Design", callback_data: "uiux" },

                { text: "Motion Graphics", callback_data: "motion" },
              ],
              [
                { text: "Concept design", callback_data: "concept" },
                { text: "Logo Design", callback_data: "logodesign" },
                { text: "Illustrations", callback_data: "illustration" },
              ],
              [{ text: "Packaging/Print Design", callback_data: "packaging" }],
              [{ text: "<< Back", callback_data: "back" }],
            ],
          },
        }
      );
      break;
    case "branding":
      bot.sendMessage(
        chatId,
        "Branding\n\nInvolves creating a cohesive and compelling identity for a company, product, or service. It encompasses the development of a brand's personality, values, messaging, and visual elements to establish a distinct presence in the market and resonate with the target audience.",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    case "strategy":
      bot.sendMessage(
        chatId,
        "Brand Strategy\n\nFocuses on developing a comprehensive plan that defines a brand's long-term goals and objectives. It includes the analysis of market positioning, target audience, competitive landscape, and the creation of strategies to establish a strong brand presence and differentiate it from competitors.",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    case "webdesign":
      bot.sendMessage(
        chatId,
        "Web Design\n\nFocuses on creating visually appealing and functional websites, ensuring a user-friendly experience and effective communication of brand identity.",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    case "uiux":
      bot.sendMessage(
        chatId,
        "Ui/UX Design\n\nUI (User Interface) design concentrates on the look and feel of the product, while UX (User Experience) design focuses on enhancing user satisfaction by improving usability and accessibility.",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    case "packaging":
      bot.sendMessage(
        chatId,
        "Packaging/Print Design\n\nInvolves creating attractive and functional packaging for products, as well as designing materials for print like brochures, flyers, posters, etc., that effectively convey brand messaging.",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    case "motion":
      bot.sendMessage(
        chatId,
        "Motion Graphics\n\nUtilizes animation, video, and visual effects to create engaging content, often used in marketing, explainer videos, and advertising.",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    case "concept":
      bot.sendMessage(
        chatId,
        "Concept Design\n\nInvolves the creation and visualization of initial ideas and concepts, often used in the early stages of product or project development to explore and communicate possibilities.",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    case "logodesign":
      bot.sendMessage(
        chatId,
        "Logo Design\n\nFocuses on crafting unique and memorable symbols or icons that represent a brand's identity and values, often used for branding and marketing purposes.",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    case "illustration":
      bot.sendMessage(
        chatId,
        "Illustrations\n\nInvolves creating visual representations or drawings that convey a specific message, idea, or story, commonly used in books, websites, advertisements, and various media.",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    //Telegram
    case "telegram":
      bot.sendMessage(chatId, "Our Telegram services include:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Telegram Mass DM’s", callback_data: "tgmassdm" },
              { text: "Telegram Bot Creation", callback_data: "tgbot" },
            ],
            [{ text: "<< Back", callback_data: "back" }],
          ],
        },
      });
      break;
    case "tgmassdm":
      bot.sendMessage(
        chatId,
        "Telegram Mass DM's\n\n5k - $175\n10k - $300\n100k - $1300",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    case "tgbot":
      bot.sendMessage(
        chatId,
        "Price dependent upon level of complexity & nature of inquiry",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;

    //TWITTER
    case "twitter":
      bot.sendMessage(chatId, "Our Twitter services include:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Twitter trending", callback_data: "twittertrending" },
              { text: "Twitter KOL's", callback_data: "twitterkols" },
            ],
            [{ text: "<< Back", callback_data: "back" }],
          ],
        },
      });
      break;
    case "twittertrending":
      bot.sendMessage(
        chatId,
        "Twitter Trending\n\n$1,500 per hour (1-3 hours)\n$1,325 per hour (4-12 hours)\n$1,050 per hour (12+ hours)\n ",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    case "twitterkols":
      bot.sendMessage(
        chatId,
        "Twitter KOL's\n\n$50,000/One post\n$92,500/One campaign",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;

    //DEXTOOLS
    case "dextools":
      bot.sendMessage(chatId, "Our Dextools services include:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Dextools Trending", callback_data: "dextoolstrending" },
              { text: "Upvotes", callback_data: "upvotes" },
            ],
            [{ text: "<< Back", callback_data: "back" }],
          ],
        },
      });
      break;
    case "dextoolstrending":
      bot.sendMessage(
        chatId,
        "Dextools Trending\n\n$5,500/24 hrs\n$15,000/72 hrs\n$32,250/168 hrs ",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    case "upvotes":
      bot.sendMessage(
        chatId,
        "Upvotes\n\n$1.25 per vote (0-100 votes)\n$1 per vote (100-1000 votes)\n$0.85 per vote (1000+ votes) ",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;

    //COINMARKETCAP
    case "coinmarketcap":
      bot.sendMessage(chatId, "Our CoinMarketCap services include:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Circulating Supply Badge", callback_data: "badge" },
              { text: "Search Bar Trending", callback_data: "cmctrending" },
              { text: "Exchange Listing", callback_data: "listing" },
            ],
            [{ text: "<< Back", callback_data: "back" }],
          ],
        },
      });
      break;
    case "badge":
      bot.sendMessage(chatId, "Circulating Supply Badge\n\n$4,000 (3 pairs)", {
        reply_markup: {
          inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
        },
      });
      break;
    case "cmctrending":
      bot.sendMessage(chatId, "Our CoinMarketCap services include:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Top 3:", callback_data: "top3" },
              { text: "Top 6:", callback_data: "top6" },
            ],
            [{ text: "<< Back", callback_data: "back" }],
          ],
        },
      });
      break;
    case "top3":
      bot.sendMessage(
        chatId,
        "Top 3\n\n$7,500/24 hrs\n$21,250/72 hrs\n$47,500/168 hrs ",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    case "top6":
      bot.sendMessage(
        chatId,
        "Top 6\n\n$4,750/24 hrs\n$13,500/72 hrs\n$28,500/168 hrs",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;
    case "listing":
      bot.sendMessage(chatId, "Listing\n\n$32,500-$44,500/Listing", {
        reply_markup: {
          inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
        },
      });
      break;

    //COINGECKO
    case "coingecko":
      bot.sendMessage(chatId, "Our CoinGecko Services include:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Trending", callback_data: "cgtrending" }],
            [{ text: "<< Back", callback_data: "back" }],
          ],
        },
      });
      break;
    case "cgtrending":
      bot.sendMessage(
        chatId,
        "Coingecko Trending\n\n$400/24 hrs (7 regions)\n$1,000/72 hrs (7 regions)\n$2,500/168 hrs (7 regions) ",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;

    //CRYPTO.COM
    case "crypto.com":
      bot.sendMessage(chatId, "Our Crypto.com Services include:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Trending", callback_data: "cryptotrending" }],
            [{ text: "<< Back", callback_data: "back" }],
          ],
        },
      });
      break;
    case "cryptotrending":
      bot.sendMessage(
        chatId,
        "Crypto.com Trending\n\n$150/24 hrs\n$325/72 hrs\n$700/168 hrs ",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;

    //LIVECOINWATCH
    case "livecoinwatch":
      bot.sendMessage(chatId, "Our LiveCoinWatch Services include:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Top 3 Upvotes:", callback_data: "top3upvotes" }],
            [{ text: "<< Back", callback_data: "back" }],
          ],
        },
      });
      break;
    case "top3upvotes":
      bot.sendMessage(
        chatId,
        "Top 3 Upvotes\n\n$400/24 hrs\n$1,050/72 hrs\n$2,250/168 hrs ",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;

    //4CHAN
    case "4chan":
      bot.sendMessage(chatId, "Our 4Chan Services include:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Advertisements", callback_data: "advert" }],
            [{ text: "<< Back", callback_data: "back" }],
          ],
        },
      });
      break;
    case "advert":
      bot.sendMessage(
        chatId,
        "Advertisements\n\n$350/24 hrs\n$900/72 hrs\n$2,050/168 hrs",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "<< Back", callback_data: "back" }]],
          },
        }
      );
      break;

    // Add more cases for other buttons as needed
    default:
      bot.sendMessage(chatId, `You pressed ${data}`);
  }
});
