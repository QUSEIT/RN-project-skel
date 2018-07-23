export const createAction = type => payload => ({type, payload});
export const delay = time => new Promise(resolve => setTimeout(resolve, time));