type Contract<T> = (x: unknown) => T;

type UnionOf = {
    <A, B, C, D, E, F, G, H, I, J> (...contracts: [Contract<A>, Contract<B>, Contract<C>, Contract<D>, Contract<E>, Contract<F>, Contract<G>, Contract<H>, Contract<I>, Contract<J>]): (value: unknown) => A | B | C | D | E | F | G | H | I | J;
    <A, B, C, D, E, F, G, H, I> (...contracts: [Contract<A>, Contract<B>, Contract<C>, Contract<D>, Contract<E>, Contract<F>, Contract<G>, Contract<H>, Contract<I>]): (value: unknown) => A | B | C | D | E | F | G | H | I;
    <A, B, C, D, E, F, G, H> (...contracts: [Contract<A>, Contract<B>, Contract<C>, Contract<D>, Contract<E>, Contract<F>, Contract<G>, Contract<H>]): (value: unknown) => A | B | C | D | E | F | G | H;
    <A, B, C, D, E, F, G> (...contracts: [Contract<A>, Contract<B>, Contract<C>, Contract<D>, Contract<E>, Contract<F>, Contract<G>]): (value: unknown) => A | B | C | D | E | F | G;
    <A, B, C, D, E, F> (...contracts: [Contract<A>, Contract<B>, Contract<C>, Contract<D>, Contract<E>, Contract<F>]): (value: unknown) => A | B | C | D | E | F;
    <A, B, C, D, E> (...contracts: [Contract<A>, Contract<B>, Contract<C>, Contract<D>, Contract<E>]): (value: unknown) => A | B | C | D | E;
    <A, B, C, D> (...contracts: [Contract<A>, Contract<B>, Contract<C>, Contract<D>]): (value: unknown) => A | B | C | D;
    <A, B, C> (...contracts: [Contract<A>, Contract<B>, Contract<C>]): (value: unknown) => A | B | C;
    <A, B> (...contracts: [Contract<A>, Contract<B>]): (value: unknown) => A | B;
    <A> (...contracts: [Contract<A>]): (value: unknown) => A;
    (...contracts: Contract<unknown>[]): (value: unknown) => unknown;
};

export const unionOf: UnionOf = (...contracts: Contract<unknown>[]) => (value: unknown): unknown => {
    for (let i = 0; i < contracts.length; i++) {
        try {
            const contract = contracts[i];
            if (contract !== undefined) {
                contract(value);
                return value;
            }
        } catch (error) {
            // we're not handling this error on purpose
        }
    }
    throw new Error("Value didn't pass any contract");
}
