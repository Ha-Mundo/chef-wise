import chefWiseLogo from "../images/chef-wise-icon.png"
export default function AdviceCard() {
    return(
        <section className="adviceCard">
            <img src={chefWiseLogo}/>
           {/*  <span>🥕🥬🧅🥔</span> */}

            <p>Enter more than three ingredients and click the "Generate Recipe" button to see a suggestion!</p>
        </section>
    )
}