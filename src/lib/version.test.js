import { describe, it, expect } from 'vitest'
import { bumpVersion, compareVersions, parseVersion } from './version.js'

describe('parseVersion', () => {
  it('разбирает корректную версию', () => {
    expect(parseVersion('1.4.2')).toEqual({ major: 1, minor: 4, patch: 2 })
  })

  it('игнорирует пробелы по краям', () => {
    expect(parseVersion('  0.0.1 ')).toEqual({ major: 0, minor: 0, patch: 1 })
  })

  it('падает на мусоре', () => {
    expect(() => parseVersion('v1.2')).toThrow()
    expect(() => parseVersion('')).toThrow()
  })
})

describe('bumpVersion', () => {
  it('patch увеличивает последнее число', () => {
    expect(bumpVersion('1.4.2', 'patch')).toBe('1.4.3')
  })

  it('minor увеличивает второе число и обнуляет patch', () => {
    expect(bumpVersion('1.4.2', 'minor')).toBe('1.5.0')
  })

  it('major увеличивает первое число и обнуляет остальные', () => {
    expect(bumpVersion('1.4.2', 'major')).toBe('2.0.0')
  })

  it('падает на неизвестном типе релиза', () => {
    expect(() => bumpVersion('1.4.2', 'huge')).toThrow()
  })
})

describe('compareVersions', () => {
  it('определяет, какая версия старше', () => {
    expect(compareVersions('1.4.2', '1.4.3')).toBe(-1)
    expect(compareVersions('2.0.0', '1.9.9')).toBe(1)
    expect(compareVersions('1.0.0', '1.0.0')).toBe(0)
  })

  it('годится как компаратор для sort', () => {
    const versions = ['1.10.0', '1.2.0', '1.9.3']
    expect([...versions].sort(compareVersions)).toEqual([
      '1.2.0',
      '1.9.3',
      '1.10.0',
    ])
  })
})
