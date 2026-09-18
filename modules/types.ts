declare const NewtypeTag: unique symbol;

export type Newtype<T, Tag> = T & {
  readonly [NewtypeTag]: Tag 
};

export type Writable<T> = {
  -readonly [Attr in keyof T]: T[Attr];
};
