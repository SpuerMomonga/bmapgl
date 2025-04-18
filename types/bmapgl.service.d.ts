declare namespace BMapGL {
  /**
   * 此类表示LocalSearch构造函数的可选参数
   */
  interface LocalSearchOptions {
    /**
     * 结果呈现设置
     */
    renderOptions?: RenderOptions;
    /**
     * 标注添加完成后的回调函数
     * @param pois 通过marker属性可得到其对应的标注
     * @returns void
     */
    onMarkersSet?: (pois: LocalResultPoi[]) => void;
    /**
     * 标注气泡内容创建后的回调函数
     * @param poi 通过其marker属性可得到当前的标注
     * @param html 气泡内的Dom元素
     * @returns void
     */
    onInfoHtmlSet?: (poi: LocalResultPoi, html: HTMLElement) => void;
    /**
     * 结果列表添加完成后的回调函数
     * @param container 结果列表所用的HTML元素
     * @returns void
     */
    onResultsHtmlSet?: (container: HTMLElement) => void;
    /**
     * 设置每页容量，取值范围：1 - 100，对于多关键字检索，容量表示每个关键字的数量，如果有2个关键字，则实际检索结果数量范围为：2 - 200
     */
    pageCapacity?: number | undefined;
    /**
     * 检索完成后的回调函数
     * @param results 如果是多关键字检索，回调函数参数返回一个LocalResult的数组，数组中的结果顺序和检索中多关键字数组中顺序一致
     * @returns void
     */
    onSearchComplete?: (results: LocalResult[]) => void;
  }
  /**
   * 用于位置检索、周边检索和范围检索
   * @example
   * const map = new BMapGL.Map("container");
   * map.centerAndZoom('重庆市', 11);
   * // 创建检索实例
   * const local = new BMapGL.LocalSearch(map, { renderOptions:{ map: map } });
   * // 返回当前城市“景点”关键字的检索结果，并展示在地图上
   * local.search('景点')
   */
  class LocalSearch {
    /**
     * 创建一个搜索类实例
     * @param location 表示检索区域，其类型可为地图实例、坐标点或城市名称的字符串。当参数为地图实例时，检索位置由当前地图中心点确定，且搜索结果的标注将自动加载到地图上，并支持调整地图视野层级；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会在该城市内进行
     * @param opts 搜索配置选项
     */
    constructor(location: Map | Point | string, opts?: LocalSearchOptions);
    /**
     * 根据检索词发起检索
     * @param keyword 当keyword为数组时将同时执行多关键字的查询，最多支持10个关键字，多关键字自 1.2 版本支持
     * @param option 搜索配置选项
     */
    search(keyword: string | string[], option?: LocalSearchSearchOptions): void;
    /**
     * 。
     */
    /**
     * 根据范围和检索词发起范围检索
     * @param keyword 当keyword为数组时将同时执行多关键字检索，最多支持10个关键字，多关键字自 1.2 版本支持
     * @param bounds 搜索范围
     * @param option 搜索配置选项
     */
    searchInBounds(
      keyword: string | string[],
      bounds: Bounds,
      option?: {
        customData: CustomData;
      },
    ): void;
    /**
     * 根据中心点、半径与检索词发起周边检索
     * @param keyword 关键词，当keyword为数组时将同时执行多关键字的检索，最多支持10个关键字，多关键字自 1.2 版本支持
     * @param center 搜索中心点，当center为字符串时，半径参数将忽略，Point类型的中心点自 1.1 版本支持
     * @param radius 搜索半径
     * @param option 搜索配置选项
     */
    searchNearby(
      keyword: string | string[],
      center: LocalResultPoi | string | Point,
      radius: number,
      option?: {
        customData: CustomData;
      },
    ): void;
    /**
     * 返回最近一次检索的结果。如果是多关键字范围检索，则返回一个LocalResult的数组，数组中的结果顺序和范围检索中多关键字数组中顺序一致
     */
    getResults(): LocalResult | LocalResult[];
    /**
     * 清除最近一次检索的结果
     */
    clearResults(): void;
    /**
     * 检索特定页面的结果
     */
    gotoPage(page: number): void;
    /**
     * 启用根据结果自动调整地图层级，当指定了搜索结果所展现的地图时有效
     */
    enableAutoViewport(): void;
    /**
     * 禁用根据结果自动调整地图层级
     */
    disableAutoViewport(): void;
    /**
     * 启用自动选择第一个检索结果
     */
    enableFirstResultSelection(): void;
    /**
     * 禁用自动选择第一个检索结果
     */
    disableFirstResultSelection(): void;
    /**
     * 设置检索范围，参数类型可以为地图实例、坐标点或字符串。例：setLocation("北京市")
     */
    setLocation(location: Map | Point | string): void;
    /**
     * 设置每页容量，取值范围：1 - 100，对于多关键字检索，每页容量表示每个关键字返回结果的数量（例如当用2个关键字检索时，实际结果数量范围为：2 - 200）。此值只对下一次检索有效
     */
    setPageCapacity(capacity: number): void;
    /**
     * 返回每页容量，对于多关键字检索，返回每个关键字对应的页面容量
     */
    getPageCapacity(): number;
    /**
     * 设置检索结束后的回调函数。参数：results: LocalResult 或 Array 如果是多关键字检索，回调函数参数为LocalResult的数组，数组中的结果顺序和检索中多关键字数组中顺序一致
     */
    setSearchCompleteCallback(callback: (results: LocalResult | LocalResult[]) => void): void;
    /**
     * 设置添加标注后的回调函数。参数： pois: Array ，通过marker属性可得到其对应的标注
     */
    setMarkersSetCallback(callback: (pois: LocalResultPoi[]) => void): void;
    /**
     * 设置标注气泡创建时的回调函数。参数： poi: LocalResultPoi，通过其marker属性可得到当前的标注。 html: HTMLElement，气泡内的Dom元素
     */
    setInfoHtmlSetCallback(callback: (poi: LocalResultPoi, html: HTMLElement) => void): void;
    /**
     * 设置结果列表创建后的回调函数。参数： container: HTMLElement，结果列表所用的HTML元素
     */
    setResultsHtmlSetCallback(callback: (container: HTMLElement) => void): void;
    /**
     * 返回状态码
     */
    getStatus(): ServiceStatusCode;
  }

  interface LocalSearchSearchOptions {
    /**
     * 是否将搜索范围约束在当前城市
     */
    forceLocal?: boolean;
    /**
     * 检索lbs云服务的数据
     */
    customData?: CustomData;
  }

  /**
   * 此类表示检索lbs云服务的数据。它没有构造函数，但可通过对象字面量形式表示。 要检索lbs云服务的数据，需要在引用api的时候在参数后加上lbs云平台的key
   */
  interface CustomData {
    /**
     * lbs云v2接口，可在lbs云平台上查看自己的geotableId
     */
    geotableId: number;
    /**
     * 空格分隔的多字符串
     */
    tags: string;
    /**
     * 过滤条件，参考：lbsyun.baidu.com/index.php?title=lbscloud/api/geosearch
     */
    filter: string;
  }

  /**
   * 此类表示搜索结果呈现的配置。它没有构造函数，但可通过对象字面量形式表示
   */
  interface RenderOptions {
    /**
     * 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上
     */
    map: Map;
    /**
     * 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。此属性对LocalCity无效。驾车路线规划无效
     */
    panel?: string | HTMLElement;
    /**
     * 是否选择第一个检索结果。此属性仅对LocalSearch有效
     */
    selectFirstResult?: boolean;
    /**
     * 检索结束后是否自动调整地图视野。此属性对LocalCity无效 LocalResult
     */
    autoViewport?: boolean;
    highlightMode?: HighlightModes;
  }

  /**
   * 类表示LocalSearch的检索结果，没有构造函数，通过LocalSearch.getResults()方法或LocalSearch的onSearchComplete回调函数的参数得到
   */
  interface LocalResult {
    /**
     * 本次检索的关键词
     */
    keyword: string;
    /**
     * 周边检索的中心点（仅当周边检索时提供）
     */
    center: LocalResultPoi;
    /**
     * 周边检索的半径（仅当周边检索时提供）
     */
    radius: number;
    /**
     * 范围检索的地理区域（仅当范围检索时提供）
     */
    bounds: Bounds;
    /**
     * 本次检索所在的城市
     */
    city: string;
    /**
     * 更多结果的链接，到百度地图进行搜索
     */
    moreResultsUrl: string;
    /**
     * 本次检索所在的省份
     */
    province: string;
    /**
     * 搜索建议列表。（当关键词是拼音或拼写错误时给出的搜索建议）
     */
    suggestions: string[];
    /**
     * 返回索引指定的结果。索引0表示第1条结果
     */
    getPoi(i: number): LocalResultPoi;
    /**
     * 返回当前页的结果数
     */
    getCurrentNumPois(): number;
    /**
     * 返回总结果数
     */
    getNumPois(): number;
    /**
     * 返回总页数
     */
    getNumPages(): number;
    /**
     * 返回页数序号
     */
    getPageIndex(): number;
    /**
     * 返回城市列表
     */
    getCityList(): CityList[];
  }

  interface CityList {
    /**
     * 城市名
     */
    city: string;
    /**
     * 结果数
     */
    numResults: number;
  }

  /**
   * 此类表示位置检索或路线规划的一个结果点，没有构造函数，可通过对象字面量形式表示
   */
  interface LocalResultPoi {
    /**
     * 结果的名称标题
     */
    title: string;
    /**
     * 该结果所在的地理位置
     */
    point: Point;
    /**
     * 在百度地图中展示该结果点的详情信息链接
     */
    url: string;
    /**
     * 地址（根据数据部分提供）。注：当结果点类型为公交站或地铁站时，地址信息为经过该站点的所有车次
     */
    address: string;
    /**
     * 所在城市
     */
    city: string;
    /**
     * 电话，根据数据部分提供
     */
    phoneNumber: string;
    /**
     * 邮政编码，根据数据部分提供
     */
    postcode: string;
    /**
     * 类型，根据数据部分提供
     */
    type: PoiType;
    /**
     * 是否精确匹配。只适用LocalSearch的search方法检索的结果
     */
    isAccurate: boolean;
    /**
     * 所在省份
     */
    province: string;
    /**
     * POI的标签，如商务大厦、餐馆等。目前只有LocalSearch的回调函数onSearchComplete(result)中的result和Geocoder.getLocation的回调函数的参数GeocoderResult.surroundingPois涉及的LocalResultPoi有tags字段。其他API涉及的LocalResultPoi没有该字段
     */
    tags: string[];
    /**
     * 在百度地图详情页面展示该结果点的链接。localsearch的结果中才有
     */
    detailUrl: string;
  }

  /**
   * 此枚举常量表示地点的类型
   */
  type PoiType = number;

  /**
   * 用于获取公交线路规划方案
   */
  class TransitRoute {
    /**
     * 创建一个公交导航实例
     * @param location 表示检索区域，类型可为地图实例、坐标点或城市名称的字符串。当参数为地图实例时，检索位置由当前地图中心点确定；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会优先在该城市内进行
     * @param opts 规划配置项
     */
    constructor(location: Map | Point | string, opts?: TransitRouteOptions);
    /**
     * 发起检索
     * @param start 起点，参数可以坐标点或者LocalSearchPoi实例
     * @param end 终点，参数可以是坐标点或者LocalSearchPoi实例，3.0版本暂不支持起终点参数为关键字，开发者可以先用检索接口确认关键字的坐标点
     */
    search(start: string | Point | LocalResultPoi, end: string | Point | LocalResultPoi): void;
    /**
     * 返回最近一次检索的结果
     */
    getResults(): TransitRouteResult;
    /**
     * 清除最近一次检索的结果
     */
    clearResults(): void;
    /**
     * 启用自动调整地图层级，当指定了搜索结果所展现的地图时有效
     */
    enableAutoViewport(): void;
    /**
     * 禁用自动调整地图层级
     */
    disableAutoViewport(): void;
    /**
     * 设置每页返回方案个数
     * @param capacity 范围 {1-5}，默认为5
     */
    setPageCapacity(capacity: number): void;
    /**
     * 设置城市内换乘策略
     * @param policy
     */
    setPolicy(policy: TransitPolicy): void;
    /**
     * 设置跨城换乘策略
     * @param intercityPolicy
     */
    setIntercityPolicy(intercityPolicy: IntercityPolicy): void;
    /**
     * 设置跨城交通方式策略
     * @param transitTypePolicy
     */
    setTransitTypePolicy(transitTypePolicy: TransitTypePolicy): void;
    setLocation(location: Map | Point | string): void;
    /**
     * 设置检索结束后的回调函数
     * @param callback 公交导航结果回调函数
     */
    setSearchCompleteCallback(callback: (results: TransitRouteResult) => void): void;
    /**
     * 设置添加标注后的回调函数。 参数： pois: Array ，起点和目的地数组。 transfers: Array ，公交车站数组
     * @param callback
     */
    setMarkersSetCallback(callback: (pois: LocalResultPoi[]) => void): void;
    /**
     * 设置气泡打开后的回调函数。 参数： poi: LocalResultPoi，表示当前气泡对应的点（可以是起点、终点或换乘车站） html: HTMLElement，气泡内的DOM元素
     * @param callback
     */
    setInfoHtmlSetCallback(callback: (poi: LocalResultPoi, html: HTMLElement) => void): void;
    /**
     * 设置添加路线后的回调函数。 参数： lines: Array ，公交线路数组。 routes: Array ，步行线路数组，通过Route.getPolyline()方法可得到对应的折线覆盖物
     * @param callback
     */
    setPolylinesSetCallback(callback: (lines: Line[], routes: Route[]) => void): void;
    /**
     * 设置结果列表创建后的回调函数。 参数： container: 结果列表所用的HTML元素
     * @param callback
     */
    setResultsHtmlSetCallback(callback: (container: HTMLElement) => void): void;
    /**
     * 返回状态码
     */
    getStatus(): ServiceStatusCode;
    /**
     * 返回线路规划对象类型
     */
    toString(): string;
  }

  /**
   * 此类表示TransitRoute构造函数的可选参数。它没有构造函数，但可通过对象字面量形式表示
   */
  interface TransitRouteOptions {
    /**
     * 搜索结果的呈现设置
     */
    renderOptions?: RenderOptions;
    /**
     * 市内公交的策略参数
     */
    policy?: TransitPolicy;
    /**
     * 跨城公交的换乘策略参数
     */
    intercityPolicy: IntercityPolicy;
    /**
     * 跨城公交的交通方式策略参数
     */
    transitTypePolicy: TransitTypePolicy;
    /**
     * 返回方案的个数
     */
    pageCapacity?: number;
    /**
     * 检索完成后的回调函数。参数：results: TransitRouteResult，公交导航结果
     */
    onSearchComplete?: (result: TransitRouteResult) => void;
    /**
     * 标注添加完成后的回调函数。参数：pois: Array ，起点和目的地数组。transfers: Array ，公交车站数组
     */
    onMarkersSet?: (pois: LocalResultPoi[], transfers: LocalResultPoi[]) => void;
    /**
     * 气泡内容创建后的回调函数。参数：poi: LocalResultPoi，表示当前气泡对应的点（可以是起点、终点或换乘车站）html: HTMLElement，气泡内的DOM元素
     */
    onInfoHtmlSet?: (poi: LocalResultPoi, html: HTMLElement) => void;
    /**
     * 折线添加完成后的回调函数。参数：lines: Array ，公交线路数组。routes: Array ，步行线路数组，通过Route.getPolyline()方法可得到对应的折线覆盖物
     */
    onPolylinesSet?: (lines: Line[]) => void;
    /**
     * 结果列表添加完成后的回调函数。参数：container: 结果列表所用的HTML元素
     */
    onResultsHtmlSet?: (container: HTMLElement) => void;
  }

  /**
   * 此常量表示市内公交方案换乘策略
   */
  type TransitPolicy = number;

  /**
   * 此常量表示跨城公交换乘策略
   */
  type IntercityPolicy = number;

  /**
   * 此常量表示跨城交通方式策略
   */
  type TransitTypePolicy = number;

  /**
   * 此类表示路线导航的结果，没有构造函数，通过访问TransitRoute.getResults()方法或TransitRoute的onSearchComplete回调函数参数获得
   */
  interface TransitRouteResult {
    /**
     * 公交导航策略
     */
    policy: TransitPolicy;
    city: string;
    moreResultsUrl: string;
    /**
     * 跨城策略（仅跨城时有）
     */
    intercityPolicy: IntercityPolicy;
    /**
     * 跨城交通方式策略（仅跨城时有）
     */
    transitTypePolicy: TransitTypePolicy;
    /**
     * 返回起点
     */
    getStart(): LocalResultPoi;
    /**
     * 返回终点
     */
    getEnd(): LocalResultPoi;
    /**
     * 返回方案个数
     */
    getNumPlans(): number;
    /**
     * 返回索引指定的方案。索引0表示第一条方案
     * @param i
     */
    getPlan(i: number): TransitRoutePlan;
    /**
     * 返回公交出行方案的类型
     */
    getTransitType(): TransitType;
  }

  /**
   * 此类表示一条公交出行方案。没有构造函数，通过TransitRouteResult.getPlan()方法获得
   */
  interface TransitRoutePlan {
    /**
     * 返回方案包含的公交线路段数(如果是跨城检索，还包括飞机、火车、大巴线路)
     */
    getNumLines(): number;
    /**
     * 返回方案包含的某条公交线路(如果是跨城检索，还包括飞机、火车、大巴线路)
     * @param i
     */
    getLine(i: number): Line;
    /**
     * 返回方案包含的步行线路段数
     */
    getNumRoutes(): number;
    getRoute(i: number): Route;
    /**
     * 返回方案总距离。当format参数为true时，返回方案距离字符串（包含单位），当format为false时，仅返回数值（单位为米）信息。默认参数为true
     */
    getDistance(format?: boolean): string | number;
    /**
     * 返回方案总时间。当format参数为true时，返回描述时间的字符串（包含单位），当format为false时，仅返回数值（单位为秒）信息。默认参数为true
     * @param format
     */
    getDuration(format?: boolean): string | number;
    /**
     * 返回方案描述文本，默认包含HTML标签。当includeHtml为false时，方案描述不包含HTML标签
     * @param includeHtml
     */
    getDescription(includeHtml: boolean): string;
    /**
     * 返回指定路段的交通方式类型，分别对应Line和Route
     * @param i
     */
    getTotalType(i: number): any;
    /**
     * 返回整个方案包含的某段线路，根据方案的数据情况，返回值可能是步行对象Route也有可能是线路对象Line
     * @param i
     */
    getTotal(i: number): Route | Line;
    /**
     * 总路段数量
     */
    getNumTotal(): number;
  }

  /**
   * 此常量表示出行方案的类型
   */
  type TransitType = number;

  /**
   * 此枚举类型标识不同类型的交通线路类型，其中包括了市内公交和跨城公交
   */
  type LineType = number;

  /**
   * 此类表示WalkingRoute构造函数的可选参数
   */
  interface WalkingRouteOptions {
    /**
     * 搜索结果呈现设置
     */
    renderOptions?: RenderOptions;
    /**
     * 检索完成后的回调函数。 参数： results: WalkingRouteResult
     */
    onSearchComplete?: (result: WalkingRouteResult) => void;
    /**
     * 标注添加完成后的回调函数。 参数： pois: Array ，起点和目的地点数组，。通过marker属性可得到其对应的标注
     */
    onMarkersSet?: (pois: LocalResultPoi[]) => void;
    /**
     * 折线添加完成后的回调函数。 参数： routes: Array ，步行线路数组，通过Route.getPolyline()方法可得到对应的折线覆盖物
     */
    onPolylinesSet?: (routes: Route[]) => void;
    /**
     * 标注气泡内容创建后的回调函数。 参数： poi: LocalResultPoi，通过其marker属性可得到当前的标注。 html: HTMLElement，气泡内的DOM元素
     */
    onInfoHtmlSet?: (poi: LocalResultPoi, html: HTMLElement) => void;
    /**
     * 结果列表添加完成后的回调函数。 参数： container: 结果列表所用的HTML元素
     */
    onResultsHtmlSet?: (container: HTMLElement) => void;
  }

  /**
   * 用于获取步行路线规划方案
   */
  class WalkingRoute {
    /**
     * 创建一个步行导航实例
     * @param location 表示检索区域，类型可为地图实例、坐标点或城市名称的字符串。当参数为地图实例时，检索位置由当前地图中心点确定；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会在该城市内进行
     * @param opts
     */
    constructor(location: Map | Point | string, opts?: WalkingRouteOptions);
    /**
     * 发起检索
     * @param start 起点，参数可以是关键字、坐标点（自1.1版本支持）或者LocalSearchPoi实例
     * @param end 终点，参数可以是关键字、坐标点（自1.1版本支持）或者LocalSearchPoi实例
     */
    search(start: string | Point | LocalResultPoi, end: string | Point | LocalResultPoi): void;
    /**
     * 返回最近一次检索的结果
     */
    getResults(): WalkingRouteResult;
    /**
     * 清除最近一次检索的结果
     */
    clearResults(): void;
    /**
     * 启用自动调整地图层级，当指定了搜索结果所展现的地图时有效
     */
    enableAutoViewport(): void;
    /**
     * 禁用自动调整地图层级
     */
    disableAutoViewport(): void;
    /**
     * 设置检索范围，参数类型可以为地图实例、坐标点或字符串。例：setLocation("北京市")
     * @param location
     */
    setLocation(location: Map | Point | string): void;
    /**
     * 设置检索结束后的回调函数。 参数： results: WalkingRouteResult
     * @param callback
     */
    setSearchCompleteCallback(callback: (result: WalkingRouteResult) => void): void;
    /**
     * 设置添加标注后的回调函数。 参数： pois: Array ，起点和目的地点数组。通过marker属性可得到其对应的标注
     * @param callback
     */
    setMarkersSetCallback(callback: (pois: LocalResultPoi[]) => void): void;
    /**
     * 设置气泡打开后的回调函数。 参数： poi: LocalResultPoi，通过其marker属性可得到当前的标注。 html: HTMLElement，气泡内的DOM元素
     * @param callback
     */
    setInfoHtmlSetCallback(callback: (poi: LocalResultPoi, html: HTMLElement) => void): void;
    /**
     * 设置添加路线后的回调函数。 参数： routes: Array ，步行线路数组，通过Route.getPolyline()方法可得到对应的折线覆盖物
     * @param callback
     */
    setPolylinesSetCallback(callback: (routes: Route[]) => void): void;
    /**
     * 设置结果列表创建后的回调函数。 参数： container: 结果列表所用的HTML元素
     * @param callback
     */
    setResultsHtmlSetCallback(callback: (container: HTMLElement) => void): void;
    /**
     * 返回状态码
     */
    getStatus(): ServiceStatusCode;
    /**
     * 返回类型说明
     */
    toString(): string;
  }

  /**
   * 此类表示路线导航的结果，没有构造函数，通过访问WalkingRoute.getResults()方法或WalkingRoute的onSearchComplete回调函数参数获得。
   */
  interface WalkingRouteResult {
    city: string;
    /**
     * 返回起点
     */
    getStart(): LocalResultPoi;
    /**
     * 返回终点
     */
    getEnd(): LocalResultPoi;
    /**
     * 返回方案个数
     */
    getNumPlans(): number;
    /**
     * 返回索引指定的方案。索引0表示第一条方案
     * @param i 索引
     */
    getPlan(i: number): RoutePlan;
  }

  /**
   * 此类表示RidingRoute构造函数的可选参数
   */
  interface RidingRouteOptions {
    /**
     * 搜索结果呈现设置
     */
    renderOptions: RenderOptions;
    /**
     * 检索完成后的回调函数。 参数： results: RidingRouteResult
     * @param results
     * @returns
     */
    onSearchComplete: (results: RidingRouteResult) => void;
    /**
     * 标注添加完成后的回调函数。 参数： pois: Array ，起点和目的地点数组，。通过marker属性可得到其对应的标注
     */
    onMarkersSet?: (pois: LocalResultPoi[]) => void;
    /**
     * 折线添加完成后的回调函数。 参数： routes: Array ，步行线路数组，通过Route.getPolyline()方法可得到对应的折线覆盖物
     */
    onPolylinesSet?: (routes: Route[]) => void;
    /**
     * 标注气泡内容创建后的回调函数。 参数： poi: LocalResultPoi，通过其marker属性可得到当前的标注。 html: HTMLElement，气泡内的DOM元素
     */
    onInfoHtmlSet?: (poi: LocalResultPoi, html: HTMLElement) => void;
    /**
     * 结果列表添加完成后的回调函数。 参数： container: 结果列表所用的HTML元素
     */
    onResultsHtmlSet?: (container: HTMLElement) => void;
  }

  /**
   * 用于获取骑行路线规划方案
   */
  class RidingRoute {
    /**
     * 创建一个骑行导航实例
     * @param location 表示检索区域，类型可为地图实例、坐标点或城市名称的字符串。当参数为地图实例时，检索位置由当前地图中心点确定；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会在该城市内进行
     * @param opts
     */
    constructor(location: Map | Point | string, opts: RidingRouteOptions);
    /**
     * 发起检索
     * @param start 起点，参数可以是关键字、坐标点（自1.1版本支持）或者LocalSearchPoi实例
     * @param end 终点，参数可以是关键字、坐标点（自1.1版本支持）或者LocalSearchPoi实例
     */
    search(start: string | Point | LocalResultPoi, end: string | Point | LocalResultPoi): void;
    /**
     * 返回最近一次检索的结果
     */
    getResults(): RidingRouteResult;
    /**
     * 清除最近一次检索的结果
     */
    clearResults(): void;
    /**
     * 启用自动调整地图层级，当指定了搜索结果所展现的地图时有效
     */
    enableAutoViewport(): void;
    /**
     * 禁用自动调整地图层级
     */
    disableAutoViewport(): void;
    /**
     * 设置检索范围，参数类型可以为地图实例、坐标点或字符串。例：setLocation("北京市")
     * @param location
     */
    setLocation(location: Map | Point | string): void;
    /**
     * 设置检索结束后的回调函数
     * @param callback
     */
    setSearchCompleteCallback(callback: (results: RidingRouteResult) => void): void;
    /**
     * 设置添加标注后的回调函数。 参数： pois: Array ，起点和目的地点数组。通过marker属性可得到其对应的标注
     * @param callback
     */
    setMarkersSetCallback(callback: (pois: LocalResultPoi[]) => void): void;
    /**
     * 设置气泡打开后的回调函数。 参数： poi: LocalResultPoi，通过其marker属性可得到当前的标注。 html: HTMLElement，气泡内的DOM元素
     * @param callback
     */
    setInfoHtmlSetCallback(callback: (pois: LocalResultPoi[]) => void): void;
    /**
     * 设置添加路线后的回调函数。 参数： routes: Array ，骑行线路数组，通过Route.getPolyline()方法可得到对应的折线覆盖物
     * @param callback
     */
    setPolylinesSetCallback(callback: (routes: Route[]) => void): void;
    /**
     * 设置结果列表创建后的回调函数。 参数： container: 结果列表所用的HTML元素
     * @param callback
     */
    setResultsHtmlSetCallback(callback: (container: HTMLElement) => void): void;
    /**
     * 返回状态码
     */
    getStatus(): ServiceStatusCode;
    /**
     * 返回类型说明
     */
    toString(): string;
  }

  /**
   * 此类表示骑行路线导航的结果，没有构造函数，通过访问RidingRoute.getResults()方法或RidingRoute的onSearchComplete回调函数参数获得
   */
  interface RidingRouteResult {
    /**
     * 返回起点
     */
    getStart(): LocalResultPoi;
    /**
     * 返回终点
     */
    getEnd(): LocalResultPoi;
    /**
     * 返回方案个数
     */
    getNumPlans(): number;
    /**
     * 返回索引指定的方案。索引0表示第一条方案
     * @param i 索引
     */
    getPlan(i: number): RoutePlan;
  }

  /**
   * 此类用于获取驾车路线规划方案
   */
  class DrivingRoute {
    /**
     * 创建一个驾车导航实例
     * @param location 表示检索区域，类型可为地图实例、坐标点或城市名称的字符串。当参数为地图实例时，检索位置由地图当前的中心点确定；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会在该城市内进行
     * @param opts
     */
    constructor(location: Map | Point | string, opts?: DrivingRouteOptions);
    /**
     * 发起检索
     * @param start 起点，参数可以是坐标点和LocalSearchPoi实例
     * @param end 终点，参数可以是坐标点或LocalSearchPoi实例
     */
    search(start: string | Point | LocalResultPoi, end: string | Point | LocalResultPoi): void;
    /**
     * 返回最近一次检索的结果
     */
    getResults(): DrivingRouteResult;
    /**
     * 清除最近一次检索的结果
     */
    clearResults(): void;
    /**
     * 启用自动调整地图层级，当指定了搜索结果所展现的地图时有效
     */
    enableAutoViewport(): void;
    /**
     * 禁用自动调整地图层级
     */
    disableAutoViewport(): void;
    setLocation(location: Map | Point | string): void;
    /**
     * 设置路线规划策略，参数为策略常量
     * @param policy
     */
    setPolicy(policy: DrivingPolicy): void;
    /**
     * 设置检索结束后的回调函数。 参数： results: DrivingRouteResult
     * @param callback
     */
    setSearchCompleteCallback(callback: (results: DrivingRouteResult) => void): void;
    /**
     * 设置添加标注后的回调函数。 参数： pois: Array，起点和目的地点数组，通过marker属性可得到其对应的标注
     * @param callback
     */
    setMarkersSetCallback(callback: (pois: LocalResultPoi[]) => void): void;
    /**
     * 设置气泡打开后的回调函数。 参数： poi: LocalResultPoi，通过marker属性可得到当前的标注。html: HTMLElement，气泡内的DOM元素
     * @param callback
     */
    setInfoHtmlSetCallback(callback: (poi: LocalResultPoi, html: HTMLElement) => void): void;
    /**
     * 设置添加路线后的回调函数。 参数： routes: Array ，驾车线路数组，通过Route.getPolyline()方法可得到对应的折线覆盖物
     * @param callback
     */
    setPolylinesSetCallback(callback: (routes: Route[]) => void): void;
    setResultsHtmlSetCallback(callback: (container: HTMLElement) => void): void;
    /**
     * 返回状态码
     */
    getStatus(): ServiceStatusCode;
    /**
     * 返回类型说明
     */
    toString(): string;
  }

  /**
   * 此类表示DrivingRoute构造函数的可选参数
   */
  interface DrivingRouteOptions {
    /**
     * 结果呈现设置
     */
    renderOptions?: RenderOptions;
    /**
     * 地图实例
     */
    map?: Map;
    /**
     * 驾车策略
     */
    policy?: DrivingPolicy;
    /**
     * 检索完成后的回调函数。参数： results: DrivingRouteResult
     */
    onSearchComplete?: (results: DrivingRouteResult) => void;
    /**
     * 标注添加完成后的回调函数。 参数： pois: Array ，起点和目的地点数组，通过marker属性可得到其对应的标注
     */
    onMarkersSet?: (pois: LocalResultPoi[]) => void;
    /**
     * 标注气泡内容创建后的回调函数。 参数： poi: LocalResultPoi，通过marker属性可得到当前的标注。html: HTMLElement，气泡内的DOM元素
     */
    onInfoHtmlSet?: (poi: LocalResultPoi, html: HTMLElement) => void;
    /**
     * 折线添加完成后的回调函数。 参数： routes: Array ，驾车线路数组，通过Route.getPolyline()方法可得到对应的折线覆盖物
     */
    onPolylinesSet?: (routes: Route[]) => void;
    onResultsHtmlSet?: (container: HTMLElement) => void;
  }

  /**
   * 此类表示路线导航的结果，没有构造函数，通过DrivingRoute.getResults()方法或DrivingRoute的onSearchComplete回调函数参数获得
   */
  interface DrivingRouteResult {
    /**
     * 驾车导航策略
     */
    policy: DrivingPolicy;
    /**
     * 途经点坐标点数组或坐标纬度经度拼接字符串，仅DrivingRouteLine支持
     */
    waypoints: Point[] | string;
    city: string;
    moreResultsUrl: string;
    taxiFare: TaxiFare;
    /**
     * 返回起点
     */
    getStart(): LocalResultPoi;
    /**
     * 返回终点
     */
    getEnd(): LocalResultPoi;
    /**
     * 返回方案个数
     */
    getNumPlans(): number;
    /**
     * 返回索引指定的方案。索引0表示第一条方案
     * @param i
     */
    getPlan(i: number): DrivingRoutePlan | RoutePlan;
  }

  type DrivingPolicy = number;

  /**
   * 此类用于获取驾车路线规划方案
   */
  class DrivingRouteLine {
    /**
     * 创建一个驾车导航实例
     * @param location 表示检索区域，类型可为地图实例、坐标点或城市名称的字符串。当参数为地图实例时，检索位置由地图当前的中心点确定；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会在该城市内进行
     * @param opts
     */
    constructor(location: Map | Point | string, opts: DrivingRouteOptions);
    /**
     * 发起检索
     * @param start  起点，参数可以是坐标点和LocalSearchPoi实例
     * @param end 终点，参数可以是坐标点或LocalSearchPoi实例，
     * @param waypoints 坐标点数组或坐标纬度经度拼接字符串。如：'39.87920464090217,116.49257333444989|39.87806279099342,116.49218746174857'
     */
    search(start: Point | LocalResultPoi, end: Point | LocalResultPoi, waypoints: Point[] | string): void;
    /**
     * 返回最近一次检索的结果
     */
    getResults(): DrivingRouteResult;
    /**
     * 清除最近一次检索的结果
     */
    clearResults(): void;
    /**
     * 启用自动调整地图层级，当指定了搜索结果所展现的地图时有效
     */
    enableAutoViewport(): void;
    /**
     * 禁用自动调整地图层级
     */
    disableAutoViewport(): void;
    /**
     * 设置路线规划策略，参数为策略常量
     */
    setPolicy(): void;
    /**
     * 设置检索结束后的回调函数。 参数： results: DrivingRouteResult
     * @param callback
     */
    setSearchCompleteCallback(callback: (results: DrivingRouteResult) => void): void;
    /**
     * 设置添加标注后的回调函数
     * @param callback
     */
    setMarkersSetCallback(callback: (pois: LocalResultPoi[]) => void): void;
    /**
     * 设置添加路线后的回调函数
     * @param callback
     */
    setPolylinesSetCallback(callback: (routes: Route[]) => void): void;
    /**
     * 返回状态码
     */
    getStatus(): ServiceStatusCode;
    /**
     * 返回类型说明
     */
    toString(): string;
    /**
     * 展示路线
     */
    showRoute(): void;
    /**
     * 隐藏路线
     */
    hideRoute(): void;
  }

  interface DrivingRoutePlan {
    /**
     * 返回方案包含的线路的个数
     */
    getNumLines(): number;
    /**
     * 返回方案中索引指定的线路。索引0表示第一条线路
     * @param i
     */
    getLine(i: number): Line;
    /**
     * 返回方案总距离
     * @param format 当format参数为true时，返回方案距离字符串（包含单位），当format为false时，仅返回数值（单位为米）信息。默认参数为true
     */
    getDistance(format: boolean): string | number;
    /**
     * 返回方案总时间
     * @param format 当format参数为true时，返回描述时间的字符串（包含单位），当format为false时，仅返回数值（单位为秒）信息。默认参数为true
     */
    getDuration(format: boolean): string | number;
    /**
     * 此路线道路收费，单位：元
     */
    getToll(): number;
    /**
     * 油费，单位元
     */
    getOilCost(): number;
  }

  /**
   * 此类表示出租车费用信息，没有构造函数，通过对象字面量形式表示
   */
  interface TaxiFare {
    /**
     * 白天费用
     */
    day: TaxiFareDetail;
    /**
     * 夜间费用。注意，部分城市没有夜间费用，此时此属性为null，且同时白天费用表示全天费用
     */
    night: TaxiFareDetail;
    /**
     * 出租车里程，单位为米
     */
    distance: number;
    /**
     * 出租车备注信息
     */
    remark: string;
  }

  /**
   * 此类表示出租车具体费用信息，没有构造函数，通过对象字面量形式表示
   */
  interface TaxiFareDetail {
    /**
     * 出租车起步价
     */
    initialFare: number;
    /**
     * 出租车单价
     */
    unitFare: number;
    /**
     * 出租车费用总价
     */
    totalFare: number;
  }

  /**
   * 此类表示一条驾车、步行或骑行出行方案。它没有构造函数，可通过DrivingRouteResult.getPlan()方法或WalkingRouteResult类的getPlan()方法获得
   */
  interface RoutePlan {
    /**
     * 返回方案包含的线路的个数
     */
    getNumRoutes(): number;
    /**
     * 返回方案中索引指定的线路。索引0表示第一条线路
     * @param i
     */
    getRoute(i: number): Route;
    /**
     * 返回方案总距离。当format参数为true时，返回方案距离字符串（包含单位），当format为false时，仅返回数值（单位为米）信息。默认参数为true
     * @param format
     */
    getDistance(format?: boolean): string | number;
    /**
     * 返回方案总时间。当format参数为true时，返回描述时间的字符串（包含单位），当format为false时，仅返回数值（单位为秒）信息。默认参数为true
     * @param format
     */
    getDuration(format?: boolean): string | number;
    getDragPois(): LocalResultPoi[];
  }

  /**
   * 此类表示一条驾车、步行或骑行路线
   */
  interface Route {
    /**
     * 返回路线包含的关键点个数
     */
    getNumRoutes(): number;
    /**
     * 返回索引指定的关键点，驾车和步行适用。索引0表示第一个关键点
     * @param i
     */
    getStep(i: number): Step;
    /**
     * 返回路线距离，当format为false时仅返回数值
     * @param format
     */
    getDistance(format?: boolean): string | number;
    /**
     * 返回本路线在方案中的索引位置
     */
    getIndex(): number;
    /**
     * 返回路线对应的覆盖物，仅当结果自动添加到地图上时有效
     */
    getPolyline(): Polyline;
    /**
     * 返回路线的地理坐标点数组
     */
    getPoints(): Point[];
    getPath(): Point[];
    /**
     * 返回路线类型，可区分是驾车还是步行线路
     */
    getRouteType(): RouteType;
  }

  /**
   * 常量表示不同的线路类型
   */
  type RouteType = number;

  /**
   * 此类表示驾车、步行或骑行路线中的一个关键点。它没有构造函数，通过Route.getStep()方法获得
   */
  interface Step {
    getPoint(): Point;
    /**
     * 返回关键点地理坐标
     */
    getPosition(): Point;
    /**
     * 返回本关键点在路线中的位置索引
     */
    getIndex(): number;
    /**
     * 返回关键点描述文本，默认包含HTML标签。当includeHtml为false时，描述文本不包含HTML标签。不支持驾车路线规划
     * @param includeHtml
     */
    getDescription(includeHtml: boolean): string;
    /**
     * 返回到下一个关键点的距离，当format为false时仅返回数值（单位为米）
     * @param format
     */
    getDistance(format?: boolean): string | number;
  }

  /**
   * 此常量用于描述对象当前状态
   */
  type HighlightModes = number;

  /**
   * 类用于获取用户的地址解析
   */
  class Geocoder {
    /**
     * 创建一个地址解析器的实例
     */
    constructor();
    /**
     * 对指定的地址进行解析。如果地址定位成功，则以地址所在的坐标点Point为参数调用回调函数。否则，回调函数的参数为null。city为地址所在的城市名，例如“北京市”
     * @param address
     * @param callback
     * @param city
     */
    getPoint(address: string, callback: (point: Point | null) => void, city: string): void;
    /**
     * 对指定的坐标点进行反地址解析。如果解析成功，则回调函数的参数为GeocoderResult对象，否则回调函数的参数为null
     * @param point
     * @param callback
     * @param opts
     */
    getLocation(point: Point, callback: (result: GeocoderResult | null) => void, opts?: LocationOptions): void;
  }

  /**
   * 此类表示Geocoder的地址解析结果。它在地址解析的回调函数的参数中返回，不可实例化
   */
  interface GeocoderResult {
    /**
     * 坐标点
     */
    point: Point;
    /**
     * 地址描述
     */
    address: string;
    /**
     * 结构化的地址描述
     */
    addressComponents: AddressComponent;
    /**
     * 附近的POI点
     */
    surroundingPoi: LocalResultPoi[];
    /**
     * 商圈字段，代表此点所属的商圈
     */
    business: string;
  }

  /**
   * 此类表示地址解析结果的层次化地址信息，没有构造函数，通过对象字面量形式表示
   */
  interface AddressComponent {
    /**
     * 门牌号码
     */
    streetNumber: string;
    /**
     * 街道名称
     */
    street: string;
    /**
     * 区县名称
     */
    district: string;
    /**
     * 城市名称
     */
    city: string;
    /**
     * 省份名称
     */
    province: string;
  }

  /**
   * 此类表示Geocoder的地址解析请求的可选参数。它不可实例化
   */
  interface LocationOptions {
    /**
     * 附近POI所处于的最大半径，默认为100米
     */
    poiRadius?: number;
    /**
     * 返回的POI点个数，默认为10个。取值范围
     */
    numPois?: number;
  }

  /**
   * 此类表示LocalCity的可选参数。它没有构造函数，但可通过对象字面量表示
   */
  interface LocalCityOptions {
    /**
     * 结果呈现设置，当给定map参数时，改地图将自动将视野定位到当前城市
     */
    renderOptions?: RenderOptions;
  }

  /**
   * 此类用于获取用户所在的城市位置信息。(根据用户IP自动定位到城市)
   */
  class LocalCity {
    /**
     * 创建一个获取本地城市位置的实例
     * @param opts
     */
    constructor(opts?: LocalCityOptions);
    /**
     * 当获取城市信息后，回调函数会被调用，其参数为类型为LocalCityResult对象
     */
    get(callback: (result: LocalCityResult) => void): void;
  }

  /**
   * 此类表示LocalCity的定位结果
   */
  interface LocalCityResult {
    /**
     * 城市所在中心点
     */
    center: Point;
    /**
     * 展示当前城市的最佳地图级别，如果您在使用此对象时提供了map实例，则地图级别将根据您提供的地图大小进行调整
     */
    level: number;
    /**
     * 城市名称
     */
    name: string;
  }

  /**
   * 返回用户当前的位置，会首先调用浏览器自带的定位接口，如果失败或不支持则调用高精IP定位（需要开通权限，否则调用普通定位）接口，如果用户拒绝授权定位，则无法返回任何定位结果
   */
  class Geolocation {
    /**
     * 创建Geolocation对象实例
     */
    constructor();
    /**
     * 返回用户当前位置。定位完成时（包括成功、失败、超时等情况），回调参数为GeolocationResult对象，否则为null
     * @param callback
     * @param opts
     */
    getCurrentPosition(callback: (result: GeolocationResult | null) => void, opts?: PositionOptions): void;
    /**
     * 定位完成后的状态码。分为BMAP_STATUS_SUCCESS，BMAP_STATUS_UNKNOWN_LOCATION，BMAP_STATUS_PERMISSION_DENIED，BMAP_STATUS_TIMEOUT
     */
    getStatus(): ServiceStatusCode;
    /**
     * 开启SDK辅助定位，仅当使用环境为移动web混合开发，且开启了定位sdk辅助定位功能后生效
     */
    enableSDKLocation(): void;
    /**
     * 关闭SDK辅助定位
     */
    disableSDKLocation(): void;
  }

  /**
   * 此类作为Geolocation的getCurrentPosition方法的回调函数参数，不可实例化
   */
  interface GeolocationResult {
    /**
     * 定位坐标点
     */
    point: Point;
    /**
     * 定位精度，单位为米
     */
    accuracy: number;
    /**
     * 根据定位坐标点解析出的地址信息，可能为空（3.0新增）
     */
    address: AddressComponent;
  }

  /**
   * 此类为getCurrentPosition的可选参数，不能实例化
   */
  interface PositionOptions {
    /**
     * 是否要求浏览器获取最佳效果，同浏览器定位接口参数。默认为false
     */
    enableHighAccuracy?: boolean;
    /**
     * 超时事件，单位为毫秒。默认为10秒
     */
    timeout?: number;
    /**
     * 允许返回指定事件内的缓存结果，单位为毫秒。如果为0，则每次请求都获取最新的定位结果。默认为10分钟
     */
    maximumAge?: number;
    /**
     * 是否开启SDK辅助定位
     */
    SDKLocation?: boolean;
  }

  /**
   * 公交路线搜索类
   */
  class BusLineSearch {
    /**
     * 创建公交线搜索类
     * @param location 表示检索区域，其类型可为地图实例、坐标点或城市名称的字符串。当参数为地图实例时，检索位置由当前地图中心点确定；当参数为坐标时，检索位置由该点所在位置确定；当参数为城市名称时，检索会在该城市内进行
     * @param opts 搜索配置项
     */
    constructor(location: Map | Point | string, opts?: BusLineSearchOptions);
    /**
     * 在用户配置的回调函数中返回公交列表结果，其类型为BusListResult
     * @param keyword
     */
    getBusList(keyword: string): void;
    /**
     * 在用户配置的回调函数中返回该条线路的公交信息，其类型为BusLine类型
     * @param busLstItem
     */
    getBusLine(busLstItem: BusListItem): void;
    /**
     * 清除本次公交线检索结果
     */
    clearResults(): void;
    /**
     * 启用自动调整地图视野功能
     */
    enableAutoViewport(): void;
    /**
     * 禁用自动调整地图视野功能
     */
    disableAutoViewport(): void;
    /**
     * 设置检索范围
     * @param location 类型可以为地图实例、坐标点或字符串
     */
    setLocation(location: Map | Point | string): void;
    /**
     * 返回状态码
     */
    getStatus(): ServiceStatusCode;
    /**
     * 返回类型说明
     */
    toString(): string;
    /**
     * 设置公交列表查询后的回调函数
     * @param callback 回调函数
     */
    setGetBusListCompleteCallback(callback: (rs: BusListResult) => void): void;
    /**
     * 设置公交线路查询后的回调函数
     * @param callback 回调函数
     */
    setGetBusLineCompleteCallback(callback: (rs: BusLine) => void): void;
    /**
     * 公交列表结果页渲染后回调函数
     * @param callback 结果列表所用的HTML元素
     */
    setBusListHtmlSetCallback(callback: (container: HTMLElement) => void): void;
    /**
     * 公交线路结果页渲染后回调函数
     * @param callback 结果列表所用的HTML元素
     */
    setBusLineHtmlSetCallback(callback: (container: HTMLElement) => void): void;
    /**
     * 添加公交线时候回调函数
     * @param callback 公交线路几何对象
     */
    setPolylinesSetCallback(callback: (ply: Polyline) => void): void;
    /**
     * 添加公交站点时候回调函数
     * @param callback 公交站坐标组成的Marker对象数组
     */
    setMarkersSetCallback(callback: (markers: Marker[]) => void): void;
  }

  /**
   * 此类表示BusLineSearch类的可选参数，没有构造参数，可以通过对象字面量表示
   */
  interface BusLineSearchOptions {
    /**
     * RenderOptions结果呈现设置
     */
    renderOptions?: RenderOptions;
    /**
     * 设置公交列表查询后的回调函数.参数：rs: BusListResult类型
     */
    onGetBusListComplete?: (rs: BusListResult) => void;
    /**
     * 设置公交线路查询后的回调函数.参数：rs: BusLine类型
     */
    onGetBusLineComplete?: (rs: BusLine) => void;
    /**
     * 公交列表结果页渲染后回调函数.参数：container: HTMLElement，结果列表所用的HTML元素
     */
    onBusListHtmlSet?: (container: HTMLElement) => void;
    /**
     * 公交线路结果页渲染后回调函数.参数：container: HTMLElement，结果列表所用的HTML元素
     */
    onBusLineHtmlSet?: (container: HTMLElement) => void;
    /**
     * 添加公交线时候回调函数.参数：ply:Polyline 公交线路几何对象
     */
    onPolylinesSet?: (ply: Polyline) => void;
    /**
     * 添加公交站点时候回调函数.参数：sts:Array 公交站坐标组成的Marker对象数组
     */
    onMarkersSet?: (sts: Marker[]) => void;
  }

  /**
   * 公交列表查询成功回调函数的参数对象
   */
  interface BusListResult {
    /**
     * 本次检索关键字
     */
    keyword: string;
    /**
     * 本次检索所在城市
     */
    city: string;
    /**
     * 到百度地图查看url
     */
    moreResultsUrl: string;
    /**
     * 公交列表个数
     */
    getNumBusList(): number;
    /**
     * 获取某一个具体的公交列表中的对象。0表示上行，1表示下行
     * @param i
     */
    getBusListItem(i: number): BusListItem;
  }

  /**
   * 表示公交线路结果的公交线，没有构造函数，通过检索回调函数获得
   */
  interface BusLine {
    /**
     * 线路名称
     */
    name: string;
    /**
     * 首班车时间
     */
    startTime: string;
    /**
     * 末班车时间
     */
    endTime: string;
    /**
     * 公交线路所属公司
     */
    company: string;
    /**
     * 获取公交站点个数
     */
    getNumBusStations(): string;
    /**
     * 获取某一个具体的公交站对象
     * @param i
     */
    getBusStation(i: number): BusStation;
    /**
     * 返回公交线地理坐标点数组
     */
    getPath(): Point[];
    /**
     * 获取公交线几何对象, 仅当结果自动添加到地图上时有效
     */
    getPolyline(): Polyline;
  }

  /**
   * 此类表示一条公交线路，如果是跨城检索，还有可能表示一条飞机、火车或大巴线路。没有构造函数，通过TransitRoutePlan.getLine()方法得到
   */
  interface Line {
    /**
     * 线路全称
     */
    title: string;
    /**
     * 线路类型
     */
    type: LineType;
    /**
     * 返回公交线路途径的车站个数，仅在公交和地铁类型有效
     */
    getNumViaStops(): number;
    /**
     * 返回上车站
     */
    getGetOnStop(): LocalResultPoi;
    /**
     * 返回下车站
     */
    getGetOffStop(): LocalResultPoi;
    getPoints(): Point[];
    /**
     * 返回线路对应的地理坐标点数组，在公交方案中，地理坐标只给出方案涉及的部分
     */
    getPath(): Point[];
    /**
     * 返回公交线路对应的折线覆盖物
     */
    getPolyline(): Polyline;
    /**
     * 当format为true时，返回本段公交线路的距离字符串（包含单位），当format为false时仅返回数值（单位为米）。默认参数为true
     * @param format
     */
    getDistance(format?: boolean): string | number;
  }

  /**
   * 一个具体公交对象
   */
  interface BusListItem {
    /**
     * 公交线名称
     */
    name: string;
  }

  /**
   * 公交站点对象
   */
  interface BusStation {
    /**
     * 站点名称
     */
    name: string;
    /**
     * 站点坐标
     */
    position: Point;
  }

  /**
   * 本类是Autocomplete类的可选参数对象
   */
  interface AutocompleteOptions {
    /**
     * 设定返回结果的所属范围。例如“北京市”
     */
    location?: string | Map | Point;
    /**
     * 返回数据类型。两种设置方式，第一种为默认值（即设置值为空），将返回所有数据。如地图初始化为北京，在输入框中输入“小”，输入框下会出现包含“小”关键字的多种类型（如餐饮、地名等）的提示词条。第二种设置值为"city"，将返回省市区县乡镇街道地址类型数据。如地图初始化为北京，在输入框中输入“小”，输入框下会出现“小金县”的地点名称类的提示词条
     */
    types?: string[];
    /**
     * 在input框中输入字符后，发起列表检索，完成后的回调函数。 参数：AutocompleteResult
     */
    onSearchComplete?: (result: AutocompleteResult) => void;
    /**
     * 文本输入框元素或其id
     */
    input?: string | HTMLElement;
  }

  /**
   * Autocomplete是结果提示、自动完成类
   */
  class Autocomplete {
    /**
     * 创建自动完成的实例
     * @param opts
     */
    constructor(opts?: AutocompleteOptions);
    /**
     * 显示提示列表
     */
    show(): void;
    /**
     * 隐藏提示列表
     */
    hide(): void;
    /**
     * 修改请求数据类型。types定义方法详见AutocompleteOptions
     * @param types
     */
    setTypes(types: string[]): void;
    /**
     * 设置检索区域
     * @param location
     */
    setLocation(location: string | Map | Point): void;
    /**
     * 发起某个关键字的提示请求，会引起onSearchComplete的回调
     * @param keywords
     */
    search(keywords: string): void;
    /**
     * 获取结果列表
     */
    getResults(): AutocompleteResult;
    /**
     * 设置绑定的input控件的值，且不会出现下拉列表
     * @param keyword
     */
    setInputValue(keyword: string): void;
    /**
     * 销毁自动完成对象
     */
    dispose(): void;
    // addEventListener(event: 'locationSuccess' | 'locationError', callback: (e: any) => void): void;
    // removeEventListener(event: 'locationSuccess' | 'locationError', callback: (e: any) => void): void;
    /**
     * 回车选中某条记录后触发 item : { index : 1 高亮的记录，所属返回结果的index ,value : {} 结果数据，见AutocompleteResultPoi }
     */
    onconfirm: (event: { type: string; target: any; item: any }) => void;
    /**
     * 键盘或者鼠标移动，某条记录高亮之后，触发 fromitem: { 上一条记录的信息 index : 2 高亮的记录，所属返回结果的index ,value : {} 结果数据，见AutocompleteResultPoi }, toitem : { 当前记录的信息，与fromitem结构一致}
     */
    onhighlight: (event: { type: string; target: any; fromitem: any; toitem: any }) => void;
  }

  /**
   * 自动完成类获取的单个POI点的信息
   */
  interface AutocompleteResultPoi {
    /**
     * 省名
     */
    province: string;
    /**
     * 城市名
     */
    city: string; // The offical doc says `City`, but actual code is `city`
    /**
     * 区县名称
     */
    district: string;
    /**
     * 街道名称
     */
    street: string;
    /**
     * 门牌号码
     */
    streetNumber: string;
    /**
     * 商户名
     */
    business: string;
  }

  /**
   * 自动完成检索完成回调函数的参数对象
   */
  interface AutocompleteResult {
    /**
     * 检索关键字
     */
    keyword: string;
    /**
     * 结果数组
     * @param i
     */
    getPoi(i: number): AutocompleteResultPoi;
    /**
     * 结果总数
     */
    getNumPois(): number;
  }

  /**
   * 此类表示一个行政区域的边界
   */
  class Boundary {
    /**
     * 创建行政区域搜索的对象实例
     */
    constructor();
    /**
     * 返回行政区域的边界。 name: 查询省、直辖市、地级市、或县的名称。 callback:执行查询后，数据返回到客户端的回调函数，数据以回调函数的参数形式返回。返回结果是一个数组，数据格式如下： arr[0] = "x1, y1; x2, y2; x3, y3; ..." arr[1] = "x1, y1; x2, y2; x3, y3; ..." arr[2] = "x1, y1; x2, y2; ..." … 否则回调函数的参数为null
     * @param name
     * @param callback
     */
    get(name: string, callback: (result: string[]) => void): void;
  }

  class TrafficControl {
    constructor();
    setPanelOffset(offset: Size): void;
    show(): void;
    hide(): void;
  }

  class Convertor {
    translate(
      points: Point[],
      from: number,
      to: number,
      callback: (result: { points: Point[]; status: number }) => void,
    ): void;
  }

  type ServiceStatusCode = number;
}

