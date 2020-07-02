
export const initialState = {
    menus: [
      {
        id: 1,
        nombre: 'Read a bit'
      },
      {
        id: 2,
        nombre: 'Do laundry'
      }
    ]
  };


  // Reducer
  export const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD_MENU':
        return {
          ...state,
          menus: [...state.menus, action.payload]
        };
      case 'DELETE_MENU':
        return {
          ...state,
          menus: state.menus.filter((menu) => menu.id !== action.payload)
        };
      default:
        return state;
    }
  }

  // Actions
  export const add_menu = (menu) => ({
    type: 'ADD_MENU',
    payload: menu
  });


  export const delete_menu = (MENUId) => ({
    type: 'DELETE_MENU',
    payload: MENUId
  });

