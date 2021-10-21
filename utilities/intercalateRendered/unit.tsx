import * as React from "react";
import { Text } from "react-native";
import { intercalateRendered } from "../..";

test(`intercalates nothing`, () => {
  const separator = () => <Text>Example Separator</Text>;

  const between: JSX.Element = <React.Fragment />;

  const flattened = intercalateRendered(separator, between);

  expect(flattened).toEqual([]);
});

test(`intercalates one`, () => {
  const separator = () => <Text>Example Separator</Text>;

  const between: JSX.Element = <Text>Example Item A</Text>;

  const flattened = intercalateRendered(separator, between);

  expect(flattened).toEqual([<Text key="0">Example Item A</Text>]);
});

test(`intercalates two`, () => {
  const Separator = () => <Text>Example Separator</Text>;

  const between: JSX.Element = (
    <React.Fragment>
      <Text>Example Item A</Text>
      <Text>Example Item B</Text>
    </React.Fragment>
  );

  const flattened = intercalateRendered(Separator, between);

  expect(flattened).toEqual([
    <Text key="0">Example Item A</Text>,
    <Separator key="separator0" />,
    <Text key="1">Example Item B</Text>,
  ]);
});

test(`intercalates three`, () => {
  const Separator = () => <Text>Example Separator</Text>;

  const between: JSX.Element = (
    <React.Fragment>
      <Text>Example Item A</Text>
      <Text>Example Item B</Text>
      <Text>Example Item C</Text>
    </React.Fragment>
  );

  const flattened = intercalateRendered(Separator, between);

  expect(flattened).toEqual([
    <Text key="0">Example Item A</Text>,
    <Separator key="separator0" />,
    <Text key="1">Example Item B</Text>,
    <Separator key="separator1" />,
    <Text key="2">Example Item C</Text>,
  ]);
});

test(`intercalates four`, () => {
  const Separator = () => <Text>Example Separator</Text>;

  const between: JSX.Element = (
    <React.Fragment>
      <Text>Example Item A</Text>
      <Text>Example Item B</Text>
      <Text>Example Item C</Text>
      <Text>Example Item D</Text>
    </React.Fragment>
  );

  const flattened = intercalateRendered(Separator, between);

  expect(flattened).toEqual([
    <Text key="0">Example Item A</Text>,
    <Separator key="separator0" />,
    <Text key="1">Example Item B</Text>,
    <Separator key="separator1" />,
    <Text key="2">Example Item C</Text>,
    <Separator key="separator2" />,
    <Text key="3">Example Item D</Text>,
  ]);
});
