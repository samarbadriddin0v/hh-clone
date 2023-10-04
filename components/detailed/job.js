import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES, icons } from "../../constants";

export default function Job({ companyLogo, jobTitle, companyName, location }) {
  return (
    <View style={styles.conatiner}>
      <View style={styles.imgBox}>
        <Image
          source={{
            uri: companyLogo
              ? companyLogo
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO0-uMT750aKUESYouIjtAZkT13UALJtvxz2V1&s=0",
          }}
          style={styles.logoImage}
        />
      </View>

      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{jobTitle}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{companyName}</Text>
        <View style={styles.locationBox}>
          <Image
            style={styles.locationImage}
            source={icons.location}
            resizeMode="contain"
          />
          <Text style={styles.locationName}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    marginVertical: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  imgBox: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: SIZES.large,
  },
  logoImage: {
    width: "80%",
    height: "80%",
  },
  jobTitleBox: {
    marginTop: SIZES.small,
  },
  jobTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    textAlign: "center",
  },
  companyInfoBox: {
    marginTop: SIZES.small / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  companyName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.primary,
    fontFamily: FONTS.medium,
  },
  locationBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationImage: {
    width: 14,
    height: 14,
    tintColor: COLORS.gray,
  },
  locationName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    marginLeft: 2,
  },
});