/**
 * 一般位置点
 */
declare const BMAP_POI_TYPE_NORMAL: BMapGL.PoiType;
/**
 * 公交车站位置点
 */
declare const BMAP_POI_TYPE_BUSSTOP: BMapGL.PoiType;
/**
 * 地铁车站位置点
 */
declare const BMAP_POI_TYPE_SUBSTOP: BMapGL.PoiType;

/**
 * 推荐方案
 */
declare const BMAP_TRANSIT_POLICY_RECOMMEND: BMapGL.TransitPolicy;
/**
 * 最少时间
 */
declare const BMAP_TRANSIT_POLICY_LEAST_TIME: BMapGL.TransitPolicy;
/**
 * 最少换乘
 */
declare const BMAP_TRANSIT_POLICY_LEAST_TRANSFER: BMapGL.TransitPolicy;
/**
 * 最少步行
 */
declare const BMAP_TRANSIT_POLICY_LEAST_WALKING: BMapGL.TransitPolicy;
/**
 * 不乘地铁
 */
declare const BMAP_TRANSIT_POLICY_AVOID_SUBWAYS: BMapGL.TransitPolicy;
/**
 * 优先地铁
 */
declare const BMAP_TRANSIT_POLICY_FIRST_SUBWAYS: BMapGL.TransitPolicy;

