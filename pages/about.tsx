import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout>
      <header>
        <h1>About</h1>
      </header>
      <section className="about">
        <h2>Welcome to Ferry!</h2>

        <p>Ferry is a short term file transfer tooling for Web 3. This simple Dapp can be used for quick and UX friendly file transfers on IPFS/Filecoin made for the everyday user, for free! Subscribers can get extended features including, link management, extended file size and longer file persistence.</p>

        <p>For our early adopters we are offering added rewards in a form of a special randomly distributed NFT that comes with community benefits and access to rewards in the future. </p>

        <h2>FAQs</h2>

        <h3>What is Ferry?</h3>

        <p>
          Quite simply, our tool sends files from one person to another, similar to other Web 2 file transfer tools you have used but now, decentralised!
        </p>

        <h3>Who is Ferry for?</h3>

        <p>We would love it if everyone would use our tool to Ferry their files! Anyone who wants to use this tool for work as a tech industry freelancer, journalist or creative who needs to send files that are larger than the usual email size.</p>

        <p>We see this as a common motivation for all users - the need to send files without using a really big centralised storage platform.</p>

        <h3>How do I use Ferry?</h3>

        <p>You can start using ferry straight away for free.</p> <p>All you have to do is login with your email address and you will get a Magic link and your Ferry account will be automatically created.</p> 
        <p>After you login, you can add files and put in your recipient’s email address. And that’s it!</p> 
        <p>Once you press “ferry it”, your files will be uploaded and the link generated sent to your friend’s email address.</p> 
        <p>Want a little bit more control? Subscribe to a pro account with a connected web 3 wallet and pay as little as $2/ month.</p>
      </section>
      <section className="termsAndConditions">
        <h2>Terms and Conditions</h2>
        <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the &quot;Software&quot;), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>

        <p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>

        <p>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
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
            padding-left: 200px;
            padding-right: 200px;
            padding-top: 80px;
          }
        `}
      </style>
    </Layout>
  )
}