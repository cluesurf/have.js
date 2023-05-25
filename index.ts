/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'
import { validate } from 'uuid'

import halt from './halt.js'

export const LIST: Array<any> = []

export const MARK = 1

export const MESH: object = {}
export const MESH_LIST: Array<object> = []
export const TEXT = ''
export const VOID = null
export const WAVE = true

export function haveCode(
  bond: unknown,
  name: string,
): asserts bond is string {
  if (!testCode(bond)) {
    throw halt('form_miss', { form: 'uuid', name })
  }
}

export function haveForm<V>(
  seed: unknown,
  form: string,
  test: (bond: any) => bond is V,
  name: string,
): asserts seed is V {
  if (!test(seed)) {
    throw halt('form_miss', { form, name })
  }
}

export function haveList<T>(
  bond: unknown,
  name: string,
): asserts bond is Array<T> {
  if (!testList(bond)) {
    throw halt('form_miss', { form: 'list', name })
  }
}

export function haveMesh(
  bond: unknown,
  name: string,
): asserts bond is Record<string, unknown> {
  if (!testMesh(bond)) {
    throw halt('form_miss', { form: 'mesh', name })
  }
}

export function haveText(
  bond: unknown,
  name: string,
): asserts bond is string {
  if (!testText(bond)) {
    throw halt('form_miss', { form: 'text', name })
  }
}

export function haveTree<Form>(
  bond: any,
  form: string,
  test: Form,
  name: string,
): asserts bond is Form {
  const formx = readForm(bond)
  if (formx !== readForm(test)) {
    throw halt('form_miss', { form, name })
  }

  if (formx === 'object') {
    for (const name in test) {
      haveTree(bond[name], form, test[name], name)
    }
  }
}

export function haveWave<T>(
  bond: unknown,
  name: string,
): asserts bond is Array<T> {
  if (!testWave(bond)) {
    throw halt('form_miss', { form: 'wave', name })
  }
}

export function readForm(bond: any) {
  const form = typeof bond
  if (form === 'object' && !bond) {
    return 'null'
  }
  if (Array.isArray(bond)) {
    return 'array'
  }
  return form
}

export function testCode(bond: unknown): bond is string {
  return _.isString(bond) && validate(bond)
}

export function testList<T>(bond: unknown): bond is Array<T> {
  return _.isArray(bond)
}

export function testMesh(bond: unknown): bond is object {
  return _.isObject(bond)
}

export function testText(bond: unknown): bond is string {
  return _.isString(bond)
}

export function testTree<Form>(bond: any, test: Form): bond is Form {
  const form = readForm(bond)
  if (form !== readForm(test)) {
    return false
  }

  if (form === 'object') {
    for (const name in test) {
      if (!testTree(bond[name], test[name])) {
        return false
      }
    }
  }

  return true
}

export function testWave<T>(bond: unknown): bond is boolean {
  return _.isBoolean(bond)
}
