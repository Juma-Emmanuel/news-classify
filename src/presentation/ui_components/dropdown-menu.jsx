"use client";

import React from "react";

const DropdownMenu = ({ children }) => {
  return <div className="relative">{children}</div>;
};

const DropdownMenuTrigger = React.forwardRef(
  ({ className, asChild, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = (e) => {
      setOpen(!open);
      if (props.onClick) props.onClick(e);
    };

    // Pass the open state to the content
    React.useEffect(() => {
      const event = new CustomEvent("dropdown-state-change", {
        detail: { open },
      });
      document.dispatchEvent(event);
    }, [open]);

    const Comp = asChild ? React.Children.only(children).type : "button";

    return (
      <Comp
        ref={ref}
        className={className}
        {...props}
        onClick={handleClick}
        aria-expanded={open}
      >
        {asChild
          ? React.Children.only(children).props.children
          : props.children}
      </Comp>
    );
  }
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef(
  ({ className, align = "center", ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      const handleStateChange = (e) => {
        setOpen(e.detail.open);
      };

      document.addEventListener("dropdown-state-change", handleStateChange);
      return () => {
        document.removeEventListener(
          "dropdown-state-change",
          handleStateChange
        );
      };
    }, []);

    if (!open) return null;

    const alignmentClasses = {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    };

    return (
      <div
        ref={ref}
        className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 absolute top-full mt-2 ${
          alignmentClasses[align]
        } ${className || ""}`}
        {...props}
      />
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground w-full text-left ${
      className || ""
    }`}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuLabel = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`px-2 py-1.5 text-sm font-semibold ${className || ""}`}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`-mx-1 my-1 h-px bg-muted ${className || ""}`}
      {...props}
    />
  )
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
};
