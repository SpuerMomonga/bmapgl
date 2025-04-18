declare namespace BMapGL {
  /**
   * 此类表示右键菜单。您可以在地图上添加自定义内容的右键菜单
   */
  class ContextMenu {
    /**
     * 创建一个右键菜单实例
     */
    constructor();
    /**
     * 添加菜单项
     */
    addItem(item: MenuItem): void;
    /**
     * 返回指定索引位置的菜单项，第一个菜单项的索引为0
     */
    getItem(index: number): MenuItem;
    /**
     * 移除菜单项
     */
    removeItem(item: MenuItem): void;
    /**
     * 添加分隔符
     */
    addSeparator(): void;
    /**
     * 移除指定索引位置的分隔符，第一个分隔符的索引为0
     */
    removeSeparator(index: number): void;
    // onopen: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
    // onclose: (event: { type: string; target: any; point: Point; pixel: Pixel }) => void;
  }

  /**
   * 此类表示MenuItem构造函数的可选参数。它没有构造函数，但可通过对象字面量形式表示
   */
  interface MenuItemOptions {
    /**
     * 指定此菜单项的宽度，菜单以最长的菜单项宽度为准
     */
    width?: number;
    /**
     * 指定此菜单项dom的id
     */
    id?: string;
    iconUrl?: string;
  }

  /**
   * 此类表示一个菜单项
   */
  class MenuItem {
    /**
     * 创建一个菜单项。当菜单项被点击时，系统将会以当前菜单弹出的地理坐标点作为参数调用回调函数callback
     */
    constructor(text: string, callback: (point: Point) => void, opts?: MenuItemOptions);
    /**
     * 设置菜单项显示的文本
     */
    setText(text: string): void;
    setIcon(iconUrl: string): void;
    /**
     * 启用菜单项
     */
    enable(): void;
    /**
     * 禁用菜单项
     */
    disable(): void;
  }
}
