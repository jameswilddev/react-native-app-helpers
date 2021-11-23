import * as React from "react";
import {
  ControlStyle,
  createSearchableMultiSelectComponent,
  unwrapRenderedFunctionComponent,
} from "../..";

type TestValue = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90;

const controlStyle: ControlStyle = {
  fontFamily: `Example Font Family`,
  fontSize: 37,
  paddingVertical: 12,
  paddingHorizontal: 29,
  blurredValid: {
    textColor: `#FFEE00`,
    placeholderColor: `#E7AA32`,
    backgroundColor: `#32AE12`,
    radius: 5,
    border: {
      width: 4,
      color: `#FF00FF`,
    },
  },
  blurredInvalid: {
    textColor: `#99FE88`,
    placeholderColor: `#CACA3A`,
    backgroundColor: `#259284`,
    radius: 10,
    border: {
      width: 6,
      color: `#9A9A8E`,
    },
  },
  focusedValid: {
    textColor: `#55EA13`,
    placeholderColor: `#273346`,
    backgroundColor: `#CABA99`,
    radius: 3,
    border: {
      width: 5,
      color: `#646464`,
    },
  },
  focusedInvalid: {
    textColor: `#ABAADE`,
    placeholderColor: `#47ADAD`,
    backgroundColor: `#32AA88`,
    radius: 47,
    border: {
      width: 12,
      color: `#98ADAA`,
    },
  },
  disabledValid: {
    textColor: `#AE2195`,
    placeholderColor: `#FFAAEE`,
    backgroundColor: `#772728`,
    radius: 100,
    border: {
      width: 14,
      color: `#5E5E5E`,
    },
  },
  disabledInvalid: {
    textColor: `#340297`,
    placeholderColor: `#233832`,
    backgroundColor: `#938837`,
    radius: 2,
    border: {
      width: 19,
      color: `#573829`,
    },
  },
};

