# `react-native-app-helpers/createFileStoreManagerComponent`

Creates a React component which automatically manages a file store, loading it
and unloading it as appropriate.

A re-render will be triggered automatically when the store loads.

## Usage

```tsx
import {
  FileStore,
  createFileStoreManagerComponent,
} from "react-native-app-helpers";

const fileStore = new FileStore();

const FileStoreManager = createFileStoreManagerComponent(fileStore);

export default () => {
  const [subdirectoryName, setSubdirectoryName] = React.useState<null | string>(null);

  return (
    <FileStoreManager
      subdirectoryName={subdirectoryName}
      unloaded={(
        <React.Fragment>
          <Button
            title="Load subdirectory A"
            onPress={() => {
              setSubdirectoryName(`a`);
            }}
          />
          <Button
            title="Load subdirectory B"
            onPress={() => {
              setSubdirectoryName(`b`);
            }}
          />
        </React.Fragment>
      )}
      loading={<Text>The file store is loading...</Text>}
      ready={(
        <Button
          title="Unload"
          onPress={() => {
            setSubdirectoryName(null);
          }}
        />
      )}
      unloading={<Text>The file store is unloading...</Text>}
    />
  );
};
```
