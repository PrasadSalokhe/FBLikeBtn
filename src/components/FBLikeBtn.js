import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import HoverBar from './HoverBar';

const FBLikeBtn = () => {
  const [btnClicked, setBtnClicked] = useState(false);
  const [btnData, setBtnData] = useState(null);

  const _onPress = () => {
    setBtnClicked(!btnClicked);
  };

  const _onReset = () => {
    setBtnData(null);
    setBtnClicked(false);
  };

  return (
    <View style={styles.container}>
      {btnClicked && (
        <View style={styles.relative}>
          <HoverBar setBtnData={setBtnData} setBtnClicked={setBtnClicked} />
        </View>
      )}
      <TouchableOpacity
        onPress={_onPress}
        style={[styles.btnContainer, !!btnData && styles.btnClicked]}>
        {btnData ? (
          <Text>
            <Text>{btnData.emoji} </Text>
            <Text> {btnData.description}</Text>
          </Text>
        ) : (
          <>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Facebook_Thumb_icon.svg/1200px-Facebook_Thumb_icon.svg.png',
              }}
              style={styles.likeIcon}
            />
            <Text style={styles.likeText}>Like</Text>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.reset} onPress={_onReset}>
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIcon: {
    height: 24,
    width: 24,
  },
  likeText: {
    fontSize: 14,
  },
  relative: {
    position: 'relative',
    bottom: 10,
  },
  btnClicked: {
    backgroundColor: 'lightblue',
  },
  reset: {
    marginTop: 16,
  },
});

export default FBLikeBtn;
