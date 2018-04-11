import {flatten} from './helpers'
export const selector = (query,context = document) => [].slice.call( 
  context.querySelectorAll(query)
)

// const pipe = (funcs) => input => funcs.reduce( (acc,item) => item(acc), input )

export const fSelector = (context) => query => selector(query,context)
export const selectMultiple = context => (...queries) => flatten(queries.map(
  fSelector(context) 
))