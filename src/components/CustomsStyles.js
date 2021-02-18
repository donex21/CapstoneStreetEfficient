export const activeTextSwitch = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: 15,
    color: "#fff",
    paddingLeft: 5
}

export const inactiveTextSwitch = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: 15,
    color: "#fff",
    paddingRight: 20
}
export const customStyles = {
    control: (base, state) => ({
      ...base,
      height: 10,
      background: "rgba(57, 129, 229, 0.2)",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      borderColor: state.isFocused ? "yellow" : "green",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "red" : "blue"
      }
    }),
    menu: base => ({
      ...base,     
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: base => ({
      ...base,
      padding: 0
    })
  };