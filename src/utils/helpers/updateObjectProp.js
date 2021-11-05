export const updateObjectProp = (items, itemProp, actionProp, newObjectProp) => {
    return items.map( item => {
          if (item[itemProp] === actionProp) {
            return { ...item, ...newObjectProp };
          }
          return item;
    })
}
