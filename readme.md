# `react-native-app-helpers`

General tools we use to build React Native applications.

## React Native

### Installation

```bash
npm install --save react-native-app-helpers
```

```tsx
import { createTextComponent } from "react-native-app-helpers";
```

### Exports

#### Components

- [Aligned](./react-native/components/Aligned/readme.md)
- [ContainerFillingKeyboardAvoidingView](./react-native/components/ContainerFillingKeyboardAvoidingView/readme.md)
- [ContainerFillingScrollView](./react-native/components/ContainerFillingScrollView/readme.md)
- [createBottomTabBarComponent](./react-native/components/createBottomTabBarComponent/readme.md)
- [createButtonComponent](./react-native/components/createButtonComponent/readme.md)
- [createCardComponent](./react-native/components/createCardComponent/readme.md)
- [createCheckboxComponent](./react-native/components/createCheckboxComponent/readme.md)
- [createCreatableSelectComponent](./react-native/components/createCreatableSelectComponent/readme.md)
- [createFileStoreManagerComponent](./react-native/components/createFileStoreManagerComponent/readme.md)
- [createFiniteStateMachineRoutingComponent](./react-native/components/createFiniteStateMachineRoutingComponent/readme.md)
- [createFixedWidthComponent](./react-native/components/createFixedWidthComponent/readme.md)
- [createFlashMessageComponent](./react-native/components/createFlashMessageComponent/readme.md)
- [createFlatColorBackgroundComponent](./react-native/components/createFlatColorBackgroundComponent/readme.md)
- [createFullHeightPopoverComponent](./react-native/components/createFullHeightPopoverComponent/readme.md)
- [createHeaderBodyFooterComponent](./react-native/components/createHeaderBodyFooterComponent/readme.md)
- [createHeaderComponent](./react-native/components/createHeaderComponent/readme.md)
- [createHrComponent](./react-native/components/createHrComponent/readme.md)
- [createImageBackgroundComponent](./react-native/components/createImageBackgroundComponent/readme.md)
- [createInputComponent](./react-native/components/createInputComponent/readme.md)
- [createLimitedWidthComponent](./react-native/components/createLimitedWidthComponent/readme.md)
- [createNullableEmailInputComponent](./react-native/components/createNullableEmailInputComponent/readme.md)
- [createNullableFloatInputComponent](./react-native/components/createNullableFloatInputComponent/readme.md)
- [createNullableIntegerInputComponent](./react-native/components/createNullableIntegerInputComponent/readme.md)
- [createNullablePasswordInputComponent](./react-native/components/createNullablePasswordInputComponent/readme.md)
- [createNullableTextAreaComponent](./react-native/components/createNullableTextAreaComponent/readme.md)
- [createNullableTextInputComponent](./react-native/components/createNullableTextInputComponent/readme.md)
- [createOfflineTableComponent](./react-native/components/createOfflineTableComponent/readme.md)
- [createPaddingComponent](./react-native/components/createPaddingComponent/readme.md)
- [createPickerButtonComponent](./react-native/components/createPickerButtonComponent/readme.md)
- [createProportionalRowComponent](./react-native/components/createProportionalRowComponent/readme.md)
- [createRequiredEmailInputComponent](./react-native/components/createRequiredEmailInputComponent/readme.md)
- [createRequiredFloatInputComponent](./react-native/components/createRequiredFloatInputComponent/readme.md)
- [createRequiredIntegerInputComponent](./react-native/components/createRequiredIntegerInputComponent/readme.md)
- [createRequiredPasswordInputComponent](./react-native/components/createRequiredPasswordInputComponent/readme.md)
- [createRequiredTextAreaComponent](./react-native/components/createRequiredTextAreaComponent/readme.md)
- [createRequiredTextInputComponent](./react-native/components/createRequiredTextInputComponent/readme.md)
- [createSearchableMultiSelectComponent](./react-native/components/createSearchableMultiSelectComponent/readme.md)
- [createSearchableSelectComponent](./react-native/components/createSearchableSelectComponent/readme.md)
- [createSessionStoreManagerComponent](./react-native/components/createSessionStoreManagerComponent/readme.md)
- [createSidebarComponent](./react-native/components/createSidebarComponent/readme.md)
- [createSplitButtonComponent](./react-native/components/createSplitButtonComponent/readme.md)
- [createStackComponent](./react-native/components/createStackComponent/readme.md)
- [createStackRoutingComponent](./react-native/components/createStackRoutingComponent/readme.md)
- [createStateStoreManagerComponent](./react-native/components/createStateStoreManagerComponent/readme.md)
- [createStatusFillComponent](./react-native/components/createStatusFillComponent/readme.md)
- [createTabRoutingComponent](./react-native/components/createTabRoutingComponent/readme.md)
- [createTextComponent](./react-native/components/createTextComponent/readme.md)
- [createTiledComponent](./react-native/components/createTiledComponent/readme.md)
- [createUnderlinedTopTabBarComponent](./react-native/components/createUnderlinedTopTabBarComponent/readme.md)
- [Hitbox](./react-native/components/Hitbox/readme.md)
- [HorizontallySymmetricalSafeAreaView](./react-native/components/HorizontallySymmetricalSafeAreaView/readme.md)
- [Row](./react-native/components/Row/readme.md)
- [SimpleModal](./react-native/components/SimpleModal/readme.md)
- [SizedHorizontallySymmetricalSafeAreaView](./react-native/components/SizedHorizontallySymmetricalSafeAreaView/readme.md)

