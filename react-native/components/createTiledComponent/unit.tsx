import * as React from 'react'
import { type MeasureOnSuccessCallback, Text, View } from 'react-native'
import * as TestRenderer from 'react-test-renderer'
import { createTiledComponent } from '../../..'

test('renders as expected without any children', async () => {
  const Component = createTiledComponent(30, 60, 100)

  const renderer = TestRenderer.create(<Component />)

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none'
      }
    })
  });

  (
    renderer.toTree() as unknown as {
      readonly rendered: {
        readonly instance: {
          measure: (callback: MeasureOnSuccessCallback) => void
        }
      }
    }
  ).rendered.instance.measure = (measureOnSuccessCallback: MeasureOnSuccessCallback) => {
    measureOnSuccessCallback(123, 403, 375, 583, 37, 96)
  }

  void TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['onLayout']()
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none',
        children: []
      }
    })
  })

  renderer.unmount()
})

test('renders as expected with less than one row', async () => {
  const Component = createTiledComponent(30, 60, 100)

  const renderer = TestRenderer.create(
    <Component>
      <Text key="Example Key A">Example Child A</Text>
      <Text key="Example Key B">Example Child B</Text>
    </Component>
  )

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none'
      }
    })
  });

  (
    renderer.toTree() as unknown as {
      readonly rendered: {
        readonly instance: {
          measure: (callback: MeasureOnSuccessCallback) => void
        }
      }
    }
  ).rendered.instance.measure = (measureOnSuccessCallback: MeasureOnSuccessCallback) => {
    measureOnSuccessCallback(123, 403, 375, 583, 37, 96)
  }

  void TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['onLayout']()
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none',
        children: [
          expect.objectContaining({
            type: View,
            key: 'Example Key A',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 105
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child A'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key B',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child B'
                }
              })
            }
          })
        ]
      }
    })
  })

  renderer.unmount()
})

test('renders as expected with exactly one row', async () => {
  const Component = createTiledComponent(30, 60, 100)

  const renderer = TestRenderer.create(
    <Component>
      <Text key="Example Key A">Example Child A</Text>
      <Text key="Example Key B">Example Child B</Text>
      <Text key="Example Key C">Example Child C</Text>
    </Component>
  )

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none'
      }
    })
  });

  (
    renderer.toTree() as unknown as {
      readonly rendered: {
        readonly instance: {
          measure: (callback: MeasureOnSuccessCallback) => void
        }
      }
    }
  ).rendered.instance.measure = (measureOnSuccessCallback: MeasureOnSuccessCallback) => {
    measureOnSuccessCallback(123, 403, 375, 583, 37, 96)
  }

  void TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['onLayout']()
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none',
        children: [
          expect.objectContaining({
            type: View,
            key: 'Example Key A',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 105
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child A'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key B',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child B'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key C',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child C'
                }
              })
            }
          })
        ]
      }
    })
  })

  renderer.unmount()
})

test('renders as expected with less than two rows', async () => {
  const Component = createTiledComponent(30, 60, 100)

  const renderer = TestRenderer.create(
    <Component>
      <Text key="Example Key A">Example Child A</Text>
      <Text key="Example Key B">Example Child B</Text>
      <Text key="Example Key C">Example Child C</Text>
      <Text key="Example Key D">Example Child D</Text>
      <Text key="Example Key E">Example Child E</Text>
    </Component>
  )

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none'
      }
    })
  });

  (
    renderer.toTree() as unknown as {
      readonly rendered: {
        readonly instance: {
          measure: (callback: MeasureOnSuccessCallback) => void
        }
      }
    }
  ).rendered.instance.measure = (measureOnSuccessCallback: MeasureOnSuccessCallback) => {
    measureOnSuccessCallback(123, 403, 375, 583, 37, 96)
  }

  void TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['onLayout']()
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none',
        children: [
          expect.objectContaining({
            type: View,
            key: 'Example Key A',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 105
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child A'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key B',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child B'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key C',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child C'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key D',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 165,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child D'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key E',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 165,
                paddingLeft: 30,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child E'
                }
              })
            }
          })
        ]
      }
    })
  })

  renderer.unmount()
})

