declare module 'aos' {
  interface AosOptions {
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
    offset?: number;
    delay?: number;
    startEvent?: string;
    disable?: string | boolean | Function;
  }

  interface Aos {
    init(options?: AosOptions): void;
    refresh(hard?: boolean): void;
  }

  const aos: Aos;

  export default aos;
}