import { useState } from "react"

const useBuyNow = () => {
    const [paymentType, setPaymentType] = useState<string>("")

    return {setPaymentType}
}

export default useBuyNow