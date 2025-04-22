declare namespace BMapGL {
  /**
   *
   */
  interface TileLayerOptions {
    /**
     * 是否使用了带有透明信息的PNG。由于IE6不支持PNG透明，因此需要特殊处理
     */
    transparentPng?: boolean;
    isTransparentPng?: boolean;
    /**
     * 指定图块网址模板，该模板可以针对每个图块请求而展开，以根据现有的图块坐标系引用唯一的图块。模板的格式应该为：http://yourhost/tile?x={X}&y={Y}&z={Z}.png 其中X和Y分别指纬度和经度图块坐标，Z指缩放级别，比如： http://yourhost/tile?x=3&y=27&z=5.png 如果您没有提供图块网址模板，您需要实现TileLayer.getTileUrl()抽象方法
     */
    tileUrlTemplate?: string;
    copyright?: Copyright;
    /**
     * 图层的zIndex
     */
    zIndex?: number;
  }

  /**
   * 此类表示一个地图图层，您可以向地图中添加自定义图层
   */
  class TileLayer {
    /**
     * 创建一个地图图层实例
     * @param opts
     */
    constructor(opts?: TileLayerOptions);
    zIndex?: number;
    /**
     * 抽象。向地图返回地图图块的网址，图块索引由tileCoord的x和y属性在指定的缩放级别zoom提供。如果您在TileLayerOptions中提供了tileUrlTemplate参数，则可不实现此接口
     * @param tileCoord
     * @param zoom
     */
    getTilesUrl(tileCoord: Pixel, zoom: number): string;
    getCopyright(): Copyright;
    /**
     * 如果图层所用的图片为PNG格式并且包含透明信息，则返回true
     */
    isTransparentPng(): boolean;
  }

  interface ParkingSpotOptions {
    callback: (res: any) => void;
  }

  /**
   * 此类用于在地图上叠加智能停车位图层，可以实时显示室内/室外停车位的状态、车位区剩余数据等信息
   */
  class ParkingSpot {
    constructor(options?: ParkingSpotOptions);
  }

  type ReferenceType = 'BD09LL' | 'BD09MC' | 'EPSG3857' | 'GCJ02' | 'WGS84';

  interface GeoJSONParseOptions {
    reference: ReferenceType;
  }

  /**
   * 此类满足用户将geojson数据解析为符合百度地图坐标的Overlay数据，用户可得到Overlay属性、坐标数据，进行覆盖物实例化或者其他处理。
   */
  class GeoJSONParse {
    constructor(options?: GeoJSONParseOptions);
    readFeatureFromObject(geojson: GeoJSONFeature, options?: FeatureFromObjectOptions): any;
    readFeaturesFromObject(geojson: GeoJSONFeatureCollection, options?: FeatureFromObjectOptions): any;
  }

  interface FeatureFromObjectOptions {
    reference?: ReferenceType;
    isPoints?: boolean;
    markerStyle?: (properties: any) => MarkerOptions;
    polylineStyle?: (properties: any) => PolylineOptions;
    polygonStyle?: (properties: any) => PolygonOptions;
  }

  interface GeoJSONLayerOptions {
    /**
     * GeoJSON解构数据
     */
    dataSource?: any;
    /**
     * 来源数据的坐标系，可选择：BD09LL｜BD09MC｜EPSG3857｜GCJ02｜WGS84，默认是：BD09LL
     */
    reference?: ReferenceType;
    /**
     * 点类型数据样式，配置项详见BMapGL.Marker的MarkerOptions配置内容
     * @param properties
     * @returns
     */
    markerStyle?: (properties: any) => MarkerOptions;
    /**
     * 线类型数据样式，配置项详见BMapGL.Polyline的PolylineOptions配置内容
     * @param properties
     * @returns
     */
    polylineStyle?: (properties: any) => PolylineOptions;
    /**
     * 面类型数据样式，配置项详见BMapGL.Polygon的PolygonOptions配置内容
     * @param properties
     * @returns
     */
    polygonStyle?: (properties: any) => PolygonOptions;
    /**
     * 最小显示层级，默认3
     */
    minZoom?: number;
    /**
     * 最大显示层级，默认21
     */
    maxZoom?: number;
    /**
     * 显示层级，由于系统内部问题，GeoJSONLayer图层等级使用负数表达，负数越大层级越高，默认-99
     */
    level?: number;
    /**
     * 图层数据是否显示，默认true
     */
    visible?: boolean;
  }

  class GeoJSONLayer {
    /**
     * 构建GeoJSONLayer覆盖物组合图层类。layerName为图层名设置，每个覆盖物都将写入layerName属性；options详见下表
     * @param layerName
     * @param options
     */
    constructor(layerName: string, options: GeoJSONLayerOptions);
    /**
     * 设置图层显示的数据源
     * @param geojson
     */
    setData(geojson: GeoJSONFeature | GeoJSONFeatureCollection): void;
    /**
     * 获取覆盖物对象集合
     */
    getData(): any;
    /**
     * 清空地图上的覆盖物数据，以及覆盖物对象集合
     */
    clearData(): void;
    /**
     * 样式重置到图层初始化状态
     */
    resetStyle(): void;
    /**
     * 通过事件获取当前包含当前点的覆盖物集合
     * @param e
     */
    pickOverlays(e: Event): void;
    /**
     * 设置显示层级
     * @param z
     */
    setLevel(z: number): void;
    /**
     * 获取显示层级
     */
    getLevel(): number;
    /**
     * 设置是否显示
     */
    setVisible(v: boolean): void;
    /**
     * 获取显示状态
     */
    getVisible(): boolean;
    /**
     * 清空地图上的覆盖物数据，且清空覆盖物对象集合，以及关联的map对象
     */
    destroy(): void;
    addEventListener(type: string, callback: (e: any) => void): void;
    removeEventListener(type: string, callback: (e: any) => void): void;
  }

  interface NormalLayerOptions {
    /**
     * 是否显示，默认true
     */
    visible?: boolean;
  }

  class NormalLayer extends TileLayer {
    constructor(options?: NormalLayerOptions);
  }

  class TrafficLayer extends TileLayer {
    constructor(opts?: TrafficLayerOptions);
  }
  interface TrafficLayerOptions {
    predictDate?: PredictDate | undefined;
  }
  interface PredictDate {
    weekday: number;
    hour: number;
  }
  class CustomLayer extends TileLayer {
    constructor(opts: CustomLayerOptions);
    onhotspotclick: (event: { type: string; target: any; content: any }) => void;
  }
  interface Custompoi {
    poiId: string;
    databoxId: string;
    title: string;
    address: string;
    phoneNumber: string;
    postcode: string;
    provinceCode: number;
    province: string;
    cityCode: number;
    city: string;
    districtCode: number;
    district: string;
    point: Point;
    tags: string[];
    typeId: number;
    extendedData: any;
  }
  class PanoramaCoverageLayer extends TileLayer {
    constructor();
  }
  interface CustomLayerOptions {
    databoxId?: string | undefined;
    geotableId?: string | undefined;
    q?: string | undefined;
    tags?: string | undefined;
    filter?: string | undefined;
    pointDensityType?: PointDensityType | undefined;
  }
  type PointDensityType = number;
}
