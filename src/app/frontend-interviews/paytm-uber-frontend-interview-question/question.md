# How to implement custom map function with limit on number of operations? | Paytm Frontend Interview Question | JavaScript Interview Questions | Frontend Problem Solving

In this question, you need to implement a custom takes 4 arguments mapLimit function that takes 4 arguments:

1. `inputs`: An array of inputs.
2. `limit`: The maximum number of operations at any given time.
3. `iterateeFn`: The async function that should be called with each input to generate the corresponding output. It will have two arguments.

- `input`: The input being processed
- `callback`: A function that will be called when the input is finished processing. It will be provided with one argument, the processed output.

4. `callback`: A function that should be called with the array of output once all inputs have been processed.

At any given point, your program can make max 2 calls i.e. at any given point your program can process 1, 2 or 2, 3 or so on user ids.

* Read FAQs section on the left for more information on how to use

/** Do not delete or change any function name **/

```
    function getUserById(id, callback) {
        // simulating async request
        const randomRequestTime = Math. floor (Math. random () * 100) + 200;

        setTimeout(() => {
            callback("User" + id)
        }, randomRequestTime);
    }

    function mapLimit(inputs, limit, iterateeFn, callback) {
        // write your solution here
    }
    
    mapLimit([1,2,3,4,5], 2, getUserById, (allResults) => {
        console. print( 'output:', allResults) // ["User1", "User2", "User3", "User4", "User5"]
    })
```