test(`renders as expected when none of the selected options are listed`, () => {
  const Component =
    createSearchableMultiSelectComponent<TestValue>(controlStyle);
  const onChange = jest.fn();

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      disabled={false}
      placeholder="Example Placeholder"
      values={[70, 90, 80]}
      onChange={onChange}
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option B Label`,
        },
        {
          value: 40,
          label: `Example Option D Label`,
        },
        {
          value: 50,
          label: `Example Option E Label`,
        },
        {
          value: 60,
          label: `Example Option F Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      noMatchesText="Example No Matches Text"
    />
  );

  expect(rendered).toMatchObject({
    props: {
      disabled: false,
      valid: true,
      label: null,
      placeholder: `Example Placeholder`,
      children: expect.any(Function),
    },
  });

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    fullHeightPopover: { controlStyle },
  });

  const close = jest.fn();

  const renderedChildren = rendered.props[`children`](close);

  expect(renderedChildren).toMatchObject({
    props: {
      options: [
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option B Label`,
        },
        {
          value: 40,
          label: `Example Option D Label`,
        },
        {
          value: 50,
          label: `Example Option E Label`,
        },
        {
          value: 60,
          label: `Example Option F Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ],
      values: [70, 90, 80],
      onChange,
      placeholder: `Example Placeholder`,
      close,
      noMatchesText: `Example No Matches Text`,
    },
  });

  expect(renderedChildren.type).toBeAFunctionWithTheStaticProperties({
    searchableMultiSelectChildren: { controlStyle },
  });

  expect(close).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected with a present selected value`, () => {
  const Component =
    createSearchableMultiSelectComponent<TestValue>(controlStyle);
  const onChange = jest.fn();

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      disabled={false}
      placeholder="Example Placeholder"
      values={[50, 20, 70, 30]}
      onChange={onChange}
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option B Label`,
        },
        {
          value: 40,
          label: `Example Option D Label`,
        },
        {
          value: 50,
          label: `Example Option E Label`,
        },
        {
          value: 60,
          label: `Example Option F Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      noMatchesText="Example No Matches Text"
    />
  );

  expect(rendered).toMatchObject({
    props: {
      disabled: false,
      valid: true,
      label: `Example Option B Label, Example Option C Label, Example Option E Label`,
      placeholder: `Example Placeholder`,
      children: expect.any(Function),
    },
  });

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    fullHeightPopover: { controlStyle },
  });

  const close = jest.fn();

  const renderedChildren = rendered.props[`children`](close);

  expect(renderedChildren).toMatchObject({
    props: {
      options: [
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option B Label`,
        },
        {
          value: 40,
          label: `Example Option D Label`,
        },
        {
          value: 50,
          label: `Example Option E Label`,
        },
        {
          value: 60,
          label: `Example Option F Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ],
      values: [50, 20, 70, 30],
      onChange,
      placeholder: `Example Option B Label, Example Option C Label, Example Option E Label`,
      close,
      noMatchesText: `Example No Matches Text`,
    },
  });

  expect(renderedChildren.type).toBeAFunctionWithTheStaticProperties({
    searchableMultiSelectChildren: { controlStyle },
  });

  expect(close).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected when disabled when none of the selected options are listed`, () => {
  const Component =
    createSearchableMultiSelectComponent<TestValue>(controlStyle);
  const onChange = jest.fn();

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      disabled
      placeholder="Example Placeholder"
      values={[70, 90, 80]}
      onChange={onChange}
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option B Label`,
        },
        {
          value: 40,
          label: `Example Option D Label`,
        },
        {
          value: 50,
          label: `Example Option E Label`,
        },
        {
          value: 60,
          label: `Example Option F Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      noMatchesText="Example No Matches Text"
    />
  );

  expect(rendered).toMatchObject({
    props: {
      disabled: true,
      valid: true,
      label: null,
      placeholder: `Example Placeholder`,
      children: expect.any(Function),
    },
  });

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    fullHeightPopover: { controlStyle },
  });

  const close = jest.fn();

  const renderedChildren = rendered.props[`children`](close);

  expect(renderedChildren).toMatchObject({
    props: {
      options: [
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option B Label`,
        },
        {
          value: 40,
          label: `Example Option D Label`,
        },
        {
          value: 50,
          label: `Example Option E Label`,
        },
        {
          value: 60,
          label: `Example Option F Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ],
      values: [70, 90, 80],
      onChange,
      placeholder: `Example Placeholder`,
      close,
      noMatchesText: `Example No Matches Text`,
    },
  });

  expect(renderedChildren.type).toBeAFunctionWithTheStaticProperties({
    searchableMultiSelectChildren: { controlStyle },
  });

  expect(close).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected when disabled with a present selected value`, () => {
  const Component =
    createSearchableMultiSelectComponent<TestValue>(controlStyle);
  const onChange = jest.fn();

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      disabled
      placeholder="Example Placeholder"
      values={[50, 20, 70, 30]}
      onChange={onChange}
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option B Label`,
        },
        {
          value: 40,
          label: `Example Option D Label`,
        },
        {
          value: 50,
          label: `Example Option E Label`,
        },
        {
          value: 60,
          label: `Example Option F Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      noMatchesText="Example No Matches Text"
    />
  );

  expect(rendered).toMatchObject({
    props: {
      disabled: true,
      valid: true,
      label: `Example Option B Label, Example Option C Label, Example Option E Label`,
      placeholder: `Example Placeholder`,
      children: expect.any(Function),
    },
  });

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    fullHeightPopover: { controlStyle },
  });

  const close = jest.fn();

  const renderedChildren = rendered.props[`children`](close);

  expect(renderedChildren).toMatchObject({
    props: {
      options: [
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option B Label`,
        },
        {
          value: 40,
          label: `Example Option D Label`,
        },
        {
          value: 50,
          label: `Example Option E Label`,
        },
        {
          value: 60,
          label: `Example Option F Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ],
      values: [50, 20, 70, 30],
      onChange,
      placeholder: `Example Option B Label, Example Option C Label, Example Option E Label`,
      close,
      noMatchesText: `Example No Matches Text`,
    },
  });

  expect(renderedChildren.type).toBeAFunctionWithTheStaticProperties({
    searchableMultiSelectChildren: { controlStyle },
  });

  expect(close).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected without any options`, () => {
  const Component =
    createSearchableMultiSelectComponent<TestValue>(controlStyle);
  const onChange = jest.fn();

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      disabled={false}
      placeholder="Example Placeholder"
      values={[50, 20, 70, 30]}
      onChange={onChange}
      options={[]}
      noMatchesText="Example No Matches Text"
    />
  );

  expect(rendered).toMatchObject({
    props: {
      disabled: true,
      valid: true,
      label: null,
      placeholder: `Example Placeholder`,
      children: expect.any(Function),
    },
  });

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    fullHeightPopover: { controlStyle },
  });

  const close = jest.fn();

  const renderedChildren = rendered.props[`children`](close);

  expect(renderedChildren).toMatchObject({
    props: {
      options: [],
      values: [50, 20, 70, 30],
      onChange,
      placeholder: `Example Placeholder`,
      close,
      noMatchesText: `Example No Matches Text`,
    },
  });

  expect(renderedChildren.type).toBeAFunctionWithTheStaticProperties({
    searchableMultiSelectChildren: { controlStyle },
  });

  expect(close).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected when disabled without any options`, () => {
  const Component =
    createSearchableMultiSelectComponent<TestValue>(controlStyle);
  const onChange = jest.fn();

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      disabled
      placeholder="Example Placeholder"
      values={[50, 20, 70, 30]}
      onChange={onChange}
      options={[]}
      noMatchesText="Example No Matches Text"
    />
  );

  expect(rendered).toMatchObject({
    props: {
      disabled: true,
      valid: true,
      label: null,
      placeholder: `Example Placeholder`,
      children: expect.any(Function),
    },
  });

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    fullHeightPopover: { controlStyle },
  });

  const close = jest.fn();

  const renderedChildren = rendered.props[`children`](close);

  expect(renderedChildren).toMatchObject({
    props: {
      options: [],
      values: [50, 20, 70, 30],
      onChange,
      placeholder: `Example Placeholder`,
      close,
      noMatchesText: `Example No Matches Text`,
    },
  });

  expect(renderedChildren.type).toBeAFunctionWithTheStaticProperties({
    searchableMultiSelectChildren: { controlStyle },
  });

  expect(close).not.toHaveBeenCalled();
  expect(onChange).not.toHaveBeenCalled();
});
