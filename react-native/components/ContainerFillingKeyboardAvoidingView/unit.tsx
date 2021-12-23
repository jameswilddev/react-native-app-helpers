import * as React from "react";
import { Text, Platform, KeyboardAvoidingView } from "react-native";
import { ContainerFillingKeyboardAvoidingView } from "../../..";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

const withPlatformOs = (os: string, callback: () => void): void => {
  const platform = Platform as unknown as { OS: string };

  const originalOs = platform.OS;

  try {
    platform.OS = os;

    callback();
  } finally {
    platform.OS = originalOs;
  }
};

test(`renders as expected on iOS`, () => {
  withPlatformOs(`ios`, () => {
    const rendered = (
      <ContainerFillingKeyboardAvoidingView keyboardVerticalOffset={53}>
        <Text>Test Content</Text>
      </ContainerFillingKeyboardAvoidingView>
    );

    expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
      <KeyboardAvoidingView
        keyboardVerticalOffset={53}
        style={{ width: `100%`, height: `100%` }}
        pointerEvents="box-none"
        behavior="padding"
      >
        <Text>Test Content</Text>
      </KeyboardAvoidingView>
    );
  });
});

test(`renders as expected on Android`, () => {
  withPlatformOs(`android`, () => {
    const rendered = (
      <ContainerFillingKeyboardAvoidingView keyboardVerticalOffset={53}>
        <Text>Test Content</Text>
      </ContainerFillingKeyboardAvoidingView>
    );

    expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
      <KeyboardAvoidingView
        keyboardVerticalOffset={53}
        style={{ width: `100%`, height: `100%` }}
        pointerEvents="box-none"
      >
        <Text>Test Content</Text>
      </KeyboardAvoidingView>
    );
  });
});

test(`renders as expected on Windows`, () => {
  withPlatformOs(`windows`, () => {
    const rendered = (
      <ContainerFillingKeyboardAvoidingView keyboardVerticalOffset={53}>
        <Text>Test Content</Text>
      </ContainerFillingKeyboardAvoidingView>
    );

    expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
      <KeyboardAvoidingView
        keyboardVerticalOffset={53}
        style={{ width: `100%`, height: `100%` }}
        pointerEvents="box-none"
      >
        <Text>Test Content</Text>
      </KeyboardAvoidingView>
    );
  });
});

test(`renders as expected on macOS`, () => {
  withPlatformOs(`macos`, () => {
    const rendered = (
      <ContainerFillingKeyboardAvoidingView keyboardVerticalOffset={53}>
        <Text>Test Content</Text>
      </ContainerFillingKeyboardAvoidingView>
    );

    expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
      <KeyboardAvoidingView
        keyboardVerticalOffset={53}
        style={{ width: `100%`, height: `100%` }}
        pointerEvents="box-none"
      >
        <Text>Test Content</Text>
      </KeyboardAvoidingView>
    );
  });
});

test(`renders as expected in a web browser`, () => {
  withPlatformOs(`web`, () => {
    const rendered = (
      <ContainerFillingKeyboardAvoidingView keyboardVerticalOffset={53}>
        <Text>Test Content</Text>
      </ContainerFillingKeyboardAvoidingView>
    );

    expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
      <KeyboardAvoidingView
        keyboardVerticalOffset={53}
        style={{ width: `100%`, height: `100%` }}
        pointerEvents="box-none"
      >
        <Text>Test Content</Text>
      </KeyboardAvoidingView>
    );
  });
});
