import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import * as TestRenderer from "react-test-renderer";
import { createDropDownComponent, SimpleModal, Hitbox } from "../..";

test(`renders as expected when not disabled`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#FFEE00`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`renders as expected when disabled`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: true,
        style: {
          backgroundColor: `#772728`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: `#5E5E5E`,
          borderRadius: 100,
          margin: -10,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#AE2195`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`renders as expected when not disabled after layout when too close to the bottom`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 320, height: 20 } },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#FFEE00`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`renders as expected when disabled after layout when too close to the bottom`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 320, height: 20 } },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: true,
        style: {
          backgroundColor: `#772728`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: `#5E5E5E`,
          borderRadius: 100,
          margin: -10,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#AE2195`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`renders as expected when not disabled after layout when not too close to the bottom`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#FFEE00`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`renders as expected when disabled after layout when not too close to the bottom`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: true,
        style: {
          backgroundColor: `#772728`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: `#5E5E5E`,
          borderRadius: 100,
          margin: -10,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#AE2195`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`renders as expected when not disabled after layout when too close to the bottom after press`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 320, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 3,
          borderTopWidth: 0,
          margin: -1,
          marginTop: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              expect.objectContaining({
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                borderBottomWidth: 0,
                margin: -1,
                marginBottom: 0,
              }),
              {
                left: 70,
                width: 220,
                bottom: 160,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when not disabled after layout when not too close to the bottom after press`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottomWidth: 0,
          margin: -1,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                borderTopWidth: 0,
                margin: -1,
                marginTop: 0,
              },
              {
                left: 70,
                width: 220,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when not disabled after press after layout when too close to the bottom`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 320, height: 20 } },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 3,
          borderTopWidth: 0,
          margin: -1,
          marginTop: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                borderBottomWidth: 0,
                margin: -1,
                marginBottom: 0,
              },
              {
                left: 70,
                width: 220,
                bottom: 160,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when not disabled after press after layout when not too close to the bottom`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottomWidth: 0,
          margin: -1,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                borderTopWidth: 0,
                margin: -1,
                marginTop: 0,
              },
              {
                left: 70,
                width: 220,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`correctly handles layout changes which only move on the X axis`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props[`onLayout`]({
      nativeEvent: { layout: { x: 10, width: 220, y: 310, height: 20 } },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottomWidth: 0,
          margin: -1,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                borderTopWidth: 0,
                margin: -1,
                marginTop: 0,
              },
              {
                left: 10,
                width: 220,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`correctly handles layout changes which only change width`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props[`onLayout`]({
      nativeEvent: { layout: { x: 70, width: 190, y: 310, height: 20 } },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottomWidth: 0,
          margin: -1,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                borderTopWidth: 0,
                margin: -1,
                marginTop: 0,
              },
              {
                left: 70,
                width: 190,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`correctly handles layout changes which only move on the Y axis`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props[`onLayout`]({
      nativeEvent: { layout: { x: 70, width: 220, y: 300, height: 20 } },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottomWidth: 0,
          margin: -1,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                borderTopWidth: 0,
                margin: -1,
                marginTop: 0,
              },
              {
                left: 70,
                width: 220,
                top: 320,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`correctly handles layout changes which only change height`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props[`onLayout`]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 15 } },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottomWidth: 0,
          margin: -1,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                borderTopWidth: 0,
                margin: -1,
                marginTop: 0,
              },
              {
                left: 70,
                width: 220,
                top: 325,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`correctly handles layout changes which have no effect`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props[`onLayout`]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottomWidth: 0,
          margin: -1,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                borderTopWidth: 0,
                margin: -1,
                marginTop: 0,
              },
              {
                left: 70,
                width: 220,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`correctly handles layout changes which swap from being above to below`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 400, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props[`onLayout`]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottomWidth: 0,
          margin: -1,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                borderTopWidth: 0,
                margin: -1,
                marginTop: 0,
              },
              {
                left: 70,
                width: 220,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`correctly handles layout changes which swap from being below to above`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props[`onLayout`]({
      nativeEvent: { layout: { x: 70, width: 220, y: 400, height: 20 } },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 3,
          borderTopWidth: 0,
          margin: -1,
          marginTop: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                borderBottomWidth: 0,
                margin: -1,
                marginBottom: 0,
              },
              {
                left: 70,
                width: 220,
                bottom: 80,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`correctly handles window dimension changes which swap from being above to below`, async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 330, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    Dimensions.set({
      window: {
        width: 640,
        height: 510,
        scale: 2.42,
        fontScale: 3.51,
      },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottomWidth: 0,
          margin: -1,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                borderTopWidth: 0,
                margin: -1,
                marginTop: 0,
              },
              {
                left: 70,
                width: 220,
                top: 350,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();

  // Some aspect of unmounting seems to be asynchronous in this test, and not
  // waiting seems to mean that window dimension changes in other tests trigger
  // changes here.
  await new Promise((resolve) => setTimeout(resolve, 10));
});

test(`correctly handles window dimension changes which swap from being below to above`, async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    Dimensions.set({
      window: {
        width: 640,
        height: 470,
        scale: 2.42,
        fontScale: 3.51,
      },
    });
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 3,
          borderTopWidth: 0,
          margin: -1,
          marginTop: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                borderBottomWidth: 0,
                margin: -1,
                marginBottom: 0,
              },
              {
                left: 70,
                width: 220,
                bottom: 160,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();

  // Some aspect of unmounting seems to be asynchronous in this test, and not
  // waiting seems to mean that window dimension changes in other tests trigger
  // changes here.
  await new Promise((resolve) => setTimeout(resolve, 10));
});

test(`can be enabled after being created disabled`, async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    Dimensions.set({
      window: {
        width: 640,
        height: 470,
        scale: 2.42,
        fontScale: 3.51,
      },
    });
  });

  renderer.update(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#FFEE00`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    })
  );

  renderer.unmount();

  // Some aspect of unmounting seems to be asynchronous in this test, and not
  // waiting seems to mean that window dimension changes in other tests trigger
  // changes here.
  await new Promise((resolve) => setTimeout(resolve, 10));
});

