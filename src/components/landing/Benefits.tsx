import benefitsData from "../../data/benefits"

function Benefits() {
    return (
        <>
            <h2>{benefitsData.title}</h2>
            <ol>
                {benefitsData.items.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                ))}
            </ol>
        </>
    )
}

export default Benefits