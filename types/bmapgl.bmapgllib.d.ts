declare namespace BMapGL {
  interface DistanceToolOptions {
    tips?: string;
    followText?: string;
    unit?: 'metric' | 'us';
    lineColor?: string;
    lineStroke?: number;
    opacity?: number;
    lineStyle?: 'solid' | 'dashed' | 'dotted';
    cursor?: string;
    secIcon?: Icon;
    closeIcon?: Icon;
  }
}

declare namespace BMapGLLib {
  class DistanceTool {
    constructor(map: BMapGL.Map, opts?: BMapGL.DistanceToolOptions);
    open(): void;
    close(): void;
    addEventListener(event: string, handler: Callback): void;
    removeEventListener(event: string, handler: Callback): void;
  }
}
