"use client";
import React from "react";
import ReactSelect from "react-select";

type Props = {
    id: string;
    className: string;
    label?: string;
    helperText?: string;
    options: {
        label: string;
        value: string;
    }[];
    value?: string;
    setValue?: (val?: string) => void | Promise<void>;
    onChange?: (val?: string) => void;
    width?: number;
    disabled?: boolean;
    defaultValue?: string;
    placeholder?: string;
};

const DropDownSelect = ({
    id,
    label,
    helperText,
    options,
    setValue,
    disabled,
    value,
    onChange,
    className,
    width = 300,
    defaultValue,
    placeholder = "Select...",
}: Props) => {
    return (
        <div style={{ width }} className="form-field-wrapper">
            {label && (
                <label htmlFor={id} className="field-label">
                    {label}
                </label>
            )}
            <ReactSelect
                placeholder={placeholder}
                className={className}
                defaultValue={
                    options?.find((i) => i.value === defaultValue) || undefined
                }
                isDisabled={disabled}
                value={options?.find((i) => i.value === value) || undefined}
                id={id}
                onChange={(p) => {
                    onChange ? onChange?.(p?.value) : setValue?.(p?.value);
                }}
                styles={{
                    control: () => ({
                        // fontSize: "0.75rem",
                        display: "flex",
                        borderRadius: "8px",
                        ouline: "none",
                    }),
                    indicatorsContainer() {
                        return {
                            color: "hsl(220, 13%, 91%)",
                            ":hover": {
                                color: "hsl(220, 13%, 91%)",
                            },
                        };
                    },
                    option: (styles, p) => ({
                        ...styles,
                        borderRadius: 4,
                        marginBottom: 5,
                        ...(p?.isSelected
                            ? {
                                  backgroundColor: "#e16449",
                              }
                            : {
                                  backgroundColor: "transparent",
                                  ":hover": {
                                      backgroundColor: "hsl(220, 13%, 91%)",
                                  },
                              }),
                        ":last-of-type": {
                            marginBottom: 0,
                        },
                    }),
                    menu: (styles) => ({
                        ...styles,
                        borderRadius: 4,
                        padding: 5,
                    }),
                }}
                options={options}
            />
            {helperText && <p className="field-helper-text">{helperText}</p>}
        </div>
    );
};

export default DropDownSelect;
