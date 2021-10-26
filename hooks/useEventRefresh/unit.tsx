import * as React from "react";
import { Text } from "react-native";
import * as TestRenderer from "react-test-renderer";
import { useEventRefresh } from "../..";

test(`does not refresh the component when the event is never raised`, async () => {
  const event = {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };

  const Component = () => {
    const invocations = React.useRef(0);
    invocations.current++;

    useEventRefresh(event, `Event Type`);

    return <Text>{invocations.current} Invocation(s)</Text>;
  };

  const renderer = TestRenderer.create(<Component />);

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: [1, ` Invocation(s)`],
      }),
    })
  );

  renderer.unmount();

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(event.addListener).toHaveBeenCalledTimes(1);
  expect(event.addListener).toHaveBeenCalledWith(
    `Event Type`,
    expect.any(Function)
  );
  expect(event.removeListener).toHaveBeenCalledTimes(1);
  expect(event.removeListener).toHaveBeenCalledWith(
    `Event Type`,
    event.addListener.mock.calls[0][1]
  );
});

test(`refreshes the component once when the event is raised once`, async () => {
  const event = {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };

  const Component = () => {
    const invocations = React.useRef(0);
    invocations.current++;

    useEventRefresh(event, `Event Type`);

    return <Text>{invocations.current} Invocation(s)</Text>;
  };

  const renderer = TestRenderer.create(<Component />);

  await new Promise((resolve) => setTimeout(resolve, 10));

  TestRenderer.act(() => {
    event.addListener.mock.calls[0][1]();
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: [2, ` Invocation(s)`],
      }),
    })
  );

  renderer.unmount();

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(event.addListener).toHaveBeenCalledTimes(1);
  expect(event.addListener).toHaveBeenCalledWith(
    `Event Type`,
    expect.any(Function)
  );
  expect(event.removeListener).toHaveBeenCalledTimes(1);
  expect(event.removeListener).toHaveBeenCalledWith(
    `Event Type`,
    event.addListener.mock.calls[0][1]
  );
});

test(`refreshes the component twice when the event is raised twice`, async () => {
  const event = {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };

  const Component = () => {
    const invocations = React.useRef(0);
    invocations.current++;

    useEventRefresh(event, `Event Type`);

    return <Text>{invocations.current} Invocation(s)</Text>;
  };

  const renderer = TestRenderer.create(<Component />);

  await new Promise((resolve) => setTimeout(resolve, 10));

  TestRenderer.act(() => {
    event.addListener.mock.calls[0][1]();
  });

  TestRenderer.act(() => {
    event.addListener.mock.calls[0][1]();
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: [3, ` Invocation(s)`],
      }),
    })
  );

  renderer.unmount();

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(event.addListener).toHaveBeenCalledTimes(1);
  expect(event.addListener).toHaveBeenCalledWith(
    `Event Type`,
    expect.any(Function)
  );
  expect(event.removeListener).toHaveBeenCalledTimes(1);
  expect(event.removeListener).toHaveBeenCalledWith(
    `Event Type`,
    event.addListener.mock.calls[0][1]
  );
});

test(`resubscribes when the event type changes`, async () => {
  const order: string[] = [];
  const event = {
    addListener: jest.fn(() => {
      order.push(`add`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove`);
    }),
  };

  const Component: React.FunctionComponent<{ readonly eventType: string }> = ({
    eventType,
  }) => {
    const invocations = React.useRef(0);
    invocations.current++;

    useEventRefresh(event, eventType);

    return <Text>{invocations.current} Invocation(s)</Text>;
  };

  const renderer = TestRenderer.create(<Component eventType="Event Type A" />);

  renderer.update(<Component eventType="Event Type B" />);

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: [2, ` Invocation(s)`],
      }),
    })
  );

  renderer.unmount();

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(event.addListener).toHaveBeenCalledTimes(2);
  expect(event.addListener).toHaveBeenCalledWith(
    `Event Type A`,
    expect.any(Function)
  );
  expect(event.addListener).toHaveBeenCalledWith(
    `Event Type B`,
    expect.any(Function)
  );
  expect(event.removeListener).toHaveBeenCalledTimes(2);
  expect(event.removeListener).toHaveBeenCalledWith(
    `Event Type A`,
    (event.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(event.removeListener).toHaveBeenCalledWith(
    `Event Type B`,
    (event.addListener.mock.calls[1] as Array<unknown>)[1]
  );
  expect(order).toEqual([`add`, `remove`, `add`, `remove`]);
});

test(`refreshes the component once when the event type is changed and the event is subsequently raised`, async () => {
  const order: string[] = [];
  const event = {
    addListener: jest.fn(() => {
      order.push(`add`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove`);
    }),
  };

  const Component: React.FunctionComponent<{ readonly eventType: string }> = ({
    eventType,
  }) => {
    const invocations = React.useRef(0);
    invocations.current++;

    useEventRefresh(event, eventType);

    return <Text>{invocations.current} Invocation(s)</Text>;
  };

  const renderer = TestRenderer.create(<Component eventType="Event Type A" />);

  renderer.update(<Component eventType="Event Type B" />);

  await new Promise((resolve) => setTimeout(resolve, 10));

  TestRenderer.act(() => {
    (
      event.addListener.mock.calls[1] as unknown as readonly [
        string,
        () => void
      ]
    )[1]();
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: [3, ` Invocation(s)`],
      }),
    })
  );

  renderer.unmount();

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(event.addListener).toHaveBeenCalledTimes(2);
  expect(event.addListener).toHaveBeenCalledWith(
    `Event Type A`,
    expect.any(Function)
  );
  expect(event.addListener).toHaveBeenCalledWith(
    `Event Type B`,
    expect.any(Function)
  );
  expect(event.removeListener).toHaveBeenCalledTimes(2);
  expect(event.removeListener).toHaveBeenCalledWith(
    `Event Type A`,
    (event.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(event.removeListener).toHaveBeenCalledWith(
    `Event Type B`,
    (event.addListener.mock.calls[1] as Array<unknown>)[1]
  );
  expect(order).toEqual([`add`, `remove`, `add`, `remove`]);
});

