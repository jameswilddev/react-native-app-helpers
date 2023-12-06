import * as React from 'react'
import { View, Text } from 'react-native'
import { flattenRenderedToArray } from '../../..'

test('flattens elements', () => {
  const rendered: JSX.Element = (
    <React.Fragment>
      <div>Example Content A</div>
      <View>
        <Text>Example Content B</Text>
        {null}
        {[
          <Text key="x">Example Content C</Text>,
          <Text key="y">Example Content D</Text>,
          <Text key="z">Example Content E</Text>
        ]}
      </View>
      <React.Fragment />
      {[
        3,
        <Text key="a">Example Content F</Text>,
        undefined,
        false,
        true,
        null,
        <Text key="b">Example Content G</Text>,
        [
          <Text key="x">Example Content H</Text>,
          <Text key="y">Example Content I</Text>,
          <Text key="z">Example Content J</Text>
        ],
        null,
        <div key="c">Example Content K</div>
      ]}
      <div>
        <Text>Example Content L</Text>
        {null}
        {[
          <Text key="x">Example Content M</Text>,
          <Text key="y">Example Content N</Text>,
          <Text key="z">Example Content O</Text>
        ]}
      </div>
      <React.Fragment>
        <Text>Example Content P</Text>
      </React.Fragment>
    </React.Fragment>
  )

  const flattened = flattenRenderedToArray(rendered)

  expect(flattened).toEqual([
    <div key={0}>Example Content A</div>,
    <View key={1}>
      <Text>Example Content B</Text>
      {null}
      {[
        <Text key="x">Example Content C</Text>,
        <Text key="y">Example Content D</Text>,
        <Text key="z">Example Content E</Text>
      ]}
    </View>,
    3,
    <Text key="a">Example Content F</Text>,
    false,
    true,
    <Text key="b">Example Content G</Text>,
    <Text key="x">Example Content H</Text>,
    <Text key="y">Example Content I</Text>,
    <Text key="z">Example Content J</Text>,
    <div key="c">Example Content K</div>,
    <div key={11}>
      <Text>Example Content L</Text>
      {null}
      {[
        <Text key="x">Example Content M</Text>,
        <Text key="y">Example Content N</Text>,
        <Text key="z">Example Content O</Text>
      ]}
    </div>,
    <Text key="12">Example Content P</Text>
  ])
})
