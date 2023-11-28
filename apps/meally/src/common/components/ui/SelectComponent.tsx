"use client";
import { type ClassValue, clsx } from "clsx";
import { ChevronDownIcon, X } from "lucide-react";
import Select, {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  components,
} from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <X />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <X />
    </components.MultiValueRemove>
  );
};

const controlStyles = {
  base: "border border-white rounded-lg dark:bg-grey bg-white shadow hover:cursor-pointer hover:bg-secondary",
  focus: "border-white ring-white/70 ring-primary-500",
  nonFocus: "border-white",
};
const placeholderStyles = " text-sm ml-1";
const selectInputStyles = "text-foreground text-sm ml-1";
const valueContainerStyles = "text-foreground text-sm";
const singleValueStyles = "ml-1";
const multiValueStyles =
  "ml-1 dark:bg-grey bg-white shadow border border-grey rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5";
const multiValueRemoveStyles =
  "border border-grey bg-white hover:bg-red hover:text-white hover:border-red rounded-md dark:bg-grey bg-white";
const indicatorsContainerStyles = "p-1 gap-1 dark:bg-grey bg-white rounded-lg";
const clearIndicatorStyles = " p-1 rounded-md hover:text-red";
const indicatorSeparatorStyles = "bg-mutated";
const dropdownIndicatorStyles = "p-1 hover:text-foreground";
const menuStyles =
  "mt-2 p-2 border border-white dark:bg-grey bg-white text-sm rounded-lg";

const menuList = "min-w-fit";
const optionsStyle =
  "dark:bg-grey bg-white p-2 border-0 text-base hover:bg-secondary hover:cursor-pointer";
const groupHeadingStyles = "ml-3 mt-2 mb-1  text-sm dark:bg-grey bg-white";
const noOptionsMessageStyles = "text-muted-foreground dark:bg-grey bg-white";

type SelectComponentProps = {
  options: any[];
  value?: any;
  onChange?: (value: any) => void;
  isMulti?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  createAble?: boolean;
  placeholder?: string;
  clearable?: boolean;
};

export const SelectComponent = ({
  options,
  value,
  onChange,
  isMulti = false,
  isDisabled,
  isLoading,
  createAble = false,
  placeholder,
  clearable = true,
  ...props
}: SelectComponentProps) => {
  const animatedComponents = makeAnimated();
  const Comp = createAble ? CreatableSelect : Select;
  return (
    <>
      <Comp
        unstyled
        isClearable={clearable}
        isSearchable
        value={value}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isLoading={isLoading}
        placeholder={placeholder}
        components={animatedComponents}
        // defaultInputValue={defaultValue}
        defaultValue={value}
        options={options}
        noOptionsMessage={() => "No options found !!"}
        onChange={onChange}
        classNames={{
          control: ({ isFocused }) =>
            clsx(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          option: () => optionsStyle,
          menu: () => menuStyles,
          menuList: () => menuList,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          groupHeading: () => groupHeadingStyles,
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
        {...props}
      />
    </>
  );
};
