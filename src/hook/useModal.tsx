"use client"
import React from "react";

export const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(initialState);

  const open = (): void => setIsOpen(true);
  const close = (): void => setIsOpen(false);
  const toggle = (): void => setIsOpen((prev) => !prev);

  return { isOpen, open, close, toggle ,setIsOpen};
};
