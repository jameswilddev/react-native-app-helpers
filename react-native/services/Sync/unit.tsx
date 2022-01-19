import {
  Sync,
  Json,
  RequestInterface,
  SyncConfigurationCollection,
  FileStoreInterface,
  FileRequestBody,
  QueryParameters,
  JsonRequestBody,
  EmptyRequestBody,
  StateStoreInterface,
} from "../../..";
import type { LoggerInterface } from "../../types/LoggerInterface";
import type { SyncableState } from "../../types/SyncableState";
import type { SyncState } from "../../types/SyncState";

type SingletonAData = `Test Singleton A Value A` | `Test Singleton A Value B`;

type SingletonBData = `Test Singleton B Value A` | `Test Singleton B Value B`;

type SingletonCData = `Test Singleton C Value A` | `Test Singleton C Value B`;

type CollectionAData =
  | `Test Collection A Value A`
  | `Test Collection A Value B`
  | `Test Collection A Value C`
  | `Test Collection A Value D`
  | `Test Collection A Value E`;

type CollectionBData =
  | `Test Collection B Value A`
  | `Test Collection B Value B`
  | `Test Collection B Value C`
  | `Test Collection B Value D`
  | `Test Collection B Value E`
  | `Test Collection B Value F`
  | `Test Collection B Value G`
  | `Test Collection B Value H`
  | `Test Collection B Value I`
  | `Test Collection B Value J`
  | `Test Collection B Value K`
  | `Test Collection B Value L`;

type CollectionCData =
  | `Test Collection C Value A`
  | `Test Collection C Value B`;

type TestSchema = {
  readonly singletons: {
    readonly testSingletonAKey: SingletonAData;
    readonly testSingletonBKey: SingletonBData;
    readonly testSingletonCKey: SingletonCData;
  };
  readonly collections: {
    readonly testCollectionAKey: CollectionAData;
    readonly testCollectionBKey: CollectionBData;
    readonly testCollectionCKey: CollectionCData;
  };
};

type TestAdditionalCollectionData = {
  readonly testAdditionalCollectionDataKey: string;
};

type TestAdditionalCollectionItemData = {
  readonly testAdditionalCollectionDataItemKey: string;
};

type PushStep = {
  readonly type: `push`;
  readonly method: string;
  readonly route: string;
  readonly requestBody: EmptyRequestBody | JsonRequestBody | FileRequestBody;
  readonly queryParameters: QueryParameters;
  readonly expectedStatusCodes: ReadonlyArray<string>;
  readonly statusCode: string;
};

type SetStateStep = {
  readonly type: `setState`;
  readonly to: SyncableState<TestSchema>;
};

type PullJsonStep = {
  readonly type: `pullJson`;
  readonly method: string;
  readonly route: string;
  readonly requestBody: EmptyRequestBody | JsonRequestBody | FileRequestBody;
  readonly queryParameters: QueryParameters;
  readonly expectedStatusCodes: ReadonlyArray<string>;
  readonly response: Json;
  readonly statusCode: string;
};

type PullFileStep = {
  readonly type: `pullFile`;
  readonly method: string;
  readonly route: string;
  readonly requestBody: EmptyRequestBody | JsonRequestBody | FileRequestBody;
  readonly queryParameters: QueryParameters;
  readonly fileUri: string;
  readonly successfulStatusCodes: ReadonlyArray<string>;
  readonly failureStatusCodes: ReadonlyArray<string>;
  readonly statusCode: string;
};

type LogStep = {
  readonly type: `log`;
  readonly severity: `error` | `warning` | `information` | `debug`;
  readonly text: string;
  readonly nextFileCleanUpBlockers?: number;
};

type Step =
  | {
      readonly type: `getState`;
      readonly changedExternally: boolean;
    }
  | PushStep
  | SetStateStep
  | PullJsonStep
  | PullFileStep
  | LogStep
  | {
      readonly type: `listFiles`;
      readonly uuids: ReadonlyArray<string>;
    }
  | {
      readonly type: `deleteFile`;
      readonly uuid: string;
    }
  | {
      readonly type: `stateChange`;
      readonly eventHandler: `a` | `c`;
      readonly to: SyncState<
        TestSchema,
        TestAdditionalCollectionData,
        TestAdditionalCollectionItemData
      >;
    };

const syncConfigurationCollectionA: SyncConfigurationCollection<
  CollectionAData,
  TestAdditionalCollectionData
