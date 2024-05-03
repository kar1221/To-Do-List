import { CardData } from "@/Shared/Card.types";
import LocalStorageManager from "./LocalStorageManager";
import Subscriber from "./Subscriber";
import { StorageEvent } from "@/Shared/SubscribersEvents.Enum";

const MyStorageManager = (function () {
  // Don't judge the name, i'm bad at naming.
  let storage: CardData[] = LocalStorageManager.getLocalData();
  
  const AddItems = (cardData: CardData) => {
    storage.push(cardData);
    Subscriber.Emit<CardData[]>(StorageEvent.ON_ITEM_MODIFIED, GetItems());
  };

  const GetItems = () => {
    return storage.slice();
  };

  const DeleteItem = (cardData: CardData) => {
    storage = storage.filter((data) => {
      data.title !== cardData.title &&
        data.createdDate !== cardData.createdDate;
    });

    Subscriber.Emit<CardData[]>(StorageEvent.ON_ITEM_MODIFIED, GetItems());
  };

  return {
    AddItems,
    GetItems,
    DeleteItem,
  };
})();

export default MyStorageManager;
