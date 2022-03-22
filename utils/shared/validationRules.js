export const titleRules = [
  v => !!v || 'Customer title is required',
  v => (v && v.length <= 50) || 'Customer title must be less than 50 characters'
]

export const emailRules = [
  v => (v && v.length <= 50) || 'Customer email must be less than 50 characters',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]

export const phoneRules = [
  v => (v && v.length <= 30) || 'Customer email must be less than 30 characters',
  v => /\d{10,30}/.test(v) || 'Phone number must contain only digits'
]

export const webRules = [
  v => (v && v.length <= 50) || 'Customer email must be less than 50 characters',
  v => /.+\.{1}.{2,5}/.test(v) || 'Website name must be valid'
]

export const imageRules = [
  v => !v || !v.some(item => item.size > 2000000) || 'Image size should be less than 2 MB!'
]

export const selectRules = [
  v => !!v || 'The item must be chosen!'
]

export const selectObjectRules = [
  v => !!v || 'The item must be chosen!'
]

export const nameRules = [
  v => !!v || 'User first/last name is required',
  v => (v && v.length < 50) || 'User first/last name must be less than 50 characters'
]
