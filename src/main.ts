import "iconify-icon";
import { TaskTypes } from "./Shared/Task.types";
import "./css-reset.css";
import "./main.css";
import Column from "./components/Column";
import Button from "./components/Button";
import InputCard from "./components/InputCard";

const main = document.querySelector("#main");
const navbar = document.querySelector(".navbar") as HTMLElement;

const column = new Column(TaskTypes.TODO);
main!.appendChild(column.ComputedElement());
const column2 = new Column(TaskTypes.ONGOING);
main!.appendChild(column2.ComputedElement());
const column3 = new Column(TaskTypes.COMPLETED);
main!.appendChild(column3.ComputedElement());

const newButton = new Button({
  text: "Add Task",
  icon: "mdi:plus",
  onClick: handleTaskAdd,
});

function handleTaskAdd() {
  const listContainer = document.querySelector(".list-container[tasktype='TODO'") as HTMLDivElement;
  const addCard = new InputCard().ComputedElement();
  listContainer.appendChild(addCard);
}
navbar.appendChild(newButton.ComputedElement());
