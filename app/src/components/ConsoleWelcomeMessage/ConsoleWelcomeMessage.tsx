'use client';

import { useEffect } from 'react';

const printConsoleMessage = () => {
  const msg =
    '%c  __  __         ____       _       _ \n |  \\/  |       |  _ \\     (_)     (_)\n | \\  / | ___   | |_) | ___ _  __ _ _ \n | |\\/| |/ _ \\  |  _ < / _ \\ |/ _` | |\n | |  | | (_) | | |_) |  __/ | (_| | |\n |_|  |_|\\___/  |____/ \\___|_|\\__, |_|\n                               __/ |  \n                              |___/   ' +
    '%c\n ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ' +
    '\n\n Welcome! Need to contact me? https://mobeigi.com/contact/ ' +
    '\n ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ____ ';

  console.log(
    msg,
    'font-size: 18px; font-family: monospace; color: #6699CC;',
    'font-size: 12px; font-family: monospace; color: #6699CC;',
  );
};

export const ConsoleWelcomeMessage = () => {
  useEffect(() => {
    printConsoleMessage();
  }, []);

  return null;
};