test('renders as expected with exactly two rows', async () => {
  const Component = createTiledComponent(30, 60, 100)

  const renderer = TestRenderer.create(
    <Component>
      <Text key="Example Key A">Example Child A</Text>
      <Text key="Example Key B">Example Child B</Text>
      <Text key="Example Key C">Example Child C</Text>
      <Text key="Example Key D">Example Child D</Text>
      <Text key="Example Key E">Example Child E</Text>
      <Text key="Example Key F">Example Child F</Text>
    </Component>
  )

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none'
      }
    })
  });

  (
    renderer.toTree() as unknown as {
      readonly rendered: {
        readonly instance: {
          measure: (callback: MeasureOnSuccessCallback) => void
        }
      }
    }
  ).rendered.instance.measure = (measureOnSuccessCallback: MeasureOnSuccessCallback) => {
    measureOnSuccessCallback(123, 403, 375, 583, 37, 96)
  }

  void TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['onLayout']()
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none',
        children: [
          expect.objectContaining({
            type: View,
            key: 'Example Key A',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 105
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child A'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key B',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child B'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key C',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child C'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key D',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 165,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child D'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key E',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 165,
                paddingLeft: 30,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child E'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key F',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 165,
                paddingLeft: 30,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child F'
                }
              })
            }
          })
        ]
      }
    })
  })

  renderer.unmount()
})

test('renders as expected with less than three rows', async () => {
  const Component = createTiledComponent(30, 60, 100)

  const renderer = TestRenderer.create(
    <Component>
      <Text key="Example Key A">Example Child A</Text>
      <Text key="Example Key B">Example Child B</Text>
      <Text key="Example Key C">Example Child C</Text>
      <Text key="Example Key D">Example Child D</Text>
      <Text key="Example Key E">Example Child E</Text>
      <Text key="Example Key F">Example Child F</Text>
      <Text key="Example Key G">Example Child G</Text>
      <Text key="Example Key H">Example Child H</Text>
    </Component>
  )

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none'
      }
    })
  });

  (
    renderer.toTree() as unknown as {
      readonly rendered: {
        readonly instance: {
          measure: (callback: MeasureOnSuccessCallback) => void
        }
      }
    }
  ).rendered.instance.measure = (measureOnSuccessCallback: MeasureOnSuccessCallback) => {
    measureOnSuccessCallback(123, 403, 375, 583, 37, 96)
  }

  void TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['onLayout']()
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none',
        children: [
          expect.objectContaining({
            type: View,
            key: 'Example Key A',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 105
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child A'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key B',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child B'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key C',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child C'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key D',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 165,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child D'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key E',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 165,
                paddingLeft: 30,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child E'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key F',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 165,
                paddingLeft: 30,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child F'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key G',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 165,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child G'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key H',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 165,
                paddingLeft: 30,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child H'
                }
              })
            }
          })
        ]
      }
    })
  })

  renderer.unmount()
})

test('renders as expected with exactly three rows', async () => {
  const Component = createTiledComponent(30, 60, 100)

  const renderer = TestRenderer.create(
    <Component>
      <Text key="Example Key A">Example Child A</Text>
      <Text key="Example Key B">Example Child B</Text>
      <Text key="Example Key C">Example Child C</Text>
      <Text key="Example Key D">Example Child D</Text>
      <Text key="Example Key E">Example Child E</Text>
      <Text key="Example Key F">Example Child F</Text>
      <Text key="Example Key G">Example Child G</Text>
      <Text key="Example Key H">Example Child H</Text>
      <Text key="Example Key I">Example Child I</Text>
    </Component>
  )

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none'
      }
    })
  });

  (
    renderer.toTree() as unknown as {
      readonly rendered: {
        readonly instance: {
          measure: (callback: MeasureOnSuccessCallback) => void
        }
      }
    }
  ).rendered.instance.measure = (measureOnSuccessCallback: MeasureOnSuccessCallback) => {
    measureOnSuccessCallback(123, 403, 375, 583, 37, 96)
  }

  void TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['onLayout']()
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none',
        children: [
          expect.objectContaining({
            type: View,
            key: 'Example Key A',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 105
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child A'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key B',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child B'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key C',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child C'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key D',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 165,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child D'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key E',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 165,
                paddingLeft: 30,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child E'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key F',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 165,
                paddingLeft: 30,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child F'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key G',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 165,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child G'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key H',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 165,
                paddingLeft: 30,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child H'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key I',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 165,
                paddingLeft: 30,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child I'
                }
              })
            }
          })
        ]
      }
    })
  })

  renderer.unmount()
})

