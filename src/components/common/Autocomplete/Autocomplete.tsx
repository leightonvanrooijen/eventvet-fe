import { Combobox } from "@headlessui/react";
import React, { ChangeEventHandler, forwardRef, useState } from "react";

type AutocompleteProps = {
  label?: string;
  options: { value: string; text: string }[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  onBlur?: any;
};

// eslint-disable-next-line react/display-name
export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ options, onChange, name, onBlur }, ref) => {
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [query, setQuery] = useState("");

    const filteredOptions =
      query === ""
        ? options
        : options.filter((option) => {
            return option.text
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""));
          });

    return (
      <div className="relative mt-1 w-56">
        <Combobox
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          ref={ref}
          name={name}
        >
          <Combobox.Input
            onBlur={onBlur}
            onChange={(event) => {
              setQuery(event.target.value);
              if (onChange) onChange(event);
            }}
            displayValue={(option: { text: string }) => option.text}
            className={`relative mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                        invalid:border-pink-500 invalid:text-pink-600
                        focus:invalid:border-pink-500 focus:invalid:ring-pink-500`}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            Open
          </Combobox.Button>
          <Combobox.Options className="absolute mt-1 max-h-60 w-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <div>
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    className={({ active, selected }) =>
                      `relative cursor-default select-none py-2 pl-2 pr-4
                  ${active ? "bg-gray-200" : ""}
                  ${selected ? "bg-gray-100" : ""}`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate text-sm ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.text}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </div>
          </Combobox.Options>
        </Combobox>
      </div>
    );
  }
);