#### Hooks

- [useBackButton](./react-native/hooks/useBackButton/readme.md)
- [useEventRefresh](./react-native/hooks/useEventRefresh/readme.md)
- [useMeasure](./react-native/hooks/useMeasure/readme.md)
- [useRefresh](./react-native/hooks/useRefresh/readme.md)
- [useSyncFileCleanUpBlocker](./react-native/hooks/useSyncFileCleanUpBlocker/readme.md)
- [useSyncInProgress](./react-native/hooks/useSyncInProgress/readme.md)

#### Services

- [logger](./react-native/services/logger/readme.md)
- [FileStore](./react-native/services/FileStore/readme.md)
- [PermissionHelper](./react-native/services/PermissionHelper/readme.md)
- [PictureHelper](./react-native/services/PictureHelper/readme.md)
- [Request](./react-native/services/Request/readme.md)
- [SessionStore](./react-native/services/SessionStore/readme.md)
- [StateStore](./react-native/services/StateStore/readme.md)
- [Sync](./react-native/services/Sync/readme.md)
- [SyncableStateHelper](./react-native/services/SyncableStateHelper/readme.md)

#### Types

- [AbsentSyncableStateSingleton](./react-native/types/AbsentSyncableStateConstnat/readme.md)
- [AwaitingPullSyncableStateCollectionItem](./react-native/types/AwaitingPullSyncableStateCollectionItem/readme.md)
- [AwaitingPushSyncableStateCollectionItem](./react-native/types/AwaitingPushSyncableStateCollectionItem/readme.md)
- [BasicTableColumn](./react-native/types/BasicTableColumn/readme.md)
- [BorderStyle](./react-native/types/BorderStyle/readme.md)
- [BottomTab](./react-native/types/BottomTab/readme.md)
- [BottomTabBarProps](./react-native/types/BottomTabBarProps/readme.md)
- [BottomTabBarStyle](./react-native/types/BottomTabBarStyle/readme.md)
- [BottomTabBarStyleState](./react-native/types/BottomTabBarStateStyle/readme.md)
- [ButtonProps](./react-native/types/ButtonProps/readme.md)
- [ButtonStateStyle](./react-native/types/ButtonStateStyle/readme.md)
- [ButtonStyle](./react-native/types/ButtonStyle/readme.md)
- [CardProps](./react-native/types/CardProps/readme.md)
- [CheckboxProps](./react-native/types/CheckboxProps/readme.md)
- [CheckboxStateStyle](./react-native/types/CheckboxStateStyle/readme.md)
- [CheckboxStyle](./react-native/types/CheckboxStyle/readme.md)
- [ControlStateStyle](./react-native/types/ControlStateStyle/readme.md)
- [ControlStyle](./react-native/types/ControlStyle/readme.md)
- [CreatableSelectProps](./react-native/types/CreatableSelectProps/readme.md)
- [CustomElementTableColumn](./react-native/types/CustomElementTableColumn/readme.md)
- [CustomTextTableColumn](./react-native/types/CustomTextTableColumn/readme.md)
- [EmptyRequestBody](./react-native/types/EmptyRequestBody/readme.md)
- [FileRequestBody](./react-native/types/FileRequestBody/readme.md)
- [FiniteStateMachineRouterState](./react-native/types/FiniteStateMachineRouterState/readme.md)
- [FiniteStateMachineRoutingProps](./react-native/types/FiniteStateMachineRoutingProps/readme.md)
- [FixedWidthProps](./react-native/types/FixedWidthProps/readme.md)
- [FlashMessageProps](./react-native/types/FlashMessageProps/readme.md)
- [FlashMessageState](./react-native/types/FlashMessageState/readme.md)
- [FlashMessageStyle](./react-native/types/FlashMessageStyle/readme.md)
- [FlatColorBackgroundProps](./react-native/types/FlatColorBackgroundProps/readme.md)
- [HeaderBodyFooterProps](./react-native/types/HeaderBodyFooterProps/readme.md)
- [HeaderIcon](./react-native/types/HeaderIcon/readme.md)
- [HeaderProps](./react-native/types/HeaderProps/readme.md)
- [HeaderStyle](./react-native/types/HeaderStyle/readme.md)
- [ImageBackgroundProps](./react-native/types/ImageBackgroundProps/readme.md)
- [Json](./react-native/types/Json/readme.md)
- [JsonRequestBody](./react-native/types/JsonRequestBody/readme.md)
- [KeyableTableCell](./react-native/types/KeyableTableCell/readme.md)
- [LimitedWidthProps](./react-native/types/LimitedWidthProps/readme.md)
- [NonKeyableTableCell](./react-native/types/NonKeyableTableCell/readme.md)
- [OfflineTableData](./react-native/types/OfflineTableData/readme.md)
- [OfflineTableProps](./react-native/types/OfflineTableProps/readme.md)
- [PaddingProps](./react-native/types/PaddingProps/readme.md)
- [PreflightResponse](./react-native/types/PreflightResponse/readme.md)
- [PreflightResponseCollection](./react-native/types/PreflightResponseCollection/readme.md)
- [PreflightResponseCollectionItem](./react-native/types/PreflightResponseCollectionItem/readme.md)
- [PreflightResponseSingleton](./react-native/types/PreflightResponseSingleton/readme.md)
- [ProportionalRowProps](./react-native/types/ProportionalRowProps/readme.md)
- [PushingSyncableStateCollectionItem](./react-native/types/PushingSyncableStateCollectionItem/readme.md)
- [QueryParameter](./react-native/types/QueryParameter/readme.md)
- [QueryParameters](./react-native/types/QueryParameters/readme.md)
- [RequiredEmailInputProps](./react-native/types/RequiredEmailInputProps/readme.md)
- [RequiredFloatInputProps](./react-native/types/RequiredFloatInputProps/readme.md)
- [RequiredIntegerInputProps](./react-native/types/RequiredIntegerInputProps/readme.md)
- [RequiredPasswordInputProps](./react-native/types/RequiredPasswordInputProps/readme.md)
- [RequiredTextAreaProps](./react-native/types/RequiredTextAreaProps/readme.md)
- [RequiredTextInputProps](./react-native/types/RequiredTextInputProps/readme.md)
- [Route](./react-native/types/Route/readme.md)
- [RouteParameters](./react-native/types/RouteParameters/readme.md)
- [RouteTable](./react-native/types/RouteTable/readme.md)
- [SearchableMultiSelectProps](./react-native/types/SearchableMultiSelectProps/readme.md)
- [SearchableSelectProps](./react-native/types/SearchableSelectProps/readme.md)
- [SidebarProps](./react-native/types/SidebarProps/readme.md)
- [SortDirection](./react-native/types/SortDirection/readme.md)
- [SplitButtonStateStyle](./react-native/types/SplitButtonStateStyle/readme.md)
- [SplitButtonStyle](./react-native/types/SplitButtonStyle/readme.md)
- [SplitButtonTypeStyle](./react-native/types/SplitButtonTypeStyle/readme.md)
- [StackRoute](./react-native/types/StackRoute/readme.md)
- [StackRouterState](./react-native/types/StackRouterState/readme.md)
- [StackRouteTable](./react-native/types/StackRouteTable/readme.md)
- [StatusPillProps](./react-native/types/StatusPillProps/readme.md)
- [StatusPillStyle](./react-native/types/StatusPillStyle/readme.md)
- [StatusPillStyleStatus](./react-native/types/StatusPillStyleStatus/readme.md)
- [SvgIcon](./react-native/types/SvgIcon/readme.md)
- [SyncableSchema](./react-native/types/SyncableSchema/readme.md)
- [SyncableState](./react-native/types/SyncableState/readme.md)
- [SyncableStateCollection](./react-native/types/SyncableStateCollection/readme.md)
- [SyncableStateCollectionItem](./react-native/types/SyncableStateCollectionItem/readme.md)
- [SyncableStateSingleton](./react-native/types/SyncableStateSingleton/readme.md)
- [SyncConfiguration](./react-native/types/SyncConfiguration/readme.md)
- [SyncConfigurationCollection](./react-native/types/SyncConfigurationCollection/readme.md)
- [SyncPullResponse](./react-native/types/SyncPullResponse/readme.md)
- [TableColumn](./react-native/types/TableColumn/readme.md)
- [TableRow](./react-native/types/TableRow/readme.md)
- [TableRowStyle](./react-native/types/TableRowStyle/readme.md)
- [TableSchema](./react-native/types/TableSchema/readme.md)
- [TableStyle](./react-native/types/TableStyle/readme.md)
- [TabRoute](./react-native/types/TabRoute/readme.md)
- [TabRouteTable](./react-native/types/TabRouteTable/readme.md)
- [TextProps](./react-native/types/TextProps/readme.md)
- [UnderlinedTopTab](./react-native/types/UnderlinedTopTab/readme.md)
- [UnderlinedTopTabBarStyle](./react-native/types/UnderlinedTopTabBarStyle/readme.md)
- [UnderlinedTopTabBarStyleState](./react-native/types/UnderlinedTopTabBarStyleState/readme.md)
- [UpToDateSyncableStateCollectionItem](./react-native/types/UpToDateSyncableStateCollectionItem/readme.md)
- [UpToDateSyncableStateSingleton](./react-native/types/UpToDateSyncableStateSingleton/readme.md)
- FileStoreInterface
- LoggerInterface
- PermissionHelperInterface
- PictureHelperInterface
- RequestInterface
- StateStoreInterface
- SyncInterface
- SyncState

