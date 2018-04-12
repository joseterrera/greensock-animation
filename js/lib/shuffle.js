

export const remove = count => start => arr => {
  // create a copy of the original array
  // now you're not fucking with the original when you
  // mutate the data
  const arrCopy = arr.slice()

  // NOW MUTATE THIS
  const thisisWhatIsSpliceOut = arrCopy.splice(start, count)

  // this now no longer has the spliced out item, we want this
  const whatRemains = arrCopy

  // This seems confusing because arrCopy is mutated by
  // the dangerous mutating function splce
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

// generator function - a function that can be paused and resumed, so that other code can run in between.
//it will not execute the body of the function. Instead, it will return a generator object called an iterator,
//which is an object that controls the exeuciotn of the generation via .next()

//A generator allows you to treat your function like a program, that can be used following the rules that one defines.

//To execute a program , we need an interpreter, that will give that special behavior that we want.
//yield is a command to the interpreter.
export const getNextShuffleItem = initialState => state => () => {
  const [thisisWhatIsSpliceOut, whatRemains] = remove1RandomItem(state)
  state = whatRemains.length ? whatRemains : initialState
  return head(thisisWhatIsSpliceOut)
}

export const getNextShuffledItemGenerator = simpleStateClosure(getNextShuffleItem)

// export const getNextShuffledItem = getNextShuffledItemGenerator([1,2,3,4,5,6])
