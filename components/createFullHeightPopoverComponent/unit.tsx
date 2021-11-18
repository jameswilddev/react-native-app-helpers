import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import * as TestRenderer from "react-test-renderer";
import { createFullHeightPopoverComponent, Hitbox, SimpleModal } from "../..";

View;
SimpleModal;

test(`renders as expected when not disabled`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

test(`renders as expected when not disabled after layout`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

test(`renders as expected when disabled after layout`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

test(`renders as expected when not disabled after layout after press`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
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
        onMeasure: expect.any(Function),
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
                top: 0,
                height: `100%`,
                backgroundColor: `#CABA99`,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: `#646464`,
              },
              {
                left: 70,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when not disabled after press after layout`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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
                top: 0,
                height: `100%`,
                backgroundColor: `#CABA99`,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: `#646464`,
              },
              {
                left: 70,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
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
    ).props[`onMeasure`](123, 456, 220, 20, 10, 310);
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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
                top: 0,
                height: `100%`,
                backgroundColor: `#CABA99`,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: `#646464`,
              },
              {
                left: 10,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
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
    ).props[`onMeasure`](123, 456, 190, 20, 70, 310);
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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
                top: 0,
                height: `100%`,
                backgroundColor: `#CABA99`,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: `#646464`,
              },
              {
                left: 70,
                width: 190,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
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
    ).props[`onMeasure`](123, 456, 220, 20, 70, 300);
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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
                top: 0,
                height: `100%`,
                backgroundColor: `#CABA99`,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: `#646464`,
              },
              {
                left: 70,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 45, 220, 20, 70, 310);
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
    ).props[`onMeasure`](123, 456, 220, 15, 70, 310);
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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
                top: 0,
                height: `100%`,
                backgroundColor: `#CABA99`,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: `#646464`,
              },
              {
                left: 70,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
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
    ).props[`onMeasure`](123, 456, 220, 20, 70, 310);
  });

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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
                top: 0,
                height: `100%`,
                backgroundColor: `#CABA99`,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: `#646464`,
              },
              {
                left: 70,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
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
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
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
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
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
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  renderer.update(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
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
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  renderer.update(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
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
        onMeasure: expect.any(Function),
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
                top: 0,
                height: `100%`,
                backgroundColor: `#CABA99`,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: `#646464`,
              },
              {
                left: 70,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
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
        onMeasure: expect.any(Function),
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

test(`closes when the close callback is invoked`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createFullHeightPopoverComponent({
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
  });
  const children = jest.fn(() => <Text>Example Pop Over Content</Text>);

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={children}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 310);
  });

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  TestRenderer.act(() => {
    expect(children).toHaveBeenCalledTimes(1);
    (children.mock.calls[0] as ReadonlyArray<() => void>)[0]?.();
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

test(`renders as expected without a label when open`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 320);
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
        onMeasure: expect.any(Function),
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
                top: 0,
                height: `100%`,
                backgroundColor: `#CABA99`,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: `#646464`,
              },
              {
                left: 70,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid
      disabled
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

test(`renders as expected when invalid when open`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 320);
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
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#259284`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: `#9A9A8E`,
          margin: -2,
          borderRadius: 10,
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
                top: 0,
                height: `100%`,
                backgroundColor: `#32AA88`,
                borderLeftWidth: 12,
                borderRightWidth: 12,
                borderColor: `#98ADAA`,
              },
              {
                left: 70,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid={false}
      disabled
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

test(`renders as expected without a label when invalid`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 320);
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
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#259284`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: `#9A9A8E`,
          margin: -2,
          borderRadius: 10,
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
                top: 0,
                height: `100%`,
                backgroundColor: `#32AA88`,
                borderLeftWidth: 12,
                borderRightWidth: 12,
                borderColor: `#98ADAA`,
              },
              {
                left: 70,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
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

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label={null}
      placeholder="Example Placeholder"
      valid={false}
      disabled
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        onMeasure: expect.any(Function),
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

test(`renders as expected without borders`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 320);
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
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
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
                top: 0,
                height: `100%`,
                backgroundColor: `#CABA99`,
              },
              {
                left: 70,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when invalid without borders`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 320);
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
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#259284`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderRadius: 10,
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
                top: 0,
                height: `100%`,
                backgroundColor: `#32AA88`,
              },
              {
                left: 70,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected without radius`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 45, 220, 20, 70, 320);
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
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
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
                top: 0,
                height: `100%`,
                backgroundColor: `#CABA99`,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: `#646464`,
              },
              {
                left: 70,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});

test(`renders as expected when invalid without radius`, () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51,
    },
  });

  const Component = createFullHeightPopoverComponent({
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
  });

  const renderer = TestRenderer.create(
    <Component
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid={false}
      disabled={false}
      children={() => <Text>Example Pop Over Content</Text>}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onMeasure`
    ](123, 456, 220, 20, 70, 320);
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
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        style: {
          backgroundColor: `#259284`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: `#9A9A8E`,
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
                top: 0,
                height: `100%`,
                backgroundColor: `#32AA88`,
                borderLeftWidth: 12,
                borderRightWidth: 12,
                borderColor: `#98ADAA`,
              },
              {
                left: 70,
                width: 220,
              },
            ],
            children: expect.objectContaining({
              type: Text,
              props: {
                children: `Example Pop Over Content`,
              },
            }),
          },
        }),
      }),
    }),
  ]);

  renderer.unmount();
});
