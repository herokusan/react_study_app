import React, { useState,useCallback,useContext, useEffect } from "react";
import ConnectedClasses from "../classes/connected_classes"
import CretedClasses from "../classes/created_classes"


function Home() {
    return(
        <div>
            <ConnectedClasses></ConnectedClasses>
            <hr></hr>
            <CretedClasses></CretedClasses>
        </div>
    )
}


export default Home