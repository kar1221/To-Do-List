import { TaskTypes } from "@/Shared/Task.types";
import { IComponent } from "./Component.interface";
import TaskAmount from "./TaskAmount";
import Card from "./Card";
import MyStorageManager from "@/Helpers/StorageManager";
import { CardData } from "@/Shared/Card.types";
import "./Column.css"
import Subscriber from "@/Helpers/Subscriber";
import { StorageEvent } from "@/Shared/SubscribersEvents.Enum";

class Column implements IComponent {
  private DOMReference: Record<string, HTMLElement> = {};
  private taskType: TaskTypes;

  constructor(taskType: TaskTypes) {
    this.setupSubscription();
    this.taskType = taskType;
  }

  private setupSubscription() {
    Subscriber.Subscribe<CardData[]>(StorageEvent.ON_ITEM_MODIFIED, (data) => {
      if (typeof data === "function") return;
      this.UpdateElement(data);
    });
  }

  ComputedElement(): HTMLElement {
    const column = document.createElement("div");
    column.classList.add("column");
    
    const task = new TaskAmount(this.taskType).ComputedElement()
    column.appendChild(task);

    const listContainer = document.createElement<"div">("div");
    listContainer.classList.add("list-container");
    listContainer.setAttribute("taskType", this.taskType);
    column.appendChild(listContainer);

    this.DOMReference["listContainer"] = listContainer;
    this.DOMReference["taskAmount"] = task;

    this.CreateCards();
    
    return column;
  }

  UpdateElement(data: CardData[]): void {
    this.DOMReference["listContainer"].innerHTML = "";
    this.CreateCards(data);
  }

  private CreateCards(data?: CardData[]): void {
    // Get CardsData from Storage Manager which should be an array of data.
    if(!data) data = MyStorageManager.GetItems();
    // Filtered out the cards that are not of the same type as the column.
    const filteredData = data.filter(data => data.status === this.taskType);
    // For each card, create a card element and append it to the list container.
    filteredData.forEach(card => {
      const cardElement = new Card(card).ComputedElement();
      this.DOMReference["listContainer"].appendChild(cardElement);
    })
  }
}

export default Column;
