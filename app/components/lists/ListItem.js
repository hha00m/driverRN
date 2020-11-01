import React, { PureComponent } from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../AppText";
import colors from "../../config/colors";
export default class ListItem extends PureComponent {
  render() {
    return (
      <Swipeable renderRightActions={this.props.renderRightActions}>
        <TouchableHighlight
          underlayColor={colors.light}
          onPress={this.props.onPress}
        >
          <View style={styles.container}>
            <MaterialCommunityIcons
              color={colors.medium}
              name="chevron-left"
              size={25}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {this.props.title}
              </Text>
              {this.props.subTitle && (
                <Text style={styles.subTitle} numberOfLines={1}>
                  {this.props.subTitle}
                </Text>
              )}
              {this.props.date && (
                <Text style={styles.subTitle} numberOfLines={1}>
                  {this.props.date}
                </Text>
              )}
            </View>
            {this.props.IconComponent}
            {this.props.image && (
              <Image style={styles.image} source={this.props.image} />
            )}
          </View>
        </TouchableHighlight>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: "center",
  },
  image: {
    width: 40,
    height: 40,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 12,
    paddingTop: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
