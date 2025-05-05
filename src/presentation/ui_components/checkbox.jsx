"use client";

import React from "react";

const Checkbox = React.forwardRef(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked || false);

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const handleChange = (event) => {
      const newChecked = event.target.checked;
      if (checked === undefined) {
        setIsChecked(newChecked);
      }
      if (onCheckedChange) {
        onCheckedChange(newChecked);
      }
    };

    return (
      <div className="flex items-center space-x-2">
        <input
          ref={ref}
          type="checkbox"
          className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary ${
            className || ""
          }`}
          checked={isChecked}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
