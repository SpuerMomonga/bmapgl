declare namespace BMapGL {
  class Map {
    /**
     * 在指定的容器内创建地图实例，之后需要调用Map.centerAndZoom()方法对地图进行初始化。未进行初始化的地图将不能进行任何操作
     */
    constructor(container: string | HTMLElement, opts?: MapOptions);
    /**
     * 启用地图拖拽，默认启用
     */
    enableDragging(): void;
    /**
     * 禁用地图拖拽
     */
    disableDragging(): void;
    /**
     * 启用地图惯性拖拽，默认禁用
     */
    enableInertialDragging(): void;
    /**
     * 禁用地图惯性拖拽
     */
    disableInertialDragging(): void;
    /**
     * 允许地图可被鼠标滚轮缩放，默认禁用
     */
    enableScrollWheelZoom(): void;
    /**
     * 禁止地图被鼠标滚轮缩放
     */
    disableScrollWheelZoom(): void;
    /**
     * 开启双击平滑缩放效果
     */
    enableContinuousZoom(): void;
    /**
     * 关闭双击平滑缩放效果
     */
    disableContinuousZoom(): void;
    /**
     * 开启图区resize中心点不变
     */
    enableResizeOnCenter(): void;
    /**
     * 关闭图区resize中心点不变
     */
    disableResizeOnCenter(): void;
    /**
     * 启用地图双击缩放，左键双击放大、右键双击缩小
     */
    enableDoubleClickZoom(): void;
    /**
     * 取消地图双击缩放
     */
    disableDoubleClickZoom(): void;
    /**
     * 启用键盘操作，默认禁用。键盘的上、下、左、右键可连续移动地图。同时按下其中两个键可使地图进行对角移动。PgUp、PgDn、Home和End键会使地图平移其1/2的大小。+、-键会使地图放大或缩小一级
     */
    enableKeyboard(): void;
    /**
     * 禁用键盘操作
     */
    disableKeyboard(): void;
    /**
     * 启用双指缩放地图
     */
    enablePinchToZoom(): void;
    /**
     * 禁用双指缩放地图
     */
    disablePinchToZoom(): void;
    /**
     * 设置地图旋转角度
     */
    setHeading(heading: number): void;
    /**
     * 设置地图的倾斜角度
     */
    setTilt(tilt: number): void;
    /**
     * 启用自动适应容器尺寸变化，默认启用
     */
    enableAutoResize(): void;
    /**
     * 禁用自动适应容器尺寸变化
     */
    disableAutoResize(): void;
    /**
     * 地图容器变化后调用此方法用来重新铺图
     */
    checkResize(): void;
    /**
     * 设置地图元素
     */
    setDisplayOptions(option?: displayOptions): void;
    /**
     * 强制地图调整尺寸，此时会以当前容器尺寸为基准重新计算视野所需图像数据并重新绘制。当关闭自动调整视野时（`enableAutoResize` 配置），需要调用此方法来强制地图刷新
     */
    resize(): void;
    /**
     * 返回地图当前尺寸，以像素表示
     */
    getSize(): Size;
    /**
     * 获取地图容器尺寸
     */
    getContainerSize(): Size;
    /**
     * 返回当前地图级别，一个像素对应多少单位的平面墨卡托坐标
     */
    getZoomUnits(): number;
    /**
     * 返回地图的DOM容器元素。当创建用户自定义控件时，需要自行实现Control.initialize()方法，并将控件的容器元素添加到地图上，通过此方法可获得地图容器
     */
    getContainer(): HTMLElement;
    /**
     * 像素坐标转换为经纬度坐标
     */
    pixelToPoint(pixel: Pixel): Point;
    /**
     * 经纬度坐标转换为像素坐标
     */
    pointToPixel(point: Point): Pixel;
    /**
     * 经纬度球体坐标转换为墨卡托平面坐标
     */
    lnglatToMercator(lng: number, lat: number): [number, number];
    /**
     * 墨卡托平面坐标转换为经纬度球体坐标
     */
    mercatorToLnglat(mcLng: number, mcLat: number): [number, number];
    /**
     * 返回地图是否经过centerAndZoom进行初始化
     */
    isLoaded(): boolean;
    /**
     * 添加地点区域，作为地图上的虚拟可点击区域。其中参数spots为热区点数组，options为可选配置参数；返回区域id。
     */
    addSpots(spots: any[], options: any): number;
    /**
     * 根据id返回地点区域数组
     */
    getSpots(id: string): any[];
    /**
     * 根据id移除区域数组
     */
    removeSpots(id: number): void;
    /**
     * 清除地点区域，此操作将清空所有虚拟可点数据
     */
    clearSpots(): void;
    /**
     * 清空当前map所有的自定义底图标注
     */
    clearLabels(): void;
    /**
     * 在底图上添加文字，这些文字会和底图文字一同参与避让
     */
    addLabelsToMapTile(labels: LabelsToMapTiles[]): void;
    /**
     * 从底图上移除文字标注，参数为uid数组，根据数组里的uid进行移除
     */
    removeLabelsFromMapTile(labelUids: string[]): void;
    /**
     * 通过点击坐标获取当前点中的底图icon，如果获取到返回其{name, uid, position}，否则返回null
     */
    getIconByClickPosition(clickPosition: Pixel): { name: string; uid: string; position: Point } | null;
    /**
     * 设置地图可拖动区域，参数为地图拖拽的区域范围
     */
    setBounds(bounds: Bounds): void;
    /**
     * 获取地图当前视野范围的矩形区域，以地理坐标表示。如果地图尚未初始化则返回一个空的 `Bounds` 实例。
     */
    getBounds(): Bounds;
    /**
     * 获取地图坐标类型，为CoordType常量
     */
    getCoordType(): string;
    /**
     * 获取当前地图样式id，对于内置样式则返回样式名称；对于自定义样式，则返回内部自动生成的样式id
     */
    getMapStyleId(): string;
    /**
     * 获取覆盖物容器元素，返回地图覆盖物容器对象
     */
    getPanes(): MapPanes;
    /**
     * 获取当前打开的信息窗口实例，如果当前地图没有处于打开状态信息窗口，则返回 `null`
     */
    getInfoWindow(): InfoWindow | null;
    /**
     * 设置地图默认的鼠标指针样式。参数cursor应符合CSS的cursor属性规范
     */
    setDefaultCursor(cursor: string): void;
    /**
     * 获取地图默认的鼠标指针样式，返回cursor值
     */
    getDefaultCursor(): string;
    /**
     * 设置拖拽地图时的鼠标指针样式。参数cursor应符合CSS的cursor属性规范
     */
    setDraggingCursor(cursor: string): void;
    /**
     * 返回拖拽地图时的鼠标指针样式
     */
    getDraggingCursor(): string;
    /**
     * 设置地图允许的最小级别。取值不得小于地图类型所允许的最小级别
     */
    setMinZoom(zoom: number): void;
    /**
     * 设置地图允许的最大级别。取值不得大于地图类型所允许的最大级别
     */
    setMaxZoom(zoom: number): void;
    /**
     * 返回两点之间的距离，单位是米
     */
    getDistance(start: Point, end: Point): number;
    /**
     * 返回地图类型
     */
    getMapType(): MapTypeId;
    /**
     * 根据提供的地理区域或坐标设置地图视野，调整后的视野会保证包含提供的地理区域或坐标
     */
    setViewport(view: Point[] | Viewport, viewportOptions?: ViewportOptions): void;
    /**
     * 根据提供的地理区域或坐标获得最佳的地图视野，返回的对象中包含center和zoom属性，分别表示地图的中心点和级别。此方法仅返回视野信息，不会将新的中心点和级别做用到当前地图上
     */
    getViewport(view: Point[], viewportOptions?: ViewportOptions): Viewport;
    /**
     * 设初始化地图。 如果center类型为Point时，zoom必须赋值，范围3-19级，若调用高清底图（针对移动端开发）时，zoom可赋值范围为3-18级。如果center类型为字符串时，比如“北京”，zoom可以忽略，地图将自动根据center适配最佳zoom级别
     */
    centerAndZoom(center: Point, zoom: number): void;
    /**
     * 将地图的中心点更改为给定的点，跳转到指定中心点进行渲染。如果该点在当前的地图视图中已经可见，则会以平滑动画的方式移动到中心点位置。可以通过配置强制移动过程不使用动画效果
     */
    panTo(center: Point): void;
    /**
     * 将地图在水平位置上移动x像素，垂直位置上移动y像素。如果指定的像素大于可视区域范围或者在配置中指定没有动画效果，则不执行滑动效果
     */
    panBy(x: number, y: number): void;
    /**
     * 飞到指定的中心点和级别，提供给定位缩放地图使用
     */
    flyTo(center: Point, zoom: number): void;
    /**
     * 重新设置地图，恢复地图初始化时的中心点和级别
     */
    reset(): void;
    /**
     * 设置地图中心点。center除了可以为坐标点以外，还支持城市名。可选配置参数包括'noAnimation: boolean'是否禁用动画效果；'callback: function'动画结束后调用此方法，如果没有动画则立即调用
     */
    setCenter(center: Point | string, options: object): void;
    /**
     * 返回地图当前中心点
     */
    getCenter(): Point;
    /**
     * 设置地图类型
     */
    setMapType(mapTypeId: MapTypeId): void;
    /**
     * 将视图切换到指定的缩放等级，中心点坐标不变。注意：当有信息窗口在地图上打开时，地图缩放将保证信息窗口所在的坐标位置不动。
     */
    setZoom(zoom: number, options?: { noAnimation?: boolean; callback?: () => void; zoomCenter?: Point }): void;
    /**
     * 返回地图当前缩放级别
     */
    getZoom(): number;
    /**
     * 放大一级视图
     */
    zoomIn(): void;
    /**
     * 缩小一级视图
     */
    zoomOut(): void;
    /**
     * 将控件添加到地图，一个控件实例只能向地图中添加一次
     */
    addControl(control: Control): void;
    /**
     * 从地图中移除控件。如果控件从未被添加到地图中，则该移除不起任何作用
     */
    removeControl(control: Control): void;
    /**
     * 添加右键菜单
     */
    addContextMenu(menu: ContextMenu): void;
    /**
     * 移除右键菜单
     */
    removeContextMenu(menu: ContextMenu): void;
    /**
     * 将覆盖物添加到地图中，一个覆盖物实例只能向地图中添加一次
     */
    addOverlay(overlay: Overlay): void;
    /**
     * 从地图中移除覆盖物。如果覆盖物从未被添加到地图中，则该移除不起任何作用
     */
    removeOverlay(overlay: Overlay): void;
    /**
     * 清除地图上所有覆盖物
     */
    clearOverlays(): void;
    /**
     * 根据地理坐标获取对应的覆盖物容器的坐标，此方法用于自定义覆盖物
     */
    pointToOverlayPixel(point: Point): Pixel;
    /**
     * 根据覆盖物容器的坐标获取对应的地理坐标
     */
    overlayPixelToPoint(pixel: Pixel): Point;
    /**
     * 获取当前地图上的所有覆盖物，返回覆盖物对象的集合
     */
    getOverlays(): Overlay[];
    /**
     * 获取当前地图允许的最大倾斜角度
     */
    getCurrentMaxTilt(): number;
    /**
     * 根据 uid 将底图上的 poi 高亮显示，其中参数tilePosStr为label的位置字符串
     */
    hightlightSpotByUid(uid: string, tilePosStr: string): void;
    /**
     * 重置热区状态，即将高亮的热区点取消
     */
    resetSpotStatus(): void;
    /**
     * 重置热区状态，即将高亮的热区点取消
     */
    addAreaSpot(): void;
    /**
     * 返回地点区域数组
     */
    getAreaSpot(id: string): any[];
    /**
     * 移除区域数组
     */
    removeAreaSpot(id: string): void;
    /**
     * 清除地点区域，此操作将清空所有虚拟可点数据
     */
    clearAreaSpots(): void;
    /**
     * 开启路况图层
     */
    setTrafficOn(): void;
    /**
     * 关闭路况图层
     */
    setTrafficOff(): void;
    /**
     * 显示覆盖物
     */
    showOverlayContainer(): void;
    /**
     * 不显示覆盖物
     */
    hideOverlayContainer(): void;
    /**
     * 设置个性化地图，参数为个性化配置对象
     */
    setMapStyleV2(config: object): void;
    /**
     * 启动视角动画
     */
    startViewAnimation(viewAnimation: ViewAnimation): number;
    /**
     * 停止视角动画
     */
    cancelViewAnimation(viewAnimation: ViewAnimation): void;
    /**
     * 获取地图截图，地球模式不支持。需要初始化地图配置preserveDrawingBuffer：true，否则是黑屏
     */
    getMapScreenshot(): string;
    /**
     * 加载地图当前样式所需要的样式文件，callback为加载成功后的回调函数
     */
    loadMapStyleFiles(callback: () => void): void;
    /**
     * 设置版权信息位置，其中logo为logo位置，copyright为文字位置
     */
    setCopyrightOffset(logo: object, cpy: object): void;
    /**
     * 在地图上添加智能停车图层
     * @param layer
     */
    addParkingSpot(layer: ParkingSpot): void;
    addGeoJSONLayer(layer: GeoJSONLayer): void;
    removeGeoJSONLayer(layer: GeoJSONLayer): void;
    addTileLayer(tileLayer: TileLayer): void;
    removeTileLayer(tilelayer: TileLayer): void;
    /**
     * 销毁地图，当使用 WebGL 渲染地图时，如果确认不再使用该地图实例，则需要调用本方法销毁 WebGL 上下文，否则频繁创建新地图实例会导致浏览器报：too many WebGL context 的警告
     */
    destroy(): void;
    /**
     * 判断浏览器是否支持地球,支持返回true,否则返回false
     */
    isSupportEarth(): boolean;
    addEventListener<K extends EventListenerType>(event: K, handler: (e: BMapEventMap[K]) => void): void;
    removeEventListener<K extends EventListenerType>(event: K, handler: (e: BMapEventMap[K]) => void): void;
  }

  type EventListenerType = keyof BMapEventMap;

  interface BMapEventMap {
    /**
     * 左键单击地图时触发此事件。 当双击时，产生的事件序列为： click -> click -> dblclick
     */
    click: { type: EventListenerType; target: Event; latlng: Point; pixel: Pixel; overlay: Overlay };
    /**
     * 鼠标双击地图时会触发此事件
     */
    dblclick: { type: EventListenerType; target: Event; latlng: Point; pixel: Pixel };
    /**
     * 右键单击地图时触发此事件。 当双击时，产生的事件序列为： rightclick -> rightclick -> rightdblclick
     */
    rightclick: { type: EventListenerType; target: Event; latlng: Point; pixel: Pixel; overlay: Overlay };
    rightdblclick: { type: EventListenerType; target: Event; latlng: Point; pixel: Pixel; overlay: Overlay };
    mousemove: { type: EventListenerType; target: Event; latlng: Point };
    moveend: { type: EventListenerType; target: Event };
    zoomend: { type: EventListenerType; target: Event };
    tilesloaded: { type: EventListenerType; target: Event };
    resize: { type: EventListenerType; target: Event; size: number };
  }

  interface MapOptions {
    /**
     * 地图允许展示的最小级别
     */
    minZoom?: number;
    /**
     * 地图允许展示的最大级别
     */
    maxZoom?: number;
    /**
     * 地图类型，默认为BMAP_NORMAL_MAP
     */
    mapType?: MapTypeId;
    /**
     * 开启自动适应地图容器变化，默认启用
     */
    enableAutoResize?: boolean;
    /**
     * 是否允许地图倾斜
     */
    enableTilt?: boolean;
    /**
     * 是否允许地图旋转
     */
    enableRotate?: boolean;
    /**
     * 是否允许通过手势旋转地图
     */
    enableRotateGestures?: boolean;
    /**
     * 是否允许通过手势倾斜地图
     */
    enableTiltGestures?: boolean;
    /**
     * 覆盖物是否显示在文字上面，默认false
     */
    overlayTop?: boolean;
    /**
     * 手势缩放是否固定中心点，默认不固定，由手指中心点决定
     */
    fixCenterWhenPinch?: boolean;
    preserveDrawingBuffer?: boolean;
    /**
     * 配置地图显示元素。该参数详细信息请参见 setDisplayOptions方法
     */
    displayOptions?: object;
    enableHighResolution?: boolean;
    enableMapClick?: boolean;
  }

  interface Viewport {
    /**
     * 视野中心点
     */
    center: Point;
    /**
     * 视野级别
     */
    zoom: number;
  }

  interface ViewportOptions {
    /**
     * 是否启用动画效果移动地图，默认为true。当调整后的级别与当前地图级别一致时，将使用动画效果移动地图
     */
    noAnimation?: boolean;
    /**
     * 视野调整的预留边距，例如： margins: [30, 20, 0, 20] 表示坐标点会限制在上述区域内
     */
    margins?: number[];
    /**
     * 地图级别的偏移量，您可以在方法得出的结果上增加一个偏移值。例如map.setViewport计算出地图的级别为10，如果zoomFactor为-1，则最终的地图级别为9
     */
    zoomFactor?: number;
    /**
     * 改变地图视野的延迟执行时间，单位毫秒，默认为200ms。此延时仅针对动画效果有效
     */
    delay?: number;
  }

  interface LabelsToMapTiles {
    /**
     * 墨卡托坐标
     */
    position?: Point;
    /**
     * 显示的级别范围，[fromZoom, toZoom]
     */
    displayRange?: number[];
    /**
     * 文字距离坐标位置的像素边距
     */
    textMargin?: number;
    /**
     * 显示的文字内容
     */
    name?: string;
    /**
     * 样式
     */
    style?: {
      /**
       * 文字大小
       */
      fontSize?: number;
      /**
       * 文字颜色，合法的css颜色值
       */
      color?: string;
      /**
       * 文字描边尺寸
       */
      haloSize?: number;
      /**
       * 描边颜色，合法的css颜色值
       */
      strokeColor?: string;
      /**
       * 如果添加icon则需要给icon的url
       */
      icon?: string;
      /**
       * icon的宽度和高度，按照1x的显示尺寸给出，[width, height]
       */
      iconSize: number[];
      /**
       * 文字对应的唯一标识
       */
      guid: string;
      /**
       * 文字位于坐标的方向，取值为：0, 1, 2, 3, 4 分别表示bottom, right, top, left, center
       */
      direction: number;
      /**
       * 权重，值越高优先级越高
       */
      rank: number;
      /**
       * 类型，默认为fixed（固定标注），此外还有line（道路标注）、biaopai(标牌)
       */
      type: string;
    };
  }

  interface displayOptions {
    /**
     * 是否显示POI信息。注意：`poi`、`poiText`与`poiIcon`均用来配置POI显示，当`poi`为`true`时，可配置另外两个选项；如果为`false`，则另外两个选项不再生效。
     */
    poi?: boolean;
    /**
     * 是否显示POI文字信息
     */
    poiText?: boolean;
    /**
     * 是否显示POI的Icon
     */
    poiIcon?: boolean;
    /**
     * 是否显示覆盖物
     */
    overlay?: boolean;
    /**
     * 是否显示3D建筑物（仅支持 WebGL 方式渲染的地图）
     */
    building?: boolean;
    /**
     * 是否显示室内图（仅支持 WebGL 方式渲染的地图）
     */
    indoor?: boolean;
    /**
     * 是否显示路网（只对卫星图和地球模式有效）
     */
    street?: boolean;
    /**
     * 配置天空的颜色，数组中首个元素表示地面颜色，第二个元素表示天空颜色。从而形成渐变，支持只传入一个元素
     */
    skyColor?: string[];
  }

  // interface LabelsOptions {
  //   position?: Point;
  //   name?: string;
  //   displayRange?: number[];
  //   textMargin?: number;
  //   style?: unknown;
  //   uid?: string;
  //   direction?: number;
  // }
}
