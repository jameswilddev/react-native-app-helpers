import { SyncableStateHelper } from ".";
import type { SyncableState, SyncConfiguration } from "../../..";

test(`upserts when new`, () => {
  type ExampleSchema = {
    readonly enums: {
      readonly testEnumAKey:
        | `Test Enum A Value A`
        | `Test Enum A Value B`
        | `Test Enum A Value C`;
      readonly testEnumBKey: `Test Enum B Value A` | `Test Enum B Value B`;
      readonly testEnumCKey:
        | `Test Enum C Value A`
        | `Test Enum C Value B`
        | `Test Enum C Value C`
        | `Test Enum C Value D`;
    };
    readonly collections: {
      readonly exampleCollectionAKey: `Example Collection A Data`;
      readonly exampleCollectionBKey:
        | `Example Collection B Data A`
        | `Example Collection B Data B`
        | `Example Collection B Data C`
        | `Example Collection B Data D`
        | `Example Collection B Data E`;
      readonly exampleCollectionCKey: `Example Collection C Data`;
    };
  };
  type ExampleAdditionalCollectionData = {
    readonly exampleAdditionalCollectionDataKey: string;
  };
  const listFilesA = jest.fn();
  const listFilesB = jest.fn().mockReturnValue([
    {
      route: `Example Returned File Route A`,
      uuid: `60aa58c2-4b67-4dc2-b160-cf3aca368147`,
    },
    {
      route: `Example Returned File Route B`,
      uuid: `32c81253-0fbf-44fe-9d0b-fa24e9d16752`,
    },
  ]);
  const listFilesC = jest.fn();
  const syncConfiguration: SyncConfiguration<
    ExampleSchema,
    ExampleAdditionalCollectionData
  > = {
    order: [
      {
        type: `collection`,
        key: `exampleCollectionCKey`,
      },
      {
        type: `enum`,
        key: `testEnumAKey`,
      },
      {
        type: `collection`,
        key: `exampleCollectionBKey`,
      },
      {
        type: `enum`,
        key: `testEnumCKey`,
      },
      {
        type: `enum`,
        key: `testEnumBKey`,
      },
      {
        type: `collection`,
        key: `exampleCollectionAKey`,
      },
    ],
    collections: {
      exampleCollectionAKey: {
        listFiles: listFilesA,
        exampleAdditionalCollectionDataKey: `Example String A`,
      },
      exampleCollectionBKey: {
        listFiles: listFilesB,
        exampleAdditionalCollectionDataKey: `Example String B`,
      },
      exampleCollectionCKey: {
        listFiles: listFilesC,
        exampleAdditionalCollectionDataKey: `Example String C`,
      },
    },
  };
  const syncableStateHelper = new SyncableStateHelper(syncConfiguration);
  const setState = jest.fn();
  const state: SyncableState<ExampleSchema> = {
    enums: {
      testEnumAKey: {
        type: `upToDate`,
        version: `Test Enum A Version A`,
        values: {
          "02c1ea8b-9332-4359-8094-db30da4a1a48": `Test Enum A Value A`,
          "58c0c0e8-90cd-45b5-be6c-55ad1113db4a": `Test Enum A Value B`,
          "4cdccf5d-b4fd-4ef9-97f7-d5d023d58f8a": `Test Enum A Value C`,
        },
      },
      testEnumBKey: {
        type: `absent`,
      },
      testEnumCKey: {
        type: `upToDate`,
        version: `Test Enum C Version A`,
        values: {
          "facfe4b1-cff2-43cd-8a70-bf1565ea57fe": `Test Enum C Value A`,
          "2314dfdd-7c51-4ff2-a700-dfb162fd6fc0": `Test Enum C Value B`,
          "ed2c8187-e4b8-4229-bdce-fd2bd111ffa6": `Test Enum C Value C`,
          "1292dfab-f3ed-47ac-9464-b981a24ecb21": `Test Enum C Value D`,
        },
      },
    },
    collections: {
      exampleCollectionAKey: {
        "b990662b-9f09-4b77-94a1-da75595dd6a3": {
          status: `pushing`,
          data: `Example Collection A Data`,
        },
      },
      exampleCollectionBKey: {
        "1bcc95ac-7a81-4771-8c76-5c6fc69805cc": {
          status: `upToDate`,
          version: `Example Version`,
          data: `Example Collection B Data C`,
        },
      },
      exampleCollectionCKey: {
        "43ea8579-70e6-48bb-8d6e-f7a444627880": {
          status: `awaitingPush`,
          data: `Example Collection C Data`,
        },
      },
    },
    addedFileUuids: [
      `8ef70dc5-c1dc-49d6-a209-90cc3bbad6cb`,
      `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
      `0976d288-4d12-4c38-b28e-bf95ce1b3e81`,
      `8660822b-4c7f-480d-a4f0-67e58e68afb4`,
    ],
    deletedFileRoutes: [
      `Example Deleted File Route A`,
      `Example Deleted File Route B`,
      `Example Deleted File Route C`,
    ],
  };

  syncableStateHelper.upsertCollection(
    state,
    `exampleCollectionBKey`,
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data B`,
    setState
  );

  expect(listFilesA).not.toHaveBeenCalled();
  expect(listFilesB).toBeCalledTimes(1);
  expect(listFilesB).toBeCalledWith(
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data B`
  );
  expect(listFilesC).not.toHaveBeenCalled();
  expect(setState).toBeCalledTimes(1);
  expect(setState).toBeCalledWith({
    enums: {
      testEnumAKey: {
        type: `upToDate`,
        version: `Test Enum A Version A`,
        values: {
          "02c1ea8b-9332-4359-8094-db30da4a1a48": `Test Enum A Value A`,
          "58c0c0e8-90cd-45b5-be6c-55ad1113db4a": `Test Enum A Value B`,
          "4cdccf5d-b4fd-4ef9-97f7-d5d023d58f8a": `Test Enum A Value C`,
        },
      },
      testEnumBKey: {
        type: `absent`,
      },
      testEnumCKey: {
        type: `upToDate`,
        version: `Test Enum C Version A`,
        values: {
          "facfe4b1-cff2-43cd-8a70-bf1565ea57fe": `Test Enum C Value A`,
          "2314dfdd-7c51-4ff2-a700-dfb162fd6fc0": `Test Enum C Value B`,
          "ed2c8187-e4b8-4229-bdce-fd2bd111ffa6": `Test Enum C Value C`,
          "1292dfab-f3ed-47ac-9464-b981a24ecb21": `Test Enum C Value D`,
        },
      },
    },
    collections: {
      exampleCollectionAKey: {
        "b990662b-9f09-4b77-94a1-da75595dd6a3": {
          status: `pushing`,
          data: `Example Collection A Data`,
        },
      },
      exampleCollectionBKey: {
        "1bcc95ac-7a81-4771-8c76-5c6fc69805cc": {
          status: `upToDate`,
          version: `Example Version`,
          data: `Example Collection B Data C`,
        },
        "12d9197e-7803-49ca-83cb-1ce292ec6a35": {
          status: `awaitingPush`,
          data: `Example Collection B Data B`,
        },
      },
      exampleCollectionCKey: {
        "43ea8579-70e6-48bb-8d6e-f7a444627880": {
          status: `awaitingPush`,
          data: `Example Collection C Data`,
        },
      },
    },
    addedFileUuids: [
      `8ef70dc5-c1dc-49d6-a209-90cc3bbad6cb`,
      `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
      `0976d288-4d12-4c38-b28e-bf95ce1b3e81`,
      `8660822b-4c7f-480d-a4f0-67e58e68afb4`,
      `60aa58c2-4b67-4dc2-b160-cf3aca368147`,
      `32c81253-0fbf-44fe-9d0b-fa24e9d16752`,
    ],
    deletedFileRoutes: [
      `Example Deleted File Route A`,
      `Example Deleted File Route B`,
      `Example Deleted File Route C`,
    ],
  });
});

