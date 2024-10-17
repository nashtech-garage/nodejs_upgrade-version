
const lts = new Set([18, 20, 22]);
const nonLts = new Set([17, 19, 21]);

const all = lts.union(nonLts);
console.log(all);
// Set(6) { 18, 20, 22, 17, 19, 21 }

const intersectionValue = all.intersection(nonLts);
console.log(intersectionValue);
// Set(3) { 17, 19, 21 }

const differentValue = all.difference(nonLts);
console.log(differentValue);
// Set(3) { 18, 20, 22 }

const a = new Set([1]);
const b = new Set([1]);
const isDisjointFrom  = a.isDisjointFrom(b);
console.log(isDisjointFrom);
// false

const element = new Set(['a', 'b', 'c']);
const parent = new Set(['a', 'b', 'd', 'c']);
const isSupersetOf = parent.isSupersetOf(element);
console.log(isSupersetOf);
// true

const classA = new Set(['Steven', 'Mike', 'Will']);
const classB = new Set(['Michale', 'Steven', 'Obama']);
console.log(classA.symmetricDifference(classB));
// Set(4) { 'Mike', 'Will', 'Michale', 'Obama' }