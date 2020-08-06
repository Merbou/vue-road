export default function () {
    return new Promise((res, rej) => {
        console.log("init middleware")
        res()
    })
}