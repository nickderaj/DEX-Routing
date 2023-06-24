# `backend`

/**
 * Provides read-only endpoints for querying the state of
 * dexes on the blockchain. In your tests, you're free to mock the returned
 * values of the methods in this class to return different poolPair
 * states for testing different scenarios (e.g. more poolPairs / tokens
 * with different topologies).
 * A complex example has been hard-coded here for visualisation.
 * Based on the state of the poolPairs, there are three possible routes for
 * swapping DOGE to BTC:
 *
 *   - DOGE -> DFI -> BTC
 *     Example calculations:
 *       1 DOGE = 5 / 18993 DFI
 *              = 0.0002633 DFI (via DOGE-DFI pool)
 *       1 DFI  = 2 / 1337 BTC
 *              = 0.001496 BTC (via BTC-DFI pool)
 *       1 DOGE = 0.0002633 DFI
 *              = 0.0002633 * 0.001495 BTC
 *              = 0.0000003936 BTC
 *   - DOGE -> DFI -> ETH -> BTC
 *   - DOGE -> ETH -> BTC
 *   - DOGE -> ETH -> DFI -> BTC
 *                                           ┌───────┐
 *                                           │       │
 *                     ┌────────┐            │  BTC  │
 *                     │        ├─ BTC-DFI ──┤       │
 *     ┌── DOGE-DFI ───┤  DFI   │            └───┬───┘
 *     │               │        │                │
 * ┌───┴────┐          └───┬────┘             BTC-ETH
 * │  DOGE  │              │                     │
 * │        │              │                 ┌───┴───┐
 * └────┬───┘              │                 │       │
 *      |                  └─ ETH-DFI ───────┤  ETH  │
 *      └─────────── DOGE-ETH ───────────────│       |
 *                                           └───────┘
 */