> = {
  testAdditionalCollectionDataKey: `Test Collection A Additional Value`,
  listFiles(uuid, data) {
    switch (data) {
      case `Test Collection A Value A`:
      case `Test Collection A Value E`:
        expect(uuid).toEqual(`499b4447-2f9a-49a7-b636-909ace319cd8`);

        return [
          {
            route: `Test Collection A Value A File A Route`,
            uuid: `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
          },
        ];

      case `Test Collection A Value B`:
        expect(uuid).toEqual(`499b4447-2f9a-49a7-b636-909ace319cd8`);

        return [];

      case `Test Collection A Value C`:
        expect(uuid).toEqual(`6ebca435-755c-45ef-a11c-1bcdda74c222`);

        return [];

      case `Test Collection A Value D`:
        expect(uuid).toEqual(`e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7`);

        return [];
    }
  },
};

const syncConfigurationCollectionB: SyncConfigurationCollection<
  CollectionBData,
  TestAdditionalCollectionData
> = {
  testAdditionalCollectionDataKey: `Test Collection B Additional Value`,
  listFiles(uuid, data) {
    switch (data) {
      case `Test Collection B Value A`:
        expect(uuid).toEqual(`47fe4216-a7db-43e0-8039-fced83de97cc`);

        return [];

      case `Test Collection B Value B`:
        expect(uuid).toEqual(`8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`);

        return [
          {
            route: `Test Collection B Value B File A Route`,
            uuid: `52219b25-ac88-4440-bf31-a47df684bdd7`,
          },
          {
            route: `Test Collection B Value B File B Route`,
            uuid: `f81d2428-9bde-4b1c-823c-86b349c99363`,
          },
        ];

      case `Test Collection B Value C`:
        expect(uuid).toEqual(`8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`);

        return [
          {
            route: `Test Collection B Value C File A Route`,
            uuid: `52219b25-ac88-4440-bf31-a47df684bdd7`,
          },
          {
            route: `Test Collection B Value C File B Route`,
            uuid: `f81d2428-9bde-4b1c-823c-86b349c99363`,
          },
        ];

      case `Test Collection B Value D`:
        expect(uuid).toEqual(`2b5de2bf-22a4-493f-a8f3-c03437b08851`);

        return [];

      case `Test Collection B Value E`:
        expect(uuid).toEqual(`2b5de2bf-22a4-493f-a8f3-c03437b08851`);

        return [
          {
            route: `Test Collection B Value E File A Route`,
            uuid: `dab5ac6d-0ecc-4af9-9022-dda2414bf8b6`,
          },
          {
            route: `Test Collection B Value E File B Route`,
            uuid: `286b57fd-1551-4899-9f90-07e8727e4823`,
          },
        ];

      case `Test Collection B Value F`:
        expect(uuid).toEqual(`8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`);

        return [
          {
            route: `Test Collection B Value F File A Route`,
            uuid: `52219b25-ac88-4440-bf31-a47df684bdd7`,
          },
          {
            route: `Test Collection B Value F File B Route`,
            uuid: `40d92d2c-631f-4a42-ba5e-a70a82bea897`,
          },
          {
            route: `Test Collection B Value F File C Route`,
            uuid: `f81d2428-9bde-4b1c-823c-86b349c99363`,
          },
          {
            route: `Test Collection B Value F File D Route`,
            uuid: `c2df927b-74be-4d78-8705-7f0a664ba53b`,
          },
        ];

      case `Test Collection B Value G`:
        expect(uuid).toEqual(`8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`);

        return [
          {
            route: `Test Collection B Value G File A Route`,
            uuid: `52219b25-ac88-4440-bf31-a47df684bdd7`,
          },
        ];

      case `Test Collection B Value H`:
        expect(uuid).toEqual(`8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`);

        return [
          {
            route: `Test Collection B Value H File A Route`,
            uuid: `f81d2428-9bde-4b1c-823c-86b349c99363`,
          },
          {
            route: `Test Collection B Value H File B Route`,
            uuid: `bdf19add-072c-4fd6-bca7-8468f8b80a76`,
          },
        ];

      case `Test Collection B Value I`:
        expect(uuid).toEqual(`ce05f13c-6a36-42ac-bed4-63bbf098eeb8`);

        return [];

      case `Test Collection B Value J`:
        expect(uuid).toEqual(`4c91279d-d35f-4063-afa2-a0c0ec0dcfd3`);

        return [];

      case `Test Collection B Value K`:
        expect(uuid).toEqual(`94576d22-2cbc-451e-9a92-3c50866da564`);

        return [];

      case `Test Collection B Value L`:
        expect(uuid).toEqual(`ce05f13c-6a36-42ac-bed4-63bbf098eeb8`);

        return [];
    }
  },
};

const syncConfigurationCollectionC: SyncConfigurationCollection<
  CollectionCData,
  TestAdditionalCollectionData
> = {
  testAdditionalCollectionDataKey: `Test Collection C Additional Value`,
  listFiles(uuid, data) {
    expect(uuid).toEqual(`c2bf5c63-85dc-4797-82db-6136081b1562`);

    expect([
      `Test Collection C Value A`,
      `Test Collection C Value B`,
    ]).toContain(data);

    return [];
  },
};

function scenario(
  description: string,
  initialState: SyncableState<TestSchema>,
  expectedSteps: ReadonlyArray<Step>,
  returns: `noChangesMade` | `needsToRunAgain` | `atLeastOneChangeMade`
): void {
  test(description, async () => {
    let currentState = initialState;

    const actualSteps: Step[] = [];

    const stateStore: StateStoreInterface<SyncableState<TestSchema>> = {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      load: jest.fn(),
      get: jest.fn(() => {
        const expectedStep = expectedSteps[actualSteps.length];

        actualSteps.push({
          type: `getState`,
          changedExternally: expect.any(Boolean),
        });

        if (expectedStep === undefined || expectedStep.type !== `getState`) {
          fail(`Unexpected stateStore.get()`);
        } else if (expectedStep.changedExternally) {
          return JSON.parse(JSON.stringify(currentState));
        } else {
          return currentState;
        }
      }),
      set: jest.fn((to: SyncableState<TestSchema>) => {
        actualSteps.push({
          type: `setState`,
          to,
        });

        currentState = to;
      }),
      unload: jest.fn(),
    };

    const request: RequestInterface = {
      withoutResponse: jest.fn(
        async (
          method,
          route,
          requestBody,
          queryParameters,
          abortSignal,
          expectedStatusCodes
        ) => {
          const expectedStep = expectedSteps[actualSteps.length];

          actualSteps.push({
            type: `push`,
            method,
            route,
            requestBody,
            queryParameters,
            expectedStatusCodes,
            statusCode: expect.anything(),
          });

          expect(abortSignal).toBe(abortSignal);

          if (expectedStep === undefined || expectedStep.type !== `push`) {
            fail(`Unexpected request.withoutResponse()`);
          } else {
            return expectedStep.statusCode;
          }
        }
      ) as RequestInterface[`withoutResponse`],
      returningJson: jest.fn(
        async (
          method,
          route,
          requestBody,
          queryParameters,
          abortSignal,
          expectedStatusCodes
        ) => {
          const expectedStep = expectedSteps[actualSteps.length];

          actualSteps.push({
            type: `pullJson`,
            method,
            route,
            requestBody,
            queryParameters,
            expectedStatusCodes,
            response: expect.anything(),
            statusCode: expect.anything(),
          });

          expect(abortSignal).toBe(abortSignal);

          if (expectedStep === undefined || expectedStep.type !== `pullJson`) {
            fail(`Unexpected request.returningJson()`);
          } else {
            return {
              statusCode: expectedStep.statusCode,
              value: expectedStep.response,
            };
          }
        }
      ) as RequestInterface[`returningJson`],
      returningFile: jest.fn(
        async (
          method,
          route,
          requestBody,
          queryParameters,
          abortSignal,
          fileUri,
          successfulStatusCodes,
          failureStatusCodes
        ) => {
          const expectedStep = expectedSteps[actualSteps.length];

          actualSteps.push({
            type: `pullFile`,
            method,
            route,
            requestBody,
            queryParameters,
            fileUri,
            successfulStatusCodes,
            failureStatusCodes,
            statusCode: expect.anything(),
          });

          expect(abortSignal).toBe(abortSignal);

          if (expectedStep === undefined || expectedStep.type !== `pullFile`) {
            fail(`Unexpected request.returningFile()`);
          } else {
            return expectedStep.statusCode;
          }
        }
      ) as RequestInterface[`returningFile`],
    };

    const logger: LoggerInterface = {
      error(text) {
        actualSteps.push({ type: `log`, severity: `error`, text });
      },
      warning(text) {
        actualSteps.push({ type: `log`, severity: `warning`, text });
      },
      information(text) {
        actualSteps.push({ type: `log`, severity: `information`, text });
      },
      debug(text) {
        const expectedStep = expectedSteps[actualSteps.length];

        if (expectedStep === undefined || expectedStep.type !== `log`) {
          actualSteps.push({ type: `log`, severity: `debug`, text });

          fail(`Unexpected logger.debug()`);
        } else {
          const actualStep: {
            readonly type: `log`;
            readonly severity: `debug`;
            text: string;
            nextFileCleanUpBlockers?: number;
          } = { type: `log`, severity: `debug`, text };

          if (expectedStep.nextFileCleanUpBlockers !== undefined) {
            actualStep.nextFileCleanUpBlockers =
              expectedStep.nextFileCleanUpBlockers;

            sync.fileCleanUpBlockers = expectedStep.nextFileCleanUpBlockers;
          }

          actualSteps.push(actualStep);
        }
      },
    };

    const fileStore: FileStoreInterface = {
      load: jest.fn(),
      generatePath: (uuid) =>
        `Example File Path For Uuid ${uuid} Generated By File Store`,
      async delete(uuid) {
        actualSteps.push({
          type: `deleteFile`,
          uuid,
        });
      },
      async list() {
        const expectedStep = expectedSteps[actualSteps.length];

        actualSteps.push({
          type: `listFiles`,
          uuids: expect.any(Array),
        });

        if (expectedStep === undefined || expectedStep.type !== `listFiles`) {
          fail(`Unexpected fileStore.list()`);
        } else {
          return expectedStep.uuids;
        }
      },
      unload: jest.fn(),
      import: jest.fn(),
    };

    const abortSignal = new AbortController().signal;

    const sync = new Sync<
      TestSchema,
      TestAdditionalCollectionData,
      TestAdditionalCollectionItemData
    >(
      stateStore,
      request,
      logger,
      {
        order: [
          {
            type: `collection`,
            key: `testCollectionBKey`,
          },
          {
            type: `singleton`,
            key: `testSingletonCKey`,
          },
          {
            type: `singleton`,
            key: `testSingletonBKey`,
          },
          {
            type: `collection`,
            key: `testCollectionCKey`,
          },
          {
            type: `singleton`,
            key: `testSingletonAKey`,
          },
          {
            type: `collection`,
            key: `testCollectionAKey`,
          },
        ],
        collections: {
          testCollectionAKey: syncConfigurationCollectionA,
          testCollectionBKey: syncConfigurationCollectionB,
          testCollectionCKey: syncConfigurationCollectionC,
        },
      },
      fileStore
    );

    const eventHandlerA = () => {
      actualSteps.push({
        type: `stateChange`,
        eventHandler: `a`,
        to: sync.getState(),
      });
    };
    sync.addListener(`stateChange`, eventHandlerA);

    const eventHandlerB = jest.fn();
    sync.addListener(`stateChange`, eventHandlerB);

    const eventHandlerC = () => {
      actualSteps.push({
        type: `stateChange`,
        eventHandler: `c`,
        to: sync.getState(),
      });
    };
    sync.addListener(`stateChange`, eventHandlerC);

    sync.removeListener(`stateChange`, eventHandlerB);

    expect(sync.getState()).toEqual({ type: `notRunning` });

    try {
      const actual = await sync.run(abortSignal);

      expect(actual).toEqual(returns);
    } finally {
      expect(actualSteps).toEqual(expectedSteps);
    }

    expect(stateStore.addListener).not.toHaveBeenCalled();
    expect(stateStore.removeListener).not.toHaveBeenCalled();
    expect(stateStore.load).not.toHaveBeenCalled();
    expect(stateStore.unload).not.toHaveBeenCalled();

    expect(fileStore.load).not.toHaveBeenCalled();
    expect(fileStore.unload).not.toHaveBeenCalled();
    expect(fileStore.import).not.toHaveBeenCalled();

    expect(sync.getState()).toEqual({ type: `notRunning` });

    expect(eventHandlerB).not.toHaveBeenCalled();
  });
}

scenario(
  `without changes`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; no changes were made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `noChangesMade`
);

scenario(
  `with a change to push without files`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPush`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version C`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version C`,
        data: `Test Collection B Value C`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value C`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with a change to push with files`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPush`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 2,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 2,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `Test Collection B Value B File B Route`,
      requestBody: {
        type: `file`,
        fileUri: `Example File Path For Uuid f81d2428-9bde-4b1c-823c-86b349c99363 Generated By File Store`,
      },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version C`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version C`,
        data: `Test Collection B Value C`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value C`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with a previously interrupted push without files`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `pushing`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted push of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another attempt will be made.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version C`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version C`,
        data: `Test Collection B Value C`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value C`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with a previously interrupted push with files`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `pushing`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted push of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another attempt will be made.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 2,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 2,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `Test Collection B Value B File B Route`,
      requestBody: {
        type: `file`,
        fileUri: `Example File Path For Uuid f81d2428-9bde-4b1c-823c-86b349c99363 Generated By File Store`,
      },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version C`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version C`,
        data: `Test Collection B Value C`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value C`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with a previously interrupted pull where files were not awaiting push and the interrupted record is then deleted`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPull`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted sync of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another pull attempt will be made following the push phase.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deletions applied.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "f81d2428-9bde-4b1c-823c-86b349c99363"...`,
    },
    {
      type: `deleteFile`,
      uuid: `f81d2428-9bde-4b1c-823c-86b349c99363`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "52219b25-ac88-4440-bf31-a47df684bdd7"...`,
    },
    {
      type: `deleteFile`,
      uuid: `52219b25-ac88-4440-bf31-a47df684bdd7`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with a previously interrupted pull where files were awaiting push and the interrupted record is then deleted`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPull`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted sync of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another pull attempt will be made following the push phase.`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `File(s) for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" were not pushed during the previous interrupted sync.  They will be pushed as part of this sync.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `Test Collection B Value B File B Route`,
      requestBody: {
        type: `file`,
        fileUri: `Example File Path For Uuid f81d2428-9bde-4b1c-823c-86b349c99363 Generated By File Store`,
      },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deletions applied.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "f81d2428-9bde-4b1c-823c-86b349c99363"...`,
    },
    {
      type: `deleteFile`,
      uuid: `f81d2428-9bde-4b1c-823c-86b349c99363`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "52219b25-ac88-4440-bf31-a47df684bdd7"...`,
    },
    {
      type: `deleteFile`,
      uuid: `52219b25-ac88-4440-bf31-a47df684bdd7`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with a previously interrupted pull where files were not awaiting push and the interrupted record is then updated`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPull`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted sync of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another pull attempt will be made following the push phase.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version C`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version C`,
        data: `Test Collection B Value C`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value C`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with a previously interrupted pull where files were awaiting push and the interrupted record is then updated`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPull`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted sync of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another pull attempt will be made following the push phase.`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `File(s) for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" were not pushed during the previous interrupted sync.  They will be pushed as part of this sync.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `Test Collection B Value B File B Route`,
      requestBody: {
        type: `file`,
        fileUri: `Example File Path For Uuid f81d2428-9bde-4b1c-823c-86b349c99363 Generated By File Store`,
      },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version C`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version C`,
        data: `Test Collection B Value C`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value C`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with a new item to pull without files`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
            "2b5de2bf-22a4-493f-a8f3-c03437b08851": {
              version: `Test Collection B C Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `New "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling new "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/2b5de2bf-22a4-493f-a8f3-c03437b08851`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B C Version A`,
        data: `Test Collection B Value D`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
            "2b5de2bf-22a4-493f-a8f3-c03437b08851": {
              status: `upToDate`,
              version: `Test Collection B C Version A`,
              data: `Test Collection B Value D`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled new "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with a new item to pull with files`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
            "2b5de2bf-22a4-493f-a8f3-c03437b08851": {
              version: `Test Collection B C Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `New "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling new "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/2b5de2bf-22a4-493f-a8f3-c03437b08851`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B C Version A`,
        data: `Test Collection B Value E`,
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling file "dab5ac6d-0ecc-4af9-9022-dda2414bf8b6" of "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingFile`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingFile`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `pullFile`,
      method: `GET`,
      route: `Test Collection B Value E File A Route`,
      requestBody: { type: `empty` },
      queryParameters: {},
      fileUri: `Example File Path For Uuid dab5ac6d-0ecc-4af9-9022-dda2414bf8b6 Generated By File Store`,
      successfulStatusCodes: [`200`],
      failureStatusCodes: [`404`, `403`],
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled file "dab5ac6d-0ecc-4af9-9022-dda2414bf8b6" of "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling file "286b57fd-1551-4899-9f90-07e8727e4823" of "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingFile`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 1,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingFile`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 1,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `pullFile`,
      method: `GET`,
      route: `Test Collection B Value E File B Route`,
      requestBody: { type: `empty` },
      queryParameters: {},
      fileUri: `Example File Path For Uuid 286b57fd-1551-4899-9f90-07e8727e4823 Generated By File Store`,
      successfulStatusCodes: [`200`],
      failureStatusCodes: [`404`, `403`],
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled file "286b57fd-1551-4899-9f90-07e8727e4823" of "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851".`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
            "2b5de2bf-22a4-493f-a8f3-c03437b08851": {
              status: `upToDate`,
              version: `Test Collection B C Version A`,
              data: `Test Collection B Value E`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled new "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with an updated item to pull without new files`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version B`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pulled "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled again as versions do not match between preflight ("Test Collection B B Version B") and state store ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling updated "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version B`,
        data: `Test Collection B Value C`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version B`,
              data: `Test Collection B Value C`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with an updated item to pull with new files`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version B`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pulled "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled again as versions do not match between preflight ("Test Collection B B Version B") and state store ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling updated "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version B`,
        data: `Test Collection B Value F`,
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling file "40d92d2c-631f-4a42-ba5e-a70a82bea897" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingFile`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingFile`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullFile`,
      method: `GET`,
      route: `Test Collection B Value F File B Route`,
      requestBody: { type: `empty` },
      queryParameters: {},
      fileUri: `Example File Path For Uuid 40d92d2c-631f-4a42-ba5e-a70a82bea897 Generated By File Store`,
      successfulStatusCodes: [`200`],
      failureStatusCodes: [`404`, `403`],
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled file "40d92d2c-631f-4a42-ba5e-a70a82bea897" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling file "c2df927b-74be-4d78-8705-7f0a664ba53b" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingFile`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 1,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingFile`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 1,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullFile`,
      method: `GET`,
      route: `Test Collection B Value F File D Route`,
      requestBody: { type: `empty` },
      queryParameters: {},
      fileUri: `Example File Path For Uuid c2df927b-74be-4d78-8705-7f0a664ba53b Generated By File Store`,
      successfulStatusCodes: [`200`],
      failureStatusCodes: [`404`, `403`],
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled file "c2df927b-74be-4d78-8705-7f0a664ba53b" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version B`,
              data: `Test Collection B Value F`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with an updated item to pull with deleted files`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version B`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pulled "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled again as versions do not match between preflight ("Test Collection B B Version B") and state store ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling updated "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version B`,
        data: `Test Collection B Value G`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version B`,
              data: `Test Collection B Value G`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "f81d2428-9bde-4b1c-823c-86b349c99363"...`,
    },
    {
      type: `deleteFile`,
      uuid: `f81d2428-9bde-4b1c-823c-86b349c99363`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with multiple items changing in the same sync`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `absent`,
      },
    },
    collections: {
      testCollectionAKey: {
        // Updated.
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
        // Deleted.
        "6ebca435-755c-45ef-a11c-1bcdda74c222": {
          status: `upToDate`,
          version: `Test Collection A B Version A`,
          data: `Test Collection A Value C`,
        },
        // Deleted.
        "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7": {
          status: `upToDate`,
          version: `Test Collection A C Version A`,
          data: `Test Collection A Value D`,
        },
      },
      testCollectionBKey: {
        // No interaction.
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        // Pushed.
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPush`,
          data: `Test Collection B Value B`,
        },
        // Pulled.
        "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
          status: `upToDate`,
          version: `Test Collection B C Version A`,
          data: `Test Collection B Value I`,
        },
        // Deleted.
        "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3": {
          status: `upToDate`,
          version: `Test Collection B D Version A`,
          data: `Test Collection B Value J`,
        },
      },
      testCollectionCKey: {
        // Pushed.
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `awaitingPush`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [
      `52219b25-ac88-4440-bf31-a47df684bdd7`,
      `f81d2428-9bde-4b1c-823c-86b349c99363`,
    ],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "52219b25-ac88-4440-bf31-a47df684bdd7" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "ce05f13c-6a36-42ac-bed4-63bbf098eeb8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Change of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "6ebca435-755c-45ef-a11c-1bcdda74c222".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 4,
        completedFiles: null,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 4,
        completedFiles: null,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `absent`,
          },
        },
        collections: {
          testCollectionAKey: {
            // Updated.
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
            // Deleted.
            "6ebca435-755c-45ef-a11c-1bcdda74c222": {
              status: `upToDate`,
              version: `Test Collection A B Version A`,
              data: `Test Collection A Value C`,
            },
            // Deleted.
            "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7": {
              status: `upToDate`,
              version: `Test Collection A C Version A`,
              data: `Test Collection A Value D`,
            },
          },
          testCollectionBKey: {
            // No interaction.
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            // Pushed.
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
            // Pulled.
            "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
              status: `upToDate`,
              version: `Test Collection B C Version A`,
              data: `Test Collection B Value I`,
            },
            // Deleted.
            "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3": {
              status: `upToDate`,
              version: `Test Collection B D Version A`,
              data: `Test Collection B Value J`,
            },
          },
          testCollectionCKey: {
            // Pushed.
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `awaitingPush`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [
          `52219b25-ac88-4440-bf31-a47df684bdd7`,
          `f81d2428-9bde-4b1c-823c-86b349c99363`,
        ],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing file "52219b25-ac88-4440-bf31-a47df684bdd7" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 4,
        completedFiles: 0,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 4,
        completedFiles: 0,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `Test Collection B Value B File A Route`,
      requestBody: {
        type: `file`,
        fileUri: `Example File Path For Uuid 52219b25-ac88-4440-bf31-a47df684bdd7 Generated By File Store`,
      },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `403`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `absent`,
          },
        },
        collections: {
          testCollectionAKey: {
            // Updated.
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
            // Deleted.
            "6ebca435-755c-45ef-a11c-1bcdda74c222": {
              status: `upToDate`,
              version: `Test Collection A B Version A`,
              data: `Test Collection A Value C`,
            },
            // Deleted.
            "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7": {
              status: `upToDate`,
              version: `Test Collection A C Version A`,
              data: `Test Collection A Value D`,
            },
          },
          testCollectionBKey: {
            // No interaction.
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            // Pushed.
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
            // Pulled.
            "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
              status: `upToDate`,
              version: `Test Collection B C Version A`,
              data: `Test Collection B Value I`,
            },
            // Deleted.
            "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3": {
              status: `upToDate`,
              version: `Test Collection B D Version A`,
              data: `Test Collection B Value J`,
            },
          },
          testCollectionCKey: {
            // Pushed.
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `awaitingPush`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The API returned status code "403" during push of file "52219b25-ac88-4440-bf31-a47df684bdd7" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6", indicating that the user has lost access.  The local changes will temporarily remain locally, but will most likely be lost during the pull phase.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 2,
        totalSteps: 4,
        completedFiles: 1,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 2,
        totalSteps: 4,
        completedFiles: 1,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `Test Collection B Value B File B Route`,
      requestBody: {
        type: `file`,
        fileUri: `Example File Path For Uuid f81d2428-9bde-4b1c-823c-86b349c99363 Generated By File Store`,
      },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `absent`,
          },
        },
        collections: {
          testCollectionAKey: {
            // Updated.
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
            // Deleted.
            "6ebca435-755c-45ef-a11c-1bcdda74c222": {
              status: `upToDate`,
              version: `Test Collection A B Version A`,
              data: `Test Collection A Value C`,
            },
            // Deleted.
            "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7": {
              status: `upToDate`,
              version: `Test Collection A C Version A`,
              data: `Test Collection A Value D`,
            },
          },
          testCollectionBKey: {
            // No interaction.
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            // Pushed.
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
            // Pulled.
            "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
              status: `upToDate`,
              version: `Test Collection B C Version A`,
              data: `Test Collection B Value I`,
            },
            // Deleted.
            "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3": {
              status: `upToDate`,
              version: `Test Collection B D Version A`,
              data: `Test Collection B Value J`,
            },
          },
          testCollectionCKey: {
            // Pushed.
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `awaitingPush`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 3,
        totalSteps: 4,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionC,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 3,
        totalSteps: 4,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionC,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-c-key/c2bf5c63-85dc-4797-82db-6136081b1562`,
      requestBody: { type: `json`, value: `Test Collection C Value A` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `absent`,
          },
        },
        collections: {
          testCollectionAKey: {
            // Updated.
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
            // Deleted.
            "6ebca435-755c-45ef-a11c-1bcdda74c222": {
              status: `upToDate`,
              version: `Test Collection A B Version A`,
              data: `Test Collection A Value C`,
            },
            // Deleted.
            "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7": {
              status: `upToDate`,
              version: `Test Collection A C Version A`,
              data: `Test Collection A Value D`,
            },
          },
          testCollectionBKey: {
            // No interaction.
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            // Pushed.
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
            // Pulled.
            "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
              status: `upToDate`,
              version: `Test Collection B C Version A`,
              data: `Test Collection B Value I`,
            },
            // Deleted.
            "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3": {
              status: `upToDate`,
              version: `Test Collection B D Version A`,
              data: `Test Collection B Value J`,
            },
          },
          testCollectionCKey: {
            // Pushed.
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `awaitingPull`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version B`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            // Updated.
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version B`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            // No interaction.
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            // Pushed.
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version C`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
            // Pulled.
            "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
              version: `Test Collection B C Version B`,
              testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
            },
            // Added.
            "94576d22-2cbc-451e-9a92-3c50866da564": {
              version: `Test Collection B E Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B E Additional Item Value`,
            },
          },
          testCollectionCKey: {
            // Pushed.
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version B`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `New "testCollectionBKey" "94576d22-2cbc-451e-9a92-3c50866da564" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pulled "testCollectionBKey" "ce05f13c-6a36-42ac-bed4-63bbf098eeb8" will be pulled again as versions do not match between preflight ("Test Collection B C Version B") and state store ("Test Collection B C Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `New singleton "testSingletonCKey" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pushed "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" will be pulled.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pulled singleton "testSingletonAKey" will be pulled again as versions do not match between preflight ("Test Singleton A Version B") and state store ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pulled "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" will be pulled again as versions do not match between preflight ("Test Collection A A Version B") and state store ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling new "testCollectionBKey" "94576d22-2cbc-451e-9a92-3c50866da564"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 7,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B E Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B E Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 7,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B E Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B E Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/94576d22-2cbc-451e-9a92-3c50866da564`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B E Version A`,
        data: `Test Collection B Value K`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `absent`,
          },
        },
        collections: {
          testCollectionAKey: {
            // Updated.
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
            // Deleted.
            "6ebca435-755c-45ef-a11c-1bcdda74c222": {
              status: `upToDate`,
              version: `Test Collection A B Version A`,
              data: `Test Collection A Value C`,
            },
            // Deleted.
            "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7": {
              status: `upToDate`,
              version: `Test Collection A C Version A`,
              data: `Test Collection A Value D`,
            },
          },
          testCollectionBKey: {
            // No interaction.
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            // Pushed.
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
            // Pulled.
            "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
              status: `upToDate`,
              version: `Test Collection B C Version A`,
              data: `Test Collection B Value I`,
            },
            // Deleted.
            "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3": {
              status: `upToDate`,
              version: `Test Collection B D Version A`,
              data: `Test Collection B Value J`,
            },
            // Added.
            "94576d22-2cbc-451e-9a92-3c50866da564": {
              status: `upToDate`,
              version: `Test Collection B E Version A`,
              data: `Test Collection B Value K`,
            },
          },
          testCollectionCKey: {
            // Pushed.
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `awaitingPull`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled new "testCollectionBKey" "94576d22-2cbc-451e-9a92-3c50866da564".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 1,
        totalSteps: 7,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 1,
        totalSteps: 7,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version C`,
        data: `Test Collection B Value H`,
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling file "bdf19add-072c-4fd6-bca7-8468f8b80a76" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingFile`,
        completedSteps: 1,
        totalSteps: 7,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingFile`,
        completedSteps: 1,
        totalSteps: 7,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullFile`,
      method: `GET`,
      route: `Test Collection B Value H File B Route`,
      requestBody: { type: `empty` },
      queryParameters: {},
      fileUri: `Example File Path For Uuid bdf19add-072c-4fd6-bca7-8468f8b80a76 Generated By File Store`,
      successfulStatusCodes: [`200`],
      failureStatusCodes: [`404`, `403`],
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled file "bdf19add-072c-4fd6-bca7-8468f8b80a76" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `absent`,
          },
        },
        collections: {
          testCollectionAKey: {
            // Updated.
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
            // Deleted.
            "6ebca435-755c-45ef-a11c-1bcdda74c222": {
              status: `upToDate`,
              version: `Test Collection A B Version A`,
              data: `Test Collection A Value C`,
            },
            // Deleted.
            "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7": {
              status: `upToDate`,
              version: `Test Collection A C Version A`,
              data: `Test Collection A Value D`,
            },
          },
          testCollectionBKey: {
            // No interaction.
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            // Pushed.
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value H`,
            },
            // Pulled.
            "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
              status: `upToDate`,
              version: `Test Collection B C Version A`,
              data: `Test Collection B Value I`,
            },
            // Deleted.
            "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3": {
              status: `upToDate`,
              version: `Test Collection B D Version A`,
              data: `Test Collection B Value J`,
            },
            // Added.
            "94576d22-2cbc-451e-9a92-3c50866da564": {
              status: `upToDate`,
              version: `Test Collection B E Version A`,
              data: `Test Collection B Value K`,
            },
          },
          testCollectionCKey: {
            // Pushed.
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `awaitingPull`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling updated "testCollectionBKey" "ce05f13c-6a36-42ac-bed4-63bbf098eeb8"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 2,
        totalSteps: 7,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 2,
        totalSteps: 7,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/ce05f13c-6a36-42ac-bed4-63bbf098eeb8`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B C Version B`,
        data: `Test Collection B Value L`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `absent`,
          },
        },
        collections: {
          testCollectionAKey: {
            // Updated.
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
            // Deleted.
            "6ebca435-755c-45ef-a11c-1bcdda74c222": {
              status: `upToDate`,
              version: `Test Collection A B Version A`,
              data: `Test Collection A Value C`,
            },
            // Deleted.
            "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7": {
              status: `upToDate`,
              version: `Test Collection A C Version A`,
              data: `Test Collection A Value D`,
            },
          },
          testCollectionBKey: {
            // No interaction.
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            // Pushed.
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value H`,
            },
            // Pulled.
            "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
              status: `upToDate`,
              version: `Test Collection B C Version B`,
              data: `Test Collection B Value L`,
            },
            // Deleted.
            "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3": {
              status: `upToDate`,
              version: `Test Collection B D Version A`,
              data: `Test Collection B Value J`,
            },
            // Added.
            "94576d22-2cbc-451e-9a92-3c50866da564": {
              status: `upToDate`,
              version: `Test Collection B E Version A`,
              data: `Test Collection B Value K`,
            },
          },
          testCollectionCKey: {
            // Pushed.
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `awaitingPull`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionBKey" "ce05f13c-6a36-42ac-bed4-63bbf098eeb8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling singleton "testSingletonCKey"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 3,
        totalSteps: 7,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 3,
        totalSteps: 7,
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-singleton-c-key`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        version: `Test Singleton C Version A`,
        data: `Test Singleton C Value B`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value B`,
          },
        },
        collections: {
          testCollectionAKey: {
            // Updated.
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
            // Deleted.
            "6ebca435-755c-45ef-a11c-1bcdda74c222": {
              status: `upToDate`,
              version: `Test Collection A B Version A`,
              data: `Test Collection A Value C`,
            },
            // Deleted.
            "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7": {
              status: `upToDate`,
              version: `Test Collection A C Version A`,
              data: `Test Collection A Value D`,
            },
          },
          testCollectionBKey: {
            // No interaction.
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            // Pushed.
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value H`,
            },
            // Pulled.
            "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
              status: `upToDate`,
              version: `Test Collection B C Version B`,
              data: `Test Collection B Value L`,
            },
            // Deleted.
            "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3": {
              status: `upToDate`,
              version: `Test Collection B D Version A`,
              data: `Test Collection B Value J`,
            },
            // Added.
            "94576d22-2cbc-451e-9a92-3c50866da564": {
              status: `upToDate`,
              version: `Test Collection B E Version A`,
              data: `Test Collection B Value K`,
            },
          },
          testCollectionCKey: {
            // Pushed.
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `awaitingPull`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled new singleton "testSingletonCKey".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling previously pushed "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 4,
        totalSteps: 7,
        syncConfigurationCollection: syncConfigurationCollectionC,
        preflightResponseCollectionItem: {
          version: `Test Collection C A Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 4,
        totalSteps: 7,
        syncConfigurationCollection: syncConfigurationCollectionC,
        preflightResponseCollectionItem: {
          version: `Test Collection C A Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-c-key/c2bf5c63-85dc-4797-82db-6136081b1562`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection C A Version B`,
        data: `Test Collection C Value B`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value B`,
          },
        },
        collections: {
          testCollectionAKey: {
            // Updated.
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
            // Deleted.
            "6ebca435-755c-45ef-a11c-1bcdda74c222": {
              status: `upToDate`,
              version: `Test Collection A B Version A`,
              data: `Test Collection A Value C`,
            },
            // Deleted.
            "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7": {
              status: `upToDate`,
              version: `Test Collection A C Version A`,
              data: `Test Collection A Value D`,
            },
          },
          testCollectionBKey: {
            // No interaction.
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            // Pushed.
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value H`,
            },
            // Pulled.
            "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
              status: `upToDate`,
              version: `Test Collection B C Version B`,
              data: `Test Collection B Value L`,
            },
            // Deleted.
            "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3": {
              status: `upToDate`,
              version: `Test Collection B D Version A`,
              data: `Test Collection B Value J`,
            },
            // Added.
            "94576d22-2cbc-451e-9a92-3c50866da564": {
              status: `upToDate`,
              version: `Test Collection B E Version A`,
              data: `Test Collection B Value K`,
            },
          },
          testCollectionCKey: {
            // Pushed.
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version B`,
              data: `Test Collection C Value B`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },

    {
      type: `log`,
      severity: `information`,
      text: `Pulling singleton "testSingletonAKey"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 5,
        totalSteps: 7,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 5,
        totalSteps: 7,
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-singleton-a-key`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        version: `Test Singleton A Version B`,
        data: `Test Singleton A Value B`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version B`,
            value: `Test Singleton A Value B`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value B`,
          },
        },
        collections: {
          testCollectionAKey: {
            // Updated.
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
            // Deleted.
            "6ebca435-755c-45ef-a11c-1bcdda74c222": {
              status: `upToDate`,
              version: `Test Collection A B Version A`,
              data: `Test Collection A Value C`,
            },
            // Deleted.
            "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7": {
              status: `upToDate`,
              version: `Test Collection A C Version A`,
              data: `Test Collection A Value D`,
            },
          },
          testCollectionBKey: {
            // No interaction.
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            // Pushed.
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value H`,
            },
            // Pulled.
            "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
              status: `upToDate`,
              version: `Test Collection B C Version B`,
              data: `Test Collection B Value L`,
            },
            // Deleted.
            "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3": {
              status: `upToDate`,
              version: `Test Collection B D Version A`,
              data: `Test Collection B Value J`,
            },
            // Added.
            "94576d22-2cbc-451e-9a92-3c50866da564": {
              status: `upToDate`,
              version: `Test Collection B E Version A`,
              data: `Test Collection B Value K`,
            },
          },
          testCollectionCKey: {
            // Pushed.
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version B`,
              data: `Test Collection C Value B`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of singleton "testSingletonAKey".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling updated "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 6,
        totalSteps: 7,
        syncConfigurationCollection: syncConfigurationCollectionA,
        preflightResponseCollectionItem: {
          version: `Test Collection A A Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 6,
        totalSteps: 7,
        syncConfigurationCollection: syncConfigurationCollectionA,
        preflightResponseCollectionItem: {
          version: `Test Collection A A Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-a-key/499b4447-2f9a-49a7-b636-909ace319cd8`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection A A Version B`,
        data: `Test Collection A Value B`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version B`,
            value: `Test Singleton A Value B`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value B`,
          },
        },
        collections: {
          testCollectionAKey: {
            // Updated.
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version B`,
              data: `Test Collection A Value B`,
            },
            // Deleted.
            "6ebca435-755c-45ef-a11c-1bcdda74c222": {
              status: `upToDate`,
              version: `Test Collection A B Version A`,
              data: `Test Collection A Value C`,
            },
            // Deleted.
            "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7": {
              status: `upToDate`,
              version: `Test Collection A C Version A`,
              data: `Test Collection A Value D`,
            },
          },
          testCollectionBKey: {
            // No interaction.
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            // Pushed.
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value H`,
            },
            // Pulled.
            "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
              status: `upToDate`,
              version: `Test Collection B C Version B`,
              data: `Test Collection B Value L`,
            },
            // Deleted.
            "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3": {
              status: `upToDate`,
              version: `Test Collection B D Version A`,
              data: `Test Collection B Value J`,
            },
            // Added.
            "94576d22-2cbc-451e-9a92-3c50866da564": {
              status: `upToDate`,
              version: `Test Collection B E Version A`,
              data: `Test Collection B Value K`,
            },
          },
          testCollectionCKey: {
            // Pushed.
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version B`,
              data: `Test Collection C Value B`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting "testCollectionAKey" "6ebca435-755c-45ef-a11c-1bcdda74c222"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting "testCollectionAKey" "e999e8d7-9e9c-42f9-a36a-9fe3a2464fe7"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting "testCollectionBKey" "4c91279d-d35f-4063-afa2-a0c0ec0dcfd3"...`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version B`,
            value: `Test Singleton A Value B`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value B`,
          },
        },
        collections: {
          testCollectionAKey: {
            // Updated.
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version B`,
              data: `Test Collection A Value B`,
            },
          },
          testCollectionBKey: {
            // No interaction.
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            // Pushed.
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value H`,
            },
            // Pulled.
            "ce05f13c-6a36-42ac-bed4-63bbf098eeb8": {
              status: `upToDate`,
              version: `Test Collection B C Version B`,
              data: `Test Collection B Value L`,
            },
            // Added.
            "94576d22-2cbc-451e-9a92-3c50866da564": {
              status: `upToDate`,
              version: `Test Collection B E Version A`,
              data: `Test Collection B Value K`,
            },
          },
          testCollectionCKey: {
            // Pushed.
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version B`,
              data: `Test Collection C Value B`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deletions applied.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2"...`,
    },
    {
      type: `deleteFile`,
      uuid: `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "52219b25-ac88-4440-bf31-a47df684bdd7"...`,
    },
    {
      type: `deleteFile`,
      uuid: `52219b25-ac88-4440-bf31-a47df684bdd7`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `with a new item to pull but the state store changes during the update`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
            "1901a3dc-980a-4c33-b8bd-ae854e3d7389": {
              version: `Test Collection B C Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `New "testCollectionBKey" "1901a3dc-980a-4c33-b8bd-ae854e3d7389" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling new "testCollectionBKey" "1901a3dc-980a-4c33-b8bd-ae854e3d7389"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/1901a3dc-980a-4c33-b8bd-ae854e3d7389`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B C Version B`,
        data: `Test Collection B Value F`,
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The version of "testCollectionBKey" "1901a3dc-980a-4c33-b8bd-ae854e3d7389" changed from "Test Collection B C Version A" at the time of preflight to "Test Collection B C Version B" at the time of pull; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `with an updated item to pull but the state store changes during the update`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version B`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pulled "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled again as versions do not match between preflight ("Test Collection B B Version B") and state store ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling updated "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version C`,
        data: `Test Collection B Value F`,
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The version of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" changed from "Test Collection B B Version B" at the time of preflight to "Test Collection B B Version C" at the time of pull; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `awaiting push fails due to unexpected state change`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPush`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed during push of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `awaiting push file fails due to unexpected state change`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPush`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 2,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 2,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `Test Collection B Value B File B Route`,
      requestBody: {
        type: `file`,
        fileUri: `Example File Path For Uuid f81d2428-9bde-4b1c-823c-86b349c99363 Generated By File Store`,
      },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed during push of file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `pushing fails due to unexpected state change`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `pushing`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted push of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another attempt will be made.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed during push of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `pushing file fails due to unexpected state change`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `pushing`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted push of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another attempt will be made.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 2,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 2,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `Test Collection B Value B File B Route`,
      requestBody: {
        type: `file`,
        fileUri: `Example File Path For Uuid f81d2428-9bde-4b1c-823c-86b349c99363 Generated By File Store`,
      },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed during push of file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `awaiting pull file fails due to unexpected state change`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPull`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted sync of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another pull attempt will be made following the push phase.`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `File(s) for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" were not pushed during the previous interrupted sync.  They will be pushed as part of this sync.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `Test Collection B Value B File B Route`,
      requestBody: {
        type: `file`,
        fileUri: `Example File Path For Uuid f81d2428-9bde-4b1c-823c-86b349c99363 Generated By File Store`,
      },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed during push of file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `files can be deleted`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [
      `Example Deletion Route A`,
      `Example Deletion Route B`,
      `Example Deletion Route C`,
    ],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting file "Example Deletion Route A"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `deleting`, completedSteps: 0, totalSteps: 3 },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `deleting`, completedSteps: 0, totalSteps: 3 },
    },
    {
      type: `push`,
      method: `DELETE`,
      route: `Example Deletion Route A`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [
          `Example Deletion Route B`,
          `Example Deletion Route C`,
        ],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully deleted file "Example Deletion Route A".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting file "Example Deletion Route B"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `deleting`, completedSteps: 1, totalSteps: 3 },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `deleting`, completedSteps: 1, totalSteps: 3 },
    },
    {
      type: `push`,
      method: `DELETE`,
      route: `Example Deletion Route B`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [`Example Deletion Route C`],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully deleted file "Example Deletion Route B".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting file "Example Deletion Route C"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `deleting`, completedSteps: 2, totalSteps: 3 },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `deleting`, completedSteps: 2, totalSteps: 3 },
    },
    {
      type: `push`,
      method: `DELETE`,
      route: `Example Deletion Route C`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully deleted file "Example Deletion Route C".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `state store changes during file deletion`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [
      `Example Deletion Route A`,
      `Example Deletion Route B`,
      `Example Deletion Route C`,
    ],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting file "Example Deletion Route A"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `deleting`, completedSteps: 0, totalSteps: 3 },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `deleting`, completedSteps: 0, totalSteps: 3 },
    },
    {
      type: `push`,
      method: `DELETE`,
      route: `Example Deletion Route A`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [
          `Example Deletion Route B`,
          `Example Deletion Route C`,
        ],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully deleted file "Example Deletion Route A".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting file "Example Deletion Route B"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `deleting`, completedSteps: 1, totalSteps: 3 },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `deleting`, completedSteps: 1, totalSteps: 3 },
    },
    {
      type: `push`,
      method: `DELETE`,
      route: `Example Deletion Route B`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed during deletion of file "Example Deletion Route B"; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `state store changes during pull of new`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
            "2b5de2bf-22a4-493f-a8f3-c03437b08851": {
              version: `Test Collection B C Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `New "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling new "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/2b5de2bf-22a4-493f-a8f3-c03437b08851`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B C Version A`,
        data: `Test Collection B Value D`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed during pull of "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851"; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `state store changes during pull of updated`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version B`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pulled "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled again as versions do not match between preflight ("Test Collection B B Version B") and state store ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling updated "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version B`,
        data: `Test Collection B Value C`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed during pull of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `state store changes during pull of awaiting push`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPush`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version C`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version C`,
        data: `Test Collection B Value C`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed during pull of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `state store changes during pull of pushing`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `pushing`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted push of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another attempt will be made.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version C`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version C`,
        data: `Test Collection B Value C`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed during pull of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `state store changes during pull of awaiting pull`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPull`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted sync of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another pull attempt will be made following the push phase.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version C`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version C`,
        data: `Test Collection B Value C`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed during pull of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `state store changes during deletion application for up to date`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed before deletions could be applied; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `state store changes during deletion application for pushing`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `pushing`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted push of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another attempt will be made.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed before deletions could be applied; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `state store changes during deletion application for awaiting push`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPush`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed before deletions could be applied; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `state store changes during deletion application for awaiting pull`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPull`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted sync of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another pull attempt will be made following the push phase.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    { type: `getState`, changedExternally: true },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed before deletions could be applied; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

test(`throws an error when already running`, async () => {
  const stateStore: StateStoreInterface<SyncableState<TestSchema>> = {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    load: jest.fn(),
    get: jest.fn().mockReturnValue({
      collections: {
        testCollectionAKey: {},
        testCollectionBKey: {},
        testCollectionCKey: {},
      },
      addedFileUuids: [],
      deletedFileRoutes: [],
    }),
    set: jest.fn(),
    unload: jest.fn(),
  };

  const request: RequestInterface = {
    withoutResponse: jest.fn(),
    returningJson: jest.fn().mockReturnValue(
      new Promise<void>(() => {
        // Empty.
      })
    ),
    returningFile: jest.fn(),
  };

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn(),
  };

  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    generatePath: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    unload: jest.fn(),
    import: jest.fn(),
  };

  const abortSignal = new AbortController().signal;

  const sync = new Sync<
    TestSchema,
    TestAdditionalCollectionData,
    TestAdditionalCollectionItemData
  >(
    stateStore,
    request,
    logger,
    {
      order: [
        {
          type: `collection`,
          key: `testCollectionBKey`,
        },
        {
          type: `singleton`,
          key: `testSingletonCKey`,
        },
        {
          type: `singleton`,
          key: `testSingletonBKey`,
        },
        {
          type: `collection`,
          key: `testCollectionCKey`,
        },
        {
          type: `singleton`,
          key: `testSingletonAKey`,
        },
        {
          type: `collection`,
          key: `testCollectionAKey`,
        },
      ],
      collections: {
        testCollectionAKey: syncConfigurationCollectionA,
        testCollectionBKey: syncConfigurationCollectionB,
        testCollectionCKey: syncConfigurationCollectionC,
      },
    },
    fileStore
  );

  const eventHandlerA = jest.fn();
  sync.addListener(`stateChange`, eventHandlerA);

  const eventHandlerB = jest.fn();
  sync.addListener(`stateChange`, eventHandlerB);

  const eventHandlerC = jest.fn();
  sync.addListener(`stateChange`, eventHandlerC);

  sync.removeListener(`stateChange`, eventHandlerB);

  sync.run(abortSignal);

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100);
  });

  await expect(sync.run(new AbortController().signal)).rejects.toEqual(
    new Error(`Sync is already running.`)
  );

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100);
  });

  expect(eventHandlerA).toBeCalledTimes(2);
  expect(eventHandlerB).not.toHaveBeenCalled();
  expect(eventHandlerC).toBeCalledTimes(2);
  expect(stateStore.addListener).not.toHaveBeenCalled();
  expect(stateStore.removeListener).not.toHaveBeenCalled();
  expect(stateStore.load).not.toHaveBeenCalled();
  expect(stateStore.get).toBeCalledTimes(1);
  expect(stateStore.set).not.toHaveBeenCalled();
  expect(stateStore.unload).not.toHaveBeenCalled();
  expect(request.withoutResponse).not.toHaveBeenCalled();
  expect(request.returningJson).toBeCalledTimes(1);
  expect(request.returningFile).not.toHaveBeenCalled();
  expect(logger.error).not.toHaveBeenCalled();
  expect(logger.warning).not.toHaveBeenCalled();
  expect(logger.information).toBeCalledTimes(1);
  expect(logger.debug).toBeCalledTimes(6);
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.list).toBeCalledTimes(1);
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(fileStore.import).not.toHaveBeenCalled();
});

test(`can run multiple times`, async () => {
  const stateStore: StateStoreInterface<SyncableState<TestSchema>> = {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    load: jest.fn(),
    get: jest.fn().mockReturnValue({
      singletons: {
        testSingletonAKey: {
          type: `upToDate`,
          version: `Test Singleton A Version A`,
          value: `Test Singleton A Value A`,
        },
        testSingletonBKey: {
          type: `upToDate`,
          version: `Test Singleton B Version A`,
          value: `Test Singleton B Value A`,
        },
        testSingletonCKey: {
          type: `upToDate`,
          version: `Test Singleton C Version A`,
          value: `Test Singleton C Value A`,
        },
      },
      collections: {
        testCollectionAKey: {},
        testCollectionBKey: {},
        testCollectionCKey: {},
      },
      addedFileUuids: [],
      deletedFileRoutes: [],
    }),
    set: jest.fn(),
    unload: jest.fn(),
  };

  const request: RequestInterface = {
    withoutResponse: jest.fn(),
    returningJson: jest.fn().mockResolvedValue({
      statusCode: `200`,
      value: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {},
          testCollectionBKey: {},
          testCollectionCKey: {},
        },
      },
    }),
    returningFile: jest.fn(),
  };

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn(),
  };

  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    generatePath: jest.fn(),
    delete: jest.fn(),
    list: jest.fn().mockResolvedValue([]),
    unload: jest.fn(),
    import: jest.fn(),
  };

  const abortSignal = new AbortController().signal;

  const sync = new Sync<
    TestSchema,
    TestAdditionalCollectionData,
    TestAdditionalCollectionItemData
  >(
    stateStore,
    request,
    logger,
    {
      order: [
        {
          type: `collection`,
          key: `testCollectionBKey`,
        },
        {
          type: `singleton`,
          key: `testSingletonCKey`,
        },
        {
          type: `singleton`,
          key: `testSingletonBKey`,
        },
        {
          type: `collection`,
          key: `testCollectionCKey`,
        },
        {
          type: `singleton`,
          key: `testSingletonAKey`,
        },
        {
          type: `collection`,
          key: `testCollectionAKey`,
        },
      ],
      collections: {
        testCollectionAKey: syncConfigurationCollectionA,
        testCollectionBKey: syncConfigurationCollectionB,
        testCollectionCKey: syncConfigurationCollectionC,
      },
    },
    fileStore
  );

  const eventHandlerA = jest.fn();
  sync.addListener(`stateChange`, eventHandlerA);

  const eventHandlerB = jest.fn();
  sync.addListener(`stateChange`, eventHandlerB);

  const eventHandlerC = jest.fn();
  sync.addListener(`stateChange`, eventHandlerC);

  sync.removeListener(`stateChange`, eventHandlerB);

  await sync.run(abortSignal);

  await sync.run(abortSignal);

  expect(eventHandlerA).toBeCalledTimes(6);
  expect(eventHandlerB).not.toHaveBeenCalled();
  expect(eventHandlerC).toBeCalledTimes(6);
  expect(stateStore.addListener).not.toHaveBeenCalled();
  expect(stateStore.removeListener).not.toHaveBeenCalled();
  expect(stateStore.load).not.toHaveBeenCalled();
  expect(stateStore.get).toBeCalledTimes(2);
  expect(stateStore.set).not.toHaveBeenCalled();
  expect(stateStore.unload).not.toHaveBeenCalled();
  expect(request.withoutResponse).not.toHaveBeenCalled();
  expect(request.returningJson).toBeCalledTimes(2);
  expect(request.returningFile).not.toHaveBeenCalled();
  expect(logger.error).not.toHaveBeenCalled();
  expect(logger.warning).not.toHaveBeenCalled();
  expect(logger.information).toBeCalledTimes(4);
  expect(logger.debug).toBeCalledTimes(46);
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.list).toBeCalledTimes(2);
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(fileStore.import).not.toHaveBeenCalled();
});

scenario(
  `deleted following push`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPush`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deletions applied.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "f81d2428-9bde-4b1c-823c-86b349c99363"...`,
    },
    {
      type: `deleteFile`,
      uuid: `f81d2428-9bde-4b1c-823c-86b349c99363`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "52219b25-ac88-4440-bf31-a47df684bdd7"...`,
    },
    {
      type: `deleteFile`,
      uuid: `52219b25-ac88-4440-bf31-a47df684bdd7`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `deleted following an interrupted push`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `pushing`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Evidence of previously interrupted push of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" found; another attempt will be made.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: null,
        totalFiles: 0,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deletions applied.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "f81d2428-9bde-4b1c-823c-86b349c99363"...`,
    },
    {
      type: `deleteFile`,
      uuid: `f81d2428-9bde-4b1c-823c-86b349c99363`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "52219b25-ac88-4440-bf31-a47df684bdd7"...`,
    },
    {
      type: `deleteFile`,
      uuid: `52219b25-ac88-4440-bf31-a47df684bdd7`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `deleted without changes`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deletions applied.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "f81d2428-9bde-4b1c-823c-86b349c99363"...`,
    },
    {
      type: `deleteFile`,
      uuid: `f81d2428-9bde-4b1c-823c-86b349c99363`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "52219b25-ac88-4440-bf31-a47df684bdd7"...`,
    },
    {
      type: `deleteFile`,
      uuid: `52219b25-ac88-4440-bf31-a47df684bdd7`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `files can be deleted`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [
      `Example Deletion Route A`,
      `Example Deletion Route B`,
      `Example Deletion Route C`,
    ],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting file "Example Deletion Route A"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `deleting`, completedSteps: 0, totalSteps: 3 },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `deleting`, completedSteps: 0, totalSteps: 3 },
    },
    {
      type: `push`,
      method: `DELETE`,
      route: `Example Deletion Route A`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [
          `Example Deletion Route B`,
          `Example Deletion Route C`,
        ],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully deleted file "Example Deletion Route A".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting file "Example Deletion Route B"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `deleting`, completedSteps: 1, totalSteps: 3 },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `deleting`, completedSteps: 1, totalSteps: 3 },
    },
    {
      type: `push`,
      method: `DELETE`,
      route: `Example Deletion Route B`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [`Example Deletion Route C`],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully deleted file "Example Deletion Route B".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting file "Example Deletion Route C"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `deleting`, completedSteps: 2, totalSteps: 3 },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `deleting`, completedSteps: 2, totalSteps: 3 },
    },
    {
      type: `push`,
      method: `DELETE`,
      route: `Example Deletion Route C`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully deleted file "Example Deletion Route C".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `file clean-up temporarily blocked`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `569213c5-0d73-4049-9136-6fba8617b78f`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `9f2d4d9a-5da7-411c-8c0b-726a66d29d7a`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
      nextFileCleanUpBlockers: 1,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `Files to clean up were found, but file clean-up has been temporarily blocked (it is likely that the user interface has added files to disk which are not yet referenced within the state store).`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; no changes were made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `noChangesMade`
);

