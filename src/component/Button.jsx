import React  from "react";


const Button =( {children, handelclick, className} )=> {

    return(
        <button className={className} onClick={handelclick}>{children}</button>
    )

}

export default Button;