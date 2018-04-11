export const flatten = multiList => multiList.reduce( (acc,item) => acc.concat(item), [] )
