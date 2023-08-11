import Kink, { KinkMesh } from '@nerdbond/kink'

const host = '@nerdbond/have'

export type BaseLink = {
  call?: string
  lead?: unknown
  need?: Array<unknown> | unknown
  void?: boolean
}

export type ListLink = {
  lead: Array<KinkMesh>
}

type Base = {
  form_miss: BaseLink
  halt_list: BaseLink
  link_form: BaseLink
  link_miss: BaseLink
  link_need: BaseLink
  link_size: BaseLink
  link_take: BaseLink
  list_miss: BaseLink
}

type Name = keyof Base

Kink.base(host, 'form_miss', () => ({
  code: 2,
  note: `Form is undefined.`,
}))

Kink.load(host, 'form_miss', loadBase)

Kink.base(host, 'halt_list', () => ({
  code: 8,
  note: `Multiple data errors.`,
}))

Kink.load(host, 'halt_list', loadBase)

Kink.base(host, 'link_form', () => ({
  code: 6,
  note: `Link is invalid form.`,
}))

Kink.load(host, 'link_form', loadBase)

Kink.base(host, 'link_miss', () => ({
  code: 7,
  note: `Link is not valid.`,
}))

Kink.load(host, 'link_miss', loadBase)

Kink.base(host, 'link_need', () => ({
  code: 3,
  note: `Link is required.`,
}))

Kink.load(host, 'link_need', loadBase)

Kink.base(host, 'link_size', () => ({
  code: 4,
  note: `Link size out of bounds.`,
}))

Kink.load(host, 'link_size', loadBase)

Kink.base(host, 'link_take', () => ({
  code: 5,
  note: `Link provided invalid value.`,
}))

Kink.load(host, 'link_take', loadBase)

Kink.base(host, 'list_miss', () => ({
  code: 4,
  note: `List does not contain item.`,
}))

Kink.load(host, 'list_miss', loadBase)

Kink.code(host, (code: number) => code.toString(16).padStart(4, '0'))

export default function kink<N extends Name>(form: N, link?: Base[N]) {
  return Kink.make(host, form, link)
}

function loadBase(take: BaseLink) {
  return take
}
