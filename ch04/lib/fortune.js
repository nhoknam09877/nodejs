const fortuneCookies=[
    "Conquer your fears or thay will conquer you",
    "Rivers need springs",
    "Do not Fear what you don't know",
    "You will have a pleasant surparise",
    "Whenever possible , keep it simple"
]
exports.getFortune=()=>{
    const idx=Math.floor(Math.random()*fortuneCookies.length)
    return fortuneCookies[idx]
}