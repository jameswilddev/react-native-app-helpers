import * as React from "react";
import { Text } from "react-native";
import { setRenderedKey } from "../..";

test(`can handle undefined`, () => {
  const element = undefined;

  const set = setRenderedKey(element, `Test Key`);

  expect(set).toEqual(undefined);
});

test(`can handle null`, () => {
  const element = null;

  const set = setRenderedKey(element, `Test Key`);

  expect(set).toEqual(null);
});

test(`can handle string typed components`, () => {
  const element = <div className="Example">Hello World</div>;

  const set = setRenderedKey(element, `Test Key`);

  expect(set).toEqual(
    <div className="Example" key="Test Key">
      Hello World
    </div>
  );
});

test(`can handle class typed components`, () => {
  const element = <Text numberOfLines={5}>Hello World</Text>;

  const set = setRenderedKey(element, `Test Key`);

  expect(set).toEqual(
    <Text numberOfLines={5} key="Test Key">
      Hello World
    </Text>
  );
});

test(`can handle string typed components which already have keys`, () => {
  const element = (
    <div className="Example" key="Test Existing Key">
      Hello World
    </div>
  );

  const set = setRenderedKey(element, `Test Replacement Key`);

  expect(set).toEqual(
    <div className="Example" key="Test Existing Key">
      Hello World
    </div>
  );
});

test(`can handle class typed components which already have keys`, () => {
  const element = (
    <Text numberOfLines={5} key="Test Existing Key">
      Hello World
    </Text>
  );

  const set = setRenderedKey(element, `Test Replacement Key`);

  expect(set).toEqual(
    <Text numberOfLines={5} key="Test Existing Key">
      Hello World
    </Text>
  );
});