#### Utilities

- [flattenRenderedToArray](./react-native/utilities/flattenRenderedToArray/readme.md)
- [getRenderedKey](./react-native/utilities/getRenderedKey/readme.md)
- [intercalateRendered](./react-native/utilities/intercalateRendered/readme.md)
- [isRenderedByReact](./react-native/utilities/isRenderedByReact/readme.md)
- [setRenderedKey](./react-native/utilities/setRenderedKey/readme.md)
- [showSettingsScreen](./react-native/utilities/showSettingsScreen/readme.md)
- [unwrapRenderedFunctionComponent](./react-native/utilities/unwrapRenderedFunctionComponent/readme.md)

### Concepts

#### Component factory methods

Most components here are wrapped in a factory method which is passed all
information which is not expected to change at runtime.  This allows for heavy
caching of styles which should help improve performance (see the
[React Native documentation](https://reactnative.dev/docs/stylesheet)).

To use them, you would do something similar to the following:

```tsx
import { createTextComponent } from "react-native-app-helpers";

const ExampleText = createTextComponent(`example`, `red`, 12, `left`, false);

const ExampleScreen = () => (
  <ExampleText>
    Hello World!  (in the "example" font, in red, at size 12, left-aligned)
  </ExampleText>
);
```

#### Line height

All components herein which render text apply a line-height of 1.4x the font
size.  This is done to ensure consistent rendering between iOS and Android, the
latter of which defaults to having more space beneath text than above.

#### Spacing

No components are to include any external padding or spacing as this is quite
often a contextual matter.  Instead, use wrapping components (which provide
internal padding/spacing).

#### Limited use of internal state

As few components as possible rely on any form of internal state; where possible
(and practical) all state is passed in via props, and changes are suggested to
the parent component through callbacks (also provided via props).  This makes
components far more reusable.

## Laravel

### Installation

```bash
composer require jameswilddev/react-native-app-helpers
```

### Contents

- [SyncApi](./laravel/src/SyncApi.php)
