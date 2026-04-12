const init = () => {
    const promise1 = new Promise((resolve => setTimeout(resolve, 1500)));
    const promise2 = new Promise((resolve => setTimeout(resolve, 500)));

    promise1.then(() => {
        console.log("hello world");
    })
    promise2.then(() => {
        console.error("unable to resolve this request");
    })
}


window.onload = init