import * as React from 'react'
import { Text, View } from 'react-native'
import {
  createVerticalSplitButtonComponent,
  unwrapRenderedFunctionComponent
} from '../../..'
import { Hitbox } from '../Hitbox'

test('renders as expected with one inactive button width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('raises the change event when a single button is pressed width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  unwrapRenderedFunctionComponent(rendered).props.children[0].props.onPress()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(['Example Value B'])
})

test('renders as expected with one active button width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkmagenta',
            borderWidth: 4,
            borderRadius: 23,
            borderColor: 'darkorange',
            margin: 3,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkolivegreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one disabled button width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkorchid',
            borderWidth: 22,
            borderRadius: 19,
            borderColor: 'darksalmon',
            margin: -15,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkred',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one disabled and active button width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkseagreen',
            borderWidth: 77,
            borderRadius: 44,
            borderColor: 'darkslategrey',
            margin: -70,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkslateblue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one inactive button without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one active button without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkmagenta',
            borderWidth: 4,
            borderRadius: 23,
            borderColor: 'darkorange',
            margin: 3,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkolivegreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one disabled button without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkorchid',
            borderWidth: 22,
            borderRadius: 19,
            borderColor: 'darksalmon',
            margin: -15,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkred',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one disabled and active button without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkseagreen',
            borderWidth: 77,
            borderRadius: 44,
            borderColor: 'darkslategrey',
            margin: -70,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkslateblue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one inactive button without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one active button without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkmagenta',
            borderWidth: 4,
            borderRadius: 23,
            borderColor: 'darkorange',
            margin: 3,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkolivegreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one disabled button without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkorchid',
            borderWidth: 22,
            borderRadius: 19,
            borderColor: 'darksalmon',
            margin: -15,
            paddingHorizontal: 54
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkred',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one disabled and active button without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkseagreen',
            borderWidth: 77,
            borderRadius: 44,
            borderColor: 'darkslategrey',
            margin: -70,
            paddingHorizontal: 54
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkslateblue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one inactive button without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 0,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderColor: 'darkgrey',
            margin: -1,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one active button without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 0,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkmagenta',
            borderWidth: 4,
            borderColor: 'darkorange',
            margin: 3,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkolivegreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one disabled button without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 0,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkorchid',
            borderWidth: 22,
            borderColor: 'darksalmon',
            margin: -15,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkred',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one disabled and active button without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 0,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkseagreen',
            borderWidth: 77,
            borderColor: 'darkslategrey',
            margin: -70,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkslateblue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one inactive button without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: null
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderRadius: 15,
            margin: 7,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one active button without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: null
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkmagenta',
            borderRadius: 23,
            margin: 7,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkolivegreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one disabled button without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: null
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkorchid',
            borderRadius: 19,
            margin: 7,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkred',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one disabled and active button without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: null
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkseagreen',
            borderRadius: 44,
            margin: 7,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkslateblue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two inactive buttons width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is active width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'seashell',
            borderWidth: 43,
            borderBottomWidth: 0,
            borderTopLeftRadius: 33,
            borderTopRightRadius: 33,
            borderColor: 'saddlebrown',
            margin: -36,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'seagreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is disabled width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'rosybrown',
            borderWidth: 1,
            borderBottomWidth: 0,
            borderTopLeftRadius: 72,
            borderTopRightRadius: 72,
            borderColor: 'slategray',
            margin: 6,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'sienna',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is disabled and active width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'thistle',
            borderWidth: 9,
            borderBottomWidth: 0,
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            borderColor: 'tan',
            margin: -2,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'teal',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is active width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'oldlace',
            borderWidth: 76,
            borderTopWidth: 0,
            borderBottomLeftRadius: 52,
            borderBottomRightRadius: 52,
            borderColor: 'olivedrab',
            margin: -69,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'mediumorchid',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is disabled width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'wheat',
            borderWidth: 2,
            borderTopWidth: 0,
            borderBottomLeftRadius: 34,
            borderBottomRightRadius: 34,
            borderColor: 'magenta',
            margin: 5,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'lightgreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is disabled and active width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'mintcream',
            borderWidth: 48,
            borderTopWidth: 0,
            borderBottomLeftRadius: 9,
            borderBottomRightRadius: 9,
            borderColor: 'peachpuff',
            margin: -41,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'rebeccapurple',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two inactive buttons without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is active, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'seashell',
            borderWidth: 43,
            borderBottomWidth: 0,
            borderTopLeftRadius: 33,
            borderTopRightRadius: 33,
            borderColor: 'saddlebrown',
            margin: -36,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'seagreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is disabled, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'rosybrown',
            borderWidth: 1,
            borderBottomWidth: 0,
            borderTopLeftRadius: 72,
            borderTopRightRadius: 72,
            borderColor: 'slategray',
            margin: 6,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'sienna',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is disabled and active, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'thistle',
            borderWidth: 9,
            borderBottomWidth: 0,
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            borderColor: 'tan',
            margin: -2,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'teal',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is active, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'oldlace',
            borderWidth: 76,
            borderTopWidth: 0,
            borderBottomLeftRadius: 52,
            borderBottomRightRadius: 52,
            borderColor: 'olivedrab',
            margin: -69,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'mediumorchid',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is disabled, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'wheat',
            borderWidth: 2,
            borderTopWidth: 0,
            borderBottomLeftRadius: 34,
            borderBottomRightRadius: 34,
            borderColor: 'magenta',
            margin: 5,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'lightgreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is disabled and active, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'mintcream',
            borderWidth: 48,
            borderTopWidth: 0,
            borderBottomLeftRadius: 9,
            borderBottomRightRadius: 9,
            borderColor: 'peachpuff',
            margin: -41,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'rebeccapurple',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two inactive buttons without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is active, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'seashell',
            borderWidth: 43,
            borderBottomWidth: 0,
            borderTopLeftRadius: 33,
            borderTopRightRadius: 33,
            borderColor: 'saddlebrown',
            margin: -36,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'seagreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is disabled, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'rosybrown',
            borderWidth: 1,
            borderBottomWidth: 0,
            borderTopLeftRadius: 72,
            borderTopRightRadius: 72,
            borderColor: 'slategray',
            margin: 6,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'sienna',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is disabled and active, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'thistle',
            borderWidth: 9,
            borderBottomWidth: 0,
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            borderColor: 'tan',
            margin: -2,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'teal',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is active, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'oldlace',
            borderWidth: 76,
            borderTopWidth: 0,
            borderBottomLeftRadius: 52,
            borderBottomRightRadius: 52,
            borderColor: 'olivedrab',
            margin: -69,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'mediumorchid',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is disabled, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'wheat',
            borderWidth: 2,
            borderTopWidth: 0,
            borderBottomLeftRadius: 34,
            borderBottomRightRadius: 34,
            borderColor: 'magenta',
            margin: 5,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'lightgreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is disabled and active, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'mintcream',
            borderWidth: 48,
            borderTopWidth: 0,
            borderBottomLeftRadius: 9,
            borderBottomRightRadius: 9,
            borderColor: 'peachpuff',
            margin: -41,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'rebeccapurple',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two inactive buttons without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 0,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 0,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is active, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 0,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'seashell',
            borderWidth: 43,
            borderBottomWidth: 0,
            borderColor: 'saddlebrown',
            margin: -36,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'seagreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is disabled, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 0,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'rosybrown',
            borderWidth: 1,
            borderBottomWidth: 0,
            borderColor: 'slategray',
            margin: 6,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'sienna',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is disabled and active, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 0,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'thistle',
            borderWidth: 9,
            borderBottomWidth: 0,
            borderColor: 'tan',
            margin: -2,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'teal',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is active, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 0,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'oldlace',
            borderWidth: 76,
            borderTopWidth: 0,
            borderColor: 'olivedrab',
            margin: -69,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'mediumorchid',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is disabled, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 0,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'wheat',
            borderWidth: 2,
            borderTopWidth: 0,
            borderColor: 'magenta',
            margin: 5,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'lightgreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is disabled and active, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 0,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'mintcream',
            borderWidth: 48,
            borderTopWidth: 0,
            borderColor: 'peachpuff',
            margin: -41,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'rebeccapurple',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two inactive buttons without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: null
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: null
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            margin: 7,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            margin: 7,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is active, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: null
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'seashell',
            borderTopLeftRadius: 33,
            borderTopRightRadius: 33,
            margin: 7,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'seagreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is disabled, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: null
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'rosybrown',
            borderTopLeftRadius: 72,
            borderTopRightRadius: 72,
            margin: 7,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'sienna',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the left of which is disabled and active, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: null
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'thistle',
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            margin: 7,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'teal',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderTopWidth: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderColor: 'orange',
            margin: -5,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is active, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: null
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'oldlace',
            borderBottomLeftRadius: 52,
            borderBottomRightRadius: 52,
            margin: 7,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'mediumorchid',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is disabled, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: null
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'wheat',
            borderBottomLeftRadius: 34,
            borderBottomRightRadius: 34,
            margin: 7,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'lightgreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with two buttons, the right of which is disabled and active, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: null
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderWidth: 29,
            borderBottomWidth: 0,
            borderTopLeftRadius: 47,
            borderTopRightRadius: 47,
            borderColor: 'yellowgreen',
            margin: -22,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'mintcream',
            borderBottomLeftRadius: 9,
            borderBottomRightRadius: 9,
            margin: 7,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'rebeccapurple',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three inactive buttons width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is active width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'oldlace',
            borderTopLeftRadius: 52,
            borderTopRightRadius: 52,
            borderWidth: 76,
            borderBottomWidth: 0,
            borderColor: 'olivedrab',
            margin: -69,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'mediumorchid',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is disabled width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'wheat',
            borderTopLeftRadius: 34,
            borderTopRightRadius: 34,
            borderWidth: 2,
            borderBottomWidth: 0,
            borderColor: 'magenta',
            margin: 5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'lightgreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is disabled and active width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'mintcream',
            borderTopLeftRadius: 9,
            borderTopRightRadius: 9,
            borderWidth: 48,
            borderBottomWidth: 0,
            borderColor: 'peachpuff',
            margin: -41,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'rebeccapurple',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is active width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'seashell',
            borderLeftWidth: 43,
            borderRightWidth: 43,
            borderColor: 'saddlebrown',
            marginHorizontal: -36,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'seagreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is disabled width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'rosybrown',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: 'slategray',
            marginHorizontal: 6,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'sienna',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is disabled and active width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'thistle',
            borderLeftWidth: 9,
            borderRightWidth: 9,
            borderColor: 'tan',
            marginHorizontal: -2,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'teal',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is active width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkmagenta',
            borderWidth: 4,
            borderTopWidth: 0,
            borderBottomLeftRadius: 23,
            borderBottomRightRadius: 23,
            borderColor: 'darkorange',
            margin: 3,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkolivegreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is disabled width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkorchid',
            borderWidth: 22,
            borderTopWidth: 0,
            borderBottomLeftRadius: 19,
            borderBottomRightRadius: 19,
            borderColor: 'darksalmon',
            margin: -15,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkred',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is disabled and active width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkseagreen',
            borderWidth: 77,
            borderTopWidth: 0,
            borderBottomLeftRadius: 44,
            borderBottomRightRadius: 44,
            borderColor: 'darkslategrey',
            margin: -70,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkslateblue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three inactive buttons without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is active, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'oldlace',
            borderTopLeftRadius: 52,
            borderTopRightRadius: 52,
            borderWidth: 76,
            borderBottomWidth: 0,
            borderColor: 'olivedrab',
            margin: -69,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'mediumorchid',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is disabled, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'wheat',
            borderTopLeftRadius: 34,
            borderTopRightRadius: 34,
            borderWidth: 2,
            borderBottomWidth: 0,
            borderColor: 'magenta',
            margin: 5,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'lightgreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is disabled and active, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'mintcream',
            borderTopLeftRadius: 9,
            borderTopRightRadius: 9,
            borderWidth: 48,
            borderBottomWidth: 0,
            borderColor: 'peachpuff',
            margin: -41,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'rebeccapurple',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is active, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'seashell',
            borderLeftWidth: 43,
            borderRightWidth: 43,
            borderColor: 'saddlebrown',
            marginHorizontal: -36,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'seagreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is disabled, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'rosybrown',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: 'slategray',
            marginHorizontal: 6,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'sienna',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is disabled and active, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'thistle',
            borderLeftWidth: 9,
            borderRightWidth: 9,
            borderColor: 'tan',
            marginHorizontal: -2,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'teal',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is active, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkmagenta',
            borderWidth: 4,
            borderTopWidth: 0,
            borderBottomLeftRadius: 23,
            borderBottomRightRadius: 23,
            borderColor: 'darkorange',
            margin: 3,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkolivegreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is disabled, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkorchid',
            borderWidth: 22,
            borderTopWidth: 0,
            borderBottomLeftRadius: 19,
            borderBottomRightRadius: 19,
            borderColor: 'darksalmon',
            margin: -15,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkred',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is disabled and active, without horizontal padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 0,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkseagreen',
            borderWidth: 77,
            borderTopWidth: 0,
            borderBottomLeftRadius: 44,
            borderBottomRightRadius: 44,
            borderColor: 'darkslategrey',
            margin: -70,
            marginTop: 0,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkslateblue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three inactive buttons without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is active, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'oldlace',
            borderTopLeftRadius: 52,
            borderTopRightRadius: 52,
            borderWidth: 76,
            borderBottomWidth: 0,
            borderColor: 'olivedrab',
            margin: -69,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'mediumorchid',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is disabled, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'wheat',
            borderTopLeftRadius: 34,
            borderTopRightRadius: 34,
            borderWidth: 2,
            borderBottomWidth: 0,
            borderColor: 'magenta',
            margin: 5,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'lightgreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is disabled and active, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'mintcream',
            borderTopLeftRadius: 9,
            borderTopRightRadius: 9,
            borderWidth: 48,
            borderBottomWidth: 0,
            borderColor: 'peachpuff',
            margin: -41,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'rebeccapurple',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is active, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'seashell',
            borderLeftWidth: 43,
            borderRightWidth: 43,
            borderColor: 'saddlebrown',
            marginHorizontal: -36,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'seagreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is disabled, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'rosybrown',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: 'slategray',
            marginHorizontal: 6,
            paddingHorizontal: 54
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'sienna',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is disabled and active, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'thistle',
            borderLeftWidth: 9,
            borderRightWidth: 9,
            borderColor: 'tan',
            marginHorizontal: -2,
            paddingHorizontal: 54
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'teal',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is active, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkmagenta',
            borderWidth: 4,
            borderTopWidth: 0,
            borderBottomLeftRadius: 23,
            borderBottomRightRadius: 23,
            borderColor: 'darkorange',
            margin: 3,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkolivegreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is disabled, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkorchid',
            borderWidth: 22,
            borderTopWidth: 0,
            borderBottomLeftRadius: 19,
            borderBottomRightRadius: 19,
            borderColor: 'darksalmon',
            margin: -15,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkred',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is disabled and active, without vertical padding width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 0,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkseagreen',
            borderWidth: 77,
            borderTopWidth: 0,
            borderBottomLeftRadius: 44,
            borderBottomRightRadius: 44,
            borderColor: 'darkslategrey',
            margin: -70,
            marginTop: 0,
            paddingHorizontal: 54
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkslateblue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three inactive buttons without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 0,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 0,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 0,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is active, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 0,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'oldlace',
            borderWidth: 76,
            borderBottomWidth: 0,
            borderColor: 'olivedrab',
            margin: -69,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'mediumorchid',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is disabled, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 0,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'wheat',
            borderWidth: 2,
            borderBottomWidth: 0,
            borderColor: 'magenta',
            margin: 5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'lightgreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is disabled and active, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 0,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'mintcream',
            borderWidth: 48,
            borderBottomWidth: 0,
            borderColor: 'peachpuff',
            margin: -41,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'rebeccapurple',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is active, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 0,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'seashell',
            borderLeftWidth: 43,
            borderRightWidth: 43,
            borderColor: 'saddlebrown',
            marginHorizontal: -36,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'seagreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is disabled, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 0,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'rosybrown',
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderColor: 'slategray',
            marginHorizontal: 6,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'sienna',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is disabled and active, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 0,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'thistle',
            borderLeftWidth: 9,
            borderRightWidth: 9,
            borderColor: 'tan',
            marginHorizontal: -2,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'teal',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is active, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 0,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkmagenta',
            borderWidth: 4,
            borderTopWidth: 0,
            borderColor: 'darkorange',
            margin: 3,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkolivegreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is disabled, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 0,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkorchid',
            borderWidth: 22,
            borderTopWidth: 0,
            borderColor: 'darksalmon',
            margin: -15,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkred',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is disabled and active, without radius width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 0,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkseagreen',
            borderWidth: 77,
            borderTopWidth: 0,
            borderColor: 'darkslategrey',
            margin: -70,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkslateblue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three inactive buttons without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: null
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: null
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: null
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            margin: 7,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            marginHorizontal: 7,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            margin: 7,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is active, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: null
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'oldlace',
            borderTopLeftRadius: 52,
            borderTopRightRadius: 52,
            margin: 7,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'mediumorchid',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is disabled, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: null
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'wheat',
            borderTopLeftRadius: 34,
            borderTopRightRadius: 34,
            margin: 7,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'lightgreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the left of which is disabled and active, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: null
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value A']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'mintcream',
            borderTopLeftRadius: 9,
            borderTopRightRadius: 9,
            margin: 7,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'rebeccapurple',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is active, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: null
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'seashell',
            marginHorizontal: 7,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'seagreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is disabled, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: null
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'rosybrown',
            marginHorizontal: 7,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'sienna',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the middle of which is disabled and active, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: null
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'thistle',
            marginHorizontal: 7,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'teal',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is active, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: null
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkmagenta',
            borderBottomLeftRadius: 23,
            borderBottomRightRadius: 23,
            margin: 7,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkolivegreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is disabled, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: null
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkorchid',
            borderBottomLeftRadius: 19,
            borderBottomRightRadius: 19,
            margin: 7,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkred',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three buttons, the right of which is disabled and active, without borders width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: null
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value B']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'darkseagreen',
            borderBottomLeftRadius: 44,
            borderBottomRightRadius: 44,
            margin: 7,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkslateblue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('raises the change event when the first of three buttons is pressed width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  unwrapRenderedFunctionComponent(rendered).props.children[0].props.onPress()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(['Example Value A'])
})

