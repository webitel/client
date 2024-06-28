import { createI18n } from "vue-i18n";
import en from "./en/en";
import kz from "./kz/kz";
import ru from "./ru/ru";
import ua from "./ua/ua";

const messages = {
  en,
  ru,
  ua,
  kz,
};

export default new createI18n({
  locale: "en",
  fallbackLocale: "en",
  allowComposition: true,
  messages,
});
