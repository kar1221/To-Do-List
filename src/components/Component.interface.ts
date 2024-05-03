export interface IComponent {
  ComputedElement(): HTMLElement;

  UpdateElement(...args: unknown[]): void;
}
