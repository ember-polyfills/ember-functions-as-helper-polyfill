import '@ember/component';

declare module '@ember/modifier' {
  export function setModifierManager(manager: unknown, modifier: unknown): void;
  export function capabilities(version: string): unknown;
}

