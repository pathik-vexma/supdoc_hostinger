import { ref, watch, onMounted } from "vue";
import { defineStore } from "pinia";
import { ThemeModeComponent } from "@/assets/ts/layout";

export const THEME_MODE_LS_KEY = "kt_theme_mode_value";
export const THEME_MENU_MODE_LS_KEY = "kt_theme_mode_menu";

export const useThemeStore = defineStore("theme", () => {
  // Initialize with system preference or fallback to light
  const mode = ref<"light" | "dark" | "system">("system");
  
  // Function to detect system preference
  function getSystemTheme(): "light" | "dark" {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  
  // Apply theme to document and localStorage
  function applyTheme(themeValue: "light" | "dark") {
    document.documentElement.setAttribute("data-bs-theme", themeValue);
    localStorage.setItem(THEME_MODE_LS_KEY, themeValue);
    localStorage.setItem(THEME_MENU_MODE_LS_KEY, themeValue);
    
    // Call ThemeModeComponent.init() to maintain compatibility
    ThemeModeComponent.init();
  }
  
  function setThemeMode(payload: "light" | "dark" | "system") {
    mode.value = payload;
    
    if (payload === "system") {
      // Apply system preference
      applyTheme(getSystemTheme());
    } else {
      // Apply explicit light/dark choice
      applyTheme(payload);
    }
  }
  
  // Watch for system preference changes when in "system" mode
  onMounted(() => {
    // Initialize theme based on saved preference or system default
    const savedMode = localStorage.getItem(THEME_MODE_LS_KEY) as "light" | "dark" | "system" | null;
    setThemeMode(savedMode || "system");
    
    // Add listener for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", () => {
      if (mode.value === "system") {
        applyTheme(getSystemTheme());
      }
    });
  });
  
  // Watch for mode changes
  watch(mode, (newMode) => {
    if (newMode === "system") {
      applyTheme(getSystemTheme());
    } else {
      applyTheme(newMode);
    }
  });
  
  return {
    mode,
    setThemeMode,
  };
});