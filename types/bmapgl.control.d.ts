declare namespace BMapGL {
  /**
   * 此类是所有控件的基类，您可以通过此类来实现自定义控件。所有控件均包含Control类的属性、方法和事件。通过Map.addControl()方法可将控件添加到地图上
   */
  class Control {
    /**
     * 创建一个控件原型实例，通过该原型实例可创建自定义控件
     */
    constructor();
    /**
     * 控件默认的停靠位置。自定义控件时需要提供此属性，作为控件的默认停靠位置
     */
    defaultAnchor: ControlAnchor;
    /**
     * 控件默认的位置偏移值。自定义控件时需要提供此属性，作为控件的默认偏移位置
     */
    defaultOffset: Size;
    /**
     * 抽象方法。调用Map.addControl()方法添加控件时将调用此方法，从而实现该控件的初始化。自定义控件时需要实现此方法，并将元素的DOM元素在该方法中返回。DOM元素需要添加到地图的容器中，使用map.getContainer()方法可获得地图容器元素
     */
    initialize(map: Map): HTMLElement;
    /**
     * 设置控件停靠的位置
     */
    setAnchor(anchor: ControlAnchor): void;
    /**
     * 返回控件停靠的位置
     */
    getAnchor(): ControlAnchor;
    /**
     * 设置控件停靠的偏移量
     */
    setOffset(offset: Size): void;
    /**
     * 返回控件停靠的偏移量
     */
    getOffset(): Size;
    /**
     * 显示控件
     */
    show(): void;
    /**
     * 隐藏控件
     */
    hide(): void;
    /**
     * 判断控件的可见性
     */
    isVisible(): boolean;
    /**
     * 自定义Control在add之后立马能读取到Container, 内置Control不能
     */
    getContainer(): HTMLElement | undefined;
  }

  /**
   * 此常量表示控件的定位
   */
  type ControlAnchor = number;

  /**
   * 此类表示NavigationControl3D构造函数的可选参数。它没有构造函数，但可通过对象字面量形式表示。
   */
  interface NavigationControl3DOptions {
    /**
     * 控件的停靠位置
     */
    anchor?: ControlAnchor;
    /**
     * 控件的偏移值
     */
    offset?: Size;
  }

  /**
   * 常量表示长度单位制
   */
  type LengthUnit = string;

  /**
   * 此类表示地图的3D控件，可以对地图进行旋转以及切换地图2D、3D展示效果
   */
  class NavigationControl3D extends Control {
    /**
     * 创建一个特定样式的地图平移缩放控件
     */
    constructor(opts?: NavigationControl3DOptions);
  }

  /**
   * 此类表示ScaleControl构造函数的可选参数。它没有构造函数，但可通过对象字面量形式表示
   */
  interface ScaleControlOptions {
    /**
     * 控件的停靠位置
     */
    anchor?: ControlAnchor;
    /**
     * 控件的偏移值
     */
    offset?: Size;
  }

  /**
   * 此类表示比例尺控件
   */
  class ScaleControl extends Control {
    /**
     * 创建一个比例尺控件
     */
    constructor(opts?: ScaleControlOptions);
    /**
     * 返回比例尺单位制
     */
    getUnit(): LengthUnit;
    /**
     * 设置比例尺单位制
     */
    setUnit(unit: LengthUnit): void;
  }

  /**
   * 此类表示ScaleControl构造函数的可选参数。它没有构造函数，但可通过对象字面量形式表示。
   */
  interface ZoomControlOptions {
    /**
     * 控件的停靠位置
     */
    anchor?: ControlAnchor;
    /**
     * 控件的偏移值
     */
    offset?: Size;
  }

  /**
   * 此类表示缩放控件
   */
  class ZoomControl extends Control {
    /**
     * 创建一个缩放控件
     */
    constructor(opts?: ZoomControlOptions);
  }

  /**
   * 此类表示LocationControl构造函数的可选参数。它没有构造函数，但可通过对象字面量形式表示。
   */
  interface LocationControlOptions {
    /**
     * 控件的停靠位置
     */
    anchor?: ControlAnchor;
    /**
     * 控件的偏移值
     */
    offset?: Size;
  }

  /**
   * 此类表示定位控件
   */
  class LocationControl extends Control {
    /**
     * 创建一个定位控件
     */
    constructor(opts?: LocationControlOptions);
    addEventListener(event: 'locationSuccess' | 'locationError', callback: (e: any) => void): void;
    removeEventListener(event: 'locationSuccess' | 'locationError', callback: (e: any) => void): void;
  }

  /**
   * 此类表示CityListControl构造函数的可选参数。它没有构造函数，但可通过对象字面量形式表示。
   */
  interface CityListControlOptions {
    /**
     * 控件的停靠位置
     */
    anchor?: ControlAnchor;
    /**
     * 控件的偏移值
     */
    offset?: Size;
  }

  /**
   * 此类表示城市选择控件
   */
  class CityListControl extends Control {
    /**
     * 创建一个城市选择控件
     */
    constructor(opts?: CityListControlOptions);
  }

  /**
   * 此类表示CopyrightControl构造函数的可选参数。它没有构造函数，但可通过对象字面量形式表示。
   */
  interface CopyrightControlOptions {
    /**
     * 控件的停靠位置
     */
    anchor?: ControlAnchor;
    /**
     * 控件的偏移值
     */
    offset?: Size;
  }

  /**
   * 此类表示自定义版权控件
   */
  class CopyrightControl extends Control {
    /**
     * 创建一个自定义版权控件
     */
    constructor(opts?: CopyrightControlOptions);
    addCopyright(copyright: Copyright): void;
    removeCopyright(id: number): void;
    getCopyright(id: number): Copyright;
    getCopyrightCollection(): Copyright[];
  }

  interface Copyright {
    id?: number;
    content?: string;
    bounds?: Bounds;
  }
}

/**
 * 公制单位
 */
declare const BMAP_UNIT_METRIC: BMapGL.LengthUnit;
/**
 * 英制单位
 */
declare const BMAP_UNIT_IMPERIAL: BMapGL.LengthUnit;

/**
 * 控件将定位到地图的左上角
 */
declare const BMAP_ANCHOR_TOP_LEFT: BMapGL.ControlAnchor;
/**
 * 控件将定位到地图的右上角
 */
declare const BMAP_ANCHOR_TOP_RIGHT: BMapGL.ControlAnchor;
/**
 * 控件将定位到地图的左下角
 */
declare const BMAP_ANCHOR_BOTTOM_LEFT: BMapGL.ControlAnchor;
/**
 * 控件将定位到地图的右下角
 */
declare const BMAP_ANCHOR_BOTTOM_RIGHT: BMapGL.ControlAnchor;
