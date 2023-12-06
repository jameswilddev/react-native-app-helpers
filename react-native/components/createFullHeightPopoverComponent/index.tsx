import * as React from 'react'
import { View, type ViewStyle, StyleSheet } from 'react-native'
import type { ControlStyle } from '../../types/ControlStyle'
import { useRefresh } from '../../hooks/useRefresh'
import { SimpleModal } from '../SimpleModal'
import {
  createControlStateStyleInstance,
  createControlStyleInstance,
  createControlTextStyleInstance,
  createFullHeightPopoverStateStyleInstance
} from '../helpers'
import { ContainerFillingKeyboardAvoidingView } from '../ContainerFillingKeyboardAvoidingView'
import { SizedHorizontallySymmetricalSafeAreaView } from '../SizedHorizontallySymmetricalSafeAreaView'
import { createPickerButtonComponent } from '../createPickerButtonComponent'
import type { SvgIcon } from '../../..'

type Instance = React.FunctionComponent<{
  /**
   * The text shown in the button.  When null, the placeholder is shown instead.
   */
  readonly label: null | string

  /**
   * The placeholder text shown in the button when there is no text.
   */
  readonly placeholder: string

  /**
   * When true, the button cannot be pressed and the body is not shown.
   */
  readonly disabled: undefined | boolean

  /**
   * When true, the control is styled as though it is valid.  It is otherwise
   * styles as though it is invalid.
   */
  readonly valid: boolean

  /**
   * Describes the contents of the pop-over.
   * @param close Invoke to close the pop-over.
   * @returns     The contents of the pop-over.
   */
  children: (close: () => void) => null | JSX.Element
}>

/**
 * The arguments used to create a full-height pop-over component; for testing
 * higher-order components.
 */
interface Introspection {
  /**
   * The styling to use.
   */
  readonly controlStyle: ControlStyle

  /**
   * When null, no icon is to be placed on the right side of the button.
   * Otherwise, the icon to show there.
   */
  readonly rightIcon: null | SvgIcon
}

/**
 * Creates a new React component which displays a button which can be pressed to
 * show an element in a pop-over which fills the display vertically.
 * @param controlStyle  The styling to use.
 * @param rightIcon     When null, no icon is to be placed on the right side of
 *                      the button.  Otherwise, the icon to show there.
 * @returns             The created React component.
 */
export const createFullHeightPopoverComponent = (
  controlStyle: ControlStyle,
  rightIcon: null | SvgIcon
): Instance & { readonly fullHeightPopover: Introspection } => {
  const styles = StyleSheet.create({
    validHitbox: createControlStyleInstance(
      controlStyle,
      controlStyle.blurredValid
    ),
    invalidHitbox: createControlStateStyleInstance(
      controlStyle,
      controlStyle.blurredInvalid
    ),
    disabledValidHitbox: createControlStateStyleInstance(
      controlStyle,
      controlStyle.disabledValid
    ),
    disabledInvalidHitbox: createControlStateStyleInstance(
      controlStyle,
      controlStyle.disabledInvalid
    ),
    disabledValidText: createControlTextStyleInstance(
      controlStyle,
      controlStyle.disabledValid,
      'left'
    ),
    disabledInvalidText: createControlTextStyleInstance(
      controlStyle,
      controlStyle.disabledInvalid,
      'left'
    ),
    validText: createControlTextStyleInstance(
      controlStyle,
      controlStyle.blurredValid,
      'left'
    ),
    invalidText: createControlTextStyleInstance(
      controlStyle,
      controlStyle.blurredInvalid,
      'left'
    ),
    validView: createFullHeightPopoverStateStyleInstance(
      controlStyle.focusedValid
    ),
    invalidView: createFullHeightPopoverStateStyleInstance(
      controlStyle.focusedInvalid
    )
  })

  const PickerButton = createPickerButtonComponent(controlStyle)

  const FullHeightPopOver: Instance & { fullHeightPopover?: Introspection } = ({
    label,
    placeholder,
    disabled,
    valid,
    children
  }) => {
    disabled = disabled ?? false

    const refresh = useRefresh()

    const state = React.useRef<{
      open: boolean
      layout: null | {
        readonly pageX: number
        readonly width: number
      }
    }>({
      open: false,
      layout: null
    })

    // Ensure that the drop-down does not re-open itself if it is disabled while
    // open, then re-enabled.
    if (disabled) {
      state.current.open = false
    }

    let additionalModalViewStyle: null | ViewStyle

    if (!disabled && state.current.open && state.current.layout !== null) {
      additionalModalViewStyle = {
        left: state.current.layout.pageX,
        width: state.current.layout.width
      }
    } else {
      additionalModalViewStyle = null
    }

    const inline = (
      <PickerButton
        onMeasure={(_x, _y, width, _height, pageX, _pageY) => {
          if (
            state.current.layout === null ||
            pageX !== state.current.layout.pageX ||
            width !== state.current.layout.width
          ) {
            state.current.layout = {
              pageX,
              width
            }

            refresh()
          }
        }}
        onPress={() => {
          state.current.open = true

          refresh()
        }}
        disabled={disabled}
        label={label}
        placeholder={placeholder}
        valid={valid}
        {...(rightIcon === null ? {} : { rightIcon })}
      />
    )

    if (additionalModalViewStyle === null) {
      return inline
    } else {
      const onClose = (): void => {
        state.current.open = false

        refresh()
      }

      return (
        <React.Fragment>
          {inline}
          <SimpleModal onClose={onClose}>
            <View
              style={[
                valid ? styles.validView : styles.invalidView,
                additionalModalViewStyle
              ]}
            >
              <SizedHorizontallySymmetricalSafeAreaView
                top
                bottom
                left
                right
                width="fillsContainer"
                height="fillsContainer"
              >
                <ContainerFillingKeyboardAvoidingView>
                  {children(onClose)}
                </ContainerFillingKeyboardAvoidingView>
              </SizedHorizontallySymmetricalSafeAreaView>
            </View>
          </SimpleModal>
        </React.Fragment>
      )
    }
  }

  FullHeightPopOver.fullHeightPopover = { controlStyle, rightIcon }

  return FullHeightPopOver as Instance & {
    readonly fullHeightPopover: Introspection
  }
}
