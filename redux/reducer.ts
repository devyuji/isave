export const initialState = "";

export const URL = (state = initialState, action: any) => {
  switch (action.type) {
    case "CHANGE_URL":
      return (state = action.payload);

    default:
      return state;
  }
};
