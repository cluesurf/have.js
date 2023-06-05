import { Link, HaltMesh } from '@tunebond/halt'
import makeHalt, { TONE } from '@tunebond/halt-text'
import { make4 } from '@tunebond/tone-code'
import tint from '@tunebond/tint'

const host = '@tunebond/have'

export type HaveBase = {
  call?: string
  lead?: unknown
  need?: Array<unknown> | unknown
  void?: boolean
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
  list_miss: {
    code: 4,
    note: (link: HaveBase) => `List does not contain item.`,
  },
}

type Base = typeof base

type Name = keyof Base

export const code = (code: number) => make4(BigInt(code))

export default function halt(form: Name, link: Link<Base, Name>) {
  const head = makeHeadText(link)
  return makeHalt({ base, code, form, head, host, link })
}

function makeHeadText(link: Record<string, unknown>) {
  const list: Array<string> = []

  const T = TONE.fall
  const G = { tone: T.green }
  const P = { tone: T.purple }
  const H = { tone: T.gray }

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
