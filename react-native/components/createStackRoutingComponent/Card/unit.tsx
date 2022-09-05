import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import { Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Card } from ".";

test(`renders as expected when disallowing swiping`, () => {
  const pop = jest.fn();
  const onBack = jest.fn();

  const renderer = TestRenderer.create(
    <Card pop={pop} onBack={onBack} allowsSwiping={false}>
      <Text>Example Children</Text>
    </Card>
  );

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: Swipeable,
      props: {
        childrenContainerStyle: { width: `100%`, height: `100%` },
        children: expect.objectContaining({
          type: Text,
          props: {
            children: `Example Children`,
          },
        }),
        renderLeftActions: expect.any(Function),
        onSwipeableLeftOpen: expect.any(Function),
        enabled: false,
      },
    }),
  });

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `renderLeftActions`
    ]()
  ).toEqual(<View style={{ width: `100%` }} />);

  expect(pop).not.toHaveBeenCalled();
  expect(onBack).not.toHaveBeenCalled();
  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).instance
      .close
  ).not.toHaveBeenCalled();

  renderer.unmount();
});

test(`renders as expected when allowing swiping`, () => {
  const pop = jest.fn();
  const onBack = jest.fn();

  const renderer = TestRenderer.create(
    <Card pop={pop} onBack={onBack} allowsSwiping>
      <Text>Example Children</Text>
    </Card>
  );

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: Swipeable,
      props: {
        childrenContainerStyle: { width: `100%`, height: `100%` },
        children: expect.objectContaining({
          type: Text,
          props: {
            children: `Example Children`,
          },
        }),
        renderLeftActions: expect.any(Function),
        onSwipeableLeftOpen: expect.any(Function),
        enabled: true,
      },
    }),
  });

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `renderLeftActions`
    ]()
  ).toEqual(<View style={{ width: `100%` }} />);

  expect(pop).not.toHaveBeenCalled();
  expect(onBack).not.toHaveBeenCalled();
  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).instance
      .close
  ).not.toHaveBeenCalled();

  renderer.unmount();
});

test(`executes onBack once when swiped away`, () => {
  const pop = jest.fn();
  const onBack = jest.fn();

  const renderer = TestRenderer.create(
    <Card pop={pop} onBack={onBack} allowsSwiping>
      <Text>Example Children</Text>
    </Card>
  );

  (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
    `onSwipeableLeftOpen`
  ]();

  expect(pop).not.toHaveBeenCalled();
  expect(onBack).toBeCalledTimes(1);
  expect(onBack).toBeCalledWith(expect.any(Function), expect.any(Function));
  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).instance
      .close
  ).not.toHaveBeenCalled();

  renderer.unmount();
});

test(`pops once when going back is confirmed`, () => {
  const pop = jest.fn();
  const onBack = jest.fn();

  const renderer = TestRenderer.create(
    <Card pop={pop} onBack={onBack} allowsSwiping>
      <Text>Example Children</Text>
    </Card>
  );

  (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
    `onSwipeableLeftOpen`
  ]();

  onBack.mock.calls[0][0]();

  expect(pop).toBeCalledTimes(1);
  expect(onBack).toBeCalledTimes(1);
  expect(onBack).toBeCalledWith(expect.any(Function), expect.any(Function));
  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).instance
      .close
  ).not.toHaveBeenCalled();

  renderer.unmount();
});

test(`unswipes when going back is cancelled`, () => {
  const pop = jest.fn();
  const onBack = jest.fn();

  const renderer = TestRenderer.create(
    <Card pop={pop} onBack={onBack} allowsSwiping>
      <Text>Example Children</Text>
    </Card>
  );

  (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
    `onSwipeableLeftOpen`
  ]();

  onBack.mock.calls[0][1]();

  expect(pop).not.toHaveBeenCalled();
  expect(onBack).toBeCalledTimes(1);
  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).instance
      .close
  ).toBeCalledTimes(1);

  renderer.unmount();
});
