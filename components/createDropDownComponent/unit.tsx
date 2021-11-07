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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 70,
              width: 220,
              bottom: 160,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 70,
              width: 220,
              top: 330,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 70,
              width: 220,
              bottom: 160,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 70,
              width: 220,
              top: 330,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 10,
              width: 220,
              top: 330,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 70,
              width: 190,
              top: 330,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 70,
              width: 220,
              top: 320,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 70,
              width: 220,
              top: 325,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 70,
              width: 220,
              top: 330,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 70,
              width: 220,
              top: 330,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 70,
              width: 220,
              bottom: 80,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 70,
              width: 220,
              top: 350,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 70,
              width: 220,
              bottom: 160,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled>
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
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
    <Component label="Example Button Content" disabled>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
    <Component label="Example Button Content" disabled>
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  renderer.update(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
    <Component label="Example Button Content" disabled>
      <Text>Example Drop Down Content</Text>
    </Component>
  );

  renderer.update(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
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
            style: {
              position: `absolute`,
              maxHeight: 150,
              left: 70,
              width: 220,
              top: 330,
            },
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

  const Component = createDropDownComponent(150);

  const renderer = TestRenderer.create(
    <Component label="Example Button Content" disabled={false}>
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
        children: expect.objectContaining({
          type: Text,
          props: { children: `Example Button Content` },
        }),
      },
    })
  );

  renderer.unmount();
});
