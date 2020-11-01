import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Icon from "../Icon";
import Text from "../AppText";
import colors from "../../config/colors";

export default class ReportCard extends PureComponent {
  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    return (
      <Swipeable renderRightActions={this.props.renderRightActions}>
        <View
          style={{
            alignSelf: "center",
            width: "90%",
            height: 80,
            paddingTop: 10,
          }}
        >
          <View
            style={[
              styles.container,
              {
                backgroundColor: colors.white,
              },
            ]}
          >
            <TouchableHighlight
              style={{ width: "87%", height: "100%" }}
              underlayColor={colors.light}
              onPress={this.props.onPress}
            >
              <View
                style={{ width: "100%", height: "100%", flexDirection: "row" }}
              >
                <View style={styles.detailsContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    {this.props.item.in_date}
                  </Text>
                  {this.props.item.driver_price && (
                    <Text style={styles.subTitle} numberOfLines={1}>
                      {this.numberWithCommas(this.props.item.driver_price)}
                    </Text>
                  )}
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    {this.props.item.orders} طلبية
                  </Text>
                  {this.props.item.driver_price && (
                    <Text style={styles.subTitle} numberOfLines={1}>
                      {this.numberWithCommas(
                        this.props.item.total - this.props.item.driver_price
                      )}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableHighlight>

            <TouchableWithoutFeedback onPress={this.props.onPress}>
              <Icon
                backgroundColor={colors.returned}
                name="file-pdf"
                size={60}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    paddingRight: 20,
    paddingTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    flexDirection: "row-reverse",
    backgroundColor: colors.white,
    borderRadius: 5,
    borderTopLeftRadius: 35,
    borderBottomLeftRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    width: "100%",
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
    flex: 1,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
