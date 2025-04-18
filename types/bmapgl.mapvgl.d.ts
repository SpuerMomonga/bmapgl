declare namespace MapVGl {
  interface GeoJSON {
    geometry: {
      type: 'Point' | 'LineString' | 'Polygon';
      coordinates: number[][] | number[][][];
    };
    properties?: {
      [x: string]: any;
      color: string;
      count: number;
    };
    [x: string]: any;
  }
}

declare type mapvgl = MapVGl;
