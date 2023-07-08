import Kink, { KinkMesh } from '@tunebond/kink'
import tint from '@tunebond/tint-text'

const host = '@tunebond/have'

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

Kink.base(host, 'form_miss', (link: BaseLink) => ({
  code: 2,
  link,
  note: `Form is undefined.`,
}))

Kink.base(host, 'halt_list', (link: BaseLink) => ({
  code: 8,
  link,
  note: `Multiple data errors.`,
}))

Kink.base(host, 'link_form', (link: BaseLink) => ({
  code: 6,
  link,
  note: `Link is invalid form.`,
}))

Kink.base(host, 'link_miss', (link: BaseLink) => ({
  code: 7,
  link,
  note: `Link is not valid.`,
}))

Kink.base(host, 'link_need', (link: BaseLink) => ({
  code: 3,
  link,
  note: `Link is required.`,
}))

Kink.base(host, 'link_size', (link: BaseLink) => ({
  code: 4,
  link,
  note: `Link size out of bounds.`,
}))

Kink.base(host, 'link_take', (link: BaseLink) => ({
  code: 5,
  link,
  note: `Link provided invalid value.`,
}))

Kink.base(host, 'list_miss', (link: BaseLink) => ({
  code: 4,
  link,
  note: `List does not contain item.`,
}))

Kink.code(host, (code: number) => code.toString(16).padStart(4, '0'))

export default function kink<N extends Name>(form: N, link?: Base[N]) {
  return new Kink(Kink.makeBase(host, form, link))
}

function makeHeadText(link: Record<string, unknown>) {
  const list: Array<string> = []

  const G = { tone: 'green' }
  const P = { tone: 'blue' }
  const H = { tone: 'brightBlack' }

  if (link.call) {
    list.push(
      tint(`    call <`, H) + tint(`${link.call}`, G) + tint(`>`, H),
    )
  }

  if (link.lead) {
    list.push(
      tint(`    lead <`, H) + tint(`${link.lead}`, P) + tint(`>`, H),
    )
  }

  if (link.need) {
    if (Array.isArray(link.need)) {
      link.need.forEach(need => {
        list.push(
          tint(`    need <`, H) + tint(`${need}`, H) + tint(`>`, H),
        )
      })
    } else {
      list.push(
        tint(`    need <`, H) + tint(`${link.need}`, H) + tint(`>`, H),
      )
    }
  }

  if (list.length) {
    list.unshift('')
  }

  return list.join('\n')
}
