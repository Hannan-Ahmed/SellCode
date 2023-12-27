"use client"
import React, { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>

<SnackbarProvider maxSnack={3}>
      
      {children}
  </SnackbarProvider>
      {/* <main>{children}</main> */}
    </div>
  );
};

export default Layout;
