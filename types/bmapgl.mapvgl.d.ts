declare namespace MapVGL {
  interface LayerOptions extends Pick {
    /**
     * 地图循环渲染时图层会截断，所以展示全球范围的点、线需要图层同步底图循环时，该参数设为true
     */
    repeat?: boolean;
    /**
     * 图层渲染的顺序，值越小越先渲染，值越大越后渲染，后渲染的会对先渲染的图层有遮挡
     */
    renderOrder?: number;
    /**
     * 颜色叠加模式，详情: https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/blendFunc
     */
    blend: string | string[];
    /**
     * 数据
     */
    data: GeoJSON[];
  }

  /**
   * 可视化图层抽象对象
   */
  class Layer<T extends LayerOptions = any> {
    constructor(options?: T);
    /**
     * 图层对应的配置项，如果其中有data参数，则相当于默认初始化进行了setData操作
     * @param options
     */
    setOptions(options: T): void;
    /**
     * 设置的配置项
     */
    getOptions(): T;
    /**
     * 设置数据对象
     * @param data
     */
    setData(data: GeoJSON[]): void;
    /**
     * 获取设置的数据对象
     */
    getData(): GeoJSON[];
    /**
     * 获取默认配置项
     */
    getDefaultOptions(): T;
    /**
     * 清空图层数据
     */
    clear(): void;
    pick(x: number, y: number): PickEvent;
  }

  interface ViewOptions {
    /**
     * 地图对象
     */
    map: BMapGL.Map;
    /**
     * 地图类型，默认为3D百度地图
     */
    mapType: 'bmap' | 'blank' | 'cesium';
    /**
     * 图像后处理效果对象数组
     */
    effects: (BloomEffect | BrightEffect)[];
  }

  /**
   * 初始化MapVGL容器对象，用来管理各可视化图层对象
   */
  class View {
    constructor(options?: ViewOptions);
    /**
     * 添加可视化图层
     * @param layer
     */
    addLayer(layer: Layer): void;
    /**
     * 删除对应的可视化图层
     * @param layer
     */
    removeLayer(layer: Layer): void;
    /**
     * 删除所有可视化图层
     */
    removeAllLayers(): void;
    /**
     * 返回所有可视化图层
     */
    getAllLayers(): Layer[];
    /**
     * 返回所有使用ThreeLayer开发的可视化图层
     */
    getAllThreeLayers(): any[];
    /**
     * 隐藏当前图层管理器及所含图层
     */
    hide(): void;
    /**
     * 显示当前图层管理器及所含图层
     */
    show(): void;
    /**
     * 隐藏对应图层
     */
    hideLayer(layer: Layer): void;
    /**
     * 显示对应图层
     * @param layer
     */
    showLayer(layer: Layer): void;
    /**
     * 销毁当前容器
     */
    destroy(): void;
  }

  interface PointLayerOptions extends LayerOptions {
    /**
     * 颜色，同css颜色
     */
    color?: string;
    /**
     * 展示点的形状
     */
    shape?: 'circle' | 'square';
    /**
     * 点大小
     */
    size?: number | ((data: GeoJSON) => number);
    /**
     * 绘制大小的方式，即指定size属性的单位
     */
    unit?: 'px' | 'm';
    /**
     * 边框宽度
     */
    borderWidth?: number;
    /**
     * 边框颜色，同css颜色
     */
    borderColor?: string;
  }

  /**
   * 用来展示大数据量的简单点图层，继承自Layer 可使用鼠标拾取Pick
   */
  class PointLayer extends Layer<PointLayerOptions> {
    constructor(options?: PointLayerOptions);
  }

  interface IconLayerOptions extends LayerOptions {
    /**
     * icon图标
     */
    icon?: string | HTMLCanvasElement | HTMLImageElement;
    /**
     * 设置icon图标宽度
     */
    width?: number;
    /**
     * 设置icon图标高度
     */
    height?: number;
    /**
     * 绘制大小的方式，即指定width和height属性的单位
     */
    unit?: 'px' | 'm';
    /**
     * 设置icon缩放
     */
    scale?: number;
    /**
     * 设置icon按顺时针旋转角度
     */
    angle?: number;
    /**
     * 图层的透明度，值为0-1
     */
    opacity?: number;
    /**
     * icon是否随地图倾斜，即平躺在地图上
     */
    flat?: boolean;
    /**
     * icon图标偏移值，基于图标中心点偏移，[{number}x, {number}y]
     */
    offset?: [number, number];
    /**
     * 生成icon雪碧图时，图标间的空隙
     */
    padding?: [number, number];
  }

  /**
   * 用来展示大数据量的简单点图层，继承自Layer 可使用鼠标拾取Pick
   */
  class IconLayer extends Layer<IconLayerOptions> {
    constructor(options?: IconLayerOptions);
  }

  interface PointTripLayerOptions extends LayerOptions {
    /**
     * 颜色，同css颜色
     */
    color?: string;
    /**
     * 动画开始时间
     */
    startTime?: number;
    /**
     * 动画结束时间
     */
    endTime?: number;
    /**
     * 执行每次动画的步长
     */
    step?: number;
    /**
     * 动画的拖尾时长
     */
    trailLength?: number;
  }

  /**
   * 用来展示点按时间东西图层，继承自Layer
   */
  class PointTripLayer extends Layer<PointTripLayerOptions> {
    constructor(options?: PointTripLayerOptions);
  }

  interface HeatPointLayerOptions extends LayerOptions {
    /**
     * 展示方式
     */
    style?: 'grid' | 'normal';
    /**
     * 聚合半径，当style属性为grid时有效
     */
    girdSize?: number;
    /**
     * 渐变色
     */
    gradient?: { [x: number]: string };
    /**
     * 最大阈值
     */
    max?: number;
    /**
     * 最小阈值
     */
    min?: number;
  }

  /**
   * 用来展示热力点图效果，继承自PointLayer
   */
  class HeatPointLayer extends Layer<HeatPointLayerOptions> {
    constructor(options?: HeatPointLayerOptions);
  }

  interface HeatmapLayerOptions extends LayerOptions {
    /**
     * 渐变色
     */
    gradient?: { [x: number]: string };
    /**
     * 最大阈值
     */
    max?: number;
    /**
     * 最小阈值
     */
    min?: number;
    /**
     * 热力画笔笔触大小
     */
    size?: number;
    /**
     * 对应size的单位
     */
    unit?: 'px' | 'm';
    /**
     * 形成网格的最大高度，默认0效果最好，如无三维高度需求可不打开
     */
    height?: number;
  }

  class HeatmapLayer extends Layer<HeatmapLayerOptions> {
    constructor(options?: HeatmapLayerOptions);
  }

  class HeatGridLayer extends Layer<HeatmapLayerOptions> {}

  interface BloomEffectOptions {
    /**
     * 效果门槛阈值，范围0.0~1.0，值越低，亮部越多
     */
    threshold?: number;
    /**
     * 炫光模糊值，默认2，是原图形半径的2倍
     */
    blurSize?: number;
  }

  /**
   * 鼠标交互行为，支持hover与click
   */
  interface Pick {
    /**
     * 是否开启鼠标事件，开启后支持鼠标onClick与onMousemove事件，同时支持改变拾取物体颜色
     */
    enablePicked?: boolean;
    /**
     * 手动指定选中数据项索引，使该条数据所表示物体变色，-1表示没选中任何元素
     */
    selectedIndex?: number;
    /**
     * 选中态颜色
     */
    selectedColor?: string;
    /**
     * 根据鼠标位置来自动设置选中项selectedIndex，使选中物体变色，设置为true后selectedIndex失效
     */
    autoSelect?: boolean;
    /**
     * 点击事件，如果点击在可选中物体上，则返回对应数据
     * @returns
     */
    onClick?: (e: PickEvent) => void;
    /**
     * 双击事件，如果双击在可选中物体上，则返回对应数据
     * @returns
     */
    onDblClick?: (e: PickEvent) => void;
    /**
     * 右键事件，如果右键在可选中物体上，则返回对应数据
     * @param e
     * @returns
     */
    onRightClick?: (e: PickEvent) => void;
    /**
     * 鼠标指针移动事件，如果指针悬浮在在可选中物体上，则返回对应数据
     * @param e
     * @returns
     */
    onMousemove?: (e: PickEvent) => void;
  }

  interface PickEvent {
    dataIndex: number;
    dataItem: any;
  }

  /**
   * 眩光后处理特效
   */
  class BloomEffect {
    constructor(options?: BloomEffectOptions);
  }

  interface BrightEffectOptions {
    /**
     * 发光门槛阈值，范围0.0~1.0，值越低发光效果越亮
     */
    threshold?: number;
    /**
     * 模糊值半径，默认2，是原图形半径的2倍
     */
    blurSize?: number;
    /**
     * 清晰度，范围0.0~1.0
     */
    clarity?: number;
  }

  /**
   * 发光后处理特效，也可以用作炫光效果
   */
  class BrightEffect {
    constructor(options?: BrightEffectOptions);
  }

  interface GeoJSON {
    geometry: {
      type: 'Point' | 'LineString' | 'Polygon';
      coordinates: number[][] | number[][][];
    };
    properties?: {
      [x: string]: any;
      color?: number[];
      icon?: string | HTMLCanvasElement | HTMLImageElement;
      time?: number;
      count?: number;
    };
    [x: string]: any;
  }
}
