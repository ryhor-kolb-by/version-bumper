/**
 * Разбирает строку вида "1.4.2" в объект.
 * Бросает ошибку, если формат не подходит.
 */
export function parseVersion(input) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(input).trim())

  if (!match) {
    throw new Error(`Некорректная версия: "${input}"`)
  }

  const [, major, minor, patch] = match

  return {
    major: Number(major),
    minor: Number(minor),
    patch: Number(patch),
  }
}

export function formatVersion({ major, minor, patch }) {
  return `${major}.${minor}.${patch}`
}

/**
 * Повышает версию по правилам semver.
 * major: 1.4.2 -> 2.0.0
 * minor: 1.4.2 -> 1.5.0
 * patch: 1.4.2 -> 1.4.3
 */
export function bumpVersion(input, releaseType) {
  const { major, minor, patch } = parseVersion(input)

  switch (releaseType) {
    case 'major':
      return formatVersion({ major: major + 1, minor: 0, patch: 0 })
    case 'minor':
      return formatVersion({ major, minor: minor + 1, patch: 0 })
    case 'patch':
      return formatVersion({ major, minor, patch: patch + 1 })
    default:
      throw new Error(`Неизвестный тип релиза: "${releaseType}"`)
  }
}

/**
 * Сравнивает две версии. Возвращает -1, 0 или 1 — как компаратор для sort().
 */
export function compareVersions(a, b) {
  const left = parseVersion(a)
  const right = parseVersion(b)

  for (const part of ['major', 'minor', 'patch']) {
    if (left[part] !== right[part]) {
      return left[part] > right[part] ? 1 : -1
    }
  }

  return 0
}