/**
 * 时间短
 */
declare const BMAP_INTERCITY_POLICY_LEAST_TIME: BMapGL.IntercityPolicy;
/**
 * 出发早
 */
declare const BMAP_INTERCITY_POLICY_EARLY_START: BMapGL.IntercityPolicy;
/**
 * 价格低
 */
declare const BMAP_INTERCITY_POLICY_CHEAP_PRICE: BMapGL.IntercityPolicy;

/**
 * 火车优先
 */
declare const BMAP_TRANSIT_TYPE_POLICY_TRAIN: BMapGL.TransitTypePolicy;
/**
 * 飞机优先
 */
declare const BMAP_TRANSIT_TYPE_POLICY_AIRPLANE: BMapGL.TransitTypePolicy;
/**
 * 大巴优先
 */
declare const BMAP_TRANSIT_TYPE_POLICY_COACH: BMapGL.TransitTypePolicy;

/**
 * 国内市内换乘
 */
declare const BMAP_TRANSIT_TYPE_IN_CITY: BMapGL.TransitType;
/**
 * 国内跨城换乘
 */
declare const BMAP_TRANSIT_TYPE_CROSS_CITY: BMapGL.TransitType;

/**
 * 公交车
 */
declare const BMAP_LINE_TYPE_BUS: BMapGL.TransitType;
/**
 * 地铁
 */
