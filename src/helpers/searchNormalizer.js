const Sanscript = require('@indic-transliteration/sanscript');

const SEARCHABLE_FIELDS = [
  'name',
  'block',
  'village',
  'constituency',
  'district',
  'state',
];

const SEARCH_SYNONYMS = {
  delhi: ['dilli'],
  dilli: ['delhi'],
};

const DEVANAGARI_REGEX = /[\u0900-\u097F]/;

const cleanLatin = (value) => value
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const transliterateToLatin = (value) => {
  if (!DEVANAGARI_REGEX.test(value)) {
    return cleanLatin(value);
  }

  return cleanLatin(Sanscript.t(value, 'devanagari', 'itrans'));
};

const expandLatinVariants = (value) => {
  const variants = new Set();
  const base = cleanLatin(value);

  if (!base) {
    return variants;
  }

  variants.add(base);

  const vowelRelaxed = base
    .replace(/ee/g, 'i')
    .replace(/oo/g, 'u')
    .replace(/ii/g, 'i')
    .replace(/aa/g, 'a');

  variants.add(vowelRelaxed);

  const synonyms = SEARCH_SYNONYMS[base] || SEARCH_SYNONYMS[vowelRelaxed] || [];

  synonyms.forEach((synonym) => {
    variants.add(cleanLatin(synonym));
  });

  return variants;
};

const buildSearchValue = (value) => {
  const variants = new Set();

  expandLatinVariants(value).forEach((variant) => variants.add(variant));

  if (DEVANAGARI_REGEX.test(value)) {
    expandLatinVariants(transliterateToLatin(value)).forEach((variant) => variants.add(variant));
  }

  return Array.from(variants).join(' ');
};

const normalizeToken = (value) => buildSearchValue(value);

const buildSearchableFields = (payload) => SEARCHABLE_FIELDS.reduce((acc, field) => {
  acc[`${field}_search`] = buildSearchValue(payload[field]);
  return acc;
}, {});

const normalizeSearchQuery = (query) => buildSearchValue(query);

module.exports = {
  SEARCHABLE_FIELDS,
  normalizeToken,
  buildSearchableFields,
  normalizeSearchQuery,
};
