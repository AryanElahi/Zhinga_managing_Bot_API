import TelegramBot from "node-telegram-bot-api";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// bot token
const token = "7937475104:AAEfEu7Ol_G8XfBrh_Wy3WWIBewVlW3lqAA";
const bot = new TelegramBot(token, { polling: true });

// save user status
const userState = {};

// main key to send info
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "📤 برای ارسال کارت ویزیت خود، دکمه زیر را لمس کنید:", {
        reply_markup: {
            keyboard: [
                ["📤 ارسال کارت ویزیت"],
                ["🧳 دریافت همه کاربران کارت ویزیت"]
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    });
});

// get step by step data
bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "📤 ارسال کارت ویزیت") {
        userState[chatId] = { step: "name" };
        bot.sendMessage(chatId, "👤 لطفاً نام خود را وارد کنید:");
        return;
    }

    if (text === "🧳 دریافت همه کاربران کارت ویزیت") {
        try {
            const response = await axios.get("http://185.231.115.236:3001/getAllVisitors");
            const visitors = response.data;

            let message = "📋 **لیست تمام کاربران کارت ویزیت:**\n\n";

            visitors.forEach(visitor => {
                message += `📌 **نام:** ${visitor.name}\n📅 **تاریخ تولد:** ${visitor.birthday}\n📞 **شماره تلفن:** ${visitor.phone}\n\n`;
            });

            bot.sendMessage(chatId, message);
        } catch (error) {
            console.error("❌ خطای API:", error.response ? error.response.data : error.message);
            bot.sendMessage(chatId, "❌ خطایی در دریافت اطلاعات کاربران رخ داد.");
        }
        return;
    }

    if (!userState[chatId]) return;

    switch (userState[chatId].step) {
        case "name":
            userState[chatId].name = text;
            userState[chatId].step = "birthday";
            bot.sendMessage(chatId, "📅 لطفاً تاریخ تولد خود را وارد کنید (مثلاً 1380/09/13):");
            break;

        case "birthday":
            userState[chatId].birthday = text;
            userState[chatId].step = "phone";
            bot.sendMessage(chatId, "📞 لطفاً شماره تلفن خود را وارد کنید:");
            break;

        case "phone":
            userState[chatId].phone = text;

            // send to API 
            const requestData = {
                name: userState[chatId].name,
                birthday: userState[chatId].birthday,
                phone: userState[chatId].phone,
            };

            try {
                await axios.post("http://185.231.115.236:3001/send", requestData, {
                    headers: { "Content-Type": "application/json" },
                });

                bot.sendMessage(chatId, `✅ کارت ویزیت شما با موفقیت ارسال شد!\n\n📌 **نام:** ${requestData.name}\n📅 **تاریخ تولد:** ${requestData.birthday}\n📞 **شماره تلفن:** ${requestData.phone}`);
            } catch (error) {
                console.error("❌ خطای API:", error.response ? error.response.data : error.message);
                bot.sendMessage(chatId, `❌ خطایی در ارسال کارت ویزیت رخ داد:\n${error.response ? JSON.stringify(error.response.data) : error.message}`);
            }

            // delete user state
            delete userState[chatId];
            break;
    }
});
