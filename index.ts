/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'

import halt from './halt.js'

export const LIST: Array<any> = []

export const MARK = 1

export const MESH: object = {}
export const MESH_LIST: Array<object> = []
export const TEXT = ''
export const VOID = null
export const WAVE = true

export function haveBindList<T>(
  lead: unknown,
  list: ReadonlyArray<T>,
  call: string,
): asserts lead is T {
  if (!testBindList(lead, list)) {
    throw halt('list_miss', { call, need: list })
  }
}

export function haveForm<V>(
  seed: unknown,
  need: string,
  test: (lead: any) => lead is V,
  call: string,
): asserts seed is V {
  if (!test(seed)) {
    throw halt('form_miss', { call, need })
  }
}

export function haveList<T>(
  lead: unknown,
  call: string,
): asserts lead is Array<T> {
  if (!testList(lead)) {
    throw halt('form_miss', { call, need: 'list' })
  }
}

export function haveMark(
  lead: unknown,
  call: string,
): asserts lead is number {
  if (!testMark(lead)) {
    throw halt('form_miss', { call, need: 'mark' })
  }
}

export function haveMesh(
  lead: unknown,
  call: string,
): asserts lead is Record<string, unknown> {
  if (!testMesh(lead)) {
    throw halt('form_miss', { call, need: 'mesh' })
  }
}

export function haveRise(
  lead: unknown,
  call: string,
): asserts lead is true {
  if (!testRise(lead)) {
    throw halt('form_miss', { call, need: 'wave' })
  }
}

export function haveText(
  lead: unknown,
  call: string,
): asserts lead is string {
  if (!testText(lead)) {
    throw halt('form_miss', { call, need: 'text' })
  }
}

export function haveTree<Form>(
  lead: any,
  need: string,
  test: Form,
  call: string,
): asserts lead is Form {
  const form = readForm(lead)
  if (form !== readForm(test)) {
    throw halt('form_miss', { call, need })
  }

  if (form === 'object') {
    for (const call in test) {
      haveTree(lead[call], need, test[call], call)
    }
  }
}

export function haveWave(
  lead: unknown,
  call: string,
): asserts lead is boolean {
  if (!testWave(lead)) {
    throw halt('form_miss', { call, need: 'wave' })
  }
}

export function readForm(lead: any) {
  const form = typeof lead
  if (form === 'object' && !lead) {
    return 'null'
  }
  if (Array.isArray(lead)) {
    return 'array'
  }
  return form
}

export function seekMark(
  lead: unknown,
  haveVoid: boolean,
  call: string,
) {
  if (haveVoid) {
    if (testVoid(lead) || testMark(lead)) {
      return
    } else {
      throw halt('form_miss', { call, need: 'mark', void: true })
    }
  }
}

export function seekText(
  lead: unknown,
  haveVoid: boolean,
  call: string,
): asserts lead is string {
  if (haveVoid) {
    if (testVoid(lead) || testText(lead)) {
      return
    } else {
      throw halt('form_miss', { call, need: 'text', void: true })
    }
  }
}

export function seekWave(
  lead: unknown,
  haveVoid: boolean,
  call: string,
) {
  if (haveVoid) {
    if (testVoid(lead) || testWave(lead)) {
      return
    } else {
      throw halt('form_miss', { call, need: 'wave', void: true })
    }
  }
}

export function testBindList<T>(
  lead: unknown,
  list: ReadonlyArray<T>,
): lead is T {
  return list.includes(lead as T)
}

export function testList<T>(lead: unknown): lead is Array<T> {
  return _.isArray(lead)
}

export function testMark(lead: unknown): lead is number {
  return _.isNumber(lead)
}

export function testMesh(
  lead: unknown,
): lead is Record<string, unknown> {
  return _.isObject(lead)
}

export function testRise(lead: unknown): lead is true {
  return lead === true
}

export function testText(lead: unknown): lead is string {
  return _.isString(lead)
}

export function testTree<Form>(lead: any, test: Form): lead is Form {
  const form = readForm(lead)
  if (form !== readForm(test)) {
    return false
  }

  if (form === 'object') {
    for (const call in test) {
      if (!testTree(lead[call], test[call])) {
        return false
      }
    }
  }

  return true
}

export function testVoid(lead: unknown): lead is null | undefined {
  return lead == null
}

export function testWave(lead: unknown): lead is boolean {
  return _.isBoolean(lead)
}
