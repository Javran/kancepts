This document defines data structure for `ExpedConfig`,
which represents factors that might affect expedition incomes.

# Data Structures

## `ExpedConfig` structure

- an Object of the following shape:

    ```
    {
        modifier: <IncomeModifier>,
        cost: <CostConfig>,
    }
    ```

    - `modifier` determines the modifier applied directly on resource incomes.
    - `cost` determines resupply cost, this is taken into account when computing net incomes

## `IncomeModifier` structure

As mentioned above, this structure determines how resource incomes should be modified.

- an Object that guaranteed to have a `type` field.

- when type is `standard`

    ```
    {
        type: 'standard',
        gs: <bool>,
        daihatsu: 0 ~ 4,
    }
    ```

    - `gs` determines if great success is intended.
    - `daihatsu` is the number of Daihatsu Landing Craft (DLC for short)
      assigned for the expedition in question.

- when type is `custom`

    ```
    {
        type: 'custom',
        value: <number>,
    }
    ```

    - `value` is the factor applied directly on income.

        Notes:

        - This is useful if you have Toku-DLCs or improved DLCs and want a more accurate result
        - If you are using `custom` type, you should take into account both
          great success and number of DLCs yourself.
        - This is also useful in case of not guaranteed great success: if the chance of
          achieving great success is `50%`, you can use `1*50%+1.5*50%=1.25` as the factor,
          which represents the expectation in long run.
        - This value should usually be no less than `1` for the obvious reason.
        - We allow this value to be in range `0 < value < 5`
        - We consider this to be a great success config if `value` is no less than `1.5`.
        - Due to how extra bonus of improved DLCs are computed, simply applying a factor
          to the resource income will not give you the exact result, but the precision
          should be more than enough for the purpose of this app.

        For example:

        - a value of `1` stands for expeditions without great success and DLCs.
        - a value of `1.5` for expeditions with great success and without DLCs.
        - a value of `1.725` for expeditions with great success and 3 DLCs.
          (i.e. `1.5` for great success, multipled by `1.15` for bonus of 3 DLCs)

## `CostConfig` structure

This structure determines resupply cost.

- an Object that guaranteed to have a `type` field.

- when `type` is `cost-model`

    ```
    {
        type: 'cost-model',
        wildcard: false / 'DD' / 'DE' / 'SS',
        count: 1~6,
    }
    ```

    For this type resupply cost is determined through a cost model.
    (a cost model can be understood as a way to estimate cost given a fleet composition)
    We give every expedition a default fleet composition that guarantees to
    meet ship type and number requirements and compute resupply cost based on this model.
    Additionally you can specify a ship type as wildcard (for perhaps better great success rates):
    if the default fleet composition does not have sufficient number of ships,
    ships matching wildcard type will be used to fill in the blank.

    For example the default fleet composition is `1CL3DD` for expedition 5, but
    you can specify to have at least 5 ships with wildcard `DD`. By doing so,
    the fleet composition becomes `1CL4DD` instead of the default one.


    Notes:

    - When `wildcard` is `false`, it means we are not requiring more ships,
      in this case `count` is ignored.

    - Due to rarity of escort ships (`DE`), they are not included in
      default fleet compositions.

- when `type` is `custom`

    ```
    {
        type: 'custom',
        fuel: <number>,
        ammo: <number>,
    }
    ```

    This type of `CostConfig` should be straightforward: simply write down
    desired fuel and ammo cost for the expedition in question and you are done.

    Notes

    - Both `fuel` and `ammo` stand for the resource to be excluded from total income,
      so are required to be non-negative.

    - The actual requirement is `0 <= fuel or ammo < 5000`

    - Do not put max fuel or ammo cost here. As every `ExpedConfig` is tied to a
      specific expedition, we already know the percentage cost of fuel and ammo,
      and you are responsible for taking that into account.
