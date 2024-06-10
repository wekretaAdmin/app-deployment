import {useRef, useEffect} from 'react';
import {Animated} from 'react-native';
const useShakeAnimation = () => {
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const handleShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: false,
      }),
    ]).start();
  };
  const animatedStyle = {
    transform: [{translateX: shakeAnimation}],
  };
  useEffect(() => {
    // Cleanup animation on unmount if needed
    return () => {
      shakeAnimation.setValue(0);
    };
  }, []);
  return {handleShake, animatedStyle};
};
export default useShakeAnimation;
