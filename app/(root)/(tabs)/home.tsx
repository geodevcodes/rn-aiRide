import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import icons from "@/constants/icons";
import RideSummary from "@/components/RideSummary";
import Search from "@/components/Search";
import images from "@/constants/images";

import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";

const Home = () => {
  const { user } = useUser();
  console.log(user, "this is user details");
  return (
    <SafeAreaView className="bg-general-500 h-full">
      <View>
        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        </SignedIn>
        <SignedOut>
          <Link href="/(auth)/sign-in">
            <Text>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text>Sign up</Text>
          </Link>
        </SignedOut>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between my-5">
          <Text className="text-3xl font-JakartaBold">
            Welcome {user?.emailAddresses[0].emailAddress}
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/sign-in")}
            className="p-4 rounded-full bg-white shadow-xs"
          >
            <Image source={icons.logout} className="size-6" />
          </TouchableOpacity>
        </View>

        <Search />
        <View className="mt-8">
          <Text className="text-xl font-JakartaBold mb-4">
            Your current location
          </Text>
          <Image
            source={images.availableCarMap}
            resizeMode="cover"
            className="w-full h-[310px] rounded-2xl"
          />
        </View>

        <View className="mt-8">
          <Text className="text-xl font-JakartaBold mb-4">Recent Rides</Text>
          <View className="flex flex-col gap-6">
            <RideSummary />
            <RideSummary />
            <RideSummary />
            <RideSummary />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