test(`resubscribes when the event type changes twice`, async () => {
  const order: string[] = [];
  const event = {
    addListener: jest.fn(() => {
      order.push(`add`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove`);
    }),
  };

  const Component: React.FunctionComponent<{ readonly eventType: string }> = ({
    eventType,
  }) => {
    const invocations = React.useRef(0);
    invocations.current++;

    useEventRefresh(event, eventType);

    return <Text>{invocations.current} Invocation(s)</Text>;
  };

  const renderer = TestRenderer.create(<Component eventType="Event Type A" />);

  renderer.update(<Component eventType="Event Type B" />);

  renderer.update(<Component eventType="Event Type C" />);

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: [3, ` Invocation(s)`],
      }),
    })
  );

  renderer.unmount();

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(event.addListener).toHaveBeenCalledTimes(3);
  expect(event.addListener).toHaveBeenCalledWith(
    `Event Type A`,
    expect.any(Function)
  );
  expect(event.addListener).toHaveBeenCalledWith(
    `Event Type B`,
    expect.any(Function)
  );
  expect(event.addListener).toHaveBeenCalledWith(
    `Event Type C`,
    expect.any(Function)
  );
  expect(event.removeListener).toHaveBeenCalledTimes(3);
  expect(event.removeListener).toHaveBeenCalledWith(
    `Event Type A`,
    (event.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(event.removeListener).toHaveBeenCalledWith(
    `Event Type B`,
    (event.addListener.mock.calls[1] as Array<unknown>)[1]
  );
  expect(event.removeListener).toHaveBeenCalledWith(
    `Event Type C`,
    (event.addListener.mock.calls[2] as Array<unknown>)[1]
  );
  expect(order).toEqual([`add`, `remove`, `add`, `remove`, `add`, `remove`]);
});

test(`refreshes the component once when the event type is changed twice and the event is subsequently raised`, async () => {
  const order: string[] = [];
  const event = {
    addListener: jest.fn(() => {
      order.push(`add`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove`);
    }),
  };

  const Component: React.FunctionComponent<{ readonly eventType: string }> = ({
    eventType,
  }) => {
    const invocations = React.useRef(0);
    invocations.current++;

    useEventRefresh(event, eventType);

    return <Text>{invocations.current} Invocation(s)</Text>;
  };

  const renderer = TestRenderer.create(<Component eventType="Event Type A" />);

  renderer.update(<Component eventType="Event Type B" />);

  renderer.update(<Component eventType="Event Type C" />);

  await new Promise((resolve) => setTimeout(resolve, 10));

  TestRenderer.act(() => {
    (
      event.addListener.mock.calls[2] as unknown as readonly [
        string,
        () => void
      ]
    )[1]();
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: [4, ` Invocation(s)`],
      }),
    })
  );

  renderer.unmount();

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(event.addListener).toHaveBeenCalledTimes(3);
  expect(event.addListener).toHaveBeenCalledWith(
    `Event Type A`,
    expect.any(Function)
  );
  expect(event.addListener).toHaveBeenCalledWith(
    `Event Type B`,
    expect.any(Function)
  );
  expect(event.addListener).toHaveBeenCalledWith(
    `Event Type C`,
    expect.any(Function)
  );
  expect(event.removeListener).toHaveBeenCalledTimes(3);
  expect(event.removeListener).toHaveBeenCalledWith(
    `Event Type A`,
    (event.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(event.removeListener).toHaveBeenCalledWith(
    `Event Type B`,
    (event.addListener.mock.calls[1] as Array<unknown>)[1]
  );
  expect(event.removeListener).toHaveBeenCalledWith(
    `Event Type C`,
    (event.addListener.mock.calls[2] as Array<unknown>)[1]
  );
  expect(order).toEqual([`add`, `remove`, `add`, `remove`, `add`, `remove`]);
});

