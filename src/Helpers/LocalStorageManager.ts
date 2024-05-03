import { CardData } from "@/Shared/Card.types";
import Subscriber from "./Subscriber";
import { StorageEvent } from "@/Shared/SubscribersEvents.Enum";

const LocalStorageManager = (function () {

  Subscriber.Subscribe<CardData[]>(StorageEvent.ON_ITEM_MODIFIED, (data) => {
    if(typeof data === "function") return;
    setLocalData(data);
  })

  const getLocalData = () => {
    const data = localStorage.getItem("listData") || "";

    if (data === "") return [];
    return JSON.parse(data) as CardData[];
  };

  const setLocalData = (data: CardData[]) => {
    localStorage.setItem("listData", JSON.stringify(data));
  };

  return {
    getLocalData,
    setLocalData
  };
})();

export default LocalStorageManager;
