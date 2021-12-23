import * as React from "react";
import { View, Text } from "react-native";
import { Row } from "../../..";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

test(`renders as expected when height fits content and horizontal distribution is left and vertical alignment is top`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="left"
      verticalAlignment="top"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, flexDirection: `row`, alignItems: `flex-start` }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is left and vertical alignment is centered`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="left"
      verticalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, flexDirection: `row`, alignItems: `center` }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is left and vertical alignment is bottom`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="left"
      verticalAlignment="bottom"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, flexDirection: `row`, alignItems: `flex-end` }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is left and vertical alignment is stretched`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="left"
      verticalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, flexDirection: `row` }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is centered and vertical alignment is top`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="centered"
      verticalAlignment="top"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `flex-start`,
        justifyContent: `center`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is centered and vertical alignment is centered`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="centered"
      verticalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is centered and vertical alignment is bottom`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="centered"
      verticalAlignment="bottom"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `flex-end`,
        justifyContent: `center`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is centered and vertical alignment is stretched`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="centered"
      verticalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, flexDirection: `row`, justifyContent: `center` }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is right and vertical alignment is top`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="right"
      verticalAlignment="top"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `flex-start`,
        justifyContent: `flex-end`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is right and vertical alignment is centered`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="right"
      verticalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `flex-end`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is right and vertical alignment is bottom`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="right"
      verticalAlignment="bottom"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `flex-end`,
        justifyContent: `flex-end`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is right and vertical alignment is stretched`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="right"
      verticalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        justifyContent: `flex-end`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is spaced and vertical alignment is top`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="spaced"
      verticalAlignment="top"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `flex-start`,
        justifyContent: `space-evenly`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is spaced and vertical alignment is centered`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="spaced"
      verticalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-evenly`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is spaced and vertical alignment is bottom`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="spaced"
      verticalAlignment="bottom"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `flex-end`,
        justifyContent: `space-evenly`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is spaced and vertical alignment is stretched`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="spaced"
      verticalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        justifyContent: `space-evenly`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is spaced to ends and vertical alignment is top`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="spacedTouchingEnds"
      verticalAlignment="top"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `flex-start`,
        justifyContent: `space-between`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is spaced to ends and vertical alignment is centered`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="spacedTouchingEnds"
      verticalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is spaced to ends and vertical alignment is bottom`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="spacedTouchingEnds"
      verticalAlignment="bottom"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `flex-end`,
        justifyContent: `space-between`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fits content and horizontal distribution is spaced to ends and vertical alignment is stretched`, () => {
  const rendered = (
    <Row
      height="fitsContent"
      horizontalDistribution="spacedTouchingEnds"
      verticalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        justifyContent: `space-between`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is left and vertical alignment is top`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="left"
      verticalAlignment="top"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-start`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is left and vertical alignment is centered`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="left"
      verticalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is left and vertical alignment is bottom`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="left"
      verticalAlignment="bottom"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-end`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is left and vertical alignment is stretched`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="left"
      verticalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, height: `100%`, flexDirection: `row` }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is centered and vertical alignment is top`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="centered"
      verticalAlignment="top"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-start`,
        justifyContent: `center`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is centered and vertical alignment is centered`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="centered"
      verticalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `center`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is centered and vertical alignment is bottom`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="centered"
      verticalAlignment="bottom"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-end`,
        justifyContent: `center`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is centered and vertical alignment is stretched`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="centered"
      verticalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        justifyContent: `center`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is right and vertical alignment is top`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="right"
      verticalAlignment="top"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-start`,
        justifyContent: `flex-end`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is right and vertical alignment is centered`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="right"
      verticalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `flex-end`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is right and vertical alignment is bottom`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="right"
      verticalAlignment="bottom"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-end`,
        justifyContent: `flex-end`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is right and vertical alignment is stretched`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="right"
      verticalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        justifyContent: `flex-end`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is spaced and vertical alignment is top`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="spaced"
      verticalAlignment="top"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-start`,
        justifyContent: `space-evenly`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is spaced and vertical alignment is centered`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="spaced"
      verticalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-evenly`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is spaced and vertical alignment is bottom`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="spaced"
      verticalAlignment="bottom"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-end`,
        justifyContent: `space-evenly`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is spaced and vertical alignment is stretched`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="spaced"
      verticalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        justifyContent: `space-evenly`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is spaced to ends and vertical alignment is top`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="spacedTouchingEnds"
      verticalAlignment="top"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-start`,
        justifyContent: `space-between`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is spaced to ends and vertical alignment is centered`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="spacedTouchingEnds"
      verticalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is spaced to ends and vertical alignment is bottom`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="spacedTouchingEnds"
      verticalAlignment="bottom"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-end`,
        justifyContent: `space-between`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when height fills container and horizontal distribution is spaced to ends and vertical alignment is stretched`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="spacedTouchingEnds"
      verticalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        justifyContent: `space-between`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected a second time`, () => {
  const rendered = (
    <Row
      height="fillsContainer"
      horizontalDistribution="spacedTouchingEnds"
      verticalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Row>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        justifyContent: `space-between`,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});
