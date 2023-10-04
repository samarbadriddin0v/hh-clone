import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, filterJobTypes, icons } from "../../constants";

export default function Search() {
  const [activeJobType, setActiveJobType] = useState("Full-time");
  const [term, setTerm] = useState("");

  const router = useRouter();

  const onPress = (item) => {
    setActiveJobType(item);
    router.push(`/search/${item}`);
  };

  const onSearchPress = () => {
    if (term.trim().length === 0) return;
    router.push(`/search/${term}`);
  };

  return (
    <View>
      {/* Search input container */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
            value={term}
            onChangeText={(text) => setTerm(text)}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={onSearchPress}>
          <Image
            source={icons.search}
            style={styles.searchBtnIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Filter container */}
      <View style={styles.filterContainer}>
        <FlatList
          data={filterJobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.filter(activeJobType, item)}
              onPress={() => onPress(item)}
            >
              <Text style={styles.filterTitle(activeJobType, item)}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `filter-job-${item}`}
          contentContainerStyle={{ columnGap: SIZES.xSmall }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.xLarge,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    fontFamily: FONTS.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnIcon: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  filterContainer: {
    alignItems: "center",
    marginTop: SIZES.large,
  },
  filter: (activeFilterJob, item) => ({
    paddingVertical: 6,
    paddingHorizontal: SIZES.small,
    borderWidth: 1,
    borderColor:
      activeFilterJob === item ? COLORS.secondary : COLORS.lightWhite,
    backgroundColor:
      activeFilterJob === item ? COLORS.secondary : COLORS.lightWhite,
  }),
  filterTitle: (activeFilterJob, item) => ({
    color: activeFilterJob === item ? COLORS.white : COLORS.gray,
    fontFamily: FONTS.bold,
  }),
});
