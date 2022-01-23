type SidebarType = {
  id: number
  name: string
  src: string
}

let initialState = {
  sidebar: [
    { id: 1, name: "Max", src: "../../assets/images/avatar.png" },
    { id: 2, name: "Lera", src: "../../assets/images/avatar.png" },
    { id: 3, name: "Zheka", src: "../../assets/images/avatar.png" },
  ] as Array<SidebarType>,
};

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
  return state;
};

export default sidebarReducer;
