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

  interface GeoJSONParseOptions {
    reference: 'BD09LL' | 'BD09MC' | 'EPSG3857' | 'GCJ02' | 'WGS84';
  }

  /**
   * 此类满足用户将geojson数据解析为符合百度地图坐标的Overlay数据，用户可得到Overlay属性、坐标数据，进行覆盖物实例化或者其他处理。
   */
  class GeoJSONParse {
    constructor(options?: GeoJSONParseOptions);
    // readFeatureFromObject(geojson_feature, options);
  }

  class GeoJSONLayer {}

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
