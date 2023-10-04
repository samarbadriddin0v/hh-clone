import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, FONTS, SIZES, icons, SHADOWS } from "../../constants";
import { useRouter } from "expo-router";

export default function MyJobCard({ item, selectedJob, setSelectedJob }) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/details/${item?.job_id}`);
    setSelectedJob(item?.job_id);
  };

  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item?.job_id)}
      onPress={handlePress}
    >
      <View style={styles.employerWrapper}>
        <View style={styles.employerHeader}>
          <Image
            source={{
              uri: item?.employer_logo
                ? item.employer_logo
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO0-uMT750aKUESYouIjtAZkT13UALJtvxz2V1&s=0",
            }}
            style={styles.employerLogo}
          />
          <Text style={styles.employerTitle}>
            {item?.employer_name.length >= 20
              ? item?.employer_name.slice(0, 20) + "..."
              : item?.employer_name}
          </Text>
        </View>
        <TouchableOpacity style={styles.heartBtnWrapper}>
          <Image
            source={icons.heart}
            style={styles.heartIcon(selectedJob, item.job_id)}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item.job_id)}>
          {item?.job_title}
        </Text>

        <View style={styles.infoWrapper}>
          <Text style={styles.info1(selectedJob, item.job_id)}>
            Employer type -{" "}
          </Text>
          <Text style={styles.info2}>{item?.job_employment_type}</Text>
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.info1(selectedJob, item.job_id)}>
            {item?.job_publisher} -{" "}
          </Text>
          <Text style={styles.info2}>{item?.job_country}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: (selectedJob, job_id) => ({
    width: "100%",
    marginTop: SIZES.medium,
    padding: SIZES.xLarge,
    backgroundColor: selectedJob === job_id ? COLORS.secondary : COLORS.white,
    borderRadius: SIZES.medium,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  employerLogo: {
    width: 50,
    height: 50,
  },
  employerWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  heartIcon: (selectedJob, job_id) => ({
    width: 20,
    height: 20,
    tintColor: selectedJob === job_id ? COLORS.white : COLORS.primary,
  }),
  employerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.xSmall,
  },
  employerTitle: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  infoContainer: {
    marginTop: SIZES.medium,
  },
  jobName: (selectedJob, job_id) => ({
    fontSize: SIZES.large,
    fontFamily: FONTS.bold,
    color: selectedJob === job_id ? COLORS.white : COLORS.secondary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: SIZES.small / 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  info1: (selectedJob, job_id) => ({
    fontSize: SIZES.medium,
    fontFamily: FONTS.medium,
    color: selectedJob === job_id ? COLORS.gray2 : COLORS.primary,
  }),
  info2: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
});
