import type { ColorValue } from 'react-native'

/**
 * Represents a SVG icon imported using react-native-svg-transformer.  A fill
 * color override is available.
 */
export type SvgIcon = React.FunctionComponent<{
  /**
   * An override for the SVG icon's fill color.
   */
  readonly fill: ColorValue
}>
