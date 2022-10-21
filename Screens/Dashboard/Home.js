import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import {
  IconButton,
  TextButton,
  VerticalCourseCard,
  IconLabel,
  Line,
  CategoryCard,
  HorizontalCourseCard,
} from '../../Components';
import {FlatList} from 'react-native-gesture-handler';
import {FONTS, SIZES, icons, images, dummyData, COLORS} from '../../constants';

const Section = ({containerStyle, title, onPress, children}) => {
  return (
    <View
      style={{
        ...containerStyle,
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
        }}>
        <Text
          style={{
            flex: 1,
            ...FONTS.h2,
          }}>
          {title}
        </Text>
        <TextButton
          contentContainerStyle={{
            width: 80,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
          }}
          label="See All"
          onPress={onPress}
        />
      </View>
      {children}
    </View>
  );
};

const Home = () => {
  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          marginBottom: 5,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <Text style={{...FONTS.h2}}>Hello, ByProGammer!</Text>
          <Text style={{color: COLORS.gray50, ...FONTS.body3}}>
            ThursDay, 19th Sept 2022
          </Text>
        </View>
        <IconButton
          icon={icons.notification}
          iconStyle={{
            tintColor: COLORS.black,
            padding: 10,
          }}
        />
      </View>
    );
  }
  function renderStartLearning() {
    return (
      <ImageBackground
        source={images.featured_bg_image}
        style={{
          alignItems: 'center',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 15,
        }}
        imageStyle={{
          borderRadius: SIZES.radius,
        }}>
        <View>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body2,
            }}>
            HOW TO
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}>
            Make your brand more visible with our checklist
          </Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              color: COLORS.white,
              ...FONTS.body4,
            }}>
            By NhatQuang
          </Text>
        </View>
        <Image
          source={images.start_learning}
          style={{
            width: '100%',
            height: 110,
            marginTop: SIZES.padding,
          }}
        />
        <TextButton
          label="Start Learning"
          contentContainerStyle={{
            height: 40,
            paddingHorizontal: SIZES.padding,
            borderRadius: 20,
            backgroundColor: COLORS.white,
          }}
          labelStyle={{
            color: COLORS.black,
          }}
        />
      </ImageBackground>
    );
  }
  function renderCourse() {
    return (
      <FlatList
        horizontal
        data={dummyData.courses_list_1}
        listKey="Course"
        keyExtractor={item => `Course-${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        renderItem={({item, index}) => (
          <VerticalCourseCard
            containerStyle={{
              marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index == dummyData.courses_list_1.length - 1
                  ? SIZES.padding
                  : 0,
            }}
            course={item}
          />
        )}
      />
    );
  }
  function renderCategories() {
    return (
      <Section title="Categories">
        <FlatList
          horizontal
          data={dummyData.categories}
          listKey="Categories"
          keyExtractor={item => `Categories-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({item, index}) => (
            <CategoryCard
              category={item}
              containerStyle={{
                marginLeft: index == 0 ? SIZES.padding : SIZES.base,
                marginRight:
                  index == dummyData.categories.length - 1 ? SIZES.padding : 0,
              }}
            />
          )}
        />
      </Section>
    );
  }
  function renderPopularCourse() {
    return (
      <Section
        title="Popolar Course"
        containerStyle={{
          marginTop: 20,
        }}>
        <FlatList
          data={dummyData.courses_list_2}
          listKey="Popular Course"
          scrollEnabled={false}
          keyExtractor={item => `PopularCourse-${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding,
          }}
          renderItem={({item, index}) => (
            <HorizontalCourseCard
              course={item}
              containerStyle={{
                marginVertical: SIZES.padding,
                marginTop: index == 0 ? SIZES.radius : SIZES.padding,
              }}
            />
          )}
        />
      </Section>
    );
  }
  // <ScrollView horizontal={true} style={{flex:1,width: '100%'}}></ScrollView>
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <ScrollView
        style={{
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}>
        {renderStartLearning()}
        {renderCourse()}
        <Line
          lineStyle={{
            marginVertical: SIZES.padding,
          }}
        />
        {renderCategories()}
        {renderPopularCourse()}
      </ScrollView>
    </View>
  );
};
export default Home;
