import * as React from "react";
import { Text, TouchableOpacity } from "react-native";
import { unwrapRenderedFunctionComponent } from "../..";
import { Hitbox } from "../..";

test(`hitboxes are enabled by default`, () => {
  expect(Hitbox.enabled).toBeTruthy();
});

test(`renders as expected when enabled`, () => {
  const onPress = jest.fn();
  const onLayout = jest.fn();

  const rendered = (
    <Hitbox
      disabled={false}
      style={{ backgroundColor: `red` }}
      onPress={onPress}
      onLayout={onLayout}
    >
      <Text>Test Children</Text>
    </Hitbox>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <TouchableOpacity
      disabled={false}
      style={{ backgroundColor: `red` }}
      onPress={expect.any(Function)}
      onLayout={onLayout}
    >
      <Text>Test Children</Text>
    </TouchableOpacity>
  );
  expect(onPress).not.toHaveBeenCalled();
  expect(onLayout).not.toHaveBeenCalled();
});

test(`renders as expected when disabled`, () => {
  const onPress = jest.fn();
  const onLayout = jest.fn();

  const rendered = (
    <Hitbox
      disabled
      style={{ backgroundColor: `red` }}
      onPress={onPress}
      onLayout={onLayout}
    >
      <Text>Test Children</Text>
    </Hitbox>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <TouchableOpacity
      disabled
      style={{ backgroundColor: `red` }}
      onPress={expect.any(Function)}
      onLayout={onLayout}
    >
      <Text>Test Children</Text>
    </TouchableOpacity>
  );
  expect(onPress).not.toHaveBeenCalled();
  expect(onLayout).not.toHaveBeenCalled();
});

test(`executes the press callback once when hitboxes are enabled`, () => {
  const onPress = jest.fn();
  const onLayout = jest.fn();

  const rendered = (
    <Hitbox
      disabled
      style={{ backgroundColor: `red` }}
      onPress={onPress}
      onLayout={onLayout}
    >
      <Text>Test Children</Text>
    </Hitbox>
  );

  const hitboxesPreviouslyEnabled = Hitbox.enabled;

  try {
    Hitbox.enabled = true;
    unwrapRenderedFunctionComponent(rendered).props[`onPress`]();
  } finally {
    Hitbox.enabled = hitboxesPreviouslyEnabled;
  }

  expect(onPress).toBeCalledTimes(1);
  expect(onLayout).not.toHaveBeenCalled();
});

test(`executes the press callback once when hitboxes are disabled`, () => {
  const onPress = jest.fn();
  const onLayout = jest.fn();

  const rendered = (
    <Hitbox
      disabled
      style={{ backgroundColor: `red` }}
      onPress={onPress}
      onLayout={onLayout}
    >
      <Text>Test Children</Text>
    </Hitbox>
  );

  const hitboxesPreviouslyEnabled = Hitbox.enabled;

  try {
    Hitbox.enabled = false;
    unwrapRenderedFunctionComponent(rendered).props[`onPress`]();
  } finally {
    Hitbox.enabled = hitboxesPreviouslyEnabled;
  }

  expect(onPress).not.toHaveBeenCalled();
  expect(onLayout).not.toHaveBeenCalled();
});
