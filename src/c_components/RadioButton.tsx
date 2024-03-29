import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  ScrollViewProps,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

export interface RadioGroupProps {
  options: Array<string>;
  activeButton: string;
  onChange: Function;
  activated: boolean;
  containerOptions?: ScrollViewProps;
  buttonStyle?: ViewStyle;
  labelStyle?: TextStyle;
  radioSize?: number;
}
export interface RadioButtonProps {
  label: string;
  onChange: Function;
  buttonStyle?: ViewStyle;
  activeButton: string;
  labelStyle?: TextStyle;
  radioSize?: number;
  activated: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = props => {
  return (
    <View {...props.containerOptions}>
      {props.options.map(data => {
        return (
          <RadioButton
            label={data}
            activeButton={props.activeButton}
            buttonStyle={props.buttonStyle}
            onChange={props.onChange}
            radioSize={props.radioSize}
            activated={props.activated}
          />
        );
      })}
    </View>
  );
};

const RadioButton: React.FC<RadioButtonProps> = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => props.onChange(props.label)}
      style={[props.buttonStyle, styles.buttonStyle]}>
      <View
        style={[
          styles.radio,
          props.radioSize
            ? {
                width: props.radioSize,
                height: props.radioSize,
                borderRadius: props.radioSize,
              }
            : null,
        ]}>
        {props.activated ? (
          <View
            style={[
              styles.fill,
              props.radioSize
                ? {
                    width: props.radioSize / 1.6,
                    height: props.radioSize / 1.6,
                    borderRadius: props.radioSize,
                  }
                : null,
            ]}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderColor: '#FF6258',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fill: {
    backgroundColor: '#FF6258',
    width: 12,
    height: 12,
    borderColor: '#FF6258',
    borderRadius: 6,
  },
});

export default RadioGroup;