test(`upserts when existing as up to date`, () => {
  type ExampleSchema = {
    readonly enums: {
      readonly testEnumAKey:
        | `Test Enum A Value A`
        | `Test Enum A Value B`
        | `Test Enum A Value C`;
      readonly testEnumBKey: `Test Enum B Value A` | `Test Enum B Value B`;
      readonly testEnumCKey:
        | `Test Enum C Value A`
        | `Test Enum C Value B`
        | `Test Enum C Value C`
        | `Test Enum C Value D`;
    };
    readonly collections: {
      readonly exampleCollectionAKey: `Example Collection A Data`;
      readonly exampleCollectionBKey:
        | `Example Collection B Data A`
        | `Example Collection B Data B`
        | `Example Collection B Data C`
        | `Example Collection B Data D`
        | `Example Collection B Data E`;
      readonly exampleCollectionCKey: `Example Collection C Data`;
    };
  };
  type ExampleAdditionalCollectionData = {
    readonly exampleAdditionalCollectionDataKey: string;
  };
  const listFilesA = jest.fn();
  const listFilesB = jest.fn((uuid, data) => {
    uuid;

    switch (data) {
      case `Example Collection B Data D`:
        return [
          {
            route: `Example Retained File Route`,
            uuid: `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
          },
          {
            route: `Example Newly Deleted File Route`,
            uuid: `0976d288-4d12-4c38-b28e-bf95ce1b3e81`,
          },
        ];

      case `Example Collection B Data B`:
        return [
          {
            route: `Example Returned File Route A`,
            uuid: `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
          },
          {
            route: `Example Returned File Route B`,
            uuid: `60aa58c2-4b67-4dc2-b160-cf3aca368147`,
          },
          {
            route: `Example Returned File Route C`,
            uuid: `32c81253-0fbf-44fe-9d0b-fa24e9d16752`,
          },
        ];

      default:
        fail(`Unexpected data "${data}".`);
    }
  });
  const listFilesC = jest.fn();
  const syncConfiguration: SyncConfiguration<
    ExampleSchema,
    ExampleAdditionalCollectionData
  > = {
    order: [
      {
        type: `collection`,
        key: `exampleCollectionCKey`,
      },
      {
        type: `enum`,
        key: `testEnumAKey`,
      },
      {
        type: `collection`,
        key: `exampleCollectionBKey`,
      },
      {
        type: `enum`,
        key: `testEnumCKey`,
      },
      {
        type: `enum`,
        key: `testEnumBKey`,
      },
      {
        type: `collection`,
        key: `exampleCollectionAKey`,
      },
    ],
    collections: {
      exampleCollectionAKey: {
        listFiles: listFilesA,
        exampleAdditionalCollectionDataKey: `Example String A`,
      },
      exampleCollectionBKey: {
        listFiles: listFilesB,
        exampleAdditionalCollectionDataKey: `Example String B`,
      },
      exampleCollectionCKey: {
        listFiles: listFilesC,
        exampleAdditionalCollectionDataKey: `Example String C`,
      },
    },
  };
  const syncableStateHelper = new SyncableStateHelper(syncConfiguration);
  const setState = jest.fn();
  const state: SyncableState<ExampleSchema> = {
    enums: {
      testEnumAKey: {
        type: `upToDate`,
        version: `Test Enum A Version A`,
        values: {
          "02c1ea8b-9332-4359-8094-db30da4a1a48": `Test Enum A Value A`,
          "58c0c0e8-90cd-45b5-be6c-55ad1113db4a": `Test Enum A Value B`,
          "4cdccf5d-b4fd-4ef9-97f7-d5d023d58f8a": `Test Enum A Value C`,
        },
      },
      testEnumBKey: {
        type: `absent`,
      },
      testEnumCKey: {
        type: `upToDate`,
        version: `Test Enum C Version A`,
        values: {
          "facfe4b1-cff2-43cd-8a70-bf1565ea57fe": `Test Enum C Value A`,
          "2314dfdd-7c51-4ff2-a700-dfb162fd6fc0": `Test Enum C Value B`,
          "ed2c8187-e4b8-4229-bdce-fd2bd111ffa6": `Test Enum C Value C`,
          "1292dfab-f3ed-47ac-9464-b981a24ecb21": `Test Enum C Value D`,
        },
      },
    },
    collections: {
      exampleCollectionAKey: {
        "b990662b-9f09-4b77-94a1-da75595dd6a3": {
          status: `pushing`,
          data: `Example Collection A Data`,
        },
      },
      exampleCollectionBKey: {
        "1bcc95ac-7a81-4771-8c76-5c6fc69805cc": {
          status: `upToDate`,
          version: `Example Version`,
          data: `Example Collection B Data C`,
        },
        "12d9197e-7803-49ca-83cb-1ce292ec6a35": {
          status: `upToDate`,
          version: `Example Version`,
          data: `Example Collection B Data D`,
        },
      },
      exampleCollectionCKey: {
        "43ea8579-70e6-48bb-8d6e-f7a444627880": {
          status: `awaitingPush`,
          data: `Example Collection C Data`,
        },
      },
    },
    addedFileUuids: [
      `8ef70dc5-c1dc-49d6-a209-90cc3bbad6cb`,
      `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
      `0976d288-4d12-4c38-b28e-bf95ce1b3e81`,
      `8660822b-4c7f-480d-a4f0-67e58e68afb4`,
    ],
    deletedFileRoutes: [
      `Example Deleted File Route A`,
      `Example Deleted File Route B`,
      `Example Deleted File Route C`,
    ],
  };

  syncableStateHelper.upsertCollection(
    state,
    `exampleCollectionBKey`,
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data B`,
    setState
  );

  expect(listFilesA).not.toHaveBeenCalled();
  expect(listFilesB).toBeCalledTimes(2);
  expect(listFilesB).toBeCalledWith(
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data B`
  );
  expect(listFilesB).toBeCalledWith(
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data D`
  );
  expect(listFilesC).not.toHaveBeenCalled();
  expect(setState).toBeCalledTimes(1);
  expect(setState).toBeCalledWith({
    enums: {
      testEnumAKey: {
        type: `upToDate`,
        version: `Test Enum A Version A`,
        values: {
          "02c1ea8b-9332-4359-8094-db30da4a1a48": `Test Enum A Value A`,
          "58c0c0e8-90cd-45b5-be6c-55ad1113db4a": `Test Enum A Value B`,
          "4cdccf5d-b4fd-4ef9-97f7-d5d023d58f8a": `Test Enum A Value C`,
        },
      },
      testEnumBKey: {
        type: `absent`,
      },
      testEnumCKey: {
        type: `upToDate`,
        version: `Test Enum C Version A`,
        values: {
          "facfe4b1-cff2-43cd-8a70-bf1565ea57fe": `Test Enum C Value A`,
          "2314dfdd-7c51-4ff2-a700-dfb162fd6fc0": `Test Enum C Value B`,
          "ed2c8187-e4b8-4229-bdce-fd2bd111ffa6": `Test Enum C Value C`,
          "1292dfab-f3ed-47ac-9464-b981a24ecb21": `Test Enum C Value D`,
        },
      },
    },
    collections: {
      exampleCollectionAKey: {
        "b990662b-9f09-4b77-94a1-da75595dd6a3": {
          status: `pushing`,
          data: `Example Collection A Data`,
        },
      },
      exampleCollectionBKey: {
        "1bcc95ac-7a81-4771-8c76-5c6fc69805cc": {
          status: `upToDate`,
          version: `Example Version`,
          data: `Example Collection B Data C`,
        },
        "12d9197e-7803-49ca-83cb-1ce292ec6a35": {
          status: `awaitingPush`,
          data: `Example Collection B Data B`,
        },
      },
      exampleCollectionCKey: {
        "43ea8579-70e6-48bb-8d6e-f7a444627880": {
          status: `awaitingPush`,
          data: `Example Collection C Data`,
        },
      },
    },
    addedFileUuids: [
      `8ef70dc5-c1dc-49d6-a209-90cc3bbad6cb`,
      `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
      `8660822b-4c7f-480d-a4f0-67e58e68afb4`,
      `60aa58c2-4b67-4dc2-b160-cf3aca368147`,
      `32c81253-0fbf-44fe-9d0b-fa24e9d16752`,
    ],
    deletedFileRoutes: [
      `Example Deleted File Route A`,
      `Example Deleted File Route B`,
      `Example Deleted File Route C`,
      `Example Newly Deleted File Route`,
    ],
  });
});

test(`upserts when existing as awaiting push`, () => {
  type ExampleSchema = {
    readonly enums: {
      readonly testEnumAKey:
        | `Test Enum A Value A`
        | `Test Enum A Value B`
        | `Test Enum A Value C`;
      readonly testEnumBKey: `Test Enum B Value A` | `Test Enum B Value B`;
      readonly testEnumCKey:
        | `Test Enum C Value A`
        | `Test Enum C Value B`
        | `Test Enum C Value C`
        | `Test Enum C Value D`;
    };
    readonly collections: {
      readonly exampleCollectionAKey: `Example Collection A Data`;
      readonly exampleCollectionBKey:
        | `Example Collection B Data A`
        | `Example Collection B Data B`
        | `Example Collection B Data C`
        | `Example Collection B Data D`
        | `Example Collection B Data E`;
      readonly exampleCollectionCKey: `Example Collection C Data`;
    };
  };
  type ExampleAdditionalCollectionData = {
    readonly exampleAdditionalCollectionDataKey: string;
  };
  const listFilesA = jest.fn();
  const listFilesB = jest.fn((uuid, data) => {
    uuid;

    switch (data) {
      case `Example Collection B Data D`:
        return [
          {
            route: `Example Retained File Route`,
            uuid: `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
          },
          {
            route: `Example Newly Deleted File Route`,
            uuid: `0976d288-4d12-4c38-b28e-bf95ce1b3e81`,
          },
        ];

      case `Example Collection B Data B`:
        return [
          {
            route: `Example Returned File Route A`,
            uuid: `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
          },
          {
            route: `Example Returned File Route B`,
            uuid: `60aa58c2-4b67-4dc2-b160-cf3aca368147`,
          },
          {
            route: `Example Returned File Route C`,
            uuid: `32c81253-0fbf-44fe-9d0b-fa24e9d16752`,
          },
        ];

      default:
        fail(`Unexpected data "${data}".`);
    }
  });
  const listFilesC = jest.fn();
  const syncConfiguration: SyncConfiguration<
    ExampleSchema,
    ExampleAdditionalCollectionData
  > = {
    order: [
      {
        type: `collection`,
        key: `exampleCollectionCKey`,
      },
      {
        type: `enum`,
        key: `testEnumAKey`,
      },
      {
        type: `collection`,
        key: `exampleCollectionBKey`,
      },
      {
        type: `enum`,
        key: `testEnumCKey`,
      },
      {
        type: `enum`,
        key: `testEnumBKey`,
      },
      {
        type: `collection`,
        key: `exampleCollectionAKey`,
      },
    ],
    collections: {
      exampleCollectionAKey: {
        listFiles: listFilesA,
        exampleAdditionalCollectionDataKey: `Example String A`,
      },
      exampleCollectionBKey: {
        listFiles: listFilesB,
        exampleAdditionalCollectionDataKey: `Example String B`,
      },
      exampleCollectionCKey: {
        listFiles: listFilesC,
        exampleAdditionalCollectionDataKey: `Example String C`,
      },
    },
  };
  const syncableStateHelper = new SyncableStateHelper(syncConfiguration);
  const setState = jest.fn();
  const state: SyncableState<ExampleSchema> = {
    enums: {
      testEnumAKey: {
        type: `upToDate`,
        version: `Test Enum A Version A`,
        values: {
          "02c1ea8b-9332-4359-8094-db30da4a1a48": `Test Enum A Value A`,
          "58c0c0e8-90cd-45b5-be6c-55ad1113db4a": `Test Enum A Value B`,
          "4cdccf5d-b4fd-4ef9-97f7-d5d023d58f8a": `Test Enum A Value C`,
        },
      },
      testEnumBKey: {
        type: `absent`,
      },
      testEnumCKey: {
        type: `upToDate`,
        version: `Test Enum C Version A`,
        values: {
          "facfe4b1-cff2-43cd-8a70-bf1565ea57fe": `Test Enum C Value A`,
          "2314dfdd-7c51-4ff2-a700-dfb162fd6fc0": `Test Enum C Value B`,
          "ed2c8187-e4b8-4229-bdce-fd2bd111ffa6": `Test Enum C Value C`,
          "1292dfab-f3ed-47ac-9464-b981a24ecb21": `Test Enum C Value D`,
        },
      },
    },
    collections: {
      exampleCollectionAKey: {
        "b990662b-9f09-4b77-94a1-da75595dd6a3": {
          status: `pushing`,
          data: `Example Collection A Data`,
        },
      },
      exampleCollectionBKey: {
        "1bcc95ac-7a81-4771-8c76-5c6fc69805cc": {
          status: `upToDate`,
          version: `Example Version`,
          data: `Example Collection B Data C`,
        },
        "12d9197e-7803-49ca-83cb-1ce292ec6a35": {
          status: `awaitingPush`,
          data: `Example Collection B Data D`,
        },
      },
      exampleCollectionCKey: {
        "43ea8579-70e6-48bb-8d6e-f7a444627880": {
          status: `awaitingPush`,
          data: `Example Collection C Data`,
        },
      },
    },
    addedFileUuids: [
      `8ef70dc5-c1dc-49d6-a209-90cc3bbad6cb`,
      `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
      `0976d288-4d12-4c38-b28e-bf95ce1b3e81`,
      `8660822b-4c7f-480d-a4f0-67e58e68afb4`,
    ],
    deletedFileRoutes: [
      `Example Deleted File Route A`,
      `Example Deleted File Route B`,
      `Example Deleted File Route C`,
    ],
  };

  syncableStateHelper.upsertCollection(
    state,
    `exampleCollectionBKey`,
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data B`,
    setState
  );

  expect(listFilesA).not.toHaveBeenCalled();
  expect(listFilesB).toBeCalledTimes(2);
  expect(listFilesB).toBeCalledWith(
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data B`
  );
  expect(listFilesB).toBeCalledWith(
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data D`
  );
  expect(listFilesC).not.toHaveBeenCalled();
  expect(setState).toBeCalledTimes(1);
  expect(setState).toBeCalledWith({
    enums: {
      testEnumAKey: {
        type: `upToDate`,
        version: `Test Enum A Version A`,
        values: {
          "02c1ea8b-9332-4359-8094-db30da4a1a48": `Test Enum A Value A`,
          "58c0c0e8-90cd-45b5-be6c-55ad1113db4a": `Test Enum A Value B`,
          "4cdccf5d-b4fd-4ef9-97f7-d5d023d58f8a": `Test Enum A Value C`,
        },
      },
      testEnumBKey: {
        type: `absent`,
      },
      testEnumCKey: {
        type: `upToDate`,
        version: `Test Enum C Version A`,
        values: {
          "facfe4b1-cff2-43cd-8a70-bf1565ea57fe": `Test Enum C Value A`,
          "2314dfdd-7c51-4ff2-a700-dfb162fd6fc0": `Test Enum C Value B`,
          "ed2c8187-e4b8-4229-bdce-fd2bd111ffa6": `Test Enum C Value C`,
          "1292dfab-f3ed-47ac-9464-b981a24ecb21": `Test Enum C Value D`,
        },
      },
    },
    collections: {
      exampleCollectionAKey: {
        "b990662b-9f09-4b77-94a1-da75595dd6a3": {
          status: `pushing`,
          data: `Example Collection A Data`,
        },
      },
      exampleCollectionBKey: {
        "1bcc95ac-7a81-4771-8c76-5c6fc69805cc": {
          status: `upToDate`,
          version: `Example Version`,
          data: `Example Collection B Data C`,
        },
        "12d9197e-7803-49ca-83cb-1ce292ec6a35": {
          status: `awaitingPush`,
          data: `Example Collection B Data B`,
        },
      },
      exampleCollectionCKey: {
        "43ea8579-70e6-48bb-8d6e-f7a444627880": {
          status: `awaitingPush`,
          data: `Example Collection C Data`,
        },
      },
    },
    addedFileUuids: [
      `8ef70dc5-c1dc-49d6-a209-90cc3bbad6cb`,
      `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
      `8660822b-4c7f-480d-a4f0-67e58e68afb4`,
      `60aa58c2-4b67-4dc2-b160-cf3aca368147`,
      `32c81253-0fbf-44fe-9d0b-fa24e9d16752`,
    ],
    deletedFileRoutes: [
      `Example Deleted File Route A`,
      `Example Deleted File Route B`,
      `Example Deleted File Route C`,
      `Example Newly Deleted File Route`,
    ],
  });
});

