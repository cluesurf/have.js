import Halt, { Link } from '@tunebond/halt'

type HaveForm = {
  form: string
  name: string
}

type HaveName = {
  name: string
}

const base = {
  form_miss: {
    code: 2,
    note: ({ name, form }: HaveForm) =>
      `Value '${name}' is not '${form}' type`,
  },
  link_void: {
    code: 1,
    note: ({ name }: HaveName) => `Property '${name}' missing`,
  },
}

type Base = typeof base

type Name = keyof Base

export default function halt(form: Name, link: Link<Base, Name>) {
  return new Halt({ base, form, host: '@tunebond/have', link })
}
