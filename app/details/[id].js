import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import { COLORS, SIZES, icons, tabs } from "../../constants";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import HeaderBtn from "../../components/shared/header-btn";
import useRequest from "../../hook/useRequest";
import {
  About,
  Footer,
  Job,
  JobTabs,
  Qualification,
  Responsibility,
} from "../../components";

export default function Details() {
  const params = useGlobalSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, error, refetch } = useRequest("job-details", {
    job_id: params.id,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return <About info={data[0].job_description ?? "No data provided"} />;
      case "Qualifications":
        return (
          <Qualification
            info={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "Responsibilities":
        return (
          <Responsibility
            info={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitle: "",
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerLeft: () => (
            <HeaderBtn
              icon={icons.left}
              dimensions={"60%"}
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <HeaderBtn icon={icons.share} dimensions={"60%"} />
          ),
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size={"small"} color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>No data available</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: SIZES.large }}>
              <Job
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <View style={{ marginBottom: 30 }}>{renderTabContent()}</View>
            </View>
          )}
        </ScrollView>

        <Footer
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com/jobs/results/"
          }
        />
      </>
    </SafeAreaView>
  );
}
