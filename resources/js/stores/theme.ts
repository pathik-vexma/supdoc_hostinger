import { ref } from "vue";
import { defineStore } from "pinia";
import { ThemeModeComponent } from "@/assets/ts/layout";

export const THEME_MODE_LS_KEY = "kt_theme_mode_value";
export const THEME_MENU_MODE_LS_KEY = "kt_theme_mode_menu";

export const useThemeStore = defineStore("theme", () => {
  // Always initialize with "light" regardless of localStorage
  const mode = ref<"light" | "dark" | "system">("light");
  
  function setThemeMode(payload: "light" | "dark" | "system") {
    // Always set to light regardless of the payload
    const currentMode = "light";
    
    // Still update localStorage to maintain compatibility
    localStorage.setItem(THEME_MODE_LS_KEY, currentMode);
    localStorage.setItem(THEME_MENU_MODE_LS_KEY, currentMode);
    
    // Keep the mode value as light
    mode.value = "light";
    
    // Set the document theme to light
    document.documentElement.setAttribute("data-bs-theme", "light");
    
    // Still call init to maintain compatibility with other code
    ThemeModeComponent.init();
  }

  // Initialize theme to light on store creation
  document.documentElement.setAttribute("data-bs-theme", "light");
  
  return {
    mode,
    setThemeMode,
  };
});