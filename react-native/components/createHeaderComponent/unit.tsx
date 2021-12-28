import * as React from "react";
import { Text, View } from "react-native";
import {
  createHeaderComponent,
  HorizontallySymmetricalSafeAreaView,
  Hitbox,
  unwrapRenderedFunctionComponent,
  SvgIcon,
} from "../../..";

test(`renders as expected`, () => {
  const Component = createHeaderComponent({
    textColor: `red`,
    fontFamily: `Example Font Family`,
    fontSize: 30,
    background: `green`,
    outerHorizontalPadding: 50,
    innerHorizontalPadding: 14,
    verticalPadding: 3,
  });
  const ExampleLeftIconAIcon: SvgIcon = () => null;
  const onPressLeftIconA = jest.fn();
  const ExampleLeftIconBIcon: SvgIcon = () => null;
  const onPressLeftIconB = jest.fn();
  const ExampleLeftIconCIcon: SvgIcon = () => null;
  const onPressLeftIconC = jest.fn();
  const ExampleLeftIconDIcon: SvgIcon = () => null;
  const onPressLeftIconD = jest.fn();
  const ExampleRightIconAIcon: SvgIcon = () => null;
  const onPressRightIconA = jest.fn();
  const ExampleRightIconBIcon: SvgIcon = () => null;
  const onPressRightIconB = jest.fn();
  const ExampleRightIconCIcon: SvgIcon = () => null;
  const onPressRightIconC = jest.fn();

  const rendered = (
    <Component
      leftIcons={[
        {
          icon: ExampleLeftIconAIcon,
          onPress: onPressLeftIconA,
        },
        {
          icon: ExampleLeftIconBIcon,
          onPress: onPressLeftIconB,
        },
        {
          icon: ExampleLeftIconCIcon,
          onPress: onPressLeftIconC,
        },
        {
          icon: ExampleLeftIconDIcon,
          onPress: onPressLeftIconD,
        },
      ]}
      rightIcons={[
        {
          icon: ExampleRightIconAIcon,
          onPress: onPressRightIconA,
        },
        {
          icon: ExampleRightIconBIcon,
          onPress: onPressRightIconB,
        },
        {
          icon: ExampleRightIconCIcon,
          onPress: onPressRightIconC,
        },
      ]}
    >
      Example Text
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      left
      top
      right
      style={{
        width: `100%`,
        flexDirection: `row`,
        backgroundColor: `green`,
      }}
    >
      <View
        style={{
          flexBasis: 0,
          flexGrow: 1,
          flexDirection: `row`,
          marginLeft: 43,
        }}
      >
        <Hitbox
          key="0"
          style={{
            paddingHorizontal: 7,
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconAIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="1"
          style={{
            paddingHorizontal: 7,
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconBIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="2"
          style={{
            paddingHorizontal: 7,
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconCIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="3"
          style={{
            paddingHorizontal: 7,
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconDIcon fill="red" />
        </Hitbox>
      </View>
      <Text
        numberOfLines={1}
        style={{
          color: `red`,
          fontFamily: `Example Font Family`,
          fontSize: 30,
          lineHeight: 42,
          paddingVertical: 3,
        }}
      >
        Example Text
      </Text>
      <View
        style={{
          flexBasis: 0,
          flexGrow: 1,
          flexDirection: `row`,
          justifyContent: `flex-end`,
          marginRight: 43,
        }}
      >
        <Hitbox
          key="0"
          style={{
            paddingHorizontal: 7,
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleRightIconAIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="1"
          style={{
            paddingHorizontal: 7,
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleRightIconBIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="2"
          style={{
            paddingHorizontal: 7,
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleRightIconCIcon fill="red" />
        </Hitbox>
      </View>
    </HorizontallySymmetricalSafeAreaView>
  );
  expect(onPressLeftIconA).not.toHaveBeenCalled();
  expect(onPressLeftIconB).not.toHaveBeenCalled();
  expect(onPressLeftIconC).not.toHaveBeenCalled();
  expect(onPressLeftIconD).not.toHaveBeenCalled();
  expect(onPressRightIconA).not.toHaveBeenCalled();
  expect(onPressRightIconB).not.toHaveBeenCalled();
  expect(onPressRightIconC).not.toHaveBeenCalled();
});

test(`renders as expected without vertical padding`, () => {
  const Component = createHeaderComponent({
    textColor: `red`,
    fontFamily: `Example Font Family`,
    fontSize: 30,
    background: `green`,
    outerHorizontalPadding: 50,
    innerHorizontalPadding: 14,
    verticalPadding: 0,
  });
  const ExampleLeftIconAIcon: SvgIcon = () => null;
  const onPressLeftIconA = jest.fn();
  const ExampleLeftIconBIcon: SvgIcon = () => null;
  const onPressLeftIconB = jest.fn();
  const ExampleLeftIconCIcon: SvgIcon = () => null;
  const onPressLeftIconC = jest.fn();
  const ExampleLeftIconDIcon: SvgIcon = () => null;
  const onPressLeftIconD = jest.fn();
  const ExampleRightIconAIcon: SvgIcon = () => null;
  const onPressRightIconA = jest.fn();
  const ExampleRightIconBIcon: SvgIcon = () => null;
  const onPressRightIconB = jest.fn();
  const ExampleRightIconCIcon: SvgIcon = () => null;
  const onPressRightIconC = jest.fn();

  const rendered = (
    <Component
      leftIcons={[
        {
          icon: ExampleLeftIconAIcon,
          onPress: onPressLeftIconA,
        },
        {
          icon: ExampleLeftIconBIcon,
          onPress: onPressLeftIconB,
        },
        {
          icon: ExampleLeftIconCIcon,
          onPress: onPressLeftIconC,
        },
        {
          icon: ExampleLeftIconDIcon,
          onPress: onPressLeftIconD,
        },
      ]}
      rightIcons={[
        {
          icon: ExampleRightIconAIcon,
          onPress: onPressRightIconA,
        },
        {
          icon: ExampleRightIconBIcon,
          onPress: onPressRightIconB,
        },
        {
          icon: ExampleRightIconCIcon,
          onPress: onPressRightIconC,
        },
      ]}
    >
      Example Text
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      left
      top
      right
      style={{
        width: `100%`,
        flexDirection: `row`,
        backgroundColor: `green`,
      }}
    >
      <View
        style={{
          flexBasis: 0,
          flexGrow: 1,
          flexDirection: `row`,
          marginLeft: 43,
        }}
      >
        <Hitbox
          key="0"
          style={{
            paddingHorizontal: 7,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconAIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="1"
          style={{
            paddingHorizontal: 7,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconBIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="2"
          style={{
            paddingHorizontal: 7,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconCIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="3"
          style={{
            paddingHorizontal: 7,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconDIcon fill="red" />
        </Hitbox>
      </View>
      <Text
        numberOfLines={1}
        style={{
          color: `red`,
          fontFamily: `Example Font Family`,
          fontSize: 30,
          lineHeight: 42,
        }}
      >
        Example Text
      </Text>
      <View
        style={{
          flexBasis: 0,
          flexGrow: 1,
          flexDirection: `row`,
          justifyContent: `flex-end`,
          marginRight: 43,
        }}
      >
        <Hitbox
          key="0"
          style={{
            paddingHorizontal: 7,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleRightIconAIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="1"
          style={{
            paddingHorizontal: 7,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleRightIconBIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="2"
          style={{
            paddingHorizontal: 7,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleRightIconCIcon fill="red" />
        </Hitbox>
      </View>
    </HorizontallySymmetricalSafeAreaView>
  );
  expect(onPressLeftIconA).not.toHaveBeenCalled();
  expect(onPressLeftIconB).not.toHaveBeenCalled();
  expect(onPressLeftIconC).not.toHaveBeenCalled();
  expect(onPressLeftIconD).not.toHaveBeenCalled();
  expect(onPressRightIconA).not.toHaveBeenCalled();
  expect(onPressRightIconB).not.toHaveBeenCalled();
  expect(onPressRightIconC).not.toHaveBeenCalled();
});

test(`renders as expected without inner horizontal padding`, () => {
  const Component = createHeaderComponent({
    textColor: `red`,
    fontFamily: `Example Font Family`,
    fontSize: 30,
    background: `green`,
    outerHorizontalPadding: 50,
    innerHorizontalPadding: 0,
    verticalPadding: 3,
  });
  const ExampleLeftIconAIcon: SvgIcon = () => null;
  const onPressLeftIconA = jest.fn();
  const ExampleLeftIconBIcon: SvgIcon = () => null;
  const onPressLeftIconB = jest.fn();
  const ExampleLeftIconCIcon: SvgIcon = () => null;
  const onPressLeftIconC = jest.fn();
  const ExampleLeftIconDIcon: SvgIcon = () => null;
  const onPressLeftIconD = jest.fn();
  const ExampleRightIconAIcon: SvgIcon = () => null;
  const onPressRightIconA = jest.fn();
  const ExampleRightIconBIcon: SvgIcon = () => null;
  const onPressRightIconB = jest.fn();
  const ExampleRightIconCIcon: SvgIcon = () => null;
  const onPressRightIconC = jest.fn();

  const rendered = (
    <Component
      leftIcons={[
        {
          icon: ExampleLeftIconAIcon,
          onPress: onPressLeftIconA,
        },
        {
          icon: ExampleLeftIconBIcon,
          onPress: onPressLeftIconB,
        },
        {
          icon: ExampleLeftIconCIcon,
          onPress: onPressLeftIconC,
        },
        {
          icon: ExampleLeftIconDIcon,
          onPress: onPressLeftIconD,
        },
      ]}
      rightIcons={[
        {
          icon: ExampleRightIconAIcon,
          onPress: onPressRightIconA,
        },
        {
          icon: ExampleRightIconBIcon,
          onPress: onPressRightIconB,
        },
        {
          icon: ExampleRightIconCIcon,
          onPress: onPressRightIconC,
        },
      ]}
    >
      Example Text
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      left
      top
      right
      style={{
        width: `100%`,
        flexDirection: `row`,
        backgroundColor: `green`,
      }}
    >
      <View
        style={{
          flexBasis: 0,
          flexGrow: 1,
          flexDirection: `row`,
          marginLeft: 50,
        }}
      >
        <Hitbox
          key="0"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconAIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="1"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconBIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="2"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconCIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="3"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconDIcon fill="red" />
        </Hitbox>
      </View>
      <Text
        numberOfLines={1}
        style={{
          color: `red`,
          fontFamily: `Example Font Family`,
          fontSize: 30,
          lineHeight: 42,
          paddingVertical: 3,
        }}
      >
        Example Text
      </Text>
      <View
        style={{
          flexBasis: 0,
          flexGrow: 1,
          flexDirection: `row`,
          justifyContent: `flex-end`,
          marginRight: 50,
        }}
      >
        <Hitbox
          key="0"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleRightIconAIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="1"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleRightIconBIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="2"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleRightIconCIcon fill="red" />
        </Hitbox>
      </View>
    </HorizontallySymmetricalSafeAreaView>
  );
  expect(onPressLeftIconA).not.toHaveBeenCalled();
  expect(onPressLeftIconB).not.toHaveBeenCalled();
  expect(onPressLeftIconC).not.toHaveBeenCalled();
  expect(onPressLeftIconD).not.toHaveBeenCalled();
  expect(onPressRightIconA).not.toHaveBeenCalled();
  expect(onPressRightIconB).not.toHaveBeenCalled();
  expect(onPressRightIconC).not.toHaveBeenCalled();
});

test(`renders as expected without inner or outer horizontal padding`, () => {
  const Component = createHeaderComponent({
    textColor: `red`,
    fontFamily: `Example Font Family`,
    fontSize: 30,
    background: `green`,
    outerHorizontalPadding: 0,
    innerHorizontalPadding: 0,
    verticalPadding: 3,
  });
  const ExampleLeftIconAIcon: SvgIcon = () => null;
  const onPressLeftIconA = jest.fn();
  const ExampleLeftIconBIcon: SvgIcon = () => null;
  const onPressLeftIconB = jest.fn();
  const ExampleLeftIconCIcon: SvgIcon = () => null;
  const onPressLeftIconC = jest.fn();
  const ExampleLeftIconDIcon: SvgIcon = () => null;
  const onPressLeftIconD = jest.fn();
  const ExampleRightIconAIcon: SvgIcon = () => null;
  const onPressRightIconA = jest.fn();
  const ExampleRightIconBIcon: SvgIcon = () => null;
  const onPressRightIconB = jest.fn();
  const ExampleRightIconCIcon: SvgIcon = () => null;
  const onPressRightIconC = jest.fn();

  const rendered = (
    <Component
      leftIcons={[
        {
          icon: ExampleLeftIconAIcon,
          onPress: onPressLeftIconA,
        },
        {
          icon: ExampleLeftIconBIcon,
          onPress: onPressLeftIconB,
        },
        {
          icon: ExampleLeftIconCIcon,
          onPress: onPressLeftIconC,
        },
        {
          icon: ExampleLeftIconDIcon,
          onPress: onPressLeftIconD,
        },
      ]}
      rightIcons={[
        {
          icon: ExampleRightIconAIcon,
          onPress: onPressRightIconA,
        },
        {
          icon: ExampleRightIconBIcon,
          onPress: onPressRightIconB,
        },
        {
          icon: ExampleRightIconCIcon,
          onPress: onPressRightIconC,
        },
      ]}
    >
      Example Text
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      left
      top
      right
      style={{
        width: `100%`,
        flexDirection: `row`,
        backgroundColor: `green`,
      }}
    >
      <View
        style={{
          flexBasis: 0,
          flexGrow: 1,
          flexDirection: `row`,
        }}
      >
        <Hitbox
          key="0"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconAIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="1"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconBIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="2"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconCIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="3"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleLeftIconDIcon fill="red" />
        </Hitbox>
      </View>
      <Text
        numberOfLines={1}
        style={{
          color: `red`,
          fontFamily: `Example Font Family`,
          fontSize: 30,
          lineHeight: 42,
          paddingVertical: 3,
        }}
      >
        Example Text
      </Text>
      <View
        style={{
          flexBasis: 0,
          flexGrow: 1,
          flexDirection: `row`,
          justifyContent: `flex-end`,
        }}
      >
        <Hitbox
          key="0"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleRightIconAIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="1"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleRightIconBIcon fill="red" />
        </Hitbox>
        <Hitbox
          key="2"
          style={{
            paddingVertical: 3,
          }}
          onPress={expect.any(Function)}
        >
          <ExampleRightIconCIcon fill="red" />
        </Hitbox>
      </View>
    </HorizontallySymmetricalSafeAreaView>
  );
  expect(onPressLeftIconA).not.toHaveBeenCalled();
  expect(onPressLeftIconB).not.toHaveBeenCalled();
  expect(onPressLeftIconC).not.toHaveBeenCalled();
  expect(onPressLeftIconD).not.toHaveBeenCalled();
  expect(onPressRightIconA).not.toHaveBeenCalled();
  expect(onPressRightIconB).not.toHaveBeenCalled();
  expect(onPressRightIconC).not.toHaveBeenCalled();
});

test(`renders as expected without vertical or inner horizontal padding`, () => {
  const Component = createHeaderComponent({
    textColor: `red`,
    fontFamily: `Example Font Family`,
    fontSize: 30,
    background: `green`,
    outerHorizontalPadding: 50,
    innerHorizontalPadding: 0,
    verticalPadding: 0,
  });
  const ExampleLeftIconAIcon: SvgIcon = () => null;
  const onPressLeftIconA = jest.fn();
  const ExampleLeftIconBIcon: SvgIcon = () => null;
  const onPressLeftIconB = jest.fn();
  const ExampleLeftIconCIcon: SvgIcon = () => null;
  const onPressLeftIconC = jest.fn();
  const ExampleLeftIconDIcon: SvgIcon = () => null;
  const onPressLeftIconD = jest.fn();
  const ExampleRightIconAIcon: SvgIcon = () => null;
  const onPressRightIconA = jest.fn();
  const ExampleRightIconBIcon: SvgIcon = () => null;
  const onPressRightIconB = jest.fn();
  const ExampleRightIconCIcon: SvgIcon = () => null;
  const onPressRightIconC = jest.fn();

  const rendered = (
    <Component
      leftIcons={[
        {
          icon: ExampleLeftIconAIcon,
          onPress: onPressLeftIconA,
        },
        {
          icon: ExampleLeftIconBIcon,
          onPress: onPressLeftIconB,
        },
        {
          icon: ExampleLeftIconCIcon,
          onPress: onPressLeftIconC,
        },
        {
          icon: ExampleLeftIconDIcon,
          onPress: onPressLeftIconD,
        },
      ]}
      rightIcons={[
        {
          icon: ExampleRightIconAIcon,
          onPress: onPressRightIconA,
        },
        {
          icon: ExampleRightIconBIcon,
          onPress: onPressRightIconB,
        },
        {
          icon: ExampleRightIconCIcon,
          onPress: onPressRightIconC,
        },
      ]}
    >
      Example Text
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      left
      top
      right
      style={{
        width: `100%`,
        flexDirection: `row`,
        backgroundColor: `green`,
      }}
    >
      <View
        style={{
          flexBasis: 0,
          flexGrow: 1,
          flexDirection: `row`,
          marginLeft: 50,
        }}
      >
        <Hitbox key="0" onPress={expect.any(Function)}>
          <ExampleLeftIconAIcon fill="red" />
        </Hitbox>
        <Hitbox key="1" onPress={expect.any(Function)}>
          <ExampleLeftIconBIcon fill="red" />
        </Hitbox>
        <Hitbox key="2" onPress={expect.any(Function)}>
          <ExampleLeftIconCIcon fill="red" />
        </Hitbox>
        <Hitbox key="3" onPress={expect.any(Function)}>
          <ExampleLeftIconDIcon fill="red" />
        </Hitbox>
      </View>
      <Text
        numberOfLines={1}
        style={{
          color: `red`,
          fontFamily: `Example Font Family`,
          fontSize: 30,
          lineHeight: 42,
        }}
      >
        Example Text
      </Text>
      <View
        style={{
          flexBasis: 0,
          flexGrow: 1,
          flexDirection: `row`,
          justifyContent: `flex-end`,
          marginRight: 50,
        }}
      >
        <Hitbox key="0" onPress={expect.any(Function)}>
          <ExampleRightIconAIcon fill="red" />
        </Hitbox>
        <Hitbox key="1" onPress={expect.any(Function)}>
          <ExampleRightIconBIcon fill="red" />
        </Hitbox>
        <Hitbox key="2" onPress={expect.any(Function)}>
          <ExampleRightIconCIcon fill="red" />
        </Hitbox>
      </View>
    </HorizontallySymmetricalSafeAreaView>
  );
  expect(onPressLeftIconA).not.toHaveBeenCalled();
  expect(onPressLeftIconB).not.toHaveBeenCalled();
  expect(onPressLeftIconC).not.toHaveBeenCalled();
  expect(onPressLeftIconD).not.toHaveBeenCalled();
  expect(onPressRightIconA).not.toHaveBeenCalled();
  expect(onPressRightIconB).not.toHaveBeenCalled();
  expect(onPressRightIconC).not.toHaveBeenCalled();
});

test(`executes the appropriate callback on pressing on a left icon`, () => {
  const Component = createHeaderComponent({
    textColor: `red`,
    fontFamily: `Example Font Family`,
    fontSize: 30,
    background: `green`,
    outerHorizontalPadding: 50,
    innerHorizontalPadding: 14,
    verticalPadding: 3,
  });
  const ExampleLeftIconAIcon: SvgIcon = () => null;
  const onPressLeftIconA = jest.fn();
  const ExampleLeftIconBIcon: SvgIcon = () => null;
  const onPressLeftIconB = jest.fn();
  const ExampleLeftIconCIcon: SvgIcon = () => null;
  const onPressLeftIconC = jest.fn();
  const ExampleLeftIconDIcon: SvgIcon = () => null;
  const onPressLeftIconD = jest.fn();
  const ExampleRightIconAIcon: SvgIcon = () => null;
  const onPressRightIconA = jest.fn();
  const ExampleRightIconBIcon: SvgIcon = () => null;
  const onPressRightIconB = jest.fn();
  const ExampleRightIconCIcon: SvgIcon = () => null;
  const onPressRightIconC = jest.fn();
  const rendered = (
    <Component
      leftIcons={[
        {
          icon: ExampleLeftIconAIcon,
          onPress: onPressLeftIconA,
        },
        {
          icon: ExampleLeftIconBIcon,
          onPress: onPressLeftIconB,
        },
        {
          icon: ExampleLeftIconCIcon,
          onPress: onPressLeftIconC,
        },
        {
          icon: ExampleLeftIconDIcon,
          onPress: onPressLeftIconD,
        },
      ]}
      rightIcons={[
        {
          icon: ExampleRightIconAIcon,
          onPress: onPressRightIconA,
        },
        {
          icon: ExampleRightIconBIcon,
          onPress: onPressRightIconB,
        },
        {
          icon: ExampleRightIconCIcon,
          onPress: onPressRightIconC,
        },
      ]}
    >
      Example Text
    </Component>
  );

  unwrapRenderedFunctionComponent(rendered).props[
    `children`
  ][0].props.children[1].props.onPress();

  expect(onPressLeftIconA).not.toHaveBeenCalled();
  expect(onPressLeftIconB).toBeCalledTimes(1);
  expect(onPressLeftIconC).not.toHaveBeenCalled();
  expect(onPressLeftIconD).not.toHaveBeenCalled();
  expect(onPressRightIconA).not.toHaveBeenCalled();
  expect(onPressRightIconB).not.toHaveBeenCalled();
  expect(onPressRightIconC).not.toHaveBeenCalled();
});

test(`executes the appropriate callback on pressing on a right icon`, () => {
  const Component = createHeaderComponent({
    textColor: `red`,
    fontFamily: `Example Font Family`,
    fontSize: 30,
    background: `green`,
    outerHorizontalPadding: 50,
    innerHorizontalPadding: 14,
    verticalPadding: 3,
  });
  const ExampleLeftIconAIcon: SvgIcon = () => null;
  const onPressLeftIconA = jest.fn();
  const ExampleLeftIconBIcon: SvgIcon = () => null;
  const onPressLeftIconB = jest.fn();
  const ExampleLeftIconCIcon: SvgIcon = () => null;
  const onPressLeftIconC = jest.fn();
  const ExampleLeftIconDIcon: SvgIcon = () => null;
  const onPressLeftIconD = jest.fn();
  const ExampleRightIconAIcon: SvgIcon = () => null;
  const onPressRightIconA = jest.fn();
  const ExampleRightIconBIcon: SvgIcon = () => null;
  const onPressRightIconB = jest.fn();
  const ExampleRightIconCIcon: SvgIcon = () => null;
  const onPressRightIconC = jest.fn();
  const rendered = (
    <Component
      leftIcons={[
        {
          icon: ExampleLeftIconAIcon,
          onPress: onPressLeftIconA,
        },
        {
          icon: ExampleLeftIconBIcon,
          onPress: onPressLeftIconB,
        },
        {
          icon: ExampleLeftIconCIcon,
          onPress: onPressLeftIconC,
        },
        {
          icon: ExampleLeftIconDIcon,
          onPress: onPressLeftIconD,
        },
      ]}
      rightIcons={[
        {
          icon: ExampleRightIconAIcon,
          onPress: onPressRightIconA,
        },
        {
          icon: ExampleRightIconBIcon,
          onPress: onPressRightIconB,
        },
        {
          icon: ExampleRightIconCIcon,
          onPress: onPressRightIconC,
        },
      ]}
    >
      Example Text
    </Component>
  );

  unwrapRenderedFunctionComponent(rendered).props[
    `children`
  ][2].props.children[1].props.onPress();

  expect(onPressLeftIconA).not.toHaveBeenCalled();
  expect(onPressLeftIconB).not.toHaveBeenCalled();
  expect(onPressLeftIconC).not.toHaveBeenCalled();
  expect(onPressLeftIconD).not.toHaveBeenCalled();
  expect(onPressRightIconA).not.toHaveBeenCalled();
  expect(onPressRightIconB).toBeCalledTimes(1);
  expect(onPressRightIconC).not.toHaveBeenCalled();
});
