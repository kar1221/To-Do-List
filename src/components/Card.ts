import { IComponent } from "./Component.interface";
import { CardData } from "@/Shared/Card.types";
import {format} from "date-fns";

import "./Card.css"

class Card implements IComponent {
  private DOMReference: Record<string, HTMLElement> = {};
  private cardData: CardData;

  constructor(cardData: CardData) {
    this.cardData = cardData;
  }

  ComputedElement(): HTMLElement {
      const card = document.createElement<"div">("div");
      card.classList.add("card");

      card.draggable = true;

      this.DOMReference["card"] = card;

      const title = document.createElement<"h2">("h2");
      title.textContent = this.cardData.title;
      card.appendChild(title);

      const datesContainer = document.createElement<"div">("div");
      datesContainer.classList.add("dates-container");

      const createDateContainer = document.createElement<"div">("div");
      createDateContainer.classList.add("create-date-container");

      const createDateIcon = document.createElement<"iconify-icon">("iconify-icon");
      createDateIcon.setAttribute("icon", "mdi:calendar");
      createDateContainer.appendChild(createDateIcon);
      
      const createdDate = document.createElement<"p">("p");
      createdDate.textContent = format(this.cardData.createdDate, "PPP");
      createDateContainer.appendChild(createdDate);
      datesContainer.appendChild(createDateContainer);

      const dueDateContainer = document.createElement<"div">("div");
      dueDateContainer.classList.add("due-date-container");
      const dueDateIcon = document.createElement<"iconify-icon">("iconify-icon");
      dueDateIcon.setAttribute("icon", "mdi:calendar-remove");
      dueDateContainer.appendChild(dueDateIcon);

      const dueDate = document.createElement<"p">("p");
      dueDate.textContent = format(this.cardData.DueDate, "PPP");
      dueDateContainer.appendChild(dueDate);
      datesContainer.appendChild(dueDateContainer);

      card.appendChild(datesContainer);

      const cardFooter = document.createElement<"div">("div");
      cardFooter.classList.add("card-footer");
      const status = document.createElement<"p">("p");
      status.textContent = this.cardData.status;
      cardFooter.appendChild(status);

      const trashButton = document.createElement<"button">("button");
      trashButton.classList.add("trash-button");
      const trashIcon = document.createElement<"iconify-icon">("iconify-icon");
      trashIcon.setAttribute("icon", "mdi:trash-can");
      trashButton.appendChild(trashIcon);
      cardFooter.appendChild(trashButton);
      
      card.appendChild(cardFooter);

      
      return card;
  }

  UpdateElement(cardData: CardData): void {
    if(!this.DOMReference) return;
  }
}

export default Card;