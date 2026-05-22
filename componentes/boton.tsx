import React, { ReactNode, useRef } from "react";
import {
  Animated,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

interface BotonProps extends PressableProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  scaleTo?: number;
  duration?: number;
}

export default function Boton({
  children,
  style,
  containerStyle,
  scaleTo = 0.96,
  duration = 100,
  onPressIn,
  onPressOut,
  ...props
}: BotonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animar = (toValue: number) => {
    Animated.timing(scale, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        containerStyle,
        {
          transform: [{ scale }],
        },
      ]}
    >
      <Pressable
        {...props}
        style={style}
        onPressIn={(e) => {
          animar(scaleTo);
          onPressIn?.(e);
        }}
        onPressOut={(e) => {
          animar(1);
          onPressOut?.(e);
        }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
