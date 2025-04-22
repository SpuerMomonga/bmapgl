/**
 * GeoJSON 类型声明 (RFC 7946)
 */

// 基础坐标类型：经度、纬度，可选高程
declare type Position = number[]; // 至少包含 [经度, 纬度]，可能包含高程或其他维度

// 边界框类型 (二维或三维)
declare type BBox = [number, number, number, number] | [number, number, number, number, number, number];

// 基础GeoJSON对象接口
declare interface GeoJsonObject {
  type: string;
  bbox?: BBox;
}

// 几何类型定义
declare type Geometry = Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon | GeometryCollection;

// 具体几何对象
declare interface Point extends GeoJsonObject {
  type: 'Point';
  coordinates: Position;
}

declare interface MultiPoint extends GeoJsonObject {
  type: 'MultiPoint';
  coordinates: Position[];
}

declare interface LineString extends GeoJsonObject {
  type: 'LineString';
  coordinates: Position[];
}

declare interface MultiLineString extends GeoJsonObject {
  type: 'MultiLineString';
  coordinates: Position[][];
}

declare interface Polygon extends GeoJsonObject {
  type: 'Polygon';
  coordinates: Position[][];
}

declare interface MultiPolygon extends GeoJsonObject {
  type: 'MultiPolygon';
  coordinates: Position[][][];
}

declare interface GeometryCollection extends GeoJsonObject {
  type: 'GeometryCollection';
  geometries: Geometry[];
}

// Feature 类型
declare interface GeoJSONFeature extends GeoJsonObject {
  type: 'Feature';
  geometry: Geometry | null;
  properties: Record<string, unknown> | null;
  id?: string | number;
}

// Feature Collection 类型
declare interface GeoJSONFeatureCollection extends GeoJsonObject {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}
