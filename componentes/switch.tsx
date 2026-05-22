import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, PressableProps } from "react-native";

interface SwitchProps extends Omit<PressableProps, "onPress"> {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export default function Switch({
  value,
  onValueChange,
  disabled = false,
  className = "",
  ...props
}: SwitchProps) {
  const animation = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: value ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
  }, [value]);

  // Posición del círculo
  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26],
  });

  // Color del fondo
  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#637089", "#2C3E66"],
  });

  // Escala del círculo
  const thumbScale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const handleToggle = () => {
    if (disabled) return;
    onValueChange(!value);
  };

  return (
    <Pressable
      onPress={handleToggle}
      disabled={disabled}
      hitSlop={8}
      className={className}
      style={({ pressed }) => ({
        opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
      })}
      {...props}
    >
      <Animated.View
        style={{
          width: 52,
          height: 32,
          borderRadius: 16,
          backgroundColor,
          justifyContent: "center",
          paddingHorizontal: 2,
        }}
      >
        <Animated.View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: "#E8EEF9",
            transform: [{ translateX }, { scale: thumbScale }],
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 1 },
            elevation: 2,
          }}
        />
      </Animated.View>
    </Pressable>
  );
}
