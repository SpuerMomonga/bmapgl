declare module 'mapvgl' {
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
    blend?: string | string[];
    /**
     * 数据
     */
    data?: GeoJSON[];
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
    map?: BMapGL.Map;
    /**
     * 地图类型，默认为3D百度地图
     */
    mapType?: 'bmap' | 'blank' | 'cesium';
    /**
     * 图像后处理效果对象数组
     */
    effects?: Effect[];
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

  interface HeatGridLayerOptions extends LayerOptions {
    /**
     * 展示方式
     */
    style?: 'grid' | 'normal';
    /**
     * 柱状图单个柱子的半径，也是聚合半径
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
    /**
     * 最大高度
     */
    maxHeight?: number;
    /**
     * 最小高度
     */
    minHeight?: number;
  }

  class HeatGridLayer extends Layer<HeatGridLayerOptions> {
    constructor(options?: HeatGridLayerOptions);
  }

  interface SparkLayerOptions extends LayerOptions {
    /**
     * 颜色，同css颜色
     */
    color?: string;
    /**
     * 烟花线的高度
     */
    height?: number;
    /**
     * 动画的速度
     */
    step?: number;
    /**
     * 动画开始时间
     */
    startTime?: number;
    /**
     * 动画结束时间
     */
    endTime?: number;
  }

  class SparkLayer extends Layer<SparkLayerOptions> {
    constructor(options?: SparkLayerOptions);
  }

  interface CircleLayerOptions extends LayerOptions {
    /**
     * 设置圆的类型
     */
    type?: 'simple' | 'wave' | 'bubble';
    /**
     * 颜色，同css颜色
     */
    color?: string;
    /**
     * 圆的半径大小，带扩散效果时指的是中心圆的半径大小
     */
    size?: number;
    /**
     * 扩散效果的半径大小，设置值时需要比size的值大，否则看不出扩散效果，也可设置为函数，传入参数为中心圆半径
     */
    radius?: number | ((size: number) => number);
    /**
     * 扩散效果的动画周期。wave类型时duration影响的是波纹的扩散速度，越小越快 bubble类型时duration是扩散开始到最大半径的时间，越大越长
     */
    duration?: number;
    /**
     * 扩散效果的间隔时间。wave类型时trial影响的是波纹数，越大越多 bubble类型时trial是扩散最大半径到消失的时间，越大越长
     */
    trial?: number;
    /**
     * 扩散效果的开始时间是否随机，设置为‘false’则表现为节奏一致
     */
    random?: boolean;
  }

  class CircleLayer extends Layer<CircleLayerOptions> {
    constructor(options?: CircleLayerOptions);
  }

  interface RippleLayerOptions extends LayerOptions {
    /**
     * 颜色，同css颜色
     */
    color?: string;
    /**
     * 点大小
     */
    size?: number;
    /**
     * size属性的单位
     */
    unit?: 'px' | 'm';
    /**
     * 动画循环一次的时间，时间越短，动画速度越快
     */
    duration?: number;
  }

  class RippleLayer extends Layer<RippleLayerOptions> {
    constructor(options?: RippleLayerOptions);
  }

  interface TextLayerOptions extends LayerOptions {
    /**
     * 文字字体
     */
    fontFamily?: string;
    /**
     * 文字颜色，同css颜色
     */
    color?: string;
    /**
     * 文字大小
     */
    fontSize?: number;
    /**
     * 绘制大小的方式，即指定fontSize属性的单位
     */
    unit?: 'px' | 'm';
    /**
     * 设置icon按顺时针旋转角度
     */
    angle?: number;
    /**
     * 文字是否随地图倾斜，即平躺在地图上
     */
    flat?: boolean;
    /**
     * 是否开启碰撞检测，开启后重叠部分的文字会被隐藏
     */
    collides?: boolean;
    /**
     * 文字偏移量，基于文字中心点偏移，[{number}x, {number}y]
     */
    offset?: [number, number];
    /**
     * 文字内边距，[{number}左右边距, {number}上下边距]
     */
    padding?: [number, number];
    /**
     * 文字外边距，[{number}左右边距, {number}上下边距]
     */
    margin?: [number, number];
  }

  class TextLayer extends Layer<TextLayerOptions> {
    constructor(options?: TextLayerOptions);
  }

  interface FanLayerOptions extends LayerOptions {
    /**
     * 雷达颜色，同css颜色
     */
    color?: string;
    /**
     * 雷达大小
     */
    size?: number;
    /**
     * 雷达扫描动画的步长，步长越大动画速度越快
     */
    step?: number;
  }

  class FanLayer extends Layer<FanLayerOptions> {
    constructor(options?: FanLayerOptions);
  }

  interface SimpleLineLayerOptions extends LayerOptions {
    /**
     * 颜色，同css颜色
     */
    color?: string;
  }

  class SimpleLineLayer extends Layer<SimpleLineLayerOptions> {
    constructor(options?: SimpleLineLayerOptions);
  }

  interface LineLayerOptions extends LayerOptions {
    /**
     * 颜色，同css颜色
     */
    color?: string;
    /**
     * 线的宽度
     */
    width?: number;
    /**
     * 绘制大小的方式，即指定width和height属性的单位
     */
    unit?: 'px' | 'm';
    /**
     * 定义虚线间隔的数组，数组长度为2。数组的两位分别表示实线和虚线的长度，单位像素，如[10, 20]表示实线10px，虚线20px
     */
    dashArray?: number[];
    /**
     * 虚线偏移量，单位像素，可以通过实时改变该值来实现动画
     */
    dashOffset?: number;
    /**
     * 线的端头，可选butt 平头、square 方头、round 圆头
     */
    lineCap?: 'butt' | 'square' | 'round';
    /**
     * 线的连接拐角，可选miter 尖角、bevel 平角、round 圆角
     */
    lineJoin?: 'miter' | 'bevel' | 'round';
    /**
     * 由于在尖角情况下角度特别小时，尖角特别长，故用该参数来控制尖角突出部分的最大长度
     */
    miterLimit?: string;
    /**
     * 抗锯齿，默认关闭为false
     */
    antialias?: boolean;
    /**
     * 沿法线方向的偏移，几乎很少使用到，设置该属性后只能用butt端头和miter连接，不然会出现问题
     */
    offset?: number;
    /**
     * 设置该参数来实现蝌蚪线动画，下面的属性生效依赖该值为true。注意，该属性只在初始化时读取一次，实例化后不可通过setOptions方法来重置
     */
    animation?: boolean;
    /**
     * 该参数指定每条线段的长度，值为粒子长度占数据中最长的线整体长度的比例
     */
    interval?: number;
    /**
     * 动画的循环时间，单位为秒
     */
    duration?: number;
    /**
     * 拖尾长度占间隔的比例
     */
    trailLength?: number;
    /**
     * 地图视野大于等于一定级别时开启动画，默认值为3，即一直开启
     */
    minZoom?: number;
    /**
     * 地图视野小于等于一定级别时开启动画，默认值为21，即一直开启
     */
    maxZoom?: number;
    /**
     * 设置该参数，可以在线上叠加一些图形来适用于一些场景。注意，该属性只在初始化时读取一次，实例化后不可通过setOptions方法来重置
     */
    style?: 'road' | 'arrow';
    /**
     * 控制贴图的样式，对象具有color和width属性
     */
    styleOptions?: {
      color?: string;
      width?: number;
    };
  }

  class LineLayer extends Layer<LineLayerOptions> {
    constructor(options?: LineLayerOptions);
  }

  interface WallLayerOptions extends LayerOptions {
    /**
     * 颜色，同css颜色
     */
    color?: string;
    /**
     * 渐变颜色模式，设置后color属性会失效，数据类型为Object。Object只有0和1两个键，0表示远地处的颜色，1表示近地处的颜色
     */
    gradient?: { [x: number]: string };
    /**
     * 立体墙的高度
     */
    height?: number;
    /**
     * 纹理贴图，注意，宽高必须为2的次幂
     */
    texture?: string | HTMLCanvasElement | HTMLImageElement;
    /**
     * 开启精准贴图模式，纹理会按顶点间的实际距离对应拉伸，当使用的纹理有实际数据意义时开启
     */
    enablePreciseMap?: boolean;
    /**
     * 重复贴图，单位为米，如值为500代表500米重复一次贴图，值为0时不重复贴图
     */
    repeatMap?: number;
  }

  class WallLayer extends Layer<WallLayerOptions> {
    constructor(options?: WallLayerOptions);
  }

  interface HeatLineLayerOptions extends LayerOptions {
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

  class HeatLineLayer extends Layer<HeatLineLayerOptions> {
    constructor(options?: HeatLineLayerOptions);
  }

  interface LineRainbowLayerOptions extends LayerOptions {
    /**
     * 颜色值数组，颜色值与坐标点数组一一对应，格式同css颜色。注意：当颜色值个数大于坐标点个数n时，取颜色值前n个；当颜色值小于坐标点个数时，各坐标点均匀获取颜色值
     */
    color?: string[];
    /**
     * 线的宽度
     */
    width?: number;
    /**
     * 线的端头，可选butt 平头、square 方头、round 圆头
     */
    lineCap?: 'butt' | 'square' | 'round';
    /**
     * 线的连接拐角，可选miter 尖角、bevel 平角、round 圆角
     */
    lineJoin?: 'miter' | 'bevel' | 'round';
    /**
     * 由于在尖角情况下角度特别小时，尖角特别长，故用该参数来控制尖角突出部分的最大长度
     */
    miterLimit?: string;
    /**
     * 绘制大小的方式，即指定width和height属性的单位
     */
    unit?: 'px' | 'm';
    /**
     * 抗锯齿，默认关闭为false
     */
    antialias?: boolean;
    /**
     * 沿法线方向的偏移，几乎很少使用到，设置该属性后只能用butt端头和miter连接，不然会出现问题
     */
    offset?: number;
    /**
     * 设置该参数，可以在线上叠加一些图形来适用于一些场景。注意，该属性只在初始化时读取一次，实例化后不可通过setOptions方法来重置
     */
    style?: 'road' | 'arrow';
    /**
     * 控制贴图的样式，对象具有color和width属性
     */
    styleOptions?: {
      color?: string;
      width?: number;
    };
  }

  class LineRainbowLayer extends Layer<LineRainbowLayerOptions> {
    constructor(options?: LineRainbowLayerOptions);
  }

  interface LineFlowLayerOptions extends LayerOptions {
    /**
     * 颜色，同css颜色
     */
    color?: string;
    /**
     * 线的宽度
     */
    width?: number;
    /**
     * 该参数指定每条线段的长度，值为粒子长度占数据中最长的线整体长度的比例
     */
    interval?: number;
    /**
     * 动画的循环时间，单位为秒
     */
    duration?: number;
    /**
     * 拖尾长度占间隔的比例
     */
    trailLength?: number;
    /**
     * 地图视野大于等于一定级别时开启动画，默认值为3，即一直开启
     */
    minZoom?: number;
    /**
     * 地图视野小于等于一定级别时开启动画，默认值为21，即一直开启
     */
    maxZoom?: number;
  }

  class LineFlowLayer extends Layer<LineFlowLayerOptions> {
    constructor(options?: LineFlowLayerOptions);
  }

  interface LineTripLayerOptions extends LayerOptions {
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

  class LineTripLayer extends Layer<LineTripLayerOptions> {
    constructor(options?: LineTripLayerOptions);
  }

  interface WallTripLayerOptions extends LayerOptions {
    /**
     * 颜色，同css颜色
     */
    color?: string;
    /**
     * 渐变颜色模式，设置后color属性会失效，数据类型为Object。Object只有0和1两个键，0表示远地处的颜色，1表示近地处的颜色
     */
    gradient?: { [x: number]: string };
    /**
     * 立体墙的高度
     */
    height?: number;
    /**
     * 执行每次动画的步长
     */
    step?: number;
    /**
     * 动画的拖尾时长
     */
    trailLength?: number;
    /**
     * 动画开始时间
     */
    startTime?: number;
    /**
     * 动画结束时间
     */
    endTime?: number;
  }

  class WallTripLayer extends Layer<WallTripLayerOptions> {
    constructor(options?: WallTripLayerOptions);
  }

  interface FlyLineLayerOptions extends LayerOptions {
    /**
     * 飞线动画方式
     */
    style?: 'normal' | 'chaos';
    /**
     * 底线颜色，同css颜色
     */
    color?: string;
    /**
     * 飞线动画颜色，同css颜色
     */
    textureColor?: string;
    /**
     * 飞线动画的宽度
     */
    textureWidth?: number;
    /**
     * 飞线动画的长度，占整条线的百分比，取值0-100
     */
    textureLength?: number;
    /**
     * 飞线动画的步长，步长越大动画速度越快
     */
    step?: number;
  }

  class FlyLineLayer extends Layer<FlyLineLayerOptions> {
    constructor(options?: FlyLineLayerOptions);
  }

  interface ShapeLayerOptions extends LayerOptions {
    /**
     * 颜色，同css颜色
     */
    color?: string;
    /**
     * 楼块透明度，0.0表示完全透明，1.0表示完全不透明，浮点数表示
     */
    opacity?: number;
    /**
     * 纹理贴图，注意，宽高必须为2的次幂
     */
    texture?: string | HTMLCanvasElement | HTMLImageElement;
    /**
     * 楼块初始化升起动画的时间，单位毫秒
     */
    riseTime?: number;
    /**
     * 一些特效
     */
    style?: 'normal' | 'window' | 'windowAnimation' | 'gradual';
  }

  class ShapeLayer extends Layer<ShapeLayerOptions> {
    constructor(options?: ShapeLayerOptions);
  }

  interface ShapeLineLayerOptions extends LayerOptions {
    /**
     * 颜色，同css颜色
     */
    color?: string;
  }

  class ShapeLineLayer extends Layer<ShapeLineLayerOptions> {
    constructor(options?: ShapeLineLayerOptions);
  }

  interface PolygonLayerOptions extends LayerOptions {
    /**
     * 描边线颜色，同css颜色
     */
    lineColor?: string;
    /**
     * 描边线宽度
     */
    lineWidth?: number;
    /**
     * 线的连接拐角，可选miter 尖角、bevel 平角、round 圆角
     */
    lineJoin?: 'miter' | 'bevel' | 'round';
    /**
     * 定义虚线间隔的数组，数组长度为2。数组的两位分别表示实线和虚线的长度，单位像素，如[10, 20]表示实线10px，虚线20px
     */
    dashArray?: number[];
    /**
     * 填充面颜色，同css颜色
     */
    fillColor?: string;
    /**
     * 填充面透明度，0.0表示完全透明，1.0表示完全不透明，浮点数表示
     */
    fillOpacity?: number;
  }

  class PolygonLayer extends Layer<PolygonLayerOptions> {
    constructor(options?: PolygonLayerOptions);
  }

  interface MaskLayerOptions extends LayerOptions {
    /**
     * 遮罩颜色，同css颜色
     */
    color?: string;
    /**
     * 遮罩高度，浮点数表示
     */
    height?: number;
  }

  class MaskLayer extends Layer<MaskLayerOptions> {
    constructor(options?: MaskLayerOptions);
  }

  interface ClusterLayerOptions extends LayerOptions {
    /**
     * 聚合点展示的最小直径
     */
    minSize?: number;
    /**
     * 聚合点展示的最大直径
     */
    maxSize?: number;
    /**
     * 聚合半径，像素值
     */
    clusterRadius?: number;
    /**
     * 是否显示文字
     */
    showText?: boolean;
    /**
     * 聚合的最大地图级别，当地图级别高于此值时不再聚合
     */
    maxZoom?: number;
    /**
     * 聚合的最小地图级别，当地图级别低于此值时不再聚合
     */
    minZoom?: number;
    /**
     * 聚合点的颜色梯度，属性名0~1之间，属性值同css颜色值，通过Intensity拾取
     */
    gradient?: { [x: number]: string };
    /**
     * 设置文字属性，支持文字图层所有参数。
     */
    textOptions?: TextLayerOptions & { format?: (count?: number) => string };
    /**
     * 设置非聚合点显示的icon属性，而非显示一个点，支持Icon图层所有参数
     */
    iconOptions?: IconLayerOptions;
    /**
     * 是否开启鼠标拾取，若想使用click等事件，需设置为true
     */
    enablePicked?: boolean;
  }

  class ClusterLayer extends Layer<ClusterLayerOptions> {
    constructor(options?: ClusterLayerOptions);
  }

  interface IconClusterLayerOptions extends LayerOptions {
    /**
     * 聚合半径，像素值
     */
    clusterRadius?: number;
    /**
     * 是否显示文字
     */
    showText?: boolean;
    /**
     * 聚合的最小地图级别，当地图级别低于此值时不再聚合
     */
    minZoom?: number;
    /**
     * 聚合的最大地图级别，当地图级别高于此值时不再聚合
     */
    maxZoom?: number;
    /**
     * 设置文字属性，支持文字图层所有参数
     */
    textOptions?: TextLayerOptions & { format?: (count?: number) => string };
    /**
     * 设置非聚合点显示的icon属性，而非显示一个点，支持Icon图层所有参数
     */
    iconOptions?: IconLayerOptions;
    /**
     * 是否开启鼠标拾取，若想使用click等事件，需设置为true
     */
    enablePicked?: boolean;
  }

  class IconClusterLayer extends Layer<IconClusterLayerOptions> {
    constructor(options?: IconClusterLayerOptions);
  }

  interface HoneycombLayerOptions extends LayerOptions {
    /**
     * 单个蜂窝图的横向宽度
     */
    size?: number;
    /**
     * 蜂窝图最大值的高度，设置为0时显示为平面
     */
    height?: number;
    /**
     * 是否开启点聚合，开启后会根据地图级别提前对距离较近的点进行聚合，牺牲精确度提高展示时的性能，建议数据量较大时打开
     */
    enableCluster?: boolean;
    /**
     * 是否显示文字
     */
    showText?: boolean;
    /**
     * 最大地图级别，当地图级别高于此值时不再更新图层数据
     */
    maxZoom?: number;
    /**
     * 最小地图级别，当地图级别低于此值时不再更新图层数据
     */
    minZoom?: number;
    /**
     * 蜂窝图的颜色梯度，属性名0~1之间，属性值同css颜色值，通过Intensity拾取
     */
    gradient?: { [x: number]: string };
    /**
     * 设置文字属性，支持文字图层所有参数
     */
    textOptions?: TextLayerOptions & { format?: (count?: number) => string };
  }

  class HoneycombLayer extends Layer<HoneycombLayerOptions> {
    constructor(options?: HoneycombLayerOptions);
  }

  interface MarkerListLayerOptions extends LayerOptions {
    /**
     * 内部点颜色，同css颜色
     */
    fillColor?: string;
    /**
     * 内部点大小，单位像素
     */
    fillSize?: number;
    /**
     * 内部点边框颜色，同css颜色
     */
    fillBorderColor?: string;
    /**
     * 内部点边框宽度
     */
    fillBorderWidth?: number;
    /**
     * 外部光晕颜色，同css颜色
     */
    shadowColor?: string;
    /**
     * 外部光晕大小，单位像素
     */
    shadowSize?: number;
    /**
     * 外部光晕边框颜色，同css颜色
     */
    shadowBorderColor?: string;
    /**
     * 外部光晕边框宽度
     */
    shadowBorderWidth?: number;
    /**
     * 文字颜色，同css颜色
     */
    fontColor?: string;
    /**
     * 文字大小，单位像素
     */
    fontSize?: number;
    /**
     * 文字字体
     */
    fontFamily?: string;
  }

  class MarkerListLayer extends Layer<MarkerListLayerOptions> {
    constructor(options?: MarkerListLayerOptions);
  }

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

  class Effect {
    constructor();
  }

  /**
   * 眩光后处理特效
   */
  class BloomEffect extends Effect {
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
  class BrightEffect extends Effect {
    constructor(options?: BrightEffectOptions);
  }

  interface GeoJSON {
    geometry: {
      type: 'Point' | 'LineString' | 'Polygon';
      coordinates: number[] | number[][] | number[][][];
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

  interface IntensityOptions {
    /**
     * 渐变色设置
     */
    gradient?: { [x: number]: string };
    /**
     * 权重最大阈值
     */
    max?: number;
    /**
     * 权重最小阈值
     */
    min?: number;
    /**
     * 生成最大半径
     */
    maxSize?: number;
    /**
     * 生成最小半径
     */
    minSize?: number;
  }

  class Intensity {
    constructor(options?: IntensityOptions);
    /**
     * 根据传入的权重值获取对应的半径大小
     * @param w
     */
    getSize(w: number): number;
    /**
     * 根据传入的权重值获取对应的颜色
     * @param w
     */
    getColor(w: number): string;
    /**
     * 修改最大权重值
     * @param w
     */
    setMax(w: number): void;
    /**
     * 修改生成最大半径值
     * @param r
     */
    setMaxSize(r: number): void;
    /**
     * 修改最小权重值
     * @param w
     */
    setMin(w: number): void;
    /**
     * 修改生成最小半径值
     * @param r
     */
    setMinSize(r: number): void;
  }

  interface BezierCurveOptions {
    /**
     * 起点坐标
     */
    start?: number[];
    /**
     * 终点坐标
     */
    end?: number[];
  }

  class BezierCurve {
    constructor(options?: BezierCurveOptions);
    /**
     * 获取生成的曲线坐标集，传入的字段为曲线的分段数，默认值是20
     * @param x
     */
    getPoints(x?: number): number[][];
    /**
     * 修改起点、终点坐标等属性
     * @param options
     */
    setOptions(options?: BezierCurveOptions): void;
  }

  interface GeodesicCurveOptions {
    /**
     * 传入经过点的坐标数组
     */
    points?: number[][];
  }

  class GeodesicCurve {
    constructor(options?: GeodesicCurveOptions);
    /**
     * 获取生成的大地曲线坐标集，分段数按实际距离自动设定，无需传入参数
     */
    getPoints(): number[][];
    /**
     * 修改坐标数组等属性
     * @param options
     */
    setOptions(options?: GeodesicCurveOptions): void;
  }

  interface OdCurveOptions {
    /**
     * 传入经过点的坐标数组
     */
    points?: number[][];
  }

  class OdCurve {
    constructor(options?: OdCurveOptions);
    /**
     * 获取生成的Od曲线坐标集，传入的字段为曲线的分段数，默认值是20
     */
    getPoints(x?: number): number[][];
    /**
     * 修改坐标数组等属性
     * @param options
     */
    setOptions(options?: OdCurveOptions): void;
  }
}