test(`upserts when existing as pushing`, () => {
  type ExampleSchema = {
    readonly enums: {
      readonly testEnumAKey:
        | `Test Enum A Value A`
        | `Test Enum A Value B`
        | `Test Enum A Value C`;
      readonly testEnumBKey: `Test Enum B Value A` | `Test Enum B Value B`;
      readonly testEnumCKey:
        | `Test Enum C Value A`
        | `Test Enum C Value B`
        | `Test Enum C Value C`
        | `Test Enum C Value D`;
    };
    readonly collections: {
      readonly exampleCollectionAKey: `Example Collection A Data`;
      readonly exampleCollectionBKey:
        | `Example Collection B Data A`
        | `Example Collection B Data B`
        | `Example Collection B Data C`
        | `Example Collection B Data D`
        | `Example Collection B Data E`;
      readonly exampleCollectionCKey: `Example Collection C Data`;
    };
  };
  type ExampleAdditionalCollectionData = {
    readonly exampleAdditionalCollectionDataKey: string;
  };
  const listFilesA = jest.fn();
  const listFilesB = jest.fn((uuid, data) => {
    uuid;

    switch (data) {
      case `Example Collection B Data D`:
        return [
          {
            route: `Example Retained File Route`,
            uuid: `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
          },
          {
            route: `Example Newly Deleted File Route`,
            uuid: `0976d288-4d12-4c38-b28e-bf95ce1b3e81`,
          },
        ];

      case `Example Collection B Data B`:
        return [
          {
            route: `Example Returned File Route A`,
            uuid: `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
          },
          {
            route: `Example Returned File Route B`,
            uuid: `60aa58c2-4b67-4dc2-b160-cf3aca368147`,
          },
          {
            route: `Example Returned File Route C`,
            uuid: `32c81253-0fbf-44fe-9d0b-fa24e9d16752`,
          },
        ];

      default:
        fail(`Unexpected data "${data}".`);
    }
  });
  const listFilesC = jest.fn();
  const syncConfiguration: SyncConfiguration<
    ExampleSchema,
    ExampleAdditionalCollectionData
  > = {
    order: [
      {
        type: `collection`,
        key: `exampleCollectionCKey`,
      },
      {
        type: `enum`,
        key: `testEnumAKey`,
      },
      {
        type: `collection`,
        key: `exampleCollectionBKey`,
      },
      {
        type: `enum`,
        key: `testEnumCKey`,
      },
      {
        type: `enum`,
        key: `testEnumBKey`,
      },
      {
        type: `collection`,
        key: `exampleCollectionAKey`,
      },
    ],
    collections: {
      exampleCollectionAKey: {
        listFiles: listFilesA,
        exampleAdditionalCollectionDataKey: `Example String A`,
      },
      exampleCollectionBKey: {
        listFiles: listFilesB,
        exampleAdditionalCollectionDataKey: `Example String B`,
      },
      exampleCollectionCKey: {
        listFiles: listFilesC,
        exampleAdditionalCollectionDataKey: `Example String C`,
      },
    },
  };
  const syncableStateHelper = new SyncableStateHelper(syncConfiguration);
  const setState = jest.fn();
  const state: SyncableState<ExampleSchema> = {
    enums: {
      testEnumAKey: {
        type: `upToDate`,
        version: `Test Enum A Version A`,
        values: {
          "02c1ea8b-9332-4359-8094-db30da4a1a48": `Test Enum A Value A`,
          "58c0c0e8-90cd-45b5-be6c-55ad1113db4a": `Test Enum A Value B`,
          "4cdccf5d-b4fd-4ef9-97f7-d5d023d58f8a": `Test Enum A Value C`,
        },
      },
      testEnumBKey: {
        type: `absent`,
      },
      testEnumCKey: {
        type: `upToDate`,
        version: `Test Enum C Version A`,
        values: {
          "facfe4b1-cff2-43cd-8a70-bf1565ea57fe": `Test Enum C Value A`,
          "2314dfdd-7c51-4ff2-a700-dfb162fd6fc0": `Test Enum C Value B`,
          "ed2c8187-e4b8-4229-bdce-fd2bd111ffa6": `Test Enum C Value C`,
          "1292dfab-f3ed-47ac-9464-b981a24ecb21": `Test Enum C Value D`,
        },
      },
    },
    collections: {
      exampleCollectionAKey: {
        "b990662b-9f09-4b77-94a1-da75595dd6a3": {
          status: `pushing`,
          data: `Example Collection A Data`,
        },
      },
      exampleCollectionBKey: {
        "1bcc95ac-7a81-4771-8c76-5c6fc69805cc": {
          status: `upToDate`,
          version: `Example Version`,
          data: `Example Collection B Data C`,
        },
        "12d9197e-7803-49ca-83cb-1ce292ec6a35": {
          status: `pushing`,
          data: `Example Collection B Data D`,
        },
      },
      exampleCollectionCKey: {
        "43ea8579-70e6-48bb-8d6e-f7a444627880": {
          status: `awaitingPush`,
          data: `Example Collection C Data`,
        },
      },
    },
    addedFileUuids: [
      `8ef70dc5-c1dc-49d6-a209-90cc3bbad6cb`,
      `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
      `0976d288-4d12-4c38-b28e-bf95ce1b3e81`,
      `8660822b-4c7f-480d-a4f0-67e58e68afb4`,
    ],
    deletedFileRoutes: [
      `Example Deleted File Route A`,
      `Example Deleted File Route B`,
      `Example Deleted File Route C`,
    ],
  };

  syncableStateHelper.upsertCollection(
    state,
    `exampleCollectionBKey`,
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data B`,
    setState
  );

  expect(listFilesA).not.toHaveBeenCalled();
  expect(listFilesB).toBeCalledTimes(2);
  expect(listFilesB).toBeCalledWith(
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data B`
  );
  expect(listFilesB).toBeCalledWith(
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data D`
  );
  expect(listFilesC).not.toHaveBeenCalled();
  expect(setState).toBeCalledTimes(1);
  expect(setState).toBeCalledWith({
    enums: {
      testEnumAKey: {
        type: `upToDate`,
        version: `Test Enum A Version A`,
        values: {
          "02c1ea8b-9332-4359-8094-db30da4a1a48": `Test Enum A Value A`,
          "58c0c0e8-90cd-45b5-be6c-55ad1113db4a": `Test Enum A Value B`,
          "4cdccf5d-b4fd-4ef9-97f7-d5d023d58f8a": `Test Enum A Value C`,
        },
      },
      testEnumBKey: {
        type: `absent`,
      },
      testEnumCKey: {
        type: `upToDate`,
        version: `Test Enum C Version A`,
        values: {
          "facfe4b1-cff2-43cd-8a70-bf1565ea57fe": `Test Enum C Value A`,
          "2314dfdd-7c51-4ff2-a700-dfb162fd6fc0": `Test Enum C Value B`,
          "ed2c8187-e4b8-4229-bdce-fd2bd111ffa6": `Test Enum C Value C`,
          "1292dfab-f3ed-47ac-9464-b981a24ecb21": `Test Enum C Value D`,
        },
      },
    },
    collections: {
      exampleCollectionAKey: {
        "b990662b-9f09-4b77-94a1-da75595dd6a3": {
          status: `pushing`,
          data: `Example Collection A Data`,
        },
      },
      exampleCollectionBKey: {
        "1bcc95ac-7a81-4771-8c76-5c6fc69805cc": {
          status: `upToDate`,
          version: `Example Version`,
          data: `Example Collection B Data C`,
        },
        "12d9197e-7803-49ca-83cb-1ce292ec6a35": {
          status: `awaitingPush`,
          data: `Example Collection B Data B`,
        },
      },
      exampleCollectionCKey: {
        "43ea8579-70e6-48bb-8d6e-f7a444627880": {
          status: `awaitingPush`,
          data: `Example Collection C Data`,
        },
      },
    },
    addedFileUuids: [
      `8ef70dc5-c1dc-49d6-a209-90cc3bbad6cb`,
      `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
      `8660822b-4c7f-480d-a4f0-67e58e68afb4`,
      `60aa58c2-4b67-4dc2-b160-cf3aca368147`,
      `32c81253-0fbf-44fe-9d0b-fa24e9d16752`,
    ],
    deletedFileRoutes: [
      `Example Deleted File Route A`,
      `Example Deleted File Route B`,
      `Example Deleted File Route C`,
      `Example Newly Deleted File Route`,
    ],
  });
});

test(`upserts when existing as awaiting pull`, () => {
  type ExampleSchema = {
    readonly enums: {
      readonly testEnumAKey:
        | `Test Enum A Value A`
        | `Test Enum A Value B`
        | `Test Enum A Value C`;
      readonly testEnumBKey: `Test Enum B Value A` | `Test Enum B Value B`;
      readonly testEnumCKey:
        | `Test Enum C Value A`
        | `Test Enum C Value B`
        | `Test Enum C Value C`
        | `Test Enum C Value D`;
    };
    readonly collections: {
      readonly exampleCollectionAKey: `Example Collection A Data`;
      readonly exampleCollectionBKey:
        | `Example Collection B Data A`
        | `Example Collection B Data B`
        | `Example Collection B Data C`
        | `Example Collection B Data D`
        | `Example Collection B Data E`;
      readonly exampleCollectionCKey: `Example Collection C Data`;
    };
  };
  type ExampleAdditionalCollectionData = {
    readonly exampleAdditionalCollectionDataKey: string;
  };
  const listFilesA = jest.fn();
  const listFilesB = jest.fn((uuid, data) => {
    uuid;

    switch (data) {
      case `Example Collection B Data D`:
        return [
          {
            route: `Example Retained File Route`,
            uuid: `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
          },
          {
            route: `Example Newly Deleted File Route`,
            uuid: `0976d288-4d12-4c38-b28e-bf95ce1b3e81`,
          },
        ];

      case `Example Collection B Data B`:
        return [
          {
            route: `Example Returned File Route A`,
            uuid: `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
          },
          {
            route: `Example Returned File Route B`,
            uuid: `60aa58c2-4b67-4dc2-b160-cf3aca368147`,
          },
          {
            route: `Example Returned File Route C`,
            uuid: `32c81253-0fbf-44fe-9d0b-fa24e9d16752`,
          },
        ];

      default:
        fail(`Unexpected data "${data}".`);
    }
  });
  const listFilesC = jest.fn();
  const syncConfiguration: SyncConfiguration<
    ExampleSchema,
    ExampleAdditionalCollectionData
  > = {
    order: [
      {
        type: `collection`,
        key: `exampleCollectionCKey`,
      },
      {
        type: `enum`,
        key: `testEnumAKey`,
      },
      {
        type: `collection`,
        key: `exampleCollectionBKey`,
      },
      {
        type: `enum`,
        key: `testEnumCKey`,
      },
      {
        type: `enum`,
        key: `testEnumBKey`,
      },
      {
        type: `collection`,
        key: `exampleCollectionAKey`,
      },
    ],
    collections: {
      exampleCollectionAKey: {
        listFiles: listFilesA,
        exampleAdditionalCollectionDataKey: `Example String A`,
      },
      exampleCollectionBKey: {
        listFiles: listFilesB,
        exampleAdditionalCollectionDataKey: `Example String B`,
      },
      exampleCollectionCKey: {
        listFiles: listFilesC,
        exampleAdditionalCollectionDataKey: `Example String C`,
      },
    },
  };
  const syncableStateHelper = new SyncableStateHelper(syncConfiguration);
  const setState = jest.fn();
  const state: SyncableState<ExampleSchema> = {
    enums: {
      testEnumAKey: {
        type: `upToDate`,
        version: `Test Enum A Version A`,
        values: {
          "02c1ea8b-9332-4359-8094-db30da4a1a48": `Test Enum A Value A`,
          "58c0c0e8-90cd-45b5-be6c-55ad1113db4a": `Test Enum A Value B`,
          "4cdccf5d-b4fd-4ef9-97f7-d5d023d58f8a": `Test Enum A Value C`,
        },
      },
      testEnumBKey: {
        type: `absent`,
      },
      testEnumCKey: {
        type: `upToDate`,
        version: `Test Enum C Version A`,
        values: {
          "facfe4b1-cff2-43cd-8a70-bf1565ea57fe": `Test Enum C Value A`,
          "2314dfdd-7c51-4ff2-a700-dfb162fd6fc0": `Test Enum C Value B`,
          "ed2c8187-e4b8-4229-bdce-fd2bd111ffa6": `Test Enum C Value C`,
          "1292dfab-f3ed-47ac-9464-b981a24ecb21": `Test Enum C Value D`,
        },
      },
    },
    collections: {
      exampleCollectionAKey: {
        "b990662b-9f09-4b77-94a1-da75595dd6a3": {
          status: `pushing`,
          data: `Example Collection A Data`,
        },
      },
      exampleCollectionBKey: {
        "1bcc95ac-7a81-4771-8c76-5c6fc69805cc": {
          status: `upToDate`,
          version: `Example Version`,
          data: `Example Collection B Data C`,
        },
        "12d9197e-7803-49ca-83cb-1ce292ec6a35": {
          status: `awaitingPull`,
          data: `Example Collection B Data D`,
        },
      },
      exampleCollectionCKey: {
        "43ea8579-70e6-48bb-8d6e-f7a444627880": {
          status: `awaitingPush`,
          data: `Example Collection C Data`,
        },
      },
    },
    addedFileUuids: [
      `8ef70dc5-c1dc-49d6-a209-90cc3bbad6cb`,
      `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
      `0976d288-4d12-4c38-b28e-bf95ce1b3e81`,
      `8660822b-4c7f-480d-a4f0-67e58e68afb4`,
    ],
    deletedFileRoutes: [
      `Example Deleted File Route A`,
      `Example Deleted File Route B`,
      `Example Deleted File Route C`,
    ],
  };

  syncableStateHelper.upsertCollection(
    state,
    `exampleCollectionBKey`,
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data B`,
    setState
  );

  expect(listFilesA).not.toHaveBeenCalled();
  expect(listFilesB).toBeCalledTimes(2);
  expect(listFilesB).toBeCalledWith(
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data B`
  );
  expect(listFilesB).toBeCalledWith(
    `12d9197e-7803-49ca-83cb-1ce292ec6a35`,
    `Example Collection B Data D`
  );
  expect(listFilesC).not.toHaveBeenCalled();
  expect(setState).toBeCalledTimes(1);
  expect(setState).toBeCalledWith({
    enums: {
      testEnumAKey: {
        type: `upToDate`,
        version: `Test Enum A Version A`,
        values: {
          "02c1ea8b-9332-4359-8094-db30da4a1a48": `Test Enum A Value A`,
          "58c0c0e8-90cd-45b5-be6c-55ad1113db4a": `Test Enum A Value B`,
          "4cdccf5d-b4fd-4ef9-97f7-d5d023d58f8a": `Test Enum A Value C`,
        },
      },
      testEnumBKey: {
        type: `absent`,
      },
      testEnumCKey: {
        type: `upToDate`,
        version: `Test Enum C Version A`,
        values: {
          "facfe4b1-cff2-43cd-8a70-bf1565ea57fe": `Test Enum C Value A`,
          "2314dfdd-7c51-4ff2-a700-dfb162fd6fc0": `Test Enum C Value B`,
          "ed2c8187-e4b8-4229-bdce-fd2bd111ffa6": `Test Enum C Value C`,
          "1292dfab-f3ed-47ac-9464-b981a24ecb21": `Test Enum C Value D`,
        },
      },
    },
    collections: {
      exampleCollectionAKey: {
        "b990662b-9f09-4b77-94a1-da75595dd6a3": {
          status: `pushing`,
          data: `Example Collection A Data`,
        },
      },
      exampleCollectionBKey: {
        "1bcc95ac-7a81-4771-8c76-5c6fc69805cc": {
          status: `upToDate`,
          version: `Example Version`,
          data: `Example Collection B Data C`,
        },
        "12d9197e-7803-49ca-83cb-1ce292ec6a35": {
          status: `awaitingPush`,
          data: `Example Collection B Data B`,
        },
      },
      exampleCollectionCKey: {
        "43ea8579-70e6-48bb-8d6e-f7a444627880": {
          status: `awaitingPush`,
          data: `Example Collection C Data`,
        },
      },
    },
    addedFileUuids: [
      `8ef70dc5-c1dc-49d6-a209-90cc3bbad6cb`,
      `ab640d92-cdb4-4f48-8bfc-70b90ceefc84`,
      `8660822b-4c7f-480d-a4f0-67e58e68afb4`,
      `60aa58c2-4b67-4dc2-b160-cf3aca368147`,
      `32c81253-0fbf-44fe-9d0b-fa24e9d16752`,
    ],
    deletedFileRoutes: [
      `Example Deleted File Route A`,
      `Example Deleted File Route B`,
      `Example Deleted File Route C`,
      `Example Newly Deleted File Route`,
    ],
  });
});
