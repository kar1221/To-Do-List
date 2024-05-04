import "iconify-icon";
import { TaskTypes } from "./Shared/Task.types";
import "./css-reset.css";
import "./main.css";
import Column from "./components/Column";
import { TestData } from "./Shared/CardData.test";

const main = document.querySelector("#main");

localStorage.setItem("listData", JSON.stringify(TestData));

const column = new Column(TaskTypes.TODO);
main!.appendChild(column.ComputedElement());
const column2 = new Column(TaskTypes.ONGOING);
main!.appendChild(column2.ComputedElement());
const column3 = new Column(TaskTypes.COMPLETED);
main!.appendChild(column3.ComputedElement());