scenario(
  `files requiring push but not existing`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `awaitingPush`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [
      `189d50bd-d3e3-4775-b147-c74a28070a34`,
      `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
      `9ce916b4-d745-446f-897c-b2e352afdcb4`,
    ],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store lists file UUID "189d50bd-d3e3-4775-b147-c74a28070a34" as requiring push, but no such file exists on disk.  It is most likely that the application closed before state could be written back to disk after successfully pushing a deleted record, but this may indicate the presence of a bug.`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store lists file UUID "9ce916b4-d745-446f-897c-b2e352afdcb4" as requiring push, but no such file exists on disk.  It is most likely that the application closed before state could be written back to disk after successfully pushing a deleted record, but this may indicate the presence of a bug.`,
    },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `awaitingPush`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [`a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Change of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" will be pushed.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2" of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" will be pushed.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionA,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionA,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-a-key/499b4447-2f9a-49a7-b636-909ace319cd8`,
      requestBody: { type: `json`, value: `Test Collection A Value A` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `awaitingPull`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [`a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing file "a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2" of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 2,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionA,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 2,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionA,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `Test Collection A Value A File A Route`,
      requestBody: {
        type: `file`,
        fileUri: `Example File Path For Uuid a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2 Generated By File Store`,
      },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `awaitingPull`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed file "a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2" of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version B`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pushed "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" will be pulled.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling previously pushed "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionA,
        preflightResponseCollectionItem: {
          version: `Test Collection A A Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionA,
        preflightResponseCollectionItem: {
          version: `Test Collection A A Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-a-key/499b4447-2f9a-49a7-b636-909ace319cd8`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection A A Version B`,
        data: `Test Collection A Value E`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version B`,
              data: `Test Collection A Value E`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `handles a non-200 pull`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
            "1901a3dc-980a-4c33-b8bd-ae854e3d7389": {
              version: `Test Collection B C Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `New "testCollectionBKey" "1901a3dc-980a-4c33-b8bd-ae854e3d7389" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling new "testCollectionBKey" "1901a3dc-980a-4c33-b8bd-ae854e3d7389"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/1901a3dc-980a-4c33-b8bd-ae854e3d7389`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {},
      statusCode: `403`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The API returned status code "403" during the pull of "testCollectionBKey" "1901a3dc-980a-4c33-b8bd-ae854e3d7389", indicating that the user has lost access since the time of preflight; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `handles a non-200 update`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version B`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pulled "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled again as versions do not match between preflight ("Test Collection B B Version B") and state store ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling updated "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {},
      statusCode: `403`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The API returned status code "403" during the pull of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6", indicating that the user has lost access since the time of preflight; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `handles a non-200 file pull in a new item`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
            "2b5de2bf-22a4-493f-a8f3-c03437b08851": {
              version: `Test Collection B C Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `New "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling new "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/2b5de2bf-22a4-493f-a8f3-c03437b08851`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B C Version A`,
        data: `Test Collection B Value E`,
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling file "dab5ac6d-0ecc-4af9-9022-dda2414bf8b6" of "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingFile`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingFile`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B C Version A`,
          testAdditionalCollectionDataItemKey: `Test Collection B C Additional Item Value`,
        },
      },
    },
    {
      type: `pullFile`,
      method: `GET`,
      route: `Test Collection B Value E File A Route`,
      requestBody: { type: `empty` },
      queryParameters: {},
      fileUri: `Example File Path For Uuid dab5ac6d-0ecc-4af9-9022-dda2414bf8b6 Generated By File Store`,
      successfulStatusCodes: [`200`],
      failureStatusCodes: [`404`, `403`],
      statusCode: `403`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The API returned status code "403" during the pull of file "dab5ac6d-0ecc-4af9-9022-dda2414bf8b6" of "testCollectionBKey" "2b5de2bf-22a4-493f-a8f3-c03437b08851", indicating that the user has lost access since the time of preflight; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `handles a non-200 file pull for an existing item`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version B`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pulled "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled again as versions do not match between preflight ("Test Collection B B Version B") and state store ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling updated "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version B`,
        data: `Test Collection B Value F`,
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling file "40d92d2c-631f-4a42-ba5e-a70a82bea897" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingFile`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingFile`,
        completedSteps: 0,
        totalSteps: 1,
        completedFiles: 0,
        totalFiles: 2,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version B`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullFile`,
      method: `GET`,
      route: `Test Collection B Value F File B Route`,
      requestBody: { type: `empty` },
      queryParameters: {},
      fileUri: `Example File Path For Uuid 40d92d2c-631f-4a42-ba5e-a70a82bea897 Generated By File Store`,
      successfulStatusCodes: [`200`],
      failureStatusCodes: [`404`, `403`],
      statusCode: `403`,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The API returned status code "403" during the pull of file "40d92d2c-631f-4a42-ba5e-a70a82bea897" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6", indicating that the user has lost access since the time of preflight; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `handles a non-200 push`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPush`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `403`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The API returned status code "403" during push of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6", indicating that the user has lost access.  The local changes have been lost.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "f81d2428-9bde-4b1c-823c-86b349c99363"...`,
    },
    {
      type: `deleteFile`,
      uuid: `f81d2428-9bde-4b1c-823c-86b349c99363`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting unreferenced existing file "52219b25-ac88-4440-bf31-a47df684bdd7"...`,
    },
    {
      type: `deleteFile`,
      uuid: `52219b25-ac88-4440-bf31-a47df684bdd7`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `handles a non-200 file push`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `awaitingPush`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `File "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pushed.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 0,
        totalSteps: 2,
        completedFiles: null,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `json`, value: `Test Collection B Value B` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [`f81d2428-9bde-4b1c-823c-86b349c99363`],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pushed change of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pushing file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 2,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pushing`,
        completedSteps: 1,
        totalSteps: 2,
        completedFiles: 0,
        totalFiles: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
      },
    },
    {
      type: `push`,
      method: `PUT`,
      route: `Test Collection B Value B File B Route`,
      requestBody: {
        type: `file`,
        fileUri: `Example File Path For Uuid f81d2428-9bde-4b1c-823c-86b349c99363 Generated By File Store`,
      },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `403`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `awaitingPull`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The API returned status code "403" during push of file "f81d2428-9bde-4b1c-823c-86b349c99363" of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6", indicating that the user has lost access.  The local changes will temporarily remain locally, but will most likely be lost during the pull phase.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version C`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling previously pushed "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingCollectionItem`,
        completedSteps: 0,
        totalSteps: 1,
        syncConfigurationCollection: syncConfigurationCollectionB,
        preflightResponseCollectionItem: {
          version: `Test Collection B B Version C`,
          testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
        },
      },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/test-collection-b-key/8dde71a5-6106-4ebb-b2da-7c7d129a1ba6`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      response: {
        version: `Test Collection B B Version C`,
        data: `Test Collection B Value C`,
      },
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version C`,
              data: `Test Collection B Value C`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `handles a non-200 file deletion`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [
      `Example Deletion Route A`,
      `Example Deletion Route B`,
      `Example Deletion Route C`,
    ],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting file "Example Deletion Route A"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `deleting`, completedSteps: 0, totalSteps: 3 },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `deleting`, completedSteps: 0, totalSteps: 3 },
    },
    {
      type: `push`,
      method: `DELETE`,
      route: `Example Deletion Route A`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [
          `Example Deletion Route B`,
          `Example Deletion Route C`,
        ],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully deleted file "Example Deletion Route A".`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting file "Example Deletion Route B"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `deleting`, completedSteps: 1, totalSteps: 3 },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `deleting`, completedSteps: 1, totalSteps: 3 },
    },
    {
      type: `push`,
      method: `DELETE`,
      route: `Example Deletion Route B`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `403`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [`Example Deletion Route C`],
      },
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The API returned status code "403" during deletion of file "Example Deletion Route B", indicating that the user has lost access.  Another attempt will not be made.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Deleting file "Example Deletion Route C"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `deleting`, completedSteps: 2, totalSteps: 3 },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `deleting`, completedSteps: 2, totalSteps: 3 },
    },
    {
      type: `push`,
      method: `DELETE`,
      route: `Example Deletion Route C`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`, `404`, `403`],
      statusCode: `200`,
    },
    { type: `getState`, changedExternally: false },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully deleted file "Example Deletion Route C".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonBKey" as preflight and state store versions match ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `singleton pulled as new`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `absent`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `New singleton "testSingletonBKey" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling singleton "testSingletonBKey"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 0,
        totalSteps: 1,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 0,
        totalSteps: 1,
      },
    },
    {
      type: `pullJson`,
      route: `sync/test-singleton-b-key`,
      expectedStatusCodes: [`200`],
      method: `GET`,
      requestBody: { type: `empty` },
      queryParameters: {},
      statusCode: `200`,
      response: {
        version: `Test Singleton B Version A`,
        data: `Test Singleton B Value A`,
      },
    },
    {
      type: `getState`,
      changedExternally: false,
    },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version A`,
            value: `Test Singleton B Value A`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled new singleton "testSingletonBKey".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `singleton pulled as new state store change`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `absent`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `New singleton "testSingletonBKey" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling singleton "testSingletonBKey"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 0,
        totalSteps: 1,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 0,
        totalSteps: 1,
      },
    },
    {
      type: `pullJson`,
      route: `sync/test-singleton-b-key`,
      expectedStatusCodes: [`200`],
      method: `GET`,
      requestBody: { type: `empty` },
      queryParameters: {},
      statusCode: `200`,
      response: {
        version: `Test Singleton B Version A`,
        data: `Test Singleton B Value A`,
      },
    },
    {
      type: `getState`,
      changedExternally: true,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed during pull of singleton "testSingletonBKey"; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `singleton pulled as new version mismatch`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `absent`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version A`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `New singleton "testSingletonBKey" will be pulled.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling singleton "testSingletonBKey"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 0,
        totalSteps: 1,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 0,
        totalSteps: 1,
      },
    },
    {
      type: `pullJson`,
      route: `sync/test-singleton-b-key`,
      expectedStatusCodes: [`200`],
      method: `GET`,
      requestBody: { type: `empty` },
      queryParameters: {},
      statusCode: `200`,
      response: {
        version: `Test Singleton B Version B`,
        data: `Test Singleton B Value A`,
      },
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The version of singleton "testSingletonBKey" changed from "Test Singleton B Version A" at the time of preflight to "Test Singleton B Version B" at the time of pull; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `singleton pulled as updated`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version B`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pulled singleton "testSingletonBKey" will be pulled again as versions do not match between preflight ("Test Singleton B Version B") and state store ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling singleton "testSingletonBKey"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 0,
        totalSteps: 1,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 0,
        totalSteps: 1,
      },
    },
    {
      type: `pullJson`,
      route: `sync/test-singleton-b-key`,
      expectedStatusCodes: [`200`],
      method: `GET`,
      requestBody: { type: `empty` },
      queryParameters: {},
      statusCode: `200`,
      response: {
        version: `Test Singleton B Version B`,
        data: `Test Singleton B Value B`,
      },
    },
    {
      type: `getState`,
      changedExternally: false,
    },
    {
      type: `setState`,
      to: {
        singletons: {
          testSingletonAKey: {
            type: `upToDate`,
            version: `Test Singleton A Version A`,
            value: `Test Singleton A Value A`,
          },
          testSingletonBKey: {
            type: `upToDate`,
            version: `Test Singleton B Version B`,
            value: `Test Singleton B Value B`,
          },
          testSingletonCKey: {
            type: `upToDate`,
            version: `Test Singleton C Version A`,
            value: `Test Singleton C Value A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              status: `upToDate`,
              version: `Test Collection A A Version A`,
              data: `Test Collection A Value A`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              status: `upToDate`,
              version: `Test Collection B A Version A`,
              data: `Test Collection B Value A`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              status: `upToDate`,
              version: `Test Collection B B Version A`,
              data: `Test Collection B Value B`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              status: `upToDate`,
              version: `Test Collection C A Version A`,
              data: `Test Collection C Value A`,
            },
          },
        },
        addedFileUuids: [],
        deletedFileRoutes: [],
      },
    },
    {
      type: `log`,
      severity: `information`,
      text: `Successfully pulled update of singleton "testSingletonBKey".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to delete...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for items to delete from collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Nothing to delete.`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for files to clean up...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No files to clean up.`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Sync completed successfully; at least one change was made.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `atLeastOneChangeMade`
);

scenario(
  `singleton pulled as updated version mismatch`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version B`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pulled singleton "testSingletonBKey" will be pulled again as versions do not match between preflight ("Test Singleton B Version B") and state store ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling singleton "testSingletonBKey"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 0,
        totalSteps: 1,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 0,
        totalSteps: 1,
      },
    },
    {
      type: `pullJson`,
      route: `sync/test-singleton-b-key`,
      expectedStatusCodes: [`200`],
      method: `GET`,
      requestBody: { type: `empty` },
      queryParameters: {},
      statusCode: `200`,
      response: {
        version: `Test Singleton B Version C`,
        data: `Test Singleton B Value B`,
      },
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The version of singleton "testSingletonBKey" changed from "Test Singleton B Version B" at the time of preflight to "Test Singleton B Version C" at the time of pull; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);

