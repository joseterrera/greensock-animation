

export const remove = count => start => arr => {
  // create a copy of the original array
  // now you're not fucking with the original when you
  // mutate the shit out of the data
  const arrCopy = arr.slice()

  // NOW MUTATE THIS BITCH
  const thisisWhatIsSpliceOut = arrCopy.splice(start, count)

  // this now no longer has the spliced out item, we want this
  const whatRemains = arrCopy

  // This seems confusing because arrCopy is mutated by
  // the dangerous mutating function splcie
  return [thisisWhatIsSpliceOut, whatRemains]
}

export const remove1 = remove(1)
// Not pure
export const remove1RandomItem = arr => remove1(Math.floor(Math.random() * arr.length))(arr)

export const shuffle = arr => {
  let tempArr = arr
  let removedItem
  return arr.reduce((acc, item) => ([removedItem, tempArr] = remove1RandomItem(tempArr), acc.concat(removedItem)), [])
}


export const head = list => list[0]

// state manager
export const simpleStateClosure = fn => initialState => {
  let state = initialState
  return getNextShuffleItem(initialState)(state)
}

// generator function
export const getNextShuffleItem = initialState => state => () => {
  const [thisisWhatIsSpliceOut, whatRemains] = remove1RandomItem(state)
  state = whatRemains.length ? whatRemains : initialState
  return head(thisisWhatIsSpliceOut)
}

export const getNextShuffledItemGenerator = simpleStateClosure(getNextShuffleItem)

// export const getNextShuffledItem = getNextShuffledItemGenerator([1,2,3,4,5,6])
