/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash'
import { validate } from 'uuid'

import { Halt } from '@lancejpollard/halt.js'

const host = '@lancejpollard/assert.js'

type Link = Record<string, unknown>

const HALT = {
  invalid_type: {
    code: 2,
    host,
    note: ({ key, type }: Link) =>
      `Value '${key}' is not '${type}' type`,
  },
  missing_property: {
    code: 1,
    host,
    note: ({ key }: Link) => `Property '${key}' missing`,
  },
}

export const ARRAY: Array<any> = []

export const BOOLEAN = true

Halt.list = { ...Halt.list, ...HALT }

export { Halt }
export type HaltType = typeof HALT

export const NULL = null
export const NUMBER = 1
export const OBJECT: object = {}
export const OBJECT_ARRAY: Array<object> = []
export const TEXT = ''

export function assertArray<T>(
  x: unknown,
  key: string,
): asserts x is Array<T> {
  if (!isArray(x)) {
    throw new Halt('invalid_type', { key, type: 'array' })
  }
}

export function assertObject(
  x: unknown,
  key: string,
): asserts x is Record<string, unknown> {
  if (!isObject(x)) {
    throw new Halt('invalid_type', { key, type: 'object' })
  }
}

export function assertText(
  x: unknown,
  key: string,
): asserts x is string {
  if (!isText(x)) {
    throw new Halt('invalid_type', { key, type: 'text' })
  }
}

export function assertTree<Form>(
  x: any,
  type: string,
  example: Form,
  key: string,
): asserts x is Form {
  const typex = getType(x)
  if (typex !== getType(example)) {
    throw new Halt('invalid_type', { key, type })
  }

  if (typex === 'object') {
    for (const name in example) {
      assertTree(x[name], type, example[name], key)
    }
  }
}

export function assertType<V>(
  seed: unknown,
  type: string,
  check: (x: any) => x is V,
  name: string,
): asserts seed is V {
  if (!check(seed)) {
    throw new Halt('invalid_type', { name, type })
  }
}

export function assertUUID(
  x: unknown,
  key: string,
): asserts x is string {
  if (!isUUID(x)) {
    throw new Halt('invalid_type', { key, type: 'uuid' })
  }
}

export function getType(x: any) {
  const rawForm = typeof x
  if (rawForm === 'object' && !x) {
    return 'null'
  }
  if (Array.isArray(x)) {
    return 'array'
  }
  return rawForm
}

export function isArray<T>(x: unknown): x is Array<T> {
  return _.isArray(x)
}

export function isBoolean<T>(x: unknown): x is boolean {
  return _.isBoolean(x)
}

export function isObject(x: unknown): x is object {
  return _.isObject(x)
}

export function isText(x: unknown): x is string {
  return _.isString(x)
}

export function isTree<Form>(x: any, example: Form): x is Form {
  const type = getType(x)
  if (type !== getType(example)) {
    return false
  }

  if (type === 'object') {
    for (const name in example) {
      if (!isTree(x[name], example[name])) {
        return false
      }
    }
  }

  return true
}

export function isUUID(x: unknown): x is string {
  return _.isString(x) && validate(x)
}
