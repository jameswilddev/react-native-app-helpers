import { Sync } from ".";
import type { RequestInterface } from "../../..";
import type { FileStoreInterface } from "../../..";
import type { FileRequestBody } from "../../..";
import type { QueryParameters } from "../../..";
import type { JsonRequestBody } from "../../..";
import type { EmptyRequestBody } from "../../..";
import type { StateStoreInterface } from "../../..";
import type { Json } from "../../..";
import type { LoggerInterface } from "../../types/LoggerInterface";
import type { SyncableState } from "../../types/SyncableState";
import type { SyncState } from "../../types/SyncState";

type CollectionAData =
  | `Test Collection A Value A`
  | `Test Collection A Value B`;

type CollectionBData =
  | `Test Collection B Value A`
  | `Test Collection B Value B`
  | `Test Collection B Value C`
  | `Test Collection B Value D`
  | `Test Collection B Value E`;

type CollectionCData =
  | `Test Collection C Value A`
  | `Test Collection C Value B`;

type TestSchema = {
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
};

type SetStateStep = {
  readonly type: `setState`;
  readonly to: SyncableState<TestSchema>;
};

type PullStep = {
  readonly type: `pull`;
  readonly method: string;
  readonly route: string;
  readonly requestBody: EmptyRequestBody | JsonRequestBody | FileRequestBody;
  readonly queryParameters: QueryParameters;
  readonly expectedStatusCodes: ReadonlyArray<string>;
  readonly response: Json;
};

type Step =
  | {
      readonly type: `getState`;
      readonly changedExternally: boolean;
    }
  | PushStep
  | SetStateStep
  | PullStep
  | {
      readonly type: `log`;
      readonly severity: `error` | `warning` | `information` | `debug`;
      readonly text: string;
    }
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
          actualSteps.push({
            type: `push`,
            method,
            route,
            requestBody,
            queryParameters,
            expectedStatusCodes,
          });

          expect(abortSignal).toBe(abortSignal);

          return "200";
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
            type: `pull`,
            method,
            route,
            requestBody,
            queryParameters,
            expectedStatusCodes,
            response: expect.anything(),
          });

          expect(abortSignal).toBe(abortSignal);

          if (expectedStep === undefined || expectedStep.type !== `pull`) {
            fail(`Unexpected request.returningJson()`);
          } else {
            return { statusCode: `200`, value: expectedStep.response };
          }
        }
      ) as RequestInterface[`returningJson`],
      returningFile: jest.fn(),
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
        actualSteps.push({ type: `log`, severity: `debug`, text });
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
        collectionOrder: [
          `testCollectionBKey`,
          `testCollectionCKey`,
          `testCollectionAKey`,
        ],
        collections: {
          testCollectionAKey: {
            testAdditionalCollectionDataKey: `Test Collection A Additional Value`,
            listFiles(item) {
              switch (item) {
                case `Test Collection A Value A`:
                  return [
                    {
                      route: `Test Collection A Value A File A Route`,

                      uuid: `a62a2fc4-6d1b-4289-94e1-373d4ebf5cd2`,
                    },
                  ];

                case `Test Collection A Value B`:
                  return [];
              }
            },
          },
          testCollectionBKey: {
            testAdditionalCollectionDataKey: `Test Collection B Additional Value`,
            listFiles(item) {
              switch (item) {
                case `Test Collection B Value B`:
                  return [
                    {
                      route: `Test Collection A Value A File A Route`,

                      uuid: `52219b25-ac88-4440-bf31-a47df684bdd7`,
                    },
                    {
                      route: `Test Collection A Value A File A Route`,
                      uuid: `f81d2428-9bde-4b1c-823c-86b349c99363`,
                    },
                  ];

                case `Test Collection B Value A`:
                case `Test Collection B Value C`:
                case `Test Collection B Value D`:
                case `Test Collection B Value E`:
                  return [];
              }
            },
          },
          testCollectionCKey: {
            testAdditionalCollectionDataKey: `Test Collection C Additional Value`,
            listFiles(item) {
              item;
              return [];
            },
          },
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

    expect(request.returningFile).not.toHaveBeenCalled();

    expect(fileStore.load).not.toHaveBeenCalled();
    expect(fileStore.unload).not.toHaveBeenCalled();

    expect(sync.getState()).toEqual({ type: `notRunning` });

    expect(eventHandlerB).not.toHaveBeenCalled();
  });
}

scenario(
  `without changes`,
  {
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
    { type: `getState`, changedExternally: false },
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
      type: `pull`,
      method: `GET`,
      route: `sync/preflight`,
      requestBody: { type: `empty` },
      queryParameters: {},
      expectedStatusCodes: [`200`],
      response: {
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
    },
    { type: `getState`, changedExternally: false },
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

test(`with a change to push without files`, () => {
  // TODO
});

test(`with a change to push with files`, () => {
  // TODO
});

test(`with a previously interrupted push without files`, () => {
  // TODO
});

test(`with a previously interrupted push with files`, () => {
  // TODO
});

test(`with a previously interrupted pull where the interrupted record is deleted`, () => {
  // TODO
});

test(`with a previously interrupted pull where the interrupted record is updated`, () => {
  // TODO
});

test(`with a new item to pull without files`, () => {
  // TODO
});

test(`with a new item to pull with files`, () => {
  // TODO
});

test(`with an updated item to pull without new files`, () => {
  // TODO
});

test(`with an updated item to pull with new files`, () => {
  // TODO
});

test(`with an updated item to pull with deleted files`, () => {
  // TODO
});

test(`with every kind of change in the same sync`, () => {
  // TODO
});

test(`with a previously interrupted pull where the interrupted record is updated but the state store changes during the request`, () => {
  // TODO
});

test(`with a new item to pull but the state store changes during the update`, () => {
  // TODO
});

test(`with an updated item to pull but the state store changes during the update`, () => {
  // TODO
});

test(`with a previously interrupted pull where the interrupted record is updated but the version changes between preflight and pull`, () => {
  // TODO
});

test(`with a new item to pull but the version changes between preflight and pull`, () => {
  // TODO
});

test(`with an updated item to pull but the version changes between preflight and pull`, () => {
  // TODO
});

test(`with a change to push but the state store changes during the request`, () => {
  // TODO
});

test(`with a previously interrupted push but the state store changes during the request`, () => {
  // TODO
});

test(`the state store changes after listing files in the store`, () => {
  // TODO
});

test(`file clean-up`, () => {
  // TODO
});

test(`file clean-up blocked by request`, () => {
  // TODO
});

test(`push of file for previously pushed item`, () => {
  // TODO
});
