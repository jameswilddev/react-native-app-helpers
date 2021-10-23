import * as React from "react";
import {
  Modal,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SimpleModal, unwrapRenderedFunctionComponent } from "../..";

test(`uses the React Native modal on iOS`, () => {
  (Platform as unknown as { OS: string }).OS = `ios`;
  const onClose = jest.fn();

  const rendered = (
    <SimpleModal onClose={onClose}>
      <Text>Example Content</Text>
    </SimpleModal>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Modal onRequestClose={onClose} transparent>
      <React.Fragment>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              position: `absolute`,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <Text>Example Content</Text>
      </React.Fragment>
    </Modal>
  );
  expect(onClose).not.toHaveBeenCalled();
});

test(`uses the React Native modal on Android`, () => {
  (Platform as unknown as { OS: string }).OS = `android`;
  const onClose = jest.fn();

  const rendered = (
    <SimpleModal onClose={onClose}>
      <Text>Example Content</Text>
    </SimpleModal>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Modal onRequestClose={onClose} transparent>
      <React.Fragment>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              position: `absolute`,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <Text>Example Content</Text>
      </React.Fragment>
    </Modal>
  );
  expect(onClose).not.toHaveBeenCalled();
});

test(`uses the React Native modal on Windows`, () => {
  (Platform as unknown as { OS: string }).OS = `windows`;
  const onClose = jest.fn();

  const rendered = (
    <SimpleModal onClose={onClose}>
      <Text>Example Content</Text>
    </SimpleModal>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Modal onRequestClose={onClose} transparent>
      <React.Fragment>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              position: `absolute`,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <Text>Example Content</Text>
      </React.Fragment>
    </Modal>
  );
  expect(onClose).not.toHaveBeenCalled();
});

test(`uses the React Native modal on macOS`, () => {
  (Platform as unknown as { OS: string }).OS = `macos`;
  const onClose = jest.fn();

  const rendered = (
    <SimpleModal onClose={onClose}>
      <Text>Example Content</Text>
    </SimpleModal>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Modal onRequestClose={onClose} transparent>
      <React.Fragment>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              position: `absolute`,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <Text>Example Content</Text>
      </React.Fragment>
    </Modal>
  );
  expect(onClose).not.toHaveBeenCalled();
});

test(`uses the React Native modal in a web browser`, () => {
  (Platform as unknown as { OS: string }).OS = `web`;
  const onClose = jest.fn();

  const rendered = (
    <SimpleModal onClose={onClose}>
      <Text>Example Content</Text>
    </SimpleModal>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <React.Fragment>
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            position: `fixed` as unknown as undefined,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 9998,
          }}
        />
      </TouchableWithoutFeedback>
      <View
        style={{
          position: `fixed` as unknown as undefined,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 9999,
        }}
        pointerEvents="box-none"
      >
        <Text>Example Content</Text>
      </View>
    </React.Fragment>
  );
  expect(onClose).not.toHaveBeenCalled();
});
