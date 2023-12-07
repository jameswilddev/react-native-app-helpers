# `react-native-app-helpers/createSplitButtonComponent`

Creates a new React component which displays sidebars to the left and right of a
fluid-width body.

## Usage

```tsx
import { createSplitButtonComponent } from "react-native-app-helpers";

type ExampleType = `exampleTypeA` | `exampleTypeB` | `exampleTypeC`;
type ExampleValue = `a` | `b` | `c`;

const ExampleSplitButton = createSplitButtonComponent<ExampleType, ExampleValue>({
  fontFamily: `Example Font Family`,
  fontSize: 44,
  horizontalPadding: 54,
  verticalPadding: 32,
  neutralBorderWidth: 7,
  types: {
    exampleTypeA: {
      inactiveEnabled: {
        backgroundColor: `red`,
        color: `blue`,
        radius: 10,
        border: {
          width: 12,
          color: `orange`,
        },
      },
      activeEnabled: {
        backgroundColor: `oldlace`,
        color: `mediumorchid`,
        radius: 52,
        border: {
          width: 76,
          color: `olivedrab`,
        },
      },
      inactiveDisabled: {
        backgroundColor: `wheat`,
        color: `lightgreen`,
        radius: 34,
        border: {
          width: 2,
          color: `magenta`,
        },
      },
      activeDisabled: {
        backgroundColor: `mintcream`,
        color: `rebeccapurple`,
        radius: 9,
        border: {
          width: 48,
          color: `peachpuff`,
        },
      },
    },
    exampleTypeB: {
      inactiveEnabled: {
        backgroundColor: `crimson`,
        color: `darkgoldenrod`,
        radius: 15,
        border: {
          width: 8,
          color: `darkgrey`,
        },
      },
      activeEnabled: {
        backgroundColor: `darkmagenta`,
        color: `darkolivegreen`,
        radius: 23,
        border: {
          width: 4,
          color: `darkorange`,
        },
      },
      inactiveDisabled: {
        backgroundColor: `darkorchid`,
        color: `darkred`,
        radius: 19,
        border: {
          width: 22,
          color: `darksalmon`,
        },
      },
      activeDisabled: {
        backgroundColor: `darkseagreen`,
        color: `darkslateblue`,
        radius: 44,
        border: {
          width: 77,
          color: `darkslategrey`,
        },
      },
    },
    exampleTypeC: {
      inactiveEnabled: {
        backgroundColor: `turquoise`,
        color: `whitesmoke`,
        radius: 47,
        border: {
          width: 29,
          color: `yellowgreen`,
        },
      },
      activeEnabled: {
        backgroundColor: `seashell`,
        color: `seagreen`,
        radius: 33,
        border: {
          width: 43,
          color: `saddlebrown`,
        },
      },
      inactiveDisabled: {
        backgroundColor: `rosybrown`,
        color: `sienna`,
        radius: 72,
        border: {
          width: 1,
          color: `slategray`,
        },
      },
      activeDisabled: {
        backgroundColor: `thistle`,
        color: `teal`,
        radius: 7,
        border: {
          width: 9,
          color: `tan`,
        },
      },
    },
  },
});

const ExampleScreen = () => {
  const [value, setValue] = React.useState<ExampleValue>(`a`);

  // Also supports width="fillsContainer" and distribution="even".
  return (
    <ExampleSplitButton value={value} onChange={setValue} width="fitsContent" distibution="proportional">
      <ExampleSplitButton.segment.SegmentA value="a" disabled={false}>
        Example Label A
      </ExampleSplitButton.segment.SegmentA>
      <ExampleSplitButton.segment.SegmentB value="b" disabled>
        Example Label B
      </ExampleSplitButton.segment.SegmentB>
      <ExampleSplitButton.segment.SegmentC value="c" disabled={false}>
        Example Label C
      </ExampleSplitButton.segment.SegmentC>
    </ExampleSplitButton>
  );
};
```
