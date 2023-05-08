import React from 'react'

export default function BotPage() {
  return (
    <div className='main-container'>
        <div className='bot-container'>
            <div className='bot-header'>
                <h1>NEWSLETTER DISCORD BOT</h1>
                <a href='https://discord.com/api/oauth2/authorize?client_id=1082722159320903760&permissions=2147550208&scope=bot%20applications.commands'>Add to Discord</a>
            </div>

            <div className='bot-steps'>
                <div className='bot-step'>
                <h2>WHY NEWSLETTER BOT?</h2>
                <p>Discord is a popular platform for NFT project announcements, but not all NFT holders use it and may miss out on important updates. Our solution to this problem is the Cronos.Club Newsletter bot, which aggregates all important announcements in one place. Stay up-to-date on the latest news and developments in your favorite NFT projects without the need to constantly check multiple channels.</p>
                </div>

                <div className='bot-step'>
                <h2>HOW CAN I ADD IT TO MY SERVER?</h2>
                <p>To add the Cronos Club bot to your Discord server, simply click the <b>"Add to Discord"</b> button and follow the prompts to authorize it. Once added, you can easily create a support ticket by <b><a href='https://discord.gg/Nn3hqfmZgT'>joining our Discord server</a></b> and submitting your request. Our team is always ready to assist you and ensure a seamless user experience.</p>
                </div>
            </div>

           
        </div>
    </div>
  )
}
