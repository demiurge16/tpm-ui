import { css } from "@emotion/css";
import { Theme } from "@mui/material";

export const useStyles = (theme: Theme) => ({
  grid: css`
    --ag-foreground-color: ${theme.palette.text.primary};
    --ag-background-color: ${theme.palette.background.default};
    --ag-secondary-foreground-color: ${theme.palette.text.secondary};
    --ag-data-color: ${theme.palette.text.primary};
    --ag-header-foreground-color: ${theme.palette.text.primary};
    --ag-header-background-color: ${theme.palette.background.default};
    --ag-tooltip-background-color: ${theme.palette.background.default};
    --ag-disabled-foreground-color: ${theme.palette.text.disabled};
    --ag-subheader-background-color: ${theme.palette.background.default};
    --ag-subheader-toolbar-background-color: ${theme.palette.background.default};
    --ag-control-panel-background-color: ${theme.palette.background.default};
    --ag-side-button-selected-background-color: ${theme.palette.background.default};
    --ag-selected-row-background-color: ${theme.palette.action.selected};
    --ag-odd-row-background-color: ${theme.palette.background.default};
    --ag-modal-overlay-background-color: ${theme.palette.background.default};
    --ag-row-hover-color: ${theme.palette.action.hover};
    --ag-column-hover-color: ${theme.palette.action.hover};
    --ag-range-selection-border-color: ${theme.palette.action.selected};
    --ag-range-selection-border-style: solid;
    --ag-range-selection-background-color: ${theme.palette.action.selected};
    --ag-range-selection-background-color-2: ${theme.palette.action.selected};
    --ag-range-selection-background-color-3: ${theme.palette.action.selected};
    --ag-range-selection-background-color-4: ${theme.palette.action.selected};
    --ag-range-selection-highlight-color: ${theme.palette.action.selected};
    --ag-selected-tab-underline-color: ${theme.palette.action.selected};
    --ag-selected-tab-underline-width: 2px;
    --ag-selected-tab-underline-transition-speed: 0.3s;
    --ag-range-selection-chart-category-background-color: ${theme.palette.action.selected};
    --ag-range-selection-chart-background-color: ${theme.palette.action.selected};
    --ag-header-cell-hover-background-color: ${theme.palette.action.hover};
    --ag-header-cell-moving-background-color: ${theme.palette.action.hover};
    --ag-value-change-value-highlight-background-color: ${theme.palette.action.selected};
    --ag-value-change-delta-up-color: ${theme.palette.action.selected};
    --ag-value-change-delta-down-color: ${theme.palette.action.selected};
    --ag-chip-background-color: ${theme.palette.background.default};
    --ag-borders: ${theme.palette.divider};
    --ag-border-color: ${theme.palette.divider};
    --ag-borders-critical: ${theme.palette.divider};
    --ag-borders-secondary: ${theme.palette.divider};
    --ag-secondary-border-color: ${theme.palette.divider};
    --ag-row-border-style: solid;
    --ag-row-border-width: 1px;
    --ag-row-border-color: ${theme.palette.divider};
    --ag-cell-horizontal-border: ${theme.palette.divider};
    --ag-borders-input: ${theme.palette.divider};
    --ag-input-border-color: ${theme.palette.divider};
    --ag-borders-input-invalid: ${theme.palette.divider};
    --ag-input-border-color-invalid: ${theme.palette.divider};
    --ag-borders-side-button: ${theme.palette.divider};
    --ag-border-radius: 0px;
    --ag-invalid-color: ${theme.palette.error.main};
    --ag-input-disabled-border-color: ${theme.palette.divider};
    --ag-input-disabled-background-color: ${theme.palette.background.default};
    --ag-checkbox-background-color: ${theme.palette.background.default};
    --ag-checkbox-border-radius: 0px;
    --ag-checkbox-checked-color: ${theme.palette.action.selected};
    --ag-checkbox-unchecked-color: ${theme.palette.action.selected};
    --ag-checkbox-indeterminate-color: ${theme.palette.action.selected};
    --ag-toggle-button-border-width: 1px;
    --ag-toggle-button-on-border-color: ${theme.palette.action.selected};
    --ag-toggle-button-off-border-color: ${theme.palette.action.selected};
    --ag-toggle-button-on-background-color: ${theme.palette.action.selected};
    --ag-toggle-button-off-background-color: ${theme.palette.action.selected};
    --ag-toggle-button-switch-background-color: ${theme.palette.action.selected};
    --ag-toggle-button-switch-border-color: ${theme.palette.action.selected};
    --ag-toggle-button-width: 40px;
    --ag-toggle-button-height: 20px;
    --ag-input-focus-box-shadow: ${theme.palette.action.selected};
    --ag-input-focus-border-color: ${theme.palette.action.selected};
    --ag-minichart-selected-chart-color: ${theme.palette.action.selected};
    --ag-minichart-selected-page-color: ${theme.palette.action.selected};
    --ag-grid-size: 8px;
    --ag-icon-size: 16px;
    --ag-widget-container-horizontal-padding: 0px;
    --ag-widget-container-vertical-padding: 0px;
    --ag-widget-horizontal-spacing: 0px;
    --ag-widget-vertical-spacing: 0px;
    --ag-cell-horizontal-padding: 0px;
    --ag-cell-widget-spacing: 0px;
    --ag-row-height: 25px;
    --ag-header-height: 25px;
    --ag-list-item-height: 25px;
    --ag-header-column-separator-display: block;
    --ag-header-column-separator-height: 25px;
    --ag-header-column-separator-width: 1px;
    --ag-header-column-separator-color: ${theme.palette.divider};
    --ag-header-column-resize-handle-display: block;
    --ag-header-column-resize-handle-height: 25px;
    --ag-header-column-resize-handle-width: 1px;
    --ag-header-column-resize-handle-color: ${theme.palette.divider};
    --ag-column-select-indent-size: 0px;
    --ag-set-filter-indent-size: 0px;
    --ag-row-group-indent-size: 0px;
    --ag-filter-tool-panel-group-indent: 0px;
    --ag-tab-min-width: 0px;
    --ag-menu-min-width: 0px;
    --ag-side-bar-panel-width: 0px;
    --ag-font-family: ${theme.typography.fontFamily};
    --ag-font-size: ${theme.typography.fontSize};
    --ag-icon-font-family: ${theme.typography.fontFamily};
    --ag-card-radius: 0px;
    --ag-card-shadow: none;
    --ag-popup-shadow: none;
  `,
  pagination: css`
    border: 1px solid ${theme.palette.divider};
    padding: ${theme.spacing(1)}px;
  `,
});