const log = console.log;

// curry, pipe, go, add
const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

const L = {};

// L.range
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

// L.entries
L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

// take
const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
});

// reduce
const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    acc = f(acc, a);
  }
  return acc;
});

// find
const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

// range
const range = (l) => {
  let i = -1;
  res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

// pipe, go, add
const go = (...args) => reduce((acc, f) => f(acc), args);

const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

const add = (a, b) => a + b;
