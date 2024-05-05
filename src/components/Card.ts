import { IComponent } from "./Component.interface";
import { CardData, Priority } from "@/Shared/Card.types";
import { format, differenceInDays } from "date-fns";
import MyStorageManager from "@/Helpers/StorageManager";

import "./Card.css";
import { TaskTypes } from "@/Shared/Task.types";

class Card implements IComponent {
  private DOMReference: Record<string, HTMLElement> = {};
  private cardData: CardData;

  private setupEventListener(card: HTMLElement) {
    card.addEventListener("dragstart", (event: DragEvent) => {
      event.dataTransfer?.setData("CardData", this.cardData.uuid);
    });

    card.addEventListener("dragend", (event: DragEvent) => {
      event.dataTransfer?.clearData("CardData");
    });
  }

  constructor(cardData: CardData) {
    this.cardData = cardData;
  }

  ComputedElement(): HTMLElement {
    const card = document.createElement<"div">("div");
    card.classList.add("card");
    card.setAttribute("uuid", this.cardData.uuid);

    card.draggable = true;

    this.DOMReference["card"] = card;

    const title = document.createElement<"h2">("h2");
    title.textContent = this.cardData.title;
    card.appendChild(title);

    const datesContainer = document.createElement<"div">("div");
    datesContainer.classList.add("dates-container");

    const dueDateContainer = document.createElement<"div">("div");
    dueDateContainer.classList.add("due-date-container");
    const dueDateIcon = document.createElement<"iconify-icon">("iconify-icon");
    dueDateIcon.setAttribute("icon", "mdi:calendar-remove");
    dueDateContainer.appendChild(dueDateIcon);

    const dueDate = document.createElement<"p">("p");
    const daysBeforeDueDate = differenceInDays(
      this.cardData.DueDate,
      new Date(Date.now())
    );

    let dateContent = "";

    if (daysBeforeDueDate === 0) {
      dateContent = "Today";
    } else if (daysBeforeDueDate === 1) {
      dateContent = "Tomorrow";
    } else if (daysBeforeDueDate < 0) {
      dateContent = `${-daysBeforeDueDate} days ago`;
    } else {
      dateContent = `In ${daysBeforeDueDate} days`;
    }

    dueDate.textContent = `${format(
      this.cardData.DueDate,
      "PP"
    )} (${dateContent})`;

    if (this.cardData.status === TaskTypes.COMPLETED) {
      dueDate.style.textDecoration = "line-through";
    }

    dueDateContainer.appendChild(dueDate);
    datesContainer.appendChild(dueDateContainer);

    const createDateContainer = document.createElement<"div">("div");
    createDateContainer.classList.add("create-date-container");

    const createDateIcon =
      document.createElement<"iconify-icon">("iconify-icon");
    createDateIcon.setAttribute("icon", "mdi:calendar");
    createDateContainer.appendChild(createDateIcon);

    const createdDate = document.createElement<"p">("p");
    const days = differenceInDays(
      new Date(Date.now()),
      this.cardData.createdDate
    ).toString();

    if (days === "0") {
      createdDate.textContent = "Today";
    } else {
      createdDate.textContent = `${days} days ago`;
    }

    createDateContainer.appendChild(createdDate);
    datesContainer.appendChild(createDateContainer);

    card.appendChild(datesContainer);

    const cardFooter = document.createElement<"div">("div");
    cardFooter.classList.add("card-footer");

    const priorityContainer = document.createElement<"div">("div");
    priorityContainer.classList.add("priority-container");

    const status = document.createElement<"p">("p");
    const statusIcon = document.createElement<"div">("div");
    statusIcon.classList.add("status-icon");
    statusIcon.style.backgroundColor =
      priorityColor[this.cardData.priority].backgroundColor;
    status.textContent = this.cardData.priority.toLowerCase();

    const changePriorityPanel = document.createElement<"div">("div");
    changePriorityPanel.classList.add("change-priority-panel");

    const filteredPriority = PriorityTypes.filter(
      (priority) => priority !== this.cardData.priority
    );

    filteredPriority.forEach(priority => {
      const buttonElement = document.createElement<"button">("button");
      const icon = document.createElement<"div">("div");
      const text = document.createElement<"p">("p");
      text.textContent = priority.toLowerCase();
      icon.classList.add("status-icon");
      icon.style.backgroundColor = priorityColor[priority].backgroundColor;
      buttonElement.appendChild(icon);
      buttonElement.appendChild(text);

      buttonElement.addEventListener("click", () => {
        this.cardData.priority = priority;
        MyStorageManager.ModifyPriority(this.cardData.uuid, priority);
      });

      changePriorityPanel.appendChild(buttonElement);
    });

    priorityContainer.appendChild(statusIcon);
    priorityContainer.appendChild(status);

    priorityContainer.addEventListener("click", () => {
      changePriorityPanel.classList.toggle("active");
    })

    cardFooter.appendChild(changePriorityPanel);
    cardFooter.appendChild(priorityContainer);

    const trashButton = document.createElement<"button">("button");
    trashButton.classList.add("trash-button");
    const trashIcon = document.createElement<"iconify-icon">("iconify-icon");
    trashIcon.setAttribute("icon", "mdi:trash-can");

    trashButton.addEventListener("click", () => {
      MyStorageManager.RemoveItem(this.cardData);
    });

    trashButton.appendChild(trashIcon);
    cardFooter.appendChild(trashButton);

    card.appendChild(cardFooter);

    this.setupEventListener(card);

    return card;
  }

  UpdateElement(): void {}

  public IsIdenticalTo(CardData: CardData) {
    return this.cardData.uuid === CardData.uuid;
  }

  public DeleteCard() {
    this.DOMReference["card"].remove();
  }
}

const priorityColor = {
  [Priority.CASUAL]: { backgroundColor: "#0284c7" },
  [Priority.IMPORTANT]: { backgroundColor: "#ea580c" },
  [Priority.URGENT]: { backgroundColor: "#dc2626" },
};

const PriorityTypes = [Priority.CASUAL, Priority.IMPORTANT, Priority.URGENT];

export default Card;
