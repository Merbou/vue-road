export default function (to, from) {
    return new Promise((resolve, reject) => {
        console.log("auth", to.path)
        resolve("/")
        reject("403")
    })
}
