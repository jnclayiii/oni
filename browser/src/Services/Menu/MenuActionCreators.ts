/**
 * MenuActionCreators.ts
 */

import * as Shell from "./../../UI/Shell"
import * as MenuActions from "./MenuActions"

// Selector
const getSelectedItem = (contextMenuState: any) => {
    if (!contextMenuState.menu) {
        return null
    }

    const index = contextMenuState.menu.selectedIndex

    return contextMenuState.menu.filteredOptions[index]
}

const notifySelectedItemChange = (contextMenuState: any) => {
    const selectedItem = getSelectedItem(contextMenuState)

    if (contextMenuState && contextMenuState.menu && contextMenuState.menu.onSelectedItemChanged) {
        contextMenuState.menu.onSelectedItemChanged(selectedItem)
    }
}

export const setMenuConfiguration = (rowHeight: number, maxItemsToShow: number) => {
    return {
        type: "SET_MENU_CONFIGURATION",
        payload: {
            rowHeight,
            maxItemsToShow,
        },
    }
}

export const showPopupMenu = (
    id: string,
    opts?: MenuActions.IMenuOptions,
    items?: any,
    filter?: string,
) => {
    const state: any = Shell.store.getState()
    const backgroundColor = state.colors["menu.background"]
    const foregroundColor = state.colors["menu.foreground"]
    const borderColor = state.colors["menu.border"] || backgroundColor
    const highlightColor = state.colors["menu.highlight"] || backgroundColor

    const defaultOptions = {
        backgroundColor,
        foregroundColor,
        borderColor,
        highlightColor,
    }

    const options = {
        ...defaultOptions,
        ...opts,
    }

    return {
        type: "SHOW_MENU",
        payload: {
            id,
            options,
            items,
            filter,
        },
    }
}

export const setMenuLoading = (id: string, isLoading: boolean) => ({
    type: "SET_MENU_LOADING",
    payload: {
        id,
        isLoading,
    },
})

export const setMenuItems = (id: string, items: any[]) => ({
    type: "SET_MENU_ITEMS",
    payload: {
        id,
        items,
    },
})

export const setDetailedMenuItem = (item: any) => ({
    type: "SET_DETAILED_MENU_ITEM",
    payload: {
        detailedItem: item,
    },
})

export const hidePopupMenu = () => (dispatch: any, getState: any) => {
    const state = getState()

    if (!state.menu) {
        return
    }

    if (state.menu.onHide) {
        state.menu.onHide()
    }

    dispatch({
        type: "HIDE_MENU",
    })
}

export const previousMenuItem = () => (dispatch: any, getState: any) => {
    dispatch({
        type: "PREVIOUS_MENU",
    })

    notifySelectedItemChange(getState())
}

export const filterMenu = (filterString: string) => (dispatch: any, getState: any) => {
    const state = getState()

    if (!state.menu) {
        return
    }

    if (state.menu.onFilterTextChanged) {
        state.menu.onFilterTextChanged(filterString)
    }

    dispatch({
        type: "FILTER_MENU",
        payload: {
            filter: filterString,
        },
    })

    notifySelectedItemChange(getState())
}

export const nextMenuItem = () => (dispatch: any, getState: any) => {
    dispatch({
        type: "NEXT_MENU",
    })

    notifySelectedItemChange(getState())
}
