import * as React from "react";
import { Text } from "react-native";
import * as TestRenderer from "react-test-renderer";
import { createFlashMessageComponent } from "../..";
import { Hitbox } from "../Hitbox";

test(`can initially be hidden`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(<Component state={null} />);

  expect(renderer.toTree()?.rendered).toBeNull();

  renderer.unmount();
});

test(`can initially be shown`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: Hitbox,
    props: {
      onPress: expect.any(Function),
      disabled: false,
      style: {
        backgroundColor: `blue`,
        borderWidth: 15,
        borderColor: `orange`,
        paddingHorizontal: 41,
        paddingVertical: 57,
        borderRadius: 12,
        marginBottom: 31,
      },
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 25,
            lineHeight: 35,
            color: `yellow`,
          },
          children: `Example Message`,
        },
      }),
    },
  });

  renderer.unmount();
});

test(`can change from hidden to visible`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(<Component state={null} />);

  renderer.update(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: Hitbox,
    props: {
      onPress: expect.any(Function),
      disabled: false,
      style: {
        backgroundColor: `blue`,
        borderWidth: 15,
        borderColor: `orange`,
        paddingHorizontal: 41,
        paddingVertical: 57,
        borderRadius: 12,
        marginBottom: 31,
      },
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 25,
            lineHeight: 35,
            color: `yellow`,
          },
          children: `Example Message`,
        },
      }),
    },
  });

  renderer.unmount();
});

test(`can change to another message when initially shown`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message A`,
      }}
    />
  );

  renderer.update(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message B`,
      }}
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: Hitbox,
    props: {
      onPress: expect.any(Function),
      disabled: false,
      style: {
        backgroundColor: `blue`,
        borderWidth: 15,
        borderColor: `orange`,
        paddingHorizontal: 41,
        paddingVertical: 57,
        borderRadius: 12,
        marginBottom: 31,
      },
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 25,
            lineHeight: 35,
            color: `yellow`,
          },
          children: `Example Message B`,
        },
      }),
    },
  });

  renderer.unmount();
});

test(`can change to another type when initially shown`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeC`,
        message: `Example Message`,
      }}
    />
  );

  renderer.update(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: Hitbox,
    props: {
      onPress: expect.any(Function),
      disabled: false,
      style: {
        backgroundColor: `blue`,
        borderWidth: 15,
        borderColor: `orange`,
        paddingHorizontal: 41,
        paddingVertical: 57,
        borderRadius: 12,
        marginBottom: 31,
      },
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 25,
            lineHeight: 35,
            color: `yellow`,
          },
          children: `Example Message`,
        },
      }),
    },
  });

  renderer.unmount();
});

test(`remains open if unchanged`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  renderer.update(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: Hitbox,
    props: {
      onPress: expect.any(Function),
      disabled: false,
      style: {
        backgroundColor: `blue`,
        borderWidth: 15,
        borderColor: `orange`,
        paddingHorizontal: 41,
        paddingVertical: 57,
        borderRadius: 12,
        marginBottom: 31,
      },
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 25,
            lineHeight: 35,
            color: `yellow`,
          },
          children: `Example Message`,
        },
      }),
    },
  });

  renderer.unmount();
});

test(`closes when pressed`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  console.log("before press");
  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });
  console.log("after press");

  expect(renderer.toTree()?.rendered).toBeNull();

  renderer.unmount();
});

test(`remains closed when the state does not change`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  renderer.update(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  expect(renderer.toTree()?.rendered).toBeNull();

  renderer.unmount();
});

test(`shows again when the message changes`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message A`,
      }}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  renderer.update(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message B`,
      }}
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: Hitbox,
    props: {
      onPress: expect.any(Function),
      disabled: false,
      style: {
        backgroundColor: `blue`,
        borderWidth: 15,
        borderColor: `orange`,
        paddingHorizontal: 41,
        paddingVertical: 57,
        borderRadius: 12,
        marginBottom: 31,
      },
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 25,
            lineHeight: 35,
            color: `yellow`,
          },
          children: `Example Message B`,
        },
      }),
    },
  });

  renderer.unmount();
});

test(`shows again when the type changes`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeC`,
        message: `Example Message`,
      }}
    />
  );

  TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      `onPress`
    ]();
  });

  renderer.update(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: Hitbox,
    props: {
      onPress: expect.any(Function),
      disabled: false,
      style: {
        backgroundColor: `blue`,
        borderWidth: 15,
        borderColor: `orange`,
        paddingHorizontal: 41,
        paddingVertical: 57,
        borderRadius: 12,
        marginBottom: 31,
      },
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 25,
            lineHeight: 35,
            color: `yellow`,
          },
          children: `Example Message`,
        },
      }),
    },
  });

  renderer.unmount();
});

test(`closes when withdrawn`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  renderer.update(<Component state={null} />);

  expect(renderer.toTree()?.rendered).toBeNull();

  renderer.unmount();
});

test(`renders as expected without border radius`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 0,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: Hitbox,
    props: {
      onPress: expect.any(Function),
      disabled: false,
      style: {
        backgroundColor: `blue`,
        borderWidth: 15,
        borderColor: `orange`,
        paddingHorizontal: 41,
        paddingVertical: 57,
        marginBottom: 31,
      },
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 25,
            lineHeight: 35,
            color: `yellow`,
          },
          children: `Example Message`,
        },
      }),
    },
  });

  renderer.unmount();
});

test(`renders as expected without horizontal padding`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 0,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: Hitbox,
    props: {
      onPress: expect.any(Function),
      disabled: false,
      style: {
        backgroundColor: `blue`,
        borderWidth: 15,
        borderColor: `orange`,
        paddingVertical: 57,
        borderRadius: 12,
        marginBottom: 31,
      },
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 25,
            lineHeight: 35,
            color: `yellow`,
          },
          children: `Example Message`,
        },
      }),
    },
  });

  renderer.unmount();
});

test(`renders as expected without vertical padding`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 0,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: Hitbox,
    props: {
      onPress: expect.any(Function),
      disabled: false,
      style: {
        backgroundColor: `blue`,
        borderWidth: 15,
        borderColor: `orange`,
        paddingHorizontal: 41,
        borderRadius: 12,
        marginBottom: 31,
      },
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 25,
            lineHeight: 35,
            color: `yellow`,
          },
          children: `Example Message`,
        },
      }),
    },
  });

  renderer.unmount();
});

test(`renders as expected without borders`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 31,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: null,
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: Hitbox,
    props: {
      onPress: expect.any(Function),
      disabled: false,
      style: {
        backgroundColor: `blue`,
        paddingHorizontal: 41,
        paddingVertical: 57,
        borderRadius: 12,
        marginBottom: 31,
      },
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 25,
            lineHeight: 35,
            color: `yellow`,
          },
          children: `Example Message`,
        },
      }),
    },
  });

  renderer.unmount();
});

test(`renders as expected without bottom margin`, () => {
  const Component = createFlashMessageComponent({
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    bottomMargin: 0,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  });

  const renderer = TestRenderer.create(
    <Component
      state={{
        type: `exampleTypeB`,
        message: `Example Message`,
      }}
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: Hitbox,
    props: {
      onPress: expect.any(Function),
      disabled: false,
      style: {
        backgroundColor: `blue`,
        borderWidth: 15,
        borderColor: `orange`,
        paddingHorizontal: 41,
        paddingVertical: 57,
        borderRadius: 12,
      },
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 25,
            lineHeight: 35,
            color: `yellow`,
          },
          children: `Example Message`,
        },
      }),
    },
  });

  renderer.unmount();
});
