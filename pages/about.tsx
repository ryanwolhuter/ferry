import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout>
      <header>
        <h1>About</h1>
      </header>
      <section className="about">
        <h2>About Ferry</h2>

        <h3>NFT Drop</h3>
        <p>For this hackathon we have decided to give any hacker who buys a paid sub a sepcial NFT commemrotating the HackFS 2021 ETHglobal Hakcahton!</p>

        <p>To get your special NFT, all you need to do is buy a paid sub (on test net). The price of this will be [price] and can be paid in wFilecoin or ETH or DAI. You will also have the chance to gain a special NFT by random distribution. Here are the rarity tiers we haev setup:</p>

        <ul>
          <li>78% chance you get a Common (green)</li>
          <li>20% chance you get a Rare (blue)</li>
          <li>1.9% chance you get an Epic (purple)</li>
          <li>0.1% chance you get a Legendary (gold)</li>
        </ul>

        <p>To get yours, simply go to this link, or press the pro account button at the top, good luck!</p>

        <h3>$SHIP Governance Token</h3>
        <p>For this hackathon we are also introducing a governance token to keep the content that gets used on our tool safe for ewveryone to use.</p>
        <p>
          if you woudl like to join us, follow this link or press the Join us button at the top of teh screen.</p>
      </section>
      <section className="termsAndConditions">
        <h2>Terms and Conditions</h2>
        <p>SMASH & CO, a simplified joint stock company with a sole partner and with a paid up capital of €575,000, enrolled on the Trade and Companies Registry of Lyon, under number 828 889 493, whose head office is located at 2 rue Claire – 69009 Lyon (hereinafter referred to as “SMASH & CO”), publishes and operates the Internet site accessible at the following address https://fromsmash.com (hereinafter referred to as the “the SITE”).

          The SITE offers a new generation file transfer service and additional services in the framework of the Premium version.

          ANY USE WHATSOEVER OF THE SITE OBLIGATORILY IMPLIES UNRERSERVED ACCEPTANCE BY THE USER OF THE PRESENT GENERAL CONDITIONS OF USE (GCU).</p>
      </section>
      <style jsx>
        {`
          header {
            width: 100%;
            padding-top: 100px;
            padding-bottom: 40px;
            text-align: center;
            background: rgba(251, 251, 251, 0.05);
            box-shadow: inset 0px 0px 4px rgba(255, 255, 255, 0.46);
            backdrop-filter: blur(70px);
          }
          section {
            background: var(--white);
            padding-left: 160px;
            padding-right: 160px;
            padding-top: 80px;
          }
        `}
      </style>
    </Layout>
  )
}