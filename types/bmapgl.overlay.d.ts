declare namespace BMapGL {
  class Overlay {
    constructor();
    // static getZIndex(lat: number, coordTyppe?: string): number;
    /**
     * 抽象方法，用于初始化覆盖物，当调用map.addOverlay时，API将调用此方法。自定义覆盖物时需要实现此方法。自定义覆盖物时需要将覆盖物对应的HTML元素返回
     */
    initialize(map: Map): HTMLElement;
    /**
     * 判断覆盖物是否可见
     */
    isVisible(): boolean;
    /**
     * 抽象方法，当地图状态发生变化时，由系统调用对覆盖物进行绘制。自定义覆盖物需要实现此方法
     */
    draw(): void;
    /**
     * 显示覆盖物。对于自定义覆盖物，此方法会自动将initialize方法返回的HTML元素样式的display属性设置为空
     */
    show(): void;
    /**
     * 隐藏覆盖物。对于自定义覆盖物，此方法会自动将initialize方法返回的HTML元素样式的display属性设置为none
     */
    hide?(): void;
    setZIndex(index: number): void;
    addEventListener(event: string, handler: Callback): void;
    removeEventListener(event: string, handler: Callback): void;
    setOptions(obj: object): void;
    getZIndex(lat: number, coordTyppe?: string): number;
  }

  /**
   * 此类表示地图上所有覆盖物的容器集合，没有构造函数，通过对象字面量形式表示。通过Map的getPanes方法可获得该对象实例
   */
  interface MapPanes {
    /**
     * 信息窗口所在的容器
     */
    floatPane?: HTMLElement;
    /**
     * 标注点击区域所在的容器
     */
    markerMouseTarget?: HTMLElement;
    /**
     * 信息窗口阴影所在的容器
     */
    floatShadow?: HTMLElement;
    /**
     * 文本标注所在的容器
     */
    labelPane?: HTMLElement;
    /**
     * 标注图标所在的容器
     */
    markerPane?: HTMLElement;
    markerShadow?: HTMLElement;
    /**
     * @deprecated 已弃用
     */
    mapPane?: HTMLElement;
  }

  interface MarkerOptions {
    /**
     * 标注的位置偏移值
     */
    offset?: Size;
    /**
     * 标注所用的图标对象
     */
    icon?: Icon;
    /**
     * 是否在调用map.clearOverlays清除此覆盖物，默认为true
     */
    enableMassClear?: boolean;
    /**
     * 是否启用拖拽，默认为false
     */
    enableDragging?: boolean;
    /**
     * 是否响应点击事件。默认为true
     */
    enableClicking?: boolean;
    /**
     * 拖拽标注时，标注是否开启离开地图表面效果。默认为false
     */
    raiseOnDrag?: boolean;
    /**
     * 拖拽标注时的鼠标指针样式。此属性值需遵循CSS的cursor属性规范
     */
    draggingCursor?: string;
    /**
     * 旋转角度
     */
    rotation?: number;
    shadow?: Icon;
    /**
     * 鼠标移到marker上的显示内容
     */
    title?: string;
  }

  /**
   * 此类表示地图上的一个图像标注
   */
  class Marker extends Overlay {
    /**
     * 创建一个图像标注实例。point参数指定了图像标注所在的地理位置
     * @param point
     * @param opts
     */
    constructor(point: Point, opts?: MarkerOptions);
    /**
     * 设置标注所用的图标对象
     */
    setIcon(icon: Icon): void;
    /**
     * 返回标注所用的图标对象
     */
    getIcon(): Icon;
    /**
     * 设置标注的地理坐标
     */
    setPosition(position: Point): void;
    /**
     * 返回标注的地理坐标
     */
    getPosition(): Point;
    /**
     * 设置标注的偏移值
     */
    setOffset(offset: Size): void;
    /**
     * 返回标注的偏移值
     */
    getOffset(): Size;
    /**
     * 设置标注的标题，当鼠标移至标注上时显示此标题
     */
    setTitle(title: string): void;
    /**
     * 返回标注的标题
     */
    getTitle(): string;
    /**
     * 为标注添加文本标注
     */
    setLabel(label: Label): void;
    /**
     * 返回标注的文本内容
     */
    getLabel(): Label;
    /**
     * 开启标注拖拽功能
     */
    enableDragging(): void;
    /**
     * 关闭标注拖拽功能
     */
    disableDragging(): void;
    /**
     * 允许覆盖物在map.clearOverlays方法中被清除
     */
    enableMassClear(): void;
    /**
     * 禁止覆盖物在map.clearOverlays方法中被清除
     */
    disableMassClear(): void;
    /**
     * 设置覆盖物的zIndex
     */
    setZIndex(zIndex: number): void;
    /**
     * 返回覆盖物所在的map对象
     */
    getMap(): Map;
    /**
     * 设置点的旋转角度
     */
    setRotation(rotation: number): void;
    /**
     * 获取点的旋转角度
     */
    getRotation(): number;
    openInfoWindow(infoWnd: InfoWindow): void;
    closeInfoWindow(): void;
    setTop(isTop: boolean): void;
    addContextMenu(menu: ContextMenu): void;
    removeContextMenu(menu: ContextMenu): void;
    setAnimation(animation?: Animation): void;
    setShadow(shadow: Icon): void;
    getShadow(): void;
    addEventListener(event: string, handler: (e: any) => void): void;
    removeEventListener(event: string, handler: (e: any) => void): void;
  }

  /**
   * 此类表示canvas画布创建的图标
   */
  class Symbol extends Overlay {
    /**
     * 创建一个canvas图标实例
     * @param size 图像的大小，默认为size的中心点
     * @param anchor 锚点位置
     */
    constructor(size: Size, anchor: Size);
    /**
     * 是否启动循环渲染，需要保证size纹理大小不发生变化。需要在初始化时就需要设置true，后续可以设置false、true。如果初始化的时候不想动画，可以在add方法中设置false
     */
    isReDraw: boolean;
    /**
     * 图标数据，通过更新这个值，来改变展示的图标
     */
    data: ImageData;
    /**
     * 可读。在添加到地图后可以调用
     */
    overlay: Overlay;
    /**
     * 添加覆盖物时，触发此方法
     */
    add(): void;
    /**
     * 渲染覆盖物时，触发此方法
     * @param map
     */
    render(map: Map): void;
    /**
     * 删除覆盖物时，触发此方法
     */
    remove(): void;
    /**
     * 触发一次渲染，isReDraw是true时不需要使用此方法
     */
    update(): void;
  }

  interface SVGSymbolOptions {
    /**
     * 符号的位置偏移值
     */
    anchor?: Size;
    /**
     * 设置矢量图标的填充颜色。支持颜色常量字符串、十六进制、RGB、RGBA等格式
     */
    fillColor?: string;
    /**
     * 设置矢量图标填充透明度,范围0~1
     */
    fillOpacity?: number;
    /**
     * 设置矢量图标的缩放比例
     */
    scale?: number;
    /**
     * 设置矢量图标的旋转角度,参数为角度
     */
    rotation?: number;
    /**
     * 设置矢量图标的线填充颜色,支持颜色常量字符串、十六进制、RGB、RGBA等格式
     */
    strokeColor?: string;
    /**
     * 设置矢量图标线的透明度,opacity范围0~1
     */
    strokeOpacity?: number;
    /**
     * 设置线宽。如果此属性没有指定，则线宽跟scale数值相同
     */
    strokeWeight?: number;
  }

  /**
   * 此类表示通过svg的path string创建的矢量图标类，继承Symbol类
   */
  class SVGSymbol extends Symbol {
    /**
     * 创建一个矢量图标实例。path为svg中的path字符串或者已定义的符号常量,opts为矢量图标的样式
     */
    constructor(path: string | SymbolShapeType, opts: SVGSymbolOptions);
    /**
     * 设置矢量图标的路径
     * @param path
     */
    setPath(path: string | SymbolShapeType): void;
    /**
     * 设置矢量图标的定位点,该定位点的位置以图标自身为基准
     * @param anchor
     */
    setAnchor(anchor: Size): void;
    /**
     * 设置矢量图标的旋转角度,参数为角度
     * @param rotation
     */
    setRotation(rotation: number): void;
    /**
     * 设置矢量图标的缩放比例
     * @param scale
     */
    setScale(scale: number): void;
    /**
     * 设置矢量图标的线宽
     * @param strokeWeight
     */
    setStrokeWeight(strokeWeight: number): void;
    /**
     * 设置矢量图标的线填充颜色,支持颜色常量字符串、十六进制、RGB、RGBA等格式
     * @param color
     */
    setStrokeColor(color: string): void;
    /**
     * 设置矢量图标线的透明度,opacity范围0~1
     * @param opacity
     */
    setStrokeOpacity(opacity: number): void;
    /**
     * 设置矢量图标填充透明度,opacity范围0~1
     * @param opacity
     */
    setFillOpacity(opacity: number): void;
    /**
     * 设置矢量图标的填充颜色。支持颜色常量字符串、十六进制、RGB、RGBA等格式
     * @param color
     */
    setFillColor(color: string): void;
  }

  /**
   * 此枚举类型表示矢量图标类预设的图标样式
   */
  enum SymbolShapeType {
    /**
     * 圆形，默认半径为1px
     */
    BMap_Symbol_SHAPE_CIRCLE,
    /**
     * 矩形，默认宽度4px、高度2px
     */
    BMap_Symbol_SHAPE_RECTANGLE,
    /**
     * 菱形，默认外接圆半径10px
     */
    BMap_Symbol_SHAPE_RHOMBUS,
    /**
     * 五角星，五角星外接圆半径为10px
     */
    BMap_Symbol_SHAPE_STAR,
    /**
     * 箭头方向向下的闭合箭头
     */
    BMap_Symbol_SHAPE_BACKWARD_CLOSED_ARROW,
    /**
     * 箭头方向向上的闭合箭头
     */
    BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW,
    /**
     * 箭头方向向下的非闭合箭头
     */
    BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW,
    /**
     * 箭头方向向上的非闭合箭头
     */
    BMap_Symbol_SHAPE_FORWARD_OPEN_ARROW,
    /**
     * 定位点图标
     */
    BMap_Symbol_SHAPE_POINT,
    /**
     * 预设的飞机形状
     */
    BMap_Symbol_SHAPE_PLANE,
    /**
     * 预设的照相机形状
     */
    BMap_Symbol_SHAPE_CAMERA,
    /**
     * 预设的警告符号
     */
    BMap_Symbol_SHAPE_WARNING,
    /**
     * 预设的笑脸形状
     */
    BMap_Symbol_SHAPE_SMILE,
    /**
     * 预设的钟表形状
     */
    BMap_Symbol_SHAPE_CLOCK,
  }

  interface GroundOverlayOptions {
    enableParse?: boolean;
    sysType?: string;
    /**
     * 图层透明度
     */
    opacity?: number;
    /**
     * 图层数据类型
     */
    type?: 'canvas' | 'image' | 'video';
    /**
     * 图层地址
     */
    url?: string | HTMLCanvasElement;
    /**
     * 是否开启，默认false
     */
    isReDraw?: boolean;
    top?: boolean;
    /**
     * 覆盖物显示等级
     */
    zIndex?: number;
    /**
     * 图层显示的最小级别
     */
    displayOnMinLevel?: number;
    /**
     * 图层显示的最大级别
     */
    displayOnMaxLevel?: number;
    /**
     * 回调方法，作用为生成canvas数据，默认null，如果要启用回调，在初始化时就需要设置此值
     * @returns
     */
    drawHook?: () => void;
  }

  class GroundOverlay extends Overlay {
    /**
     * 创建地面叠加层
     */
    constructor(bounds: Bounds, opts?: GroundOverlayOptions);
    /**
     * 设置图层显示的矩形区域
     */
    setBounds(bounds: Bounds): void;
    /**
     * 返回图层显示的矩形区域
     */
    getBounds(): Bounds;
    /**
     * 设置图层的透明度
     */
    setOpacity(opacity: number): void;
    /**
     * 返回图层的透明度
     */
    getOpacity(): number;
    /**
     * 设置图层地址
     */
    setImageURL(url: string): void;
    /**
     * 返回图层地址
     */
    getImageURL(): string;
    /**
     * 设置图层显示的最小级别
     */
    setDisplayOnMinLevel(level: number): void;
    /**
     * 返回图层显示的最小级别
     */
    getDisplayOnMinLevel(): number;
    /**
     * 设置图层显示的最大级别
     */
    setDispalyOnMaxLevel(level: number): void;
    /**
     * 返回图层显示的最大级别
     */
    getDispalyOnMaxLevel(): number;
    // onclick: (event: { type: string; target: any }) => void;
    // ondblclick: (event: { type: string; target: any }) => void;
  }

  interface IconOptions {
    /**
     * 图标的定位锚点。此点用来决定图标与地理位置的关系，是相对于图标左上角的偏移值，默认等于图标宽度和高度的中间值
     */
    anchor?: Size;
    /**
     * 偏移
     */
    offset?: Size;
    /**
     * 图片相对于可视区域的偏移值
     */
    imageOffset?: Size;
  }

  class Icon extends Overlay {
    /**
     * 以给定的图像地址和大小创建图标对象实例
     */
    constructor(url: string, size: Size, opts?: IconOptions);
    /**
     * 图标的定位点相对于图标左上角的偏移值
     */
    anchor: Size;
    /**
     * 图标可视区域的大小
     */
    size: Size;
    /**
     * 图标所用的图片相对于可视区域的偏移值，此功能的作用等同于CSS中的background-position属性
     */
    imageOffset: Size;
    /**
     * 图标所用的图片的大小，此功能的作用等同于CSS中的background-size属性。可用于实现高清屏的高清效果
     */
    imageSize: Size;
    /**
     * 图标所用图像资源的位置
     */
    imageUrl: string;
    // infoWindowAnchor: Size;
    /**
     * 设置icon打印图片的url，该打印图片只针对IE6有效，解决IE6使用PNG滤镜导致的错位问题。如果您的icon没有使用PNG格式图片或者没有使用CSS Sprites技术，则可忽略此配置
     */
    printImageUrl: string;
    /**
     * 设置图片资源的地址
     */
    setImageUrl(imageUrl: string): void;
    /**
     * 设置图标可视区域的大小
     */
    setSize(size: Size): void;
    /**
     * 设置图标的大小
     */
    setImageSize(offset: Size): void;
    /**
     * 设置图标定位点相对于其左上角的偏移值
     */
    setAnchor(anchor: Size): void;
    /**
     * 设置图片相对于可视区域的偏移值
     */
    setImageOffset(offset: Size): void;
    setInfoWindowAnchor(anchor: Size): void;
    setPrintImageUrl(url: string): void;
  }

  /**
   * 此类表示InfoWindow构造函数的可选参数，它没有构造函数，但可通过对象字面量形式表示
   */
  interface InfoWindowOptions {
    /**
     * 信息窗宽度，单位像素。取值范围：0, 220 - 730。如果您指定宽度为0，则信息窗口的宽度将按照其内容自动调整
     */
    width?: number;
    /**
     * 信息窗高度，单位像素。取值范围：0, 60 - 650。如果您指定高度为0，则信息窗口的高度将按照其内容自动调整
     */
    height?: number;
    /**
     * 信息窗最大化时的宽度，单位像素。取值范围：220 - 730
     */
    maxWidth?: number;
    /**
     * 信息窗位置偏移值。默认情况下在地图上打开的信息窗底端的尖角将指向其地理坐标，在标注上打开的信息窗底端尖角的位置取决于标注所用图标的infoWindowOffset属性值，您可以为信息窗添加偏移量来改变默认位置
     */
    offset?: Size;
    /**
     * 信息窗标题文字，支持HTML内容
     */
    title?: string;
    /**
     * 是否开启信息窗口打开时地图自动移动（默认开启）
     */
    enableAutoPan?: boolean;
    /**
     * 是否开启点击地图关闭信息窗口（默认开启）
     */
    enableCloseOnClick?: boolean;
    enableMessage?: boolean;
    message?: string;
  }

  /**
   * 此类表示地图上包含信息的窗口
   */
  class InfoWindow extends Overlay {
    /**
     * 创建一个信息窗实例，其中content支持HTML内容
     * @param content
     * @param opts
     */
    constructor(content: string | HTMLElement, opts?: InfoWindowOptions);
    /**
     * 设置信息窗口的宽度，单位像素。取值范围：220 - 730
     * @param width
     */
    setWidth(width: number): void;
    /**
     * 设置信息窗口的高度，单位像素。取值范围：60 - 650
     * @param height
     */
    setHeight(height: number): void;
    /**
     * 重绘信息窗口，当信息窗口内容发生变化时进行调用
     */
    redraw(): void;
    /**
     * 设置信息窗口标题。支持HTML内容。1.2版本开始title参数支持传入DOM结点
     * @param title
     */
    setTitle(title: string | HTMLElement): void;
    /**
     * 返回信息窗口标题
     */
    getTitle(): string | HTMLElement;
    /**
     * 设置信息窗口内容。支持HTML内容。1.2版本开始content参数支持传入DOM结点
     * @param content
     */
    setContent(content: string | HTMLElement): void;
    /**
     * 返回信息窗口内容
     */
    getContent(): string | HTMLElement;
    /**
     * 返回信息窗口的位置
     */
    getPosition(): Point;
    /**
     * 启用窗口最大化功能。需要设置最大化后信息窗口里的内容，该接口才生效
     */
    enableMaximize(): void;
    /**
     * 禁用窗口最大化功能
     */
    disableMaximize(): void;
    /**
     * 返回信息窗口的打开状态
     */
    isOpen(): boolean;
    /**
     * 信息窗口最大化时所显示内容，支持HTML内容
     * @param content
     */
    setMaxContent(content: string): void;
    /**
     * 最大化信息窗口
     */
    maximize(): void;
    /**
     * 还原信息窗口
     */
    restore(): void;
    /**
     * 开启打开信息窗口时地图自动平移
     */
    enableAutoPan(): void;
    /**
     * 关闭打开信息窗口时地图自动平移
     */
    disableAutoPan(): void;
    /**
     * 开启点击地图时关闭信息窗口
     */
    enableCloseOnClick(): void;
    /**
     * 关闭点击地图时关闭信息窗口
     */
    disableCloseOnClick(): void;
    /**
     * 添加事件监听函数
     * @param event
     * @param handler
     */
    addEventListener(event: string, handler: Callback): void;
    /**
     * 移除事件监听函数
     * @param event
     * @param handler
     */
    removeEventListener(event: string, handler: Callback): void;
    onclose: (event: { type: string; target: any; point: Point }) => void;
    onopen: (event: { type: string; target: any; point: Point }) => void;
    onmaximize: (event: { type: string; target: any }) => void;
    onrestore: (event: { type: string; target: any }) => void;
    onclickclose: (event: { type: string; target: any }) => void;
  }

  interface CustomOverlayOptions {
    /**
     * 坐标点
     */
    point: Point;
    /**
     * 锚点,左上角为[0,0],取值范围[0,1]，默认[0.5,1]
     */
    anchors: [number, number];
    /**
     * x轴偏移量，单位像素
     */
    offsetX: number;
    /**
     * y轴偏移量，单位像素
     */
    offsetY: number;
    /**
     * 旋转角
     */
    rotation: number;
    /**
     * 初始化旋转角
     */
    rotationInit: number;
    /**
     * 显示最小等级
     */
    minZoom: number;
    /**
     * 显示最大等级
     */
    maxZoom: number;
    /**
     * 自定义属性
     */
    properties: any;
    /**
     * 是否固定在div底部, 默认false,有25px历史硬编码，因为已经存在使用用户，故使用参数进行修复
     */
    fixBottom: boolean;
    /**
     * 是否使用translate3d进行优化
     */
    useTranslate: boolean;
    /**
     * 是否跟随地图旋转
     */
    autoFollowHeadingChanged: boolean;
    /**
     * 是否显示
     */
    visible: boolean;
    /**
     * 层级
     */
    zIndex: number;
  }

  class CustomOverlay extends Overlay {
    constructor(domCreate: () => HTMLElement, options?: CustomOverlayOptions);
    /**
     * 设置点
     * @param point
     * @param noReCreate
     */
    setPoint(point: Point, noReCreate?: boolean): void;
    /**
     * 获取旋转角
     * @param rotation
     */
    setRotation(rotation: number): void;
    /**
     * 设置DOM初始旋转角
     * @param origin
     */
    setRotationOrigin(origin: string): void;
    /**
     * 获取旋转角
     */
    getRotation(): number;
    /**
     * 获取点
     */
    getPoint(): Point;
    /**
     * 设置属性
     * @param properties
     */
    setProperties(properties: any): void;
    /**
     * 获取属性
     */
    getProperties(): any;
  }

  /**
   * 贴地点覆盖物构造函数配置参数，继承GroundOverlayOptions
   */
  interface GroundPointOptions extends GroundOverlayOptions {
    /**
     * 图标地址
     */
    url?: string;
    /**
     * 坐标点尺寸，单位像素
     */
    size?: Size;
    /**
     * 锚点,默认中心点[0,0]
     */
    anchor?: Size;
    /**
     * 缩放比例，默认1
     */
    scale?: number;
    /**
     * 旋转角，默认0
     */
    rotation?: number;
    /**
     * 偏移量，默认[0,0]
     */
    offset?: Size;
    /**
     * 尺寸相对层级，默认18
     */
    level?: number;
  }

  class GroundPoint extends GroundOverlay {
    /**
     * 贴地点覆盖物，继承BMapGL.GroundOverlay
     * @param point
     * @param opts
     */
    constructor(point: Point, opts?: GroundPointOptions);
    /**
     * 设置位置点
     * @param point
     * @param update
     */
    setPoint(point: Point, update?: boolean): void;
    /**
     * 设置缩放比例
     * @param scale
     * @param update
     */
    setScale(scale: number, update?: boolean): void;
    /**
     * 设置尺寸，单位像素坐标
     * @param size
     * @param update
     */
    setSize(size: Size, update?: boolean): void;
    /**
     * 设置旋转角
     * @param angle
     * @param update
     */
    setRotation(angle: number, update?: boolean): void;
    /**
     * 设置锚点位置
     * @param anchor
     * @param update
     */
    setAnchor(anchor: BMapGL.Size, update?: boolean): void;
    /**
     * 设置偏移量
     * @param offset
     * @param update
     */
    setOffset(offset: BMapGL.Size, update?: boolean): void;
  }

  /**
   * 此类表示Lable构造函数的可选参数。它没有构造函数，但可通过对象字面量形式表示
   */
  interface LabelOptions {
    /**
     * 文本标注的位置偏移值
     */
    offset?: Size;
    /**
     * 文本标注的地理位置
     */
    position?: Point;
    /**
     * 是否在调用map.clearOverlays清除此覆盖物，默认为true
     */
    enableMassClear?: boolean;
  }

  /**
   * 此类表示地图上的文本标注
   */
  class Label extends Overlay {
    /**
     * 创建一个文本标注实例。point参数指定了文本标注所在的地理位置
     * @param content
     * @param opts
     */
    constructor(content: string, opts?: LabelOptions);
    /**
     * 设置文本标注样式，该样式将作用于文本标注的容器元素上。其中styles为JavaScript对象常量，比如： setStyle({ color : "red", fontSize : "12px" }) 注意：如果css的属性名中包含连字符，需要将连字符去掉并将其后的字母进行大写处理，例如：背景色属性要写成：backgroundColor
     * @param styles
     */
    setStyle(styles: { [name: string]: string | number }): void;
    /**
     * 设置文本标注的内容。支持HTML
     * @param content
     */
    setContent(content: string): void;
    /**
     * 设置文本标注坐标。仅当通过Map.addOverlay()方法添加的文本标注有效
     * @param position
     */
    setPosition(position: Point): void;
    /**
     * 获取Label的地理坐标
     */
    getPosition(): Point;
    /**
     * 设置文本标注的偏移值
     * @param offset
     */
    setOffset(offset: Size): void;
    /**
     * 返回文本标注的偏移值
     */
    getOffset(): Size;
    /**
     * 设置文本标注的标题，当鼠标移至标注上时显示此标题
     * @param title
     */
    setTitle(title: string): void;
    /**
     * 返回文本标注的标题
     */
    getTitle(): string;
    /**
     * 允许覆盖物在map.clearOverlays方法中被清除
     */
    enableMassClear(): void;
    /**
     * 禁止覆盖物在map.clearOverlays方法中被清除
     */
    disableMassClear(): void;
    /**
     * 设置覆盖物的zIndex
     * @param zIndex
     */
    setZIndex(zIndex: number): void;
    /**
     * 返回覆盖物所在的map对象
     */
    getMap(): Map;
    /**
     * 添加事件监听函数
     * @param event
     * @param handler
     */
    addEventListener(event: string, handler: Callback): void;
    /**
     * 移除事件监听函数
     * @param event
     * @param handler
     */
    removeEventListener(event: string, handler: Callback): void;
    onclick: (event: { type: string; target: any }) => void;
    ondblclick: (event: { type: string; target: any }) => void;
    onmousedown: (event: { type: string; target: any }) => void;
    onmouseup: (event: { type: string; target: any }) => void;
    onmouseout: (event: { type: string; target: any }) => void;
    onmouseover: (event: { type: string; target: any }) => void;
    onremove: (event: { type: string; target: any }) => void;
    onrightclick: (event: { type: string; target: any }) => void;
  }

  /**
   * 此类表示Polyline构造函数的可选参数。它没有构造函数，但可通过对象字面量形式表示
   */
  interface PolylineOptions {
    /**
     * 折线颜色
     */
    strokeColor?: string;
    /**
     * 折线的宽度，以像素为单位
     */
    strokeWeight?: number;
    /**
     * 折线的透明度，取值范围0 - 1
     */
    strokeOpacity?: number;
    /**
     * 折线的样式，solid或dashed
     */
    strokeStyle?: string;
    /**
     * 描边线端头类型，可选'round', 'butt', 'square'，默认round
     */
    strokeLineCap?: string | StyleExpress;
    /**
     * 是否在调用map.clearOverlays清除此覆盖物，默认为true
     */
    enableMassClear?: boolean;
    /**
     * 是否启用线编辑，默认为false
     */
    enableEditing?: boolean;
    /**
     * 是否响应点击事件，默认为true
     */
    enableClicking?: boolean;
    /**
     * 是否开启大地线模式，true时，两点连线将以大地线的形式。默认为false
     */
    geodesic?: boolean;
    /**
     * 跨180度走右侧,默认是false
     */
    linkRight?: boolean;
    /**
     * 是否进行跨经度180度裁剪，绘制跨精度180时为了优化效果，可以设置成false，默认为true
     */
    clip?: boolean;
  }

  /**
   * 使用浏览器的矢量制图工具（如果可用）在地图上绘制折线的地图叠加层
   */
  class Polyline extends Overlay {
    /**
     * 创建折线覆盖物对象
     * @param points
     * @param opts
     */
    constructor(points: Point[], opts?: PolylineOptions);
    /**
     * 返回折线的点数组
     * @param path
     */
    setPath(path: Point[]): void;
    getPath(): Point[];
    /**
     * 设置折线的颜色
     * @param color
     */
    setStrokeColor(color: string): void;
    /**
     * 返回折线的颜色
     */
    getStrokeColor(): string;
    /**
     * 设置透明度，取值范围0 - 1
     * @param opacity
     */
    setStrokeOpacity(opacity: number): void;
    /**
     * 返回透明度
     */
    getStrokeOpacity(): number;
    /**
     * 设置线的宽度，范围为大于等于1的整数
     * @param weight
     */
    setStrokeWeight(weight: number): void;
    /**
     * 返回线的宽度
     */
    getStrokeWeight(): number;
    /**
     * 设置是为实线或虚线，solid或dashed
     * @param style
     */
    setStrokeStyle(style: string): void;
    /**
     * 返回当前线样式状态，实线或者虚线
     */
    getStrokeStyle(): string;
    /**
     * 返回覆盖物的地理区域范围
     */
    getBounds(): Bounds;
    setFillColor(color: string): void;
    getFillColor(): string;
    setFillOpacity(opacity: number): void;
    getFillOpacity(): number;
    /**
     * 开启编辑功能
     */
    enableEditing(): void;
    /**
     * 关闭编辑功能
     */
    disableEditing(): void;
    /**
     * 设置覆盖物的zIndex
     * @param zIndex
     */
    setZIndex(zIndex: number): void;
    /**
     * 允许覆盖物在map.clearOverlays方法中被清除
     */
    enableMassClear(): void;
    /**
     * 禁止覆盖物在map.clearOverlays方法中被清除
     */
    disableMassClear(): void;
    setPointAt(index: number, point: Point): void;
    /**
     * 修改指定位置的坐标。索引index从0开始计数。例如setPointAt(2, point)代表将折线的第3个点的坐标设为point
     * @param index
     * @param point
     */
    setPositionAt(index: number, point: Point): void;
    /**
     * 返回覆盖物所在的map对象
     */
    getMap(): Map;
    /**
     * 添加事件监听函数
     * @param event
     * @param handler
     */
    addEventListener(event: string, handler: Callback): void;
    /**
     * 移除事件监听函数
     * @param event
     * @param handler
     */
    removeEventListener(event: string, handler: Callback): void;
    onclick: (event: { type: string; target: any }) => void;
    ondblclick: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onmousedown: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onmouseup: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onmouseout: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onmouseover: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onremove: (event: { type: string; target: any }) => void;
    onlineupdate: (event: { type: string; target: any }) => void;
  }

  interface PolygonOptions {
    /**
     * 边线颜色
     */
    strokeColor?: string;
    /**
     * 填充颜色。当参数为空时，折线覆盖物将没有填充效果
     */
    fillColor?: string;
    /**
     * 边线的宽度，以像素为单位
     */
    strokeWeight?: number;
    /**
     * 边线透明度，取值范围0 - 1
     */
    strokeOpacity?: number;
    /**
     * 填充的透明度，取值范围0 - 1
     */
    fillOpacity?: number;
    /**
     * 边线的样式，solid或dashed
     */
    strokeStyle?: 'solid' | 'dashed';
    /**
     * 是否在调用map.clearOverlays清除此覆盖物，默认为true
     */
    enableMassClear?: boolean;
    /**
     * 是否启用线编辑，默认为false
     */
    enableEditing?: boolean;
    /**
     * 是否响应点击事件，默认为true
     */
    enableClicking?: boolean;
  }

  class Polygon extends Overlay {
    /**
     * 创建多边形覆盖物
     */
    constructor(points: Point[], opts?: PolygonOptions);
    /**
     * 设置多边型的点数组
     */
    setPath(path: Point[]): void;
    /**
     * 返回多边型的点数组
     */
    getPath(): Point[];
    /**
     * 设置多边型的边线颜色，参数为合法的CSS颜色值
     * @param color
     */
    setStrokeColor(color: string): void;
    /**
     * 返回多边型的边线颜色
     */
    getStrokeColor(): string;
    /**
     * 设置多边形的填充颜色，参数为合法的CSS颜色值。当参数为空字符串时，折线覆盖物将没有填充效果
     * @param color
     */
    setFillColor(color: string): void;
    /**
     * 返回多边形的填充颜色
     */
    getFillColor(): string;
    /**
     * 设置多边形的边线透明度，取值范围0 - 1
     * @param opacity
     */
    setStrokeOpacity(opacity: number): void;
    /**
     * 返回多边形的边线透明度
     */
    getStrokeOpacity(): number;
    /**
     * 设置多边形的填充透明度，取值范围0 - 1
     * @param opacity
     */
    setFillOpacity(opacity: number): void;
    /**
     * 返回多边形的填充透明度
     */
    getFillOpacity(): number;
    /**
     * 设置多边形边线的宽度，取值为大于等于1的整数
     * @param weight
     */
    setStrokeWeight(weight: number): void;
    /**
     * 返回多边形边线的宽度
     */
    getStrokeWeight(): number;
    /**
     * 设置多边形边线样式为实线或虚线，取值solid或dashed
     * @param style
     */
    setStrokeStyle(style: string): void;
    /**
     * 返回多边形边线样式
     */
    getStrokeStyle(): string;
    /**
     * 返回覆盖物的地理区域范围
     */
    getBounds(): Bounds;
    /**
     * 开启编辑功能
     */
    enableEditing(): void;
    /**
     * 关闭编辑功能
     */
    disableEditing(): void;
    /**
     * 允许覆盖物在map.clearOverlays方法中被清除
     */
    enableMassClear(): void;
    /**
     * 禁止覆盖物在map.clearOverlays方法中被清除
     */
    disableMassClear(): void;
    setPointAt(index: number, point: Point): void;
    /**
     * 修改指定位置的坐标。索引index从0开始计数。例如setPositionAt(2, point)代表将折线的第3个点的坐标设为point
     */
    setPositionAt(index: number, point: Point): void;
    /**
     * 返回覆盖物所在的map对象
     */
    getMap(): Map;
    /**
     * 添加事件监听函数
     * @param event
     * @param handler
     */
    addEventListener(event: string, handler: Callback): void;
    /**
     * 移除事件监听函数
     * @param event
     * @param handler
     */
    removeEventListener(event: string, handler: Callback): void;
    onclick: (event: { type: string; target: any }) => void;
    ondblclick: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onmousedown: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onmouseup: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onmouseout: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onmouseover: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onremove: (event: { type: string; target: any }) => void;
    onlineupdate: (event: { type: string; target: any }) => void;
  }

  interface CircleOptions {
    strokeColor?: string;
    fillColor?: string;
    strokeWeight?: number;
    strokeOpacity?: number;
    fillOpacity?: number;
    strokeStyle?: string;
    enableMassClear?: boolean;
    enableEditing?: boolean;
    enableClicking?: boolean;
  }

  /**
   * 此类表示地图上的圆覆盖物
   */
  class Circle extends Overlay {
    /**
     * 创建圆覆盖物
     * @param center
     * @param radius
     * @param opts
     */
    constructor(center: Point, radius: number, opts?: CircleOptions);
    /**
     * 设置圆形的中心点坐标
     * @param center
     */
    setCenter(center: Point): void;
    /**
     * 返回圆形的中心点坐标
     */
    getCenter(): Point;
    /**
     * 设置圆形的半径，单位为米
     * @param radius
     */
    setRadius(radius: number): void;
    getRadius(): number;
    getBounds(): Bounds;
    setStrokeColor(color: string): void;
    getStrokeColor(): string;
    setFillColor(color: string): void;
    getFillColor(): string;
    setStrokeOpacity(opacity: number): void;
    getStrokeOpacity(): number;
    setFillOpacity(opacity: number): void;
    getFillOpacity(): number;
    setStrokeWeight(weight: number): void;
    getStrokeWeight(): number;
    setStrokeStyle(style: string): void;
    getStrokeStyle(): string;
    enableEditing(): void;
    disableEditing(): void;
    enableMassClear(): void;
    disableMassClear(): void;
    getMap(): Map;
    addEventListener(event: string, handler: Callback): void;
    removeEventListener(event: string, handler: Callback): void;
    onclick: (event: { type: string; target: any }) => void;
    ondblclick: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onmousedown: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onmouseup: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onmouseout: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onmouseover: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    onremove: (event: { type: string; target: any }) => void;
    onlineupdate: (event: { type: string; target: any }) => void;
  }
}
