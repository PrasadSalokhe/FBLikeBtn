import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Animated,
  Text,
  FlatList,
} from 'react-native';

import {BtnEmojiData} from '../constants';

const HoverBar = ({setBtnData, setBtnClicked}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const animatedVal = useRef(new Animated.Value(0)).current;
  const opacityVal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityVal, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [opacityVal]);

  const onPressIn = index => {
    setSelectedIndex(index);
    Animated.timing(animatedVal, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(animatedVal, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start(() => setSelectedIndex(null));
  };

  const onPress = item => {
    Animated.timing(animatedVal, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setSelectedIndex(null);
      setBtnData(item);
      setBtnClicked(false);
    });
  };

  const scale = animatedVal.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });

  const renderPressableEmoji = ({item, index}) => {
    const {emoji, description} = item;
    return (
      <Animated.View style={{opacity: opacityVal}}>
        <Pressable
          style={styles.pressable}
          onPress={() => onPress(item)}
          onPressIn={() => onPressIn(index)}
          onPressOut={() => onPressOut(index)}>
          {selectedIndex === index && (
            <Text style={styles.description}>{description}</Text>
          )}
          <Animated.Text
            style={[
              styles.emoji,
              selectedIndex === index && {transform: [{scale: scale}]},
            ]}>
            {emoji}
          </Animated.Text>
        </Pressable>
      </Animated.View>
    );
  };

  const emojiKeyExtractor = item => item.emoji.toString();

  return (
    <View style={styles.container}>
      <View style={styles.emojiContainer}>
        <FlatList
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          data={BtnEmojiData}
          keyExtractor={emojiKeyExtractor}
          renderItem={renderPressableEmoji}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  emojiContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'lightblue',
    borderRadius: 32,
    width: '80%',
  },
  description: {
    marginBottom: 8,
    fontSize: 12,
  },
  emoji: {
    fontSize: 16,
    marginRight: 14,
    lineHeight: 36,
  },
  pressable: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
  },
});

export default HoverBar;