declare const BMAP_LINE_TYPE_SUBWAY: BMapGL.TransitType;
/**
 * 轮渡
 */
declare const BMAP_LINE_TYPE_FERRY: BMapGL.TransitType;
/**
 * 火车
 */
declare const BMAP_LINE_TYPE_TRAIN: BMapGL.TransitType;
/**
 * 飞机
 */
declare const BMAP_LINE_TYPE_AIRPLANE: BMapGL.TransitType;
/**
 * 大巴
 */
declare const BMAP_LINE_TYPE_COACH: BMapGL.TransitType;

/**
 * 默认
 */
declare const BMAP_DRIVING_POLICY_DEFAULT: BMapGL.DrivingPolicy;
/**
 * 优先高速
 */
declare const BMAP_DRIVING_POLICY_FIRST_HIGHWAYS: BMapGL.DrivingPolicy;
/**
 * 避开高速
 */
declare const BMAP_DRIVING_POLICY_AVOID_HIGHWAYS: BMapGL.DrivingPolicy;
/**
 * 避开拥堵
 */
declare const BMAP_DRIVING_POLICY_AVOID_CONGESTION: BMapGL.DrivingPolicy;

/**
 * 驾车线路
 */
declare const BMAP_ROUTE_TYPE_DRIVING: BMapGL.RouteType;
/**
 * 步行线路
 */
