'use strict'

const DotKernel = require('./dot-kernel')

module.exports = (id) => ({
  initial () { return new DotKernel() },
  join (s1, s2) { return s1.join(s2) },
  value (s) {
    const keeps = new Map()
    for (let [dot, [key, value]] of s.ds) {
      let previous = keeps.has(key) ? keeps.get(key) : true
      keeps.set(key, previous && value)
    }
    const ret = new Set()
    for(let [value, keep] of keeps) {
      if (keep) {
        ret.add(value)
      }
    }
    return ret
  },
  mutators: {
    add (s, value) {
      return s.join(
        s.removeValue([value, true]),
        s.removeValue([value, false]),
        s.add(id, [value, true]))
    },
    remove (s, value) {
      return s.join(
        s.removeValue([value, true]),
        s.removeValue([value, false]),
        s.add(id, [value, false]))
    }
  }
})