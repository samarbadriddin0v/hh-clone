import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { SIZES, SHADOWS, COLORS, FONTS } from "../../constants";

export default function JobCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <TouchableOpacity style={styles.imgWrapper}>
        <Image
          source={{
            uri: item?.employer_logo
              ? item.employer_logo
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO0-uMT750aKUESYouIjtAZkT13UALJtvxz2V1&s=0",
          }}
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textWrapper}>
        <Text style={styles.jobName}>{item?.job_title}</Text>
        <Text style={styles.jobType}>{item?.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  imgWrapper: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  textWrapper: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
  },
  jobType: {
    fontSize: SIZES.small,
    marginTop: SIZES.small / 2,
    fontFamily: FONTS.regular,
    textTransform: "capitalize",
    color: COLORS.gray,
  },
});