declare const BMAP_ROUTE_TYPE_WALKING: BMapGL.RouteType;
/**
 * 骑行线路
 */
declare const BMAP_ROUTE_TYPE_RIDING: BMapGL.RouteType;

/**
 * 驾车结果展现中点击列表后的展现点步骤
 */
declare const BMAP_HIGHLIGHT_STEP: BMapGL.HighlightModes;
/**
 * 驾车结果展现中点击列表后的展现路段
 */
declare const BMAP_HIGHLIGHT_ROUTE: BMapGL.HighlightModes;

declare const BMAP_STATUS_SUCCESS: BMapGL.ServiceStatusCode;
declare const BMAP_STATUS_CITY_LIST: BMapGL.ServiceStatusCode;
declare const BMAP_STATUS_UNKNOWN_LOCATION: BMapGL.ServiceStatusCode;
declare const BMAP_STATUS_UNKNOWN_ROUTE: BMapGL.ServiceStatusCode;
declare const BMAP_STATUS_INVALID_KEY: BMapGL.ServiceStatusCode;
declare const BMAP_STATUS_INVALID_REQUEST: BMapGL.ServiceStatusCode;
declare const BMAP_STATUS_PERMISSION_DENIED: BMapGL.ServiceStatusCode;
declare const BMAP_STATUS_TIMEOUT: BMapGL.ServiceStatusCode;
