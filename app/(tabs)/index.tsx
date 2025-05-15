
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { useHeaderHeight } from "@react-navigation/elements"
import  Colors  from '@/constants/Colors';
import CategoryButtons from '@/components/CategoryButtons'
import Listings from '@/components/Listings'
import listingData from "@/data/destinations.json"
import GroupListings from '@/components/GroupListings'
import groupData from "@/data/groups.json"



const Page = () => {
  const headerHeight = useHeaderHeight()
  const [category,setCategory] = useState("All")
  const onCatChanged = (category: string) => {
    setCategory(category)
    console.log("category",category)
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => { }}
              style={{ marginLeft: 20 }}
            >
              <Image
                source={{
                  uri: "https://avatars.githubusercontent.com/u/175510529?v=4&size=64",
                }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => { }}
              style={{
                marginRight: 20,
                backgroundColor: Colors.white,
                padding: 10,
                borderRadius: 15,
                shadowColor: "#171717",
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,

              }}
            >
              <Ionicons name="notifications" size={20} color={Colors.black} />

            </TouchableOpacity>
          )
        }}
      />

      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headingTxt}>Explore The Beautiful World!</Text>
        
        <View style={styles.searchSectionWrapper}>

          <View style={styles.searchbar}>
            <Ionicons 
            name="search" 
            size={18} 
            style={{marginRight:5 }}
            color={Colors.black} />
            <TextInput placeholder='Search...'  />
          </View>
          <TouchableOpacity
            onPress={() => { }}
            style={styles.filterBtn}
          >
            <Ionicons name="options" size={28} color={Colors.white}/>
          </TouchableOpacity>

        </View>

       <CategoryButtons onCagtegoryChanged={onCatChanged}/>

       <Listings listings={listingData} category={category}/>

       <GroupListings listings={groupData}/>
       </ScrollView>
      </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,

  },
  headingTxt: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.black,
    marginTop: 10,
  },
  searchSectionWrapper: {
    flexDirection:"row",
    marginVertical: 20,
  },
  searchbar:{
    flex:1,
    flexDirection:"row",
    padding:16,
    backgroundColor:Colors.white,
    borderRadius: 10,
  },
  filterBtn:{
    backgroundColor: Colors.primaryColor,
    padding: 12,
    borderRadius: 10,
    marginLeft:20,
  },
})