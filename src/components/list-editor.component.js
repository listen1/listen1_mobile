import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SortableListView from 'react-native-sortable-listview';

// const data = {
//   k1: { text: 'world1', key: 'k1' },
//   k2: { text: 'world2', key: 'k2' },
//   k3: { text: 'world3', key: 'k3' },
//   k4: { text: 'world4', key: 'k4' },
// };

class RowComponent extends React.PureComponent {
  props: {
    sortHandlers: Object,
    data: Object,
    selected: Boolean,
    onRowPress: Function,
    renderRow: Function,
  };
  render() {
    return (
      <TouchableOpacity
        underlayColor="#eee"
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        onPress={this.props.onRowPress}
        // {...this.props.sortHandlers}
      >
        <View style={{ height: 50 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                flex: 0,
                flexBasis: 50,
                width: 50,
              }}
            >
              <Icon
                name={
                  this.props.data.selected
                    ? 'check-box'
                    : 'check-box-outline-blank'
                }
                size={30}
                color={this.props.data.selected ? '#333' : '#d2d2d2'}
              />
            </View>

            {this.props.renderRow(this.props.data)}
            <TouchableWithoutFeedback
              style={{
                flex: 0,
                flexBasis: 50,
                width: 50,
              }}
              {...this.props.sortHandlers}
            >
              <Icon name="reorder" size={30} color="#d2d2d2" />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

function swapElement(a, f, t) {
  let from = f;
  let to = t;

  if (from > to) {
    from = t;
    to = f;
  }

  return [
    ...a.slice(0, from),
    a[to],
    ...a.slice(from + 1, to),
    a[from],
    ...a.slice(to + 1),
  ];
}

export class ListEditor extends React.Component {
  props: {
    renderRow: Function,
    data: Object,
    onChange: Function,
  };
  constructor(props) {
    super(props);
    this.onRowPress = this.onRowPress.bind(this);
    this.onDeletePress = this.onDeletePress.bind(this);
    this.onRowMoved = this.onRowMoved.bind(this);
    // this.onSave = this.onSave.bind(this);
    const dataMap = new Map();

    this.props.data.forEach(item => {
      dataMap[item.id] = Object.assign({}, item, {
        selected: false,
        key: item.id,
      });
    });

    const order = Object.keys(dataMap); // Array of keys

    this.state = { data: dataMap, order };
  }

  onRowPress(row) {
    const newState = {
      data: {
        ...this.state.data,
        [row.key]: {
          ...this.state.data[row.key],
          selected: !this.state.data[row.key].selected,
        },
      },
    };

    this.setState(newState);
  }
  onDeletePress() {
    const toDeleted = {};
    const newData = {};

    Object.keys(this.state.data).forEach(key => {
      if (this.state.data[key].selected) {
        toDeleted[key] = true;
      } else {
        newData[key] = this.state.data[key];
      }
    });

    const newOrder = this.state.order.filter(i => toDeleted[i] !== true);

    this.setState({ data: newData, order: newOrder }, () => {
      this.props.onChange(this.getData());
    });
  }
  onRowMoved(e) {
    this.setState(
      { order: swapElement(this.state.order, e.from, e.to) },
      () => {
        this.props.onChange(this.getData());
      }
    );
  }
  //   onSave() {
  //     // console.log(this.getData());
  //   }
  getData() {
    const result = [];

    this.state.order.forEach(key => {
      const item = this.state.data[key];

      result.push(
        Object.assign({}, item, { key: undefined, selected: undefined })
      );
    });

    return result;
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SortableListView
          style={{ flex: 1 }}
          data={this.state.data}
          order={this.state.order}
          onRowMoved={e => {
            this.onRowMoved(e);
          }}
          activeOpacity={1}
          moveOnPressIn
          sortRowStyle={{ backgroundColor: '#ddd' }}
          renderRow={row => (
            <RowComponent
              data={row}
              onRowPress={() => {
                this.onRowPress(row);
              }}
              renderRow={this.props.renderRow}
            />
          )}
        />
        <View
          style={{
            backgroundColor: '#eee',
            flex: 0,
            flexBasis: 70,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity onPress={this.onDeletePress}>
            <View
              style={{
                flex: 0,
                flexBasis: 70,
                width: 70,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="delete-forever" size={30} color="#d2d2d2" />
              <Text> 删除 </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={this.onSave}>
            <View
              style={{
                flex: 0,
                flexBasis: 60,
                width: 60,
                backgroundColor: '#f00',
                alignItems: 'center',
              }}
            >
              <Icon name="delete-forever" size={30} color="#d2d2d2" />
              <Text> 保存 </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}
