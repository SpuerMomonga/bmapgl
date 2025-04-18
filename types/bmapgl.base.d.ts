declare namespace BMapGL {
  class Point {
    /**
     * 以指定的经度和纬度创建一个地理点坐标
     */
    constructor(lng: number, lat: number);
    /**
     * 地理经度
     */
    lng: number;
    /**
     * 地理纬度
     */
    lat: number;
    /**
     * 判断坐标点是否相等，当且仅当两点的经度和纬度均相等时返回true
     */
    equals(other: Point): boolean;
  }

  class Pixel {
    /**
     * 创建像素点对象实例。像素坐标的坐标原点为地图区域的左上角
     */
    constructor(x: number, y: number);
    /**
     * x坐标
     */
    x: number;
    /**
     * y坐标
     */
    y: number;
    /**
     * 判断坐标点是否相等，当且仅当两点的x坐标和y坐标均相等时返回true
     */
    equals(other: Pixel): boolean;
  }

  class Size {
    /**
     * 以指定的宽度和高度创建一个矩形区域大小对象
     */
    constructor(width: number, height: number);
    /**
     * 水平方向的数值
     */
    width: number;
    /**
     * 竖直方向的数值
     */
    height: number;
    /**
     * 当且仅当此矩形中的宽度和高度都等于其他矩形的宽度和高度时，返回true
     */
    equals(other: Size): boolean;
  }

  class Bounds {
    constructor(minX: number, minY: number, maxX: number, maxY: number);
    /**
     * 创建一个包含所有给定点坐标的矩形区域。其中sw表示矩形区域的西南角，参数ne表示矩形区域的东北角
     */
    constructor(sw: Point, ne: Point);
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    /**
     * 当且仅当此矩形中的两点参数都等于其他矩形的两点参数时，返回true
     */
    equals(other: Bounds): boolean;
    /**
     * 如果点的地理坐标位于此矩形内，则返回true
     */
    containsPoint(point: Point): boolean;
    /**
     * 传入的矩形区域完全包含于此矩形区域中，则返回true
     */
    containsBounds(bounds: Bounds): boolean;
    /**
     * 计算与另一矩形的交集区域
     */
    intersects(other: Bounds): Bounds;
    /**
     * 放大此矩形，使其包含给定的点
     */
    extend(point: Point): void;
    /**
     * 返回矩形的中心点
     */
    getCenter(): Point;
    /**
     * 如果矩形为空，则返回true
     */
    isEmpty(): boolean;
    /**
     * 返回矩形区域的西南角
     */
    getSouthWest(): Point;
    /**
     * 返回矩形区域的东北角
     */
    getNorthEast(): Point;
    /**
     * 返回矩形区域的跨度
     */
    toSpan(): Point;
  }

  // class Projection {
  //   static convertMC2LL(point: Point): Point;
  //   static convertLL2MC(point: Point): Point;
  //   static proximityConvertMC2LL(point: Point): Point;
  // }
}
