"use client";

import React from "react";

const Select = ({ children, onValueChange, defaultValue, value }) => {
  const [selectedValue, setSelectedValue] = React.useState(
    value || defaultValue || ""
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue) => {
    if (value === undefined) {
      setSelectedValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  // Pass the selected value to children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        selectedValue,
        onValueChange: handleValueChange,
      });
    }
    return child;
  });

  return <div className="relative">{childrenWithProps}</div>;
};

const SelectTrigger = React.forwardRef(
  ({ className, children, selectedValue, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(!open);

      // Dispatch event to notify SelectContent
      const event = new CustomEvent("select-state-change", {
        detail: { open: !open },
      });
      document.dispatchEvent(event);
    };

    return (
      <button
        ref={ref}
        className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          className || ""
        }`}
        onClick={handleClick}
        aria-expanded={open}
        {...props}
      >
        {children}
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = React.forwardRef(
  ({ className, placeholder, ...props }, ref) => {
    // Get the selected value from the parent Select component
    const [displayValue, setDisplayValue] = React.useState("");

    React.useEffect(() => {
      const handleValueChange = (e) => {
        if (e.detail && e.detail.value) {
          setDisplayValue(e.detail.value);
        }
      };

      document.addEventListener("select-value-change", handleValueChange);
      return () => {
        document.removeEventListener("select-value-change", handleValueChange);
      };
    }, []);

    return (
      <div ref={ref} className={className} {...props}>
        {displayValue || placeholder}
      </div>
    );
  }
);
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const handleStateChange = (e) => {
        setOpen(e.detail.open);
      };

      document.addEventListener("select-state-change", handleStateChange);
      return () => {
        document.removeEventListener("select-state-change", handleStateChange);
      };
    }, []);

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={`relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 absolute w-full top-full mt-1 ${
          className || ""
        }`}
        {...props}
      >
        <div className="p-1">{children}</div>
      </div>
    );
  }
);
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(
  (
    { className, children, value, onValueChange, selectedValue, ...props },
    ref
  ) => {
    const isSelected = selectedValue === value;

    const handleClick = () => {
      if (onValueChange) {
        onValueChange(value);
      }

      // Notify SelectValue about the change
      const event = new CustomEvent("select-value-change", {
        detail: { value: children },
      });
      document.dispatchEvent(event);

      // Close the dropdown
      const closeEvent = new CustomEvent("select-state-change", {
        detail: { open: false },
      });
      document.dispatchEvent(closeEvent);
    };

    return (
      <div
        ref={ref}
        className={`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${
          isSelected ? "bg-accent text-accent-foreground" : ""
        } ${className || ""}`}
        onClick={handleClick}
        {...props}
      >
        {isSelected && (
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        )}
        <span>{children}</span>
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
