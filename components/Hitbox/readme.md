# `react-native-app-helpers/SimpleModal`

A replacement for the React Native `Modal` component which supports web browsers
as a target.

## Usage

```tsx
import * as React from "react";
import { Alert, Button, TouchableOpacity, Text, SafeAreaView } from "react-native";
import { Hitbox, useRefresh } from "react-native-app-helpers";

const ExampleScreen = () => {
  const refresh = useRefresh();

  const [disabled, setDisabled] = React.useState(false);

  return () => (
    <SafeAreaView>
      <Hitbox
        disabled={disabled}
        style={{ backgroundColor: `red` }}
        onPress={() => {
          Alert.alert(`The button has been pressed.`);
        }}
      />
      <Button
        title={Hitbox.enabled ? `Disable this hitbox` : `Enable this hitbox`}
        onPress={() => {
          setDisabled(!disabled);
        }}
      />
      <Button
        title={Hitbox.enabled ? `Disable all hitboxes` : `Enable all hitboxes`}
        onPress={() => {
          Hitbox.enabled = !Hitbox.enabled;
          refresh();
        }}
      />
    </SafeAreaView>
  );
);
```
