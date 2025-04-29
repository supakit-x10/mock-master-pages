"use client";

import { ConfigProvider, theme } from "antd";
import { observer } from "mobx-react";
import { NextPage } from "next";
import React, { useCallback, useEffect } from "react";
import { useMobxEffect } from "../../hook/useMobxEffect";
import themeViewModel from "./them.viewmodel";

interface Props {
  children: React.ReactNode;
}

const ThemeProvider: NextPage<Props> = ({ children }) => {
  themeViewModel.initMode();

  const darkModeChange = useCallback((event: MediaQueryListEvent) => {
    themeViewModel.isDarkMode = event.matches;
    document.body.style.backgroundColor = event.matches ? "#2A2A2A" : "#ffffff";
  }, []);

  const { isDarkMode, isReady } = themeViewModel;
  const { defaultAlgorithm, darkAlgorithm } = theme;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const windowQuery = window.matchMedia("(prefers-color-scheme:dark)");
      windowQuery.addEventListener("change", darkModeChange);

      return () => {
        windowQuery.removeEventListener("change", darkModeChange);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMobxEffect(() => {
    if (themeViewModel.isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.body.style.backgroundColor = "#2A2A2A";
      document.body.style.color = "#ffffff";
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
    }
  }, [themeViewModel.isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          fontFamily: "var(--font-kanit)",
          colorPrimary: "#00008F",
          colorLink: "#1eb954",
          // colorPrimaryBg: isDarkMode ? "#162312" : "#F6FFED"
        },
        components: {
          Menu: {
            activeBarBorderWidth: 1,
            itemBorderRadius: 0,
          },
          Button: {
            borderRadius: 5,
            borderRadiusLG: 5,
          },
          Input: {
            borderRadiusLG: 4,
            borderRadius: 4,
            // colorIcon: "#389E0D",
            // colorIconHover: "#389E0D",
          },
          InputNumber: {
            borderRadius: 0,
          },
          Radio: {
            borderRadius: 0,
          },
          Tabs: {
            borderRadiusLG: 0,
            cardBg: "none",
            margin: 0,
            colorBorderSecondary: "none",
          },
          Typography: {
            titleMarginBottom: 0,
          },
          Pagination: {
            borderRadius: 0,
          },
          Select: {
            borderRadiusLG: 0,
            borderRadius: 0,
            borderRadiusSM: 0,
            borderRadiusXS: 0,
          },
          Modal: {
            borderRadiusLG: 0,
            borderRadiusSM: 0,
          },
          Checkbox: {
            borderRadiusSM: 0,
          },
          Collapse: {
            borderRadius: 2,
            borderRadiusLG: 2,
          },
        },
      }}
    >
      {isReady && children}
    </ConfigProvider>
  );
};

export default observer(ThemeProvider);
