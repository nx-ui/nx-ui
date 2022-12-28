import { describe, it, expect } from 'vitest'
import { add } from './add'

describe('add', () => {
  it('add1', () => {
    expect(add()).toBe(0)
  })
  it('add2', () => {
    expect(add(1)).toBe(1)
  })
  it('add3', () => {
    expect(add(1, 2, 3)).toBe(6)
  })
})
