import * as React from "react";
import {
  ViewStyle,
  ListRenderItemInfo,
  SectionListRenderItemInfo,
  SectionListData,
  StyleProp,
  RefreshControlProps,
} from 'react-native';

/**
 * React Native Super Grid Properties
 */
export interface FlatGridProps<ItemType = any> {
  /**
   * Function to render each object. Should return a react native component.
   */
  renderItem: (info: ListRenderItemInfo<ItemType>) => JSX.Element;
  /**
   * Items to be rendered. renderItem will be called with each item in this array.
   */
  items: ItemType[];

  /**
   * Minimum width or height for each item in pixels (virtual).
   */
  itemDimension?: number;

  /**
   * If true, the exact itemDimension will be used and won't be adjusted to fit the screen.
   */
  fixed?: boolean;

  /**
   * Spacing between each item.
   */
  spacing?: number;

  /**
   * Rendered when the list is empty.
   */
  ListEmptyComponent?: React.ComponentType<any> | React.ReactElement | null;

  /**
   * Rendered at the very end of the list.
   */
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;

  /**
   * Rendered at the very beginning of the list.
   */
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;

  /**
   * Called once when the scroll position gets within onEndReachedThreshold of the rendered content.
   */
  onEndReached?: ((info: { distanceFromEnd: number }) => void) | null;

  /**
   * How far from the end (in units of visible length of the list) the bottom edge of the
   * list must be from the end of the content to trigger the `onEndReached` callback.
   * Thus a value of 0.5 will trigger `onEndReached` when the end of the content is
   * within half the visible length of the list.
   */
  onEndReachedThreshold?: number | null;

  /**
   * A RefreshControl component, used to provide pull-to-refresh
   * functionality for the ScrollView.
   */
  refreshControl?: React.ReactElement<RefreshControlProps>;

  /**
   * If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality.
   * Make sure to also set the refreshing prop correctly.
   */
  onRefresh?: (() => void) | null;

  /**
   * Style
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Specifies the style about content row view
   */
  itemContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Specifies a static width or height for the GridView container.
   * If your container dimension is known or can be calculated at runtime
   * (via Dimensions.get('window'), for example), passing this prop will force the grid container
   * to that dimension size and avoid the reflow associated with dynamically calculating it
   */
  staticDimension?: number;

  /**
   * If true, the grid will be scrolling horizontally
   */
  horizontal?: boolean;

  /**
   * Optional callback ran by the internal `FlatList` or `SectionList`'s `onLayout` function,
   * thus invoked on mount and layout changes.
   */
  onLayout?: Function;

  /**
   * Used to extract a unique key for a given item at the specified index. Key is used for caching
   * and as the react key to track item re-ordering. The default extractor checks `item.key`, then
   * falls back to using the index, like React does.
   */
  keyExtractor?: (item: ItemType[], index: number) => string;

  /**
   * A unique identifier for the Grid. This key is necessary if you are nesting multiple
   * FlatGrid/SectionGrid inside another Grid (or any VirtualizedList)
   */
  listKey?: string;
}

/**
 * Responsive Grid View for React Native.
 */
export class FlatGrid<ItemType = any> extends React.Component<
  FlatGridProps<ItemType>
> {}

export interface SectionGridProps<ItemType = any> {
  renderItem: (info: SectionListRenderItemInfo<ItemType>) => JSX.Element;
  sections: ItemType;
  itemDimension?: number;
  fixed?: boolean;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
  staticDimension?: number;
  renderSectionHeader?: (info: { section: SectionListData<ItemType> }) => JSX.Element;
  onLayout?: Function;
  listKey?: string;
}

export class SectionGrid<ItemType = any> extends React.Component<
  SectionGridProps<ItemType>
> {}
