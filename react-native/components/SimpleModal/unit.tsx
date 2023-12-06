import * as React from 'react'
import {
  Modal,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { SimpleModal, unwrapRenderedFunctionComponent } from '../../..'

const withPlatformOs = (os: string, callback: () => void): void => {
  const platform = Platform as unknown as { OS: string }

  const originalOs = platform.OS

  try {
    platform.OS = os

    callback()
  } finally {
    platform.OS = originalOs
  }
}

test('uses the React Native modal on iOS', () => {
  withPlatformOs('ios', () => {
    const onClose = jest.fn()

    const rendered = (
      <SimpleModal onClose={onClose}>
        <Text>Example Content</Text>
      </SimpleModal>
    )

    expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
      <Modal onRequestClose={onClose} transparent>
        <React.Fragment>
          <TouchableWithoutFeedback onPress={onClose}>
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
              }}
            />
          </TouchableWithoutFeedback>
          <Text>Example Content</Text>
        </React.Fragment>
      </Modal>
    )
    expect(onClose).not.toHaveBeenCalled()
  })
})

test('uses the React Native modal on Android', () => {
  withPlatformOs('android', () => {
    const onClose = jest.fn()

    const rendered = (
      <SimpleModal onClose={onClose}>
        <Text>Example Content</Text>
      </SimpleModal>
    )

    expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
      <Modal onRequestClose={onClose} transparent>
        <React.Fragment>
          <TouchableWithoutFeedback onPress={onClose}>
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
              }}
            />
          </TouchableWithoutFeedback>
          <Text>Example Content</Text>
        </React.Fragment>
      </Modal>
    )
    expect(onClose).not.toHaveBeenCalled()
  })
})

test('uses the React Native modal on Windows', () => {
  withPlatformOs('windows', () => {
    const onClose = jest.fn()

    const rendered = (
      <SimpleModal onClose={onClose}>
        <Text>Example Content</Text>
      </SimpleModal>
    )

    expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
      <Modal onRequestClose={onClose} transparent>
        <React.Fragment>
          <TouchableWithoutFeedback onPress={onClose}>
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
              }}
            />
          </TouchableWithoutFeedback>
          <Text>Example Content</Text>
        </React.Fragment>
      </Modal>
    )
    expect(onClose).not.toHaveBeenCalled()
  })
})

test('uses the React Native modal on macOS', () => {
  withPlatformOs('macos', () => {
    const onClose = jest.fn()

    const rendered = (
      <SimpleModal onClose={onClose}>
        <Text>Example Content</Text>
      </SimpleModal>
    )

    expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
      <Modal onRequestClose={onClose} transparent>
        <React.Fragment>
          <TouchableWithoutFeedback onPress={onClose}>
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
              }}
            />
          </TouchableWithoutFeedback>
          <Text>Example Content</Text>
        </React.Fragment>
      </Modal>
    )
    expect(onClose).not.toHaveBeenCalled()
  })
})

test('uses the React Native modal in a web browser', () => {
  withPlatformOs('web', () => {
    const onClose = jest.fn()

    const rendered = (
      <SimpleModal onClose={onClose}>
        <Text>Example Content</Text>
      </SimpleModal>
    )

    expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
      <React.Fragment>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              position: 'fixed' as unknown as undefined,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 9998
            }}
          />
        </TouchableWithoutFeedback>
        <View
          style={{
            position: 'fixed' as unknown as undefined,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 9999
          }}
          pointerEvents="box-none"
        >
          <Text>Example Content</Text>
        </View>
      </React.Fragment>
    )
    expect(onClose).not.toHaveBeenCalled()
  })
})

test('uses the React Native modal in a web browser on a second run', () => {
  withPlatformOs('web', () => {
    const onClose = jest.fn()

    const rendered = (
      <SimpleModal onClose={onClose}>
        <Text>Example Content</Text>
      </SimpleModal>
    )

    expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
      <React.Fragment>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={{
              position: 'fixed' as unknown as undefined,
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex: 9998
            }}
          />
        </TouchableWithoutFeedback>
        <View
          style={{
            position: 'fixed' as unknown as undefined,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 9999
          }}
          pointerEvents="box-none"
        >
          <Text>Example Content</Text>
        </View>
      </React.Fragment>
    )
    expect(onClose).not.toHaveBeenCalled()
  })
})
