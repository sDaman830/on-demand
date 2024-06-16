function Button({ title, onClick, Variant }) {

    return (
        <button onClick={onClick} className={`font-semibold  transition  px-8 py-3 rounded-md text-lg ${Variant === "outline" ? "hover:bg-[#005CE8]/10 text-[#005CE8]" : "bg-[#005CE8] hover:bg-[#005CE8]/60 text-white"}`} >
            {title}
        </button>
    )
}

export default Button
