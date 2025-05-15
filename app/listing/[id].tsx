import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'

import listingData from '@/data/destinations.json';
import { ListingType } from '@/Types/listingType';
import { Stack } from 'expo-router';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Animated, { interpolate, SlideInDown, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from "react-native-reanimated"



const { width } = Dimensions.get("window")
const IMG_HEIGHT = 300




const ListingDetails = () => {
    const { id } = useLocalSearchParams()
    const listing = (listingData as ListingType[]).find((item) => item.id.toString() === id);

    if (!listing) {
        return <Text>Listing not found</Text>;
    }
    const route = useRouter()

    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const imageAnimatedStyle = useAnimatedStyle(() => {
        'worklet'
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
                    ),
                },

                {
                    scale:interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1]
                    ),
                },
            ],
        }
    })


    return (
        <>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerTitle: "",
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => route.back()}
                            style={{
                                backgroundColor: "rgba(255,255,255,0.5)",
                                borderRadius: 10,
                                padding: 4
                            }}
                        >
                            <View style={{
                                backgroundColor: Colors.white,
                                padding: 6,
                                borderRadius: 10,
                            }}>
                                <Feather name="arrow-left" size={30} />
                            </View>


                        </TouchableOpacity>
                    ),

                    headerRight: () => (
                        <TouchableOpacity onPress={() => { }}
                            style={{
                                backgroundColor: "rgba(255,255,255,0.5)",
                                borderRadius: 10,
                                padding: 4
                            }}
                        >
                            <View style={{
                                backgroundColor: Colors.white,
                                padding: 6,
                                borderRadius: 10,
                            }}>
                                <Ionicons name="bookmark-outline" size={20} />
                            </View>


                        </TouchableOpacity>

                    )
                }}

            />
            <View style={styles.container}>
                <Animated.ScrollView ref={scrollRef} contentContainerStyle={{paddingBottom: 150}}>
                <Animated.Image source={{ uri: listing.image }} style={[styles.image, imageAnimatedStyle]} />
                <View style={styles.contentWrapper}>
                    <Text style={styles.listingName}>{listing.name}</Text>
                    <View style={styles.listingLocationWrapper}>
                        <FontAwesome5 name="map-marker-alt" size={18} color={Colors.primaryColor} />
                        <Text style={styles.listingLocationTxt}>{listing.location}</Text>
                    </View>

                    <View style={styles.highlightWrapper}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.highlightIcon}>
                                <Ionicons name="time" size={18} color={Colors.primaryColor} />
                            </View>

                            <View>
                                <Text style={styles.highlightTxt}>Duration</Text>
                                <Text style={styles.highlightTxtVal}>{listing.duration} Days</Text>
                            </View>
                        </View>


                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.highlightIcon}>
                                <FontAwesome name="users" size={18} color={Colors.primaryColor} />
                            </View>

                            <View>
                                <Text style={styles.highlightTxt}>Person</Text>
                                <Text style={styles.highlightTxtVal}>{listing.duration}</Text>
                            </View>
                        </View>


                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.highlightIcon}>
                                <Ionicons name="time" size={18} color={Colors.primaryColor} />
                            </View>

                            <View>
                                <Text style={styles.highlightTxt}>Rating</Text>
                                <Text style={styles.highlightTxtVal}>{listing.rating}</Text>
                            </View>
                        </View>

                    </View>


                    <Text style={styles.listingDetail}>{listing.description}</Text>
                </View>
                </Animated.ScrollView>
            </View>

            <Animated.View style={styles.footer} entering={SlideInDown.delay(250)}>
                <TouchableOpacity
                onPress={() => {}}
                style={[styles.footerBtn,styles.footerBookBtn]}
                >
                    <Text style={styles.footerBtnTxt}>Book Now</Text>

                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => {}}
                style={styles.footerBtn}
                >
                    <Text style={styles.footerBtnTxt}>${listing.price}</Text>

                </TouchableOpacity>

            </Animated.View>
        </>
    )
}

export default ListingDetails

const styles = StyleSheet.create({
    image: {
        width: width,
        height: IMG_HEIGHT
    },
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },

    contentWrapper: {
        padding: 20,
        backgroundColor: Colors.white

    },
    listingName: {
        fontSize: 24,
        fontWeight: "500",
        color: Colors.black,
        letterSpacing: 0.5
    },
    listingLocationWrapper: {
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 10,
        alignItems: "center"
    },
    listingLocationTxt: {
        fontSize: 14,
        marginLeft: 5,
        color: Colors.black
    },
    highlightWrapper: {
        flexDirection: "row",
        marginVertical: 20,
        justifyContent: "space-between"
    },
    highlightIcon: {
        backgroundColor: "#F4F4F4",
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 8,
        marginRight: 5,
        alignItems: "center"
    },
    highlightTxt: {
        fontSize: 12,
        color: "#999"
    },
    highlightTxtVal: {
        fontSize: 14,
        fontWeight: "600"
    },
    listingDetail: {
        fontSize: 16,
        color: Colors.black,
        lineHeight: 25,
        letterSpacing: 0.5
    },
    footer:{
        
        position:"absolute",
        flexDirection:"row",
        bottom:0,
        padding: 20,
        paddingBottom: 30,
        width: width,
    },
    footerBtn : {
        flex: 1,
        backgroundColor: Colors.black,
        padding: 20,
        borderRadius: 10,
        alignItems: "center"
    },
    footerBookBtn:{
        flex: 2,
        backgroundColor: Colors.primaryColor,
        marginRight: 20

    },
    footerBtnTxt:{
        color: Colors.white,
        fontSize: 16,
        fontWeight: "600",
        textTransform: "uppercase"
    }
})