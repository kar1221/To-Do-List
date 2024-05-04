import { TaskTypes } from "@/Shared/Task.types";
import { IComponent } from "./Component.interface";
import { CardData } from "@/Shared/Card.types";
import MyStorageManager from "@/Helpers/StorageManager";
import Subscriber from "@/Helpers/Subscriber";
import { StorageEvent } from "@/Shared/SubscribersEvents.Enum";
import "./Column.css";
import Card from "./Card";
import TaskAmount from "./TaskAmount";

class Column implements IComponent {
  private DOMReference: Record<string, HTMLElement> = {};
  private cardData: CardData[] = [];
  private Cards: Card[] = [];
  private taskType: TaskTypes;

  constructor(taskType: TaskTypes) {
    this.setupSubscription();
    this.taskType = taskType;
    this.cardData = MyStorageManager.GetItems();
  }

  private setupEventListener() {
    const container = this.DOMReference["listContainer"];

    container.addEventListener("dragover", (event: DragEvent) => {
      event.preventDefault();
      container.classList.add("dragover")
    });

    container.addEventListener("dragleave", (event: DragEvent) => {
      event.preventDefault();
      container.classList.remove("dragover")
    });

    container.addEventListener("drop", (event: DragEvent) => {
      container.classList.remove("dragover")
      const uuid = event.dataTransfer?.getData("CardData");
      if(!uuid) return;

      const data = MyStorageManager.GetItems();
      const target = data.find((data) => data.uuid === uuid);

      if(target?.status === this.taskType) return;

      MyStorageManager.ModifyTaskType(uuid, this.taskType);

      event.dataTransfer?.clearData("CardData");
      
    })
  }

  private setupSubscription() {
    Subscriber.Subscribe<CardData[]>(StorageEvent.ON_ITEM_MODIFIED, (data) => {
      if (typeof data === "function") return;
      this.UpdateElement(data);
      this.UpdateCardData();
    });
  }

  ComputedElement(): HTMLElement {
    const column = document.createElement("div");
    column.classList.add("column");

    const task = new TaskAmount(this.taskType).ComputedElement();
    column.appendChild(task);

    const listContainer = document.createElement<"div">("div");
    listContainer.classList.add("list-container");
    listContainer.setAttribute("taskType", this.taskType);
    column.appendChild(listContainer);

    this.DOMReference["listContainer"] = listContainer;
    this.DOMReference["taskAmount"] = task;

    this.CreateCards();
    this.initializeCardData();
    this.setupEventListener();

    return column;
  }

  UpdateElement(data: CardData[]): void {
    this.CreateCards(data);
    this.RemoveCards(data);
  }

  private CreateCards(data?: CardData[]): void {
    // // Get CardsData from Storage Manager which should be an array of data.
    // if(!data) data = this.cardData;
    // // Filtered out the cards that are not of the same type as the column.
    // const filteredData = data.filter(data => data.status === this.taskType);
    // // For each card, create a card element and append it to the list container.
    // filteredData.forEach(card => {
    //   const cardElement = new Card(card).ComputedElement();
    //   this.DOMReference["listContainer"].appendChild(cardElement);
    // })
    if (!data) return;

    const cardToBeAdded = this.getCardDataToBeAdded(data);

    cardToBeAdded.forEach((card) => {
      const newCard = new Card(card);
      this.Cards.push(newCard);
      const cardElement = newCard.ComputedElement();
      this.DOMReference["listContainer"].appendChild(cardElement);
    });
  }

  private RemoveCards(data: CardData[]) {
    const cardToBeDeleted = this.getCardDataToBeDeleted(data);

    cardToBeDeleted.forEach((card) => {
      this.Cards.forEach((anotherCard) => {
        if (anotherCard.IsIdenticalTo(card)) anotherCard.DeleteCard();
      });
    });
  }

  public getCardDataToBeDeleted(data: CardData[]): CardData[] {
    const storageItems = data;

    const different = this.cardData.filter((x) => !storageItems.includes(x));

    return different.filter((x) => x.status === this.taskType);
  }

  public getCardDataToBeAdded(data: CardData[]): CardData[] {
    const storageItems = data;

    const different = storageItems.filter((x) => !this.cardData.includes(x));

    return different.filter((x) => x.status === this.taskType);
  }

  private UpdateCardData(): void {
    this.cardData = MyStorageManager.GetItems();
  }

  private initializeCardData(): void {
    const filteredData = this.cardData.filter(
      (data) => data.status === this.taskType
    );

    filteredData.forEach((card) => {
      const newCard = new Card(card);
      this.Cards.push(newCard);
      this.DOMReference["listContainer"].appendChild(newCard.ComputedElement());
    });
  }
}

export default Column;
