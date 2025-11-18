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

// import React, { useRef, useState } from "react";
// import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
// import { AppleMaps, GoogleMaps } from "expo-maps";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useImage } from "expo-image";
// import { GoogleMapsMapType } from "expo-maps/build/google/GoogleMaps.types";

// const SF_ZOOM = 12;

// const Home = () => {
//   // const bottom = useBottomTabOverflow();
//   const [locationIndex, setLocationIndex] = useState(0);
//   const ref = useRef<AppleMaps.MapView>(null);

//   const image = useImage("https://picsum.photos/128", {
//     onError(error) {
//       console.error(error);
//     },
//   });

//   const renderMapControls = () => (
//     <>
//       <View style={{ flex: 8 }} pointerEvents="none" />

//       <View style={styles.controlsContainer} pointerEvents="auto"></View>
//     </>
//   );

//   if (Platform.OS === "ios") {
//     return (
//       <>
//         <SafeAreaView pointerEvents="box-none">
//           <View>
//             <Text>Hello this is ios</Text>
//           </View>
//         </SafeAreaView>
//       </>
//     );
//   } else if (Platform.OS === "android") {
//     return (
//       <>
//         <GoogleMaps.View
//           ref={ref}
//           style={StyleSheet.absoluteFill}
//           // cameraPosition={cameraPosition}
//           properties={{
//             isBuildingEnabled: true,
//             isIndoorEnabled: true,
//             mapType: GoogleMapsMapType.TERRAIN,
//             selectionEnabled: true,
//             isMyLocationEnabled: false, // requires location permission
//             isTrafficEnabled: true,
//             // minZoomPreference: 1,
//             // maxZoomPreference: 20,
//           }}
//           // 3
//           polylines={[
//             {
//               color: "red",
//               width: 20,
//               coordinates: polylineCoordinates,
//             },
//           ]}
//           // 4
//           markers={markersGoogle}
//           onPolylineClick={(event) => {
//             console.log(event);
//             Alert.alert("Polyline clicked", JSON.stringify(event));
//           }}
//           onMapLoaded={() => {
//             console.log(JSON.stringify({ type: "onMapLoaded" }, null, 2));
//           }}
//           onMapClick={(e) => {
//             console.log(
//               JSON.stringify({ type: "onMapClick", data: e }, null, 2)
//             );
//           }}
//           onMapLongClick={(e) => {
//             console.log(
//               JSON.stringify({ type: "onMapLongClick", data: e }, null, 2)
//             );
//           }}
//           onPOIClick={(e) => {
//             console.log(
//               JSON.stringify({ type: "onPOIClick", data: e }, null, 2)
//             );
//           }}
//           onMarkerClick={(e) => {
//             console.log(
//               JSON.stringify({ type: "onMarkerClick", data: e }, null, 2)
//             );
//           }}
//           onCameraMove={(e) => {
//             console.log(
//               JSON.stringify({ type: "onCameraMove", data: e }, null, 2)
//             );
//           }}
//         />
//         {renderMapControls()}
//       </>
//     );
//   } else {
//     return <Text>Maps are only available on Android and iOS</Text>;
//   }
// };

// const styles = StyleSheet.create({
//   controlsContainer: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
// });

// export default Home;
// const markersGoogle = [
//   {
//     coordinates: { latitude: 49.259133, longitude: -123.10079 },
//     title: "49th Parallel Café & Lucky's Doughnuts - Main Street",
//     snippet: "49th Parallel Café & Lucky's Doughnuts - Main Street",
//     draggable: true,
//   },
//   {
//     coordinates: { latitude: 49.268034, longitude: -123.154819 },
//     title: "49th Parallel Café & Lucky's Doughnuts - 4th Ave",
//     snippet: "49th Parallel Café & Lucky's Doughnuts - 4th Ave",
//     draggable: true,
//   },
//   {
//     coordinates: { latitude: 49.286036, longitude: -123.12303 },
//     title: "49th Parallel Café & Lucky's Doughnuts - Thurlow",
//     snippet: "49th Parallel Café & Lucky's Doughnuts - Thurlow",
//     draggable: true,
//   },
//   {
//     coordinates: { latitude: 49.311879, longitude: -123.079241 },
//     title: "49th Parallel Café & Lucky's Doughnuts - Lonsdale",
//     snippet: "49th Parallel Café & Lucky's Doughnuts - Lonsdale",
//     draggable: true,
//   },
//   {
//     coordinates: {
//       latitude: 49.27235336018808,
//       longitude: -123.13455838338278,
//     },
//     title: "A La Mode Pie Café - Granville Island",
//     snippet: "A La Mode Pie Café - Granville Island",
//     draggable: true,
//   },
// ];

// const polylineCoordinates = [
//   { latitude: 33.8121, longitude: -117.919 }, // Disneyland
//   { latitude: 33.837, longitude: -117.912 },
//   { latitude: 33.88, longitude: -117.9 },
//   { latitude: 33.9456, longitude: -117.8735 },
//   { latitude: 34.0, longitude: -117.85 },
//   { latitude: 34.05, longitude: -117.82 },
//   { latitude: 34.1, longitude: -117.78 },
//   { latitude: 34.2, longitude: -118.0 },
//   { latitude: 34.2222, longitude: -118.1234 },
//   { latitude: 34.233, longitude: -118.2 },
//   { latitude: 34.2355, longitude: -118.3 },
//   { latitude: 34.1367, longitude: -118.2942 }, // Hollywood
//   { latitude: 34.1341, longitude: -118.3215 }, // Hollywood Sign
// ];