test('raises the change event when the second of three buttons is pressed width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  unwrapRenderedFunctionComponent(rendered).props.children[1].props.onPress()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(['Example Value C'])
})

test('raises the change event when the third of three buttons is pressed width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  unwrapRenderedFunctionComponent(rendered).props.children[2].props.onPress()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(['Example Value B'])
})

test('excludes null width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      {null}
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 12,
            borderBottomWidth: 0,
            borderColor: 'orange',
            margin: -5,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 8,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            margin: -1,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('throws the expected error when a non-element is present width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      Example Non-Element
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(() => {
    unwrapRenderedFunctionComponent(rendered)
  }).toThrowError('Unexpected child in split button.')

  expect(onChange).not.toHaveBeenCalled()
})

test('throws the expected error when an unexpected element is present width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <Text>Example Unexpected Element</Text>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(() => {
    unwrapRenderedFunctionComponent(rendered)
  }).toThrowError('Unexpected child in split button.')

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with one inactive button which does not require margin width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 7,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentB = Component.segments.exampleTypeB

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 7,
            borderRadius: 15,
            borderColor: 'darkgrey',
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with three inactive buttons which do not require margin width', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 7,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 7,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 7,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value D']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderWidth: 7,
            borderBottomWidth: 0,
            borderColor: 'orange',
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'blue',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 7,
            borderRightWidth: 7,
            borderColor: 'yellowgreen',
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderWidth: 7,
            borderTopWidth: 0,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderColor: 'darkgrey',
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with multiple active buttons', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
    | 'Example Value E'
    | 'Example Value F'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C', 'Example Value F', 'Example Value A', 'Example Value E']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
      <SegmentC value="Example Value D" disabled={false}>
        Example Label D
      </SegmentC>
      <SegmentC value="Example Value E" disabled={false}>
        Example Label E
      </SegmentC>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        alignItems: 'stretch',
        flexDirection: 'column'
      }}
    >
      {[
        <Hitbox
          key="Example Value A"
          style={{
            backgroundColor: 'oldlace',
            borderTopLeftRadius: 52,
            borderTopRightRadius: 52,
            borderWidth: 76,
            borderBottomWidth: 0,
            borderColor: 'olivedrab',
            margin: -69,
            marginBottom: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'mediumorchid',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label A
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value C"
          style={{
            backgroundColor: 'seashell',
            borderLeftWidth: 43,
            borderRightWidth: 43,
            borderColor: 'saddlebrown',
            marginHorizontal: -36,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'seagreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label C
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value B"
          style={{
            backgroundColor: 'crimson',
            borderLeftWidth: 8,
            borderRightWidth: 8,
            borderColor: 'darkgrey',
            marginHorizontal: -1,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'darkgoldenrod',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label B
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value D"
          style={{
            backgroundColor: 'turquoise',
            borderLeftWidth: 29,
            borderRightWidth: 29,
            borderColor: 'yellowgreen',
            marginHorizontal: -22,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'whitesmoke',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label D
          </Text>
        </Hitbox>,
        <Hitbox
          key="Example Value E"
          style={{
            backgroundColor: 'seashell',
            borderWidth: 43,
            borderTopWidth: 0,
            borderBottomLeftRadius: 33,
            borderBottomRightRadius: 33,
            borderColor: 'saddlebrown',
            margin: -36,
            marginTop: 0,
            paddingHorizontal: 54,
            paddingVertical: 32
          }}
          disabled={false}
          onPress={expect.any(Function)}
        >
          <Text
            style={{
              fontFamily: 'Example Font Family',
              fontSize: 44,
              lineHeight: 61.599999999999994,
              color: 'seagreen',
              textAlign: 'center'
            }}
            numberOfLines={1}
          >
            Example Label E
          </Text>
        </Hitbox>
      ]}
    </View>
  )

  expect(onChange).not.toHaveBeenCalled()
})

test('raises the change event when an additional button is pressed', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
    | 'Example Value E'
    | 'Example Value F'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value C', 'Example Value F', 'Example Value A', 'Example Value E']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
      <SegmentC value="Example Value D" disabled={false}>
        Example Label D
      </SegmentC>
      <SegmentC value="Example Value E" disabled={false}>
        Example Label E
      </SegmentC>
    </Component>
  )

  unwrapRenderedFunctionComponent(rendered).props.children[2].props.onPress()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(['Example Value C', 'Example Value A', 'Example Value E', 'Example Value B'])
})

test('raises the change event when a selected button is pressed', () => {
  type ExampleType = 'exampleTypeA' | 'exampleTypeB' | 'exampleTypeC'
  type ExampleValue =
    | 'Example Value A'
    | 'Example Value B'
    | 'Example Value C'
    | 'Example Value D'
    | 'Example Value E'
    | 'Example Value F'
  const Component = createVerticalSplitButtonComponent<ExampleType, ExampleValue>({
    fontFamily: 'Example Font Family',
    fontSize: 44,
    horizontalPadding: 54,
    verticalPadding: 32,
    neutralBorderWidth: 7,
    types: {
      exampleTypeA: {
        inactiveEnabled: {
          backgroundColor: 'red',
          color: 'blue',
          radius: 10,
          border: {
            width: 12,
            color: 'orange'
          }
        },
        activeEnabled: {
          backgroundColor: 'oldlace',
          color: 'mediumorchid',
          radius: 52,
          border: {
            width: 76,
            color: 'olivedrab'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'wheat',
          color: 'lightgreen',
          radius: 34,
          border: {
            width: 2,
            color: 'magenta'
          }
        },
        activeDisabled: {
          backgroundColor: 'mintcream',
          color: 'rebeccapurple',
          radius: 9,
          border: {
            width: 48,
            color: 'peachpuff'
          }
        }
      },
      exampleTypeB: {
        inactiveEnabled: {
          backgroundColor: 'crimson',
          color: 'darkgoldenrod',
          radius: 15,
          border: {
            width: 8,
            color: 'darkgrey'
          }
        },
        activeEnabled: {
          backgroundColor: 'darkmagenta',
          color: 'darkolivegreen',
          radius: 23,
          border: {
            width: 4,
            color: 'darkorange'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'darkorchid',
          color: 'darkred',
          radius: 19,
          border: {
            width: 22,
            color: 'darksalmon'
          }
        },
        activeDisabled: {
          backgroundColor: 'darkseagreen',
          color: 'darkslateblue',
          radius: 44,
          border: {
            width: 77,
            color: 'darkslategrey'
          }
        }
      },
      exampleTypeC: {
        inactiveEnabled: {
          backgroundColor: 'turquoise',
          color: 'whitesmoke',
          radius: 47,
          border: {
            width: 29,
            color: 'yellowgreen'
          }
        },
        activeEnabled: {
          backgroundColor: 'seashell',
          color: 'seagreen',
          radius: 33,
          border: {
            width: 43,
            color: 'saddlebrown'
          }
        },
        inactiveDisabled: {
          backgroundColor: 'rosybrown',
          color: 'sienna',
          radius: 72,
          border: {
            width: 1,
            color: 'slategray'
          }
        },
        activeDisabled: {
          backgroundColor: 'thistle',
          color: 'teal',
          radius: 7,
          border: {
            width: 9,
            color: 'tan'
          }
        }
      }
    }
  })
  const onChange = jest.fn()
  const SegmentA = Component.segments.exampleTypeA
  const SegmentB = Component.segments.exampleTypeB
  const SegmentC = Component.segments.exampleTypeC

  const rendered = (
    <Component value={['Example Value E', 'Example Value F', 'Example Value C', 'Example Value A']} onChange={onChange}>
      <SegmentA value="Example Value A" disabled={false}>
        Example Label A
      </SegmentA>
      <SegmentC value="Example Value C" disabled={false}>
        Example Label C
      </SegmentC>
      <SegmentB value="Example Value B" disabled={false}>
        Example Label B
      </SegmentB>
      <SegmentC value="Example Value D" disabled={false}>
        Example Label D
      </SegmentC>
      <SegmentC value="Example Value E" disabled={false}>
        Example Label E
      </SegmentC>
    </Component>
  )

  unwrapRenderedFunctionComponent(rendered).props.children[1].props.onPress()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(['Example Value E', 'Example Value A'])
})
