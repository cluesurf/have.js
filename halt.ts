import Halt, { Link, HaltMesh } from '@tunebond/halt'
import { make4 } from '@tunebond/tone-code'

const host = '@tunebond/have'

export type HaveBase = {
  call?: string
  lead?: unknown
  need?: Array<unknown> | unknown
}

export type HaveHaltList = {
  lead: Array<HaltMesh>
}

const base = {
  form_miss: {
    code: 2,
    note: (link: HaveBase) => `Form is undefined.`,
  },
  halt_list: {
    code: 8,
    note: (link: HaveHaltList) => `Multiple data errors.`,
  },
  link_form: {
    code: 6,
    note: (link: HaveBase) => `Link is invalid form.`,
  },
  link_miss: {
    code: 7,
    note: (link: HaveBase) => `Link is not valid.`,
  },
  link_need: {
    code: 3,
    note: (link: HaveBase) => `Link is required.`,
  },
  link_size: {
    code: 4,
    note: (link: HaveBase) => `Link size out of bounds.`,
  },
  link_take: {
    code: 5,
    note: (link: HaveBase) => `Link provided invalid value.`,
  },
}

type Base = typeof base

type Name = keyof Base

export const code = (code: number) => make4(BigInt(code))

export default function halt(form: Name, link: Link<Base, Name>) {
  return new Halt({ base, code, form, host, link })
}