test(`closes if disabled while open`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  renderer.update(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: true,
        style: {
          backgroundColor: `#772728`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: `#5E5E5E`,
          borderRadius: 100,
          margin: -10,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#AE2195`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`does not re-open if enabled after disabled while open`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  renderer.update(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  renderer.update(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#FFEE00`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`can be re-opened once re-enabled after disabled while open`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  renderer.update(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  renderer.update(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottomWidth: 0,
          margin: -1,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                borderTopWidth: 0,
                margin: -1,
                marginTop: 0,
              },
              {
                left: 70,
                width: 220,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`closes when the modal is dismissed`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[1] as TestRenderer.ReactTestRendererTree
    ).props[`onClose`]();
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#FFEE00`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`renders as expected without a label`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#E7AA32`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Placeholder`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`renders as expected without a label when open above`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 320, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 3,
          borderTopWidth: 0,
          margin: -1,
          marginTop: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#273346`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Placeholder`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                borderBottomWidth: 0,
                margin: -1,
                marginBottom: 0,
              },
              {
                left: 70,
                width: 220,
                bottom: 160,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected without a label when open below`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          borderBottomWidth: 0,
          margin: -1,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#273346`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Placeholder`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                borderTopWidth: 0,
                margin: -1,
                marginTop: 0,
              },
              {
                left: 70,
                width: 220,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected without a label when disabled`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component label={null} placeholder="Example Placeholder" valid disabled>
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: true,
        style: {
          backgroundColor: `#772728`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: `#5E5E5E`,
          borderRadius: 100,
          margin: -10,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#FFAAEE`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Placeholder`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`renders as expected when invalid`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#259284`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: `#9A9A8E`,
          borderRadius: 10,
          margin: -2,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#99FE88`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`renders as expected when invalid and open above`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 320, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AA88`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 12,
          borderColor: `#98ADAA`,
          borderBottomLeftRadius: 47,
          borderBottomRightRadius: 47,
          borderTopWidth: 0,
          margin: -8,
          marginTop: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#47ADAD`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Placeholder`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#32AA88`,
                borderWidth: 12,
                borderColor: `#98ADAA`,
                borderTopLeftRadius: 47,
                borderTopRightRadius: 47,
                borderBottomWidth: 0,
                margin: -8,
                marginBottom: 0,
              },
              {
                left: 70,
                width: 220,
                bottom: 160,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when invalid and open below`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AA88`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 12,
          borderColor: `#98ADAA`,
          borderTopLeftRadius: 47,
          borderTopRightRadius: 47,
          borderBottomWidth: 0,
          margin: -8,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#ABAADE`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#32AA88`,
                borderWidth: 12,
                borderColor: `#98ADAA`,
                borderBottomLeftRadius: 47,
                borderBottomRightRadius: 47,
                borderTopWidth: 0,
                margin: -8,
                marginTop: 0,
              },
              {
                left: 70,
                width: 220,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when invalid and disabled`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid={false}
      disabled
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: true,
        style: {
          backgroundColor: `#938837`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 19,
          borderColor: `#573829`,
          borderRadius: 2,
          margin: -15,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#340297`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`renders as expected when invalid without a label`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#259284`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: `#9A9A8E`,
          borderRadius: 10,
          margin: -2,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#CACA3A`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Placeholder`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`renders as expected without a label when open above and invalid`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 320, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AA88`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 12,
          borderColor: `#98ADAA`,
          borderBottomLeftRadius: 47,
          borderBottomRightRadius: 47,
          borderTopWidth: 0,
          margin: -8,
          marginTop: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#47ADAD`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Placeholder`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#32AA88`,
                borderWidth: 12,
                borderColor: `#98ADAA`,
                borderTopLeftRadius: 47,
                borderTopRightRadius: 47,
                borderBottomWidth: 0,
                margin: -8,
                marginBottom: 0,
              },
              {
                left: 70,
                width: 220,
                bottom: 160,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected without a label when open below and invalid`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AA88`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 12,
          borderColor: `#98ADAA`,
          borderTopLeftRadius: 47,
          borderTopRightRadius: 47,
          borderBottomWidth: 0,
          margin: -8,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#47ADAD`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Placeholder`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#32AA88`,
                borderWidth: 12,
                borderColor: `#98ADAA`,
                borderBottomLeftRadius: 47,
                borderBottomRightRadius: 47,
                borderTopWidth: 0,
                margin: -8,
                marginTop: 0,
              },
              {
                left: 70,
                width: 220,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected without a label when disabled and invalid`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid={false}
      disabled
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: true,
        style: {
          backgroundColor: `#938837`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 19,
          borderColor: `#573829`,
          borderRadius: 2,
          margin: -15,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#233832`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Placeholder`,
          },
        }),
      },
    })
  );

  renderer.unmount();
});

