import { CardData, Priority } from "@/Shared/Card.types";
import LocalStorageManager from "./LocalStorageManager";
import Subscriber from "./Subscriber";
import { StorageEvent } from "@/Shared/SubscribersEvents.Enum";
import { TaskTypes } from "@/Shared/Task.types";

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

  const RemoveItem = (cardData: CardData) => {
    const index = storage.indexOf(cardData);
    storage.splice(index, 1);

    Subscriber.Emit<CardData[]>(StorageEvent.ON_ITEM_MODIFIED, GetItems());
  };

  const ModifyTaskType = (uuid: string, taskType: TaskTypes) => {
    storage = storage.map((data) => {
      if (data.uuid === uuid) {
        return {
          ...data,
          status: taskType,
        };
      } else {
        return data;
      }
    });

    Subscriber.Emit<CardData[]>(StorageEvent.ON_ITEM_MODIFIED, GetItems());
  };

  return {
    AddItems,
    GetItems,
    RemoveItem,
    ModifyTaskType
  };
})();

export default MyStorageManager;
