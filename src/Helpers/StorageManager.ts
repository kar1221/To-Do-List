import { CardData } from "@/Shared/Card.types";
import LocalStorageManager from "./LocalStorageManager";
import Subscriber from "./Subscriber";
import { StorageEvent } from "@/Shared/SubscribersEvents.Enum";
import { TaskTypes } from "@/Shared/Task.types";
import { Priority } from "@/Shared/Card.types";

const MyStorageManager = (function () {
  // Don't judge the name, i'm bad at naming.
  let storage: CardData[] = LocalStorageManager.getLocalData();

  const AddItem = (cardData: CardData) => {
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

  const ModifyPriority = (uuid: string, priority: Priority) => {
    storage = storage.map((data) => {
      if (data.uuid === uuid) {
        return {
          ...data,
          priority: priority,
        };
      } else {
        return data;
      }
    });
    
    Subscriber.Emit<CardData[]>(StorageEvent.ON_ITEM_MODIFIED, GetItems());
  }

  return {
    AddItem,
    GetItems,
    RemoveItem,
    ModifyTaskType,
    ModifyPriority
  };
})();

export default MyStorageManager;
