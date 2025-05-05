"use client";

import React from "react";

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${
      className || ""
    }`}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ className, value, ...props }, ref) => {
  const [activeTab, setActiveTab] = React.useState(null);

  React.useEffect(() => {
    // Find the parent Tabs component and get its value
    const parent = document.querySelector("[data-tabs-value]");
    if (parent) {
      setActiveTab(parent.getAttribute("data-tabs-value"));
    }
  }, []);

  const isActive = activeTab === value;

  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-current"
      } ${className || ""}`}
      {...props}
      onClick={(e) => {
        setActiveTab(value);
        if (props.onClick) props.onClick(e);
      }}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className, value, ...props }, ref) => {
  const [activeTab, setActiveTab] = React.useState(null);

  React.useEffect(() => {
    // Find the parent Tabs component and get its value
    const parent = document.querySelector("[data-tabs-value]");
    if (parent) {
      setActiveTab(parent.getAttribute("data-tabs-value"));
    }
  }, []);

  if (activeTab !== value) return null;

  return (
    <div
      ref={ref}
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        className || ""
      }`}
      {...props}
    />
  );
});
TabsContent.displayName = "TabsContent";

const Tabs = React.forwardRef(
  ({ className, defaultValue, value, onValueChange, ...props }, ref) => {
    const [tabValue, setTabValue] = React.useState(value || defaultValue);

    React.useEffect(() => {
      if (value !== undefined) {
        setTabValue(value);
      }
    }, [value]);

    const handleValueChange = (newValue) => {
      if (value === undefined) {
        setTabValue(newValue);
      }
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    return (
      <div
        ref={ref}
        className={className}
        data-tabs-value={tabValue}
        {...props}
      />
    );
  }
);
Tabs.displayName = "Tabs";

export { Tabs, TabsList, TabsTrigger, TabsContent };
