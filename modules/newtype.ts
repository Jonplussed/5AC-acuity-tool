declare const NewtypeTag: unique symbol;
export type Newtype<T, Tag> = T & { readonly [NewtypeTag]: Tag };