test(`renders as expected when open above without borders`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: null,
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: null,
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: null,
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: null,
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: null,
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: null,
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 320, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderBottomLeftRadius: 3,
          borderBottomRightRadius: 3,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
              },
              {
                left: 70,
                width: 220,
                bottom: 160,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when open below without borders`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: null,
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: null,
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: null,
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: null,
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: null,
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: null,
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
              },
              {
                left: 70,
                width: 220,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when invalid and open above without borders`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: null,
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: null,
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: null,
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: null,
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: null,
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: null,
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 320, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AA88`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderBottomLeftRadius: 47,
          borderBottomRightRadius: 47,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#ABAADE`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#32AA88`,
                borderTopLeftRadius: 47,
                borderTopRightRadius: 47,
              },
              {
                left: 70,
                width: 220,
                bottom: 160,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when invalid open below without borders`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 5,
        border: null,
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 10,
        border: null,
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 3,
        border: null,
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 47,
        border: null,
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 100,
        border: null,
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 2,
        border: null,
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AA88`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderTopLeftRadius: 47,
          borderTopRightRadius: 47,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#ABAADE`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#32AA88`,
                borderBottomLeftRadius: 47,
                borderBottomRightRadius: 47,
              },
              {
                left: 70,
                width: 220,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when open above without radius`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 0,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 0,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 0,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 0,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 0,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 0,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 320, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderTopWidth: 0,
          margin: -1,
          marginTop: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderBottomWidth: 0,
                margin: -1,
                marginBottom: 0,
              },
              {
                left: 70,
                width: 220,
                bottom: 160,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when open below without radius`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 0,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 0,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 0,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 0,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 0,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 0,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#CABA99`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: `#646464`,
          borderBottomWidth: 0,
          margin: -1,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#55EA13`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#CABA99`,
                borderWidth: 5,
                borderColor: `#646464`,
                borderTopWidth: 0,
                margin: -1,
                marginTop: 0,
              },
              {
                left: 70,
                width: 220,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when invalid and open above without radius`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 0,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 0,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 0,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 0,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 0,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 0,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 320, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AA88`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 12,
          borderColor: `#98ADAA`,
          borderTopWidth: 0,
          margin: -8,
          marginTop: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#ABAADE`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#32AA88`,
                borderWidth: 12,
                borderColor: `#98ADAA`,
                borderBottomWidth: 0,
                margin: -8,
                marginBottom: 0,
              },
              {
                left: 70,
                width: 220,
                bottom: 160,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when invalid open below without radius`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createDropDownComponent(
    {
      fontFamily: `Example Font Family`,
      fontSize: 37,
      paddingVertical: 12,
      paddingHorizontal: 29,
      blurredValid: {
        textColor: `#FFEE00`,
        placeholderColor: `#E7AA32`,
        backgroundColor: `#32AE12`,
        radius: 0,
        border: {
          width: 4,
          color: `#FF00FF`,
        },
      },
      blurredInvalid: {
        textColor: `#99FE88`,
        placeholderColor: `#CACA3A`,
        backgroundColor: `#259284`,
        radius: 0,
        border: {
          width: 6,
          color: `#9A9A8E`,
        },
      },
      focusedValid: {
        textColor: `#55EA13`,
        placeholderColor: `#273346`,
        backgroundColor: `#CABA99`,
        radius: 0,
        border: {
          width: 5,
          color: `#646464`,
        },
      },
      focusedInvalid: {
        textColor: `#ABAADE`,
        placeholderColor: `#47ADAD`,
        backgroundColor: `#32AA88`,
        radius: 0,
        border: {
          width: 12,
          color: `#98ADAA`,
        },
      },
      disabledValid: {
        textColor: `#AE2195`,
        placeholderColor: `#FFAAEE`,
        backgroundColor: `#772728`,
        radius: 0,
        border: {
          width: 14,
          color: `#5E5E5E`,
        },
      },
      disabledInvalid: {
        textColor: `#340297`,
        placeholderColor: `#233832`,
        backgroundColor: `#938837`,
        radius: 0,
        border: {
          width: 19,
          color: `#573829`,
        },
      },
    },
    150
  );

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
    >
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onLayout`
    ]({
      nativeEvent: { layout: { x: 70, width: 220, y: 310, height: 20 } },
    });
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AA88`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 12,
          borderColor: `#98ADAA`,
          borderBottomWidth: 0,
          margin: -8,
          marginBottom: 0,
        },
        children: expect.objectContaining({
          type: Text,
          props: {
            style: {
              flexGrow: 1,
              color: `#ABAADE`,
              paddingVertical: 12,
              fontFamily: `Example Font Family`,
              fontSize: 37,
              lineHeight: 51.8,
            },
            children: `Example Button Content`,
          },
        }),
      },
    }),
    expect.objectContaining({
      nodeType: `component`,
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                position: `absolute`,
                maxHeight: 150,
                backgroundColor: `#32AA88`,
                borderWidth: 12,
                borderColor: `#98ADAA`,
                borderTopWidth: 0,
                margin: -8,
                marginTop: 0,
              },
              {
                left: 70,
                width: 220,
                top: 330,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Drop Down Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});
