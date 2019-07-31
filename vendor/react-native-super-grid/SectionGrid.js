import React, { Component } from 'react';
import {
  View, Dimensions, ViewPropTypes, SectionList,
} from 'react-native';
import PropTypes from 'prop-types';
import { generateStyles, calculateDimensions, chunkArray } from './utils';

class SectionGrid extends Component {
  constructor(props) {
    super(props);
    this.onLayout = this.onLayout.bind(this);
    this.renderRow = this.renderRow.bind(this);

    const { staticDimension } = props;

    // Calculate total dimensions and set to state
    let totalDimension = staticDimension;
    if (!staticDimension) {
      totalDimension = Dimensions.get('window').width;
    }

    this.state = {
      totalDimension,
    };
  }

  onLayout(e) {
    const { staticDimension, onLayout } = this.props;
    const { totalDimension } = this.state;

    if (!staticDimension) {
      const { width: newTotalDimension } = e.nativeEvent.layout || {};

      if (totalDimension !== newTotalDimension) {
        this.setState({
          totalDimension: newTotalDimension,
        });
      }
    }

    // call onLayout prop if passed
    if (onLayout) {
      onLayout(e);
    }
  }

  renderRow({
    rowItems,
    rowIndex,
    section,
    itemsPerRow,
    rowStyle,
    separators,
    isFirstRow,
    containerStyle,
  }) {
    const { spacing, itemContainerStyle, renderItem } = this.props;

    // Add spacing below section header
    let additionalRowStyle = {};
    if (isFirstRow) {
      additionalRowStyle = {
        marginTop: spacing,
      };
    }

    return (
      <View style={[rowStyle, additionalRowStyle]}>
        {rowItems.map((item, i) => (
          <View
            key={`item_${(rowIndex * itemsPerRow) + i}`}
            style={[containerStyle, itemContainerStyle]}
          >
            {renderItem({
              item,
              index: (rowIndex * itemsPerRow) + i,
              section,
              separators,
              rowIndex,
            })}
          </View>
        ))}
      </View>
    );
  }

  render() {
    const {
      sections,
      style,
      spacing,
      fixed,
      itemDimension,
      staticDimension,
      renderItem,
      onLayout,
      ...restProps
    } = this.props;

    const { totalDimension } = this.state;

    const { containerDimension, itemsPerRow, fixedSpacing } = calculateDimensions({
      itemDimension,
      staticDimension,
      totalDimension,
      spacing,
      fixed,
    });

    const { containerStyle, rowStyle } = generateStyles({
      itemDimension,
      containerDimension,
      spacing,
      fixedSpacing,
      fixed,
    });

    const groupedSections = sections.map((section) => {
      const chunkedData = chunkArray(section.data, itemsPerRow);

      return {
        ...section,
        data: chunkedData,
        originalData: section.data,
      };
    });


    return (
      <SectionList
        sections={groupedSections}
        renderItem={({ item, index, section }) => this.renderRow({
          rowItems: item,
          rowIndex: index,
          section,
          isFirstRow: index === 0,
          itemsPerRow,
          rowStyle,
          containerStyle,
        })}
        keyExtractor={(_, index) => `row_${index}`}
        style={style}
        onLayout={this.onLayout}
        ref={(sectionList) => { this.sectionList = sectionList; }}
        {...restProps}
      />
    );
  }
}

SectionGrid.propTypes = {
  renderItem: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(PropTypes.any).isRequired,
  itemDimension: PropTypes.number,
  fixed: PropTypes.bool,
  spacing: PropTypes.number,
  style: ViewPropTypes.style,
  itemContainerStyle: ViewPropTypes.style,
  staticDimension: PropTypes.number,
  onLayout: PropTypes.func,
  listKey: PropTypes.string,
};

SectionGrid.defaultProps = {
  fixed: false,
  itemDimension: 120,
  spacing: 10,
  style: {},
  itemContainerStyle: undefined,
  staticDimension: undefined,
  onLayout: null,
  listKey: undefined,
};

export default SectionGrid;
