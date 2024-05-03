import { IComponent } from "./Component.interface";

class Column implements IComponent {

  constuctor() {}

  ComputedElement(): HTMLElement {
    const column = document.createElement("div");
    column.classList.add("column");
    return column;
  }

  UpdateElement(): void {

  }
}

export default Column;