scenario(
  `singleton pulled as updated`,
  {
    singletons: {
      testSingletonAKey: {
        type: `upToDate`,
        version: `Test Singleton A Version A`,
        value: `Test Singleton A Value A`,
      },
      testSingletonBKey: {
        type: `upToDate`,
        version: `Test Singleton B Version A`,
        value: `Test Singleton B Value A`,
      },
      testSingletonCKey: {
        type: `upToDate`,
        version: `Test Singleton C Version A`,
        value: `Test Singleton C Value A`,
      },
    },
    collections: {
      testCollectionAKey: {
        "499b4447-2f9a-49a7-b636-909ace319cd8": {
          status: `upToDate`,
          version: `Test Collection A A Version A`,
          data: `Test Collection A Value A`,
        },
      },
      testCollectionBKey: {
        "47fe4216-a7db-43e0-8039-fced83de97cc": {
          status: `upToDate`,
          version: `Test Collection B A Version A`,
          data: `Test Collection B Value A`,
        },
        "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
          status: `upToDate`,
          version: `Test Collection B B Version A`,
          data: `Test Collection B Value B`,
        },
      },
      testCollectionCKey: {
        "c2bf5c63-85dc-4797-82db-6136081b1562": {
          status: `upToDate`,
          version: `Test Collection C A Version A`,
          data: `Test Collection C Value A`,
        },
      },
    },
    addedFileUuids: [],
    deletedFileRoutes: [],
  },
  [
    {
      type: `log`,
      severity: `information`,
      text: `Sync is starting...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Listing existing files...`,
    },
    {
      type: `listFiles`,
      uuids: [
        `f81d2428-9bde-4b1c-823c-86b349c99363`,
        `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
        `52219b25-ac88-4440-bf31-a47df684bdd7`,
      ],
    },
    { type: `getState`, changedExternally: false },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPush` },
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to push in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No changes to push for "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8".`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Fetching preflight...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `checkingForChangesToPull` },
    },
    {
      type: `pullJson`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
        singletons: {
          testSingletonAKey: {
            version: `Test Singleton A Version A`,
          },
          testSingletonBKey: {
            version: `Test Singleton B Version B`,
          },
          testSingletonCKey: {
            version: `Test Singleton C Version A`,
          },
        },
        collections: {
          testCollectionAKey: {
            "499b4447-2f9a-49a7-b636-909ace319cd8": {
              version: `Test Collection A A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection A A Additional Item Value`,
            },
          },
          testCollectionBKey: {
            "47fe4216-a7db-43e0-8039-fced83de97cc": {
              version: `Test Collection B A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B A Additional Item Value`,
            },
            "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6": {
              version: `Test Collection B B Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection B B Additional Item Value`,
            },
          },
          testCollectionCKey: {
            "c2bf5c63-85dc-4797-82db-6136081b1562": {
              version: `Test Collection C A Version A`,
              testAdditionalCollectionDataItemKey: `Test Collection C A Additional Item Value`,
            },
          },
        },
      },
      statusCode: `200`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for changes to pull...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionBKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "47fe4216-a7db-43e0-8039-fced83de97cc" as preflight and state store versions match ("Test Collection B A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionBKey" "8dde71a5-6106-4ebb-b2da-7c7d129a1ba6" as preflight and state store versions match ("Test Collection B B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonCKey" as preflight and state store versions match ("Test Singleton C Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Previously pulled singleton "testSingletonBKey" will be pulled again as versions do not match between preflight ("Test Singleton B Version B") and state store ("Test Singleton B Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionCKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionCKey" "c2bf5c63-85dc-4797-82db-6136081b1562" as preflight and state store versions match ("Test Collection C A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of singleton "testSingletonAKey" as preflight and state store versions match ("Test Singleton A Version A").`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for new items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `Searching for updated items to pull in collection "testCollectionAKey"...`,
    },
    {
      type: `log`,
      severity: `debug`,
      text: `No pull required of "testCollectionAKey" "499b4447-2f9a-49a7-b636-909ace319cd8" as preflight and state store versions match ("Test Collection A A Version A").`,
    },
    {
      type: `log`,
      severity: `information`,
      text: `Pulling singleton "testSingletonBKey"...`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 0,
        totalSteps: 1,
      },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: {
        type: `pullingSingleton`,
        completedSteps: 0,
        totalSteps: 1,
      },
    },
    {
      type: `pullJson`,
      route: `sync/test-singleton-b-key`,
      expectedStatusCodes: [`200`],
      method: `GET`,
      requestBody: { type: `empty` },
      queryParameters: {},
      statusCode: `200`,
      response: {
        version: `Test Singleton B Version B`,
        data: `Test Singleton B Value B`,
      },
    },
    {
      type: `getState`,
      changedExternally: true,
    },
    {
      type: `log`,
      severity: `warning`,
      text: `The state store changed during pull of singleton "testSingletonBKey"; sync has been interrupted and will need to run again.`,
    },
    {
      type: `stateChange`,
      eventHandler: `a`,
      to: { type: `notRunning` },
    },
    {
      type: `stateChange`,
      eventHandler: `c`,
      to: { type: `notRunning` },
    },
  ],
  `needsToRunAgain`
);
