# Documentation

## Table of Contents

1. [DexController](#dexcontroller)
2. [DexRoutingService](#dexroutingservice)
3. [DexService](#dexservice)

# DexController

The `DexController` class provides endpoints to interact with a DEX (Decentralized Exchange). It offers various methods to retrieve information about tokens, pools, routes, and find the best route for swapping tokens.

## Methods

### getAllTokens

```typescript
static async getAllTokens(): Promise<Response>
```

Returns all available tokens in the DEX.

### getAllPools

```typescript
static async getAllPools(): Promise<Response>
```

Returns all available pool pairs in the DEX.

### getAllSymbols

```typescript
static async getAllSymbols(): Promise<Response>
```

Returns all available symbols in the DEX.

### getAllRoutes

```typescript
static async getAllRoutes(req: Request): Promise<Response>
```

Retrieves all possible routes between two tokens.

- `fromToken`: The symbol of the token to swap from.
- `toToken`: The symbol of the token to swap to.

Returns the routes as an array of pool pairs.

### getRouteByPool

```typescript
static async getRouteByPool(req: Request): Promise<Response>
```

Retrieves a specific route defined by a pool pair.

- `fromToken`: The symbol of the token to swap from.
- `toToken`: The symbol of the token to swap to.
- `poolPair`: The symbol of the pool pair.

Returns the route as a single pool pair.

### getBestRoute

```typescript
static async getBestRoute(req: Request): Promise<Response>
```

Finds the best route for swapping tokens.

- `fromToken`: The symbol of the token to swap from.
- `toToken`: The symbol of the token to swap to.

Returns the best route as an array of pool pairs and the estimated return amount.

## Response Format

The response from each method follows the following structure:

```typescript
interface Response {
  statusCode: number;
  data: {
    message: string;
    [additionalProperties: string]: any;
  };
}
statusCode: The HTTP status code of the response.
data: An object containing the response data.
message: A descriptive message regarding the status or result of the operation.
```

# DexRoutingService

The `DexRoutingService` class provides methods for calculating routes and finding the best route for swapping tokens in a DEX (Decentralized Exchange).

## Methods

### listAllRoutes

```typescript
static async listAllRoutes(fromToken: TokenSymbol, toToken: TokenSymbol): Promise<AllRoutesResult>
```

Calculates all possible routes between two tokens.

- `fromToken`: The symbol of the token to swap from.
- `toToken`: The symbol of the token to swap to.

Returns an object containing the fromToken, toToken, and an array of routes.

### getBestRoute

```typescript
static async getBestRoute(fromToken: TokenSymbol, toToken: TokenSymbol): Promise<BestRouteResult>
```

Finds the best route for swapping tokens.

- `fromToken`: The symbol of the token to swap from.
- `toToken`: The symbol of the token to swap to.

Returns an object containing the fromToken, toToken, the best route, and the estimated return amount.

## Internal Methods

### \_calculateReturnAmount

```typescript
static _calculateReturnAmount(start: TokenSymbol, route: PoolPair[]): number
```

Calculates the return amount for a given route.

- `start`: The symbol of the starting token.
- `route`: An array of pool pairs representing the route.

Returns the return amount as a number.

# DexService

The `DexService` class provides methods for retrieving pool information and validating inputs in a DEX (Decentralized Exchange).

## Methods

### getPool

```typescript
static getPool(symbol: PoolPairSymbol): PoolPair | undefined
```

Gets the pool information for a given symbol.

- `symbol`: The symbol of the pool pair.

Returns the pool pair object if found, or undefined if not found.

### validateInputs

```typescript
static validateInputs(fromToken: string, toToken: string, poolPair?: string): [boolean, string]
```

Validates the input tokens and pool pair (optional).

- `fromToken`: The symbol of the token to swap from.
- `toToken`: The symbol of the token to swap to.
- `poolPair` (optional): The symbol of the pool pair.

Returns a tuple [boolean, string] indicating the validity and an error message (if any).