test(`resubscribes when the event changes`, async () => {
  const order: string[] = [];
  const eventA = {
    addListener: jest.fn(() => {
      order.push(`add a`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove a`);
    }),
  };
  const eventB = {
    addListener: jest.fn(() => {
      order.push(`add b`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove b`);
    }),
  };

  const Component: React.FunctionComponent<{
    readonly event: {
      addListener(eventType: `eventType`, listener: () => void): void;
      removeListener(eventType: `eventType`, listener: () => void): void;
    };
  }> = ({ event }) => {
    const invocations = React.useRef(0);
    invocations.current++;

    useEventRefresh(event, `Event Type`);

    return <Text>{invocations.current} Invocation(s)</Text>;
  };

  const renderer = TestRenderer.create(<Component event={eventA} />);

  renderer.update(<Component event={eventB} />);

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: [2, ` Invocation(s)`],
      }),
    })
  );

  renderer.unmount();

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(eventA.addListener).toHaveBeenCalledTimes(1);
  expect(eventA.addListener).toHaveBeenCalledWith(
    `Event Type`,
    expect.any(Function)
  );
  expect(eventB.addListener).toHaveBeenCalledTimes(1);
  expect(eventB.addListener).toHaveBeenCalledWith(
    `Event Type`,
    expect.any(Function)
  );
  expect(eventA.removeListener).toHaveBeenCalledTimes(1);
  expect(eventA.removeListener).toHaveBeenCalledWith(
    `Event Type`,
    (eventA.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(eventB.removeListener).toHaveBeenCalledTimes(1);
  expect(eventB.removeListener).toHaveBeenCalledWith(
    `Event Type`,
    (eventB.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(order).toEqual([`add a`, `remove a`, `add b`, `remove b`]);
});

test(`refreshes the component once when the event is changed then raised`, async () => {
  const order: string[] = [];
  const eventA = {
    addListener: jest.fn(() => {
      order.push(`add a`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove a`);
    }),
  };
  const eventB = {
    addListener: jest.fn(() => {
      order.push(`add b`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove b`);
    }),
  };

  const Component: React.FunctionComponent<{
    readonly event: {
      addListener(eventType: `eventType`, listener: () => void): void;
      removeListener(eventType: `eventType`, listener: () => void): void;
    };
  }> = ({ event }) => {
    const invocations = React.useRef(0);
    invocations.current++;

    useEventRefresh(event, `Event Type`);

    return <Text>{invocations.current} Invocation(s)</Text>;
  };

  const renderer = TestRenderer.create(<Component event={eventA} />);

  renderer.update(<Component event={eventB} />);

  await new Promise((resolve) => setTimeout(resolve, 10));

  TestRenderer.act(() => {
    (
      eventB.addListener.mock.calls[0] as unknown as readonly [
        string,
        () => void
      ]
    )[1]();
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: [3, ` Invocation(s)`],
      }),
    })
  );

  renderer.unmount();

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(eventA.addListener).toHaveBeenCalledTimes(1);
  expect(eventA.addListener).toHaveBeenCalledWith(
    `Event Type`,
    expect.any(Function)
  );
  expect(eventB.addListener).toHaveBeenCalledTimes(1);
  expect(eventB.addListener).toHaveBeenCalledWith(
    `Event Type`,
    expect.any(Function)
  );
  expect(eventA.removeListener).toHaveBeenCalledTimes(1);
  expect(eventA.removeListener).toHaveBeenCalledWith(
    `Event Type`,
    (eventA.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(eventB.removeListener).toHaveBeenCalledTimes(1);
  expect(eventB.removeListener).toHaveBeenCalledWith(
    `Event Type`,
    (eventB.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(order).toEqual([`add a`, `remove a`, `add b`, `remove b`]);
});

test(`resubscribes when the event changes again`, async () => {
  const order: string[] = [];
  const eventA = {
    addListener: jest.fn(() => {
      order.push(`add a`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove a`);
    }),
  };
  const eventB = {
    addListener: jest.fn(() => {
      order.push(`add b`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove b`);
    }),
  };
  const eventC = {
    addListener: jest.fn(() => {
      order.push(`add c`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove c`);
    }),
  };

  const Component: React.FunctionComponent<{
    readonly event: {
      addListener(eventType: `eventType`, listener: () => void): void;
      removeListener(eventType: `eventType`, listener: () => void): void;
    };
  }> = ({ event }) => {
    const invocations = React.useRef(0);
    invocations.current++;

    useEventRefresh(event, `Event Type`);

    return <Text>{invocations.current} Invocation(s)</Text>;
  };

  const renderer = TestRenderer.create(<Component event={eventA} />);

  renderer.update(<Component event={eventB} />);

  renderer.update(<Component event={eventC} />);

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: [3, ` Invocation(s)`],
      }),
    })
  );

  renderer.unmount();

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(eventA.addListener).toHaveBeenCalledTimes(1);
  expect(eventA.addListener).toHaveBeenCalledWith(
    `Event Type`,
    expect.any(Function)
  );
  expect(eventB.addListener).toHaveBeenCalledTimes(1);
  expect(eventB.addListener).toHaveBeenCalledWith(
    `Event Type`,
    expect.any(Function)
  );
  expect(eventC.addListener).toHaveBeenCalledTimes(1);
  expect(eventC.addListener).toHaveBeenCalledWith(
    `Event Type`,
    expect.any(Function)
  );
  expect(eventA.removeListener).toHaveBeenCalledTimes(1);
  expect(eventA.removeListener).toHaveBeenCalledWith(
    `Event Type`,
    (eventA.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(eventB.removeListener).toHaveBeenCalledTimes(1);
  expect(eventB.removeListener).toHaveBeenCalledWith(
    `Event Type`,
    (eventB.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(eventC.removeListener).toHaveBeenCalledTimes(1);
  expect(eventC.removeListener).toHaveBeenCalledWith(
    `Event Type`,
    (eventC.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(order).toEqual([
    `add a`,
    `remove a`,
    `add b`,
    `remove b`,
    `add c`,
    `remove c`,
  ]);
});

test(`refreshes the component once when the event is changed then raised`, async () => {
  const order: string[] = [];
  const eventA = {
    addListener: jest.fn(() => {
      order.push(`add a`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove a`);
    }),
  };
  const eventB = {
    addListener: jest.fn(() => {
      order.push(`add b`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove b`);
    }),
  };
  const eventC = {
    addListener: jest.fn(() => {
      order.push(`add c`);
    }),
    removeListener: jest.fn(() => {
      order.push(`remove c`);
    }),
  };

  const Component: React.FunctionComponent<{
    readonly event: {
      addListener(eventType: `eventType`, listener: () => void): void;
      removeListener(eventType: `eventType`, listener: () => void): void;
    };
  }> = ({ event }) => {
    const invocations = React.useRef(0);
    invocations.current++;

    useEventRefresh(event, `Event Type`);

    return <Text>{invocations.current} Invocation(s)</Text>;
  };

  const renderer = TestRenderer.create(<Component event={eventA} />);

  renderer.update(<Component event={eventB} />);

  renderer.update(<Component event={eventC} />);

  await new Promise((resolve) => setTimeout(resolve, 10));

  TestRenderer.act(() => {
    (
      eventC.addListener.mock.calls[0] as unknown as readonly [
        string,
        () => void
      ]
    )[1]();
  });

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: [4, ` Invocation(s)`],
      }),
    })
  );

  renderer.unmount();

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(eventA.addListener).toHaveBeenCalledTimes(1);
  expect(eventA.addListener).toHaveBeenCalledWith(
    `Event Type`,
    expect.any(Function)
  );
  expect(eventB.addListener).toHaveBeenCalledTimes(1);
  expect(eventB.addListener).toHaveBeenCalledWith(
    `Event Type`,
    expect.any(Function)
  );
  expect(eventC.addListener).toHaveBeenCalledTimes(1);
  expect(eventC.addListener).toHaveBeenCalledWith(
    `Event Type`,
    expect.any(Function)
  );
  expect(eventA.removeListener).toHaveBeenCalledTimes(1);
  expect(eventA.removeListener).toHaveBeenCalledWith(
    `Event Type`,
    (eventA.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(eventB.removeListener).toHaveBeenCalledTimes(1);
  expect(eventB.removeListener).toHaveBeenCalledWith(
    `Event Type`,
    (eventB.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(eventC.removeListener).toHaveBeenCalledTimes(1);
  expect(eventC.removeListener).toHaveBeenCalledWith(
    `Event Type`,
    (eventC.addListener.mock.calls[0] as Array<unknown>)[1]
  );
  expect(order).toEqual([
    `add a`,
    `remove a`,
    `add b`,
    `remove b`,
    `add c`,
    `remove c`,
  ]);
});
