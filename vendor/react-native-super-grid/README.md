# React Native Super Grid [modified version]

## modify part
pass container style to renderItem function, so width can get to calculate height of grid

![npm version](https://img.shields.io/npm/v/react-native-super-grid.svg?colorB=brightgreen&style=flat-square)
![npm download](https://img.shields.io/npm/dt/react-native-super-grid.svg?style=flat-square)




Responsive Grid View for React Native.


## Getting Started

This library export two components - FlatGrid (similar to FlatList) and SectionGrid (similart to SecionList). Both components render a Grid layout that adapts itself to various screen resolutions.

Instead of passing an itemPerRow argument, you pass ```itemDimension``` and each item will be rendered with a dimension size equal to or more than (to fill the screen) the given dimension.

Internally, these components use the native [FlatList](https://facebook.github.io/react-native/docs/flatlist.html) and [SectionList](https://facebook.github.io/react-native/docs/sectionlist.html).


**Version 2.x and older, please refer [v2 branch](https://github.com/saleel/react-native-super-grid/tree/v2) for documentation**  
  

### Installing

You can install the package via npm.

```
npm install react-native-super-grid
```



### Usage (FlatGrid)
```javascript
import { FlatGrid } from 'react-native-super-grid';
```
```javascript
<FlatGrid
  itemDimension={130}
  items={[1,2,3,4,5,6]}
  renderItem={({ item }) => (<Text>{item}</Text>)}
/>
```


### Usage (SectionGrid)

```javascript
import { SectionGrid } from 'react-native-super-grid';
```
```javascript
<SectionGrid
  itemDimension={130}
  sections={[
    {
      title: 'Numbers',
      data: [1,2,3,4,5,6],
    },
    {
      title: 'Albhabets',
      data: ['A', 'B', 'C', 'D', 'E'],
    },
  ]}
  renderItem={({ item }) => (<Text>{item}</Text>)}
  renderSectionHeader={({ section }) => (
    <Text style={{ fontSize: 20 }}>{section.title}</Text>
  )}
/>
```


#### Properties

| Property | Type | Default Value | Description |
|---|---|---|---|
| renderItem | Function |  | Function to render each object. Should return a react native component. Same signature as that of FlatList/SectionList's renderItem (with an additional key `rowIndex`).  |
| items (for FlatGrid) sections (for SectionGrid)  | Array |  | Items to be rendered. renderItem will be called with each item in this array. Same signature as that of FlatList/SectionList. |  |
| itemDimension | Number | 120  | Minimum width or height for each item in pixels (virtual). |
| fixed | Boolean | false  | If true, the exact ```itemDimension``` will be used and won't be adjusted to fit the screen. |
| spacing | Number | 10 | Spacing between each item. |
| style | [FlatList](https://facebook.github.io/react-native/docs/flatlist.html) styles (Object) |  | Styles for the container. Styles for an item should be applied inside ```renderItem```. |
| itemContainerStyle | styles (Object) | | Style for item's container. Not needed for most cases.
| staticDimension | Number | undefined | Specifies a static width or height for the container. If not passed, full width/height of the screen will be used.|
| horizontal | boolean | false | If true, the grid will be scrolling horizontally. If you want your item to fill the height when using a horizontal grid, you should give it a height of '100%'. This prop doesn't affect the SectionGrid, which only scrolls vertically. |
| onLayout | Function |  | Optional callback ran by the internal `FlatList` or `SectionList`'s `onLayout` function, thus invoked on mount and layout changes. |
| listKey | String | undefined | A unique identifier for the Grid. This key is necessary if you are nesting multiple FlatGrid/SectionGrid inside another Grid (or any VirtualizedList).|

All additional props you pass will be passed on to the internal FlatList/SectionList. This means you can make use of various props and methods like `ListHeaderComponent`, `onEndReached`, `onRefresh`...etc. While these are not tested for compatibility, most of them should work as expected.

In **SectionGrid**, `section` argument in methods like `renderSectionHeader`, `renderSectionFooter`, `ItemSeparatorComponent` will slightly different from the actual section you passed. The `data` key in the `section` will be the grouped versions of items (items that go in one row), and the original list of items can be found in `originalData` key. All other keys will remain intact.



## v2 to v3 Migration

The major API change in v3 was renaming the components to `FlatGrid` and `SectionGrid` and making the `renderItem` signature to match with `FlatList` and `SectionList`.


So instead of 
```javascript
import GridView from 'react-native-super-grid';
import { SuperGridSectionList } from 'react-native-super-grid';
```
use
```javascript
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
```

Also change the renderItem function parameters from
```javascript
<GridView
  items={[1,2,3,4,5,6]}
  renderItem={(item, index) => (<Text>{item}</Text>)}
/>
```
to
```javascript
<FlatGrid
  items={[1,2,3,4,5,6]}
  renderItem={({ item, index }) => (<Text>{item}</Text>)}
/>
```


## FlatGrid Example
```javascript
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

export default class Example extends Component {
  render() {
    const items = [
      { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
      { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
      { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
      { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
      { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
      { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
      { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
      { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
      { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
      { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
    ];

    return (
      <FlatGrid
        itemDimension={130}
        items={items}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({ item, index }) => (
          <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
          </View>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

```



| ![iPhone6 Portrait](/screenshots/iphone6_portrait.png?raw=true "iPhone6 Portrait")| ![iPhone6 Landscape](/screenshots/iphone6_landscape.png?raw=true "iPhone6 Landscape") |
|:---:|:---:|
| iPhone6 Portrait | iPhone6 Landscape  |

| ![iPad Air 2 Portrait](/screenshots/ipadair2_portrait.png?raw=true "iPad Air 2 Portrait") | ![iPad Air 2 Landscape](/screenshots/ipadair2_landscape.png?raw=true "iPad Air 2 Landscape") |
|:---:|:---:|
| iPad Air 2 Portrait | iPad Air 2 Landscape  |

| ![Android Portrait](/screenshots/android_portrait.png?raw=true "Android Portrait") | ![Android Landscape](/screenshots/android_landscape.png?raw=true "Android Landscape") |
|:---:|:---:|
| Android Portrait | Android Landscape  |

| ![Android Horizontal Portrait](/screenshots/android_horizontal_portrait.png?raw=true "Android Horizontal Portrait") | ![Android Horizontal Landscape](/screenshots/android_horizontal_landscape.png?raw=true "Android Horizontal Landscape") |
|:---:|:---:|
| Android Horizontal Portrait | Android Horizontal Landscape  |

| ![iPhone Horizontal Portrait](/screenshots/iphone_horizontal_portrait.png?raw=true "iPhone Horizontal Portrait")| ![iPhone Horizontal Landscape](/screenshots/iphone_horizontal_landscape.png?raw=true "iPhone Horizontal Landscape") |
|:---:|:---:|
| iPhone Horizontal Portrait | iPhone Horizontal Landscape  |

## SectionGrid Example
```javascript
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SectionGrid } from 'react-native-super-grid';

export default class Example extends Component {
  render() {
    const items = [
      { name: 'TURQUOISE', code: '#1abc9c' },
      { name: 'EMERALD', code: '#2ecc71' },
      { name: 'PETER RIVER', code: '#3498db' },
      { name: 'AMETHYST', code: '#9b59b6' },
      { name: 'WET ASPHALT', code: '#34495e' },
      { name: 'GREEN SEA', code: '#16a085' },
      { name: 'NEPHRITIS', code: '#27ae60' },
      { name: 'BELIZE HOLE', code: '#2980b9' },
      { name: 'WISTERIA', code: '#8e44ad' },
      { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
      { name: 'SUN FLOWER', code: '#f1c40f' },
      { name: 'CARROT', code: '#e67e22' },
      { name: 'ALIZARIN', code: '#e74c3c' },
      { name: 'CLOUDS', code: '#ecf0f1' },
      { name: 'CONCRETE', code: '#95a5a6' },
      { name: 'ORANGE', code: '#f39c12' },
      { name: 'PUMPKIN', code: '#d35400' },
      { name: 'POMEGRANATE', code: '#c0392b' },
      { name: 'SILVER', code: '#bdc3c7' },
      { name: 'ASBESTOS', code: '#7f8c8d' },
    ];

    return (
      <SectionGrid
        itemDimension={90}
        // staticDimension={300}
        // fixed
        // spacing={20}
        sections={[
          {
            title: 'Title1',
            data: items.slice(0, 6),
          },
          {
            title: 'Title2',
            data: items.slice(6, 12),
          },
          {
            title: 'Title3',
            data: items.slice(12, 20),
          },
        ]}
        style={styles.gridView}
        renderItem={({ item, section, index }) => (
          <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  sectionHeader: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'center',
    backgroundColor: '#636e72',
    color: 'white',
    padding: 10,
  },
});
```
| ![iPhone SectionGrid Portrait](/screenshots/iphone_section_grid_portrait.png?raw=true "iPhone SectionGrid Portrait")| ![iPhone6 Landscape](/screenshots/iphone_section_grid_landscape.png?raw=true "iPhone6 Landscape") |
|:---:|:---:|
| iPhone SectionGrid Portrait | iPhone6 Landscape  |

## License
g
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.



## Changelog

### [3.0.7] - 2019-06-29
- Add listKey prop @josemiguelo

### [3.0.6] - 2019-05-18
- Fix type definitions @zhigang1992

### [3.0.5] - 2019-05-04
- Fix type definitions @zhigang1992

### [3.0.4] - 2019-04-16
- Fix type definitions @hisankaran

### [3.0.3] - 2019-02-25
- Fix type definitions @jgbernalp

### [3.0.2] - 2019-02-20
- Fix calculation bug where itemsPerRow became zero (#81).

### [3.0.1] - 2019-02-02
- Fix in section key passed to various SectionGrid props.

### [3.0.0] - 2019-01-20
- Rename components, FlatList renderItem signature, Performance improvements.

### [2.4.3] - 2018-07-22
- Fix deep copying issue in SectionGrid @andersonaddo

### [2.4.2] - 2018-07-21
- Add itemContainerStyle prop @KseniaSecurity

### [2.4.1] - 2018-07-07
- Add onLayout prop @ataillefer

### [2.4] - 2018-05-11
- renderItem index fix @andersonaddo

### [2.3.2] - 2018-05-23
- Typescript support for SuperGridSectionList @Anccerson

### [2.3.0] - 2018-03-17
#### Added
- Add SuperGridSectionList @andersonaddo

### [2.1.0] - 2018-03-17
#### Added
- Use FlastList instead of ListView
- Fix spacing issues

### [2.0.2] - 2018-01-11
#### Added
- Allow dynamic update of itemDimension

### [2.0.1] - 2017-12-13
#### Added
- Fixed render empty section headers Warning. @mannycolon

### [2.0.0] - 2017-12-02
#### Added
- Add ability to have a horizontal grid. @Sh3rawi


### [1.1.0] - 2017-11-03 (Target React Native 0.49+)
#### Added
- Replace view.propTypes to ViewPropTypes for 0.49+. @caudaganesh


### [1.0.4] - 2017-10-09
#### Added
- Optional staticWidth prop @thejettdurham.
- Use prop-types package instead of deprecated react's PropTypes.


### [1.0.3] - 2017-06-06
#### Added
- Pass row index to renderItem @heaversm.



## Acknowledgments

Colors in the example from https://flatuicolors.com/.

Screenshot Mockup generated from https://mockuphone.com.