test('renders as expected without column spacing', async () => {
  const Component = createTiledComponent(0, 60, 100)

  const renderer = TestRenderer.create(
    <Component>
      <Text key="Example Key A">Example Child A</Text>
      <Text key="Example Key B">Example Child B</Text>
      <Text key="Example Key C">Example Child C</Text>
      <Text key="Example Key D">Example Child D</Text>
      <Text key="Example Key E">Example Child E</Text>
      <Text key="Example Key F">Example Child F</Text>
      <Text key="Example Key G">Example Child G</Text>
      <Text key="Example Key H">Example Child H</Text>
      <Text key="Example Key I">Example Child I</Text>
    </Component>
  )

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none'
      }
    })
  });

  (
    renderer.toTree() as unknown as {
      readonly rendered: {
        readonly instance: {
          measure: (callback: MeasureOnSuccessCallback) => void
        }
      }
    }
  ).rendered.instance.measure = (measureOnSuccessCallback: MeasureOnSuccessCallback) => {
    measureOnSuccessCallback(123, 403, 315, 583, 37, 96)
  }

  void TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['onLayout']()
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none',
        children: [
          expect.objectContaining({
            type: View,
            key: 'Example Key A',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 105
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child A'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key B',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 105
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child B'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key C',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 105
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child C'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key D',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 165,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child D'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key E',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 165,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child E'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key F',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 165,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child F'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key G',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 165,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child G'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key H',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 165,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child H'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key I',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 165,
                paddingTop: 60
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child I'
                }
              })
            }
          })
        ]
      }
    })
  })

  renderer.unmount()
})

test('renders as expected without row spacing', async () => {
  const Component = createTiledComponent(30, 0, 100)

  const renderer = TestRenderer.create(
    <Component>
      <Text key="Example Key A">Example Child A</Text>
      <Text key="Example Key B">Example Child B</Text>
      <Text key="Example Key C">Example Child C</Text>
      <Text key="Example Key D">Example Child D</Text>
      <Text key="Example Key E">Example Child E</Text>
      <Text key="Example Key F">Example Child F</Text>
      <Text key="Example Key G">Example Child G</Text>
      <Text key="Example Key H">Example Child H</Text>
      <Text key="Example Key I">Example Child I</Text>
    </Component>
  )

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none'
      }
    })
  });

  (
    renderer.toTree() as unknown as {
      readonly rendered: {
        readonly instance: {
          measure: (callback: MeasureOnSuccessCallback) => void
        }
      }
    }
  ).rendered.instance.measure = (measureOnSuccessCallback: MeasureOnSuccessCallback) => {
    measureOnSuccessCallback(123, 403, 375, 583, 37, 96)
  }

  void TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['onLayout']()
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      type: View,
      props: {
        onLayout: expect.any(Function),
        style: { width: '100%', flexDirection: 'row', flexWrap: 'wrap' },
        pointerEvents: 'box-none',
        children: [
          expect.objectContaining({
            type: View,
            key: 'Example Key A',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 105
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child A'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key B',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child B'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key C',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child C'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key D',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 105
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child D'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key E',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child E'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key F',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child F'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key G',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 105,
                height: 105
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child G'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key H',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child H'
                }
              })
            }
          }),
          expect.objectContaining({
            type: View,
            key: 'Example Key I',
            props: {
              pointerEvents: 'box-none',
              style: {
                flexBasis: 135,
                height: 105,
                paddingLeft: 30
              },
              children: expect.objectContaining({
                type: Text,
                props: {
                  children: 'Example Child I'
                }
              })
            }
          })
        ]
      }
    })
  })

  renderer.unmount()
})
